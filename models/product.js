import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  embedding: { type: [Number], required: true } // Stores 1536-dimensional OpenAI vector
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);