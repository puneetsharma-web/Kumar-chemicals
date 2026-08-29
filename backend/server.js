import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ======================================================
// SUPABASE
// ======================================================

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

// ======================================================
// EMAIL / GMAIL SMTP
// ======================================================

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(cors());
app.use(express.json());

// ======================================================
// ROOT
// ======================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Kumar Chemicals backend is running.",
  });
});

// ======================================================
// TEST DATABASE CONNECTION
// ======================================================

app.get("/api/test-db", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("enquiries")
      .select("id")
      .limit(1);

    if (error) {
      console.error("SUPABASE DATABASE ERROR:", error);

      return res.status(500).json({
        success: false,
        message: "Database connection failed.",
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
    }

    return res.json({
      success: true,
      message: "Database connection successful.",
      data,
    });
  } catch (error) {
    console.error("Database test error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
});

// ======================================================
// TEST EMAIL
// ======================================================

app.get("/api/test-email", async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.SMTP_USER,

      subject: "Kumar Chemicals - Email Test",

      text: `
Hello,

This is a test email from the Kumar Chemicals backend.

Your Gmail SMTP connection is working successfully.

Regards,
Kumar Chemicals
      `.trim(),

      html: `
        <div
          style="
            font-family: Arial, Helvetica, sans-serif;
            line-height: 1.6;
            max-width: 600px;
            margin: 40px auto;
            padding: 30px;
            border: 1px solid #e5e1da;
            border-radius: 12px;
          "
        >

          <h2 style="color: #C58343;">
            Kumar Chemicals
          </h2>

          <p>Hello,</p>

          <p>
            This is a test email from the
            <strong>Kumar Chemicals backend</strong>.
          </p>

          <p>
            Your Gmail SMTP connection is working successfully.
          </p>

          <p>
            Regards,<br />
            <strong>Kumar Chemicals</strong>
          </p>

        </div>
      `,
    });

    console.log("TEST EMAIL SENT:", info.messageId);

    return res.json({
      success: true,
      message: "Test email sent successfully.",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("TEST EMAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send test email.",
      error: error.message,
    });
  }
});

// ======================================================
// CUSTOMER CONFIRMATION EMAIL
// ======================================================

