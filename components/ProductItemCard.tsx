import Image from "next/image";

export default function ProductItemCard({ name, image }: { name: string; image: string }) {
  return (
    <div className="group bg-neutral-800 rounded-xl overflow-hidden ring-1 ring-white/5 hover:ring-gold/30 shadow transition-transform duration-200 will-change-transform hover:scale-[1.01]">
      <div className="relative h-44 bg-neutral-900">
        <Image src={image || "/placeholder.png"} alt={name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-4">
        <h3 className="text-base font-medium">{name}</h3>
      </div>
    </div>
  );
}
