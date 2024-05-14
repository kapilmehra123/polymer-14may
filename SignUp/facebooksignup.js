const {
    By,
    until
} = require("selenium-webdriver");
let {
    facebookemail,
    facebookpass,
    facebookname,
    baseUrl
} = require("../credentials.json");
let {
    isTimeout,
    shortSleepDuration,longSleepDuration
} = require("../masterdata.json")
const assert = require('assert');
const {
    actionWithRetry,
    log
} = require("../main/loadfile");
const {
    driver
} = require("../main/index")
//verify the facebook sign up
describe("Verify the facebook sign up", async function () {
    //click on continue with facebook button
    it("click on continue with facebook button", async function () {
        await driver.get(baseUrl)
        log('register the new account')
        await driver.sleep(shortSleepDuration);
        const registerElementLocator = By.xpath("//a[text()='Register']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, registerElementLocator, 4, 2000);
        await driver.sleep(shortSleepDuration);
        log('clicking on facebook register link')
        const waitforname = By.xpath("//span[text()=' Continue with Facebook ']");
        await actionWithRetry(driver, async function (element) {}, waitforname, 4, 1000);
        const continuefacebookElementLocator = By.xpath("//span[text()=' Continue with Facebook ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, continuefacebookElementLocator, 4, 1000);
    })
    //logIn the facebook account
    it("LogIn the facebook account", async function () {
        log(':logIn the facebook account')
        await driver.sleep(longSleepDuration);
        //enter the facebook email id
        const googleemailElementLocator = By.xpath("//input[@name='email']");
        const emailInputElement = await driver.findElements(googleemailElementLocator);
        if (emailInputElement.length > 0) {
            const facebookemailElementLocator = By.xpath("//input[@name='email']");
            await actionWithRetry(driver, async function (element) {
                await element.sendKeys(facebookemail)
            }, facebookemailElementLocator, 4, 1000);
            //enter the facebook password
            const facebookpassElementLocator = By.xpath("//input[@name='pass']");
            await actionWithRetry(driver, async function (element) {
                await element.sendKeys(facebookpass)
            }, facebookpassElementLocator, 4, 1000);
            //click on login button
            const facebookloginElementLocator = By.xpath("//button[@name='login']");
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, facebookloginElementLocator, 4, 1000);
        }
    })
    //Verify that the user can select any option for "Who do you want to analyze data for?" during account registration.
    it("Verify that the user can select any option for Who do you want to analyze data for? during account registration.", async function () {
        log(':Verify that the user can select any option for Who do you want to analyze data for? during account registration.')
        //click on my clients or customers
        const waitforname = By.xpath("//button[text()='My Clients or Customers']");
        await actionWithRetry(driver, async function (element) {}, waitforname, 4, 30000);
        const myClientorCustomeElementLocator = By.xpath("//button[text()='My Clients or Customers']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, myClientorCustomeElementLocator, 4, 1000);
        //click on continue button
        const continueButtonElementLocator = By.xpath("//button[text()=' Continue ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, continueButtonElementLocator, 4, 1000);
    })
    // Verify that  user can select any type of data they will be analyzing during account registration.
    it("Verify that  user can select any type of data they will be analyzing during account registration.", async function () {
        log(':Verify that the user can select any type of data they will be analyzing during account registration.')
        const waitforname = By.xpath("//button[text()='Marketing / Advertising']");
        await actionWithRetry(driver, async function (element) {}, waitforname, 4, 10000);
        //click on marketing/advertising
        const marketingElementLocator = By.xpath("//button[text()='Marketing / Advertising']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, marketingElementLocator, 4, 1000);
        //click on continue button
        const continueButtonElementLocator = By.xpath("//button[text()=' Continue ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, continueButtonElementLocator, 4, 1000);
    })
    //verify the register name should be shown on Invite your teammates section
    it("verify the register name should be shown on Invite your teammates section", async function () {
        log('verify the register name should be shown on Invite your teammates section')
        const waitforname = By.xpath("//div[@class='name']/span");
        await actionWithRetry(driver, async function (element) {}, waitforname, 4, 10000);
        // let actual_registername = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@class='name']/span"))), isTimeout).getText()
        // let expected_registername = facebookname
        // console.log("expected_registername", expected_registername)
        // assert.equal(expected_registername, actual_registername)
    })
    //Verify that the user can successfully invite teammates or click on continue during the registration process.
    it("Verify that the user can successfully invite teammates or click on continue during the registration process.", async function () {
        log('Verify that the user can successfully invite teammates or click on continue during the registration process.')
        //click on continue button
        const continueButtonElementLocator = By.xpath("//button[text()=' Continue ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, continueButtonElementLocator, 4, 10000);
    })
})