import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import bodyParser from "body-parser";
import { router as productRouter } from "./routes/product.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/product", productRouter);

// Razorpay configuration
const razorpay = new Razorpay({
  key_id: "rzp_live_C7ayx7PaJJkARf",
  key_secret: "4BdgF5N5FitWBRBA6QwZrVwi",
});

// Razorpay create order endpoint
app.post("/api/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ error: "Error creating order" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
