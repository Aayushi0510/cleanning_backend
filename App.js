import dotenv from "dotenv";
import express from "express";
import cors from "cors"; 
import connectDb from "./config/connectdb.js";
import userRoutes from "./route/userRoute.js";
import courseRoutes from "./route/courseRoute.js";
import categoryRoutes from "./route/categoryRoute.js"
import cartRoutes from "./route/cartRoute.js"
import orderRoutes from "./route/orderRoute.js"
import paymentRoutes from "./route/paymentRoute.js"
import questionRoutes from "./route/questionRoute.js"
import cloudinary from "cloudinary"
import  fileUpload from 'express-fileupload';
import { createProxyMiddleware } from 'http-proxy-middleware'
import course from "./model/courseModel.js";
import bodyParser from 'body-parser';
import userProgressRoutes from './route/userProgressRoute.js'
import resultRoute from "./route/resultRoute.js"

dotenv.config();
connectDb();

const app = express();
app.use(cors());
app.use('/uploads', express.static('uploads'));


app.use(express.json());
const port = process.env.PORT;
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", categoryRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);
app.use("/api", questionRoutes);
app.use("/api", userProgressRoutes);
app.use("/api", resultRoute);



app.use(fileUpload());
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend origin
  methods: 'POST,GET,OPTIONS,DELETE',
  allowedHeaders: 'Content-Type',
};

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100', extended: true }));


app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
