import React, { useEffect, useState } from 'react';
import { Label, TextInput, Textarea } from 'flowbite-react';

export type AddProduct = {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
};

type ErrorType = {
    title?: string;
    price?: string;
};

type CreateProductFromProps = {
    getDataFrom: (product: AddProduct) => void;
};

const FormCreateProduct: React.FC<CreateProductFromProps> = ({ getDataFrom }) => {
    const [product, setProduct] = useState<AddProduct>({
        title: '',
        price: 0,
        description: '',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
    });

    useEffect(() => {
        getDataFrom(product);
    }, [product, getDataFrom]);

    const [error, setError] = useState<ErrorType>({});

    useEffect(() => {
        const newError: ErrorType = {};
        if (product.title.length && product.title.length < 3)
            newError.title = 'Title must be at least 3 characters';
        if (product.price && Number(product.price) <= 0) {
            newError.price = 'Price must be greater than 0';
        }
        setError(newError);
    }, [product.title, product.price]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [id]: value
        }));
    };

    return (
        <form className="flex max-w-md flex-col gap-4">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="title" value="Product Title" />
                </div>
                <TextInput id="title" type="text" placeholder="T-shirt" required onChange={handleChange} />
                {error.title && <p className="text-red-500">{error.title}</p>}
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="price" value="Product Price" />
                </div>
                <TextInput id="price" type="number" required value={product.price.toString()} onChange={handleChange}/>
                {error.price && <p className="text-red-500">{error.price}</p>}
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="description" value="Product Description" />
                </div>
                <Textarea id="description" placeholder="Product description" required value={product.description} onChange={handleChange}/>
            </div>
        </form>
    );
};

export default FormCreateProduct;
