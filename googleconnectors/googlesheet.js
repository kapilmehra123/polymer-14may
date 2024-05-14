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
const {
    driver
} = require("../main/index")
let {
    isTimeout,
    shortSleepDuration,
    longSleepDuration
} = require("../masterdata.json")
const {
    googlesheetfilename,
    googlemail,
    googlepass
} = require("../credentials.json")
//verify the google sheet connectors
describe("verify the google sheet connectors", async function () {
    //click on google sheet
    it("click on google sheet", async function () {
        log('click on google sheet')
        await driver.sleep(shortSleepDuration);
        //click on google sheet
        const clickOnGoogleSheet = By.xpath("//div[text()='Google Sheets']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnGoogleSheet, 4, 1000);
        await driver.sleep(longSleepDuration);
        const googleemailElementLocator = By.xpath("//input[@type='email']");
        const emailInputElement = await driver.findElements(googleemailElementLocator);
        if (emailInputElement.length > 0) {
            // Email input element found, proceed with the actions
            await actionWithRetry(driver, async function (element) {
                await element.sendKeys(googlemail, Key.RETURN);
            }, googleemailElementLocator, 4, 1000);
            await driver.sleep(longSleepDuration)
            const waitgooglepassElementLocator = By.xpath("//input[@type='password']");
            await actionWithRetry(driver, async function (element) {}, waitgooglepassElementLocator, 4, 10000);
            // Send the google password
            const googlepassElementLocator = By.xpath("//input[@type='password']");
            await actionWithRetry(driver, async function (element) {
                await element.sendKeys(googlepass, Key.RETURN);
            }, googlepassElementLocator, 4, 1000);
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
            }, clickOnGoogleAccount, 4, 10000);
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
        await driver.sleep(longSleepDuration)
    })
    //select the google sheet
    it("select the google sheet", async function () {
        // Find the iframe element
        await driver.sleep(longSleepDuration)
        const waitiframe = By.xpath("(//iframe)[4]");
        await actionWithRetry(driver, async function (element) {}, waitiframe, 4, 10000)
        const iframe = await driver.findElement(By.xpath("(//iframe)[4]"));
        // Switch Selenium's focus to the iframe
        await driver.switchTo().frame(iframe);
        const searchSheet = By.xpath("//input[@aria-label='Search terms']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(googlesheetfilename, Key.ENTER)
        }, searchSheet, 4, 30000);
        await driver.sleep(longSleepDuration)
        await driver.sleep(longSleepDuration)
        const googlesheetElementLocator = By.xpath("(//div[@class='drive-grid'])[1]//div[@class='drive-grid-tile-container drive-drop-target']");
        const googlesheetInputElement = await driver.findElements(googlesheetElementLocator);
        if (googlesheetInputElement.length > 0) {
            const element1 = await driver.findElement(By.xpath("(//div[@class='drive-grid'])[1]//div[@class='drive-grid-tile-container drive-drop-target']"));
            element1.click()
            console.log("enter the if condition")
        } else {
            const element2 = await driver.findElement(By.xpath("(//div[@class='drive-grid'])[2]//div[@class='drive-grid-tile-container drive-drop-target']"));
            element2.click()
            console.log("enter else block")
        }
        // const clcikOnSheets = By.xpath("(//div[@class='drive-grid'])[2]//div[@class='drive-grid-tile-container drive-drop-target']");
        // await actionWithRetry(driver, async function (element) {
        //     await element.click();
        // }, clcikOnSheets, 4, 1000);
        //click on select
        const clickOnSelect = By.xpath("(//div[text()='Select'])[2]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnSelect, 4, 1000);
    })
    //Check board is able to load
    it("Check board is able to load", async function () {
        log('Check board is able to load')
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
    //Count the number of charts on the board
    it("Count the number of charts on the board", async function () {
        await driver.sleep(shortSleepDuration);
        // Count the number of charts
        const charts = await driver.findElements(By.xpath("//div[@class='p-0 ml-auto']"));
        console.log("Number of charts:", charts.length);
        // Compare the actual number of charts with the expected number
        const expectedNumberOfCharts = 1;
        if (charts.length >= expectedNumberOfCharts) {
            console.log("The board has the expected number of charts.");
        } else {
            console.error("The board does not have the expected number of charts.");
            assert.equal(expectedNumberOfCharts, charts.length)
        }
    })
    //check board is visible on the workspace
    it("Check board is visible on the workspace", async function () {
        //click on polymer logo
        let clickonPolymerLogo = By.xpath("//div[@id='polymer-nav-logo']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonPolymerLogo);
        //verify the board name on the workspace 
        let waitforboard = By.xpath("(//span[@class='source-name'])[4]");
        await actionWithRetry(driver, async function (element) {}, waitforboard);
        let actual_text = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//span[@class='source-name'])[4]"))), isTimeout).getText();
        let expected_text = googlesheetfilename
        assert.equal(expected_text, actual_text)
    })
})