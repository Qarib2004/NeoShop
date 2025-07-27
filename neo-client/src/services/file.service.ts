// file.service.ts
import { axiosWithAuth } from "@/api/api.interceptors"
import { API_URL } from "@/config/api.config"

class FileService {
    async uploadMultiple(files: FormData, folder?: string): Promise<string[]> {
        const { data } = await axiosWithAuth<{ urls: string[] }>({
            url: API_URL.files('/multiple'), // Ensure this matches your backend route
            method: 'POST',
            data: files,
            params: { folder },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data.urls
    }

    async uploadSingle(file: FormData, folder?: string): Promise<string> {
        const { data } = await axiosWithAuth<{ url: string }>({
            url: API_URL.files('/single'), // Ensure this matches your backend route
            method: 'POST',
            data: file,
            params: { folder },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data.url
    }
}

export const fileService = new FileService()