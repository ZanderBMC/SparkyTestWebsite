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

async function generateOwnerImage() {
  try {
    console.log("Generating owner image for Apex Electrical...");
    
    const prompt = "Smiling male electrician, kneeling on one knee, against a solid black background. Wearing a dark blue uniform with long-sleeved shirt featuring two horizontal reflective grey stripes across the chest and arms, matching dark blue pants. Dark blue baseball cap with partially visible APEX logo. APEX ELECTRICAL logo in blue and orange/yellow text on left chest pocket. Holding a bright yellow digital multimeter with red and black leads in right hand. Friendly and professional expression, approachable and trustworthy, professional portrait photography";
    
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
    
    const outputPath = path.join(__dirname, "assets", "owner.png");
    
    console.log("Downloading image to:", outputPath);
    
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(outputPath, Buffer.from(buffer));
    
    console.log("✅ Owner image saved successfully to assets/owner.png");
    
  } catch (error) {
    console.error("Error generating image:", error.message);
    process.exit(1);
  }
}

generateOwnerImage();

