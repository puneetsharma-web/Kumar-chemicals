import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// ======================================================
// SEND CUSTOMER CONFIRMATION
// ======================================================

export async function sendCustomerConfirmation(enquiry) {
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

  await transporter.sendMail({
    from: `"Kumar Chemicals" <${process.env.EMAIL_USER}>`,
    to: email,

    subject: "Thank You for Contacting Kumar Chemicals",

    text: `
Dear ${name},

Thank you for contacting Kumar Chemicals.

We have successfully received your enquiry and our team will review your requirements shortly.

Here are the details we received:

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

${process.env.EMAIL_USER}
    `.trim(),

    html: `
      <div style="margin:0;padding:0;background:#f5f3ef;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:650px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e1da;">

          <div style="padding:30px 35px;background:#120f0d;color:#ffffff;">
            <h1 style="margin:0;font-size:25px;font-weight:500;">
              Kumar Chemicals
            </h1>

            <p style="margin:8px 0 0;color:#d8d0c6;font-size:13px;">
              Chemical Supply & Industrial Solutions
            </p>
          </div>

          <div style="padding:35px;">

            <p style="font-size:16px;color:#120f0d;">
              Dear ${name},
            </p>

            <p style="font-size:14px;line-height:1.7;color:#5f574f;">
              Thank you for contacting <strong>Kumar Chemicals</strong>.
              We have successfully received your enquiry and our team
              will review your requirements shortly.
            </p>

            <div style="margin:25px 0;padding:20px;background:#f9f7f2;border-radius:10px;">

              <h2 style="margin:0 0 18px;font-size:16px;color:#120f0d;">
                Your Enquiry Details
              </h2>

              <table style="width:100%;border-collapse:collapse;font-size:13px;">

                <tr>
                  <td style="padding:8px 0;color:#7a6e5d;width:40%;">
                    Company
                  </td>
                  <td style="padding:8px 0;color:#120f0d;font-weight:600;">
                    ${company}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px 0;color:#7a6e5d;">
                    Enquiry Type
                  </td>
                  <td style="padding:8px 0;color:#120f0d;">
                    ${enquiry_type || "General Enquiry"}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px 0;color:#7a6e5d;">
                    Product
                  </td>
                  <td style="padding:8px 0;color:#120f0d;font-weight:600;">
                    ${product}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px 0;color:#7a6e5d;">
                    Quantity
                  </td>
                  <td style="padding:8px 0;color:#120f0d;">
                    ${quantity}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px 0;color:#7a6e5d;">
                    Delivery Location
                  </td>
                  <td style="padding:8px 0;color:#120f0d;">
                    ${delivery_location || "Not specified"}
                  </td>
                </tr>

                <tr>
                  <td style="padding:8px 0;color:#7a6e5d;">
                    Required Date
                  </td>
                  <td style="padding:8px 0;color:#120f0d;">
                    ${required_date || "Not specified"}
                  </td>
                </tr>

              </table>
            </div>

            ${
              message
                ? `
                  <div style="margin:25px 0;">
                    <h3 style="font-size:14px;color:#120f0d;">
                      Additional Requirements
                    </h3>

                    <p style="padding:15px;background:#f9f7f2;border-radius:8px;font-size:13px;line-height:1.6;color:#5f574f;">
                      ${message}
                    </p>
                  </div>
                `
                : ""
            }

            <p style="font-size:14px;line-height:1.7;color:#5f574f;">
              Our team will get back to you shortly with availability,
              pricing and further details.
            </p>

            <p style="margin-top:30px;font-size:14px;color:#120f0d;">
              Best regards,<br />
              <strong>Kumar Chemicals</strong><br />
              <span style="color:#7a6e5d;">
                Chemical Supply & Industrial Solutions
              </span>
            </p>

          </div>

          <div style="padding:20px 35px;background:#f9f7f2;border-top:1px solid #e5e1da;">
            <p style="margin:0;font-size:11px;color:#8a8177;text-align:center;">
              This is an automated confirmation of your enquiry.
              Please do not reply to this email.
            </p>
          </div>

        </div>
      </div>
    `,
  });
}


// ======================================================
// SEND INTERNAL NOTIFICATION
// ======================================================

export async function sendInternalNotification(enquiry) {
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

  await transporter.sendMail({
    from: `"Kumar Chemicals Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,

    subject: `🚨 New Enquiry — ${company} — ${product}`,

    text: `
NEW ENQUIRY RECEIVED

Name: ${name}
Company: ${company}
Phone: ${phone}
Email: ${email}

Enquiry Type: ${enquiry_type}
Product: ${product}
Quantity: ${quantity}

Delivery Location:
${delivery_location || "Not specified"}

Required Date:
${required_date || "Not specified"}

Additional Requirements:
${message || "None"}

Please check the Kumar Chemicals admin dashboard.
    `.trim(),

    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:650px;margin:auto;">

        <div style="background:#120f0d;color:white;padding:25px;">
          <h2 style="margin:0;">
            New Website Enquiry
          </h2>

          <p style="margin:7px 0 0;color:#d8d0c6;">
            Kumar Chemicals
          </p>
        </div>

        <div style="padding:30px;background:#ffffff;">

          <h3 style="margin-top:0;">
            Customer Information
          </h3>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>

          <hr style="border:none;border-top:1px solid #ddd;margin:25px 0;" />

          <h3>Enquiry</h3>

          <p><strong>Type:</strong> ${enquiry_type}</p>
          <p><strong>Product:</strong> ${product}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <p><strong>Delivery Location:</strong> ${
            delivery_location || "Not specified"
          }</p>
          <p><strong>Required Date:</strong> ${
            required_date || "Not specified"
          }</p>

          <hr style="border:none;border-top:1px solid #ddd;margin:25px 0;" />

          <h3>Additional Requirements</h3>

          <p style="line-height:1.6;">
            ${message || "None provided"}
          </p>

        </div>

      </div>
    `,
  });
}