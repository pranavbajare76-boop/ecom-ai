import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/product";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateVector(text) {
  try {
    // Using the stable, universally active model string name for the SDK
    const response = await ai.models.embedContent({
      model: "gemini-embedding-2", 
      contents: text,
    });
    
    // Process the embeddings array output format returned by gemini-embedding-2
    if (response?.embeddings?.[0]?.values) {
      return response.embeddings[0].values;
    }
    
    if (response?.embedding?.values) {
      return response.embedding.values;
    }

    return null;
  } catch (error) {
    console.error("Gemini embedding retrieval error:", error.message);
    return null;
  }
}

export async function GET() {
  try {
    await connectDB();
    await Product.deleteMany({}); // Wipe the bad arrays clear

    const mockProducts = [
      {
        title: "Adjustable Dumbbell Set",
        description: "Space-saving adjustable dumbbells ideal for home workouts.",
        price: 249,
        category: "Fitness",
        image: "https://picsum.photos/500/300?random=4"
      },
      {
        title: "Premium Lightweight Blue Running Sneakers",
        description: "Comfortable athletic running shoes designed for men. Breathable mesh construction with gray laces.",
        price: 89,
        category: "Footwear",
        image: "https://picsum.photos/500/300?random=1"
      }
    ];

    const productsWithVectors = [];

    for (const item of mockProducts) {
      const combinedText = `${item.title} ${item.description} ${item.category}`;
      const vectorArray = await generateVector(combinedText);
      
      if (vectorArray && Array.isArray(vectorArray) && vectorArray.length > 0) {
        productsWithVectors.push({
          ...item,
          embedding: vectorArray 
        });
        console.log(`✅ Loaded ${vectorArray.length} dimensions for: ${item.title}`);
      } else {
        throw new Error(`Failed to map vector arrays for: "${item.title}". Check your terminal for logs.`);
      }
    }

    await Product.insertMany(productsWithVectors);
    return NextResponse.json({ message: "Success! Database loaded with full vector rows." });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}