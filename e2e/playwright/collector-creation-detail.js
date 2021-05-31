//Importar Playwright
const playwright = require('playwright');


const url = "http://localhost:4200/main";
const nameScreenPath = "pw_screenshots";

//Configuracion de test
const titleTest = "Collector-creation-detail"
const pathScreenshotsTest =`e2e/${nameScreenPath}/${titleTest}/`

console.log('e2e Collector creation');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: test for collector-creation')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch(
      //{headless: false}
    );
    const context = await browser.newContext();
    const page = await context.newPage();

    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await page.goto(url);
    await page.screenshot({ path: `${pathScreenshotsTest}1_main_page.png`})

    await page.pause();

    await page.click('id=enter')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}2_entry_display.png`, fullPage: true })

    //Ir a collectors
    await page.click('text=Collectors');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}3_go_Collector.png`, fullPage: true })

    //Crear nuevo collector
    await page.click('[aria-label="Add new collectors"]');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}4_CreateCollector.png`, fullPage: true })

    //Llenar inputs collector
    //Fill Name
    await page.fill('id=input_create_collector_name', 'Collector Name');
    //Fill Number
    await page.fill('id=input_album_collector_phone', '12345678');
    //Fill email
    await page.fill('id=input_collector_email', 'collector@test.com');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}5_fillDataCollector.png`, fullPage: true })

    await page.pause();

    // Click create Collector boton disponible
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:4200/dashboard/collectors' }*/),
      page.click('button:has-text("Create")')
    ]);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}6_SeeCollectorCreated.png`, fullPage: true });

    console.log('OK Collector created')

    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: test for collector-detail')


    //Desplegar detalle collector
    await page.click('img[alt="Portada collector: Collector Name"]');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}7_showDatailCollectorCreated.png`, fullPage: true });

    //Vereficar renderizado collector
    // Click has-text("Collector Name")
    await page.click('p:has-text("Collector Name")');
    // Click text=collector@test.com
    await page.click('text=collector@test.com');

    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}8_selectTextCollector.png`});

    console.log('OK Scenario: Collector show deatil')


    //Finalizar la prueba
    await context.close();
    await browser.close();
  }
  return;
})();//Llamado propio de la función
