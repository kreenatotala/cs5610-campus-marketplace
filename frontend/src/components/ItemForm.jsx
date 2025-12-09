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
    category: "",
    condition: "",
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
        category: item.category ?? "",
        condition: item.condition ?? "",
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

        <label htmlFor="title">
          Title <span className="required-indicator">*</span>
        </label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Textbooks, sofa, headphones..."
          required
        />

        <label htmlFor="description">
          Description <span className="optional-indicator">(optional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Condition, what you liked about it, pickup details..."
        />

        <label htmlFor="price">
          Price <span className="required-indicator">*</span>
        </label>
        <input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Asking price in USD"
          required
        />

        <label htmlFor="category">
          Category <span className="optional-indicator">(optional)</span>
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="books">Books</option>
          <option value="furniture">Furniture</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="kitchen">Kitchen</option>
          <option value="decor">Decor</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="condition">
          Condition <span className="optional-indicator">(optional)</span>
        </label>
        <select
          id="condition"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select a condition
          </option>
          <option value="new">New</option>
          <option value="like-new">Like New</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
        </select>

        <label htmlFor="imageUrl">
          Image URL <span className="optional-indicator">(optional)</span>
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Link to an image of your item"
        />

        {formData.imageUrl && (
          <div className="image-preview">
            <p>Image Preview:</p>
            <img 
              src={formData.imageUrl} 
              alt="Item preview" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
              style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'cover' }}
            />
            <p style={{ display: 'none', color: '#e74c3c' }}>
              Failed to load image. Please check the URL.
            </p>
          </div>
        )}

        <label htmlFor="building">
          Building <span className="required-indicator">*</span>
        </label>
        <input
          id="building"
          name="building"
          value={formData.building}
          onChange={handleChange}
          placeholder="Where you'd like to meet (e.g. Snell Library)"
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
