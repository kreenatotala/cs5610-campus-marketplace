import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const router = express.Router();
const uri = process.env.MONGO_URI;

// GET all the items
router.get('/', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const items = await client.db('campusMarketplace').collection('items').find().toArray();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

// GET one single item
router.get('/:id', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const item = await client.db('campusMarketplace').collection('items').findOne({ _id: new ObjectId(req.params.id) });
    item ? res.json(item) : res.status(404).json({ error: 'Not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

// POST create a new item
router.post('/', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const newItem = {
      ...req.body,
      price: Number(req.body.price),
      sellerId: new ObjectId(req.body.sellerId),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await client.db('campusMarketplace').collection('items').insertOne(newItem);
    res.status(201).json({ _id: result.insertedId, ...newItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

// PUT update an existing item
router.put('/:id', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const result = await client.db('campusMarketplace').collection('items').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...req.body, updatedAt: new Date() } }
    );
    result.matchedCount ? res.json({ message: 'Updated' }) : res.status(404).json({ error: 'Not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

// DELETE item
router.delete('/:id', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const result = await client.db('campusMarketplace').collection('items').deleteOne({ _id: new ObjectId(req.params.id) });
    result.deletedCount ? res.json({ message: 'Deleted' }) : res.status(404).json({ error: 'Not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.close();
  }
});

export default router;