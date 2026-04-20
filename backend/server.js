const express = require("express");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Login = require("./controllers/login");
const Products = require("./controllers/products");
const app = express();


dotenv.config();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT;

//RateLimit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later",
  standardHeaders: true,
  legacyHeaders: false
});

//Routes
app.use('/api', Login, limiter);
app.use('/api', Products, limiter);

//Mongoose Connect
mongoose.connect(process.env.MONGODB, {})
.then(() => {
  console.log("✅✅ MongoDB Connected Successfully");
})
.catch(() => {
  console.error("❌❌ MongoDB Not Connected");
});

//Server Listening
app.listen(PORT, (err) => {
  if (err) {
    console.error("❌❌ Server Cannot Successfully");
  } else {
    console.log(`✅✅ Server Running Successfully at http://localhost:${PORT}`);
  }
});