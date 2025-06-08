import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
    const Navigate=useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        if (!data.amount) {
            data.amount = 1;
        }
        try {
            const response = await axios.post("http://localhost:2100/api/product", data,
                { headers: { Authorization: "Bearer " + localStorage.getItem("userToken") } })
            console.log(response.data);
        } catch (error) {
            console.error("Error adding product", error);
        }
        await Navigate('/manage')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input
                    id="price"
                    type="number"
                    {...register('price', {
                        required: 'Price is required',
                        min: { value: 1, message: 'Price must be greater than zero' }
                    })}
                />
                {errors.price && <p>{errors.price.message}</p>}
            </div>
            <div>
                <label htmlFor="picture">Picture:</label>
                <input
                    id="picture"
                    type="string"
                    {...register('picture', { required: 'Picture is required' })}
                />
                {errors.image && <p>{errors.image.message}</p>}
            </div>
            <div>
                <label htmlFor="color">Color:</label>
                <input
                    id="color"
                    type="text"
                    {...register('color')}
                />
                {errors.color && <p>{errors.color.message}</p>}
            </div>
            <div>
                <label htmlFor="amount">Amount:</label>
                <input
                    id="amount"
                    type="number"
                    {...register('amount', { min: { value: 1, message: 'Amount must be greater than zero' } })}
                />
                {errors.amount && <p>{errors.amount.message}</p>}
            </div>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct