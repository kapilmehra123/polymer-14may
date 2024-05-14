const {
    By,
    until,
} = require("selenium-webdriver");
let {
    shopifytoken,
    shopifystorename,
    verifycardmonth,
    verifycarddetail
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
//verify the stripe details
describe("verify the stripe details", async function () {
    //click on shopify
    it("click on shopify", async function () {
        await driver.sleep(shortSleepDuration);
        const clickOnShopify = By.xpath("//div[text()='Shopify']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnShopify, 4, 1000);
    })
    //add the email and password of the shopify
    it("add the email and password of the shopify", async function () {
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
        await driver.sleep(longSleepDuration);
        let clickAutomGenerated = By.xpath("//button[text()=' Auto-Generate Board']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickAutomGenerated, 4, 2000);
        await driver.sleep(4000);
        let close = By.xpath("//button[@class='ml-auto']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, close, 10, 30000);
    })
    //click on the profile icon
    it("click on the profile icon", async function () {
        await driver.sleep(longSleepDuration);
        const waitforname = By.xpath("//div[@class='polymer-user-avatar']");
        await actionWithRetry(driver, async function (element) {}, waitforname, 6, 30000);
        let profileiconElement = By.xpath("//div[@class='polymer-user-avatar']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, profileiconElement);
    })
    //click on to see plan
    it("click on to see plan", async function () {
        await actionWithRetry(driver, async function (element) {}, By.xpath("//div[@class='current-plan']"), 3, 5000);
        let seeplanElement = By.xpath("//div[@class='current-plan']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, seeplanElement);
    })
    //verify the plan on the pricing page
    it("verify the plan on the pricing page", async function () {
        await actionWithRetry(driver, async function (element) {}, By.xpath("//span[text()='Current']"), 3, 5000);
        log(':step 7')
        await driver.sleep(shortSleepDuration);
        let actual_plan = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//span[text()='Current']"))), isTimeout).getText();
        let expected_plan = "Current"
        assert.equal(expected_plan, actual_plan)
    })
    //click on manage my subscription
    it("click on manage my subscription", async function () {
        let manageSubscriptionElement = By.xpath("//button[text()='Manage my Subscription']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, manageSubscriptionElement);
    })
    //verify the cancel my subscription button should be shown on the billing page
    it("verify the cancel my subscription button should be shown on the billing page", async function () {
        await actionWithRetry(driver, async function (element) {}, By.xpath("//button[text()='Cancel my Subscription']"), 3, 5000);
        log(':step 8')
        await driver.sleep(shortSleepDuration);
        let actual_cancelmysubscription = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//button[text()='Cancel my Subscription']"))), isTimeout).getText();
        let expected_cancelmysubscription = "Cancel my Subscription"
        assert.equal(expected_cancelmysubscription, actual_cancelmysubscription)
    })
    //verify the plan on the billing page
    it("verify the plan on the billing page", async function () {
        await actionWithRetry(driver, async function (element) {}, By.xpath("//span[text()='Starter']"), 3, 5000);
        log(':step 9')
        await driver.sleep(shortSleepDuration);
        let actual_plan = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//span[text()='Starter']"))), isTimeout).getText();
        let expected_plan = "Starter"
        assert.equal(expected_plan, actual_plan)
    })
    //verify the card details
    it("verify the card details", async function () {
        //verify the card valid detail
        await actionWithRetry(driver, async function (element) {}, By.xpath("//div[@class='valid-thru']"), 3, 5000);
        log(':verify the card details')
        let actual_carddetail = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@class='valid-thru']"))), isTimeout).getText();
        console.log("actual_carddetail", actual_carddetail)
        let expected_carddetail = verifycardmonth
        assert.equal(expected_carddetail, actual_carddetail)
        //verify the card number
        let actual_cardnumber = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//div[@class='details'])[3]"))), isTimeout).getText();
        console.log("actual_cardnumber", actual_cardnumber)
        let expected_cardnumber = verifycarddetail
        assert.equal(expected_cardnumber, actual_cardnumber)
    })
    //go to the main page
    it("go to the main page", async function () {
        log('go to the main page')
        let settingElement = By.xpath("//span[text()=' Settings ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, settingElement);
        let closeicon = By.xpath("//a[@class='close-button']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, closeicon, 3, 10000);
    })
})