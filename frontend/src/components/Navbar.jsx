import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function Navbar({ onSearch }) {
  const { cart } = useCart();
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const tokUser = JSON.parse(localStorage.getItem("user"));
      setUser(tokUser || null);
    } catch {
      setUser(null);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch && onSearch(query);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const totalCount = cart?.reduce((sum, p) => sum + (p.qty || 0), 0) || 0;

  return (
    <div className="nav container">
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "var(--accent)" }}>
            MiniKart
          </Link>
        </div>
        <form className="search" onSubmit={handleSearch}>
          <input
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn" type="submit">Search</button>
        </form>
      </div>

      <div className="nav-right">
        <Link to="/admin" className="btn ghost">Add Product</Link>

        {user ? (
          <>
            <div style={{ marginLeft: 8, marginRight: 8 }}>
              {user.name || user.email}
            </div>
            <button className="btn ghost" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn ghost" style={{ marginLeft: 8 }}>
              Register
            </Link>
          </>
        )}

        <Link to="/cart" style={{ textDecoration: "none", marginLeft: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <FiShoppingCart size={18} />
            <div style={{ fontWeight: 700 }}>{totalCount}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
