# Automated UI Testing Suite with Selenium WebDriver and Mocha

This code is a collection of automated test cases written in JavaScript, designed to streamline the testing process for web applications. It employs the powerful Selenium WebDriver library to seamlessly interact with web elements and execute a series of actions. Additionally, Mocha, a robust test framework, orchestrates the execution and organization of these tests.

## Overview

The test suite utilizes the Selenium WebDriver library to interact with web elements and perform various actions on a web application. Mocha is used as the test framework to structure and execute the tests.

## Prerequisites

Before running the tests, ensure you have the following prerequisites installed:

- Ensure that you have `Node.js` installed on your system, preferably version `16.14.2.`
- It's essential to have the appropriate version of `Chrome WebDriver` (version 120.0.1) installed. If you're using a different version of Chrome, you may need to update the Chrome WebDriver accordingly in the package.json file.
- Ensure npm is installed on your machine to manage dependencies effectively.

## Configuration

Update test data in the `credentials JSON file` where you can change the email, password, Google email, Google password, Facebook email, Facebook password, etc., as per our requirements.

## Running Tests

To run the tests, execute the following command:

npm test -- --paidType <paidType> --signupMethod <signupMethod> --source <source>

- `paidType` should be either "paidfunnel" or "nonpaidfunnel".
- `signupMethod` should be "email", "facebook", or "google".
- `source` can be any of the following: "csvupload", "shopify", "facebookads", "googlesheet", "googlesheetxlsfile", "googledrive", "googledrivexlsfile", "trialexpirepopup", or "xlsupload".

## Test Structure

The test suite is structured using Mocha's `describe` and `it` functions to organize tests into suites and individual test cases. Each test case typically follows the Arrange-Act-Assert pattern, where:

- **Arrange**: Set up the preconditions for the test.
- **Act**: Perform the actions being tested.
- **Assert**: Verify that the expected outcomes are achieved.

## Testing Report

-Whenever we run the automation script automatically reports is generated for executed test cases
-To Check the report from root location navigate inside `mochawesome-report` and click on the `mochawesome.html`