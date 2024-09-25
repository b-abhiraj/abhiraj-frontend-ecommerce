import axios from 'axios'
import Layout from '../components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState({})
    const [related, setRelated] = useState([])
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug])

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimiliar(data.product._id, data.product.category._id)
        } catch (error) {
            console.log(error)
        }
    }

    const getSimiliar = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
            setRelated(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <div className='row container m-2'>
                <div className='col-md-6'>
                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} />
                </div>
                <div className='col-md-6'>
                    <h1 className='text-center'>Product Details</h1>
                    <h6>Name : {product.name}</h6>
                    <h6>Description : {product.description}</h6>
                    <h6>Price : {product.price}</h6>
                    <h6>Category : {product?.category?.name}</h6>
                </div>
            </div>
            <hr />
            <div className='row container'>
                <h4>Similiar Products</h4>
                {related.length < 1 && (<p>No Similiar Products Found</p>)}
                <div className='d-flex flex-wrap'>
                    {related?.map(p => (
                        <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                            <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">&#x20B9; {p.price}</p>
                                <p className="card-text">{p.description.substring(0, 30)}...</p>
                                <button className='btn btn-primary ms-2' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                <button className='btn btn-secondary ms-2'>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails