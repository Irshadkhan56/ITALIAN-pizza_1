import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FoodImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fallbackLabel?: string;
}

export function FoodImage({
  src,
  alt,
  className,
  priority = false,
  fallbackLabel,
}: FoodImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          'flex flex-col items-center justify-center bg-[#EFEAE2] text-[#5E5E5E] p-6 text-center',
          className
        )}
      >
        <UtensilsCrossed className="w-7 h-7 mb-2 text-[#171717]/40" strokeWidth={1.5} />
        <span className="text-sm font-medium text-[#171717]/70">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
