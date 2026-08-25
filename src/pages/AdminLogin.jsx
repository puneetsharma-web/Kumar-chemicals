import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

const T = {
  ivory: "#F9F7F2",
  ink: "#120F0D",
  ink2: "#2F2720",
  muted: "#7A6E5D",
  white: "#FFFFFF",
  accent: "#C58343",
  line: "rgba(18, 15, 13, 0.1)",
};

const SANS = `"DM Sans", "Inter", sans-serif`;
const SERIF = `"Cormorant Garamond", "Garamond", "Georgia", serif`;
const MONO = `"DM Mono", "Courier New", monospace`;

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (!data?.user) {
        throw new Error("Login failed. Please try again.");
      }

      navigate("/admin");
    } catch (err) {
      console.error("Admin login error:", err);

      setError(
        err.message || "Unable to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.ivory,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        fontFamily: SANS,
      }}
    >
      <style>{`
        .admin-login-input {
          width: 100%;
          box-sizing: border-box;
          padding: 14px 16px 14px 44px;
          border: 1px solid ${T.line};
          border-radius: 12px;
          background: ${T.white};
          color: ${T.ink};
          font-family: ${SANS};
          font-size: 14px;
          outline: none;
          transition: all 180ms ease;
        }

        .admin-login-input:focus {
          border-color: ${T.accent};
          box-shadow: 0 0 0 3px rgba(197, 131, 67, 0.08);
        }

        .admin-login-input::placeholder {
          color: #aaa;
        }

        .admin-login-button:hover {
          opacity: 0.92;
          transform: translateY(-1px);
        }

        .admin-login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          background: T.white,
          border: `1px solid ${T.line}`,
          borderRadius: "28px",
          padding: "44px",
          boxShadow: "0 25px 70px rgba(18, 15, 13, 0.10)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div
            style={{
              width: "58px",
              height: "58px",
              margin: "0 auto 20px",
              borderRadius: "18px",
              background: T.ink,
              color: T.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShieldCheck size={28} strokeWidth={1.6} />
          </div>

          <div
            style={{
              fontFamily: MONO,
              fontSize: "10px",
              letterSpacing: "0.16em",
              color: T.accent,
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            SECURE ADMIN ACCESS
          </div>

          <h1
            style={{
              fontFamily: SERIF,
              fontSize: "38px",
              fontWeight: 500,
              color: T.ink,
              margin: 0,
            }}
          >
            Kumar Chemicals
          </h1>

          <p
            style={{
              margin: "10px 0 0",
              color: T.muted,
              fontSize: "14px",
            }}
          >
            Sign in to your administration panel.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              marginBottom: "20px",
              padding: "12px 14px",
              borderRadius: "10px",
              background: "#fff1f0",
              border: "1px solid #f1c8c5",
              color: "#a33a32",
              fontSize: "13px",
              lineHeight: "1.5",
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                fontFamily: MONO,
                fontSize: "10px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: T.muted,
                marginBottom: "7px",
              }}
            >
              Admin Email
            </label>

            <div style={{ position: "relative" }}>
              <Mail
                size={17}
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: T.muted,
                  pointerEvents: "none",
                }}
              />

              <input
                className="admin-login-input"
                type="email"
                placeholder="admin@kumarchemicals.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontFamily: MONO,
                fontSize: "10px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: T.muted,
                marginBottom: "7px",
              }}
            >
              Password
            </label>

            <div style={{ position: "relative" }}>
              <Lock
                size={17}
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: T.muted,
                  pointerEvents: "none",
                }}
              />

              <input
                className="admin-login-input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* Login button */}
          <button
            className="admin-login-button"
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              border: "none",
              borderRadius: "12px",
              padding: "15px 18px",
              background: T.ink,
              color: T.white,
              fontFamily: SANS,
              fontSize: "14px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 180ms ease",
            }}
          >
            <span>{loading ? "Authenticating..." : "Enter Dashboard"}</span>

            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        {/* Footer */}
        <div
          style={{
            marginTop: "26px",
            textAlign: "center",
            fontFamily: MONO,
            fontSize: "10px",
            color: T.muted,
            letterSpacing: "0.04em",
          }}
        >
          AUTHENTICATED ACCESS ONLY
        </div>
      </div>
    </div>
  );
}