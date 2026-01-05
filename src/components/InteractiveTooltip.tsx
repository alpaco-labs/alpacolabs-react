import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

interface InteractiveTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
}

export const InteractiveTooltip = ({
  children,
  content,
  isOpen,
  onOpenChange,
  side = "bottom",
  align = "end",
  sideOffset = 10,
  className,
}: InteractiveTooltipProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const shouldShow = isOpen || isHovering;

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      
      // Don't close if clicking inside tooltip content
      if (contentRef.current?.contains(target)) {
        return;
      }
      
      // Don't close if clicking the trigger (toggle handles this)
      if (triggerRef.current?.contains(target)) {
        return;
      }
      
      onOpenChange(false);
    };

    // Use mousedown/touchstart to catch clicks before they propagate
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onOpenChange]);

  const handleClick = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onOpenChange(!isOpen);
  }, [isOpen, onOpenChange]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  return (
    <TooltipPrimitive.Provider delayDuration={0}>
      <TooltipPrimitive.Root open={shouldShow}>
        <TooltipPrimitive.Trigger asChild>
          <button
            ref={triggerRef}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          >
            {children}
          </button>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          ref={contentRef}
          side={side}
          align={align}
          sideOffset={sideOffset}
          onPointerDownOutside={(e) => {
            // Prevent closing when clicking inside
            if (contentRef.current?.contains(e.target as Node)) {
              e.preventDefault();
            }
          }}
          className={cn(
            "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
          )}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
