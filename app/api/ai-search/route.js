import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/product";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request) {
  try {
    const { query } = await request.json();
    if (!query || !query.trim()) return NextResponse.json([]);

    await connectDB();

    // Generate vector query structure using standard stable layout
const embeddingResponse = await ai.models.embedContent({
  model: "gemini-embedding-2", // Must match the seeding model string name!
  contents: query,
});

// Update the extraction target logic immediately under it to safely catch the array:
const queryVector = embeddingResponse?.embeddings?.[0]?.values || embeddingResponse?.embedding?.values;
    if (!queryVector) {
      throw new Error("Could not parse search embedding array from Gemini response.");
    }

    // Query MongoDB using Atlas Vector Search Aggregation Pipeline
    const results = await Product.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",       
          path: "embedding",           
          queryVector: queryVector,     
          numCandidates: 10,           
          limit: 5                     
        }
      },
      {
        $project: {
          title: 1,
          description: 1,
          price: 1,
          category: 1,
          image: 1,
          score: { $meta: "vectorSearchScore" } 
        }
      }
    ]);

    return NextResponse.json(results);
  } catch (error) {
    console.error("Gemini Closest Match Search Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}