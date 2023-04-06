import clsx from "clsx"
import type { FC, ElementType } from "react"

interface SkeletonProps {
   as?: ElementType
   width?: string
   height?: string
   className?: string
   [key: string]: any
}

export const Skeleton:FC<SkeletonProps> = ({
   as: Component = "div",
   width,
   height,
   className,
   ...props
}) => {
   const styles = clsx("rounded bg-black/10", className)

   return (
      <Component
         width={width}
         height={height}
         className={styles}
         {...props}
      />
   )
}