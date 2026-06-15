import type {
  ShopifyCart,
  ShopifyCollection,
  ShopifyProduct,
} from "./types";
import type { ShopContext } from "./shop-context";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;

// Variables @inContext communes (langue + pays) injectées dans les lectures.
const CTX_ARGS = "$country: CountryCode, $language: LanguageCode";
const CTX_DIR = "@inContext(country: $country, language: $language)";

function ctxVars(ctx?: ShopContext) {
  return ctx ? { country: ctx.country, language: ctx.language } : {};
}

async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify fetch error: ${res.status}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data as T;
}

// ── Fragments ──────────────────────────────────────────────────────────────

const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    tags
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    images(first: 5) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          availableForSale
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
        }
      }
    }
    collections(first: 3) {
      edges {
        node { handle title }
      }
    }
  }
`;

// ── Collections ────────────────────────────────────────────────────────────

export async function getAllCollections(ctx?: ShopContext): Promise<ShopifyCollection[]> {
  const data = await shopifyFetch<{
    collections: { edges: Array<{ node: ShopifyCollection }> };
  }>({
    variables: ctxVars(ctx),
    query: `
      query AllCollections(${CTX_ARGS}) ${CTX_DIR} {
        collections(first: 50, sortKey: TITLE) {
          edges {
            node {
              id
              handle
              title
              description
              image { url altText width height }
              products(first: 0) {
                edges { node { id } }
                pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
              }
            }
          }
        }
      }
    `,
  });

  return data.collections.edges.map((e) => e.node);
}

export async function getCollectionByHandle(
  handle: string,
  ctx?: ShopContext
): Promise<ShopifyCollection | null> {
  const data = await shopifyFetch<{ collection: ShopifyCollection | null }>({
    query: `
      query CollectionByHandle($handle: String!, $first: Int!, $after: String, ${CTX_ARGS}) ${CTX_DIR} {
        collection(handle: $handle) {
          id
          handle
          title
          description
          image { url altText width height }
          products(first: $first, after: $after, sortKey: BEST_SELLING) {
            edges { node { ...ProductFragment } }
            pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
          }
        }
      }
      ${PRODUCT_FRAGMENT}
    `,
    variables: { handle, first: 24, after: null, ...ctxVars(ctx) },
  });

  return data.collection;
}

export async function getProductsByCollection(
  handle: string,
  first = 24,
  after: string | null = null,
  ctx?: ShopContext
): Promise<{ products: ShopifyProduct[]; pageInfo: ShopifyCollection["products"]["pageInfo"] }> {
  const data = await shopifyFetch<{ collection: ShopifyCollection | null }>({
    query: `
      query ProductsByCollection($handle: String!, $first: Int!, $after: String, ${CTX_ARGS}) ${CTX_DIR} {
        collection(handle: $handle) {
          products(first: $first, after: $after) {
            edges { node { ...ProductFragment } }
            pageInfo { hasNextPage hasPreviousPage startCursor endCursor }
          }
        }
      }
      ${PRODUCT_FRAGMENT}
    `,
    variables: { handle, first, after, ...ctxVars(ctx) },
  });

  if (!data.collection) return { products: [], pageInfo: { hasNextPage: false, hasPreviousPage: false, startCursor: "", endCursor: "" } };
  return {
    products: data.collection.products.edges.map((e) => e.node),
    pageInfo: data.collection.products.pageInfo,
  };
}

// ── Products ───────────────────────────────────────────────────────────────

export async function getProductByHandle(
  handle: string,
  ctx?: ShopContext
): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
    query: `
      query ProductByHandle($handle: String!, ${CTX_ARGS}) ${CTX_DIR} {
        product(handle: $handle) {
          ...ProductFragment
        }
      }
      ${PRODUCT_FRAGMENT}
    `,
    variables: { handle, ...ctxVars(ctx) },
  });

  return data.product;
}

export async function getFeaturedProducts(first = 8, ctx?: ShopContext): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    products: { edges: Array<{ node: ShopifyProduct }> };
  }>({
    query: `
      query FeaturedProducts($first: Int!, ${CTX_ARGS}) ${CTX_DIR} {
        products(first: $first, sortKey: BEST_SELLING) {
          edges { node { ...ProductFragment } }
        }
      }
      ${PRODUCT_FRAGMENT}
    `,
    variables: { first, ...ctxVars(ctx) },
  });

  return data.products.edges.map((e) => e.node);
}

// ── Cart ───────────────────────────────────────────────────────────────────

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                id
                handle
                title
                images(first: 1) {
                  edges { node { url altText width height } }
                }
              }
            }
          }
          cost {
            totalAmount { amount currencyCode }
          }
        }
      }
    }
  }
`;

export async function createCart(): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>({
    query: `
      mutation CartCreate {
        cartCreate {
          cart { ...CartFragment }
        }
      }
      ${CART_FRAGMENT}
    `,
  });

  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>({
    query: `
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart { ...CartFragment }
        }
      }
      ${CART_FRAGMENT}
    `,
    variables: { cartId, lines },
  });

  return data.cartLinesAdd.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: `
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          ...CartFragment
        }
      }
      ${CART_FRAGMENT}
    `,
    variables: { cartId },
  });

  return data.cart;
}

export async function updateCartLines(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>({
    query: `
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart { ...CartFragment }
        }
      }
      ${CART_FRAGMENT}
    `,
    variables: { cartId, lines },
  });

  return data.cartLinesUpdate.cart;
}

export async function removeCartLines(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>({
    query: `
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart { ...CartFragment }
        }
      }
      ${CART_FRAGMENT}
    `,
    variables: { cartId, lineIds },
  });

  return data.cartLinesRemove.cart;
}

// ── Helpers ────────────────────────────────────────────────────────────────

export function formatPrice(
  amount: string,
  currencyCode = "CAD",
  locale: "fr" | "en" = "fr"
): string {
  return new Intl.NumberFormat(locale === "en" ? "en-CA" : "fr-CA", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}
