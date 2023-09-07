// @ts-check
import { test, expect } from '@playwright/test';
import { Homepage } from '../pages/home_page';
import { ProductDetailPage } from '../pages/product_detail_page';
import { Product } from '../pages/products_list_page';
import { ProductsListPage } from '../pages/products_list_page';

const queries = ['iPhone', 'Laptop'];


for (const query of queries) {
  test.only(`Search for ${query} and expect product title and price to match`, async ({ page }) => {
    const homePage = new Homepage(page);
    const productDetailsPage = new ProductDetailPage(page);
    const productsListPage = new ProductsListPage(page);

    await homePage.open();
    await homePage.searchForKeyword(query);

    const desiredIndex = 3;
    const desiredProduct = new Product(page, productsListPage, desiredIndex);
    const productTitleOnListPage = await desiredProduct.getName();
    const productPriceOnListPage = await desiredProduct.getPrice();

    await desiredProduct.open();

    const productTitleOnProductPage = await productDetailsPage.getName();
    const productPriceOnProductPage = await productDetailsPage.getPriceOnCenter();

    expect(productTitleOnListPage).toBe(productTitleOnProductPage)
    expect(productPriceOnListPage).toBe(productPriceOnProductPage)
  });
};