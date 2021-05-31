//Importar Playwright
const playwright = require('playwright');


const url = "http://localhost:4200/main"
const nameScreenPath= "./pw_screenshots"

//Configuracion de test
const titleTest = "musician-detail"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`

console.log('e2e test for list of musicians');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: test for list of musicians')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch(
      //{headless:true}
    );
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.pause()
    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await page.goto(url);
    await page.screenshot({ path: `${pathScreenshotsTest}1_main_page.png`})

    await page.pause()

    await page.click('id=enter')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}2_entry_display.png`, fullPage: true })

    await page.pause()
    //Desplegar la lista de musico
    await page.click('id=goMusicians')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}3_go_musicians.png`, fullPage: true })

    await page.pause()
    //Desplegar el detalle de musico
    await page.click('.card-img')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}4_musician_detail.png`, fullPage: true })

    await page.pause()
    //Finalizar la prueba
    console.log('OK Scenario: List Musicians')
    await new Promise(r => setTimeout(r, 1000));
    await browser.close();
  }
  return;
})();//Llamado propio de la función
