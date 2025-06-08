// import axios from "axios"
// import { useEffect, useState } from "react"
// const Cart = () => {
//     const [products, setProducts] = useState(null);

//     const getMyCart = async () => {
//         const { data } = await axios.get("http://localhost:2100/api/product/cart",
//             { headers: { Authorization: "Bearer " + localStorage.getItem("userToken") } })
//         console.log(data);
//         setProducts(data)
//     }
//     const deleteP = async (idProd) => {
//         const { data } = await axios.put("http://localhost:2100/api/product/cart/delete", { idProd },
//             { headers: { Authorization: "Bearer " + localStorage.getItem("userToken") } }
//         )
//         console.log(data);
//         getMyCart()
//     }
//     useEffect(() => {
//         getMyCart()
//     }, [])
//     return <>
//         {products?.shoppingCart && products.shoppingCart.length > 0 ? (//לבדוק אם הסל ריק
//             products.shoppingCart.map((prod) => (
//                 <>
//                     {prod.product?(//מוצר נמחק ויש בסל
//                         <div key={prod.product.id}>
//                             <h1>{`${prod.product.name} ${prod.product.price} ${prod.product.color}`}</h1>
//                             <img src={`http://localhost:2100/${prod.product.picture}`} alt={`${prod.product.name}`} />
//                             <button onClick={() => deleteP(prod.product._id)}>Delete</button>
//                         </div>
//                     ):<></>}
//                 </>
//             ))
//         ) : (
//             <p>The cart is empty</p>
//         )}
//     </>
// }
// export default Cart
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
// import ProductService from './service/ProductService';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

export default function Cart() {
    const [products, setProducts] = useState([]);
    const toast = useRef(null);

    const getMyCart = async () => {
        try {
            const { data } = await axios.get("http://localhost:2100/api/product/cart",
                { headers: { Authorization: "Bearer " + localStorage.getItem("userToken") } })
            console.log(data.shoppingCart);
            setProducts(data?.shoppingCart)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getMyCart()
    }, []);

    const deleteP = async (product) => {
        try {
            const { data } = await axios.put("http://localhost:2100/api/product/cart/delete", { idProd: product.product._id },
                { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } });
            console.log(data);
            toast.current.show({ severity: 'success', detail: `${product.product.name} has been deleted successfully`, life: 3000 });
            getMyCart()
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.current.show({severity:'error', detail:'Failed', life: 3000});

        }
    };

    const itemTemplate = (product, index) => {
        return (
            <>
                {product.product ? (
                    < div className="col-12" key={product._id} >
                        <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                            <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:2100/${product.product.picture}`} alt={product.name} />
                            <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                                <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                    <div className="text-2xl font-bold text-900">{product.product.name}</div>
                                    <Rating value="5" readOnly cancel={false}></Rating>
                                    <div className="flex align-items-center gap-3">
                                        <span className="flex align-items-center gap-2">
                                            <i className="pi pi-tag"></i>
                                            <span className="font-semibold">Coffee machines</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                    <span className="text-2xl font-semibold">${product.product.price}</span>
                                    <Button
                                        icon="pi pi-times"
                                        className="p-button-rounded"
                                        onClick={() => deleteP(product)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <></>}
            </>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0)
            return <div>No items found</div>;

        let list = items.map((product, index) => {
            return itemTemplate(product, index)
        })
        return <div className="grid grid-nogutter">{list}</div>
    }
    return (
        <div className="card">
            <Toast ref={toast} />
            <DataView
                value={Array.isArray(products) ? products : []}
                listTemplate={listTemplate}
            />
        </div>
    );
}









