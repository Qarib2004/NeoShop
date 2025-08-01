import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useMemo, useRef } from 'react'
import toast from 'react-hot-toast'
import { fileService } from '@/services/file.service'

export function useUpload(onChange: (value: string[]) => void) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { mutate: uploadFiles, isPending: isUploading } = useMutation({
        mutationKey: ['upload files'],
        mutationFn: (formData: FormData) => fileService.uploadMultiple(formData), // Changed to uploadMultiple
        onSuccess: (urls: string[]) => {
            onChange(urls)
            toast.success('File(s) successfully uploaded')
        },
        onError: (error: any) => {
            console.error('Upload error:', error)
            toast.error(error.message || 'File upload error')
        }
    })

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files || files.length === 0) return
        

        const formData = new FormData()
        Array.from(files).forEach((file: File) => {
            formData.append('files', file) })

        uploadFiles(formData)

        event.target.value = ''
    }

    const handleButtonClick = () => {
        fileInputRef.current?.click()
    }

    

    // return {
    //     handleButtonClick,
    //     isUploading,
    //     fileInputRef,
    //     handleFileChange
    // }

    return useMemo(
        () => ({
            handleButtonClick,
            isUploading,
            fileInputRef,
            handleFileChange
        }),
        [ handleButtonClick,
            isUploading,
            fileInputRef,
            handleFileChange]
      )
}