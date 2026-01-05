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
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Detect touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  // On desktop: show on hover only
  // On touch: show on tap (isOpen state)
  const shouldShow = isTouchDevice ? isOpen : isHovering;

  // Handle tap outside for touch devices
  useEffect(() => {
    if (!isOpen || !isTouchDevice) return;

    const handleTouchOutside = (event: TouchEvent) => {
      const target = event.target as Node;
      
      if (contentRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      
      onOpenChange(false);
    };

    document.addEventListener("touchstart", handleTouchOutside);
    return () => document.removeEventListener("touchstart", handleTouchOutside);
  }, [isOpen, isTouchDevice, onOpenChange]);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    if (!isTouchDevice) return;
    event.preventDefault();
    onOpenChange(!isOpen);
  }, [isTouchDevice, isOpen, onOpenChange]);

  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovering(true);
  }, [isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovering(false);
  }, [isTouchDevice]);

  return (
    <TooltipPrimitive.Provider delayDuration={0}>
      <TooltipPrimitive.Root open={shouldShow}>
        <TooltipPrimitive.Trigger asChild>
          <button
            ref={triggerRef}
            onTouchStart={handleTouchStart}
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
