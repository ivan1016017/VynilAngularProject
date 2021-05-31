//Importar Playwright
const playwright = require('playwright');


const url = "http://localhost:4200/main"
const nameScreenPath= "e2e/pw_screenshots"

//Configuracion de test
const titleTest = "Album-AddTrack"
const pathScreenshotsTest =`./${nameScreenPath}/${titleTest}/`

//Const variables
const almbumTitle= "Album Add Track"
const date='2021-05-06'
const description=  'Description album test add track'
const trackName= `Track_${almbumTitle}`
const trackDuration= `5:45`

console.log('e2e Album creation');

//Función flecha asíncrona
(async () => {
  //Definir los navegadores en los que se quiere hacer la prueba
  for (const browserType of ['chromium']){//, 'firefox', 'webkit']) {
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: test for album-creation')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch(
      // {headless: false}
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

    await page.pause();
    //Crear nuevo album
    await page.click('id=addAlbum')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}3_go_CreateAlbum.png`, fullPage: true })

    //Llenar inputs album
    await page.fill('id=name', almbumTitle);
    //Fill Release Date
    await page.fill('[placeholder="Release Date"]', date);

    await page.pause()

    await page.click('div[role="main"] >> :nth-match(div:has-text("Description *"), 5)')
    //Fill description
    await page.fill('[placeholder="Album Description"]', description);

    await page.pause()

    //Fill Genero
    await page.click('mat-select[role="combobox"] span');
    // Click text=Salsa
    await page.click('text=Salsa');
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}4_SelectSalsa.png`, fullPage: true });

    await page.pause()

    await page.click('div[role="main"] >> :nth-match(div:has-text("Record Label *"), 5)');
    await page.click('text=Discos Fuentes');
    await page.screenshot({ path: `${pathScreenshotsTest}4_SelectRecord.png`, fullPage: true });

    // Click create Album boton disponible
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:4200/dashboard/albums' }*/),
      page.click('button:has-text("Create")')
    ]);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}5_AlbumCreated.png`, fullPage: true });

    console.log('OK Scenario: Album Creation')

    console.log(browserType+'-------------------------------------------')
    console.log('Scenario: test for album-addTrack')

    await page.pause()

    //Desplegar detalle album
    await page.click(`img[alt="Portada Album: ${almbumTitle}"]`);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}6_showDatailAlbumCreated.png`, fullPage: true });

    //vereficar renderizado album
    // Click has-text("Album name Test")
    await page.click(`p:has-text("${almbumTitle}")`);
    await page.focus(`p:has-text("${almbumTitle}")`);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}7_selectTextAlbum.png`});

    await page.pause()
    //select add track
    await page.click('id=addTrack')
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: `${pathScreenshotsTest}8_go_addTrack_album.png`, fullPage: true })

    // await page.pause()
    // await page.click('text=Albums * Track\'s name * Track\'s duration * >> span');
    // //select album
    // // Click text=testTrack
    // await page.click(`text=${almbumTitle}`);

    await page.pause()

    // Fill input[role="textbox"]
    await page.click('div[role="main"] >> :nth-match(div:has-text("Albums *"), 5)')
    await page.click(`text=${almbumTitle}`)

    await page.pause()
    // Fill [placeholder="Track's name"]
    await page.fill('id=description_track_name', `${trackName}`);

    await page.pause()
     // Fill [placeholder="Track's duration"]
    await page.fill('id=description_form__field', `${trackDuration}`);

    await page.pause()
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: `${pathScreenshotsTest}9_fillDataAddTrack.png`, fullPage: true });


    // Click button:has-text("Create")
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:4200/dashboard/albums' }*/),
      page.click('button:has-text("Create")')
    ]);

     //Desplegar detalle album
     await page.pause()
     await page.click(`img[alt="Portada Album: ${almbumTitle}"]`);
     await new Promise(r => setTimeout(r, 1000));
     await page.screenshot({ path: `${pathScreenshotsTest}10_showDatailAlbumAddTrack.png`, fullPage: true });
     console.log('OK Scenario: Album-addTrack')

    //Finalizar la prueba
    await context.close();
    await browser.close();
  }
  return;
})();//Llamado propio de la función
