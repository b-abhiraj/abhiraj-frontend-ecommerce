import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
    const [categories, setCategoies] = useState([])

    const getCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category')
            setCategoies(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCategories();
    }, [])
    return categories
}