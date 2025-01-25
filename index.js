const youtubeScraper = require('./modules/youtubeScrapper');
const instagramScraper = require('./modules/instagramScrapper');
const facebookScraper = require('./modules/faceBookScrapper');

(async () => {
  const url = process.argv[2]; 

  if (!url) {
    console.error('Please provide a URL to scrape.');
    process.exit(1);
  }

  let result;
  if (url.includes('youtube.com')) {
    result = await youtubeScraper.scrape(url);
  } else if (url.includes('instagram.com')) {
    result = await instagramScraper.scrape(url);
  } else if (url.includes('facebook.com')) {
    result = await facebookScraper.scrape(url);
  } else {
    console.error('Unsupported platform. Use a YouTube, Instagram, or Facebook URL.');
    process.exit(1);
  }

  console.log('Scraped Data:', result);
})();
