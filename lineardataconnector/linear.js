const {
    By,
    Builder,
    until,
    Actions,
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
    googlemail,
    googlepass
} = require("../credentials.json")
const {
    driver
} = require("../main/index")
//verify the linear connector
describe("verify the linear connector", async function () {
    //click on linear connector and sign in with google
    it("click on linear connector and sign in with google", async function () {
        log('click on linear connector and sign in with google')
        //click on all connectors
        let clickonAllConnectors = By.xpath("//div[text()='All connectors']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonAllConnectors, 4, 2000);
        //click on linear
        const clickOnLinear = By.xpath("//span[text()='Linear']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnLinear, 4, 10000);
        await driver.sleep(longSleepDuration);
        //click on to continue on google
        const continuewithgoogle = By.xpath("//button[text()='Continue with Google']");
        const emailInputElement1 = await driver.findElements(continuewithgoogle);
        if (emailInputElement1.length > 0) {
            const clickOnContinueGoogle = By.xpath("//button[text()='Continue with Google']");
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, clickOnContinueGoogle, 4, 10000);
            await driver.sleep(longSleepDuration);
            const googleemailElementLocator = By.xpath("//input[@type='email']");
            const emailInputElement = await driver.findElements(googleemailElementLocator);
            if (emailInputElement.length > 0) {
                await actionWithRetry(driver, async function (element) {
                    await element.sendKeys(googlemail, Key.RETURN);
                }, googleemailElementLocator, 4, 1000);
                await driver.sleep(longSleepDuration)
                const waitgooglepassElementLocator = By.xpath("//input[@type='password']");
                await actionWithRetry(driver, async function (element) {}, waitgooglepassElementLocator, 4, 10000);
                // Send the google password
                await driver.sleep(longSleepDuration)
                const googlepassElementLocator = By.xpath("//input[@type='password']");
                await actionWithRetry(driver, async function (element) {
                    await element.sendKeys(googlepass, Key.RETURN);
                }, googlepassElementLocator, 4, 1000);
                const googlecontinueElementLocator = By.xpath("//span[text()='Continue']");
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

            }
            await driver.sleep(longSleepDuration)
        }
    })
    //check board is able to load
    it("check board is able to load", async function () {
        log('check board is able to load')
        await driver.switchTo().defaultContent();
        const waitforboardname = By.xpath("//span[@id='board-name-input']");
        await actionWithRetry(driver, async function (element) {}, waitforboardname, 10, 30000);
        // let actual_boardname = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//span[@id='board-name-input']"))), isTimeout).getText()
        // console.log("actual_boardname", actual_boardname)
        // let expected_boardname = "Linear Dashboard"
        // assert.equal(expected_boardname, actual_boardname)
        const header = await driver.findElements(By.xpath("//span[@id='board-name-input']"));
        console.log("header:", header.length);
        // Compare the actual number of charts with the expected number
        const expectedNumberOfheader = 1;
        if (header.length >= expectedNumberOfheader) {
            console.log("The board has the expected header.");
        } else {
            console.error("The board does not have the expected header");
            assert.equal(expectedNumberOfheader, header.length)
        }
        //click on the close icon
        let close = By.xpath("//button[@class='ml-auto']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, close, 4, 10000);
    })
    //verify the selected sheet on the data section on dashboard
    it("Verify the selected linear account shwon on the data section on dashboard", async function () {
        //click on data section
        let clickonDataSection = By.xpath("//span[text()='Data']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonDataSection);
        await driver.sleep(longSleepDuration);
        //verify the first sheet
        let actual_firstsheet = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//div[@class='flex items-center text-sm leading-4 mb-1'])[1]"))), isTimeout).getText();
        console.log("actual_firstsheet", actual_firstsheet)
        let expected_firstsheet = "Linear: Test+Pradeep"
        assert.equal(expected_firstsheet, actual_firstsheet)
        await driver.sleep(shortSleepDuration);
        let close = By.xpath("//*[local-name()='svg']//*[name()='path' and @d='M18.364 18.364a1 1 0 0 0 0-1.414L13.414 12l4.95-4.95a1 1 0 1 0-1.414-1.414L12 10.586l-4.95-4.95A1 1 0 0 0 5.636 7.05l4.95 4.95-4.95 4.95a1 1 0 1 0 1.414 1.414l4.95-4.95 4.95 4.95a1 1 0 0 0 1.414 0Z' ]");
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
    it("check board is visible on the workspace", async function () {
        log('check board is visible on the workspace')
        //click on polymer logo
        let clickonPolymerLogo = By.xpath("//div[@id='polymer-nav-logo']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonPolymerLogo);
        //verify the board name on the workspace 
        let waitforboard = By.xpath("//span[@class='name']");
        await actionWithRetry(driver, async function (element) {}, waitforboard);
        let actual_text = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//span[@class='name']"))), isTimeout).getText();
        console.log("actual_text", actual_text)
        let expected_text = "Linear Dashboard"
        assert.equal(expected_text, actual_text)
    })
})