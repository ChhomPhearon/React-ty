import React from 'react';
import { useEffect, useState } from 'react';
import CardComponent from './CardComponent';
import LoadingComponent from '../Loading/LoadingComponent';
import ButtonCreateProduct from '../Loading/ButtonCreateProduct';

export type Products = { 
    readonly id?: number;
    title: string;
    description: string;
    image: string;
}

const HomeComponent = () => {
    const [getProduct, setGetProduct] = useState<Products[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        try {
            const fetchProduct = await fetch("https://fakestoreapi.com/products");
            const res = await fetchProduct.json();
            console.log(res);
            setGetProduct(res);
        } catch (error) {
            console.log("Error", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
    
        <div>
            <>
            <ButtonCreateProduct/>
            </>
            {loading ? (
                <LoadingComponent />
            ) : (
                <>
                
                    <div className="flex justify-center gap-4 flex-wrap">
                        {getProduct.map((pro, index) => (
                            <CardComponent
                                key={index}
                                image={pro.image}
                                title={pro.title}
                                description={pro.description}
                            />
                        ))}
                    </div>
             </>
            )}
        </div>
    );
}

export default HomeComponent;
