const { Builder, By, Key } = require("selenium-webdriver");
const lyrics = Object.entries(require("./lyrics.json"));
const chrome = require("selenium-webdriver/chrome");

// URL to spamming channel
const DISCORD_CHANNEL_URL = "https://discord.com/channels/418871455997100033/869954123406143528";

// Discord credentials
const EMAIL = "";
const PASSWORD = "";

// Directory of chromedriver, e.g. "C:/WebDriver/chromedriver.exe"
const PATH_TO_WEB_DRIVER = "C:/WebDriver/chromedriver.exe";

// Time out between two messages
const WAIT_TIME = 2000;

const typeTextAndRemoveErrorPopUp = async (d, text) => {
  await d
    .findElement(By.css("div[class^='textArea']"))
    .findElement(By.css("div[data-slate-object='block']"))
    .sendKeys(text, Key.ENTER)
    .catch(err => err);
  await d
    .findElement(By.css("button[class^='primaryButton']"))
    .then(element => 
      setTimeout(() => element.click(), 8000),
      err => err
    );
  await new Promise(resolve => setTimeout(resolve, WAIT_TIME));
};

chrome.setDefaultService(new chrome.ServiceBuilder(PATH_TO_WEB_DRIVER).build());
(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get(DISCORD_CHANNEL_URL);
    await driver.findElement(By.css("input[name='email']")).sendKeys(EMAIL);
    await driver.findElement(By.css("input[name='password']")).sendKeys(PASSWORD, Key.ENTER);
    await new Promise(resolve => setTimeout(resolve, 3000));
    await driver.navigate().refresh();
    await new Promise(resolve => setTimeout(resolve, 5000));
    while (true) {
      for (const [title, lines] of lyrics) {
        await typeTextAndRemoveErrorPopUp(driver, title.toUpperCase());
        for (const line of lines) {
          await typeTextAndRemoveErrorPopUp(line, title.toUpperCase());
        }
      }
    }
  } finally {
    await driver.quit();
  }
})();