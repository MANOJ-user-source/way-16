import { Metadata } from 'next';

// Placeholder product data
const productData: Record<string, { title: string; category: string }> = {};

interface PageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = productData[params.slug];
  return {
    title: product ? `${product.title} - 16 WAYS` : 'Product - 16 WAYS',
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = productData[params.slug];
  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-serif text-gold mb-4">Product Not Found</h1>
        <p className="text-gray-300">The product you are looking for does not exist.</p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-serif text-gold mb-4">{product.title}</h1>
      <p className="text-gray-300 mb-8">Product details coming soon.</p>
    </div>
  );
}