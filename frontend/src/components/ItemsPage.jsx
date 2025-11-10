import { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import ItemForm from '../components/ItemForm';
import './ItemsPage.css';

function ItemsPage() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  const currentUserId = '507f1f77bcf86cd799439011';

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(data => setItems(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))));
  }, []);

  const refresh = () => {
    fetch('/api/items')
      .then(res => res.json())
      .then(data => setItems(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))));
  };

  const handleCreate = (data) => {
    fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, sellerId: currentUserId, sellerName: 'Current User' })
    }).then(() => { setShowForm(false); refresh(); });
  };

  const handleDelete = (id) => {
    if (confirm('Delete?')) {
      fetch(`/api/items/${id}`, { method: 'DELETE' }).then(refresh);
    }
  };

  const currentItems = items.slice((page - 1) * 25, page * 25);
  const totalPages = Math.ceil(items.length / 25);

  if (showForm) {
    return <ItemForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />;
  }

  return (
    <div className="items-page">
      <div className="items-header">
        <h1>Campus Marketplace</h1>
        <button onClick={() => setShowForm(true)}>+ Create Listing</button>
      </div>
      <div className="items-grid">
        {currentItems.map(item => (
          <ItemCard key={item._id} item={item} onDelete={handleDelete} isOwner={item.sellerId === currentUserId} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default ItemsPage;