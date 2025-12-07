import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import GlobalNav from "./header.jsx";
import "./ItemForm.css";

function ItemForm({ item, onSubmit, onCancel, embedded = false }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "books",
    condition: "good",
    imageUrl: "",
    building: "",
    distance: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || "",
        description: item.description || "",
        price: item.price || "",
        category: item.category || "books",
        condition: item.condition || "good",
        imageUrl: item.imageUrl || "",
        building: item.location?.building || "",
        distance: item.location?.distance || "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      condition: formData.condition,
      imageUrl: formData.imageUrl,
      location: {
        building: formData.building,
        distance: Number(formData.distance),
      },
    });
  };

  const formContent = (
    <div className="item-form-wrapper">
      <form onSubmit={handleSubmit} className="item-form">
        <h2>{item ? "Edit" : "Create"} Listing</h2>

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="books">Books</option>
          <option value="furniture">Furniture</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="kitchen">Kitchen</option>
          <option value="decor">Decor</option>
          <option value="other">Other</option>
        </select>

        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
        >
          <option value="new">New</option>
          <option value="like-new">Like New</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
        </select>

        <input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <input
          name="building"
          value={formData.building}
          onChange={handleChange}
          placeholder="Building"
          required
        />
        <input
          name="distance"
          type="number"
          value={formData.distance}
          onChange={handleChange}
          placeholder="Distance (mi)"
          required
        />

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              if (onCancel) {
                onCancel();
                return;
              }
              const historyIndex = window.history?.state?.idx ?? 0;
              if (historyIndex > 0) {
                navigate(-1);
              } else {
                navigate("/");
              }
            }}
          >
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
            {item ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );

  if (embedded) {
    return formContent;
  }

  return (
    <>
      <GlobalNav />
      <main>{formContent}</main>
    </>
  );
}

ItemForm.propTypes = {
  item: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  embedded: PropTypes.bool,
};

export default ItemForm;
