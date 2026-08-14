import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceProofProps {
  label: string;
  items: { name: string; href: string }[];
}

export function ServiceProof({ label, items }: ServiceProofProps) {
  return (
    <div className="mt-6 rounded-xl border border-border-light bg-page p-4 md:p-5">
      <p className="text-[10px] font-medium tracking-[0.14em] text-stone uppercase">
        {label}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border-light bg-porcelain px-3 py-2 text-sm font-medium text-carbon transition-colors hover:border-sage/40 hover:text-forest"
          >
            {item.name}
            <ArrowRight className="h-3.5 w-3.5 opacity-60" />
          </Link>
        ))}
      </div>
    </div>
  );
}
