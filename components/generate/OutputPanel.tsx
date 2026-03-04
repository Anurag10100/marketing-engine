"use client";

import { useState } from "react";
import { Copy, Check, Star } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface OutputPanelProps {
  outputText: string;
  outputId: string | null;
  onRate?: (rating: number, note?: string) => void;
}

export function OutputPanel({ outputText, outputId, onRate }: OutputPanelProps) {
  const [copied, setCopied] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!outputText) {
    return (
      <Card className="flex min-h-[300px] items-center justify-center">
        <p className="font-mono text-xs uppercase tracking-wider text-text-disabled">
          Generated content will appear here
        </p>
      </Card>
    );
  }

  return (
    <Card className="relative">
      <button
        onClick={handleCopy}
        className="absolute right-4 top-4 rounded-[6px] p-2 text-text-muted transition-colors duration-200 hover:bg-bg-elevated hover:text-text-primary"
      >
        {copied ? (
          <Check className="h-4 w-4 text-success" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>

      <div className="whitespace-pre-wrap pr-12 font-sans text-sm leading-relaxed text-text-primary">
        {outputText}
      </div>

      {outputId && onRate && (
        <div className="mt-6 flex items-center gap-2 border-t border-border-default pt-4">
          <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
            Rate:
          </span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => {
                setRating(star);
                onRate(star);
              }}
              className="transition-transform duration-200 hover:scale-110"
            >
              <Star
                className={`h-5 w-5 ${
                  star <= (hoverRating || rating)
                    ? "fill-accent text-accent"
                    : "text-text-disabled"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}
