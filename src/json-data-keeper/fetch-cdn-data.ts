// /** @format */

// import { staticSampleCategories, staticSampleData } from "./static-data";

// // Your actual GitHub info
// const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
// const REPO_NAME = process.env.REPO_NAME;
// const BRANCH = process.env.BRANCH;

// // Validate environment variables
// if (!GITHUB_USERNAME || !REPO_NAME || !BRANCH) {
//   throw new Error(
//     "Missing required environment variables for GitHub data loading"
//   );
// }

// // JSDelivr URLs for your separate files (with correct directory)
// //https://raw.githubusercontent.com/iFrugal/json-data-keeper/refs/heads/main/kb-masale-ui/categories.json
// const PRODUCTS_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/refs/heads/${BRANCH}/kb-masale-ui/new-products.json`;
// const CATEGORIES_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/refs/heads/${BRANCH}/kb-masale-ui/new-categories.json`;


// //const PRODUCTS_URL = `https://cdn.jsdelivr.net/gh/${GITHUB_USERNAME}/${REPO_NAME}@${BRANCH}/kb-masale-ui/products.json?${Date.now()}`;
// //const CATEGORIES_URL = `https://cdn.jsdelivr.net/gh/${GITHUB_USERNAME}/${REPO_NAME}@${BRANCH}/kb-masale-ui/categories.json?${Date.now()}`;

// console.log("🔍 Products URL:", PRODUCTS_URL);
// console.log("🔍 Categories URL:", CATEGORIES_URL);

// // Your original static data as immediate fallb

// // Create the exported objects
// const sampleData = { products: [] };
// const sampleCategories = [];

// // Function to load data from JSDelivr - SINGLE EXPORT
// const loadDataFromJSDelivr = async (): Promise<boolean> => {
//   console.log("🚀 Loading data from JSDelivr...");

//   try {
//     console.log("📡 Loading from separate files...");

//     // Load products
//     console.log("📦 Fetching products...");
//     const productsResponse = await fetch(PRODUCTS_URL);
//     if (productsResponse.ok) {
//       const productsData = await productsResponse.json();
//       console.log("✅ Products loaded:", productsData);

//       // Handle both {products: [...]} and [...] formats
//       const products = productsData.products || productsData;
//       sampleData.products.splice(0, sampleData.products.length, ...products);
//       console.log("✅ Products updated:", sampleData.products.length);
//     } else {
//       console.error("❌ Products fetch failed:", productsResponse.status);
//     }

//     // Load categories
//     console.log("📂 Fetching categories...");
//     const categoriesResponse = await fetch(CATEGORIES_URL);
//     if (categoriesResponse.ok) {
//       const categoriesData = await categoriesResponse.json();
//       console.log("✅ Categories loaded:", categoriesData);

//       // Handle both {categories: [...]} and [...] formats
//       const categories = categoriesData.categories || categoriesData;
//       sampleCategories.splice(0, sampleCategories.length, ...categories);
//       console.log("✅ Categories updated:", sampleCategories.length);
//     } else {
//       console.error("❌ Categories fetch failed:", categoriesResponse.status);
//     }

//     console.log("🎉 Data loading completed!");
//     return true;
//   } catch (error) {
//     console.error("❌ Failed to load from JSDelivr:", error);
//     console.log("⚠️ Using static fallback data");
//     return false;
//   }
// };

// // Auto-load when in browser - IMPROVED VERSION
// if (typeof window !== "undefined") {
//   console.log("🌐 Browser detected, loading data...");

//   // Multiple ways to ensure the API call happens

//   // Method 1: Immediate call
//   loadDataFromJSDelivr().catch(console.error);

//   // Method 2: DOM ready
//   if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", () => {
//       console.log("📄 DOM ready, loading data...");
//       loadDataFromJSDelivr().catch(console.error);
//     });
//   } else {
//     console.log("📄 DOM already ready, loading data immediately...");
//     loadDataFromJSDelivr().catch(console.error);
//   }

//   // Method 3: Backup with setTimeout
//   setTimeout(() => {
//     console.log("⏰ Timeout backup, loading data...");
//     loadDataFromJSDelivr().catch(console.error);
//   }, 500);
// } else {
//   console.log("🖥️ Server environment, skipping data load");
// }

// // Export everything - NO DUPLICATES
// export { sampleData, sampleCategories, loadDataFromJSDelivr };

// // Add a manual trigger for testing
// export const manualLoadData = () => {
//   console.log("🔧 Manual data load triggered");
//   return loadDataFromJSDelivr();
// };