async function sendCustomerConfirmation(enquiry) {
  const {
    name,
    company,
    email,
    enquiry_type,
    product,
    quantity,
    delivery_location,
    required_date,
    message,
  } = enquiry;

  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM,

    // IMPORTANT:
    // This is the customer's email.
    to: email,

    subject: "Thank You for Contacting Kumar Chemicals",

    // ==================================================
    // PLAIN TEXT VERSION
    // ==================================================

    text: `
Dear ${name},

Thank you for contacting Kumar Chemicals.

We have successfully received your enquiry and our team will review your requirements shortly.

YOUR ENQUIRY DETAILS
====================

Company: ${company}
Enquiry Type: ${enquiry_type || "General Enquiry"}
Product: ${product}
Required Quantity: ${quantity}
Delivery Location: ${delivery_location || "Not specified"}
Required Delivery Date: ${required_date || "Not specified"}

Additional Requirements:
${message || "None provided"}

Our team will get back to you shortly with availability, pricing and further details.

Thank you for considering Kumar Chemicals.

Best regards,
Kumar Chemicals
Chemical Supply & Industrial Solutions

${process.env.SMTP_USER}
    `.trim(),

    // ==================================================
    // HTML VERSION
    // ==================================================

    html: `
      <div
        style="
          margin:0;
          padding:40px 20px;
          background:#F4F1EB;
          font-family:Arial,Helvetica,sans-serif;
        "
      >

        <div
          style="
            max-width:680px;
            margin:0 auto;
            background:#FFFFFF;
            border:1px solid #E7E0D6;
            border-radius:14px;
            overflow:hidden;
          "
        >

          <!-- HEADER -->

          <div
            style="
              padding:30px 34px;
              background:#120F0D;
              color:#FFFFFF;
            "
          >

            <div
              style="
                font-size:11px;
                letter-spacing:2px;
                text-transform:uppercase;
                color:#C58343;
                margin-bottom:8px;
              "
            >
              Kumar Chemicals
            </div>

            <div
              style="
                font-size:28px;
                font-weight:500;
              "
            >
              Enquiry Received
            </div>

            <div
              style="
                margin-top:8px;
                font-size:13px;
                color:#D8D1C8;
              "
            >
              Thank you for contacting us.
            </div>

          </div>


          <!-- BODY -->

          <div style="padding:34px;">

            <p
              style="
                margin:0 0 16px;
                font-size:16px;
                color:#120F0D;
              "
            >
              Dear ${name},
            </p>

            <p
              style="
                margin:0 0 22px;
                font-size:14px;
                line-height:1.8;
                color:#5F574F;
              "
            >
              Thank you for contacting
              <strong style="color:#120F0D;">
                Kumar Chemicals
              </strong>.
              We have successfully received your enquiry.
              Our team will review your requirements and
              get back to you shortly.
            </p>


            <!-- DETAILS CARD -->

            <div
              style="
                margin:25px 0;
                padding:22px;
                background:#F9F7F2;
                border-radius:10px;
              "
            >

              <div
                style="
                  margin-bottom:16px;
                  font-size:11px;
                  letter-spacing:1.5px;
                  text-transform:uppercase;
                  color:#C58343;
                  font-weight:bold;
                "
              >
                Your Enquiry Details
              </div>


              <table
                style="
                  width:100%;
                  border-collapse:collapse;
                  font-size:14px;
                "
              >

                <tr>
                  <td
                    style="
                      padding:8px 0;
                      color:#7A6E5D;
                      width:42%;
                    "
                  >
                    Company
                  </td>

                  <td
                    style="
                      padding:8px 0;
                      color:#120F0D;
                      font-weight:600;
                    "
                  >
                    ${company}
                  </td>
                </tr>


                <tr>
                  <td
                    style="
                      padding:8px 0;
                      color:#7A6E5D;
                    "
                  >
                    Enquiry Type
                  </td>

                  <td
                    style="
                      padding:8px 0;
                      color:#120F0D;
                    "
                  >
                    ${enquiry_type || "General Enquiry"}
                  </td>
                </tr>


                <tr>
                  <td
                    style="
                      padding:8px 0;
                      color:#7A6E5D;
                    "
                  >
                    Product
                  </td>

                  <td
                    style="
                      padding:8px 0;
                      color:#120F0D;
                      font-weight:600;
                    "
                  >
                    ${product}
                  </td>
                </tr>


                <tr>
                  <td
                    style="
                      padding:8px 0;
                      color:#7A6E5D;
                    "
                  >
                    Required Quantity
                  </td>

                  <td
                    style="
                      padding:8px 0;
                      color:#120F0D;
                    "
                  >
                    ${quantity}
                  </td>
                </tr>


                <tr>
                  <td
                    style="
                      padding:8px 0;
                      color:#7A6E5D;
                    "
                  >
                    Delivery Location
                  </td>

                  <td
                    style="
                      padding:8px 0;
                      color:#120F0D;
                    "
                  >
                    ${delivery_location || "Not specified"}
                  </td>
                </tr>


                <tr>
                  <td
                    style="
                      padding:8px 0;
                      color:#7A6E5D;
                    "
                  >
                    Required Date
                  </td>

                  <td
                    style="
                      padding:8px 0;
                      color:#120F0D;
                    "
                  >
                    ${required_date || "Not specified"}
                  </td>
                </tr>

              </table>

            </div>


            <!-- MESSAGE -->

            ${
              message
                ? `
                  <div style="margin:25px 0;">

                    <div
                      style="
                        margin-bottom:10px;
                        font-size:11px;
                        letter-spacing:1.5px;
                        text-transform:uppercase;
                        color:#C58343;
                        font-weight:bold;
                      "
                    >
                      Additional Requirements
                    </div>

                    <div
                      style="
                        padding:16px;
                        background:#F9F7F2;
                        border-left:3px solid #C58343;
                        border-radius:6px;
                        color:#5F574F;
                        font-size:14px;
                        line-height:1.7;
                      "
                    >
                      ${message}
                    </div>

                  </div>
                `
                : ""
            }


            <!-- NEXT STEP -->

            <div
              style="
                margin-top:28px;
                padding:20px;
                background:#120F0D;
                border-radius:9px;
                color:#FFFFFF;
              "
            >

              <div
                style="
                  font-size:13px;
                  font-weight:bold;
                  margin-bottom:7px;
                "
              >
                What happens next?
              </div>

              <div
                style="
                  font-size:13px;
                  line-height:1.7;
                  color:#D8D1C8;
                "
              >
                Our team will review your requirement and
                contact you regarding availability, pricing,
                specifications and delivery.
              </div>

            </div>


            <!-- SIGNATURE -->

            <p
              style="
                margin:30px 0 0;
                font-size:14px;
                line-height:1.7;
                color:#5F574F;
              "
            >
              Best regards,<br />

              <strong style="color:#120F0D;">
                Kumar Chemicals
              </strong>
              <br />

              Chemical Supply & Industrial Solutions
            </p>

          </div>


          <!-- FOOTER -->

          <div
            style="
              padding:20px 34px;
              background:#F9F7F2;
              border-top:1px solid #E7E0D6;
              text-align:center;
            "
          >

            <p
              style="
                margin:0;
                font-size:11px;
                line-height:1.6;
                color:#8A8177;
              "
            >
              This is an automated confirmation that we have
              received your enquiry.
            </p>

          </div>

        </div>

      </div>
    `,
  });

  console.log(
    "CUSTOMER CONFIRMATION EMAIL SENT:",
    info.messageId,
    "TO:",
    email
  );

  return info;
}

