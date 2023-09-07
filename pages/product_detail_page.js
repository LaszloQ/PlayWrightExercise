export class ProductDetailPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('css=#title');
        this.price = page.locator('css=.apexPriceToPay');
    }

    //get title
    //get price
}

