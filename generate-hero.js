const { fal } = require("@fal-ai/client");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

// Set up fal client
// You can get your API key from https://fal.ai/dashboard
// Set it as: set FAL_KEY=your_key_here (Windows PowerShell) or export FAL_KEY=your_key_here (Mac/Linux)
const apiKey = process.env.FAL_KEY;

if (!apiKey) {
  console.error("❌ FAL_KEY environment variable not found!");
  console.log("\n📝 To generate the hero image, you need a fal.ai API key:");
  console.log("   1. Sign up for free at https://fal.ai");
  console.log("   2. Get your API key from https://fal.ai/dashboard");
  console.log("   3. Set it as an environment variable:");
  console.log("      Windows PowerShell: $env:FAL_KEY='your_key_here'");
  console.log("      Windows CMD: set FAL_KEY=your_key_here");
  console.log("      Mac/Linux: export FAL_KEY=your_key_here");
  console.log("   4. Then run: node generate-hero.js");
  process.exit(1);
}

fal.config({
  credentials: apiKey,
});

async function generateHeroImage() {
  try {
    console.log("Generating hero image for Apex Electrical...");
    
    const prompt = "Professional electrician in uniform working on modern electrical panel in front of a contemporary Australian home, bright daylight, clean and professional, high quality photography, commercial photography style, warm and trustworthy atmosphere";
    
    console.log("Prompt:", prompt);
    console.log("Calling fal.ai API...");
    
    const result = await fal.subscribe("fal-ai/nano-banana-pro", {
      input: {
        prompt: prompt,
        image_size: "landscape_4_3",
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1,
      },
    });

    console.log("Image generated successfully!");
    
    // Extract image URL from response
    const imageUrl = result.data.images[0].url;
    console.log("Image URL:", imageUrl);
    
    // Download the image
    const outputPath = path.join(__dirname, "assets", "WebsiteHero1.png");
    
    console.log("Downloading image to:", outputPath);
    
    // Download image
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(buffer));
    
    console.log("✅ Hero image saved successfully to assets/WebsiteHero1.png");
    console.log("You can now view it in your browser!");
    
  } catch (error) {
    console.error("Error generating image:", error.message);
    if (error.response) {
      console.error("Response:", await error.response.text());
    }
    console.log("\nNote: If you get an authentication error, you may need to:");
    console.log("1. Sign up at https://fal.ai");
    console.log("2. Get your API key from https://fal.ai/dashboard");
    console.log("3. Set it as an environment variable: set FAL_KEY=your_key_here (Windows) or export FAL_KEY=your_key_here (Mac/Linux)");
    process.exit(1);
  }
}

generateHeroImage();

