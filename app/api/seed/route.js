import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/product";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini from environment variable for safety
const geminiKey = process.env.GEMINI_API_KEY;
if (!geminiKey) {
  console.warn("GEMINI_API_KEY is not set. Embedding generation will fail.");
}
const ai = new GoogleGenAI({ apiKey: geminiKey });

// Helper function to convert raw string values into 768-dimensional Gemini vectors
async function generateVector(text) {
  try {
    const response = await ai.models.embedContent({
      model: "text-embedding-004", // Standard text embedding model for Gemini
      contents: text,
    });
    
    // Extends structural layout down to the target numeric array coordinates
    return response.embedding.values;
  } catch (error) {
    console.error("Error generating vector array via Gemini:", error);
    throw error;
  }
}

export async function GET() {
  try {
    // 1. Establish database connection pooling lifecycle
    await connectDB();
    
    // 2. Clear out any legacy documents using old dimensional mappings
    await Product.deleteMany({}); 

    // Mock catalog containing placement dashboard items
    const mockProducts = [
      {
        title: "Premium Lightweight Blue Running Sneakers",
        description: "Comfortable athletic running shoes designed for men. Breathable mesh construction with gray laces.",
        price: 89,
        category: "Footwear",
        image: "https://picsum.photos/500/300?random=1"
      },
      {
        title: "Luxury Ceramic Dinner Set",
        description: "Elegant 24-piece dining set for six people. Microwave safe with scratch resistant glossy glaze.",
        price: 149,
        category: "Kitchen",
        image: "https://picsum.photos/500/300?random=2"
      },
      {
        title: "Smart Ergonomic Office Chair",
        description: "High-back mesh desk chair with adjustable lumbar support and dynamic tilt locks.",
        price: 199,
        category: "Furniture",
        image: "https://picsum.photos/500/300?random=3"
      }
    ];

    // 3. Loop through dataset sequentially to map vector structures safely
    const productsWithVectors = [];
    for (const item of mockProducts) {
      // String template merges metadata to establish multi-layered semantic context
      const combinedText = `${item.title} ${item.description} ${item.category}`;
      
      console.log(`Generating embedding values for: ${item.title}`);
      const embedding = await generateVector(combinedText);
      
      productsWithVectors.push({ ...item, embedding });
    }

    // 4. Batch push clean array documents back to MongoDB Atlas
    await Product.insertMany(productsWithVectors);
    
    return NextResponse.json({ message: "Database seeded successfully with Gemini embeddings!" });
  } catch (error) {
    console.error("Seeding operational exception caught:", error);
    return NextResponse.json({ error: "Failed to cleanly seed database structure" }, { status: 500 });
  }
}