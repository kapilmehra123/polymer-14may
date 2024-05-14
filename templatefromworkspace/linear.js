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
//verify the zendesk connector
describe("verify the linear template from workspace", async function () {
    //wait for the next button
    it("wait for the next button", async function () {
        try {
            await driver.sleep(longSleepDuration);
            const waitiframe = By.xpath("(//iframe)[3]");
            await actionWithRetry(driver, async function (element) {}, waitiframe, 4, 10000)
            // Find the iframe element
            const iframe = await driver.findElement(By.xpath("(//iframe)[3]"));
            // Switch Selenium's focus to the iframe
            await driver.switchTo().frame(iframe);
            //click on next on user workspace
            let clickonNext = By.xpath("//div[text()='Next']");
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, clickonNext, 3, 20000);
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, clickonNext, 2, 10000);
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, clickonNext, 2, 10000);
            //clcik on done
            let clickonDone = By.xpath("//div[text()='Done']");
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, clickonDone, 2, 10000);
            await driver.switchTo().defaultContent();
        } catch (error) {
            console.log("Iframe not present, skipping...");
        }
    })
    //click on browse all templates button
    it("click on browse all templates button", async () => {
        let browseAllTemplateButton = By.xpath("//span[text()='Browse all Templates']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, browseAllTemplateButton, 2, 10000);
    })
    //select facebook ads overview
    it("select linear from the workspace and click on the use this template", async () => {
        let facebookAdsOverview = By.xpath("//div[text()='Linear Dashboard']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, facebookAdsOverview, 2, 10000);
        await driver.sleep(longSleepDuration);
        //click on use this template
        let useTemplate = By.xpath("//span[text()='Use this template']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, useTemplate, 2, 10000);
    })
    //add the details of linear
    it("add the details of linear", async () => {
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
    //check board is able to load(verify header should be shown)
    it("check board is able to load(verify header should be shown)", async function () {
        log('check board is able to load')
        await driver.switchTo().defaultContent();
        const waitforboardname = By.xpath("//span[@id='board-name-input']");
        await actionWithRetry(driver, async function (element) {}, waitforboardname, 3, 30000);
        const header = await driver.findElements(By.xpath("//div[@class='header-block-wrapper header-block-background-gradient-c text-size-medium align-center']"));
        console.log("header:", header.length);
        // Compare the actual number of charts with the expected number
        const expectedNumberOfheader = 1;
        if (header.length >= expectedNumberOfheader) {
            console.log("The board has the expected header.");
        } else {
            console.error("The board does not have the expected header");
            assert.equal(expectedNumberOfheader, header.length)
        }
    })
    //Count the number of charts on the board
    it("Count the number of charts on the board", async () => {
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