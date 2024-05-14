const {
    By,
    until,
} = require("selenium-webdriver");
let {
    filePath,
    fileName
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
describe("P2:verify the Csv Upload", async function () {
    //click on  "All connectors" to shown all the connectors
    it("Click on the all connectors to shown the all connectors", async function () {
        let clickonAllConnectors = By.xpath("//div[text()='All connectors']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonAllConnectors, 4, 2000);
    })
    //Upload an csv file
    it("Upload a csv file", async function () {
        log(':step 5:starting Upload a csv file')
        await driver.sleep(shortSleepDuration);
        let clickOnuploadcsvfile = By.xpath("//span[text()=' Excel or CSV ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnuploadcsvfile, 4, 2000);
        log(':step 7e:uploading the file')
        console.log("filePath", filePath)
        filePath = path.resolve(__dirname, filePath);
        console.log("Absolute filePath:", filePath);
        driver.findElement(By.xpath("(//input[@type='file'])[2]")).sendKeys(filePath);
    });
    //click on auto generated board
    it("Click on auto generated board", async function () {
        await driver.sleep(longSleepDuration);
        await driver.actions().move({
            x: 10,
            y: 10
        }).click().perform();
    })
    //check board is able to load
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
    //verify the selected sheet on the data section on dashboard
    it("Verify the selected sheet on the data section on dashboard", async function () {
        //click on data section
        let clickonDataSection = By.xpath("//span[text()='Data']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonDataSection);
        await driver.sleep(shortSleepDuration);
        //verify the first sheet
        let actual_firstsheet = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//div[@class='flex items-center text-sm leading-4 mb-1'])[1]"))), isTimeout).getText();
        console.log("actual_firstsheet", actual_firstsheet)
        let expected_firstsheet = fileName
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
        let actual_text = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//span[@class='source-name'])[4]"))), isTimeout).getText();
        let expected_text = fileName
        assert.equal(expected_text, actual_text)
    })
})