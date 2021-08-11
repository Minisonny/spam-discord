const { Builder, By, Key } = require("selenium-webdriver");
const lyrics = Object.entries(require("./lyrics.json"));
const chrome = require("selenium-webdriver/chrome");

// URL to spamming channel
const DISCORD_CHANNEL_URL = "https://discord.com/channels/418871455997100033/869954123406143528";

// Discord credentials
const EMAIL = "";
const PASSWORD = "";

// Directory of chromedriver, e.g. "C:/WebDriver/chromedriver.exe"
const PATH_TO_WEB_DRIVER = "";

// Time out between two messages
const WAIT_TIME = 1200;

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
        await driver
          .findElement(By.css("div[class^='textArea']"))
          .findElement(By.css("div[data-slate-object='block']"))
          .sendKeys(title.toUpperCase(), Key.ENTER);
        await new Promise(resolve => setTimeout(resolve, WAIT_TIME));
        for (const line of lines) {
          await driver
            .findElement(By.css("div[class^='textArea']"))
            .findElement(By.css("div[data-slate-object='block']"))
            .sendKeys(line, Key.ENTER);
          await new Promise(resolve => setTimeout(resolve, WAIT_TIME));
        }
      }
    }
  } finally {
    await driver.quit();
  }
})();