import express from "express";
import { db } from "../db.js";

export const router = express.Router();

router.get("/", (req, res) => {
  const q = "SELECT * FROM product";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

router.post("/", (req, res) => {
  const q =
    "INSERT INTO product(`name`, `description`, `price`, `image`, `category`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.image,
    req.body.category,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Product has been created successfully");
  });
});
