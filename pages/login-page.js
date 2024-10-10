// loginPage.js

class LoginPage {
    constructor(page) {
      this.page = page;
      
      this.locators = {
        usernameInput: async () => await this.page.locator('[data-test="username"]'),
        passwordInput: async () => await this.page.locator('[data-test="password"]'),
        loginButton: async () => await this.page.locator('#login-button')
      };
    }
  
    async enterUsername(username) {
      const usernameInput = await this.locators.usernameInput();
      await usernameInput.fill(username);
    }
  
    async enterPassword(password) {
      const passwordInput = await this.locators.passwordInput();
      await passwordInput.fill(password);
    }
  
    async clickLoginButton() {
      const loginButton = await this.locators.loginButton();
      await loginButton.click();
    }
  
    async login(username, password) {
      await this.enterUsername(username);
      await this.enterPassword(password);
      await this.clickLoginButton();
    }
  }
  
  module.exports = LoginPage;