import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/product";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini pulling securely from your hidden environment configurations
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request) {
  try {
    const { query } = await request.json();
    
    // Safety check: if user submits an empty search, return empty array immediately
    if (!query || !query.trim()) {
      return NextResponse.json([]);
    }

    await connectDB();

    // 1. Convert user's conceptual search phrase into a 768-dimensional mathematical vector
    const embeddingResponse = await ai.models.embedContent({
      model: "text-embedding-004", // Must match the model used in seed/route.js
      contents: query,
    });
    const queryVector = embeddingResponse.embedding.values;

    // 2. Query MongoDB using Atlas Vector Search Aggregation Pipeline
    // This finds the mathematically closest items, even if keywords don't match exactly!
    const results = await Product.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",       // Must match the Index Name built inside MongoDB Atlas
          path: "embedding",           // The field inside Product.js schema where vectors are saved
          queryVector: queryVector,     // The converted user search array
          numCandidates: 10,           // Number of close items to test internally
          limit: 5                     // Total closest product results to return to the user UI
        }
      },
      {
        $project: {
          title: 1,
          description: 1,
          price: 1,
          category: 1,
          image: 1,
          score: { $meta: "vectorSearchScore" } // Injects a matching confidence score (e.g., 0.89)
        }
      }
    ]);

    return NextResponse.json(results);
  } catch (error) {
    console.error("Gemini Closest Match Search Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}