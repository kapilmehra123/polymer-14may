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
const {
    driver
} = require("../main/index")
describe("verify to delete the account", async function () {
    it("go to the setting section and delete the facebook account", async function () {
        log(':starting deleting account')
        //  await driver.get(baseUrl);
        log(':step 3')
        log(':step 3a')
        //await driver.sleep(2000);
        // Find the iframe element
   /*     const iframe = await driver.findElement(By.xpath("(//iframe)[3]"));

        // Switch Selenium's focus to the iframe
        await driver.switchTo().frame(iframe);
        //click on next on user workspace
        let clickonNext = By.xpath("//div[text()='Next']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonNext, 3, 10000);
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
     */   const Settingbutton = By.xpath("(//button[@class='btn polymer-navbar-link'])[2]");
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
        const sendpass = By.xpath("//input[@class='input w-full']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys("yes")
        }, sendpass);
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, deleteAccount);
    })
})