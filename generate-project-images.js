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

const projectImages = [
  {
    prompt: "Modern residential switchboard upgrade completed, new safety switches installed, clean professional installation, modern Australian home, before and after style, professional electrical work photography",
    filename: "project-residential-switchboard.png"
  },
  {
    prompt: "Commercial office building with modern LED lighting installation, bright professional lighting, modern office interior, energy efficient lighting, commercial electrical project, professional photography",
    filename: "project-commercial-lighting.png"
  },
  {
    prompt: "Emergency electrical repair in progress, electrician fixing fault, professional emergency service, residential home, urgent repair work, professional action photography",
    filename: "project-emergency-repair.png"
  },
  {
    prompt: "Complete home rewiring project, new electrical wiring installed, modern residential home renovation, professional electrical installation, clean workmanship, professional photography",
    filename: "project-home-rewiring.png"
  },
  {
    prompt: "Commercial retail space electrical fit-out, modern commercial electrical installation, retail store with new electrical systems, professional commercial project, clean installation, professional photography",
    filename: "project-commercial-fitout.png"
  }
];

async function generateProjectImages() {
  for (const item of projectImages) {
    try {
      console.log(`Generating ${item.filename}...`);
      console.log("Prompt:", item.prompt);
      
      const result = await fal.subscribe("fal-ai/nano-banana-pro", {
        input: {
          prompt: item.prompt,
          image_size: "landscape_4_3",
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
  
  console.log("✅ All project images generated!");
}

generateProjectImages();

