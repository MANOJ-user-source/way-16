import Link from 'next/link';
import Image from 'next/image';

export interface Product {
  title: string;
  slug: string;
  image: string;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block bg-neutral-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
    >
      <div className="relative h-40">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gold">{product.title}</h3>
      </div>
    </Link>
  );
}