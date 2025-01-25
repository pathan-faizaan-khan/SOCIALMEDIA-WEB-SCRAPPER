const puppeteer = require("puppeteer");

async function scrape(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    const data = await page.evaluate(() => {
      const name = document.querySelector("h1")?.innerText || null;
      const followers = document.querySelector(
        'a.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1sur9pj.xkrqix3.xi81zsa.x1s688f[role="link"]'
      )?.innerText || null;
      
      const following = document.querySelectorAll(
        'a.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1sur9pj.xkrqix3.xi81zsa.x1s688f[role="link"]'
      )[1]?.innerText || null; // Use querySelectorAll and access the second element
      

      return { name, followers, following };
    });

    await browser.close();
    return { platform: "Facebook", ...data };
  } catch (err) {
    console.error("Facebook scraping error:", err.message);
    await browser.close();
    return null;
  }
}

module.exports = { scrape };
