import { cn } from "@/utils/clsx";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";






const iconVarinats = cva('animate-spin text-mites-foreground',{
    variants:{
        size:{
            default:"size-9",
            sm:'size-6'
        }
    },
    defaultVariants:{
        size:'default'
    }
})

type TypeIconVariants = VariantProps<typeof iconVarinats>

interface ILoader extends TypeIconVariants{}

export const Loader = ({size}:ILoader) => {
    return <LoaderCircle className={cn(iconVarinats({size}))} />
}