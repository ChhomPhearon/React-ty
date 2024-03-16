import React, { useEffect, useState } from 'react';
import CardComponent from './CardComponent';
import LoadingComponent from '../Loading/LoadingComponent';
import ButtonCreateProduct from '../Loading/ButtonCreateProduct';

export type Product = {
    id: number;
    title: string;
    description: string;
    image: string;
}

const HomeComponent = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchData() {
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data: Product[] = await response.json();
            setProducts(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <ButtonCreateProduct/>
            {loading ? (
                <LoadingComponent />
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <div className="flex justify-center gap-4 flex-wrap">
                    {products.map(product => (
                        <CardComponent
                            key={product.id}
                            image={product.image}
                            title={product.title}
                            description={product.description}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default HomeComponent;
