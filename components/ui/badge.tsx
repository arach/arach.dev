import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider rounded-sm",
  {
    variants: {
      variant: {
        default: "bg-gray-800 text-gray-400 border border-gray-700",
        primary: "bg-sky-500/10 text-sky-500 border border-sky-500/30",
        success: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30",
        warning: "bg-amber-500/10 text-amber-500 border border-amber-500/30",
        error: "bg-red-500/10 text-red-500 border border-red-500/30",
        info: "bg-blue-500/10 text-blue-500 border border-blue-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }