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
    facebookadsemail,
    facebookadspass
} = require("../credentials.json")
const {
    driver
} = require("../main/index")
//verify the zendesk connector
describe("verify the facebook ads template from workspace", async function () {
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
    it("select facebook ads overview from the workspace and click on the use this template", async () => {
        let facebookAdsOverview = By.xpath("//div[text()='Facebook Ads Overview']");
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
    //login the facebook account
    it("login the facebook account", async function () {
        log(':logIn the facebook account')
        await driver.sleep(longSleepDuration);
        // Check if the 'Log in to another account' button is present
        const changeButtonElement = await driver.findElements(By.xpath("//span[text()='Log in to another account.']"));
        if (changeButtonElement.length > 0) {
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, By.xpath("//span[text()='Log in to another account.']"));
        }
        const facebookemailElementLocator = By.xpath("//input[@name='email']");
        await actionWithRetry(driver, async function (element) {
            await element.clear();
        }, facebookemailElementLocator, 4, 1000);
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(facebookadsemail)
        }, facebookemailElementLocator, 4, 1000);
        //enter the facebook password
        const facebookpassElementLocator = By.xpath("//input[@name='pass']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(facebookadspass)
        }, facebookpassElementLocator, 4, 1000);
        //click on login button
        const facebookloginElementLocator = By.xpath("//button[@name='login']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, facebookloginElementLocator, 4, 1000);
        //click on to continue
        const facebookloginContinue = By.xpath("(//span[@class='x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft'])[2]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, facebookloginContinue, 4, 10000);
    })
    //Select the facebook ads account and click on to auto generate button
    it("Select the facebook ads account and click on to connect button", async () => {
        //select the account
        const selectOnfb = By.xpath("(//div[@class='details'])[2]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, selectOnfb, 4, 1000);
        //click on connect
        const selectOnconnect = By.xpath("//span[text()=' Connect ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, selectOnconnect, 4, 1000);
    })
    //check board is getting loaded
    it("check board is able to load", async function () {
        log('check board is able to load')
        await driver.switchTo().defaultContent();
        const waitforboardname = By.xpath("//span[@id='board-name-input']");
        await actionWithRetry(driver, async function (element) {}, waitforboardname, 3, 30000);
        const header = await driver.findElements(By.xpath("//div[@class='header-block-wrapper header-block-background-gradient-b text-size-medium align-center']"));
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
        let expected_text = "Facebook Ads Overview"
        assert.equal(expected_text, actual_text)
    })
})