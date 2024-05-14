const {
    By,
    until,
} = require("selenium-webdriver");
let {
    email,
    pass,
    firstname,
    lastname,
    baseUrl
} = require("../credentials.json");
let {
    isTimeout
} = require("../masterdata.json")
const assert = require('assert');
const {
    actionWithRetry,
    log
} = require("../main/loadfile");
const {
    driver
} = require("../main/index")
//verify the sign up
describe("P1:Verify the sign up", async function () {
    //Verify that a user can successfully register for an account.
    it("Verify that a user can successfully register for an account.", async function () {
        await driver.get(baseUrl)
        log('register the new account')
        log('clicking on register link')
        //click on the register link
        const registerElementLocator = By.xpath("//a[text()='Register']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, registerElementLocator, 4, 10000);
        //send the first name
        log(':step 3b-send first name')
        const FirstNameElement = By.xpath("//input[@placeholder='First Name']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(firstname)
        }, FirstNameElement, 4, 10000);
        //send the last name
        log(':step 3c-send last name')
        const LastNameElement = By.xpath("//input[@placeholder='Last Name']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(lastname)
        }, LastNameElement, 4, 1000);
        //send the email
        log(':step 3d-send email')
        const emailElementLocator = By.xpath("//input[@id='email']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(email);
        }, emailElementLocator, 4, 1000);
        //send the password
        log(':step 3e-send password')
        const passwordElementLocator = By.xpath("//input[@id='password']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(pass);
        }, passwordElementLocator);
        log(':step 3f-click on register button')
        //click on register button
        const registerButtonElementLocator = By.xpath("//span[text()='Register']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, registerButtonElementLocator, 4, 1000);
    })
    //Verify that the user can select any option for "Who do you want to analyze data for?" during account registration.
    it("Verify that the user can select any option for Who do you want to analyze data for? during account registration.", async function () {
        //click on my clients or customers
        const waitforname = By.xpath("//button[text()='My Clients or Customers']");
        await actionWithRetry(driver, async function (element) {}, waitforname, 4, 10000);
        const myClientorCustomeElementLocator = By.xpath("//button[text()='My Clients or Customers']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, myClientorCustomeElementLocator, 4, 1000);
        //click on continue button
        const continueButtonElementLocator = By.xpath("//button[text()=' Continue ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, continueButtonElementLocator, 4, 1000);
    })
    // Verify that the user can select any type of data they will be analyzing during account registration.
    it("Verify that the user can select any type of data they will be analyzing during account registration.", async function () {
        const waitforname = By.xpath("//button[text()='Marketing / Advertising']");
        await actionWithRetry(driver, async function (element) {}, waitforname, 4, 10000);
        //click on marketing/advertising
        const marketingElementLocator = By.xpath("//button[text()='Marketing / Advertising']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, marketingElementLocator, 4, 1000);
        //click on continue button
        const continueButtonElementLocator = By.xpath("//button[text()=' Continue ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, continueButtonElementLocator, 4, 1000);
    })
    //verify the register name should be shown on Invite your teammates section
    it("verify the register name should be shown on Invite your teammates section", async function () {
        const waitforname = By.xpath("//div[@class='name']/span");
        await actionWithRetry(driver, async function (element) {}, waitforname, 4, 10000);
        let actual_registername = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@class='name']/span"))), isTimeout).getText()
        let expected_registername = firstname + " " + lastname
        console.log("expected_registername", expected_registername)
        assert.equal(expected_registername, actual_registername)
    })
    //Verify that the user can successfully invite teammates or click on continue during the registration process.
    it("Verify that the user can successfully invite teammates or click on continue during the registration process.", async function () {
        //click on continue button
        const continueButtonElementLocator = By.xpath("//button[text()=' Continue ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, continueButtonElementLocator, 4, 10000);
    })
})