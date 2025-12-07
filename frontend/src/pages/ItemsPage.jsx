import { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import ItemForm from "../components/ItemForm";
import GlobalNav from "../components/header.jsx";
import { AUTH_EVENT, getStoredUser } from "../lib/auth.js";
import "./ItemsPage.css";

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    condition: "",
    minPrice: "",
    maxPrice: "",
  });
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());

  const normalizeId = (value) => {
    if (!value) return null;
    if (typeof value === "string") return value;
    if (typeof value === "object" && "$oid" in value) return value.$oid;
    return null;
  };

  const currentUserId = normalizeId(currentUser?._id);
  const currentUserEmail = currentUser?.username || "";
  const currentUserName = currentUser?.firstName || currentUserEmail;

  useEffect(() => {
    const handleAuth = (event) => {
      setCurrentUser(event.detail ?? getStoredUser());
    };
    window.addEventListener(AUTH_EVENT, handleAuth);
    setCurrentUser(getStoredUser());
    return () => window.removeEventListener(AUTH_EVENT, handleAuth);
  }, []);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) =>
        setItems(
          data
            .map((item) => ({
              ...item,
              _id: normalizeId(item._id) || item._id,
              sellerId: normalizeId(item.sellerId) || item.sellerId,
            }))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        ),
      );
  }, []);

  const refresh = () => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) =>
        setItems(
          data
            .map((item) => ({
              ...item,
              _id: normalizeId(item._id) || item._id,
              sellerId: normalizeId(item.sellerId) || item.sellerId,
            }))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        ),
      );
  };

  const handleCreate = (data) => {
    if (!currentUserId) {
      alert("Please sign in before creating a listing.");
      return;
    }
    fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        sellerId: currentUserId,
        sellerName: currentUserName,
        sellerEmail: currentUserEmail,
      }),
    }).then(() => {
      setShowForm(false);
      refresh();
    });
  };

  const handleDelete = (id) => {
    if (confirm("Delete?")) {
      fetch(`/api/items/${id}`, { method: "DELETE" }).then(refresh);
    }
  };
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const filteredItems = items.filter((item) => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.condition && item.condition !== filters.condition) return false;

    const price = Number(item.price) || 0;
    const min = filters.minPrice ? Number(filters.minPrice) : null;
    const max = filters.maxPrice ? Number(filters.maxPrice) : null;

    if (min !== null && price < min) return false;
    if (max !== null && price > max) return false;

    return true;
  });

  const currentItems = filteredItems.slice((page - 1) * 25, page * 25);
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / 25));

  if (showForm) {
    return (
      <>
        <GlobalNav />
        <ItemForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
          embedded
        />
      </>
    );
  }

  return (
    <>
      <GlobalNav />
      <div className="items-page">
        <div className="items-header">
          <h1>Campus Marketplace</h1>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Create Listing
          </button>
        </div>
        <div className="items-filters">
          <div className="filter-group">
            <label htmlFor="filter-category">Category</label>
            <select
              id="filter-category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="books">Books</option>
              <option value="furniture">Furniture</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="kitchen">Kitchen</option>
              <option value="decor">Decor</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="filter-condition">Condition</label>
            <select
              id="filter-condition"
              name="condition"
              value={filters.condition}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>
          <div className="filter-group price-group">
            <label htmlFor="filter-minPrice">Price range</label>
            <div className="price-inputs">
              <input
                id="filter-minPrice"
                name="minPrice"
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={handleFilterChange}
              />
              <span className="price-separator">–</span>
              <input
                id="filter-maxPrice"
                name="maxPrice"
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
        <div className="items-grid">
          {currentItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onDelete={handleDelete}
              isOwner={
                Boolean(currentUserId) && item.sellerId === currentUserId
              }
            />
          ))}
        </div>
        <div className="pagination">
          <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-primary"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default ItemsPage;
