const puppeteer = require('puppeteer');

async function scrape(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    if (url.includes('watch')) {
      const videoData = await page.evaluate(() => {
        const title = document.querySelector('h1.title')?.innerText || null;
        const views = document.querySelector('.view-count')?.innerText || null;
        const likes = document.querySelector('.like-button-renderer')?.innerText || null;
        const channelName = document.querySelector('#owner-name a')?.innerText || null;

        const comments = [...document.querySelectorAll('#content-text')].map(el => el.innerText).slice(0, 10);

        return { title, views, likes, channelName, comments };
      });

      await browser.close();
      return { platform: 'YouTube', type: 'Video', ...videoData };
    } else {
      const channelData = await page.evaluate(() => {
        const channelName = document.querySelector('.yt-core-attributed-string--white-space-pre-wrap')?.innerText || null;
        const subscribers = document.querySelectorAll(
            'span.yt-core-attributed-string.yt-content-metadata-view-model-wiz__metadata-text[role="text"]'
          )[1]?.innerText || null;
          
        return { channelName, subscribers };
      });

      await browser.close();
      return { platform: 'YouTube', type: 'Channel', ...channelData };
    }
  } catch (err) {
    console.error('YouTube scraping error:', err.message);
    await browser.close();
    return null;
  }
}

module.exports = { scrape };
