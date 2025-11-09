// src/data/mockData.js

export const liveStatistics = [
  {
    id: 1,
    metric: "Total CO₂ Saved",
    value: 154780, 
    unit: "kg",
    icon: "☁️", // Using a cloud emoji placeholder
  },
  {
    id: 2,
    metric: "Plastic Reduced",
    value: 9500, 
    unit: "kg",
    icon: "♻️", // Using recycle emoji placeholder
  },
  {
    id: 3,
    metric: "Active Users",
    value: 12400,
    unit: "", 
    icon: "👤", // Using a person emoji placeholder
  },
  {
    id: 4,
    metric: "Community Events",
    value: 250,
    unit: "+",
    icon: "🗓️", // Using calendar emoji placeholder
  },
];







export const activeChallenges = [
  {
    id: 101,
    title: "30-Day Plastic Fast",
    category: "Waste Reduction",
    metric: "125 users, 950kg plastic saved",
    imageURL: "https://picsum.photos/id/10/400/300",
    slug: "30-day-plastic-fast",
  },
  {
    id: 102,
    title: "Local Produce Pledge",
    category: "Sustainable Food",
    metric: "88 users, 450 miles reduced",
    imageURL: "https://picsum.photos/id/20/400/300",
    slug: "local-produce-pledge",
  },
  {
    id: 103,
    title: "Water Conservation Week",
    category: "Resource Saving",
    metric: "150 users, 12,000L water saved",
    imageURL: "https://picsum.photos/id/30/400/300",
    slug: "water-conservation-week",
  },
  {
    id: 104,
    title: "Transit Commuter Challenge",
    category: "Lowering CO₂",
    metric: "55 users, 5,500kg CO₂ avoided",
    imageURL: "https://picsum.photos/id/40/400/300",
    slug: "transit-commuter-challenge",
  },
];




export const recentTips = [
  {
    id: 201,
    title: "DIY Compost Bin in Under 30 Minutes",
    authorName: "GardenGuru",
    upvotes: 45,
    createdAt: new Date('2025-11-08T10:00:00Z'),
    preview: "Using old pallets and chicken wire, I constructed a simple and effective compost bin. It's been great for kitchen scraps and yard waste...",
  },
  {
    id: 202,
    title: "Switching to Bamboo Toothbrushes: Worth It?",
    authorName: "ZeroWasteJane",
    upvotes: 22,
    createdAt: new Date('2025-11-07T15:30:00Z'),
    preview: "I tried five different brands of bamboo toothbrushes this month. Here's my honest review on durability and feel...",
  },
  {
    id: 203,
    title: "The Simple Trick to Reducing Food Waste",
    authorName: "ChefEco",
    upvotes: 78,
    createdAt: new Date('2025-11-06T08:45:00Z'),
    preview: "The secret is simple: a 'use first' basket in your fridge. It works wonders for making sure nothing goes to waste...",
  },
  {
    id: 204,
    title: "My Solar Panel Installation Journey",
    authorName: "SunnySideUp",
    upvotes: 120,
    createdAt: new Date('2025-11-05T19:15:00Z'),
    preview: "A breakdown of the costs, permits, and the process of installing solar panels on my home last spring...",
  },
  {
    id: 205, // New unique ID
    title: "Batch Cooking for a Lower Carbon Footprint",
    authorName: "MealPrepPro",
    upvotes: 61,
    createdAt: new Date('2025-11-04T12:00:00Z'),
    preview: "Planning and preparing meals ahead of time not only saves money but dramatically reduces food waste and the energy used for cooking...",
  }
];






export const upcomingEvents = [
  {
    id: 301,
    title: "Community Beach Cleanup",
    date: new Date('2025-11-22T09:00:00Z'),
    location: "Sunrise Coast Beach, Pier A",
    description: "Spend a morning helping to clear our local coastline. Gloves and bags provided.",
  },
  {
    id: 302,
    title: "Urban Gardening Workshop",
    date: new Date('2025-11-30T14:30:00Z'),
    location: "The Green Hub, Room 101",
    description: "Learn how to maximize small spaces for growing herbs and vegetables in the city.",
  },
  {
    id: 303,
    title: "Bike-to-Work Advocacy Ride",
    date: new Date('2025-12-05T07:00:00Z'),
    location: "City Hall Plaza",
    description: "Join us for a peaceful ride to promote better cycling infrastructure downtown.",
  },
  {
    id: 304,
    title: "Zero Waste Holiday Market",
    date: new Date('2025-12-14T11:00:00Z'),
    location: "Old Town Market Square",
    description: "Shop local, sustainable, and handmade gifts for the holiday season.",
  },
];