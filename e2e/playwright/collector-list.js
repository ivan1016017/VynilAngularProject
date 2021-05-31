
//Importar Playwright
const playwright = require('playwright');


const url = "http://localhost:4200/main"
const nameScreenPath= "./pw_screenshots"

//Configuracion de test
const titleTest = "collector-listar"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`

console.log('e2e test for collector listar');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: test for collector listar')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch(
      //{headless:false}
    );
    const context = await browser.newContext();
    const page = await context.newPage();

    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await page.goto(url);
    await page.screenshot({ path: `${pathScreenshotsTest}1_main_page.png`})

    await page.pause()
    await page.click('id=enter')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}2_entry_display.png`, fullPage: true })


    //Desplegar la lista de colleccionistas
    await page.pause()

    await page.click('id=goCollectors')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}3_collector_list.png`, fullPage: true })

    //Finalizar la prueba
    await page.pause()

    console.log('OK Scenario: Collector Detail')
    await new Promise(r => setTimeout(r, 1000));
    await browser.close();
  }
  return;
})();//Llamado propio de la función
