import { PropsWithChildren, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useCreateReview } from '@/hooks/queries/reviews/useCreateReview'

import { IReviewInput } from '@/shared/types/review.interface'
import {Rating} from "react-simple-star-rating"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../form-element/Form'
import { Textarea } from '../Textarea'
import { Button } from '../Button'

interface ReviewModalProps {
	storeId: string
}

export function ReviewModal({
	children,
	storeId
}: PropsWithChildren<ReviewModalProps>) {
	const [isOpen, setIsOpen] = useState(false)

	const form = useForm<IReviewInput>({ mode: 'onChange' })

	const { createReview, isLoadingCreate } = useCreateReview(storeId)

	const onSubmit: SubmitHandler<IReviewInput> = data => {
		form.reset()
		createReview(data)
		setIsOpen(false)
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create review</DialogTitle>
					<DialogDescription>
						To create a review, you must specify the rating and text
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4'
					>
						<FormField control={form.control} name='rating' 
                        rules={{required:"Rating required"}}
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Rating onClick={field.onChange}
                                    initialValue={field.value}
                                    SVGstyle={{display:"inline-block"}}
                                    size={20}
                                    transition/>
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        <FormField control={form.control} name='text' 
                        rules={{required:"Text required"}}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Text</FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder='Text review...' disabled={isLoadingCreate}/>
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        <div className='flex justify-end'>
                            <Button variant='primary' disabled={isLoadingCreate}>
                                Create
                            </Button>
                        </div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
