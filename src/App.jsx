import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Industries from "./pages/Industries";
import Contact from "./pages/Contact";
import ETPInd from "./pages/ETPInd";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
export default function App() {
  return (
    <Router>
      <Routes>

        {/* Main Website */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ETPInd" element={<ETPInd />} />

        {/* Admin */}
<Route path="/admin/login" element={<AdminLogin />} />
<Route
  path="/admin"
  element={
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  }
/>        {/* Catch unknown URLs */}
        <Route path="*" element={<Home />} />

      </Routes>
    </Router>
  );
}