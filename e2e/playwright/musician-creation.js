//Importar Playwright
const playwright = require('playwright');


const url = "http://localhost:4200/main"
const nameScreenPath= "./pw_screenshots"

//Configuracion de test
const titleTest = "musician-creation"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`

console.log('e2e test musician creation');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: test for musician-creation')

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

    await page.pause()

    //Desplegar la lista de musicians
    await page.click('id=goMusicians')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}3_go_musicians.png`, fullPage: true })

    await page.pause()

    //Desplegar el detalle de musician
    await page.click('id=addMusician')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}4_form_creation.png`, fullPage: true })

    await page.pause()

    //Desplegar el detalle de musician
    await page.click('id=mat-input-0')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}5_click_name.png`, fullPage: true })

    await page.pause()

    //Desplegar el detalle de musician
    await page.fill('id=mat-input-0', "Dana Sofia")
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}6_fill_name.png`, fullPage: true })

    await page.pause()

    //Desplegar el detalle de musician
    await page.click('id=mat-input-2')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}7_click_descrition.png`, fullPage: true })

    await page.pause()

        //Desplegar el detalle de musician
    await page.fill('id=mat-input-2', "This is the description of Dana Sofia")
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}8_fill_description.png`, fullPage: true })

    await page.pause()

    //Desplegar el detalle de musician
    await page.click('id=birthDate')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}9_click_birthDate.png`, fullPage: true })

    await page.pause()

    //Desplegar el detalle de musician
    await page.fill("[type=date]", "2014-04-11")
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}10_insert_birthDate.png`, fullPage: true })

    await page.pause()

      //Desplegar el detalle de musician
      await page.click('id=submit')
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({ path: `${pathScreenshotsTest}11_creation_musician.png`, fullPage: true })




    //Finalizar la prueba
    console.log('OK Scenario: Musician creation')
    await new Promise(r => setTimeout(r, 1000));
    await browser.close();
  }
  return;
})();//Llamado propio de la función
