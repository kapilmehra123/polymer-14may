const {
  Builder
} = require("selenium-webdriver");
const {
  By
} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const {
  baseUrl
} = require("../credentials.json");
const parser = require('yargs-parser');
const nodemailer = require('nodemailer');
const {
  JSDOM
} = require('jsdom');
const {
  after
} = require('mocha');
let driver
let options = new chrome.Options();
//options.addArguments("--incognito");
options.addArguments('--disable-notifications');
driver = new Builder().forBrowser("chrome").setChromeOptions(options).build();
const connectorData = require('../connector.json');
// Create directory for screenshots
const screenshotDir = path.join(__dirname, '../mochawesome-reports/screenshots/');
console.log("Screenshot directory:", screenshotDir);
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir);
}
// Capture screenshots for failed test cases
async function captureScreenshot(testTitle) {
  const screenshotPath = `${screenshotDir}${testTitle.replace(/\s+/g, '_').toLowerCase()}.png`;
  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync(screenshotPath, screenshot, 'base64');
  console.log(`Screenshot saved: ${screenshotPath}`);
}
// Test suite
describe("P1:Open the URL and run all test cases", function () {
  it("Open the URL and maximize browser", async function () {
    await driver.manage().window().maximize();
    await driver.get(baseUrl);
  });
  let signupModule;
  //set the command line argument
  const args = parser(process.argv.slice(2), {
    alias: {
      t: 'paidType',
      m: 'signupMethod',
      s: 'source'
    },
    default: {
      paidType: '',
      signupMethod: '',
      source: ''
    }
  });
  const paidType = args.paidType;
  const signupMethod = args.signupMethod;
  const source = args.source;
  console.log("paidType:", paidType);
  console.log("signupMethod:", signupMethod)
  console.log("source:", source)
  if (paidType || signupMethod || source) {
    switch (paidType) {
      //non paid funnel
      case "nonpaidfunnel":
        console.log("paidType1", paidType)
        //verify the all sign up
        it("Start other test cases", async function () {
          switch (signupMethod) {
            case "email":
              signupModule = require('../SignUp/emailsignup');
              break;
            case "google":
              signupModule = require('../SignUp/googlesignup');
              break;
            case "facebook":
              signupModule = require('../SignUp/facebooksignup');
              break;
            default:
              throw new Error(`Invalid signup method: ${signupMethod}`);
          }
          // Now handle the source argument
          let sourceModule;
          switch (source) {
            case "csvupload":
              sourceModule = require('../Board/csvfileupload');
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "xlsupload":
              sourceModule = require('../Board/xlsfileupload');
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "shopify":
              sourceModule = require('../Shopify/verifyshopify')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "facebookads":
              sourceModule = require('../facebookads/facebookads')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "googlesheet":
              sourceModule = require('../googleconnectors/googlesheet')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "googlesheetxlsfile":
              sourceModule = require('../googleconnectors/googlesheetxlsupload')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "googledrive":
              sourceModule = require('../googleconnectors/googledrive')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "googledrivexlsfile":
              sourceModule = require('../googleconnectors/googledrivexlsupload')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "trialexpirepopup":
              if (signupMethod === "email") {
                sourceModule = require('../trialexpire/trialexpirewithemail');
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../trialexpire/trialexpirewithgmail');
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../trialexpire/trialexpirewithfacebook');
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "googleads":
              sourceModule = require('../googleconnectors/googleads')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "linear":
              sourceModule = require('../lineardataconnector/linear')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "dropbox":
              sourceModule = require('../dropboxconnetor/dropbox')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "jira":
              sourceModule = require('../Board/csvfileupload');
              sourceModule = require('../jiraconnector/jira')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "zendesk":
              sourceModule = require('../Board/csvfileupload');
              sourceModule = require('../zendeskconnector/zendesk')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "facebookadstemplate":
              sourceModule = require('../Board/csvfileupload');
              sourceModule = require('../templatefromworkspace/facebookads')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "lineartemplate":
              sourceModule = require('../Board/csvfileupload');
              sourceModule = require('../templatefromworkspace/linear')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            default:
              throw new Error(`Invalid source argument: ${source}`);
          }
        });
        break;
        //paid funnel
      case "paidfunnel":
        //verify the all sign up
        it("Start other test cases", async function () {
          switch (signupMethod) {
            case "email":
              signupModule = require('../SignUpForPaidFunnel/emailpaidsignup');
              break;
            case "google":
              signupModule = require('../SignUpForPaidFunnel/googlepaidsignup');
              break;
            case "facebook":
              signupModule = require('../SignUpForPaidFunnel/facebookpaidsignup');
              break;
            default:
              throw new Error(`Invalid signup method: ${signupMethod}`);
          }
          // Now handle the source argument
          let sourceModule;
          switch (source) {
            case "csvupload":
              sourceModule = require('../Board/csvfileupload');
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "xlsupload":
              sourceModule = require('../Board/xlsfileupload');
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "shopify":
              sourceModule = require('../Shopify/verifyshopify')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "facebookads":
              sourceModule = require('../facebookads/facebookads')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "googlesheet":
              sourceModule = require('../googleconnectors/googlesheet')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "googlesheetxlsfile":
              sourceModule = require('../googleconnectors/googlesheetxlsupload')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "googledrive":
              sourceModule = require('../googleconnectors/googledrive')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "googledrivexlsfile":
              sourceModule = require('../googleconnectors/googledrivexlsupload')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "linear":
              sourceModule = require('../lineardataconnector/linear')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "dropbox":
              sourceModule = require('../dropboxconnetor/dropbox')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "jira":
              sourceModule = require('../Board/csvfileupload');
              sourceModule = require('../jiraconnector/jira')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "zendesk":
              sourceModule = require('../Board/csvfileupload');
              sourceModule = require('../zendeskconnector/zendesk')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "facebookadstemplate":
              sourceModule = require('../Board/csvfileupload');
              sourceModule = require('../templatefromworkspace/facebookads')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            case "lineartemplate":
              sourceModule = require('../Board/csvfileupload');
              sourceModule = require('../templatefromworkspace/linear')
              if (signupMethod === "email") {
                sourceModule = require('../deleteaccount/deleteemailaccount');
              } else if (signupMethod === "google") {
                sourceModule = require('../deleteaccount/deletegoogleaccount');
              } else if (signupMethod === "facebook") {
                sourceModule = require('../deleteaccount/deletefacebbokaccount');
              }
              break;
            default:
              throw new Error(`Invalid source argument: ${source}`);
          }
        });
        break;
      default:
        console.error("Invalid paidType argument. Please provide either 'withoutpaidfunnel' or 'withpaidfunnel'.");
        process.exit(1);
    }
    if (signupMethod !== "email" && signupMethod !== "google" && signupMethod !== "facebook") {
      console.error("Invalid signupMethod argument. Please provide either 'email', 'google', or 'facebook'.");
      process.exit(1);
    }
    if (source !== "csvupload" && source !== "shopify" && source !== "facebookads" && source !== "googlesheet" && source !== "googlesheetxlsfile" && source !== "googledrive" && source !== "googledrivexlsfile" && source !== "trialexpirepopup" && source !== "xlsupload" && source !== "googleads" && source !== "linear" && source !== "dropbox" && source !== "jira" && source !== "zendesk" && source !== "facebookadstemplate" && source !== "lineartemplate") {
      console.error("Invalid source argument. Please provide a valid source 'csvupload','shopify','facebookads','googlesheet','googlesheetxlsfile','googledrive','googledrivexlsfile','trialexpirepopup','xlsupload','googleads','linear','dropbox'", 'jira', 'zendesk', 'facebookadstemplate', 'lineartemplate');
      process.exit(1);
    }
    // Capture screenshot on test failure
    afterEach(async function () {
      // Check if the test case failed
      if (this.currentTest.state === 'failed') {
        // Capture and save screenshot
        await captureScreenshot(this.currentTest.title);
      }
    });
  } else {
    //run the all connector
    // Iterate over each connector data
    connectorData.cases.forEach((connectorCase, index) => {
      const {
        paidtype,
        signupMethod,
        source
      } = connectorCase;
      // Define the test case dynamically
      it(`Onboarding - ${index + 1}: ${signupMethod} Signup with ${source}`, async function () {
        switch (paidtype) {
          case "nonpaidfunnel":
            // Handle non-paid funnel scenarios
            switch (source) {
              case "csvupload":
                if (signupMethod === "email") {
                  const {
                    emailsignup
                  } = require('../SignUp/emailsignup');
                  const {
                    verifycsvfile
                  } = require('../Board/csvfileupload');
                  const {
                    deleteemail1
                  } = require('../deleteaccount/deleteemailaccount');
                  delete require.cache[require.resolve('../SignUp/emailsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                  delete require.cache[require.resolve('../Board/csvfileupload')];
                } else if (signupMethod === "google") {
                  const {
                    googlesignup
                  } = require('../SignUp/googlesignup');
                  const {
                    verifycsvfile1
                  } = require('../Board/csvfileupload');
                  const {
                    deletegoogleaccount
                  } = require('../deleteaccount/deletegoogleaccount');
                  delete require.cache[require.resolve('../SignUp/googlesignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                  delete require.cache[require.resolve('../Board/csvfileupload')];
                } else if (signupMethod === "facebook") {
                  const {
                    facebooksignup
                  } = require('../SignUp/facebooksignup');
                  const {
                    verifycsvfile12
                  } = require('../Board/csvfileupload');
                  const {
                    deletefacebookaccount
                  } = require('../deleteaccount/deletefacebbokaccount');
                  delete require.cache[require.resolve('../SignUp/facebooksignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                  delete require.cache[require.resolve('../Board/csvfileupload')];
                }
                break;
              case "xlsupload":
                if (signupMethod === "email") {
                  const {
                    email_signup
                  } = require('../SignUp/emailsignup');
                  const {
                    verify_xlsfile
                  } = require('../Board/xlsfileupload');
                  const {
                    delete_email1
                  } = require('../deleteaccount/deleteemailaccount');
                  delete require.cache[require.resolve('../SignUp/emailsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                  delete require.cache[require.resolve('../Board/xlsfileupload')];
                } else if (signupMethod === "google") {
                  const {
                    google_signup
                  } = require('../SignUp/googlesignup');
                  const {
                    verify_xlsfile1
                  } = require('../Board/xlsfileupload');
                  const {
                    deletegoogle_account
                  } = require('../deleteaccount/deletegoogleaccount');
                  delete require.cache[require.resolve('../SignUp/googlesignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                  delete require.cache[require.resolve('../Board/xlsfileupload')];
                } else if (signupMethod === "facebook") {
                  const {
                    facebook_signup
                  } = require('../SignUp/facebooksignup');
                  const {
                    verifycsv_file12
                  } = require('../Board/xlsfileupload');
                  const {
                    deletefacebook_account
                  } = require('../deleteaccount/deletefacebbokaccount');
                  delete require.cache[require.resolve('../SignUp/facebooksignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                  delete require.cache[require.resolve('../Board/xlsfileupload')];
                }
                break;
              case "googlesheet":
                if (signupMethod === "email") {
                  const {
                    emailsignup1
                  } = require('../SignUp/emailsignup');
                  const {
                    googlesheet
                  } = require('../googleconnectors/googlesheet');
                  const {
                    deleteemail2
                  } = require('../deleteaccount/deleteemailaccount');
                  delete require.cache[require.resolve('../SignUp/emailsignup')];
                  delete require.cache[require.resolve('../googleconnectors/googlesheet')];
                  delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                } else if (signupMethod === "google") {
                  const {
                    googlesignup1
                  } = require('../SignUp/googlesignup');
                  const {
                    verifygooglesheet
                  } = require('../googleconnectors/googlesheet');
                  const {
                    deletegoogleaccount1
                  } = require('../deleteaccount/deletegoogleaccount');
                  delete require.cache[require.resolve('../SignUp/googlesignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                  delete require.cache[require.resolve('../googleconnectors/googlesheet')];
                } else if (signupMethod === "facebook") {
                  const {
                    facebooksignup1
                  } = require('../SignUp/facebooksignup');
                  const {
                    verifygooglesheet1
                  } = require('../googleconnectors/googlesheet');
                  const {
                    deletefacebookaccount1
                  } = require('../deleteaccount/deletefacebbokaccount');
                  delete require.cache[require.resolve('../SignUp/facebooksignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                  delete require.cache[require.resolve('../googleconnectors/googlesheet')];
                }
                break;
              case "facebookads":
                if (signupMethod === "email") {
                  const {
                    emailsignup2
                  } = require('../SignUp/emailsignup');
                  const {
                    facebookads
                  } = require('../facebookads/facebookads');
                  const {
                    deleteemail3
                  } = require('../deleteaccount/deleteemailaccount');
                  delete require.cache[require.resolve('../SignUp/emailsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                  delete require.cache[require.resolve('../facebookads/facebookads')]
                } else if (signupMethod === "google") {
                  const {
                    googlesignup3
                  } = require('../SignUp/googlesignup');
                  const {
                    facebookads2
                  } = require('../facebookads/facebookads');
                  const {
                    deletegoogleaccount2
                  } = require('../deleteaccount/deletegoogleaccount');
                  delete require.cache[require.resolve('../SignUp/googlesignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                  delete require.cache[require.resolve('../facebookads/facebookads')];
                } else if (signupMethod === "facebook") {
                  const {
                    facebooksignup2
                  } = require('../SignUp/facebooksignup');
                  const {
                    facebookads3
                  } = require('../facebookads/facebookads');
                  const {
                    deletefacebookaccount3
                  } = require('../deleteaccount/deletefacebbokaccount');
                  delete require.cache[require.resolve('../SignUp/facebooksignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                  delete require.cache[require.resolve('../facebookads/facebookads')];
                }
                break;
              case "shopify":
                if (signupMethod === "email") {
                  const {
                    emailsignup3
                  } = require('../SignUp/emailsignup');
                  const {
                    shopify
                  } = require('../Shopify/verifyshopify');
                  const {
                    deleteemail4
                  } = require('../deleteaccount/deleteemailaccount');
                  delete require.cache[require.resolve('../SignUp/emailsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                  delete require.cache[require.resolve('../Shopify/verifyshopify')]
                } else if (signupMethod === "google") {
                  const {
                    googlesignup4
                  } = require('../SignUp/googlesignup');
                  const {
                    facebookads4
                  } = require('../Shopify/verifyshopify');
                  const {
                    deletegoogleaccount3
                  } = require('../deleteaccount/deletegoogleaccount');
                  delete require.cache[require.resolve('../SignUp/googlesignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                  delete require.cache[require.resolve('../Shopify/verifyshopify')];
                } else if (signupMethod === "facebook") {
                  const {
                    facebooksignup5
                  } = require('../SignUp/facebooksignup');
                  const {
                    facebookads5
                  } = require('../Shopify/verifyshopify');
                  const {
                    deletefacebookaccount5
                  } = require('../deleteaccount/deletefacebbokaccount');
                  delete require.cache[require.resolve('../SignUp/facebooksignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                  delete require.cache[require.resolve('../Shopify/verifyshopify')];
                }
                break;
              case "linear":
                if (signupMethod === "email") {
                  const {
                    email_signup3
                  } = require('../SignUp/emailsignup');
                  const {
                    linear
                  } = require('../lineardataconnector/linear');
                  const {
                    deleteemail5
                  } = require('../deleteaccount/deleteemailaccount');
                  delete require.cache[require.resolve('../SignUp/emailsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                  delete require.cache[require.resolve('../lineardataconnector/linear')]
                } else if (signupMethod === "google") {
                  const {
                    googlesignup5
                  } = require('../SignUp/googlesignup');
                  const {
                    linear1
                  } = require('../lineardataconnector/linear');
                  const {
                    deletegoogleaccount4
                  } = require('../deleteaccount/deletegoogleaccount');
                  delete require.cache[require.resolve('../SignUp/googlesignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                  delete require.cache[require.resolve('../lineardataconnector/linear')];
                } else if (signupMethod === "facebook") {
                  const {
                    facebooksignup6
                  } = require('../SignUp/facebooksignup');
                  const {
                    linear2
                  } = require('../lineardataconnector/linear');
                  const {
                    deletefacebookaccount6
                  } = require('../deleteaccount/deletefacebbokaccount');
                  delete require.cache[require.resolve('../SignUp/facebooksignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                  delete require.cache[require.resolve('../lineardataconnector/linear')];
                }
                break;
              case "dropbox":
                if (signupMethod === "email") {
                  const {
                    email_signup4
                  } = require('../SignUp/emailsignup');
                  const {
                    dropbox
                  } = require('../dropboxconnetor/dropbox');
                  const {
                    deleteemail6
                  } = require('../deleteaccount/deleteemailaccount');
                  delete require.cache[require.resolve('../SignUp/emailsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                  delete require.cache[require.resolve('../dropboxconnetor/dropbox')]
                } else if (signupMethod === "google") {
                  const {
                    googlesignup6
                  } = require('../SignUp/googlesignup');
                  const {
                    dropbox1
                  } = require('../dropboxconnetor/dropbox');
                  const {
                    deletegoogleaccount5
                  } = require('../deleteaccount/deletegoogleaccount');
                  delete require.cache[require.resolve('../SignUp/googlesignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                  delete require.cache[require.resolve('../dropboxconnetor/dropbox')];
                } else if (signupMethod === "facebook") {
                  const {
                    facebooksignup7
                  } = require('../SignUp/facebooksignup');
                  const {
                    dropbox2
                  } = require('../dropboxconnetor/dropbox');
                  const {
                    deletefacebookaccount7
                  } = require('../deleteaccount/deletefacebbokaccount');
                  delete require.cache[require.resolve('../SignUp/facebooksignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                  delete require.cache[require.resolve('../dropboxconnetor/dropbox')];
                }
                break;
              case "jira":
                if (signupMethod === "email") {
                  const {
                    email_signup5
                  } = require('../SignUp/emailsignup');
                  const {
                    verifycsvfile2
                  } = require('../Board/csvfileupload');
                  const {
                    jira
                  } = require('../jiraconnector/jira');
                  const {
                    deleteemail7
                  } = require('../deleteaccount/deleteemailaccount');
                  delete require.cache[require.resolve('../SignUp/emailsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                  delete require.cache[require.resolve('../jiraconnector/jira')]
                  delete require.cache[require.resolve('../Board/csvfileupload')]
                } else if (signupMethod === "google") {
                  const {
                    googlesignup7
                  } = require('../SignUp/googlesignup');
                  const {
                    verifycsvfile3
                  } = require('../Board/csvfileupload');
                  const {
                    jira1
                  } = require('../jiraconnector/jira');
                  const {
                    deletegoogleaccount6
                  } = require('../deleteaccount/deletegoogleaccount');
                  delete require.cache[require.resolve('../SignUp/googlesignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                  delete require.cache[require.resolve('../jiraconnector/jira')];
                  delete require.cache[require.resolve('../Board/csvfileupload')]
                } else if (signupMethod === "facebook") {
                  const {
                    facebooksignup8
                  } = require('../SignUp/facebooksignup');
                  const {
                    verifycsvfile4
                  } = require('../Board/csvfileupload');
                  const {
                    jira2
                  } = require('../jiraconnector/jira');
                  const {
                    deletefacebookaccount8
                  } = require('../deleteaccount/deletefacebbokaccount');
                  delete require.cache[require.resolve('../SignUp/facebooksignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                  delete require.cache[require.resolve('../jiraconnector/jira')];
                  delete require.cache[require.resolve('../Board/csvfileupload')]
                }
                break;
              case "zendesk":
                if (signupMethod === "email") {
                  const {
                    email_signup6
                  } = require('../SignUp/emailsignup');
                  const {
                    verifycsvfile6
                  } = require('../Board/csvfileupload');
                  const {
                    zendesk
                  } = require('../zendeskconnector/zendesk');
                  const {
                    deleteemail7
                  } = require('../deleteaccount/deleteemailaccount');
                  delete require.cache[require.resolve('../SignUp/emailsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                  delete require.cache[require.resolve('../zendeskconnector/zendesk')]
                  delete require.cache[require.resolve('../Board/csvfileupload')]
                } else if (signupMethod === "google") {
                  const {
                    googlesignup8
                  } = require('../SignUp/googlesignup');
                  const {
                    verifycsvfile5
                  } = require('../Board/csvfileupload');
                  const {
                    zendesk2
                  } = require('../zendeskconnector/zendesk');
                  const {
                    deletegoogleaccount7
                  } = require('../deleteaccount/deletegoogleaccount');
                  delete require.cache[require.resolve('../SignUp/googlesignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                  delete require.cache[require.resolve('../zendeskconnector/zendesk')];
                  delete require.cache[require.resolve('../Board/csvfileupload')]
                } else if (signupMethod === "facebook") {
                  const {
                    facebooksignup9
                  } = require('../SignUp/facebooksignup');
                  const {
                    verifycsvfile5
                  } = require('../Board/csvfileupload');
                  const {
                    zendesk3
                  } = require('../zendeskconnector/zendesk');
                  const {
                    deletefacebookaccount9
                  } = require('../deleteaccount/deletefacebbokaccount');
                  delete require.cache[require.resolve('../SignUp/facebooksignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                  delete require.cache[require.resolve('../zendeskconnector/zendesk')];
                  delete require.cache[require.resolve('../Board/csvfileupload')]
                }
                break;
                case "facebookadstemplate":
                  if (signupMethod === "email") {
                    const {
                      email_signup7
                    } = require('../SignUp/emailsignup');
                    const {
                      verifycsvfile7
                    } = require('../Board/csvfileupload');
                    const {
                      facebookadstemplate
                    } = require('../templatefromworkspace/facebookads');
                    const {
                      deleteemail8
                    } = require('../deleteaccount/deleteemailaccount');
                    delete require.cache[require.resolve('../SignUp/emailsignup')];
                    delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                    delete require.cache[require.resolve('../templatefromworkspace/facebookads')]
                    delete require.cache[require.resolve('../Board/csvfileupload')]
                  } else if (signupMethod === "google") {
                    const {
                      googlesignup9
                    } = require('../SignUp/googlesignup');
                    const {
                      verifycsvfile17
                    } = require('../Board/csvfileupload');
                    const {
                      facebookadstemplate1
                    } = require('../templatefromworkspace/facebookads');
                    const {
                      deletegoogleaccount10
                    } = require('../deleteaccount/deletegoogleaccount');
                    delete require.cache[require.resolve('../SignUp/googlesignup')];
                    delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                    delete require.cache[require.resolve('../templatefromworkspace/facebookads')];
                    delete require.cache[require.resolve('../Board/csvfileupload')]
                  } else if (signupMethod === "facebook") {
                    const {
                      facebooksignup10
                    } = require('../SignUp/facebooksignup');
                    const {
                      verifycsvfile15
                    } = require('../Board/csvfileupload');
                    const {
                      facebookadstemplate2
                    } = require('../templatefromworkspace/facebookads');
                    const {
                      deletefacebookaccount10
                    } = require('../deleteaccount/deletefacebbokaccount');
                    delete require.cache[require.resolve('../SignUp/facebooksignup')];
                    delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                    delete require.cache[require.resolve('../templatefromworkspace/facebookads')];
                    delete require.cache[require.resolve('../Board/csvfileupload')]
                  }
                  break;
                  case "lineartemplate":
                    if (signupMethod === "email") {
                      const {
                        email_signup8
                      } = require('../SignUp/emailsignup');
                      const {
                        verifycsvfile8
                      } = require('../Board/csvfileupload');
                      const {
                        linearstemplate
                      } = require('../templatefromworkspace/linear');
                      const {
                        deleteemail9
                      } = require('../deleteaccount/deleteemailaccount');
                      delete require.cache[require.resolve('../SignUp/emailsignup')];
                      delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                      delete require.cache[require.resolve('../templatefromworkspace/linear')]
                      delete require.cache[require.resolve('../Board/csvfileupload')]
                    } else if (signupMethod === "google") {
                      const {
                        googlesignup10
                      } = require('../SignUp/googlesignup');
                      const {
                        verifycsvfile27
                      } = require('../Board/csvfileupload');
                      const {
                        lineartemplate1
                      } = require('../templatefromworkspace/linear');
                      const {
                        deletegoogleaccount11
                      } = require('../deleteaccount/deletegoogleaccount');
                      delete require.cache[require.resolve('../SignUp/googlesignup')];
                      delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                      delete require.cache[require.resolve('../templatefromworkspace/linear')];
                      delete require.cache[require.resolve('../Board/csvfileupload')]
                    } else if (signupMethod === "facebook") {
                      const {
                        facebooksignup11
                      } = require('../SignUp/facebooksignup');
                      const {
                        verifycsvfile16
                      } = require('../Board/csvfileupload');
                      const {
                           lineartemplate2
                      } = require('../templatefromworkspace/linear');
                      const {
                        deletefacebookaccount11
                      } = require('../deleteaccount/deletefacebbokaccount');
                      delete require.cache[require.resolve('../SignUp/facebooksignup')];
                      delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                      delete require.cache[require.resolve('../templatefromworkspace/linear')];
                      delete require.cache[require.resolve('../Board/csvfileupload')]
                    }
                    break;
              default:
                throw new Error(`Invalid source type: ${source}`);
            }
            break;
          case "paidfunnel":
            switch (source) {
              case "csvupload":
                if (signupMethod === "email") {
                  const {
                    email_signup
                  } = require('../SignUpForPaidFunnel/emailpaidsignup');
                  const {
                    verifycsvfile
                  } = require('../Board/csvfileupload');
                  const {
                    delete_email1
                  } = require('../deleteaccount/deleteemailaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/emailpaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                  delete require.cache[require.resolve('../Board/csvfileupload')];
                } else if (signupMethod === "google") {
                  const {
                    google_signup
                  } = require('../SignUpForPaidFunnel/googlepaidsignup');
                  const {
                    verifycsvfile1
                  } = require('../Board/csvfileupload');
                  const {
                    delete_googleaccount
                  } = require('../deleteaccount/deletegoogleaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/googlepaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                  delete require.cache[require.resolve('../Board/csvfileupload')];
                } else if (signupMethod === "facebook") {
                  const {
                    facebooksignup
                  } = require('../SignUpForPaidFunnel/facebookpaidsignup');
                  const {
                    verify_csvfile12
                  } = require('../Board/csvfileupload');
                  const {
                    deletefacebookaccount
                  } = require('../deleteaccount/deletefacebbokaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/facebookpaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                  delete require.cache[require.resolve('../Board/csvfileupload')];
                }
                break;
              case "xlsupload":
                if (signupMethod === "email") {
                  const {
                    email_signup1
                  } = require('../SignUpForPaidFunnel/emailpaidsignup');
                  const {
                    verify_xlsfile
                  } = require('../Board/xlsfileupload');
                  const {
                    delete_email2
                  } = require('../deleteaccount/deleteemailaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/emailpaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                  delete require.cache[require.resolve('../Board/xlsfileupload')];
                } else if (signupMethod === "google") {
                  const {
                    google_signup2
                  } = require('../SignUpForPaidFunnel/googlepaidsignup');
                  const {
                    verify_xlsfile2
                  } = require('../Board/xlsfileupload');
                  const {
                    deletegoogle_account1
                  } = require('../deleteaccount/deletegoogleaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/googlepaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                  delete require.cache[require.resolve('../Board/xlsfileupload')];
                } else if (signupMethod === "facebook") {
                  const {
                    facebook_signup1
                  } = require('../SignUpForPaidFunnel/facebookpaidsignup');
                  const {
                    verifycsv_file13
                  } = require('../Board/xlsfileupload');
                  const {
                    deletefacebook_account1
                  } = require('../deleteaccount/deletefacebbokaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/facebookpaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                  delete require.cache[require.resolve('../Board/xlsfileupload')];
                }
                break;
              case "googlesheet":
                if (signupMethod === "email") {
                  const {
                    email_signup2
                  } = require('../SignUpForPaidFunnel/emailpaidsignup');
                  const {
                    googlesheet
                  } = require('../googleconnectors/googlesheet');
                  const {
                    delete_email3
                  } = require('../deleteaccount/deleteemailaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/emailpaidsignup')];
                  delete require.cache[require.resolve('../googleconnectors/googlesheet')];
                  delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                } else if (signupMethod === "google") {
                  const {
                    google_signup1
                  } = require('../SignUpForPaidFunnel/googlepaidsignup');
                  const {
                    verifygooglesheet
                  } = require('../googleconnectors/googlesheet');
                  const {
                    delete_googleaccount1
                  } = require('../deleteaccount/deletegoogleaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/googlepaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                  delete require.cache[require.resolve('../googleconnectors/googlesheet')];
                } else if (signupMethod === "facebook") {
                  const {
                    facebook_signup1
                  } = require('../SignUpForPaidFunnel/facebookpaidsignup');
                  const {
                    verify_googlesheet1
                  } = require('../googleconnectors/googlesheet');
                  const {
                    deletefacebookaccount1
                  } = require('../deleteaccount/deletefacebbokaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/facebookpaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                  delete require.cache[require.resolve('../googleconnectors/googlesheet')];
                }
                break;
              case "facebookads":
                if (signupMethod === "email") {
                  const {
                    email_signup2
                  } = require('../SignUpForPaidFunnel/emailpaidsignup');
                  const {
                    facebookads
                  } = require('../facebookads/facebookads');
                  const {
                    delete_email3
                  } = require('../deleteaccount/deleteemailaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/emailpaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                  delete require.cache[require.resolve('../facebookads/facebookads')]
                } else if (signupMethod === "google") {
                  const {
                    google_signup3
                  } = require('../SignUpForPaidFunnel/googlepaidsignup');
                  const {
                    facebookads2
                  } = require('../facebookads/facebookads');
                  const {
                    delete_googleaccount2
                  } = require('../deleteaccount/deletegoogleaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/googlepaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                  delete require.cache[require.resolve('../facebookads/facebookads')];
                } else if (signupMethod === "facebook") {
                  const {
                    facebook_signup2
                  } = require('../SignUpForPaidFunnel/facebookpaidsignup');
                  const {
                    facebookads3
                  } = require('../facebookads/facebookads');
                  const {
                    deletefacebook_account3
                  } = require('../deleteaccount/deletefacebbokaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/facebookpaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                  delete require.cache[require.resolve('../facebookads/facebookads')];
                }
                break;
              case "shopify":
                if (signupMethod === "email") {
                  const {
                    email_signup3
                  } = require('../SignUpForPaidFunnel/emailpaidsignup');
                  const {
                    shopify1
                  } = require('../Shopify/verifyshopify');
                  const {
                    delete_email4
                  } = require('../deleteaccount/deleteemailaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/emailpaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                  delete require.cache[require.resolve('../Shopify/verifyshopify')]
                } else if (signupMethod === "google") {
                  const {
                    google_signup4
                  } = require('../SignUpForPaidFunnel/googlepaidsignup');
                  const {
                    facebookads4
                  } = require('../Shopify/verifyshopify');
                  const {
                    delete_googleaccount3
                  } = require('../deleteaccount/deletegoogleaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/googlepaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                  delete require.cache[require.resolve('../Shopify/verifyshopify')];
                } else if (signupMethod === "facebook") {
                  const {
                    facebook_signup5
                  } = require('../SignUpForPaidFunnel/facebookpaidsignup');
                  const {
                    facebook_ads5
                  } = require('../Shopify/verifyshopify');
                  const {
                    deletefacebook_account5
                  } = require('../deleteaccount/deletefacebbokaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/facebookpaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                  delete require.cache[require.resolve('../Shopify/verifyshopify')];
                }
                break;
              case "linear":
                if (signupMethod === "email") {
                  const {
                    email_signup3
                  } = require('../SignUpForPaidFunnel/emailpaidsignup');
                  const {
                    shopify1
                  } = require('../lineardataconnector/linear');
                  const {
                    delete_email4
                  } = require('../deleteaccount/deleteemailaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/emailpaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                  delete require.cache[require.resolve('../lineardataconnector/linear')]
                } else if (signupMethod === "google") {
                  const {
                    google_signup5
                  } = require('../SignUpForPaidFunnel/googlepaidsignup');
                  const {
                    linear4
                  } = require('../lineardataconnector/linear');
                  const {
                    delete_googleaccount4
                  } = require('../deleteaccount/deletegoogleaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/googlepaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                  delete require.cache[require.resolve('../lineardataconnector/linear')];
                } else if (signupMethod === "facebook") {
                  const {
                    facebook_signup6
                  } = require('../SignUpForPaidFunnel/facebookpaidsignup');
                  const {
                    linear5
                  } = require('../lineardataconnector/linear');
                  const {
                    deletefacebook_account6
                  } = require('../deleteaccount/deletefacebbokaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/facebookpaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                  delete require.cache[require.resolve('../lineardataconnector/linear')];
                }
                break;
              case "dropbox":
                if (signupMethod === "email") {
                  const {
                    email_signup4
                  } = require('../SignUpForPaidFunnel/emailpaidsignup');
                  const {
                    dropbox
                  } = require('../dropboxconnetor/dropbox');
                  const {
                    delete_email5
                  } = require('../deleteaccount/deleteemailaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/emailpaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                  delete require.cache[require.resolve('../dropboxconnetor/dropbox')]
                } else if (signupMethod === "google") {
                  const {
                    google_signup6
                  } = require('../SignUpForPaidFunnel/googlepaidsignup');
                  const {
                    dropbox1
                  } = require('../dropboxconnetor/dropbox');
                  const {
                    delete_googleaccount5
                  } = require('../deleteaccount/deletegoogleaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/googlepaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                  delete require.cache[require.resolve('../dropboxconnetor/dropbox')];
                } else if (signupMethod === "facebook") {
                  const {
                    facebook_signup7
                  } = require('../SignUpForPaidFunnel/facebookpaidsignup');
                  const {
                    dropbox3
                  } = require('../dropboxconnetor/dropbox');
                  const {
                    deletefacebook_account7
                  } = require('../deleteaccount/deletefacebbokaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/facebookpaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                  delete require.cache[require.resolve('../dropboxconnetor/dropbox')];
                }
                break;
              case "jira":
                if (signupMethod === "email") {
                  const {
                    email_signup5
                  } = require('../SignUpForPaidFunnel/emailpaidsignup');
                  const {
                    verifycsvfile2
                  } = require('../Board/csvfileupload');
                  const {
                    jira
                  } = require('../jiraconnector/jira');
                  const {
                    deleteemail7
                  } = require('../deleteaccount/deleteemailaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/emailpaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                  delete require.cache[require.resolve('../jiraconnector/jira')]
                  delete require.cache[require.resolve('../Board/csvfileupload')]
                } else if (signupMethod === "google") {
                  const {
                    googlesignup7
                  } = require('../SignUpForPaidFunnel/googlepaidsignup');
                  const {
                    verifycsvfile3
                  } = require('../Board/csvfileupload');
                  const {
                    jira1
                  } = require('../jiraconnector/jira');
                  const {
                    deletegoogleaccount6
                  } = require('../deleteaccount/deletegoogleaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/googlepaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                  delete require.cache[require.resolve('../jiraconnector/jira')];
                  delete require.cache[require.resolve('../Board/csvfileupload')]
                } else if (signupMethod === "facebook") {
                  const {
                    facebooksignup8
                  } = require('../SignUpForPaidFunnel/facebookpaidsignup');
                  const {
                    verifycsvfile4
                  } = require('../Board/csvfileupload');
                  const {
                    jira2
                  } = require('../jiraconnector/jira');
                  const {
                    deletefacebookaccount7
                  } = require('../deleteaccount/deletefacebbokaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/facebookpaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                  delete require.cache[require.resolve('../jiraconnector/jira')];
                  delete require.cache[require.resolve('../Board/csvfileupload')]
                }
                break;
              case "zendesk":
                if (signupMethod === "email") {
                  const {
                    email_signup7
                  } = require('../SignUpForPaidFunnel/emailpaidsignup');
                  const {
                    verifycsvfile7
                  } = require('../Board/csvfileupload');
                  const {
                    zendesk
                  } = require('../zendeskconnector/zendesk');
                  const {
                    deleteemail8
                  } = require('../deleteaccount/deleteemailaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/emailpaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                  delete require.cache[require.resolve('../zendeskconnector/zendesk')]
                  delete require.cache[require.resolve('../Board/csvfileupload')]
                } else if (signupMethod === "google") {
                  const {
                    googlesignup10
                  } = require('../SignUpForPaidFunnel/googlepaidsignup');
                  const {
                    verifycsvfile9
                  } = require('../Board/csvfileupload');
                  const {
                    zendesk1
                  } = require('../jiraconnector/jira');
                  const {
                    deletegoogleaccount16
                  } = require('../deleteaccount/deletegoogleaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/googlepaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                  delete require.cache[require.resolve('../zendeskconnector/zendesk')];
                  delete require.cache[require.resolve('../Board/csvfileupload')]
                } else if (signupMethod === "facebook") {
                  const {
                    facebooksignup19
                  } = require('../SignUpForPaidFunnel/facebookpaidsignup');
                  const {
                    verifycsvfile14
                  } = require('../Board/csvfileupload');
                  const {
                    zendesk4
                  } = require('../jiraconnector/jira');
                  const {
                    deletefacebookaccount17
                  } = require('../deleteaccount/deletefacebbokaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/facebookpaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                  delete require.cache[require.resolve('../zendeskconnector/zendesk')];
                  delete require.cache[require.resolve('../Board/csvfileupload')]
                }
                break;
              default:
                throw new Error(`Invalid source type: ${source}`);
            }
            break;
            case "facebookadstemplate":
              if (signupMethod === "email") {
                const {
                  email_signup7
                } = require('../SignUpForPaidFunnel/emailpaidsignup');
                const {
                  verifycsvfile7
                } = require('../Board/csvfileupload');
                const {
                  facebookadstemplate
                } = require('../templatefromworkspace/facebookads');
                const {
                  deleteemail8
                } = require('../deleteaccount/deleteemailaccount');
                delete require.cache[require.resolve('../SignUpForPaidFunnel/emailpaidsignup')];
                delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                delete require.cache[require.resolve('../templatefromworkspace/facebookads')]
                delete require.cache[require.resolve('../Board/csvfileupload')]
              } else if (signupMethod === "google") {
                const {
                  googlesignup9
                } = require('../SignUpForPaidFunnel/googlepaidsignup');
                const {
                  verifycsvfile17
                } = require('../Board/csvfileupload');
                const {
                  facebookadstemplate1
                } = require('../templatefromworkspace/facebookads');
                const {
                  deletegoogleaccount10
                } = require('../deleteaccount/deletegoogleaccount');
                delete require.cache[require.resolve('../SignUpForPaidFunnel/googlepaidsignup')];
                delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                delete require.cache[require.resolve('../templatefromworkspace/facebookads')];
                delete require.cache[require.resolve('../Board/csvfileupload')]
              } else if (signupMethod === "facebook") {
                const {
                  facebooksignup10
                } = require('../SignUpForPaidFunnel/facebookpaidsignup');
                const {
                  verifycsvfile15
                } = require('../Board/csvfileupload');
                const {
                  facebookadstemplate2
                } = require('../templatefromworkspace/facebookads');
                const {
                  deletefacebookaccount10
                } = require('../deleteaccount/deletefacebbokaccount');
                delete require.cache[require.resolve('../SignUpForPaidFunnel/facebookpaidsignup')];
                delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                delete require.cache[require.resolve('../templatefromworkspace/facebookads')];
                delete require.cache[require.resolve('../Board/csvfileupload')]
              }
              break;
              case "lineartemplate":
                if (signupMethod === "email") {
                  const {
                    email_signup8
                  } = require('../SignUpForPaidFunnel/emailpaidsignup');
                  const {
                    verifycsvfile8
                  } = require('../Board/csvfileupload');
                  const {
                    linearstemplate
                  } = require('../templatefromworkspace/linear');
                  const {
                    deleteemail9
                  } = require('../deleteaccount/deleteemailaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/emailpaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deleteemailaccount')]
                  delete require.cache[require.resolve('../templatefromworkspace/linear')]
                  delete require.cache[require.resolve('../Board/csvfileupload')]
                } else if (signupMethod === "google") {
                  const {
                    googlesignup10
                  } = require('../SignUpForPaidFunnel/googlepaidsignup');
                  const {
                    verifycsvfile27
                  } = require('../Board/csvfileupload');
                  const {
                    lineartemplate1
                  } = require('../templatefromworkspace/linear');
                  const {
                    deletegoogleaccount11
                  } = require('../deleteaccount/deletegoogleaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/googlepaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletegoogleaccount')]
                  delete require.cache[require.resolve('../templatefromworkspace/linear')];
                  delete require.cache[require.resolve('../Board/csvfileupload')]
                } else if (signupMethod === "facebook") {
                  const {
                    facebooksignup11
                  } = require('../SignUpForPaidFunnel/facebookpaidsignup');
                  const {
                    verifycsvfile16
                  } = require('../Board/csvfileupload');
                  const {
                       lineartemplate2
                  } = require('../templatefromworkspace/linear');
                  const {
                    deletefacebookaccount11
                  } = require('../deleteaccount/deletefacebbokaccount');
                  delete require.cache[require.resolve('../SignUpForPaidFunnel/facebookpaidsignup')];
                  delete require.cache[require.resolve('../deleteaccount/deletefacebbokaccount')]
                  delete require.cache[require.resolve('../templatefromworkspace/linear')];
                  delete require.cache[require.resolve('../Board/csvfileupload')]
                }
                break;
            // Add cases for other types of funnels if needed
          default:
            throw new Error(`Invalid paid type: ${paidtype}`);
        }
      });
    });

  }
})
//getting data from the report and sending mail
function readMochawesomeReport(filePath) {
  try {
    const reportContent = fs.readFileSync(filePath, 'utf-8');
    return reportContent;
  } catch (error) {
    console.error('Error reading Mochawesome HTML report:', error);
    return null;
  }
}

function extractTestResults(reportContent) {
  const dom = new JSDOM(reportContent);
  const {
    document
  } = dom.window;

  const passCount = parseInt(document.querySelector('.summary-passes').textContent.trim());
  const failCount = parseInt(document.querySelector('.summary-failures').textContent.trim());
  const moduleCount = document.querySelectorAll('.suite-title').length;
  const suiteTitles = document.querySelectorAll('.suite-title');

  // Initialize counters for P1, P2, and P3
  let p1Count = 0;
  let p2Count = 0;
  let p3Count = 0;

  // Iterate over each suite title and count occurrences of P1, P2, and P3
  suiteTitles.forEach(title => {
    const text = title.textContent.trim();
    if (text.startsWith('P1:')) {
      p1Count++;
    } else if (text.startsWith('P2:')) {
      p2Count++;
    } else if (text.startsWith('P3:')) {
      p3Count++;
    }
  });
  // Select all test cases
  const testCases = document.querySelectorAll('.list-group-item.test');

  // Initialize counters for test cases in P1, P2, and P3 modules
  let p1TestCount = 0;
  let p2TestCount = 0;
  let p3TestCount = 0;
  let p1PassCount = 0;
  let p1FailCount = 0;
  let p2PassCount = 0;
  let p2FailCount = 0;
  let p3PassCount = 0;
  let p3FailCount = 0;

  // Iterate over each test case and count them based on their parent suite title
  testCases.forEach(testCase => {
    const parentSuiteTitle = testCase.closest('.suite').querySelector('.suite-title').textContent.trim();
    if (parentSuiteTitle.startsWith('P1:')) {
      p1TestCount++;
    } else if (parentSuiteTitle.startsWith('P2:')) {
      p2TestCount++;
    } else if (parentSuiteTitle.startsWith('P3:')) {
      p3TestCount++;
    }
  });
  testCases.forEach(testCase => {
    const parentSuiteTitle = testCase.closest('.suite').querySelector('.suite-title').textContent.trim();
    if (parentSuiteTitle.startsWith('P1:')) {
      if (testCase.classList.contains('passed')) {
        p1PassCount++;
      } else if (testCase.classList.contains('failed')) {
        p1FailCount++;
      }
    } else if (parentSuiteTitle.startsWith('P2:')) {
      if (testCase.classList.contains('passed')) {
        p2PassCount++;
      } else if (testCase.classList.contains('failed')) {
        p2FailCount++;
      }
    } else if (parentSuiteTitle.startsWith('P3:')) {
      if (testCase.classList.contains('passed')) {
        p3PassCount++;
      } else if (testCase.classList.contains('failed')) {
        p3FailCount++;
      }
    }
  });
  return {
    pass: passCount,
    fail: failCount,
    ModuleSuites: moduleCount,
    P1: p1Count,
    P2: p2Count,
    P3: p3Count,
    P1TestCount: p1TestCount,
    P2TestCount: p2TestCount,
    P3TestCount: p3TestCount,
    P1passCount: p1PassCount,
    P1failCount: p1FailCount,
    P2passCount: p2PassCount,
    P2failCount: p2FailCount,
    P3passCount: p3PassCount,
    P3failCount: p3FailCount
  };
}
async function sendEmail(testResults) {
  const recipients = ['mukul@valleysc.in', 'pradeep@valleysc.in'];
  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'jedediah53@ethereal.email',
      pass: 'md2UBhzFwKPTa8Uz7W'
    }
  });
  for (let recipient of recipients) {
    let mailOptions = {
      from: 'jedediah53@ethereal.email',
      to: recipient,
      subject: 'Test Results',
      html: `
    <h2>Test Results Summary</h2>
    <p><strong>Pass Cases:</strong> ${testResults.pass}</p>
    <p><strong>Fail Cases:</strong> ${testResults.fail}</p>
    <p><strong>Total Module Suites:</strong> ${testResults.ModuleSuites}</p>
    <h3>P1 Module</h3>
    <p><strong>Total Count:</strong> ${testResults.P1}</p>
    <p><strong>Test Count:</strong> ${testResults.P1TestCount}</p>
    <p><strong>Pass Count:</strong> ${testResults.P1passCount}</p>
    <p><strong>Fail Count:</strong> ${testResults.P1failCount}</p>
    <h3>P2 Module</h3>
    <p><strong>Total Count:</strong> ${testResults.P2}</p>
    <p><strong>Test Count:</strong> ${testResults.P2TestCount}</p>
    <p><strong>Pass Count:</strong> ${testResults.P2passCount}</p>
    <p><strong>Fail Count:</strong> ${testResults.P2failCount}</p>
    <h3>P3 Module</h3>
    <p><strong>Total Count:</strong> ${testResults.P3}</p>
    <p><strong>Test Count:</strong> ${testResults.P3TestCount}</p>
    <p><strong>Pass Count:</strong> ${testResults.P3passCount}</p>
    <p><strong>Fail Count:</strong> ${testResults.P3failCount}</p>
    `
    };
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
}

async function generateReport() {
  console.log("checking.......")
  await driver.sleep(5000);
  const reportFilePath = path.join(__dirname, '../mochawesome-reports/mochawesome.html');
  if (fs.existsSync(reportFilePath)) {
    const htmlReportContent = readMochawesomeReport(reportFilePath);
    if (htmlReportContent) {
      // Extract pass, fail cases, and module counts from the HTML report
      const testResults = extractTestResults(htmlReportContent);
      sendEmail(testResults);
      console.log('Pass cases:', testResults.pass);
      console.log('Fail cases:', testResults.fail);
      console.log('TotalModuleSuites:', testResults.ModuleSuites);
      console.log('P1 count:', testResults.P1);
      console.log('P1TestCount:', testResults.P1TestCount);
      console.log('P2 count:', testResults.P2);
      console.log('P2TestCount:', testResults.P2TestCount);
      console.log('P3 count:', testResults.P3);
      console.log('P3TestCount:', testResults.P3TestCount);
      console.log('P1passCount:', testResults.P1passCount);
      console.log('P1failCount:', testResults.P1failCount);
      console.log('P2passCount:', testResults.P2passCount);
      console.log('P2failCount:', testResults.P2failCount);
      console.log('P3passCount:', testResults.P2passCount);
      console.log('P3failCount:', testResults.P2failCount);
    }
  } else {
    console.log("HTML report file does not exist.");
  }
}
after(async function () {
  await generateReport();
});
module.exports = {
  driver
};