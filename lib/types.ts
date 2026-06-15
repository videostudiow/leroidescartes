// Shopify types
export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  images: {
    edges: Array<{ node: ShopifyImage }>;
  };
  variants: {
    edges: Array<{ node: ShopifyVariant }>;
  };
  collections: {
    edges: Array<{ node: { handle: string; title: string } }>;
  };
  availableForSale: boolean;
  tags: string[];
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: {
    edges: Array<{ node: ShopifyProduct }>;
    pageInfo: ShopifyPageInfo;
  };
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
    totalTaxAmount: ShopifyMoney | null;
  };
  lines: {
    edges: Array<{ node: ShopifyCartLine }>;
  };
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: Pick<ShopifyProduct, "id" | "handle" | "title" | "images">;
  };
  cost: {
    totalAmount: ShopifyMoney;
  };
}

export interface ShopifyPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

// Supabase types
export interface SiteContent {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface SiteColor {
  id: string;
  key: string;
  value: string;
  label: string;
}

export interface SiteInfo {
  id: string;
  key: string;
  value: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  image_url: string | null;
  active: boolean;
  sort_order: number;
  created_at: string;
}

// Site data aggregate
export interface SiteData {
  content: Record<string, string>;
  siteInfo: Record<string, string>;
  colors: Record<string, string>;
}
