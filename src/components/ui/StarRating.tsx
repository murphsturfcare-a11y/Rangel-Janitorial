import { Star } from 'lucide-react';

type StarSize = 'sm' | 'md' | 'lg';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: StarSize;
}

const sizeMap: Record<StarSize, number> = {
  sm: 16,
  md: 20,
  lg: 28,
};

export default function StarRating({
  rating,
  maxStars = 5,
  size = 'md',
}: StarRatingProps) {
  const iconSize = sizeMap[size];
  const clampedRating = Math.max(0, Math.min(rating, maxStars));

  return (
    <div className="inline-flex items-center gap-0.5" role="img" aria-label={`${clampedRating} out of ${maxStars} stars`}>
      {Array.from({ length: maxStars }, (_, i) => {
        const starIndex = i + 1;
        const fillFraction = Math.max(0, Math.min(1, clampedRating - i));

        if (fillFraction >= 1) {
          // Fully filled star
          return (
            <Star
              key={starIndex}
              size={iconSize}
              className="text-gold fill-gold"
              aria-hidden="true"
            />
          );
        }

        if (fillFraction <= 0) {
          // Empty star
          return (
            <Star
              key={starIndex}
              size={iconSize}
              className="text-gray-300"
              fill="none"
              aria-hidden="true"
            />
          );
        }

        // Partial (half) star — use a clip mask to fill proportionally
        const clipId = `star-clip-${starIndex}-${Math.round(fillFraction * 100)}`;
        return (
          <span key={starIndex} className="relative inline-block" style={{ width: iconSize, height: iconSize }}>
            {/* Background empty star */}
            <Star
              size={iconSize}
              className="absolute inset-0 text-gray-300"
              fill="none"
              aria-hidden="true"
            />
            {/* Foreground filled star with proportional clip */}
            <svg
              width={iconSize}
              height={iconSize}
              viewBox={`0 0 ${iconSize} ${iconSize}`}
              className="absolute inset-0"
              aria-hidden="true"
            >
              <defs>
                <clipPath id={clipId}>
                  <rect x="0" y="0" width={iconSize * fillFraction} height={iconSize} />
                </clipPath>
              </defs>
              <g clipPath={`url(#${clipId})`}>
                <foreignObject width={iconSize} height={iconSize}>
                  <Star
                    size={iconSize}
                    className="text-gold fill-gold"
                  />
                </foreignObject>
              </g>
            </svg>
          </span>
        );
      })}
    </div>
  );
}
