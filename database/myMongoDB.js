import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

function MyMongoDB({
  DB_NAME = "campus_marketplace",
  COLLECTION_NAME = "items",
  DEFAULT_URI = "mongodb://localhost:27017",
} = {}) {
  const me = {};
  const URI = process.env.MONGO_URI || DEFAULT_URI;
  const DB = process.env.DB_NAME || DB_NAME;
  console.log(`Using MongoDB at ${URI}, database: ${DB}`);

  const connect = async () => {
    const client = new MongoClient(URI);
    await client.connect();
    const db = client.db(DB);
    const items = db.collection(COLLECTION_NAME);
    const users = db.collection("users");

    return { client, db, items, users };
  };

  me.getItems = async ({ query = {}, pageSize = 100, page = 0 } = {}) => {
    const { client, items } = await connect();

    try {
      const data = await items
        .find(query)
        .sort({ updatedAt: -1, createdAt: -1 })
        .limit(pageSize)
        .skip(pageSize * page)
        .toArray();
      console.log("Fetched items from MongoDB:", data);
      return data;
    } catch (err) {
      console.error("Error fetching items from MongoDB:", err);
      throw err;
    } finally {
      await client.close();
    }
  };

  me.getItemById = async (itemId) => {
    const { client, items } = await connect();

    try {
      const item = await items.findOne({ _id: new ObjectId(itemId) });
      console.log("Fetched item from MongoDB:", item);
      return item;
    } catch (err) {
      console.error("Error fetching item from MongoDB:", err);
      throw err;
    } finally {
      await client.close();
    }
  };

  me.createItem = async ({
    title,
    description,
    price,
    category,
    condition,
    imageUrl,
    location,
    sellerId,
    sellerName,
    status,
  }) => {
    const { client, items } = await connect();

    try {
      const createdAt = new Date();
      const doc = {
        title,
        description,
        price,
        category,
        condition,
        imageUrl,
        location,
        sellerId,
        sellerName,
        status,
        createdAt,
        updatedAt: createdAt,
      };
      const result = await items.insertOne(doc);
      console.log("Created item in MongoDB with id:", result.insertedId);
      return { _id: result.insertedId, ...doc };
    } catch (err) {
      console.error("Error creating item in MongoDB:", err);
      throw err;
    } finally {
      await client.close();
    }
  };

  me.updateItem = async (itemId, updateData) => {
    const { client, items } = await connect();

    try {
      const update = {
        ...updateData,
        updatedAt: new Date(),
      };

      const result = await items.updateOne(
        { _id: new ObjectId(itemId) },
        { $set: update },
      );

      if (result.matchedCount === 0) {
        return null;
      }

      console.log("Updated item in MongoDB:", itemId);
      return await me.getItemById(itemId);
    } catch (err) {
      console.error("Error updating item in MongoDB:", err);
      throw err;
    } finally {
      await client.close();
    }
  };

  me.deleteItem = async (itemId) => {
    const { client, items } = await connect();

    try {
      const result = await items.deleteOne({ _id: new ObjectId(itemId) });
      console.log("Deleted item from MongoDB:", itemId);
      return result.deletedCount > 0;
    } catch (err) {
      console.error("Error deleting item from MongoDB:", err);
      throw err;
    } finally {
      await client.close();
    }
  };

  me.getUserByUsername = async (username) => {
    const { client, users } = await connect();
    try {
      const user = await users.findOne({ username });
      return user;
    } catch (err) {
      console.error("Error fetching user by username from MongoDB:", err);
      throw err;
    } finally {
      await client.close();
    }
  };

  me.createUser = async ({
    username,
    password,
    firstName = "",
    lastName = "",
  }) => {
    const { client, users } = await connect();
    try {
      const createdAt = new Date();
      const doc = {
        username,
        password,
        firstName,
        lastName,
        createdAt,
      };
      const result = await users.insertOne(doc);
      console.log("Created user in MongoDB with id:", result.insertedId);
      return { _id: result.insertedId, ...doc };
    } catch (err) {
      console.error("Error creating user in MongoDB:", err);
      throw err;
    } finally {
      await client.close();
    }
  };

  me.verifyUserCredentials = async (username, password) => {
    const { client, users } = await connect();
    try {
      const user = await users.findOne({ username });
      if (user && user.password === password) {
        return user;
      }
      return null;
    } catch (err) {
      console.error("Error verifying user credentials in MongoDB:", err);
      throw err;
    } finally {
      await client.close();
    }
  };

  return me;
}

const myMongoDB = MyMongoDB();
export default myMongoDB;
