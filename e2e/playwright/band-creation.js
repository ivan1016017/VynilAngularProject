//Importar Playwright
const playwright = require('playwright');


const url = "http://localhost:4200/main"
const nameScreenPath= "./pw_screenshots"

//Configuracion de test
const titleTest = "band-creation"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`

console.log('e2e test band creation');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: test for band-creation')

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
    await page.screenshot({ path: `${pathScreenshotsTest}2_entry_display.png`, fullPage: true })


    //Desplegar la lista de albumes
    await page.pause()

    await page.click('id=goBands')
    await page.screenshot({ path: `${pathScreenshotsTest}3_go_bands.png`, fullPage: true })

    //Desplegar el detalle de album
    await page.pause()

    await page.click('id=addBand')
    await page.screenshot({ path: `${pathScreenshotsTest}4_form_creation.png`, fullPage: true })

    //Desplegar el detalle de album
    await page.pause()

    await page.click('id=name')
    await page.screenshot({ path: `${pathScreenshotsTest}5_click_name.png`, fullPage: true })

    //Desplegar el detalle de album
    await page.pause()

    await page.fill('id=name', "Dana Sofia")
    await page.screenshot({ path: `${pathScreenshotsTest}6_fill_name.png`, fullPage: true })

    //Desplegar el detalle de album
    await page.pause()

    await page.click('id=description')
    await page.screenshot({ path: `${pathScreenshotsTest}7_click_descrition.png`, fullPage: true })

        //Desplegar el detalle de album
    await page.pause()

    await page.fill('id=description', "This is the description of Dana Sofia")
    await page.screenshot({ path: `${pathScreenshotsTest}8_fill_description.png`, fullPage: true })

    //Desplegar el detalle de album
    await page.pause()

    await page.click('id=creationDate')
    await page.screenshot({ path: `${pathScreenshotsTest}9_click_creationDate.png`, fullPage: true })

    //Desplegar el detalle de album
    await page.pause()

    await page.fill("[type=date]", "2014-04-11")
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}10_insert_creationDate.png`, fullPage: true })

      //Desplegar el detalle de album
    await page.pause()

      await page.click('id=submit')
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({ path: `${pathScreenshotsTest}11_creation_band.png`, fullPage: true })


    //Finalizar la prueba
    await page.pause()

    console.log('OK Scenario: Band Creation')
    await new Promise(r => setTimeout(r, 1000));
    await browser.close();
  }
  return;
})();//Llamado propio de la función
