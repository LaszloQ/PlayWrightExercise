export class ProductsListPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator("css=[data-component-type='s-search-result']");
    }
};


export class Product {
    constructor(page, parentPage, index) {
        this.page = page;
        this.container = parentPage.products.nth(index);
        this.title = this.container.locator('h2:visible');
        this.priceWhole = this.container.locator('css=.a-price-whole');
        this.priceDecimal = this.container.locator('css=.a-price-fraction');
        this.photo = this.container.locator('css=img');
    }


    async getName() {
        const textContent = await this.title.textContent();
        //there are a lot of empty spaces
        return textContent.trim();
    }


    async getPrice() {
        if (!await this.priceWhole.isVisible()) {
            throw new Error(`Product is unavailable or out of stock. Name is:${await this.getName()}`)
        }

        const wholePrice = await this.priceWhole.textContent();
        const decimalPrice = await this.priceDecimal.textContent();

        return Number(`${wholePrice}${decimalPrice}`);
    }


    async open() {
        await this.title.click({ force: true });
    }
};