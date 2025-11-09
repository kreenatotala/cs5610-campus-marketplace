import { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import ItemForm from '../components/ItemForm';
import './ItemsPage.css';

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const currentUserId = '507f1f77bcf86cd799439011';

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
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (itemData) => {
    try {
      await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...itemData, sellerId: currentUserId, sellerName: 'Current User' })
      });
      setShowForm(false);
      fetchItems();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleUpdate = async (itemData) => {
    try {
      await fetch(`/api/items/${editingItem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
      });
      setEditingItem(null);
      setShowForm(false);
      fetchItems();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('Delete this item?')) {
      try {
        await fetch(`/api/items/${itemId}`, { method: 'DELETE' });
        fetchItems();
      } catch (err) {
        console.error('Error:', err);
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  if (showForm) {
    return <ItemForm item={editingItem} onSubmit={editingItem ? handleUpdate : handleCreate} onCancel={handleCancel} />;
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="items-page">
      <div className="items-header">
        <h1>Campus Marketplace</h1>
        <button onClick={() => setShowForm(true)} className="btn-create">+ Create Listing</button>
      </div>
      <div className="items-grid">
        {items.map(item => (
          <ItemCard key={item._id} item={item} onEdit={handleEdit} onDelete={handleDelete} isOwner={item.sellerId === currentUserId} />
        ))}
      </div>
    </div>
  );
}

export default ItemsPage;