// ======================================================
// INTERNAL ENQUIRY NOTIFICATION
// ======================================================

async function sendInternalNotification(enquiry) {
  const {
    name,
    company,
    phone,
    email,
    enquiry_type,
    product,
    quantity,
    delivery_location,
    required_date,
    message,
  } = enquiry;

  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM,

    // This goes to Kumar Chemicals
    to: process.env.SMTP_USER,

    // When you click Reply in Gmail,
    // it replies directly to the customer.
    replyTo: email,

    subject: `New Enquiry — ${product} — ${company}`,

    text: `
NEW CUSTOMER ENQUIRY
====================

Customer Name: ${name}
Company: ${company}
Phone: ${phone}
Email: ${email}

Enquiry Type:
${enquiry_type || "General Enquiry"}

Product:
${product}

Required Quantity:
${quantity}

Delivery Location:
${delivery_location || "Not specified"}

Required Delivery Date:
${required_date || "Not specified"}

Additional Requirements:
${message || "None"}

====================

This enquiry was submitted through the Kumar Chemicals website.

Regards,
Kumar Chemicals Website
    `.trim(),

    html: `
      <div
        style="
          margin:0;
          padding:40px 20px;
          background:#F4F1EB;
          font-family:Arial,Helvetica,sans-serif;
        "
      >

        <div
          style="
            max-width:680px;
            margin:0 auto;
            background:#FFFFFF;
            border:1px solid #E7E0D6;
            border-radius:14px;
            overflow:hidden;
          "
        >

          <!-- HEADER -->

          <div
            style="
              padding:28px 32px;
              background:#120F0D;
              color:#FFFFFF;
            "
          >

            <div
              style="
                font-size:11px;
                letter-spacing:2px;
                text-transform:uppercase;
                color:#C58343;
                margin-bottom:8px;
              "
            >
              Kumar Chemicals
            </div>

            <div
              style="
                font-size:26px;
                font-weight:600;
              "
            >
              New Customer Enquiry
            </div>

            <div
              style="
                margin-top:8px;
                font-size:13px;
                color:#D8D1C8;
              "
            >
              A new enquiry has been submitted through your website.
            </div>

          </div>


          <!-- CUSTOMER INFORMATION -->

          <div style="padding:30px 32px 10px;">

            <div
              style="
                font-size:11px;
                letter-spacing:1.5px;
                text-transform:uppercase;
                color:#C58343;
                font-weight:bold;
                margin-bottom:14px;
              "
            >
              Customer Information
            </div>


            <table
              style="
                width:100%;
                border-collapse:collapse;
                font-size:14px;
              "
            >

              <tr>
                <td
                  style="
                    padding:9px 0;
                    color:#7A6E5D;
                    width:180px;
                  "
                >
                  Name
                </td>

                <td
                  style="
                    padding:9px 0;
                    color:#120F0D;
                    font-weight:600;
                  "
                >
                  ${name}
                </td>
              </tr>


              <tr>
                <td
                  style="
                    padding:9px 0;
                    color:#7A6E5D;
                  "
                >
                  Company
                </td>

                <td
                  style="
                    padding:9px 0;
                    color:#120F0D;
                    font-weight:600;
                  "
                >
                  ${company}
                </td>
              </tr>


              <tr>
                <td
                  style="
                    padding:9px 0;
                    color:#7A6E5D;
                  "
                >
                  Phone
                </td>

                <td style="padding:9px 0;">

                  <a
                    href="tel:${phone}"
                    style="
                      color:#120F0D;
                      text-decoration:none;
                    "
                  >
                    ${phone}
                  </a>

                </td>
              </tr>


              <tr>
                <td
                  style="
                    padding:9px 0;
                    color:#7A6E5D;
                  "
                >
                  Email
                </td>

                <td style="padding:9px 0;">

                  <a
                    href="mailto:${email}"
                    style="
                      color:#C58343;
                      text-decoration:none;
                    "
                  >
                    ${email}
                  </a>

                </td>
              </tr>


              <tr>
                <td
                  style="
                    padding:9px 0;
                    color:#7A6E5D;
                  "
                >
                  Enquiry Type
                </td>

                <td
                  style="
                    padding:9px 0;
                    color:#120F0D;
                  "
                >
                  ${enquiry_type || "General Enquiry"}
                </td>
              </tr>

            </table>

          </div>


          <!-- REQUIREMENT DETAILS -->

          <div style="padding:20px 32px 10px;">

            <div
              style="
                font-size:11px;
                letter-spacing:1.5px;
                text-transform:uppercase;
                color:#C58343;
                font-weight:bold;
                margin-bottom:14px;
              "
            >
              Requirement Details
            </div>


            <table
              style="
                width:100%;
                border-collapse:collapse;
                font-size:14px;
              "
            >

              <tr>
                <td
                  style="
                    padding:9px 0;
                    color:#7A6E5D;
                    width:180px;
                  "
                >
                  Product
                </td>

                <td
                  style="
                    padding:9px 0;
                    color:#120F0D;
                    font-weight:600;
                  "
                >
                  ${product}
                </td>
              </tr>


              <tr>
                <td
                  style="
                    padding:9px 0;
                    color:#7A6E5D;
                  "
                >
                  Quantity
                </td>

                <td
                  style="
                    padding:9px 0;
                    color:#120F0D;
                    font-weight:600;
                  "
                >
                  ${quantity}
                </td>
              </tr>


              <tr>
                <td
                  style="
                    padding:9px 0;
                    color:#7A6E5D;
                  "
                >
                  Delivery Location
                </td>

                <td
                  style="
                    padding:9px 0;
                    color:#120F0D;
                  "
                >
                  ${delivery_location || "Not specified"}
                </td>
              </tr>


              <tr>
                <td
                  style="
                    padding:9px 0;
                    color:#7A6E5D;
                  "
                >
                  Required Date
                </td>

                <td
                  style="
                    padding:9px 0;
                    color:#120F0D;
                  "
                >
                  ${required_date || "Not specified"}
                </td>
              </tr>

            </table>

          </div>


          <!-- MESSAGE -->

          <div style="padding:20px 32px 30px;">

            <div
              style="
                font-size:11px;
                letter-spacing:1.5px;
                text-transform:uppercase;
                color:#C58343;
                font-weight:bold;
                margin-bottom:12px;
              "
            >
              Additional Requirements
            </div>


            <div
              style="
                padding:18px;
                background:#F9F7F2;
                border-left:3px solid #C58343;
                border-radius:6px;
                color:#2F2720;
                font-size:14px;
                line-height:1.7;
                white-space:pre-wrap;
              "
            >
              ${message || "No additional requirements provided."}
            </div>

          </div>


          <!-- FOOTER -->

          <div
            style="
              padding:20px 32px;
              background:#F9F7F2;
              border-top:1px solid #E7E0D6;
              color:#7A6E5D;
              font-size:12px;
              line-height:1.6;
            "
          >

            This enquiry was submitted through the
            <strong style="color:#120F0D;">
              Kumar Chemicals
            </strong>
            website.

          </div>

        </div>

      </div>
    `,
  });

  console.log(
    "INTERNAL ENQUIRY EMAIL SENT:",
    info.messageId
  );

  return info;
}

