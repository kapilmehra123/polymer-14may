const {
    By,
    Builder,
    until
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
    isTimeout
} = require("../masterdata.json")
let {
    airtable_token
} = require("../credentials.json")
//verify the airtable connector
describe("verify the airtable connector", async function () {
    //click on the airtable connector
    it("click on the airtable connector", async function () {
        // Click on "All connectors"
        let clickOnAllConnectors = By.xpath("//div[text()='All connectors']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnAllConnectors, 4, 2000);
        // Click on "airtable"
        const clickOnDropbox = By.xpath("//span[text()='Airtable']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnDropbox, 4, 1000);
    })
    //send the token and click on connect source
    it("send the token and click on connect source", async function () {
        //send the token
        let clickOnAllConnectors = By.xpath("(//input[@class='input'])[1]");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(airtable_token)
        }, clickOnAllConnectors, 4, 2000);
        // Click on connect source
        const clickOnDropbox = By.xpath("//span[text()='Connect Source']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnDropbox, 4, 1000);
        //select the base
        const clickOnbase = By.xpath("//div[@class='stream']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnbase, 4, 1000);
        //click on select base button
        const selectOnbase = By.xpath("//span[text()='Select Base']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, selectOnbase, 4, 1000);
        //click on table
        const clickOnTable = By.xpath("//div[@class='stream']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnTable, 4, 1000);
        //click on select table to import
        const selectTable = By.xpath("//span[text()='Select Table to import']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, selectTable, 4, 1000);
    })
})