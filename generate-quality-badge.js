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

async function generateQualityBadge() {
  try {
    console.log("Generating Quality Guaranteed badge...");
    
    const prompt = "Circular Quality Guaranteed seal badge, dark red maroon wax seal outer layer with organic melted appearance and uneven edges, antique brass bronze metallic circular disc embedded in center, embossed text QUALITY on top curve and GUARANTEED on bottom curve with small circular dots separating words, prominent five-pointed star embossed in center, authentic traditional wax seal appearance, professional product photography, solid black background";
    
    console.log("Prompt:", prompt);
    console.log("Calling fal.ai API...");
    
    const result = await fal.subscribe("fal-ai/nano-banana-pro", {
      input: {
        prompt: prompt,
        image_size: "square",
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1,
      },
    });

    console.log("Image generated successfully!");
    
    const imageUrl = result.data.images[0].url;
    console.log("Image URL:", imageUrl);
    
    const outputPath = path.join(__dirname, "assets", "quality-badge.png");
    
    console.log("Downloading image to:", outputPath);
    
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(buffer));
    
    console.log("✅ Quality badge saved successfully to assets/quality-badge.png");
    
  } catch (error) {
    console.error("Error generating image:", error.message);
    process.exit(1);
  }
}

generateQualityBadge();

