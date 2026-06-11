const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function run() {
  console.log("Installing puppeteer...");
  execSync('npm install puppeteer --no-save', { stdio: 'inherit' });
  
  const puppeteer = require('puppeteer');
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  
  await page.setViewport({ width: 1280, height: 800 });
  
  console.log("Navigating to http://localhost:5173/ ...");
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  
  console.log("Clicking Start...");
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const startBtn = buttons.find(b => b.textContent.includes('Start Creating Now'));
    if (startBtn) startBtn.click();
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  console.log("Clicking Generate Magic...");
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const genBtn = buttons.find(b => b.textContent.includes('Generate Magic'));
    if (genBtn) genBtn.click();
  });
  
  console.log("Waiting 3 seconds for backend...");
  await new Promise(r => setTimeout(r, 3000));
  
  const screenshotPath = path.join('C:\\Users\\pvash\\.gemini\\antigravity\\brain\\dbcdf0b3-bddc-41dc-ac5d-92bec707ebfb', 'screenshot.png');
  await page.screenshot({ path: screenshotPath });
  console.log("Screenshot saved to: " + screenshotPath);
  
  // also get console logs
  const logs = await page.evaluate(() => {
    return window.__logs || [];
  });
  
  await browser.close();
  console.log("Done.");
}

run().catch(console.error);
