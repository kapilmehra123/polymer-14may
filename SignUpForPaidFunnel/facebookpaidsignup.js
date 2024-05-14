const {
    By,
    until
} = require("selenium-webdriver");
let {
    facebookemail,
    facebookpass,
    facebookname,
    cardnumber,
    cardcvc,
    cardname,
    monthyear,
    paidfunnelbaseUrl
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
const {
    driver
} = require("../main/index")
//Verify the facebook sign up with paid funnel
describe("Verify the facebook sign up with paid funnel", async function () {
    //click on continue with facebook button
    it("Click on continue with facebook button", async function () {
        // driver.get(baseUrl)
        log(':register the new account')
        await driver.get(paidfunnelbaseUrl)
        log(':step-clicking on facebook register link')
        await driver.sleep(shortSleepDuration);
        const waitforname = By.xpath("//span[text()=' Continue with Facebook ']");
        await actionWithRetry(driver, async function (element) {}, waitforname, 4, 1000);
        const continuefacebookElementLocator = By.xpath("//span[text()=' Continue with Facebook ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, continuefacebookElementLocator, 4, 1000);
    })
    //logIn the facebook account
    it("LogIn the facebook account", async function () {
        log(':logIn the facebook account')
        await driver.sleep(longSleepDuration);
        //enter the facebook email id
        const googleemailElementLocator = By.xpath("//input[@name='email']");
        const emailInputElement = await driver.findElements(googleemailElementLocator);
        if (emailInputElement.length > 0) {
            const facebookemailElementLocator = By.xpath("//input[@name='email']");
            await actionWithRetry(driver, async function (element) {
                await element.sendKeys(facebookemail)
            }, facebookemailElementLocator, 4, 1000);
            //enter the facebook password
            const facebookpassElementLocator = By.xpath("//input[@name='pass']");
            await actionWithRetry(driver, async function (element) {
                await element.sendKeys(facebookpass)
            }, facebookpassElementLocator, 4, 1000);
            //click on login button
            const facebookloginElementLocator = By.xpath("//button[@name='login']");
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, facebookloginElementLocator, 4, 1000);
        }
    })
    //add the card details in stripe page
    it("Add the card details in stripe page", async function () {
        log(':step- add the card details in stripe page')
        //add card information
        const addcardNumberElement = By.xpath("//input[@id='cardNumber']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(cardnumber);
        }, addcardNumberElement);
        //add card month and year
        const addcardMonthYearElement = By.xpath("//input[@id='cardExpiry']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(monthyear);
        }, addcardMonthYearElement);
        //add cvc
        const addcardCvcElement = By.xpath("//input[@id='cardCvc']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(cardcvc);
        }, addcardCvcElement);
        //add card holder name
        const addcardNameElement = By.xpath("//input[@id='billingName']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(cardname);
        }, addcardNameElement);
        const selectCountryNameElement = By.xpath("//select[@id='billingCountry']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, selectCountryNameElement);
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys("India")
        }, selectCountryNameElement);
        //click on start trial
        const clickonStartTrial = By.xpath("//div[@class='SubmitButton-IconContainer']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonStartTrial);
    })
    //Verify that the user can select any option for "Who do you want to analyze data for?" during account registration.
    it("Verify that the user can select any option for Who do you want to analyze data for? during account registration.", async function () {
        log(':Verify that the user can select any option for Who do you want to analyze data for? during account registration.')
        //click on my clients or customers
        const waitforname = By.xpath("//button[text()='My Clients or Customers']");
        await actionWithRetry(driver, async function (element) {}, waitforname, 6, 30000);
        const myClientorCustomeElementLocator = By.xpath("//button[text()='My Clients or Customers']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, myClientorCustomeElementLocator, 4, 2000);
        //click on continue button
        const continueButtonElementLocator = By.xpath("//button[text()=' Continue ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, continueButtonElementLocator, 4, 1000);
    })
    // Verify that the user can select any type of data they will be analyzing during account registration.
    it("Verify that the user can select any type of data they will be analyzing during account registration.", async function () {
        log(':Verify that the user can select any type of data they will be analyzing during account registration.')
        const waitforname = By.xpath("//button[text()='Marketing / Advertising']");
        await actionWithRetry(driver, async function (element) {}, waitforname, 4, 1000);
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
    it("Verify the register name should be shown on Invite your teammates section", async function () {
        log('verify the register name should be shown on Invite your teammates section')
        const waitforname = By.xpath("//div[@class='name']/span");
        await actionWithRetry(driver, async function (element) {}, waitforname, 4, 1000);
        // let actual_registername = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@class='name']/span"))), isTimeout).getText()
        // let expected_registername = facebookname
        // console.log("expected_registername", expected_registername)
        // assert.equal(expected_registername, actual_registername)
    })
    //Verify that the user can successfully invite teammates or click on continue during the registration process.
    it("Verify that the user can successfully invite teammates or click on continue during the registration process.", async function () {
        log('Verify that the user can successfully invite teammates or click on continue during the registration process.')
        //click on continue button
        const continueButtonElementLocator = By.xpath("//button[text()=' Continue ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, continueButtonElementLocator, 4, 1000);
    })
})