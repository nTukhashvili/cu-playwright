class ProductsPage {
    constructor(page) {
      this.page = page;
      
      this.locators = {
        productCard: async (productName) => 
          await this.page.locator(`//*[text()="${productName}"]/ancestor::div[@class="inventory_item_label"]/following-sibling::div/button`),
        cartCount: async () => await this.page.locator("//span[@data-test='shopping-cart-badge']")
      };
    }
  
    async addProductToCart(productName) {
      const addToCartButton = await this.locators.productCard(productName);
      await addToCartButton.click();
      
      // Wait for any animations or updates to complete
      await this.page.waitForTimeout(1000);
    }
  
    async getCartCount() {
      const cartCountElement = await this.locators.cartCount();
      const cartCountText = await cartCountElement.innerText();
      return parseInt(cartCountText, 10);
    }
  }

  module.exports = ProductsPage;