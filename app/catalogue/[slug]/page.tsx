import { notFound } from "next/navigation";
import Link from "next/link";
import ProductItemCard from "../../../components/ProductItemCard";
import { getCategories, getCategoryBySlug } from "../../../lib/products";

export const runtime = 'nodejs';

export async function generateStaticParams() {
  // Provide params for static generation
  return getCategories().map((c) => ({ slug: c.slug }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-serif text-gold">{category.name}</h1>
        <Link href="/catalogue" className="text-sm text-gold hover:underline">
          ← Back to catalogue
        </Link>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {category.items.map((item) => (
          <ProductItemCard key={item.name} name={item.name} image={item.image} />)
        )}
      </div>
    </div>
  );
}
