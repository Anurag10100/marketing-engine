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
      <Card className="flex min-h-[300px] items-center justify-center text-zinc-500">
        <p>Generated content will appear here</p>
      </Card>
    );
  }

  return (
    <Card className="relative">
      <button
        onClick={handleCopy}
        className="absolute right-4 top-4 rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>

      <div className="whitespace-pre-wrap pr-12 font-mono text-sm leading-relaxed text-zinc-200">
        {outputText}
      </div>

      {outputId && onRate && (
        <div className="mt-6 flex items-center gap-2 border-t border-zinc-800 pt-4">
          <span className="text-sm text-zinc-500">Rate this output:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => {
                setRating(star);
                onRate(star);
              }}
            >
              <Star
                className={`h-5 w-5 ${
                  star <= (hoverRating || rating)
                    ? "fill-amber-500 text-amber-500"
                    : "text-zinc-600"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}
