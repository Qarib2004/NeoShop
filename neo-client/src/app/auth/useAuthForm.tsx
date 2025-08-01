import { DASHBOARD_URL, PUBLIC_URL } from "@/config/url.config";
import { authService } from "@/services/auth/auth.service";
import { IAuthForm } from "@/shared/types/auth.interface";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function useAuthForm(isReg:boolean){
      const router = useRouter()
     const form = useForm<IAuthForm>({
        mode:"onChange"
     }) 


     const {mutate,isPending} = useMutation({
        mutationKey:['auth user'],
        mutationFn:(data:IAuthForm) => authService.main(isReg ? "register" : 'login',data),
        onSuccess(){
            form.reset()
            toast.success('success authorization')
            router.replace(DASHBOARD_URL.home())
        },

        onError(error){
            if(error.message){
                toast.error(error.message)
            }else{
                toast.error("Error to authorization")
            }
        }
     })

     const onSubmit:SubmitHandler<IAuthForm> = data => {
        mutate(data)
     }

     return {onSubmit,form,isPending}
}