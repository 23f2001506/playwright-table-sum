import { chromium } from 'playwright';

const seeds = Array.from({ length: 10 }, (_, i) => 77 + i);
const urls = seeds.map(seed => `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`); // replace with actual

let totalSum = 0;

const browser = await chromium.launch();
const page = await browser.newPage();

for (const url of urls) {
  await page.goto(url);
  const numbers = await page.$$eval('table td', tds =>
    tds.map(td => parseFloat(td.textContent.replace(/,/g, '').trim()))
       .filter(n => !isNaN(n))
  );
  totalSum += numbers.reduce((a, b) => a + b, 0);
}

console.log(`TOTAL SUM: ${totalSum}`);
await browser.close();
