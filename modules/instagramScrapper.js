const puppeteer = require('puppeteer');

async function scrape(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    if (url.includes('/p/')) {
      const postData = await page.evaluate(() => {
        const caption = document.querySelector('div.C4VMK > span')?.innerText || null;
        const likes = document.querySelector('.Nm9Fw > span')?.innerText || null;
        const comments = [...document.querySelectorAll('.Mr508')].map(el => el.innerText).slice(0, 10);

        return { caption, likes, comments };
      });

      await browser.close();
      return { platform: 'Instagram', type: 'Post', ...postData };
    } else {
      await page.waitForSelector('h2.x1lliihq', { timeout: 10000 });
      await page.waitForSelector('button._acan._acao._acat._aj1-._ap30[type="button"]', { timeout: 10000 });

      const profileData = await page.evaluate(() => {
        const username = document.querySelector('h2.x1lliihq')?.innerText || null;
        const followersButton = document.querySelectorAll('button._acan._acao._acat._aj1-._ap30[type="button"]')[0];
        const Posts = followersButton?.querySelector('span.x5n08af.x1s688f > span')?.innerText || null;

        const followingButton = document.querySelectorAll('button._acan._acao._acat._aj1-._ap30[type="button"]')[1];
        const followers = followingButton?.querySelector('span.x5n08af.x1s688f > span')?.innerText || null;

        const followingButton2 = document.querySelectorAll('button._acan._acao._acat._aj1-._ap30[type="button"]')[2];
        const following = followingButton2?.querySelector('span.x5n08af.x1s688f > span')?.innerText || null;

        return { username, Posts, followers, following };
      });

      await browser.close();
      return { platform: 'Instagram', type: 'Profile', ...profileData };
    }
  } catch (err) {
    console.error('Instagram scraping error:', err.message);
    await browser.close();
    return null;
  }
}

module.exports = { scrape };
