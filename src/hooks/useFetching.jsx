import { useState } from "react"

export const useFetching = (callback) => {
    const [isLoading,setIsLoading] = useState(false);
    const [error, setError] = useState('')

    const featching = async(...args) => {
        try{
            setIsLoading(true)
            await callback(...args);
        }
        catch(error){
            setError(error.message)
        }
        finally{
            setIsLoading(false)
        }
    }
    return [featching,isLoading,error]
}