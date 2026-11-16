/** Product slugs match the data-test suffixes used by saucedemo (add-to-cart-<slug>). */
export const products = {
  backpack: 'sauce-labs-backpack',
  bikeLight: 'sauce-labs-bike-light',
  boltShirt: 'sauce-labs-bolt-t-shirt',
} as const;

/** The two items added in the checkout scenario. */
export const checkoutProducts: string[] = [products.backpack, products.bikeLight];
