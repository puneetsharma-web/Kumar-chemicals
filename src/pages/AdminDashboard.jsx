import { useEffect, useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  Eye,
  X,
  Phone,
  Mail,
  MapPin,
  Building2,
  Package,
  CalendarDays,
  MessageSquare,
  CheckCircle2,
  Clock3,
  Users,
  Trash2,
  ChevronDown,
  AlertCircle,
} from "lucide-react";

const API_URL = "http://localhost:5000";

const COLORS = {
  bg: "#F6F3ED",
  card: "#FFFFFF",
  ink: "#171411",
  text: "#342D27",
  muted: "#74695E",
  lightMuted: "#9B9188",
  border: "#E5DED5",
  accent: "#C58343",
  accentDark: "#A9682F",
  accentSoft: "#F7EBDD",
  green: "#287A4B",
  greenSoft: "#E8F5ED",
  blue: "#3D638F",
  blueSoft: "#EAF1F8",
  orange: "#B86B20",
  orangeSoft: "#FBF0E4",
  red: "#B63B32",
  redSoft: "#FBEAE8",
};

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // ======================================================
  // FETCH ENQUIRIES
  // ======================================================

  const fetchEnquiries = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(`${API_URL}/api/enquiries`);

      if (!response.ok) {
        throw new Error("Failed to fetch enquiries");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch enquiries");
      }

      setEnquiries(data.enquiries || []);
    } catch (err) {
      console.error("Dashboard fetch error:", err);

      setError(
        "Could not connect to the backend. Make sure your backend is running on port 5000."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // ======================================================
  // STATS
  // ======================================================

  const stats = useMemo(() => {
    const total = enquiries.length;

    const newCount = enquiries.filter(
      (item) => String(item.status || "").toUpperCase() === "NEW"
    ).length;

    const contactedCount = enquiries.filter(
      (item) => String(item.status || "").toUpperCase() === "CONTACTED"
    ).length;

    const completedCount = enquiries.filter(
      (item) => String(item.status || "").toUpperCase() === "COMPLETED"
    ).length;

    return {
      total,
      newCount,
      contactedCount,
      completedCount,
    };
  }, [enquiries]);

  // ======================================================
  // SEARCH + FILTER
  // ======================================================

  const filteredEnquiries = useMemo(() => {
    const query = search.trim().toLowerCase();

    return enquiries.filter((item) => {
      const status = String(item.status || "").toUpperCase();

      const matchesStatus =
        statusFilter === "ALL" || status === statusFilter;

      if (!matchesStatus) return false;

      if (!query) return true;

      return [
        item.name,
        item.company,
        item.phone,
        item.email,
        item.product,
        item.quantity,
        item.delivery_location,
        item.enquiry_type,
        item.message,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(query)
        );
    });
  }, [enquiries, search, statusFilter]);

  // ======================================================
  // UPDATE STATUS
  // ======================================================

  const updateStatus = async (id, newStatus) => {
    try {
      setUpdatingId(id);

      const response = await fetch(`${API_URL}/api/enquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to update enquiry status."
        );
      }

      setEnquiries((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                status: newStatus,
              }
            : item
        )
      );

      setSelectedEnquiry((current) =>
        current && current.id === id
          ? {
              ...current,
              status: newStatus,
            }
          : current
      );
    } catch (err) {
      console.error("Status update error:", err);

      alert(
        "Status could not be updated yet.\n\nYour backend needs the PATCH /api/enquiries/:id route."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ======================================================
  // DELETE
  // ======================================================

  const deleteEnquiry = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this enquiry?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/api/enquiries/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to delete enquiry."
        );
      }

      setEnquiries((current) =>
        current.filter((item) => item.id !== id)
      );

      setSelectedEnquiry(null);
    } catch (err) {
      console.error("Delete error:", err);

      alert(
        "Delete is not connected yet.\n\nYour backend needs the DELETE /api/enquiries/:id route."
      );
    }
  };

  // ======================================================
  // DATE
  // ======================================================

  const formatDate = (date) => {
    if (!date) return "—";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return "—";

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div className="admin-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          margin: 0;
          min-height: 100%;
        }

        body {
          background: ${COLORS.bg};
        }

        button,
        input,
        select {
          font: inherit;
        }

        button {
          -webkit-tap-highlight-color: transparent;
        }

        .admin-page {
          min-height: 100vh;
          background: ${COLORS.bg};
          color: ${COLORS.ink};
          font-family:
            "DM Sans",
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .admin-shell {
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
          padding: 34px 42px 60px;
        }

        /* ==================================================
           HEADER
        ================================================== */

        .admin-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 42px;
        }

        .brand {
          color: ${COLORS.accent};
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .admin-title {
          margin: 9px 0 6px;
          color: ${COLORS.ink};
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 46px;
          line-height: 1;
          font-weight: 500;
          letter-spacing: -0.025em;
        }

        .admin-subtitle {
          margin: 0;
          color: ${COLORS.muted};
          font-size: 15px;
          line-height: 1.5;
        }

        .top-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .action-btn {
          border: 1px solid ${COLORS.border};
          background: ${COLORS.card};
          color: ${COLORS.text};
          min-height: 44px;
          padding: 0 16px;
          border-radius: 11px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          transition: 180ms ease;
        }

        .action-btn:hover {
          border-color: ${COLORS.accent};
          color: ${COLORS.accentDark};
          transform: translateY(-1px);
        }

        .action-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* ==================================================
           STATS
        ================================================== */

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 26px;
        }

        .stat-card {
          background: ${COLORS.card};
          border: 1px solid ${COLORS.border};
          border-radius: 18px;
          padding: 22px;
          min-height: 145px;
          position: relative;
          overflow: hidden;
        }

        .stat-card::after {
          content: "";
          position: absolute;
          right: -30px;
          bottom: -30px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: ${COLORS.accentSoft};
        }

        .stat-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${COLORS.accentSoft};
          color: ${COLORS.accentDark};
          margin-bottom: 16px;
        }

        .stat-label {
          color: ${COLORS.muted};
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 700;
        }

        .stat-value {
          margin-top: 5px;
          color: ${COLORS.ink};
          font-size: 30px;
          font-weight: 700;
          line-height: 1;
        }

        /* ==================================================
           WORKSPACE
        ================================================== */

        .workspace {
          background: ${COLORS.card};
          border: 1px solid ${COLORS.border};
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 12px 35px rgba(43, 32, 22, 0.035);
        }

        .workspace-header {
          padding: 22px 24px;
          border-bottom: 1px solid ${COLORS.border};
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .section-title {
          margin: 0;
          color: ${COLORS.ink};
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 28px;
          font-weight: 600;
        }

        .section-count {
          color: ${COLORS.lightMuted};
          font-size: 12px;
          margin-top: 3px;
        }

        .toolbar {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .search-box {
          width: 270px;
          height: 42px;
          border: 1px solid ${COLORS.border};
          background: #FCFBF9;
          border-radius: 10px;
          display: flex;
          align-items: center;
          padding: 0 12px;
          gap: 8px;
        }

        .search-box svg {
          color: ${COLORS.lightMuted};
          flex-shrink: 0;
        }

        .search-box input {
          width: 100%;
          min-width: 0;
          border: none;
          outline: none;
          background: transparent;
          color: ${COLORS.ink};
          font-size: 13px;
        }

        .search-box input::placeholder {
          color: ${COLORS.lightMuted};
        }

        .filter-wrap {
          position: relative;
        }

        .filter-select {
          height: 42px;
          min-width: 145px;
          appearance: none;
          border: 1px solid ${COLORS.border};
          background: #FCFBF9;
          border-radius: 10px;
          padding: 0 35px 0 13px;
          color: ${COLORS.text};
          outline: none;
          cursor: pointer;
          font-size: 13px;
        }

        .filter-arrow {
          position: absolute;
          right: 11px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: ${COLORS.muted};
        }

        /* ==================================================
           TABLE
        ================================================== */

        .table-wrap {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1050px;
        }

        thead {
          background: #FBF9F5;
        }

        th {
          padding: 14px 18px;
          text-align: left;
          color: ${COLORS.muted};
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
          border-bottom: 1px solid ${COLORS.border};
        }

        td {
          padding: 17px 18px;
          color: ${COLORS.text};
          font-size: 13px;
          border-bottom: 1px solid #EEE9E2;
          vertical-align: middle;
        }

        tbody tr {
          transition: 150ms ease;
        }

        tbody tr:hover {
          background: #FEFCF9;
        }

        tbody tr:last-child td {
          border-bottom: none;
        }

        .customer-name {
          color: ${COLORS.ink};
          font-weight: 700;
          margin-bottom: 4px;
        }

        .customer-phone {
          color: ${COLORS.muted};
          font-size: 11px;
        }

        .company-name {
          color: ${COLORS.text};
          font-weight: 600;
        }

        .product-name {
          color: ${COLORS.ink};
          font-weight: 600;
        }

        .secondary-text {
          color: ${COLORS.muted};
          font-size: 11px;
          margin-top: 4px;
          max-width: 190px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .location-cell {
          display: flex;
          align-items: center;
          gap: 6px;
          max-width: 210px;
        }

        .location-cell span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .location-cell svg {
          color: ${COLORS.accent};
          flex-shrink: 0;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 7px 11px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        .status-new {
          color: ${COLORS.orange};
          background: ${COLORS.orangeSoft};
        }

        .status-contacted {
          color: ${COLORS.blue};
          background: ${COLORS.blueSoft};
        }

        .status-completed {
          color: ${COLORS.green};
          background: ${COLORS.greenSoft};
        }

        .status-other {
          color: ${COLORS.muted};
          background: #F0ECE7;
        }

        .row-actions {
          display: flex;
          gap: 7px;
        }

        .icon-btn {
          width: 34px;
          height: 34px;
          border-radius: 9px;
          border: 1px solid ${COLORS.border};
          background: white;
          color: ${COLORS.muted};
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 150ms ease;
        }

        .icon-btn:hover {
          color: ${COLORS.accentDark};
          border-color: ${COLORS.accent};
          background: ${COLORS.accentSoft};
        }

        /* ==================================================
           STATES
        ================================================== */

        .empty-state,
        .loading-state {
          padding: 70px 20px;
          text-align: center;
        }

        .empty-icon {
          width: 54px;
          height: 54px;
          margin: 0 auto 15px;
          border-radius: 15px;
          background: ${COLORS.accentSoft};
          color: ${COLORS.accent};
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .empty-state h3 {
          color: ${COLORS.ink};
          margin: 0 0 7px;
          font-size: 17px;
        }

        .empty-state p {
          color: ${COLORS.muted};
          margin: 0;
          font-size: 13px;
        }

        .loading-state {
          color: ${COLORS.muted};
        }

        .error-box {
          margin: 18px 24px;
          padding: 15px 16px;
          border-radius: 12px;
          background: ${COLORS.redSoft};
          color: ${COLORS.red};
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          border: 1px solid #F1CFCC;
        }

        .error-box span {
          flex: 1;
        }

        .error-box button {
          border: none;
          background: transparent;
          color: ${COLORS.red};
          font-weight: 700;
          cursor: pointer;
        }

        /* ==================================================
           MODAL
        ================================================== */

        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 5000;
          background: rgba(23, 20, 17, 0.46);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow-y: auto;
        }

        .detail-modal {
          width: 100%;
          max-width: 760px;
          max-height: 90vh;
          overflow-y: auto;
          background: ${COLORS.card};
          border-radius: 22px;
          border: 1px solid ${COLORS.border};
          box-shadow: 0 30px 80px rgba(20, 15, 10, 0.22);
        }

        .modal-header {
          padding: 24px 26px;
          border-bottom: 1px solid ${COLORS.border};
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
        }

        .modal-eyebrow {
          color: ${COLORS.accent};
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .modal-title {
          color: ${COLORS.ink};
          margin: 5px 0 0;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 32px;
          font-weight: 600;
          word-break: break-word;
        }

        .modal-close {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          border-radius: 50%;
          border: 1px solid ${COLORS.border};
          background: white;
          color: ${COLORS.text};
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .modal-body {
          padding: 26px;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .detail-item {
          min-width: 0;
          border: 1px solid ${COLORS.border};
          border-radius: 12px;
          padding: 14px;
          background: #FCFBF9;
        }

        .detail-item.full {
          grid-column: 1 / -1;
        }

        .detail-label {
          display: flex;
          align-items: center;
          gap: 6px;
          color: ${COLORS.muted};
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 7px;
        }

        .detail-label svg {
          color: ${COLORS.accent};
          flex-shrink: 0;
        }

        .detail-value {
          color: ${COLORS.ink};
          font-size: 14px;
          font-weight: 600;
          word-break: break-word;
          line-height: 1.5;
        }

        .message-box {
          color: ${COLORS.text};
          font-size: 14px;
          line-height: 1.7;
          font-weight: 400;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .modal-footer {
          padding: 18px 26px 24px;
          border-top: 1px solid ${COLORS.border};
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          flex-wrap: wrap;
        }

        .status-control {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .status-control label {
          color: ${COLORS.muted};
          font-size: 12px;
          font-weight: 700;
        }

        .status-control select {
          height: 38px;
          border: 1px solid ${COLORS.border};
          border-radius: 9px;
          padding: 0 12px;
          color: ${COLORS.text};
          background: white;
          outline: none;
        }

        .delete-btn {
          height: 38px;
          padding: 0 13px;
          display: flex;
          align-items: center;
          gap: 7px;
          border: 1px solid #E9C7C3;
          border-radius: 9px;
          background: ${COLORS.redSoft};
          color: ${COLORS.red};
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 1100px) {
          .admin-shell {
            padding: 30px 26px 50px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .workspace-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .toolbar {
            width: 100%;
          }

          .search-box {
            flex: 1;
            width: auto;
          }
        }

        /* ==================================================
           MOBILE
        ================================================== */

        @media (max-width: 650px) {
          .admin-shell {
            padding: 20px 12px 35px;
          }

          .admin-topbar {
            align-items: stretch;
            flex-direction: column;
            gap: 18px;
            margin-bottom: 26px;
          }

          .brand {
            font-size: 11px;
          }

          .admin-title {
            font-size: 38px;
            line-height: 0.98;
          }

          .admin-subtitle {
            font-size: 13px;
            max-width: 340px;
          }

          .top-actions {
            width: 100%;
          }

          .action-btn {
            width: 100%;
          }

          /* Stats */

          .stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 9px;
            margin-bottom: 16px;
          }

          .stat-card {
            min-height: 118px;
            padding: 15px;
            border-radius: 14px;
          }

          .stat-icon {
            width: 32px;
            height: 32px;
            margin-bottom: 12px;
          }

          .stat-icon svg {
            width: 16px;
            height: 16px;
          }

          .stat-label {
            font-size: 9px;
            letter-spacing: 0.06em;
          }

          .stat-value {
            font-size: 25px;
          }

          /* Workspace */

          .workspace {
            border-radius: 16px;
          }

          .workspace-header {
            padding: 17px 14px;
            gap: 15px;
          }

          .section-title {
            font-size: 25px;
          }

          .section-count {
            font-size: 11px;
          }

          .toolbar {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }

          .search-box {
            width: 100%;
            height: 44px;
          }

          .filter-wrap {
            width: 100%;
          }

          .filter-select {
            width: 100%;
            height: 44px;
          }

          /* Table stays scrollable instead of breaking layout */

          .table-wrap {
            overflow-x: auto;
          }

          table {
            min-width: 950px;
          }

          th {
            padding: 12px 14px;
          }

          td {
            padding: 14px;
          }

          /* Error */

          .error-box {
            margin: 14px;
            align-items: flex-start;
          }

          /* Modal */

          .modal-overlay {
            align-items: flex-end;
            padding: 0;
          }

          .detail-modal {
            width: 100%;
            max-width: none;
            max-height: 94vh;
            border-radius: 22px 22px 0 0;
          }

          .modal-header {
            padding: 20px 17px;
          }

          .modal-title {
            font-size: 29px;
          }

          .modal-body {
            padding: 17px;
          }

          .detail-grid {
            grid-template-columns: 1fr;
            gap: 9px;
          }

          .detail-item.full {
            grid-column: auto;
          }

          .detail-item {
            padding: 13px;
          }

          .modal-footer {
            padding: 15px 17px 20px;
            flex-direction: column;
            align-items: stretch;
          }

          .status-control {
            width: 100%;
            justify-content: space-between;
          }

          .status-control select {
            flex: 1;
            max-width: 200px;
          }

          .delete-btn {
            width: 100%;
            justify-content: center;
            height: 42px;
          }
        }

        @media (max-width: 380px) {
          .admin-shell {
            padding-left: 9px;
            padding-right: 9px;
          }

          .admin-title {
            font-size: 34px;
          }

          .stat-card {
            padding: 13px;
          }

          .stat-label {
            font-size: 8px;
          }

          .stat-value {
            font-size: 23px;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div className="admin-shell">

        {/* ==================================================
            HEADER
        ================================================== */}

        <header className="admin-topbar">
          <div>
            <div className="brand">
              KUMAR CHEMICALS
            </div>

            <h1 className="admin-title">
              Admin Dashboard
            </h1>

            <p className="admin-subtitle">
              Manage enquiries, customers and business activity.
            </p>
          </div>

          <div className="top-actions">
            <button
              className="action-btn"
              onClick={() => fetchEnquiries(true)}
              disabled={refreshing}
            >
              <RefreshCw
                size={15}
                style={{
                  animation: refreshing
                    ? "spin 0.8s linear infinite"
                    : "none",
                }}
              />

              {refreshing
                ? "Refreshing..."
                : "Refresh"}
            </button>
          </div>
        </header>

        {/* ==================================================
            STATS
        ================================================== */}

        <section className="stats-grid">
          <StatCard
            icon={<Users size={18} />}
            label="Total Enquiries"
            value={stats.total}
          />

          <StatCard
            icon={<Clock3 size={18} />}
            label="New"
            value={stats.newCount}
          />

          <StatCard
            icon={<Phone size={18} />}
            label="Contacted"
            value={stats.contactedCount}
          />

          <StatCard
            icon={<CheckCircle2 size={18} />}
            label="Completed"
            value={stats.completedCount}
          />
        </section>

        {/* ==================================================
            WORKSPACE
        ================================================== */}

        <section className="workspace">

          <div className="workspace-header">

            <div>
              <h2 className="section-title">
                Recent Enquiries
              </h2>

              <div className="section-count">
                Showing {filteredEnquiries.length} of{" "}
                {enquiries.length} enquiries
              </div>
            </div>

            <div className="toolbar">

              <div className="search-box">
                <Search size={16} />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search enquiries..."
                />
              </div>

              <div className="filter-wrap">
                <select
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                >
                  <option value="ALL">
                    All Status
                  </option>

                  <option value="NEW">
                    New
                  </option>

                  <option value="CONTACTED">
                    Contacted
                  </option>

                  <option value="COMPLETED">
                    Completed
                  </option>
                </select>

                <ChevronDown
                  className="filter-arrow"
                  size={15}
                />
              </div>

            </div>

          </div>

          {/* ERROR */}

          {error && (
            <div className="error-box">
              <AlertCircle size={17} />

              <span>{error}</span>

              <button
                onClick={() => fetchEnquiries()}
              >
                Retry
              </button>
            </div>
          )}

          {/* LOADING */}

          {loading ? (
            <div className="loading-state">
              Loading enquiries...
            </div>
          ) : filteredEnquiries.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                <MessageSquare size={23} />
              </div>

              <h3>
                {enquiries.length === 0
                  ? "No enquiries yet"
                  : "No matching enquiries"}
              </h3>

              <p>
                {enquiries.length === 0
                  ? "Customer enquiries will appear here when submitted."
                  : "Try changing your search or status filter."}
              </p>

            </div>

          ) : (

            <div className="table-wrap">

              <table>

                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Company</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredEnquiries.map((item) => (

                    <tr key={item.id}>

                      <td>
                        <div className="customer-name">
                          {item.name || "—"}
                        </div>

                        <div className="customer-phone">
                          {item.phone || "No phone"}
                        </div>
                      </td>

                      <td>
                        <div className="company-name">
                          {item.company || "—"}
                        </div>

                        {item.email && (
                          <div className="secondary-text">
                            {item.email}
                          </div>
                        )}
                      </td>

                      <td>
                        <div className="product-name">
                          {item.product || "—"}
                        </div>

                        {item.enquiry_type && (
                          <div className="secondary-text">
                            {item.enquiry_type}
                          </div>
                        )}
                      </td>

                      <td>
                        {item.quantity || "—"}
                      </td>

                      <td>
                        <div className="location-cell">
                          <MapPin size={14} />

                          <span>
                            {item.delivery_location ||
                              "Not specified"}
                          </span>
                        </div>
                      </td>

                      <td>
                        <StatusBadge
                          status={item.status}
                        />
                      </td>

                      <td>
                        {formatDate(item.created_at)}
                      </td>

                      <td>
                        <div className="row-actions">

                          <button
                            className="icon-btn"
                            title="View enquiry"
                            onClick={() =>
                              setSelectedEnquiry(item)
                            }
                          >
                            <Eye size={15} />
                          </button>

                        </div>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </div>

      {/* ==================================================
          DETAIL MODAL
      ================================================== */}

      {selectedEnquiry && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedEnquiry(null)
          }
        >

          <div
            className="detail-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>
                <div className="modal-eyebrow">
                  Enquiry #{selectedEnquiry.id}
                </div>

                <h2 className="modal-title">
                  {selectedEnquiry.name ||
                    "Customer Enquiry"}
                </h2>
              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedEnquiry(null)
                }
              >
                <X size={17} />
              </button>

            </div>

            <div className="modal-body">

              <div className="detail-grid">

                <DetailItem
                  icon={<Building2 size={14} />}
                  label="Company"
                  value={selectedEnquiry.company}
                />

                <DetailItem
                  icon={<Phone size={14} />}
                  label="Phone"
                  value={selectedEnquiry.phone}
                />

                <DetailItem
                  icon={<Mail size={14} />}
                  label="Email"
                  value={selectedEnquiry.email}
                />

                <DetailItem
                  icon={<Package size={14} />}
                  label="Product"
                  value={selectedEnquiry.product}
                />

                <DetailItem
                  icon={<Package size={14} />}
                  label="Quantity"
                  value={selectedEnquiry.quantity}
                />

                <DetailItem
                  icon={<MapPin size={14} />}
                  label="Delivery Location"
                  value={
                    selectedEnquiry.delivery_location
                  }
                />

                <DetailItem
                  icon={<CalendarDays size={14} />}
                  label="Required Date"
                  value={
                    selectedEnquiry.required_date
                      ? formatDate(
                          selectedEnquiry.required_date
                        )
                      : "Not specified"
                  }
                />

                <DetailItem
                  icon={<Clock3 size={14} />}
                  label="Submitted"
                  value={formatDate(
                    selectedEnquiry.created_at
                  )}
                />

                <div className="detail-item full">

                  <div className="detail-label">
                    <MessageSquare size={14} />
                    Message / Requirements
                  </div>

                  <div className="message-box">
                    {selectedEnquiry.message ||
                      "No additional message provided."}
                  </div>

                </div>

              </div>

            </div>

            <div className="modal-footer">

              <div className="status-control">

                <label>Status</label>

                <select
                  value={
                    selectedEnquiry.status ||
                    "NEW"
                  }
                  disabled={
                    updatingId ===
                    selectedEnquiry.id
                  }
                  onChange={(e) =>
                    updateStatus(
                      selectedEnquiry.id,
                      e.target.value
                    )
                  }
                >
                  <option value="NEW">
                    New
                  </option>

                  <option value="CONTACTED">
                    Contacted
                  </option>

                  <option value="COMPLETED">
                    Completed
                  </option>
                </select>

              </div>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteEnquiry(
                    selectedEnquiry.id
                  )
                }
              >
                <Trash2 size={14} />
                Delete Enquiry
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

// ======================================================
// STAT CARD
// ======================================================

function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-label">
        {label}
      </div>

      <div className="stat-value">
        {value}
      </div>
    </div>
  );
}

// ======================================================
// STATUS BADGE
// ======================================================

function StatusBadge({ status }) {
  const normalized = String(
    status || "NEW"
  ).toUpperCase();

  let className = "status-other";

  if (normalized === "NEW") {
    className = "status-new";
  }

  if (normalized === "CONTACTED") {
    className = "status-contacted";
  }

  if (normalized === "COMPLETED") {
    className = "status-completed";
  }

  return (
    <span className={`status-badge ${className}`}>
      {normalized}
    </span>
  );
}

// ======================================================
// DETAIL ITEM
// ======================================================

function DetailItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="detail-item">

      <div className="detail-label">
        {icon}
        {label}
      </div>

      <div className="detail-value">
        {value || "Not provided"}
      </div>

    </div>
  );
}

// ======================================================
// DATE HELPER
// ======================================================

function formatDate(date) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}