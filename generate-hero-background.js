const { fal } = require("@fal-ai/client");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const apiKey = process.env.FAL_KEY;

if (!apiKey) {
  console.error("❌ FAL_KEY environment variable not found!");
  process.exit(1);
}

fal.config({
  credentials: apiKey,
});

async function generateHeroBackground() {
  try {
    console.log("Generating hero background image for Apex Electrical...");
    
    const prompt = "Modern contemporary Australian home with dark gray roof, beautiful sunset sky with warm orange and red gradient colors, professional real estate photography, high quality, wide angle view, residential property";
    
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
    
    const imageUrl = result.data.images[0].url;
    console.log("Image URL:", imageUrl);
    
    const outputPath = path.join(__dirname, "assets", "hero-background.png");
    
    console.log("Downloading image to:", outputPath);
    
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(buffer));
    
    console.log("✅ Hero background saved successfully to assets/hero-background.png");
    
  } catch (error) {
    console.error("Error generating image:", error.message);
    process.exit(1);
  }
}

generateHeroBackground();

