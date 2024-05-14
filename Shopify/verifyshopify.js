const {
    By,
    until,
} = require("selenium-webdriver");
let {
    shopifytoken,
    shopifystorename
} = require("../credentials.json");
let {
    isTimeout,
    shortSleepDuration,
    longSleepDuration
} = require("../masterdata.json")
const assert = require('assert');
const {
    actionWithRetry,
    log
} = require("../main/loadfile");
const {
    driver
} = require("../main/index")
//verify the shopify
describe("verify the shopify", async function () {
    //click on shopify
    it("click on shopify", async function () {
        log('click on shopify')
        await driver.sleep(shortSleepDuration);
        const clickOnShopify = By.xpath("//div[text()='Shopify']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnShopify, 4, 1000);
    })
    //add the email and password of the shopify
    it("add the email and password of the shopify", async function () {
        log('add the email and password of the shopify')
        //Shopify Store Name
        const shopifystorname = By.xpath("(//input[@class='input'])[1]");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(shopifystorename)
        }, shopifystorname, 4, 1000);
        //Access Token
        const shopifystortoken = By.xpath("(//input[@class='input'])[2]");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(shopifytoken)
        }, shopifystortoken, 4, 1000);
    })
    //click on auto generated board
    it("click on auto generated board", async function () {
        log('click on auto generated board')
        await driver.sleep(longSleepDuration);
        let clickAutomGenerated = By.xpath("//button[text()=' Auto-Generate Board']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickAutomGenerated, 4, 2000);
    })
    //verify the board is visible
    it("check board is able to load", async function () {
        log(':step-check board is able to load')
        await driver.sleep(longSleepDuration);
        let close = By.xpath("//button[@class='ml-auto']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, close, 10, 20000);
        const waitforboardname = By.xpath("//span[@id='board-name-input']");
        await actionWithRetry(driver, async function (element) {}, waitforboardname, 4, 2000);
        let actual_boardname = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//h1[@class='font-medium text-5xl w-full block break-words text-center text-white']"))), isTimeout).getText()
        let expected_boardname = "Shopify Sales Report"
        assert.equal(expected_boardname, actual_boardname)
    })
    //verify the # order chart should be shown on dashboard
    it("verify the # order chart should be shown on dashboard", async function () {
        log('verify the # order chart should be shown on dashboard')
        await driver.sleep(shortSleepDuration);
        log('verify the # order chart should be shown on dashboard')
        const waitfororders = By.xpath("(//div[@class='p-0 ml-auto'])[1]");
        await actionWithRetry(driver, async function (element) {}, waitfororders, 4, 2000);
        let actual_oforder = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//div[@class='p-0 ml-auto'])[1]"))), isTimeout).getText()
        let expected_oforder = "# of Orders"
        assert.equal(expected_oforder, actual_oforder)
    })
    //verify Avg Order Value chart should be shown on dashboard
    it("verify Avg Order Value chart should be shown on dashboard", async function () {
        log('verify Avg Order Value chart should be shown on dashboard')
        let actual_oforder = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//div[@class='p-0 ml-auto'])[4]"))), isTimeout).getText()
        let expected_oforder = "Avg Order Value"
        assert.equal(expected_oforder, actual_oforder)
    })
    //verify verify total sale Value chart should be shown on dashboard
    it("verify verify total sale Value chart should be shown on dashboard", async function () {
        log('verify verify total sale Value chart should be shown on dashboard')
        let actual_oforder = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//div[@class='p-0 ml-auto'])[5]"))), isTimeout).getText()
        let expected_oforder = "Total Sales"
        assert.equal(expected_oforder, actual_oforder)
    })
    //verify discount from Total Sales & Discounts by Month chart should be shown on dashboard
    it("verify discount from Total Sales & Discounts by Month chart should be shown on dashboard", async function () {
        log('verify discount from Total Sales & Discounts by Month chart should be shown on dashboard')
        let actual_oforder = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//div[@class='p-0 ml-auto'])[7]"))), isTimeout).getText()
        let expected_oforder = "Total Sales & Discounts by Month"
        assert.equal(expected_oforder, actual_oforder)
    })
    //verify the number format on the dashboard
    it("verify the number format on the dashboard", async function () {
        log('verify the number format on the dashboard')
        //verify the Avg Order Value
        const element1 = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//span[@class='text-3xl break-all'])[3]"))), isTimeout);
        const raw_text1 = await element1.getText();
        const actual_number1 = parseFloat(raw_text1.replace(/[^\d.]/g, ''));
        console.log("actual_number1", actual_number1);
        //verify Total Discounts
        const element2 = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//td[@class='py-2.5 text-center text-body-2 bg-silver-30'])[1]"))), isTimeout);
        const raw_text2 = await element2.getText();
        const actual_number2 = parseFloat(raw_text2.replace(/[^\d.]/g, ''));
        console.log("actual_number2", actual_number2);
        //verify Best & Worst Selling Products by Total Sales
        const element3 = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//span[@class='text-3xl break-all'])[6]"))), isTimeout);
        const raw_text3 = await element3.getText();
        const actual_number3 = parseFloat(raw_text3.replace(/[^\d.]/g, ''));
        console.log("actual_number3", actual_number3);
        // Check if the parsed numbers are valid
        if (!isNaN(actual_number1)) {
            const decimalPlaces1 = (actual_number1.toString().split('.')[1] || []).length;
            assert(decimalPlaces1 <= 3, `Number ${actual_number1} has more than 2 decimal places`);
        } else {
            assert.fail(`Failed to parse number: ${raw_text1}`);
        }
        if (!isNaN(actual_number2)) {
            const decimalPlaces2 = (actual_number2.toString().split('.')[1] || []).length;
            assert(decimalPlaces2 <= 3, `Number ${actual_number2} has more than 2 decimal places`);
        } else {
            assert.fail(`Failed to parse number: ${raw_text3}`);
        }
        if (!isNaN(actual_number3)) {
            const decimalPlaces3 = (actual_number3.toString().split('.')[1] || []).length;
            assert(decimalPlaces3 <= 3, `Number ${actual_number3} has more than 2 decimal places`);
        } else {
            assert.fail(`Failed to parse number: ${raw_text3}`);
        }
    });
    //check board is visible on the workspace
    it("Check board is visible on the workspace", async function () {
        log(':starting check board is visible on the workspace')
        //click on polymer logo
        let clickonPolymerLogo = By.xpath("//div[@id='polymer-nav-logo']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonPolymerLogo);
        await driver.sleep(shortSleepDuration);
        //verify the board name on the workspace 
        let waitforboard = By.xpath("//span[text()='Shopify Sales Report']");
        await actionWithRetry(driver, async function (element) {}, waitforboard);
        let actual_text = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//span[text()='Shopify Sales Report']"))), isTimeout).getText();
        let expected_text = "Shopify Sales Report"
        assert.equal(expected_text, actual_text)
    })
})