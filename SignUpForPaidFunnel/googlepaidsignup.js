const {
    By,
    until,
    Key
} = require("selenium-webdriver");
let {
    cardnumber,
    cardcvc,
    cardname,
    monthyear,
    paidfunnelbaseUrl,
    googlemail,
    googlepass,
    googlename
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
//Verify the google sign up with paid funnel
describe("Verify the google sign up with paid funnel", async function () {
    //click on sign up with google 
    it("Click on sign up with google", async function () {
        log(':register the new account')
        await driver.sleep(longSleepDuration)
        await driver.get(paidfunnelbaseUrl)
        log(':step-clicking on google signup')
        await driver.sleep(shortSleepDuration);
        const waitforname = By.xpath("//span[text()='Sign up with Google']");
        await actionWithRetry(driver, async function (element) {}, waitforname, 4, 2000);
        const signingoogleElementLocator = By.xpath("//span[text()='Sign up with Google']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, signingoogleElementLocator, 4, 1000);
    })
     //logIn the google account
     it("logIn the google account", async function () {
        log(':logIn the google account')
        await driver.sleep(longSleepDuration);
        const googleemailElementLocator = By.xpath("//input[@type='email']");
        const emailInputElement = await driver.findElements(googleemailElementLocator);
        if (emailInputElement.length > 0) {
            // Email input element found, proceed with the actions
            await actionWithRetry(driver, async function (element) {
                await element.sendKeys(googlemail, Key.RETURN);
            }, googleemailElementLocator, 4, 1000);
            await driver.sleep(longSleepDuration)
            const waitgooglepassElementLocator = By.xpath("//input[@type='password']");
            await actionWithRetry(driver, async function (element) {}, waitgooglepassElementLocator, 4, 10000);
            // Send the google password
            const googlepassElementLocator = By.xpath("//input[@type='password']");
            await actionWithRetry(driver, async function (element) {
                await element.sendKeys(googlepass, Key.RETURN);
            }, googlepassElementLocator, 4, 1000);
            const googlecontinueElementLocator = By.xpath("//span[text()='Continue']");
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, googlecontinueElementLocator, 4, 10000);
        } else {
            //click on google account
            const clickOnGoogleAccount = By.xpath("(//div[@class='VV3oRb YZVTmd SmR8'])[1]");
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, clickOnGoogleAccount, 4, 10000);
            //click on continue
            const clickOnContinue = By.xpath("//span[text()='Continue']");
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, clickOnContinue, 4, 1000);
            await driver.sleep(shortSleepDuration);
        }
        await driver.sleep(longSleepDuration)
    })
    //add the card details in stripe page
    it("Add the card details in stripe page", async function () {
        log(':step- add the card details in stripe page')
        const waitforname = By.xpath("//div[text()='Enter payment details']");
        await actionWithRetry(driver, async function (element) {}, waitforname, 6, 30000);
        // Check if the 'Change' button is present
        const changeButtonElement = await driver.findElements(By.xpath("//div[text()='Change']"));
        // If 'Change' button is present, click on it
        if (changeButtonElement.length > 0) {
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, By.xpath("//div[text()='Change']"));
        }
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
        await driver.sleep(shortSleepDuration);
        //add card holder name
        const addcardNameElement = By.xpath("//input[@id='billingName']");
        await actionWithRetry(driver, async function (element) {
            await element.clear();
        }, addcardNameElement);
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(cardname);
        }, addcardNameElement);
        const selectCountryNameElement = By.xpath("//select[@id='billingCountry']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys("India", Key.ENTER)
        }, selectCountryNameElement);
        //click on start trial
        const clickonStartTrial = By.xpath("//div[@class='SubmitButton-IconContainer']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonStartTrial, 3, 10000);
    })
    //Verify that the user can select any option for "Who do you want to analyze data for?" during account registration.
    it("Verify that the user can select any option for Who do you want to analyze data for? during account registration.", async function () {
        //click on my clients or customers
        const waitforname = By.xpath("//button[text()='My Clients or Customers']");
        await actionWithRetry(driver, async function (element) {}, waitforname, 6, 30000);
        const myClientorCustomeElementLocator = By.xpath("//button[text()='My Clients or Customers']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, myClientorCustomeElementLocator, 6, 3000);
        //click on continue button
        const continueButtonElementLocator = By.xpath("//button[text()=' Continue ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, continueButtonElementLocator, 4, 3000);
    })
    // Verify that the user can select any type of data they will be analyzing during account registration.
    it("Verify that the user can select any type of data they will be analyzing during account registration.", async function () {
        const waitforname = By.xpath("//button[text()='Marketing / Advertising']");
        await actionWithRetry(driver, async function (element) {}, waitforname, 4, 3000);
        //click on marketing/advertising
        const marketingElementLocator = By.xpath("//button[text()='Marketing / Advertising']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, marketingElementLocator, 4, 1000);
        //click on continue button
        const continueButtonElementLocator = By.xpath("//button[text()=' Continue ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, continueButtonElementLocator, 4, 3000);
    })
    //verify the register name should be shown on Invite your teammates section
    it("Verify the register name should be shown on Invite your teammates section", async function () {
        log('verify the register name should be shown on Invite your teammates section')
        const waitforname = By.xpath("//div[@class='name']/span");
        await actionWithRetry(driver, async function (element) {}, waitforname, 4, 1000);
        let actual_registername = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@class='name']/span"))), isTimeout).getText()
        let expected_registername = googlename
        console.log("expected_registername", expected_registername)
        assert.equal(expected_registername, actual_registername)
    })
    //Verify that the user can successfully invite teammates or click on continue during the registration process.
    it("Verify that the user can successfully invite teammates or click on continue during the registration process.", async function () {
        //click on continue button
        const continueButtonElementLocator = By.xpath("//button[text()=' Continue ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, continueButtonElementLocator, 4, 1000);
    })
})