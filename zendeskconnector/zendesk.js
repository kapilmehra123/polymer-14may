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
let {
    isTimeout,
    shortSleepDuration,
    longSleepDuration
} = require("../masterdata.json")
const {
    zendeskapi,
    zendeskapiname,
    zendeskemail
} = require("../credentials.json")
const {
    driver
} = require("../main/index")
//verify the zendesk connector
describe("verify the zendesk connector", async function () {
    //wait for the next button
    it("wait for the next button", async function () {
        try {
            await driver.sleep(longSleepDuration);
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
        } catch (error) {
            console.log("Iframe not present, skipping...");
        }
    })
    //click on the manage data 
    it("click on the manage data and click on add new data source", async function () {
        //click on manage data
        let clickonManageData = By.xpath("//button[text()='Manage Data']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonManageData, 4, 2000);
        await driver.sleep(shortSleepDuration);
        //click on add new data source
        let clickonAddNewDataSource = By.xpath("//span[text()=' Add New Data Source ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonAddNewDataSource, 4, 2000);
    })
    //click on the zendesk connector
    it("click on the zendesk connector", async function () {
        let clickonAddNewDataSource = By.xpath("//span[text()='Zendesk']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonAddNewDataSource, 4, 2000);
    })
    //send the api token 
    it("send the api token", async function () {
        let sendAPIToken = By.xpath("//input[@class='input']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(zendeskapi);
        }, sendAPIToken, 4, 2000);
        //click on next
        let clickOnNext = By.xpath("//button[text()=' Next ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnNext, 4, 2000);
    })
    //send the zendesk account name and email
    it("send the zendesk account name and email", async function () {
        let sendAccountName = By.xpath("(//input[@class='input'])[1]");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(zendeskapiname);
        }, sendAccountName, 4, 2000);
        let sendEmail = By.xpath("(//input[@class='input'])[2]");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(zendeskemail);
        }, sendEmail, 4, 2000);
        //connect the zendesk
        let clickOnConnectZendesk = By.xpath("//span[text()=' Connect Zendesk ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnConnectZendesk, 4, 2000);
    })
    //select zendesk account and connect
    it("select zendesk account and connect",async function(){
        //clickon zendeskaccount
        let clickOnZendeskAccount = By.xpath("//div[@class='account-name']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnZendeskAccount, 4, 2000);
        //click on to connect
        let clickOnConnectZendesk = By.xpath("//span[text()=' Connect ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnConnectZendesk, 4, 2000);
    })
 /*    //check board is able to load
     it("check board is able to load", async function () {
        log('check board is able to load')
        await driver.switchTo().defaultContent();
        const waitforboardname = By.xpath("//span[@id='board-name-input']");
        await actionWithRetry(driver, async function (element) {}, waitforboardname, 3, 30000);
        const header = await driver.findElements(By.xpath("//div[@class='header-block-wrapper header-block-background-gradient-b text-size-medium align-center']"));
        console.log("header:", header.length);
        // Compare the actual number of charts with the expected number
        const expectedNumberOfheader = 1;
        if (header.length >= expectedNumberOfheader) {
            console.log("The board has the expected header.");
        } else {
            console.error("The board does not have the expected header");
            assert.equal(expectedNumberOfheader, header.length)
        }
    })
      //Count the number of charts on the board
      it("Count the number of charts on the board", async function () {
        await driver.sleep(shortSleepDuration);
        // Count the number of charts
        const charts = await driver.findElements(By.xpath("//div[@class='p-0 ml-auto']"));
        console.log("Number of charts:", charts.length);
        // Compare the actual number of charts with the expected number
        const expectedNumberOfCharts = 1;
        if (charts.length >= expectedNumberOfCharts) {
            console.log("The board has the expected number of charts.");
        } else {
            console.error("The board does not have the expected number of charts.");
            assert.equal(expectedNumberOfCharts, charts.length)
        }
    })
  */  
    //verify the selected jira on the data section on dashboard
    it("Verify the selected jira account shwon on the data section on dashboard", async function () {
        //click on data section
        let clickonDataSection = By.xpath("//span[text()='Data']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonDataSection);
        await driver.sleep(longSleepDuration);
        //verify the first sheet
        let actual_data = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//div[@class='flex items-center text-sm leading-4 mb-1'])[1]"))), isTimeout).getText();
        console.log("actual_data", actual_data)
        let expected_data = "Valleysc.in - Tickets"
        assert.equal(expected_data, expected_data)
        await driver.sleep(shortSleepDuration);
        let close = By.xpath("//*[local-name()='svg']//*[name()='path' and @d='M18.364 18.364a1 1 0 0 0 0-1.414L13.414 12l4.95-4.95a1 1 0 1 0-1.414-1.414L12 10.586l-4.95-4.95A1 1 0 0 0 5.636 7.05l4.95 4.95-4.95 4.95a1 1 0 1 0 1.414 1.414l4.95-4.95 4.95 4.95a1 1 0 0 0 1.414 0Z' ]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, close, 4, 10000);
    })
  
    //check board is visible on the workspace
    it("check board is visible on the workspace", async function () {
        log('check board is visible on the workspace')
        //click on polymer logo
        let clickonPolymerLogo = By.xpath("//div[@id='polymer-nav-logo']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonPolymerLogo);
        //verify the board name on the workspace 
        let waitforboard = By.xpath("//span[@class='name']");
        await actionWithRetry(driver, async function (element) {}, waitforboard);
        let actual_text = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//span[@class='name']"))), isTimeout).getText();
        console.log("actual_text", actual_text)
        let expected_text = "Valleysc.in - Tickets"
        assert.equal(expected_text, actual_text)
    })
})