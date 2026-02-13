"use client";

import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
    className?: string;
    text?: string;
}

export default function ImagePlaceholder({ className, text = "Image" }: ImagePlaceholderProps) {
    return (
        <div className={cn("bg-wedding-charcoal/20 flex items-center justify-center overflow-hidden", className)}>
            <div className="text-wedding-clay/20 font-serif text-4xl font-light tracking-widest uppercase">
                {text}
            </div>
        </div>
    );
}
