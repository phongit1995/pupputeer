const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
     headless: false ,
     args: ['--proxy-server=socks4://166.62.91.254:28227']
  });
  const page = await browser.newPage();
  await page.goto('https://whoer.net/',{waitUntil: 'load', timeout: 0});
  await page.setViewport({width: 1500, height: 2000});
  await page.screenshot({path: 'adress.png'});
  await page.goto('https://www.adidas.com/us/ozweego/EH0252.html',{waitUntil: 'load', timeout: 0});
  let selector = "#app > div > div > div.empty_pdp_space_reserver___IFQzq > div > div.hero___2YuNz > div.container.hero_container___nM-YT > div.order_information___z33d1.col-s-12.col-l-8.col-hg-6.col-xl-7.no-gutters > div > div > form > div.row.no-gutters.size_quantity_row___1pgH7 > div.col-s-9.col-product-size___3NjQd > div > div > button";
  let buttoncontryside = "#modal-root > div > div > button";
  let buttonaddpage = "##app > div > div > div.empty_pdp_space_reserver___IFQzq > div > div.hero___2YuNz > div.container.hero_container___nM-YT > div.order_information___z33d1.col-s-12.col-l-8.col-hg-6.col-xl-7.no-gutters > div > div > form > div.row.no-gutters.add_to_bag_container___16ts0 > button";
  
  try{
    await page.evaluate(
      (buttoncontryside)=>{
        document.querySelector(buttoncontryside).click();
      },buttoncontryside
    )
  }
  catch(error){

  }
  
  await page.evaluate(
    (selector)=>{
      document.querySelector(selector).click();
    },selector
  )
  // select size 
  await page.evaluate(
    ()=>{
      let size2 = document.querySelectorAll(".gl-menu >.gl-menu__item");
      console.log(size2.length);
      let state = false ;
      console.log(size2);
      size2.forEach(item=>{
        let title=item.getAttribute('title');
          if(title.includes(8)&& !state){
              console.log(item);
              
              console.log(item.firstElementChild);
              item.firstElementChild.click()
              state=true ;
          }
      })
      if(!state){
        throw new Error('Không có size chọn');
      }
    }
  )
  await page.screenshot({path: 'choosesize.png'});
  // click to page
  await page.evaluate(
    ()=>{
       let buttontopge = document.querySelector("#app > div > div > div.empty_pdp_space_reserver___IFQzq > div > div.hero___2YuNz > div.container.hero_container___nM-YT > div.order_information___z33d1.col-s-12.col-l-8.col-hg-6.col-xl-7.no-gutters > div > div > form > div.row.no-gutters.add_to_bag_container___16ts0 > button");
       buttontopge.click();
    }
  )
  await page.waitForSelector('#modal-root > div > div > div > div > div > div.row.no-gutters.gl-hidden-s-m.modal-cart-info > div:nth-child(2) > div > button.gl-cta.gl-cta--secondary.gl-cta--full-width');
  await page.screenshot({path: 'topage.png'});
  // click to check out
  await page.evaluate( ()=>{
    let buttoncheckout = "#modal-root > div > div > div > div > div > div.row.no-gutters.gl-hidden-s-m.modal-cart-info > div:nth-child(2) > div > button.gl-cta.gl-cta--secondary.gl-cta--full-width";
     let buttoncheckoutclick = document.querySelector(buttoncheckout);
     console.log("click to checkout :" +buttoncheckoutclick);
     buttoncheckoutclick.click();
  })
  await page.waitForSelector("#app > div > div.checkout_page___2Rq6-.delivery-page > div");
  await page.screenshot({path: 'delivery.png'});
  // add name to delivery
  await page.evaluate(()=>{
      let inputname = document.querySelector("#firstName");
            inputname.value = "Phong";
            inputname.focus() ;
  })
  await page.mouse.click(10,10);
  // Add to name
  await page.evaluate(()=>{
    let inputname = document.querySelector("#lastName");
    inputname.value = "nguyen";
    inputname.focus() ;
  })

  //  Add to adress
  await page.evaluate(()=>{
    let inputname = document.querySelector("#address1");
    inputname.value = "HN";
    inputname.focus() ;
  })
  await page.mouse.click(10,10);

  // Add to City
  await page.evaluate(()=>{
    document.querySelector("#app > div > div.checkout_page___2Rq6-.delivery-page > div > main > form > div > div:nth-child(1) > div > div:nth-child(6) > span > div > div > button").click();
    let inputname = document.querySelector("#app > div > div.checkout_page___2Rq6-.delivery-page > div > main > form > div > div:nth-child(1) > div > div:nth-child(6) > span > div > div > select");
    inputname.value = "Alaska";
    document.querySelector("#app > div > div.checkout_page___2Rq6-.delivery-page > div > main > form > div > div:nth-child(1) > div > div:nth-child(6) > span > div > div > div > ul > li:nth-child(2) > button").click();
    let value = document.querySelector(".gl-dropdown__select-label-text");
    value.textContent = "Alaska";
  })
  //  Page Choose CITY
  await page.select("#app > div > div.checkout_page___2Rq6-.delivery-page > div > main > form > div > div:nth-child(1) > div > div:nth-child(6) > span > div > div > select","Alaska");

  await page.mouse.click(10,10);

  // Add to City Town 
  await page.evaluate(()=>{
    let inputname = document.querySelector("#city");
    inputname.value = "Honolulu";
    inputname.focus() ;
  })
  await page.mouse.click(10,10);

  // Add to Zip code
  await page.evaluate(()=>{
    let inputname = document.querySelector("#zipcode");
    inputname.value = 99502;
    inputname.focus() ;
  })
  await page.mouse.click(10,10);

  // Add to Phone number
  await page.evaluate(()=>{
    let inputname = document.querySelector("#phoneNumber");
    inputname.value = "0356985214";
    inputname.focus() ;
  })
  await page.mouse.click(10,10);

  // add to email
  await page.evaluate(()=>{
    let inputname = document.querySelector("#emailAddress");
    inputname.value = "aduc@gmail.com";
    inputname.focus() ;
  })
  await page.mouse.click(10,10);

  await page.screenshot({path: 'input.png'});
  // ReView And Pay 
  await page.evaluate( ()=>{
    let buttoncheckout = "#app > div > div.checkout_page___2Rq6-.delivery-page > div > main > div.col-m-12.col-s-12.gl-vspace-bpall-medium > button";
     let buttoncheckoutclick = document.querySelector(buttoncheckout);
     console.log(buttoncheckoutclick);
     buttoncheckoutclick.click();
  })
  await page.screenshot({path: 'pay.png'});
    // await browser.close();
})();

// $("#app > div > div.checkout_page___2Rq6-.delivery-page > div > main > form > div > div:nth-child(1) > div > div:nth-child(6) > span > div > div > button").click()
// $("#app > div > div.checkout_page___2Rq6-.delivery-page > div > main > form > div > div:nth-child(1) > div > div:nth-child(6) > span > div > div > div > ul > li:nth-child(1)").click()
// $("#app > div > div.checkout_page___2Rq6-.delivery-page > div > main > form > div > div:nth-child(1) > div > div:nth-child(6) > span > div > div > select > option:nth-child(1)").click()