const https = require('https');
const fs = require('fs');
const path = require('path');

// Unsplash API configuration
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY'; // You'll need to get this from unsplash.com
const PROJECT_IMAGES = [
  {
    name: 'learnify.png',
    query: 'e-learning dashboard education platform',
    description: 'Modern e-learning platform with course cards and progress tracking'
  },
  {
    name: 'byteeat.png', 
    query: 'restaurant ordering app food delivery',
    description: 'Mobile restaurant ordering interface with QR scanner'
  },
  {
    name: 'ticketraising.png',
    query: 'helpdesk ticket management system',
    description: 'Professional support ticket dashboard with status tracking'
  },
  {
    name: 'imdb-sentiment.png',
    query: 'data visualization dashboard analytics',
    description: 'Sentiment analysis dashboard with charts and metrics'
  },
  {
    name: 'fake-news.png',
    query: 'news analysis fact checking tool',
    description: 'AI-powered news verification interface'
  },
  {
    name: 'smart-attendance.png',
    query: 'face recognition attendance system',
    description: 'Biometric attendance tracking with face detection'
  }
];

// Function to download image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(__dirname, 'public', 'project-images', filename);
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file if download failed
      reject(err);
    });
  });
}

// Function to search Unsplash
function searchUnsplash(query) {
  return new Promise((resolve, reject) => {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=1`;
    
    const options = {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.results && result.results.length > 0) {
            resolve(result.results[0].urls.regular);
          } else {
            reject(new Error('No images found'));
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

// Main function to fetch all images
async function fetchProjectImages() {
  console.log('🚀 Starting to fetch project images...');
  
  // Create project-images directory if it doesn't exist
  const projectImagesDir = path.join(__dirname, 'public', 'project-images');
  if (!fs.existsSync(projectImagesDir)) {
    fs.mkdirSync(projectImagesDir, { recursive: true });
  }

  for (const project of PROJECT_IMAGES) {
    try {
      console.log(`🔍 Searching for: ${project.description}`);
      const imageUrl = await searchUnsplash(project.query);
      await downloadImage(imageUrl, project.name);
    } catch (error) {
      console.error(`❌ Error fetching ${project.name}:`, error.message);
    }
  }
  
  console.log('✨ All images fetched successfully!');
}

// Alternative: Use placeholder images if Unsplash API is not available
function createPlaceholderImages() {
  console.log('📝 Creating placeholder images...');
  
  const projectImagesDir = path.join(__dirname, 'public', 'project-images');
  if (!fs.existsSync(projectImagesDir)) {
    fs.mkdirSync(projectImagesDir, { recursive: true });
  }

  // Create a simple HTML file that generates placeholder images
  const placeholderHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Project Image Generator</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .project-image { 
            width: 1200px; height: 800px; 
            border: 2px solid #333; margin: 20px 0;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; text-align: center;
        }
        .project-title { font-size: 48px; font-weight: bold; margin-bottom: 20px; }
        .project-desc { font-size: 24px; max-width: 800px; }
    </style>
</head>
<body>
    <h1>Project Images Generator</h1>
    <p>Right-click on each image below and "Save Image As" to download:</p>
    
    <div class="project-image">
        <div class="project-title">Learnify</div>
        <div class="project-desc">MERN Stack Online Learning Platform</div>
    </div>
    
    <div class="project-image">
        <div class="project-title">ByteEat</div>
        <div class="project-desc">Smart Restaurant Ordering System</div>
    </div>
    
    <div class="project-image">
        <div class="project-title">TicketRaisingPlatform</div>
        <div class="project-desc">MERN Stack Issue Tracker</div>
    </div>
    
    <div class="project-image">
        <div class="project-title">IMDB Sentiment Analysis</div>
        <div class="project-desc">Machine Learning Data Visualization</div>
    </div>
    
    <div class="project-image">
        <div class="project-title">Fake News Detection</div>
        <div class="project-desc">AI-Powered News Analysis Tool</div>
    </div>
    
    <div class="project-image">
        <div class="project-title">Smart Attendance System</div>
        <div class="project-desc">Face Recognition Attendance Tracking</div>
    </div>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, 'project-image-generator.html'), placeholderHTML);
  console.log('📄 Created project-image-generator.html - Open this file in your browser to generate placeholder images');
}

// Run the script
if (UNSPLASH_ACCESS_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
  console.log('⚠️  No Unsplash API key provided. Creating placeholder images instead...');
  createPlaceholderImages();
} else {
  fetchProjectImages();
} 