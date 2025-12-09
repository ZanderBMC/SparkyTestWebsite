# Sparky Test Website

Apex Electrical website - a modern, responsive single-page website for electrical services.

## Development

### Running the Development Server

```bash
yarn install
yarn run dev
```

The site will be available at `http://localhost:3000`

## Generating Images

All image generation scripts use the **fal-ai/nano-banana-pro** model.

### Prerequisites

1. **Get a free fal.ai API key:**
   - Sign up at https://fal.ai
   - Get your API key from https://fal.ai/dashboard

2. **Set the API key as an environment variable:**
   
   **Windows PowerShell:**
   ```powershell
   $env:FAL_KEY='your_api_key_here'
   ```
   
   **Windows CMD:**
   ```cmd
   set FAL_KEY=your_api_key_here
   ```
   
   **Mac/Linux:**
   ```bash
   export FAL_KEY=your_api_key_here
   ```

### Available Scripts

- **Generate Hero Background:**
  ```bash
  node generate-hero-background.js
  ```
  Generates the hero section background (modern home with sunset) and saves to `assets/hero-background.png`

- **Generate Owner Image:**
  ```bash
  node generate-owner-image.js
  ```
  Generates the owner portrait image and saves to `assets/owner.png`

- **Generate Hero Image (legacy):**
  ```bash
  node generate-hero.js
  ```
  Generates a hero image and saves to `assets/WebsiteHero1.png`

- **Generate Process Images:**
  ```bash
  yarn run generate-process
  # or
  node generate-process-images.js
  ```
  Generates 4 process step images and saves to `assets/process-consultation.png`, `process-quote.png`, `process-work.png`, and `process-quality.png`

- **Generate Project Images:**
  ```bash
  yarn run generate-projects
  # or
  node generate-project-images.js
  ```
  Generates 5 project portfolio images (residential and commercial) and saves to `assets/project-*.png`

## Project Structure

- `index.html` - Main website file (all HTML, CSS, and JavaScript)
- `assets/` - Images and static assets
- `generate-hero.js` - Script to generate hero images using AI
- `package.json` - Project dependencies and scripts

