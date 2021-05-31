//Importar Playwright
const playwright = require('playwright');
const faker = require('faker');


const url = "http://localhost:4200/main"
const nameScreenPath= "e2e/pw_screenshots"

//Configuracion de test
const titleTest = "band-add-prize"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`

//Const variables
const almbumTitle= "Album Add Track"
const nameMusician= `${faker.name.firstName()} ${faker.name.lastName()}`
const date='2011-03-12'
const datePrize='1991-07-15'
const description=  `Description of ${nameMusician}`;
const namePrize=`Prize ${faker.name.lastName()}`
const descriptionPrize=faker.lorem.paragraph();
const organization=faker.company.companyName();
const nameBand=`The Band ${faker.name.lastName()}`


console.log('e2e test musician add-prize');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: test for Band-creation')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch(
      // {headless:false}
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

    // await page.pause()

    //Desplegar la lista de musicians
    await page.click('id=goBands')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}3_go_bands.png`, fullPage: true })

    // await page.pause()

    //Add band
    await page.click('id=addBand')

    // await page.pause()

    await page.fill('id=name', nameBand)
    // await page.pause()
    await page.fill('id=description', description)

    await page.pause()
    await page.click('id=creationDate')
    await page.fill("[type=date]",date)
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}4_fillDataBand.png`, fullPage: true })

    await page.click('id=submit')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}5_creation_band.png`, fullPage: true })

    console.log('OK Scenario: Band Creation')

    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: Create Prize')

    //Desplegar la lista de PRIZES
    await page.click('id=goPrizes')
    await page.screenshot({ path: `${pathScreenshotsTest}6_award_list.png`})

    //Desplegar la lista de PRIZES
    await page.click('id=addPrize')
    await page.screenshot({ path: `${pathScreenshotsTest}7_award_creation_form.png`})
    await page.fill('id=name', namePrize)
    await page.fill('id=award_description', descriptionPrize);
    await page.fill('id=organization', organization);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}8_award_filled__form.png`})
    await page.click('id=submit')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}9_award_created.png`, fullPage: true})
    console.log('OK Scenario: Create Prize')

    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: Add prize to Band')
    //go to musician
    await page.pause()
    await page.click('id=goBands')

    //Select Musician
    await page.pause()

    await page.click(`id=card${nameBand}`);
    await page.screenshot({ path: `${pathScreenshotsTest}10_detailBand.png`, fullPage: true})
    //Go add prize
    await page.click('id=addPrizeToBand');

    //Select prize
    await page.click('text=Prize * Bands * Release Date * >> span');
    await page.click(`text=${namePrize}`);

    //Select Band
    await page.click('div[role="main"] >> :nth-match(div:has-text("Bands *"), 5)');
    await page.click(`text=${nameBand}`);

    //fill date prize
    await page.fill('[placeholder="Release Date"]', datePrize);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}11_fillAwardToBand.png`, fullPage: true})

    // Click button:has-text("Create")
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:4200/dashboard/bands' }*/),
      page.click('button:has-text("Create")')
    ]);

    //Check render prize
    // Click img[alt="Portada musician: Carlos Fuentes"]
    await page.pause()
    await page.click(`id=card${nameBand}`);

    await new Promise(r => setTimeout(r, 1000));
    await page.pause()

    await page.click('text=Prizes date');
    await page.focus('text=Prizes date');
    await page.screenshot({ path: `${pathScreenshotsTest}12_showDatailBandPrize.png`, fullPage: true });
    console.log('OK Scenario: Band-addPrize');

    //Finalizar la prueba
    await context.close();
    await browser.close();
  }
  return;
})();
