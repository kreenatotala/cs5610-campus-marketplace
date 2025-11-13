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
      <img src={placeholder} alt={item.title} className="item-image" />
      <div className="item-content">
        <h3>{item.title}</h3>
        <p className="price">${item.price}</p>
        <p>{item.description}</p>
        <span className="category">{item.category}</span>
        <div className="actions">
          {isOwner ? (
            <button onClick={() => onDelete(item._id)}>Delete</button>
          ) : (
            contactHref && (
              <a className="btn btn-secondary" href={contactHref}>
                Contact owner // this button isn't working for me, I couldn't get contact information about a listing. 
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
    imageUrl: PropTypes.string,
    sellerEmail: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func,
  isOwner: PropTypes.bool,
}; // why does the user include information such as building or distance, but its not on the itemcard?

export default ItemCard;
