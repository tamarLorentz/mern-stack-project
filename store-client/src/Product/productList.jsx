// import axios from "axios"
// import { useEffect,useState } from "react"
// import { MdAddShoppingCart } from "react-icons/md";

// const ProductList = ()=>{
// const [products,setProducts]=useState([])
// const fetchProduct=async()=>{
//     const {data}=await axios.get("http://localhost:2100/api/product")
//     setProducts(data)
// }
// useEffect(()=>{
//     fetchProduct()
// } ,[]) 
// if(products.length===0)
//     return (<h1>loading...</h1>)
// const addCart=async(p)=>{
//     const {data}=await axios.put("http://localhost:2100/api/product/cart",{idProd:p._id},
//         {headers:{Authorization:"Bearer "+localStorage.getItem("userToken")}})
// console.log(data);
// }
// return(
//         <>
// {products.map(p=>{
//     return <div>
//         {`${p.name} ${p.price} ${p.color}`}
//         <img src={`http://localhost:2100/${p.picture}`} alt={`${p.name}`} />
//         <button on onClick={()=>addCart(p)} >+ Add to cart {<MdAddShoppingCart />}</button>
//     </div>
// })}
//         </>
//     )
// }
// export default ProductList

import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux"
import axios from 'axios';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
//
import { useRef } from 'react';
import { Toast } from 'primereact/toast';

const ProductList = () => {
    
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const toast = useRef(null);
    const nameGlob=useSelector(n=>n.nameSlice.name)
    console.log(nameGlob);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get("http://localhost:2100/api/product");
                console.log("Fetched data:", data); // לוג נתונים שנאספו
                setProducts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching products:", error);

            }
        };

        fetchProducts();
    }, []);

    const addCart = async (product) => {
        try {
            const { data } = await axios.put("http://localhost:2100/api/product/cart",{ idProd: product._id },
                {headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }});
            console.log(nameGlob);
            toast.current.show({severity:'success',summary: nameGlob ,detail:`${product.name} successfully added to cart`, life: 3000});
        } catch (error) {
             if(!localStorage.getItem("userToken"))
                toast.current.show({severity:'error',summary: `Failed`, detail:`You are not registered`, life: 3000});
            else
             toast.current.show({severity:'error', detail:`Failed`, life: 3000});
            console.error("Error adding to cart",error)
        }
    };

    const listItem = (product, index) => {
      return (
          <div className="col-12" key={product.id}>
              <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                  <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:2100/${product.picture}`} alt={product.name} />
                  <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                      <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                          <div className="text-2xl font-bold text-900">{product.name}</div>
                          <Rating value="5" readOnly cancel={false}></Rating>
                          <div className="flex align-items-center gap-3">
                              <span className="flex align-items-center gap-2">
                                  <i className="pi pi-tag"></i>
                                  <span className="font-semibold">Coffee machines</span>
                              </span>
                              <Tag value={product.color} severity={product.color}></Tag>
                          </div>
                      </div>
                      <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                          <span className="text-2xl font-semibold">${product.price}</span>
                          <Button icon="pi pi-shopping-cart" className="p-button-rounded" onClick={() => addCart(product)} ></Button>
                      </div>
                  </div>
              </div>
          </div>
      );
  };


const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">Coffee machines</span>
                        </div>
                       <Tag value={product.color} severity={product.color} /> 
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={`http://localhost:2100/${product.picture}`} alt={product.name} />
                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value="5" readOnly cancel={false} /> 
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <Button
                            icon="pi pi-shopping-cart"
                            className="p-button-rounded"
                            onClick={() => addCart(product)}
                        />
                    </div>
                </div>
            </div>
        );
    };


    const itemTemplate = (product, layout, index) => {
        if (!product) return null;
        if (layout === 'list') return listItem(product, index);
         else if (layout === 'grid') return gridItem(product);
    };

  

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    if (products.length === 0) return <h1>Loading...</h1>;

    return (
        <div className="card">       
        <Toast ref={toast} />
            <DataView 
                value={products}
                layout={layout}
                itemTemplate={itemTemplate}
                header={header()}
            />
        </div>
    );
};

export default ProductList;
