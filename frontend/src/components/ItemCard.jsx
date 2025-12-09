import PropTypes from "prop-types";
import placeholder from "../../public/stack-of-books-1531138.jpg";
import "./ItemCard.css";

function ItemCard({ item, onDelete, isOwner }) {
  const contactHref = item.sellerEmail
    ? `mailto:${encodeURIComponent(item.sellerEmail)}?subject=${encodeURIComponent(
        `Interested in ${item.title}`,
      )}`
    : null;

  return (
    <div className="item-card">
      <img 
        src={item.imageUrl || placeholder} 
        alt={item.title} 
        className="item-image"
        onError={(e) => {
          e.target.src = placeholder;
        }}
      />
      <div className="item-content">
        <h3>{item.title}</h3>
        <p className="price">${item.price}</p>
        <p>{item.description}</p>
        <div className="item-meta">
          <span className="category">{item.category}</span>
          {item.condition && (
            <span className="condition">{item.condition}</span>
          )}
        </div>
        <div className="actions">
          {isOwner ? (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onDelete(item._id)}
            >
              Delete
            </button>
          ) : (
            contactHref && (
              <a className="btn btn-primary" href={contactHref}>
                Contact owner
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    condition: PropTypes.string,
    imageUrl: PropTypes.string,
    sellerEmail: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func,
  isOwner: PropTypes.bool,
};

export default ItemCard;