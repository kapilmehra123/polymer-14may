const {
    By,
    until,
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
let {
    isTimeout,
    shortSleepDuration,
    longSleepDuration
} = require("../masterdata.json")
const {
    googlemail,
    googlepass,
    xlsfilename,
    excelfilename
} = require("../credentials.json")
//verify the google sheet connectors
describe("verify the google sheet connectors", async function () {
    //Click on google sheet
    it("Click on google sheet", async function () {
        log('Click on google sheet')
        await driver.sleep(shortSleepDuration);
        //click on google sheet
        const clickOnGoogleSheet = By.xpath("//div[text()='Google Sheets']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnGoogleSheet, 4, 1000);
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
            //click on continue
            const clickOnContinuea = By.xpath("//span[text()='Continue']");
            await actionWithRetry(driver, async function (element) {
                await element.click();
            }, clickOnContinuea, 4, 1000);
        }
        await driver.sleep(longSleepDuration)
    })
    //select the google sheet
    it("Select the excel sheet", async function () {
        log('Select the excel sheet')
        await driver.sleep(longSleepDuration)
        const waitiframe = By.xpath("(//iframe)[4]");
        await actionWithRetry(driver, async function (element) {}, waitiframe, 4, 10000);
        // Find the iframe element
        const iframe = await driver.findElement(By.xpath("(//iframe)[4]"));
        // Switch Selenium's focus to the iframe
        await driver.switchTo().frame(iframe);
        await driver.sleep(shortSleepDuration)
        const searchSheet = By.xpath("//input[@aria-label='Search terms']");
        await actionWithRetry(driver, async function (element) {
            await element.sendKeys(excelfilename, Key.ENTER)
        }, searchSheet, 4, 30000);
        await driver.sleep(shortSleepDuration)
        await driver.sleep(longSleepDuration)
        //click on sheets
        const clcikOnSheets = By.xpath("(//div[@class='drive-resize-viewport-content '])[2]//div[@class='drive-grid-tile-container drive-drop-target']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clcikOnSheets, 4, 1000);
        //click on select
        const clickOnSelect = By.xpath("(//div[text()='Select'])[2]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnSelect, 4, 1000);
    })
    //Select the sheets you wish to connect
    it("Select the sheets you wish to connect", async function () {
        log(':Select the sheets you wish to connect')
        await driver.sleep(longSleepDuration);
        await driver.switchTo().defaultContent();
        let clickOnSelectsheet1 = By.xpath("(//div[@class='polymer-checkbox'])[1]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnSelectsheet1, 4, 20000);
        let clickOnSelectsheet2 = By.xpath("(//div[@class='polymer-checkbox'])[2]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnSelectsheet2, 2, 20000);
        //click on to import sheet
        let clickOnImportsheet = By.xpath("//span[text()=' Import Sheets ']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickOnImportsheet, 4, 2000);
    })
    //check board is able to load
    it("Check board is able to load", async function () {
        log('Check board is able to load')
        await driver.sleep(longSleepDuration);
        await driver.switchTo().defaultContent();
        const waitforboardname = By.xpath("//span[@id='board-name-input']");
        await actionWithRetry(driver, async function (element) {}, waitforboardname, 8, 30000);
        //click on the close icon
        let close = By.xpath("//button[@class='ml-auto']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, close, 4, 10000);
    })
    /*
    //verify the selected sheet on the data section on dashboard
    it("Verify the selected sheet on the data section on dashboard", async function () {
        log('Verify the selected sheet on the data section on dashboard')
        //click on data section
        let clickonDataSection = By.xpath("//span[text()='Data']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonDataSection);
        await driver.sleep(shortSleepDuration);
        //verify the first sheet
        let actual_firstsheet = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//div[@class='flex items-center text-sm leading-4 mb-1'])[1]"))), isTimeout).getText();
        console.log("actual_firstsheet", actual_firstsheet)
        let expected_firstsheet = "Test cases_Polymer.xlsx - Low level Scenario"
        assert.equal(expected_firstsheet, actual_firstsheet)
        await driver.sleep(shortSleepDuration);
        //click on second driver
        let clickonsecondDriverIcon = By.xpath("(//div[@class='source-icon --filePicker'])[2]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonsecondDriverIcon);
        //verify the second sheet
        let actual_secondsheet = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//div[@class='flex items-center text-sm leading-4 mb-1'])[1]"))), isTimeout).getText();
        console.log("actual_secondsheet", actual_secondsheet)
        let expected_secondsheet = "Test cases_Polymer.xlsx - High level Scenarios"
        assert.equal(expected_secondsheet, actual_secondsheet)
        let close = By.xpath("//*[local-name()='svg']//*[name()='path' and @d='M18.364 18.364a1 1 0 0 0 0-1.414L13.414 12l4.95-4.95a1 1 0 1 0-1.414-1.414L12 10.586l-4.95-4.95A1 1 0 0 0 5.636 7.05l4.95 4.95-4.95 4.95a1 1 0 1 0 1.414 1.414l4.95-4.95 4.95 4.95a1 1 0 0 0 1.414 0Z' ]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, close, 4, 10000);
    })
    //verify selected sheet on the user workspace board
    it("verify selected sheet on the user workspace board", async function () {
        //click on polymer logo
        let clickonPolymerLogo = By.xpath("//div[@id='polymer-nav-logo']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonPolymerLogo, 3, 10000);
        await driver.sleep(6000);
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
        let waitforboard = By.xpath("(//span[@class='source-name'])[4]");
        await actionWithRetry(driver, async function (element) {}, waitforboard, 3, 10000);
        //click on driver icon
        let clickonDriverIcon = By.xpath("(//span[@class='source cursor-pointer --filePicker'])[1]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonDriverIcon);
        await driver.sleep(2000);
        //verify the first sheet
        let actual_firstsheet = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//div[@class='flex items-center text-sm leading-4 mb-1'])[1]"))), isTimeout).getText();
        console.log("actual_firstsheet", actual_firstsheet)
        let expected_firstsheet = execution[0].verify_google_sheet_xlsfile[0].verification[0].sheet1
        assert.equal(expected_firstsheet, actual_firstsheet)
        await driver.sleep(1000);
        //click on second driver
        let clickonsecondDriverIcon = By.xpath("(//div[@class='source-icon --filePicker'])[2]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonsecondDriverIcon);
        await driver.sleep(1000);
        //verify the second sheet
        let actual_secondsheet = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//div[@class='flex items-center text-sm leading-4 mb-1'])[1]"))), isTimeout).getText();
        console.log("actual_secondsheet", actual_secondsheet)
        let expected_secondsheet = execution[0].verify_google_sheet_xlsfile[0].verification[0].sheet2
        assert.equal(expected_secondsheet, actual_secondsheet)
        let close = By.xpath("//*[local-name()='svg']//*[name()='path' and @d='M18.364 18.364a1 1 0 0 0 0-1.414L13.414 12l4.95-4.95a1 1 0 1 0-1.414-1.414L12 10.586l-4.95-4.95A1 1 0 0 0 5.636 7.05l4.95 4.95-4.95 4.95a1 1 0 1 0 1.414 1.414l4.95-4.95 4.95 4.95a1 1 0 0 0 1.414 0Z' ]");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, close, 4, 10000);
    })
   */ 
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
    
    //check board is visible on the workspace
    it("Check board is visible on the workspace", async function () {
        log('Check board is visible on the workspace')
        //click on polymer logo
        let clickonPolymerLogo = By.xpath("//div[@id='polymer-nav-logo']");
        await actionWithRetry(driver, async function (element) {
            await element.click();
        }, clickonPolymerLogo);
        //verify the board name on the workspace 
        let waitforboard = By.xpath("(//span[@class='source-name'])[4]");
        await actionWithRetry(driver, async function (element) {}, waitforboard);
       // let actual_text = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("(//span[@class='source-name'])[4]"))), isTimeout).getText();
       // let expected_text = xlsfilename
       // assert.equal(expected_text, actual_text)
    })
})