import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./ItemForm.css";

function ItemForm({ item, onSubmit, onCancel }) {
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

  return (
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

      <select name="category" value={formData.category} onChange={handleChange}>
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
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">{item ? "Update" : "Create"}</button>
      </div>
    </form>
  );
}

ItemForm.propTypes = {
  item: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ItemForm;
