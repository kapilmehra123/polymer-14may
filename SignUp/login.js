const {
    By,
    Builder,
    until,
    Actions
} = require("selenium-webdriver");
let {
    email,
    pass
} = require("../crediantial.json");
const assert = require('assert');
const {
    actionWithRetry,
    log
} = require("../main/loadfile");
describe("login", async function () {
    it("login the page", async function () {
        log(':starting login the page')
        // await driver.manage().window().maximize();
        // log(':sstep 2')
        // await driver.get(baseUrl);
        log(':step 3')
        log(':step 3a')
        const emailElementLocator = By.xpath("//input[@id='email']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(email);
        }, emailElementLocator, 4, 1000);

        const passwordElementLocator = By.xpath("//input[@id='password']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(pass);
        }, passwordElementLocator);

        const loginButtonLocator = By.xpath("//button[@class='btn-md btn-black btn group/btn']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, loginButtonLocator);
        // await driver.navigate().refresh();
        // log(':step 4')
        const Settingbutton = By.xpath("(//button[@class='btn polymer-navbar-link'])[2]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, Settingbutton);
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
        const clickonNext = By.xpath("//span[text()=' Next ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonNext);
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
        const sendpass = By.xpath("//input[@id='password']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(pass)
        }, sendpass);
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, deleteAccount);
    })
})