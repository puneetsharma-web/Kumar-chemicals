import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

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

    // ----------------------------------------------
    // BASIC VALIDATION
    // ----------------------------------------------

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

    // ----------------------------------------------
    // INSERT
    // ----------------------------------------------

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
          message: message || null,
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

    // ----------------------------------------------
    // RESPONSE
    // ----------------------------------------------

    return res.status(201).json({
      success: true,
      message:
        "Enquiry submitted successfully.",
      enquiry: data,
    });
  } catch (error) {
    console.error(
      "Enquiry API error:",
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
      "Get enquiries error:",
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
      "Get single enquiry error:",
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
// UPDATE ENQUIRY STATUS
// ======================================================

// ======================================================
// UPDATE ENQUIRY
// Status + Admin Notes
// ======================================================

app.patch("/api/enquiries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_notes } = req.body;

    // Build only the fields that were actually sent
    const updates = {};

    if (status !== undefined) {
      updates.status = status;
    }

    if (admin_notes !== undefined) {
      updates.admin_notes = admin_notes;
    }

    // Make sure something is being updated
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update.",
      });
    }

    const { data, error } = await supabase
      .from("enquiries")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("SUPABASE UPDATE ERROR:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to update enquiry.",
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
    }

    res.json({
      success: true,
      message: "Enquiry updated successfully.",
      enquiry: data,
    });
  } catch (error) {
    console.error("Update enquiry error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while updating the enquiry.",
    });
  }
});

// ======================================================
// DELETE ENQUIRY
// ======================================================

app.delete("/api/enquiries/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ----------------------------------------------
    // DELETE
    // ----------------------------------------------

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

    // ----------------------------------------------
    // RESPONSE
    // ----------------------------------------------

    return res.json({
      success: true,
      message:
        "Enquiry deleted successfully.",
      enquiry: data,
    });
  } catch (error) {
    console.error(
      "Delete enquiry error:",
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