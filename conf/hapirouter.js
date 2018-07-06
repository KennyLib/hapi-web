module.exports = () => {
    return [{
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.file('index.html');
        }
    },
    {
        method: 'GET',
        path: '/api',
        handler: (request, h) => {
            return 'api'
        }
    },
    {
        method: 'GET',
        path: '/api/crawler',
        handler: async (request, h) => {
            const puppeteer = require('puppeteer');

            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('http://lvyou.jiangtai.com');
            await page.waitFor(1000);
            await page.click('#nav_product > a');
            await page.waitFor(1000);

            let resArr = await page.evaluate(() => {
                let arr = [];
                let dom = document.querySelectorAll('#product-content > div > div.pr-main > ul > li')
                for (let index = 0; index < dom.length; index++) {
                    const element = dom[index];
                    let productname = element.querySelector('div > h2 > a').innerText
                    let productnameNo = element.querySelector('div > h2 > i').innerText
                    arr.push({
                        ProductName: productname,
                        ProductNameNo: productnameNo
                    })
                }
                return arr
            })
            
            await browser.close();
            return resArr;
        }
    }]
}