import React, { useState, useEffect, useMemo } from 'react';

import classes from './ProductsTable.module.scss';

import ProductsNavbar from '../ProductsNavbar/ProductsNavbar';

import IProduct from '../../interfaces/IProduct';
import ICategory from '../../interfaces/ICategory';
import { GetCategories, GetProductsByCategoryID, DeleteProductByID } from '../../http/ProductsAPI';

const ProductsTable : React.FC = () => {
    const [currentCategoryID, setCurrentCategoryID] = useState<number>(-1);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categories, setCategories] = useState<Array<ICategory>>([]);

    const [products, setProducts] = useState<Array<IProduct>>([]);
    const [productsLoading, setProductsLoading] = useState(false);

    useEffect(()=> {
        (async () => {
            const response = await GetCategories();

            if (response.status === 200) {
                setCurrentCategoryID(response.message.categories[0].id)
                setCategories(response.message.categories)
            }

            setCategoriesLoading(false);
        })();
      }, []);


    useEffect(() => {
        setProductsLoading(true);

        (async () => {
            const response = await GetProductsByCategoryID(currentCategoryID);

            if (response.status === 200) {
                setProducts(response.message.products);
            }

            setProductsLoading(false);
        })();
    }, [currentCategoryID]);

    const DeleteProduct = async (id : number) => {
        const response = await DeleteProductByID(id);

        if (response.status === 200) {
            console.log("Успешно удален")
            setProducts(products.filter((product) => product.id != id))
        }
    }

    const ChangeProduct = async (id : number) => {

    }

    return (
        categoriesLoading || productsLoading ? 
        <p>Загрузка...</p>
        :
        <>
            <ProductsNavbar 
                categories={categories} 
                currentCategoryID={currentCategoryID} 
                setCurrentCategoryID={setCurrentCategoryID}
            />
            <table>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        return <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td className={classes.actions}>
                                <button onClick={() => ChangeProduct(product.id)}>Изменить</button>
                                <button onClick={() => DeleteProduct(product.id)}>Удалить</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </>   
    )
}

export default ProductsTable;
