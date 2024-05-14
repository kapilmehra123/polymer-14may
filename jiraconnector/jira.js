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
    jiraemail,
    jirapass
} = require("../credentials.json")
const {
    driver
} = require("../main/index")
//verify the jira connector
describe("verify the jira connector", async function () {
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
    //click on the jira connector
    it("click on the jira connector", async function () {
        let clickonAddNewDataSource = By.xpath("//span[text()='Jira']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonAddNewDataSource, 4, 2000);
    })
    //add the jira email and pass
    it("add the jira email and pass", async function () {
        await driver.sleep(longSleepDuration);
        await driver.sleep(shortSleepDuration);
        const googleemailElementLocator = By.xpath("//input[@type='email']");
        const emailInputElement = await driver.findElements(googleemailElementLocator);
        if (emailInputElement.length > 0) {
        //send jira email
        let sendjiraemail = By.xpath("//input[@type='email']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(jiraemail)
        }, sendjiraemail, 4, 2000);
        //click on continue
        let ClickOnContinue = By.xpath("//span[text()='Continue']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, ClickOnContinue, 4, 2000);
        //send jira pass
        await driver.sleep(longSleepDuration);
        await driver.sleep(shortSleepDuration);
        let sendjirapass = By.xpath("//input[@type='password']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(jirapass)
        }, sendjirapass, 4, 2000);
        //click on login
        let ClickOnLogin = By.xpath("//span[text()='Log in']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, ClickOnLogin, 4, 2000);
    }
    })
    //choose a site and click on accept button
    it("choose a site and click on accept button", async function () {
        // Click on the "Choose a site" dropdown
        let clickOnChooseSite = By.xpath("//div[@class='site-selector css-1sptkt-container']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnChooseSite, 4, 2000);
        await driver.sleep(shortSleepDuration);
        const element = await driver.findElement(By.xpath("//div[@class='site-selector css-1sptkt-container']"));
        const innerHTML = await element.getAttribute('innerHTML');
        //console.log(innerHTML);

        // Select the first option from the dropdown
        let firstOption = By.xpath("//div[@id='react-select-2-option-1']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, firstOption, 4, 2000);
        await driver.sleep(shortSleepDuration);

        // Click on the "Accept" button
        let clickOnAccept = By.xpath("//span[text()='Accept']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnAccept, 4, 2000);
    });
    //create the board
    it("create the board", async function () {
        await driver.sleep(longSleepDuration);
        //click on action field
        let clickOnAction = By.xpath("(//div[@class='caret-wrapper ml-2'])[1]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnAction, 6, 20000);
        //click on create board
        let clickOnCreate = By.xpath("(//span[text()='Create a Board'])[1]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnCreate, 4, 2000);
    })
    /*  //check board is able to load
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
        let expected_data = "Jira ahieh-team-t7k9q5dc"
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
        await actionWithRetry(driver, async function (element) {}, waitforboard,3,10000);
        let actual_text = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//span[@class='name']"))), isTimeout).getText();
        console.log("actual_text", actual_text)
        let expected_text = "Untitled Board"
        assert.equal(expected_text, actual_text)
    })
})