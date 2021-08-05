const { Builder, By, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const EMAIL = "";
const PASSWORD = "";
const WAIT_TIME = 1000;

chrome.setDefaultService(new chrome.ServiceBuilder("C:/WebDriver/chromedriver.exe").build());
(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("https://discord.com/channels/418871455997100033/869954123406143528");
    await driver.findElement(By.css("input[name='email']")).sendKeys(EMAIL);
    await driver.findElement(By.css("input[name='password']")).sendKeys(PASSWORD, Key.ENTER);
    await new Promise(resolve => setTimeout(resolve, 3000));
    await driver.navigate().refresh();
    await new Promise(resolve => setTimeout(resolve, 5000));
    while (true) {
      await driver.findElement(By.css("div[class^='textArea']")).findElement(By.css("div[data-slate-object='block']")).sendKeys("This is a text for spamming", Key.ENTER);
      await new Promise(resolve => setTimeout(resolve, WAIT_TIME));
    }
  } finally {
    await driver.quit();
  }
})();