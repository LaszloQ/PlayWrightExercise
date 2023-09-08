export class ProductDetailPage {
    constructor(page) {
        this.page = page;
        this.title = page.locator('css=#title');
        this.price = page.locator("css=[class*='ToPay'] >span:first-of-type:visible");
    }


    async getName() {
        const textContent = await this.title.textContent();
        //remove the empty spaces
        return textContent.trim();
    }


    async getPriceOnCenter() {
        const textContent = await this.price.textContent();
        const currency = '$';
        //split $699.99 to [ '$', '699.99' ], and convert '699.99' to number
        return Number(textContent.split(currency)[1]);
    }
};

