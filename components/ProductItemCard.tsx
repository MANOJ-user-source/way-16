import Image from "next/image";

export default function ProductItemCard({ name, image }: { name: string; image: string }) {
  return (
    <div className="bg-neutral-800 rounded-lg overflow-hidden shadow">
      <div className="relative h-40 bg-neutral-900">
        <Image src={image || "/placeholder.png"} alt={name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-base font-medium">{name}</h3>
      </div>
    </div>
  );
}

