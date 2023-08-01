// Import dependencies and middlewares 

const express = require("express");
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(cors())


const puppeteer = require('puppeteer');

async function autoSubmitForm(url, value) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the website
    await page.goto(url);

    // Fill the form fields
      await page.type('.Chat_chatMessage__c-wbf', value, {delay: 100});
    // Submit the form
    await page.click('.icon-ic_send');

    // Wait for the page to reload or load the next page
    await page.waitForNavigation();

    // Extract and retrieve the data you need
    const submittedData = await page.evaluate(() => {
      // Customize this function to extract the desired data from the page
      let data = '';
      data = document.querySelector('.ContentRow_liText__1C9bQ').innerText;
      console.log(data);
      return data;
    });

    // Close the browser
    await browser.close();

    // Return the extracted data
    return submittedData;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example usage
const url = 'https://www.aichatting.net/';
const val = 'Hey, How are you?'

autoSubmitForm(url, val)
  .then(data => {
    console.log('Submitted Data:', data);
    // You can send the data back by email or through any other method here
  })
  .catch(error => {
    console.error('Error:', error);
  });




const port = 5555;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});



