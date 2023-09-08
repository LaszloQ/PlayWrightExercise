import { test, expect } from '@playwright/test';
import { Homepage } from '../pages/home_page';
import { ProductDetailPage } from '../pages/product_detail_page';
import { Product } from '../pages/products_list_page';
import { ProductsListPage } from '../pages/products_list_page';
import { parseCsvToArray } from '../helpers/parse_csv_files';

const filePath = '../data_files/searchQueries.csv';
const queries = parseCsvToArray(filePath);


for (const query of queries) {
  test(`Search for ${query} and expect product title and price to match`, async ({ page }) => {
    const homePage = new Homepage(page);
    const productDetailsPage = new ProductDetailPage(page);
    const productsListPage = new ProductsListPage(page);
    //open Amazon and search for keyword
    await homePage.open();
    await homePage.searchForKeyword(query);
    //get the title and the price of the 4th Product
    const desiredIndex = 3;
    const desiredProduct = new Product(page, productsListPage, desiredIndex);
    const productTitleOnListPage = await desiredProduct.getName();
    const productPriceOnListPage = await desiredProduct.getPrice();
    //open the detail page of the 4th product
    await desiredProduct.open();
    //get the title and the price of the product
    const productTitleOnProductPage = await productDetailsPage.getName();
    const productPriceOnProductPage = await productDetailsPage.getPriceOnCenter();
    //expect the titles and the prices to match
    expect(productTitleOnListPage).toBe(productTitleOnProductPage)
    expect(productPriceOnListPage).toBe(productPriceOnProductPage)
  });
};