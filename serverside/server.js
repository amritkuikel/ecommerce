import express from "express";
import dotenv from "dotenv";
import dbConnection from "./utils/dbconnection.js";
import router from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT_NO;
dbConnection();

app.use(cors());
app.use(express.json());
app.use("/auth", router);

app.listen(PORT, () => [console.log(`app started at port : ${PORT}`)]);
