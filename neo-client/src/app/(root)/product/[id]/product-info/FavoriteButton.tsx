import { Button } from "@/components/ui/Button";
import { useProfile } from "@/hooks/useProfile";
import { userService } from "@/services/user.service";
import { IProduct } from "@/shared/types/product.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import  {Heart} from "lucide-react"

interface FavoriteButtonProps{
    product:IProduct
}




export function FavoriteButton({product}:FavoriteButtonProps){
    const {user} = useProfile()

    const queryClient = useQueryClient()


    const {mutate,isPending} = useMutation({
        mutationKey:['toggle favorites'],
        mutationFn:() => userService.toggleFavorites(product.id),
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey:['profile']
            })
        }
    })


    if(!user) return null

    const isExists = user.favorites.some(favorite => favorite.id === product.id)

    return (
        <Button variant='secondary' size='icon' onClick={() => mutate()} disabled={isPending}>
          {isExists? (<Heart className="w-5 h-5 fill-red-500 text-red-500 size-5" />):(
            <Heart className="size-5"/>
          )}
        </Button>
    )
}