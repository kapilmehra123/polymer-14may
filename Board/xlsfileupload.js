const {
    By,
    until,
} = require("selenium-webdriver");
let {
    xlsfilepath,
    xlsfilename
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
const path = require('path');
const {
    driver
} = require('../main/index')
describe("verify the xls file upload", async function () {
    //click on  "All connectors" to shown all the connectors
    it("Click on the all connectors to shown the all connectors", async function () {
        let clickonAllConnectors = By.xpath("//div[text()='All connectors']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonAllConnectors, 4, 2000);
    })
    //Upload an xls file
    it("Upload a xls file", async function () {
        log(':step 5:starting Upload a xls file')
        await driver.sleep(longSleepDuration);
        let clickOnuploadcsvfile = By.xpath("//span[text()=' Excel or CSV ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnuploadcsvfile, 4, 2000);
        log(':step 7e:uploading the file')
        xlsfilepath = path.resolve(__dirname, xlsfilepath);
        console.log("Absolute filePath:", xlsfilepath);
        driver.findElement(By.xpath("(//input[@type='file'])[2]")).sendKeys(xlsfilepath);
    });
    //Select the sheets you wish to connect
    it("Select the sheets you wish to connect", async function () {
        log(':Select the sheets you wish to connect')
        let clickOnSelectsheet = By.xpath("(//div[@class='polymer-checkbox'])[2]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnSelectsheet, 4, 2000);
        //click on to import sheet
        let clickOnImportsheet = By.xpath("//span[text()=' Import Sheets ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnImportsheet, 4, 2000);
    })
    //check board is getting loaded
    it("Check board is able to load", async function () {
        await driver.sleep(longSleepDuration);
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
        await driver.sleep(shortSleepDuration);
        //verify the board name on the workspace 
        let waitforboard = By.xpath("(//span[@class='source-name'])[4]");
        await actionWithRetry(driver, async function (element) {}, waitforboard);
        // let actual_text = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//span[@class='source-name'])[4]"))), isTimeout).getText();
        // let expected_text = xlsfilename
        // assert.equal(expected_text, actual_text)
    })
})