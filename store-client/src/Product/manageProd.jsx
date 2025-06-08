// import axios from "axios"
// import { useEffect,useState } from "react"
// import UpdateProd from "./updateProd"
// import { useNavigate } from "react-router-dom"

// const ManageProd=()=>{
//     const Navigate=useNavigate()
//     const [products,setProducts]=useState([])

//     const fetchProduct=async()=>{
//         const {data}=await axios.get("http://localhost:2100/api/product")
//         setProducts(data)
// }
// console.log(products);
// useEffect(()=>{
//     fetchProduct()
// } ,[]) 
// if(products.length===0)
//     return (<h1>loading</h1>)
// const updateProd=async(p)=>{
//     await Navigate('/update',{state:p})
// }
// const deleteProd=async(p)=>{
//     const {data:d}=await axios.delete("http://localhost:2100/api/product",{
//     data:{_id:p._id},headers:{Authorization:"Bearer "+localStorage.getItem("userToken")}})
//     console.log(d);
//     fetchProduct()
// }
// const addProduct=async()=>{
//     await Navigate('/addProduct')
// }
// return(
// <>
// <button onClick={addProduct}>Add product</button>
// {products.map((p)=>{
//     return <div>
//     <h1>{`${p.name} ${p.price} ${p.color}`}</h1>
//     <img src={`http://localhost:2100/${p.picture}`} alt={`${p.name}`} />
//     <button onClick={()=>deleteProd(p)}>Delete</button>
//     <button onClick={()=>updateProd(p)}>Update</button>
//     </div>
// })}
// </>
// )
// }
// export default ManageProd

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService } from './service/ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import axios from "axios"

export default function ManageProd() {
    let emptyProduct = {
        name: '',
        picture: null,
        price: 0,
        color: '',
        amount: 1,
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);

    const fetchProduct = async () => {
        try {
            const { data } = await axios.get("http://localhost:2100/api/product")
            setProducts(data)
        }
        catch (error) {

        }
    }
    useEffect(() => {
        fetchProduct()
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = async () => {
        let _product = { ...product };
        try {
            if(_product.name&&_product.price&&_product.picture){
        setSubmitted(true);

        if (product.name.trim()) {
            let _product = { ...product };
            if (product._id) {
               console.log(_product.picture);
               
                    const { data } = await axios.put("http://localhost:2100/api/product", { name: _product.name, price: _product.price, color: _product.color, picture: _product.picture, _id: _product._id, amount: _product.amount },
                        { headers: { Authorization: "Bearer " + localStorage.getItem("userToken") } })
                    console.log(data);
                    fetchProduct()
                    toast.current.show({ severity: 'success',summary: 'Success', detail: 'Product Updated', life: 3000 });

                
                // else{toast.current.show({ severity: 'error', summary: '', detail: 'name,price,picture are required', life: 3000 });}  
                // } catch (error) {
                //     toast.current.show({ severity: 'error', detail: 'Failed', life: 3000 });
                //     console.error(error)
                // }
            } else {
                // try {
                
                    const response = await axios.post("http://localhost:2100/api/product", { name: _product.name, price: _product.price, color: _product.color, picture: _product.picture, amount: _product.amount },
                        { headers: { Authorization: "Bearer " + localStorage.getItem("userToken") } })
                    fetchProduct()
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                   
                // } catch (error) {
                //     toast.current.show({ severity: 'error', detail: 'Failed', life: 3000 });
                //     console.error(error)
                // }
            // }

            
        }}
    }else{toast.current.show({ severity: 'error', summary: '', detail: 'name,price,picture are required', life: 3000 });}  

        setProductDialog(false);
        setProduct(emptyProduct);
    }catch (error) {
                    toast.current.show({ severity: 'error', detail: 'Failed', life: 3000 });
                    console.error(error)
                }
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };
    //delete
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = async () => {
        try {
            const { data } = await axios.delete("http://localhost:2100/api/product", {
                data: { _id: product._id }, headers: { Authorization: "Bearer " + localStorage.getItem("userToken") }
            })
            console.log(data);
            fetchProduct()
            setDeleteProductDialog(false);
            setProduct(emptyProduct);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        } 
        catch (error) {
            toast.current.show({ severity: 'error', detail: 'Failed', life: 3000 });
            console.error(error)
        }
    };
    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;
        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;
        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
            </div>
        );
    };
    const imageBodyTemplate = (rowData) => {
        return <img src={`http://localhost:2100/${rowData.picture}`} alt={rowData.picture} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value="5" readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value="in stock" ></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };


    const header = (
        <>
            <h4 className="m-0">Manage Products</h4>
        </>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" header={header}>
                    <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="picture" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="color" header="Color" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.picture && <img src={`http://localhost:2100/${product.picture}`} alt={product.picture} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="picture" className="font-bold">
                        Picture
                    </label>
                    <InputTextarea id="picture" value={product.picture} onChange={(e) => onInputChange(e, 'picture')} rows={3} cols={20} required autoFocus className={classNames({ 'p-invalid': submitted && !product.picture })} />
                    {submitted && !product.picture && <small className="p-error">Picture is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="color" className="font-bold">
                        Color
                    </label>
                    <InputTextarea id="color" value={product.color} onChange={(e) => onInputChange(e, 'color')} rows={3} cols={20} />
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="Coffee machines" name="category" value="Coffee machines" checked={true} />
                            <label htmlFor="Coffee machines">Coffee machines</label>
                        </div>
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="field col">
                        <label htmlFor="amount" className="font-bold">
                            Qantity
                        </label>
                        <InputNumber id="amount" value={product.amount} onValueChange={(e) => onInputNumberChange(e, 'amount')} />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}
