import { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import './ItemsPage.css';

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = '507f1f77bcf86cd799439011'; // Mock user ID

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/items');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('Delete this item?')) {
      try {
        await fetch(`/api/items/${itemId}`, {
          method: 'DELETE'
        });
        fetchItems();
      } catch (err) {
        console.error('Error deleting item:', err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="items-page">
      <h1>Campus Marketplace</h1>
      <div className="items-grid">
        {items.map(item => (
          <ItemCard
            key={item._id}
            item={item}
            onDelete={handleDelete}
            isOwner={item.sellerId === currentUserId}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemsPage;