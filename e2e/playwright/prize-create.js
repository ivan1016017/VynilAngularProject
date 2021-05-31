
//Importar Playwright
const playwright = require('playwright');
const faker = require('faker');


const url = "http://localhost:4200/main"
const nameScreenPath= "./pw_screenshots"

//Configuracion de test
const titleTest = "prize-create"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`

console.log('e2e test for creation of a new prize');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: test for the creation of a new prize')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    await page.goto(url);
    await page.screenshot({ path: `${pathScreenshotsTest}1_main_page.png`})

    await page.click('id=enter')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}2_entry_display.png`})

    //Desplegar la lista de premios
    await page.click('id=goPrizes')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}3_award_list.png`})

    //Agregar los detalles del premio
    await page.click('id=addPrize')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}4_award_creation_form.png`})
    await page.fill('id=name', faker.lorem.sentence())
    await page.fill('id=award_description', faker.lorem.paragraph());
    await page.fill('id=organization', faker.company.companyName());
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}5_award_filled__form.png`})
    await page.click('id=submit')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}6_award_created.png`})

    //Finalizar la prueba
    console.log('OK Scenario: Prize Created')
    await new Promise(r => setTimeout(r, 1000));
    await browser.close();
  }
  return;
})();//Llamado propio de la función
