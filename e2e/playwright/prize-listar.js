
//Importar Playwright
const playwright = require('playwright');


const url = "http://localhost:4200/main"
const nameScreenPath= "./pw_screenshots"

//Configuracion de test
const titleTest = "prize-list"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`

console.log('e2e test for list prizes');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: test for list prizes')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await page.goto(url);
    await page.screenshot({ path: `${pathScreenshotsTest}1_main_page.png`, fullPage: true})

    await page.click('id=enter')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}2_entry_display.png`, fullPage: true})

    //Desplegar la lista de albumes
    await page.click('id=goPrizes')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}3_award_list.png`, fullPage: true})


    //Finalizar la prueba
    console.log('OK Scenario: List Prizes')
    await new Promise(r => setTimeout(r, 1000));
    await browser.close();
  }
  return;
})();//Llamado propio de la función
