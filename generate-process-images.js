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

const processImages = [
  {
    prompt: "Professional electrician in uniform conducting initial consultation with homeowners, discussing electrical needs, pointing at electrical panel, friendly conversation, modern home interior, professional photography",
    filename: "process-consultation.png"
  },
  {
    prompt: "Close-up of detailed written electrical quote document on clipboard, professional electrician's hands holding pen, calculator and measuring tape visible, clear pricing breakdown, professional business photography",
    filename: "process-quote.png"
  },
  {
    prompt: "Electrician working on scheduled electrical installation, professional work in progress, organized tools, clean work area, modern home setting, professional action photography",
    filename: "process-work.png"
  },
  {
    prompt: "Electrician testing electrical installation with multimeter, quality assurance check, safety inspection, professional testing equipment, modern switchboard, professional photography",
    filename: "process-quality.png"
  }
];

async function generateProcessImages() {
  for (const item of processImages) {
    try {
      console.log(`Generating ${item.filename}...`);
      console.log("Prompt:", item.prompt);
      
      const result = await fal.subscribe("fal-ai/nano-banana-pro", {
        input: {
          prompt: item.prompt,
          image_size: "square",
          num_inference_steps: 28,
          guidance_scale: 3.5,
          num_images: 1,
        },
      });

      console.log("Image generated successfully!");
      const imageUrl = result.data.images[0].url;
      console.log("Image URL:", imageUrl);
      
      const outputPath = path.join(__dirname, "assets", item.filename);
      console.log("Downloading to:", outputPath);
      
      const response = await fetch(imageUrl);
      const buffer = await response.arrayBuffer();
      fs.writeFileSync(outputPath, Buffer.from(buffer));
      
      console.log(`✅ ${item.filename} saved successfully!\n`);
      
    } catch (error) {
      console.error(`Error generating ${item.filename}:`, error.message);
    }
  }
  
  console.log("✅ All process images generated!");
}

generateProcessImages();

