const puppeteer = require('puppeteer');

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () =>{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('');
    
    
    await page.setViewport({width: 1024, height: 1024});
    await page.type('#username', '')
    await page.type('#password', '')
    await page.click('#login-submit-wrapper')
    await sleep(2000);
    await page.click('#mainmenua_products')
    await sleep(2000);
    await page.click('[title="Liste"]')
    await sleep(2000);
    const rows = await page.$$('.tagtable.liste.listwithfilterbefore tbody tr');

    for (const row of rows) {
      const link = await row.$('td a');
      if (link) {
          const href = await page.evaluate(a => a.href, link);
          const newPage = await browser.newPage();
          await newPage.goto(href);
          await newPage.setViewport({width: 1024, height: 1024});
          await sleep(2000);
          await newPage.click("a.butAction[href*='action=edit']").catch(e => console.error(e)); // Utiliser catch pour gérer l'erreur
          await sleep(5000);
          await newPage.click('#cke_1_contents'); // Cliquez pour vous assurer que le textarea est actif
          await newPage.keyboard.down('Control');
          await newPage.keyboard.press('A');
          await newPage.keyboard.up('Control');
          await newPage.click("#cke_19");
          await newPage.click('#cke_1_contents');
          await sleep(1000)
          

          await newPage.close();
          await sleep(1000); // Attendre avant de passer à la ligne suivante
      }
  }

  await browser.close();
})();