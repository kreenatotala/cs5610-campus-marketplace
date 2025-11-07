import PropTypes from 'prop-types';
import './ItemCard.css';

function ItemCard({ item, onEdit, onDelete, isOwner }) {
  return (
    <div className="item-card">
      <img src={item.imageUrl} alt={item.title} className="item-image" />
      <div className="item-content">
        <h3>{item.title}</h3>
        <p className="price">${item.price}</p>
        <p>{item.description}</p>
        <span className="category">{item.category}</span>
        {isOwner && (
          <div className="actions">
            <button onClick={() => onEdit(item)}>Edit</button>
            <button onClick={() => onDelete(item._id)}>Delete</button>
          </div>
        )}
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
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isOwner: PropTypes.bool
};

export default ItemCard;