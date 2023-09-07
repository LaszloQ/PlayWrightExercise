export class Homepage {
    constructor(page) {
        this.page = page;
        this.searchBar = page.locator('css=#twotabsearchtextbox');
        this.searchButton = page.locator('css=#nav-search-submit-button');
    }


    async open() {
        await this.page.goto('https://www.amazon.com/')
    }


    async searchForKeyword(query) {
        await this.searchBar.fill(query)
        await this.searchButton.click()
    }
};