// ======================================================
// CREATE NEW ENQUIRY
// ======================================================

app.post("/api/enquiries", async (req, res) => {
  try {
    const {
      name,
      company,
      phone,
      email,
      enquiry_type,
      product,
      quantity,
      delivery_location,
      required_date,
      message,
    } = req.body;

    // ==================================================
    // BASIC VALIDATION
    // ==================================================

    if (
      !name ||
      !company ||
      !phone ||
      !email ||
      !product ||
      !quantity
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required enquiry details.",
      });
    }

    // ==================================================
    // SAVE TO SUPABASE
    // ==================================================

    const { data, error } = await supabase
      .from("enquiries")
      .insert([
        {
          name,
          company,
          phone,
          email,
          enquiry_type:
            enquiry_type || "General Enquiry",
          product,
          quantity,
          delivery_location:
            delivery_location || null,
          required_date:
            required_date || null,
          message:
            message || null,
          status: "NEW",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(
        "SUPABASE INSERT ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to save enquiry.",
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
    }

    console.log(
      "ENQUIRY SAVED:",
      data.id
    );

    // ==================================================
    // SEND CUSTOMER CONFIRMATION EMAIL
    // ==================================================

    try {
      await sendCustomerConfirmation(data);

      console.log(
        "CUSTOMER CONFIRMATION SENT TO:",
        data.email
      );
    } catch (emailError) {
      console.error(
        "CUSTOMER CONFIRMATION EMAIL ERROR:",
        emailError
      );
    }

    // ==================================================
    // SEND INTERNAL NOTIFICATION EMAIL
    // ==================================================

    try {
      await sendInternalNotification(data);

      console.log(
        "INTERNAL NOTIFICATION SENT TO:",
        process.env.SMTP_USER
      );
    } catch (emailError) {
      console.error(
        "INTERNAL NOTIFICATION EMAIL ERROR:",
        emailError
      );
    }

    // ==================================================
    // RESPONSE
    // ==================================================

    return res.status(201).json({
      success: true,
      message:
        "Enquiry submitted successfully.",
      enquiry: data,
    });

  } catch (error) {
    console.error(
      "ENQUIRY API ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while submitting the enquiry.",
    });
  }
});

// ======================================================
// GET ALL ENQUIRIES
// ======================================================

app.get("/api/enquiries", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "SUPABASE FETCH ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch enquiries.",
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
    }

    return res.json({
      success: true,
      enquiries: data || [],
    });

  } catch (error) {
    console.error(
      "GET ENQUIRIES ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching enquiries.",
    });
  }
});

// ======================================================
// GET SINGLE ENQUIRY
// ======================================================

app.get("/api/enquiries/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(
        "SUPABASE SINGLE ENQUIRY ERROR:",
        error
      );

      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
        error: error.message,
      });
    }

    return res.json({
      success: true,
      enquiry: data,
    });

  } catch (error) {
    console.error(
      "GET SINGLE ENQUIRY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching the enquiry.",
    });
  }
});

// ======================================================
// UPDATE ENQUIRY
// STATUS + ADMIN NOTES
// ======================================================

app.patch("/api/enquiries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      status,
      admin_notes,
    } = req.body;

    const updates = {};

    if (status !== undefined) {
      updates.status = status;
    }

    if (admin_notes !== undefined) {
      updates.admin_notes = admin_notes;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "No fields provided for update.",
      });
    }

    const { data, error } = await supabase
      .from("enquiries")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(
        "SUPABASE UPDATE ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update enquiry.",
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
    }

    return res.json({
      success: true,
      message:
        "Enquiry updated successfully.",
      enquiry: data,
    });

  } catch (error) {
    console.error(
      "UPDATE ENQUIRY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while updating the enquiry.",
    });
  }
});

// ======================================================
// DELETE ENQUIRY
// ======================================================

app.delete("/api/enquiries/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("enquiries")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(
        "SUPABASE DELETE ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete enquiry.",
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
    }

    return res.json({
      success: true,
      message:
        "Enquiry deleted successfully.",
      enquiry: data,
    });

  } catch (error) {
    console.error(
      "DELETE ENQUIRY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while deleting the enquiry.",
    });
  }
});

// ======================================================
// 404 HANDLER
// ======================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

// ======================================================
// START SERVER
// ======================================================

app.listen(PORT, () => {
  console.log(
    `Kumar Chemicals backend running on port ${PORT}`
  );
});