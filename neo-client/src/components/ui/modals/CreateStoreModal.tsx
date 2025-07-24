import { useCreateStore } from "@/hooks/queries/stores/useCreateStore";
import { IStoreCreated } from "@/shared/types/store.interface";
import { PropsWithChildren, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form-element/Form";
import { Input } from "../form-element/Input";
import { Button } from "../Button";




export function CreateStoreModal({children}:PropsWithChildren){

    const [isOpen,setIsOpen] = useState(false)

    const {createStore,isLoadingCreate} = useCreateStore()

    const form = useForm<IStoreCreated>({
        mode:"onChange"
    })


    const onSubmit:SubmitHandler<IStoreCreated>= data =>{
        createStore(data)
        setIsOpen(false)
    }

    return <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="w-full">{children}</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create store</DialogTitle>
                 <DialogDescription>To create a store, you need to specify the name</DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                

			<FormField
				control={form.control}
				name='title'
				rules={{
					required: 'Title required',
					
				}}
				render={({ field }) => (
					<FormItem>
                                                    <FormLabel>Title store:</FormLabel>

						<FormControl>
							<Input
								className='bg-transparent'
								placeholder='Title store'
								disabled={isLoadingCreate}
								{...field}
								type='text'
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
            <div className="flex justify-end">
                <Button variant='primary' disabled={isLoadingCreate}>Create</Button>
            </div>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
}