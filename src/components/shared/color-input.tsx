import { ComponentProps, forwardRef } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const ColorInput = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  (props, ref) => (
    <Input
      ref={ref}
      {...props}
      className={cn(
        props.className,
        "w-8 h-8 rounded-md p-0 bg-transparent border-0"
      )}
      type="color"
    />
  )
);

ColorInput.displayName = "ColorInput";

export default ColorInput;
