import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

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
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        throw error;
      }

      if (!data?.user) {
        throw new Error(
          "Login failed. Please try again."
        );
      }

      navigate("/admin");
    } catch (err) {
      console.error(
        "Admin login error:",
        err
      );

      setError(
        err.message ||
          "Unable to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">

      <style>{`

        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          min-height: 100%;
          margin: 0;
        }

        body {
          background: ${T.ivory};
        }

        button,
        input {
          font: inherit;
        }

        .admin-login-page {
          min-height: 100vh;
          width: 100%;
          background: ${T.ivory};
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 24px;
          font-family: ${SANS};
        }

        .admin-login-card {
          width: 100%;
          max-width: 440px;
          background: ${T.white};
          border: 1px solid ${T.line};
          border-radius: 28px;
          padding: 44px;
          box-shadow:
            0 25px 70px
            rgba(18, 15, 13, 0.10);
        }

        .admin-login-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .admin-login-icon {
          width: 58px;
          height: 58px;
          margin: 0 auto 20px;
          border-radius: 18px;
          background: ${T.ink};
          color: ${T.white};
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .admin-login-eyebrow {
          font-family: ${MONO};
          font-size: 10px;
          letter-spacing: 0.16em;
          color: ${T.accent};
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .admin-login-title {
          font-family: ${SERIF};
          font-size: 38px;
          line-height: 1;
          font-weight: 500;
          color: ${T.ink};
          margin: 0;
        }

        .admin-login-subtitle {
          margin: 10px 0 0;
          color: ${T.muted};
          font-size: 14px;
          line-height: 1.5;
        }

        .admin-login-error {
          margin-bottom: 20px;
          padding: 12px 14px;
          border-radius: 10px;
          background: #fff1f0;
          border: 1px solid #f1c8c5;
          color: #a33a32;
          font-size: 13px;
          line-height: 1.5;
          word-break: break-word;
        }

        .admin-login-field {
          margin-bottom: 18px;
        }

        .admin-login-label {
          display: block;
          font-family: ${MONO};
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: ${T.muted};
          margin-bottom: 7px;
        }

        .admin-login-input-wrap {
          position: relative;
          width: 100%;
        }

        .admin-login-input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: ${T.muted};
          pointer-events: none;
        }

        .admin-login-input {
          width: 100%;
          min-height: 48px;
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
          box-shadow:
            0 0 0 3px
            rgba(197, 131, 67, 0.08);
        }

        .admin-login-input::placeholder {
          color: #aaa;
        }

        .admin-login-button {
          width: 100%;
          min-height: 50px;
          border: none;
          border-radius: 12px;
          padding: 15px 18px;
          background: ${T.ink};
          color: ${T.white};
          font-family: ${SANS};
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 180ms ease;
        }

        .admin-login-button:hover {
          opacity: 0.92;
          transform: translateY(-1px);
        }

        .admin-login-button:active {
          transform: translateY(0);
        }

        .admin-login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .admin-login-footer {
          margin-top: 26px;
          text-align: center;
          font-family: ${MONO};
          font-size: 10px;
          color: ${T.muted};
          letter-spacing: 0.04em;
        }

        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 600px) {
          .admin-login-page {
            padding: 18px;
          }

          .admin-login-card {
            max-width: 440px;
            border-radius: 22px;
            padding: 32px 24px;
          }

          .admin-login-header {
            margin-bottom: 30px;
          }

          .admin-login-icon {
            width: 54px;
            height: 54px;
            border-radius: 16px;
            margin-bottom: 17px;
          }

          .admin-login-title {
            font-size: 34px;
          }

          .admin-login-subtitle {
            font-size: 13px;
          }
        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 420px) {
          .admin-login-page {
            padding: 12px;
            align-items: center;
          }

          .admin-login-card {
            border-radius: 20px;
            padding: 28px 18px;
          }

          .admin-login-header {
            margin-bottom: 26px;
          }

          .admin-login-icon {
            width: 50px;
            height: 50px;
            border-radius: 15px;
            margin-bottom: 15px;
          }

          .admin-login-icon svg {
            width: 25px;
            height: 25px;
          }

          .admin-login-eyebrow {
            font-size: 9px;
            letter-spacing: 0.13em;
          }

          .admin-login-title {
            font-size: 31px;
          }

          .admin-login-subtitle {
            font-size: 12px;
            margin-top: 8px;
          }

          .admin-login-field {
            margin-bottom: 16px;
          }

          .admin-login-input {
            min-height: 48px;
            font-size: 13px;
          }

          .admin-login-button {
            min-height: 49px;
            font-size: 13px;
          }

          .admin-login-footer {
            margin-top: 22px;
            font-size: 9px;
          }
        }

        /* ==================================================
           VERY SMALL PHONES
        ================================================== */

        @media (max-width: 340px) {
          .admin-login-page {
            padding: 8px;
          }

          .admin-login-card {
            padding: 25px 15px;
          }

          .admin-login-title {
            font-size: 28px;
          }

          .admin-login-eyebrow {
            font-size: 8px;
          }
        }

      `}</style>

      <div className="admin-login-card">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="admin-login-header">

          <div className="admin-login-icon">
            <ShieldCheck
              size={28}
              strokeWidth={1.6}
            />
          </div>

          <div className="admin-login-eyebrow">
            SECURE ADMIN ACCESS
          </div>

          <h1 className="admin-login-title">
            Kumar Chemicals
          </h1>

          <p className="admin-login-subtitle">
            Sign in to your administration panel.
          </p>

        </div>

        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (
          <div className="admin-login-error">
            {error}
          </div>
        )}

        {/* ==================================================
            FORM
        ================================================== */}

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <div className="admin-login-field">

            <label className="admin-login-label">
              Admin Email
            </label>

            <div className="admin-login-input-wrap">

              <Mail
                className="admin-login-input-icon"
                size={17}
              />

              <input
                className="admin-login-input"
                type="email"
                placeholder="admin@kumarchemicals.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                autoComplete="email"
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div
            className="admin-login-field"
            style={{
              marginBottom: "24px",
            }}
          >

            <label className="admin-login-label">
              Password
            </label>

            <div className="admin-login-input-wrap">

              <Lock
                className="admin-login-input-icon"
                size={17}
              />

              <input
                className="admin-login-input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                autoComplete="current-password"
              />

            </div>

          </div>

          {/* LOGIN */}

          <button
            className="admin-login-button"
            type="submit"
            disabled={loading}
          >

            <span>
              {loading
                ? "Authenticating..."
                : "Enter Dashboard"}
            </span>

            {!loading && (
              <ArrowRight size={16} />
            )}

          </button>

        </form>

        {/* ==================================================
            FOOTER
        ================================================== */}

        <div className="admin-login-footer">
          AUTHENTICATED ACCESS ONLY
        </div>

      </div>

    </div>
  );
}