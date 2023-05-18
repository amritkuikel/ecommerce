import mongoose from "mongoose";

const dbConnection = async () => {
  const name = process.env.DB_NAME;
  const password = process.env.DB_PASSWORD;
  const url =
    "mongodb+srv://" +
    encodeURIComponent(name) +
    ":" +
    encodeURIComponent(password) +
    "@clusterak.xzjmw2i.mongodb.net/?retryWrites=true&w=majority";
  const conn = await mongoose.connect(url);
  try {
    if (conn) {
      console.log("database connection successful");
    } else {
      console.log("database connection error");
    }
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection;
