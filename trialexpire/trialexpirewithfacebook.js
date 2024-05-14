const {
    By,
    until,
    Key
} = require("selenium-webdriver");
let {
    isTimeout,
    execution,
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
let {
    adminUrl,
    baseUrl,
    cardnumber,
    cardcvc,
    cardname,
    monthyear,
    filePath
} = require("../credentials.json")
const path = require('path');
//verify the trial expire popup for the facebook signup
describe("Verify the trial expire popup for the facebook signup", async function () {
    let getdata;
    //click on the all connectors to shown the all connectors
    it("click on the all connectors to shown the all connectors", async function () {
        let clickonAllConnectors = By.xpath("//div[text()='All connectors']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonAllConnectors, 4, 2000);
    })
    //Upload a csv file
    it("Upload a csv file", async function () {
        log(':step 5:starting Upload a csv file')
        await driver.sleep(longSleepDuration);
        let clickOnuploadcsvfile = By.xpath("//span[text()=' Upload XLS or CSV ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnuploadcsvfile, 4, 2000);
        log(':step 7e:uploading the file')
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
    //Share the board publically and log out
    it("Share the board publically and log out", async function () {
        log('Share the board publically and log out')
        //click on share button
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//button[text()=' Share ']"))), isTimeout).click();
        //access the public access
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//label[@class='cursor-pointer polymer-toggle relative inline-flex items-center']"))), isTimeout).click();
        //copy board link
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//button[text()=' Copy Board Link']"))), isTimeout).click();
        getdata = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//input[@class='input'])"))), isTimeout).getAttribute('value')
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//div[@class='polymer-user-avatar'])[1]"))), isTimeout).click();
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//a[text()=' Log out']"))), isTimeout).click();
    })
    //login with the admin user
    it("Login with the admin user", async function () {
        await driver.sleep(shortSleepDuration);
        log('login with the admin user')
        //send the email
        const emailElementLocator = By.xpath("//input[@id='email']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(execution[0].verify_trial_expired_popup[0].verification[0].adminemail);
        }, emailElementLocator, 4, 1000);
        //send the password
        const passwordElementLocator = By.xpath("//input[@id='password']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(execution[0].verify_trial_expired_popup[0].verification[0].adminpass);
        }, passwordElementLocator);
        //click on login page
        const loginButtonLocator = By.xpath("//button[@class='btn-md btn-black btn group/btn']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, loginButtonLocator);
        //send the admin url
        await driver.sleep(longSleepDuration);
        await driver.get(adminUrl);
    })
    //go to the user section
    it("Go to the user section", async function () {
        log('go to the user section')
        const clickOnUserSection = By.xpath("//button[text()='Users']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnUserSection, 3, 10000)
    })
    //search the user and click on quick action
    it("Search the user and click on quick action", async function () {
        log('search the user and click on quick action')
        //send the user
        await driver.sleep(shortSleepDuration);
        const sendUser = By.xpath("//input[@class='input']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(execution[0].verify_trial_expired_popup[0].verification[0].facebookemail)
        }, sendUser, 3, 10000)
        await driver.sleep(shortSleepDuration);
        //click on search button
        const clickOnSearch = By.xpath("//span[text()=' Search ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnSearch, 3, 10000)
        //click on quick actions
        const clickOnQuickAction = By.xpath("//button[text()=' Quick Actions ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnQuickAction, 3, 10000)
    })

    //click on end trial
    it("Click on end trial", async function () {
        log('click on end trial')
        await driver.sleep(shortSleepDuration);
        const clickOnEndUrl = By.xpath("//button[text()=' End trial ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnEndUrl, 3, 10000)
        await driver.sleep(shortSleepDuration);
        //send the base url
        await driver.get(baseUrl)
    })
    //log out
    it("Log out", async function () {
        log('log out')
        await driver.sleep(shortSleepDuration);
        const clickOnAvatar = By.xpath("(//div[@class='polymer-user-avatar'])[2]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnAvatar, 3, 10000)
        //log out admin 
        const clickOnLogOut = By.xpath("//a[text()=' Log out']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnLogOut, 3, 10000)
    })
    //login the facebook account
    it("Login the facebook account", async function () {
        log('login the facebook account')
        await driver.sleep(shortSleepDuration);
        const waitforname = By.xpath("//span[text()=' Continue with Facebook ']");
        await actionWithRetry(driver, async function (element) {}, waitforname, 4, 1000);
        const continuefacebookElementLocator = By.xpath("//span[text()=' Continue with Facebook ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, continuefacebookElementLocator, 4, 1000);
    })
    //paste the copied board url  
    it("Paste the copied board url ", async function () {
        await driver.sleep(shortSleepDuration);
        await driver.get(getdata)
    })
    //verify 'Level up! You've graduated from trial mode!' popup should be shown on the user worksapce
    it("Verify 'Level up! You've graduated from trial mode!' popup should be shown on the user workspace", async function () {
        log('verify Level up Youve graduated from trial mode! popup should be shown on the user workspace')
        await driver.sleep(longSleepDuration);
        let waitforpopup = By.xpath("//div[@class='left']/h1");
        await actionWithRetry(driver, async function (element) {}, waitforpopup);
        let actual_text = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@class='left']/h1"))), isTimeout).getText();
        let expected_text = execution[0].verify_trial_expired_popup[0].verification[0].popuptext
        assert.equal(expected_text, actual_text)
    })
    //Your Polymer trial has ended! should be shown on trial expire popup
    it("Your Polymer trial has ended! should be shown on trial expire popup", async function () {
        log('Your Polymer trial has ended! should be shown on trial expire popup')
        let actual_text = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//p[@class='notice']"))), isTimeout).getText();
        let expected_text = execution[0].verify_trial_expired_popup[0].verification[0].trialendedtext
        assert.equal(expected_text, actual_text)
    })
    //click on the redeem your gift
    it("Click on the redeem your gift", async function () {
        log('click on the redeem your gift')
        const clickRedeemGift = By.xpath("//span[text()='Redeem your gift']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickRedeemGift, 3, 10000)
        //click on the starter paid account
        const clickStarter = By.xpath("(//span[@class='discount'])[1]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickStarter, 3, 10000)
    })
    //add the stripe detail and paid the Account
    it("Add the stripe detail and paid the Account", async function () {
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
        //select country
        const selectCountryNameElement = By.xpath("//select[@id='billingCountry']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, selectCountryNameElement);
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys("India", Key.ENTER)
        }, selectCountryNameElement);
        //click on start trial
        const clickonStartTrial = By.xpath("//div[@class='SubmitButton-IconContainer']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonStartTrial, 3, 10000);
    })
    //verify Congratulations for upgrading! You are now using
    it("Verify Congratulations for upgrading! You are now using", async function () {
        log('verify Congratulations for upgrading! You are now using')
        let waitforpopup = By.xpath("//div[@class='polymer-account-exists-modal polymer-modal']//h3");
        await actionWithRetry(driver, async function (element) {}, waitforpopup, 3, 10000);
        let actual_text = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//div[@class='polymer-account-exists-modal polymer-modal']//h3"))), isTimeout).getText();
        let expected_text = execution[0].verify_trial_expired_popup[0].verification[0].paymentsuccess;
        assert.equal(expected_text, actual_text)
    })
    //close the popup
    it("Close the popup", async function () {
        const closePopup = By.xpath("//div[@class='polymer-close-icon']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, closePopup, 3, 10000);
    })
})