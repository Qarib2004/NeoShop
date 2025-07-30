import { rootActions } from "@/store/root-actions"
import { bindActionCreators } from "@reduxjs/toolkit"
import { useMemo } from "react"
import { useDispatch } from "react-redux"





export const useAction = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions,dispatch),[dispatch])
}