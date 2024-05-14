const {
    By,
    Builder,
    until,
    Actions,
    Key
} = require("selenium-webdriver");
let {
    pass
} = require("../credentials.json");
const assert = require('assert');
const {
    actionWithRetry,
    log
} = require("../main/loadfile");
const {
    driver
} = require("../main/index")
describe("P3:verify to delete the account", async function () {
    it("go to the setting section and delete the email account", async function () {
        log(':starting delete the account')
       // await driver.sleep(2000);
        //  await driver.get(baseUrl);
      /*  log(':waiting the next button')
        await driver.sleep(10000);
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
      */  const Settingbutton = By.xpath("(//button[@class='btn polymer-navbar-link'])[2]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, Settingbutton,3,10000);
        //click on delete button
        const deleteButton = By.xpath("(//span[text()=' Delete Account '])");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, deleteButton);
        //click on why you are leaving
        const whyLeavingCheckbox = By.xpath("(//div[@class='polymer-checkbox'])[7]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, whyLeavingCheckbox);
        //click on next
        const clickonNext1 = By.xpath("//span[text()=' Next ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonNext1);
        //send reason
        const sendReason = By.xpath("//textarea[@name='reason']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys("testing")
        }, sendReason);
        //delete account
        const deleteAccount = By.xpath("(//span[text()=' Delete Account '])[2]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, deleteAccount);
        //enter pasword
        await driver.sleep(1000);
        const sendpass = By.xpath("//input[@id='password']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(pass)
        }, sendpass);
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, deleteAccount);
    })
})