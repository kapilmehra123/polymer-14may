const {
    By,
    until,
    Key
} = require("selenium-webdriver");
const assert = require('assert');
const {
    actionWithRetry,
    log
} = require("../main/loadfile");
let {
    isTimeout,
    shortSleepDuration,
    longSleepDuration
} = require("../masterdata.json")
const {
    driver
} = require("../main/index")
const {
    fileName,
    googlemail,
    googlepass
} = require("../credentials.json")
//verify the google drive connectors
describe("verify the google drive connectors", async function () {
    //click on google drive
    it("Click on google drive", async function () {
        await driver.sleep(shortSleepDuration);
        //click on all connectors
        let clickonAllConnectors = By.xpath("//div[text()='All connectors']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonAllConnectors, 4, 2000);
        //click on google drive
        const clickOnFacebookAds = By.xpath("//span[text()='Google Drive']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnFacebookAds, 4, 1000);
        await driver.sleep(longSleepDuration);
        const googleemailElementLocator = By.xpath("//input[@type='email']");
        const emailInputElement = await driver.findElements(googleemailElementLocator);
        if (emailInputElement.length > 0) {
            // Email input element found, proceed with the actions
            await actionWithRetry(driver, async function (element) {
                await element.sendKeys(googlemail, Key.RETURN);
            }, googleemailElementLocator, 4, 1000);
            await driver.sleep(shortSleepDuration)
            const waitgooglepassElementLocator = By.xpath("//input[@type='password']");
            await actionWithRetry(driver, async function (element) {}, waitgooglepassElementLocator, 4, 10000);
            // Send the google password
            const googlepassElementLocator = By.xpath("//input[@type='password']");
            await actionWithRetry(driver, async function (element) {
                await element.sendKeys(googlepass, Key.RETURN);
            }, googlepassElementLocator, 4, 1000);
            //click on continue
            const googlecontinueElementLocator = By.xpath("//span[text()='Continue']");
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, googlecontinueElementLocator, 4, 10000);
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, googlecontinueElementLocator, 4, 10000);
        } else {
            //click on google account
            const clickOnGoogleAccount = By.xpath("(//div[@class='VV3oRb YZVTmd SmR8'])[1]");
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, clickOnGoogleAccount, 4, 1000);
            //click on continue
            const clickOnContinue = By.xpath("//span[text()='Continue']");
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, clickOnContinue, 4, 1000);
            await driver.sleep(shortSleepDuration);
            //click on continue
            const clickOnContinuea = By.xpath("//span[text()='Continue']");
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, clickOnContinuea, 4, 1000);
        }
    })
    //select the google drive
    it("select the google drive", async function () {
        log('select the google drive')
        await driver.sleep(longSleepDuration)
        await driver.sleep(longSleepDuration)
        // Find the iframe element
        const iframe = await driver.findElement(By.xpath("(//iframe)[4]"));
        // Switch Selenium's focus to the iframe
        await driver.switchTo().frame(iframe);
        const searchSheet = By.xpath("//input[@aria-label='Search terms']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys("Account_performance", Key.ENTER)
        }, searchSheet, 4, 30000);
        await driver.sleep(shortSleepDuration)
        //click on sheets
        const clcikOnSheets = By.xpath("(//div[@class='drive-resize-viewport-content '])[2]//div[@class='drive-grid-tile-container drive-drop-target']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clcikOnSheets, 4, 1000);
        //click on select
        const clickOnSelect = By.xpath("(//div[text()='Select'])[2]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnSelect, 4, 1000);
    })
    //check board is able to load
    it("check board is able to load", async function () {
        log('check board is able to load')
        await driver.sleep(longSleepDuration);
        await driver.switchTo().defaultContent();
        const waitforboardname = By.xpath("//span[@id='board-name-input']");
        await actionWithRetry(driver, async function (element) {}, waitforboardname, 8, 30000);
        //click on the close icon
        let close = By.xpath("//button[@class='ml-auto']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, close, 4, 10000);
    })
    //check board is visible on the workspace
    it("check board is visible on the workspace", async function () {
        //click on polymer logo
        let clickonPolymerLogo = By.xpath("//div[@id='polymer-nav-logo']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonPolymerLogo);
        //verify the board name on the workspace 
        let waitforboard = By.xpath("(//span[@class='source-name'])[4]");
        await actionWithRetry(driver, async function (element) {}, waitforboard);
        let actual_text = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//span[@class='source-name'])[4]"))), isTimeout).getText();
        let expected_text = fileName
        assert.equal(expected_text, actual_text)
    })
})