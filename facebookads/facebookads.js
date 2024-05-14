const {
    By,
    until
} = require("selenium-webdriver");
let {
    facebookadsemail,
    facebookadspass
} = require("../credentials.json");
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
//verify the facebook ads
describe("verify the facebook ads", async function () {
    //click on facebooks ads
    it("Click on facebooks ads", async function () {
        await driver.sleep(shortSleepDuration);
        const clickOnFacebookAds = By.xpath("//div[text()='Facebook Ads']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnFacebookAds, 4, 1000);
    })
    //logIn the facebook account
    it("LogIn the facebook account", async function () {
        log(':logIn the facebook account')
        await driver.sleep(longSleepDuration);
        // Check if the 'Log in to another account' button is present
        const changeButtonElement = await driver.findElements(By.xpath("//span[text()='Log in to another account.']"));
        if (changeButtonElement.length > 0) {
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, By.xpath("//span[text()='Log in to another account.']"));
        }
        const facebookemailElementLocator = By.xpath("//input[@name='email']");
        await actionWithRetry(driver, async function (element) {
            await element.clear();
        }, facebookemailElementLocator, 4, 1000);
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(facebookadsemail)
        }, facebookemailElementLocator, 4, 1000);
        //enter the facebook password
        const facebookpassElementLocator = By.xpath("//input[@name='pass']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(facebookadspass)
        }, facebookpassElementLocator, 4, 1000);
        //click on login button
        const facebookloginElementLocator = By.xpath("//button[@name='login']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, facebookloginElementLocator, 4, 1000);
        //click on to continue
        const facebookloginContinue = By.xpath("(//span[@class='x1lliihq x6ikm8r x10wlt62 x1n2onr6 xlyipyv xuxw1ft'])[2]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, facebookloginContinue, 4, 10000);
    })
    //verify select your facebook ads account pop up should be shown after facebook login
    it("Verify select your facebook ads account pop up should be shown after facebook login", async function () {
        await driver.sleep(longSleepDuration)
        const waitforpopupname = By.xpath("//h3[text()=' Select your Facebook Ads account ']");
        await actionWithRetry(driver, async function (element) {}, waitforpopupname, 4, 30000);
        let actual_popupname = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//h3[text()=' Select your Facebook Ads account ']"))), isTimeout).getText()
        let expected_popupname = "Select your Facebook Ads account"
        assert.equal(expected_popupname, actual_popupname)
    })
    //Select the facebook ads account and click on to auto generate button
    it("Select the facebook ads account and click on to auto generate button", async function () {
        //select the account
        const selectOnfb = By.xpath("(//div[@class='details'])[2]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, selectOnfb, 4, 10000);
        //click on connect
        const selectOnconnect = By.xpath("//button[text()=' Auto-Generate Board']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, selectOnconnect, 4, 10000);
    })
    //check board is getting loaded
    it("Check board is able to load", async function () {
        log(':step-check board is able to load')
        await driver.sleep(longSleepDuration);
        let close = By.xpath("//button[@class='ml-auto']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, close, 10, 20000);
        const waitforboardname = By.xpath("//span[@id='board-name-input']");
        await actionWithRetry(driver, async function (element) {}, waitforboardname, 4, 2000);
        let actual_boardname = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//h1[@class='font-medium text-5xl w-full block break-words text-center text-white']"))), isTimeout).getText()
        let expected_boardname = "Facebook Ads Performance"
        assert.equal(expected_boardname, actual_boardname)
    })
    execution.forEach((item) => {
        //Verify the impression chart should be shown
        it("Verify the impression chart should be shown", async function () {
            await driver.sleep(shortSleepDuration);
            log('start verification of the impression number')
            const waitfororders = By.xpath("(//div[@class='p-0 ml-auto'])[1]");
            await actionWithRetry(driver, async function (element) {}, waitfororders, 4, 2000);
            let actual_impression = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//div[@class='p-0 ml-auto'])[1]"))), isTimeout).getText()
            let expected_impression = "Impressions"
            assert.equal(expected_impression, actual_impression)
        })
        //Verify the clicks chart should be shown
        it("Verify the clicks chart should be shown", async function () {
            log('verify the clicks chart should be shown')
            let actual_clickschart = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//div[@class='p-0 ml-auto'])[4]"))), isTimeout).getText()
            let expected_clickschart = "Clicks"
            assert.equal(expected_clickschart, actual_clickschart)
        })
        //"Verify the spend chart should be shown
        it("Verify the spend chart should be shown", async function () {
            log('verify the spend chart should be shown')
            let actual_spentchart = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//div[@class='p-0 ml-auto'])[5]"))), isTimeout).getText()
            let expected_spentchart = "Spend"
            assert.equal(expected_spentchart, actual_spentchart)
        })
        //Verify the ctr chart should be shown
        it("Verify the ctr chart should be shown", async function () {
            log('verify the ctr chart should be shown')
            let actual_ctrchart = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//div[@class='p-0 ml-auto'])[2]"))), isTimeout).getText()
            let expected_ctrchart = "CTR"
            assert.equal(expected_ctrchart, actual_ctrchart)
        })
        //verify the Best Campaigns by Spend chart
        it("Verify the Best Campaigns by Spend chart should be shown", async function () {
            log('starting verification of the Best Campaigns by Spend chart')
            let actual_chart = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//div[@class='p-0 ml-auto'])[6]"))), isTimeout).getText()
            let expected_chart = "Best Campaigns by Spend"
            assert.equal(expected_chart, actual_chart)
        })
    })
    //Verify the number format on the dashboard
    it("Verify the number format on the dashboard", async function () {
        //verify the impression
        const element1 = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//span[@class='text-3xl break-all'])[1]"))), isTimeout);
        const raw_text1 = await element1.getText();
        const actual_number1 = parseFloat(raw_text1.replace(/[^\d.]/g, ''));
        console.log("actual_number1", actual_number1);
        //verify spend number
        const element2 = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//span[@class='text-3xl break-all'])[4]"))), isTimeout);
        const raw_text2 = await element2.getText();
        const actual_number2 = parseFloat(raw_text2.replace(/[^\d.]/g, ''));
        console.log("actual_number2", actual_number2);
        //verify CTR
        const element3 = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//span[@class='text-3xl break-all'])[2]"))), isTimeout);
        const raw_text3 = await element3.getText();
        const actual_number3 = parseFloat(raw_text3.replace(/[^\d.]/g, ''));
        console.log("actual_number3", actual_number3);
        // Check if the parsed numbers are valid
        if (!isNaN(actual_number1)) {
            const decimalPlaces1 = (actual_number1.toString().split('.')[1] || []).length;
            assert(decimalPlaces1 <= 3, `Number ${actual_number1} has more than 2 decimal places`);
        } else {
            assert.fail(`Failed to parse number: ${raw_text1}`);
        }
        if (!isNaN(actual_number2)) {
            const decimalPlaces2 = (actual_number2.toString().split('.')[1] || []).length;
            assert(decimalPlaces2 <= 3, `Number ${actual_number2} has more than 2 decimal places`);
        } else {
            assert.fail(`Failed to parse number: ${raw_text3}`);
        }
        if (!isNaN(actual_number3)) {
            const decimalPlaces3 = (actual_number3.toString().split('.')[1] || []).length;
            assert(decimalPlaces3 <= 3, `Number ${actual_number3} has more than 2 decimal places`);
        } else {
            assert.fail(`Failed to parse number: ${raw_text3}`);
        }
    });
    //check board is visible on the workspace
    it("Check board is visible on the workspace", async function () {
        log(':starting check board is visible on the workspace')
        //click on polymer logo
        let clickonPolymerLogo = By.xpath("//div[@id='polymer-nav-logo']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonPolymerLogo);
        await driver.sleep(shortSleepDuration);
        //verify the board name on the workspace 
        let waitforboard = By.xpath("//span[@class='name']");
        await actionWithRetry(driver, async function (element) {}, waitforboard);
        let actual_text = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//span[@class='name']"))), isTimeout).getText();
        let expected_text = "Facebook Ads Overview"
        assert.equal(expected_text, actual_text)
    })
})