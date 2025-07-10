const https = require('https');
const fs = require('fs');
const path = require('path');

// CDN Image URLs for each project
const CDN_IMAGES = {
  'learnify': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop&crop=center',
  'byteeat': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=800&fit=crop&crop=center',
  'ticketraising': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&crop=center',
  'imdb-sentiment': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&crop=center',
  'fake-news': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=800&fit=crop&crop=center',
  'smart-attendance': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&crop=center'
};

// Alternative CDN sources
const ALTERNATIVE_CDN = {
  'learnify': 'https://picsum.photos/1200/800?random=1',
  'byteeat': 'https://picsum.photos/1200/800?random=2', 
  'ticketraising': 'https://picsum.photos/1200/800?random=3',
  'imdb-sentiment': 'https://picsum.photos/1200/800?random=4',
  'fake-news': 'https://picsum.photos/1200/800?random=5',
  'smart-attendance': 'https://picsum.photos/1200/800?random=6'
};

// Function to download image from CDN
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(__dirname, 'public', 'project-images', filename);
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Downloaded: ${filename}`);
          resolve();
        });
      } else {
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file if download failed
      reject(err);
    });
  });
}

// Function to update config file with CDN URLs
function updateConfigWithCDN() {
  const configPath = path.join(__dirname, 'src', 'config.js');
  
  if (!fs.existsSync(configPath)) {
    console.log('❌ Config file not found');
    return;
  }

  let configContent = fs.readFileSync(configPath, 'utf8');
  
  // Update each project's image path to use CDN
  const projects = [
    { name: 'learnify', cdnUrl: CDN_IMAGES.learnify },
    { name: 'byteeat', cdnUrl: CDN_IMAGES.byteeat },
    { name: 'ticketraising', cdnUrl: CDN_IMAGES['ticketraising'] },
    { name: 'imdb-sentiment', cdnUrl: CDN_IMAGES['imdb-sentiment'] },
    { name: 'fake-news', cdnUrl: CDN_IMAGES['fake-news'] },
    { name: 'smart-attendance', cdnUrl: CDN_IMAGES['smart-attendance'] }
  ];

  projects.forEach(project => {
    const oldPattern = new RegExp(`image: '/project-images/${project.name}\\.png'`, 'g');
    const newImage = `image: '${project.cdnUrl}'`;
    
    if (configContent.includes(`/project-images/${project.name}.png`)) {
      configContent = configContent.replace(oldPattern, newImage);
      console.log(`✅ Updated ${project.name} to use CDN`);
    }
  });

  fs.writeFileSync(configPath, configContent);
  console.log('✅ Config file updated with CDN URLs');
}

// Main function
async function fetchCDNImages() {
  console.log('🚀 Starting to fetch project images from CDN...');
  
  // Create project-images directory if it doesn't exist
  const projectImagesDir = path.join(__dirname, 'public', 'project-images');
  if (!fs.existsSync(projectImagesDir)) {
    fs.mkdirSync(projectImagesDir, { recursive: true });
  }

  // Try to download images from primary CDN
  for (const [projectName, url] of Object.entries(CDN_IMAGES)) {
    try {
      console.log(`🔍 Downloading: ${projectName}`);
      await downloadImage(url, `${projectName}.png`);
    } catch (error) {
      console.log(`⚠️  Primary CDN failed for ${projectName}, trying alternative...`);
      try {
        await downloadImage(ALTERNATIVE_CDN[projectName], `${projectName}.png`);
      } catch (altError) {
        console.error(`❌ Failed to download ${projectName}:`, altError.message);
      }
    }
  }
  
  console.log('✨ CDN images fetched successfully!');
  
  // Update config to use CDN URLs
  updateConfigWithCDN();
}

// Run the script
fetchCDNImages().catch(console.error); 