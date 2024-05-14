const {
    By,
    Builder,
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
} = require("../main/index");
let {
    isTimeout,
    longSleepDuration,shortSleepDuration
} = require("../masterdata.json")
let {
    dropboxfileName,
    googlemail,
    googlepass
} = require("../credentials.json");
//verify the dropbox connector
describe("verify the dropbox connector", async function () {
    // Click on the dropbox connector
    it("Click on the dropbox connector", async function () {
        log('Click on the dropbox connector');

        // Click on "All connectors"
        let clickOnAllConnectors = By.xpath("//div[text()='All connectors']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnAllConnectors, 4, 20000);

        // Click on "Dropbox"
        const clickOnDropbox = By.xpath("//span[text()='Dropbox']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnDropbox, 4, 10000);

        // Click on "Choose from Dropbox"
        const clickOnChooseFromDropbox = By.xpath("//a[text()='Choose from Dropbox']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnChooseFromDropbox, 4, 10000);
    });

    // Select the file and click on "Choose" button
    it("Select the file and click on 'Choose' button", async function () {
        // Wait for the new window to open
        await driver.wait(async () => {
            const handles = await driver.getAllWindowHandles();
            return handles.length > 1;
        }, 5000);

        // Switch to the new window
        const handles = await driver.getAllWindowHandles();
        await driver.switchTo().window(handles[1]);
        const clickOnContinueGoogle = By.xpath("//span[text()='Continue with Google']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnContinueGoogle, 4, 20000);
        await driver.sleep(longSleepDuration);
        const googleemailElementLocator = By.xpath("//input[@type='email']");
        const emailInputElement = await driver.findElements(googleemailElementLocator);
        if (emailInputElement.length > 0) {
            // Email input element found, proceed with the actions
            await actionWithRetry(driver, async function (element) {
                await element.sendKeys(googlemail, Key.RETURN);
            }, googleemailElementLocator, 4, 1000);
            await driver.sleep(longSleepDuration)
            await driver.sleep(longSleepDuration)
            const waitgooglepassElementLocator = By.xpath("//input[@type='password']");
            await actionWithRetry(driver, async function (element) {}, waitgooglepassElementLocator, 4, 10000);
            // Send the google password
            const googlepassElementLocator = By.xpath("//input[@type='password']");
            await actionWithRetry(driver, async function (element) {
                await element.sendKeys(googlepass, Key.RETURN);
            }, googlepassElementLocator, 4, 1000);
        } else {
            //click on google account
            const clickOnGoogleAccount = By.xpath("(//div[@class='VV3oRb YZVTmd SmR8'])[1]");
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, clickOnGoogleAccount, 4, 10000);

        }
        await driver.sleep(longSleepDuration)
        const clickOnChoosefile = By.xpath("//span[@class='dig-Checkbox dropins-item-row-checkbox']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnChoosefile, 4, 1000);
        const clickOnChoosebutton = By.xpath("//span[text()='Choose']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnChoosebutton, 4, 1000);
        await driver.switchTo().window(handles[0]);
    });
       //check board is able to load
       it("check board is able to load", async function () {
        await driver.sleep(shortSleepDuration)
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
            assert.equal(expectedNumberOfheader, charts.length)
        }
        //click on the close icon
        let close = By.xpath("//button[@class='ml-auto']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, close, 4, 10000);
    })
      //verify the selected sheet on the data section on dashboard
      it("Verify the selected dropbox data shwon on the data section on dashboard", async function () {
        //click on data section
        let clickonDataSection = By.xpath("//span[text()='Data']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonDataSection);
        await driver.sleep(longSleepDuration);
        //verify the first sheet
        let actual_firstsheet = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//div[@class='flex items-center text-sm leading-4 mb-1'])[1]"))), isTimeout).getText();
        console.log("actual_firstsheet", actual_firstsheet)
        let expected_firstsheet = dropboxfileName
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
        //click on polymer logo
        let clickonPolymerLogo = By.xpath("//div[@id='polymer-nav-logo']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonPolymerLogo);
        //verify the board name on the workspace 
        let waitforboard = By.xpath("(//span[@class='source-name'])[4]");
        await actionWithRetry(driver, async function (element) {}, waitforboard);
        let actual_text = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//span[@class='source-name'])[4]"))), isTimeout).getText();
        let expected_text = dropboxfileName
        assert.equal(expected_text, actual_text)
    })
});