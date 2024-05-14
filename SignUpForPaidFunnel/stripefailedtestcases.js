const {
    By,
    until,
    Key
} = require("selenium-webdriver");
let {
    cardname,
    cardcvc,
    invalidcardnumber,
    monthyear,
    paidfunnelbaseUrl,
    googlemail,
    googlepass,
    googlename,
    shopifystorename,
    shopifytoken
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
//verify the stripe failed test cases
describe("verify the stripe failed test cases", async function () {
    //click on sign in with google 
    it("click on sign up with google", async function () {
        log(':register the new account')
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
        //send the google email
        const googleemailElementLocator = By.xpath("//input[@type='email']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(googlemail, Key.RETURN)
        }, googleemailElementLocator, 4, 1000);
        await driver.sleep(longSleepDuration);
        const waitgooglepassElementLocator = By.xpath("//input[@type='password']");
        await actionWithRetry(driver, async function (element) {}, waitgooglepassElementLocator, 4, 2000);
        //send the google pass
        const googlepassElementLocator = By.xpath("//input[@type='password']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(googlepass, Key.RETURN)
        }, googlepassElementLocator, 4, 1000);
        //click on continue
        const googlecontinueElementLocator = By.xpath("//span[text()='Continue']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, googlecontinueElementLocator, 4, 10000);
    })
    //add the card details in stripe page
    it("add the card details in stripe page", async function () {
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
            await element.sendKeys(invalidcardnumber);
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
        await driver.sleep(10)
        //clear the billing name
        const addcardNameElement1 = By.xpath("//input[@id='billingName']");
        await actionWithRetry(driver, async function (element) {
            await element.clear();
        }, addcardNameElement1);
        //send the billing name
        const addcardNameElement = By.xpath("//input[@id='billingName']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(cardname);
        }, addcardNameElement);
        //select the country name
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
    it("verify the register name should be shown on Invite your teammates section", async function () {
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
    //click on shopify
    it("click on shopify", async function () {
        await driver.sleep(shortSleepDuration);
        const clickOnShopify = By.xpath("//div[text()='Shopify']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnShopify, 4, 1000);
    })
    //add the email and password of the shopify
    it("add the email and password of the shopify", async function () {
        //Shopify Store Name
        const shopifystorname = By.xpath("(//input[@class='input'])[1]");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(shopifystorename)
        }, shopifystorname, 4, 1000);
        //Access Token
        const shopifystortoken = By.xpath("(//input[@class='input'])[2]");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(shopifytoken)
        }, shopifystortoken, 4, 1000);
    })
    //click on auto generated board
    it("click on auto generated board", async function () {
        await driver.sleep(longSleepDuration);
        let clickAutomGenerated = By.xpath("//button[text()=' Auto-Generate Board']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickAutomGenerated, 4, 2000);
        await driver.sleep(longSleepDuration);
        let close = By.xpath("//button[@class='ml-auto']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, close, 10, 30000);
    })
    //verify the 7 days left days trial should be shown on the user workspace 
    it("verify the 7 days left days trial should be shown on the user workspace ", async function () {
        //click on the polymer icon
        let clickonPolymerLogo = By.xpath("//div[@id='polymer-nav-logo']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonPolymerLogo);
        await driver.sleep(longSleepDuration)
        await driver.sleep(shortSleepDuration)
        // Find the iframe element
        const iframe = await driver.findElement(By.xpath("(//iframe)[3]"));
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
        //verify the 7trial days left on the user worksapce
        let text = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@class='trial-countdown-floater-info']"))), isTimeout).getText();
        let actual_text = text.replace(/\n/g, "");
        let expected_text = "7trial days left"
        assert.equal(expected_text, actual_text)
    })
    //click on the profile icon
    it("click on the profile icon", async function () {
        const waitforname = By.xpath("(//div[@class='polymer-user-avatar'])[2]");
        await actionWithRetry(driver, async function (element) {}, waitforname, 6, 30000);
        let profileiconElement = By.xpath("(//div[@class='polymer-user-avatar'])[2]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, profileiconElement);
    })
    //verify the 7 days left days trial should be shown on the user profile popup
    it("verify the 7 days left days trial should be shown on the user profile popup", async function () {
        let actual_text = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//span[@class='occurrence']"))), isTimeout).getText();
        let expected_text = "(Trial) 7 Days Left"
        assert.equal(expected_text, actual_text)
    })
    //click on to see plan
    it("click on to see plan", async function () {
        await actionWithRetry(driver, async function (element) {}, By.xpath("//div[@class='current-plan']"), 3, 5000);
        let seeplanElement = By.xpath("//div[@class='current-plan']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, seeplanElement);
    })
    //verify the plan on the pricing page
    it("verify the plan on the pricing page(Current should be not shown here)", async function () {
        await actionWithRetry(driver, async function (element) {}, By.xpath("(//span[@class='discount'])[1]"), 3, 5000);
        log(':step 7')
        await driver.sleep(shortSleepDuration);
        let actual_plan = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//span[@class='discount']/span)[1]"))), isTimeout).getText();
        let expected_plan = "Claim your Discount"
        assert.equal(expected_plan, actual_plan)
        let closeicon = By.xpath("//a[@class='close-button']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, closeicon, 3, 10000);
    })
})