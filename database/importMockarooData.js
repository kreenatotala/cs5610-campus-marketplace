import dotenv from 'dotenv';
dotenv.config();
import { MongoClient, ObjectId } from 'mongodb';
import fs from 'fs';

const uri = 'mongodb+srv://db_user:123@campus-marketplace.mlxe99a.mongodb.net/?appName=campus-marketplace';
const client = new MongoClient(uri);

async function importData() {
  try {
    // read json file
    const rawData = fs.readFileSync('./mockaroo-data.json', 'utf8');
    const items = JSON.parse(rawData);
    
    // transform data to match database schema
    const transformedItems = items.map((item, index) => ({
      title: item.title || `Item ${index + 1}`,
      description: item.description,
      price: item.price,
      category: item.category,
      condition: item.condition,
      imageUrl: item.imageUrl,
      location: {
        building: item.building,
        distance: item.distance
      },
      sellerId: new ObjectId(),
      sellerName: item.sellerName,
      status: item.status,
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000), // random date within last 90 days
      updatedAt: new Date()
    }));
    
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(process.env.DB_NAME || 'campusMarketplace');
    const collection = db.collection('items');
    
    // clear data
    await collection.deleteMany({});
    const result = await collection.insertMany(transformedItems);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

importData();