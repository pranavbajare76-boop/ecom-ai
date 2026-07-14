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
      },
       {
    title: "Travel Backpack 35L",
    description: "Water-resistant backpack with laptop compartment and USB charging port.",
    price: 74,
    category: "Travel",
    image: "https://picsum.photos/500/300"
  },
  {
    title: "Camping Tent for Four",
    description: "Easy-setup waterproof camping tent with ventilation windows.",
    price: 189,
    category: "Outdoor",
    image: "https://picsum.photos/500/300"
  },
  {
    title: "Mountain Bike Helmet",
    description: "Lightweight protective helmet with adjustable fit system.",
    price: 59,
    category: "Sports",
    image: "https://picsum.photos/500/300"
  },
  {
    title: "Modern Wall Clock",
    description: "Silent quartz wall clock with elegant wooden frame.",
    price: 44,
    category: "Home",
    image: "https://picsum.photos/500/300"
  },
  {
    title: "Decorative Indoor Plant",
    description: "Artificial potted plant perfect for home and office decoration.",
    price: 25,
    category: "Home Decor",
    image: "https://picsum.photos/500/300"
  },
  {
    title: "Premium Bath Towel Set",
    description: "Ultra-soft cotton towel set with high absorbency.",
    price: 54,
    category: "Home",
    image: "https://picsum.photos/500/300"
  },
  {
    title: "Leather Wallet for Men",
    description: "Slim RFID-blocking wallet with multiple card slots.",
    price: 39,
    category: "Accessories",
    image: "https://picsum.photos/500/300"
  },
  {
    title: "Polarized Sunglasses",
    description: "UV400 protection sunglasses with lightweight frame.",
    price: 69,
    category: "Accessories",
    image: "https://picsum.photos/500/300"
  },
  {
    title: "Hard Shell Suitcase",
    description: "Expandable luggage with spinner wheels and TSA lock.",
    price: 149,
    category: "Travel",
    image: "https://picsum.photos/500/300"
  },
  {
    title: "Children's Building Block Set",
    description: "Creative educational construction blocks for kids aged 6+.",
    price: 49,
    category: "Toys",
    image: "https://picsum.photos/500/300"
  },
  {
    title: "Classic Acoustic Guitar",
    description: "Full-size beginner-friendly guitar with rich sound quality.",
    price: 229,
    category: "Music",
    image: "https://picsum.photos/500/300"
  },
  {
    title: "Electric Toothbrush",
    description: "Rechargeable toothbrush with multiple brushing modes.",
    price: 79,
    category: "Health",
    image: "https://picsum.photos/500/300"
  },
  {
    title: "Hair Dryer with Ionic Technology",
    description: "Fast-drying hair dryer with temperature and speed controls.",
    price: 65,
    category: "Beauty",
    image: "https://picsum.photos/500/300"
  },
  {
    title: "Facial Skincare Gift Set",
    description: "Complete skincare routine including cleanser, toner, and moisturizer.",
    price: 89,
    category: "Beauty",
    image: "https://picsum.photos/500/300"
  },
  {
    title: "Organic Green Tea Pack",
    description: "Premium organic green tea with 100 antioxidant-rich tea bags.",
    price: 24,
    category: "Groceries",
    image: "https://picsum.photos/500/300"
  },
  {
    title: "Professional DSLR Camera Bag",
    description: "Shockproof waterproof camera backpack with customizable compartments.",
    price: 119,
    category: "Photography",
    image: "https://picsum.photos/500/300"
  },
  {
    title: "Smart LED TV 43 Inch",
    description: "4K Ultra HD Smart TV with HDR support and streaming apps.",
    price: 499,
    category: "Electronics",
    image: "https://picsum.photos/500/300"
  },
  {
    title: "Robot Vacuum Cleaner",
    description: "Automatic vacuum cleaner with smart navigation and app control.",
    price: 349,
    category: "Home Appliances",
    image: "https://picsum.photos/500/300"
  },
  {
    title: "Portable Laptop Stand",
    description: "Foldable aluminum laptop stand with adjustable viewing angles.",
    price: 42,
    category: "Office",
    image: "https://picsum.photos/500/300"
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