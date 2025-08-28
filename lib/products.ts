import fs from "fs";
import path from "path";
import site from "../data/site.json";

export type ProductItem = {
  name: string;
  image: string; // resolved public path or placeholder
};

export type ProductCategory = {
  name: string;
  slug: string;
  image: string; // resolved public path for category image
  items: ProductItem[];
};

const PUBLIC_IMAGES_DIR = path.join(process.cwd(), "public", "images");
const PLACEHOLDER = "/placeholder.png";

// Cache file list to avoid repeated fs calls
let imageFiles: string[] | null = null;

function ensureImageFiles(): string[] {
  if (imageFiles) return imageFiles;
  try {
    imageFiles = fs
      .readdirSync(PUBLIC_IMAGES_DIR)
      .filter((f) => f.toLowerCase().endsWith(".png"));
  } catch {
    imageFiles = [];
  }
  return imageFiles!;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeForMatch(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function findCategoryImage(categoryName: string): string {
  const files = ensureImageFiles();
  // Try exact filename match first
  const exact = files.find((f) => f.replace(/\.png$/i, "") === categoryName);
  if (exact) return `/images/${exact}`;

  // Try case-insensitive exact match
  const ci = files.find((f) => f.toLowerCase().replace(/\.png$/i, "") === categoryName.toLowerCase());
  if (ci) return `/images/${ci}`;

  // Try normalized match (handles & vs and, spaces, etc.)
  const target = normalizeForMatch(categoryName);
  const norm = files.find((f) => normalizeForMatch(f.replace(/\.png$/i, "")) === target);
  if (norm) return `/images/${norm}`;

  // Known alias for Engine Parts -> 'Engine part.png'
  if (/engine parts?/i.test(categoryName)) {
    const alias = files.find((f) => f.toLowerCase() === "engine part.png");
    if (alias) return `/images/${alias}`;
  }

  return PLACEHOLDER;
}

function findItemImage(itemName: string, categoryImage: string): string {
  const files = ensureImageFiles();

  // 1) exact item name file
  let found = files.find((f) => f.replace(/\.png$/i, "") === itemName);
  if (found) return `/images/${found}`;

  // 2) case-insensitive exact
  found = files.find((f) => f.toLowerCase().replace(/\.png$/i, "") === itemName.toLowerCase());
  if (found) return `/images/${found}`;

  // 3) normalized slug style
  const target = normalizeForMatch(itemName);
  found = files.find((f) => normalizeForMatch(f.replace(/\.png$/i, "")) === target);
  if (found) return `/images/${found}`;

  // 4) partial heuristics for some known patterns
  //    e.g., "Cylinder liners & sleeves" -> "cylinder-liners.png"
  const parts = target.split("-");
  for (let len = parts.length; len >= 2; len--) {
    const prefix = parts.slice(0, len).join("-");
    found = files.find((f) => normalizeForMatch(f.replace(/\.png$/i, "")).startsWith(prefix));
    if (found) return `/images/${found}`;
  }

  // Fallback to category image or placeholder
  return categoryImage || PLACEHOLDER;
}

export function getCategories(): ProductCategory[] {
  const products = site.products || [];
  return products.map((p) => {
    const name = p.category;
    const slug = slugify(name);
    const categoryImage = findCategoryImage(name);
    const items: ProductItem[] = (p.items || []).map((itemName) => ({
      name: itemName,
      image: findItemImage(itemName, categoryImage),
    }));
    return { name, slug, image: categoryImage, items };
  });
}

export function getCategoryBySlug(slug: string): ProductCategory | null {
  const cats = getCategories();
  return cats.find((c) => c.slug === slug) || null;
}

