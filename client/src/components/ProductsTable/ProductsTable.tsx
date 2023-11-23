import React, { useState, useEffect } from 'react';

import classes from './ProductsTable.module.scss';

import ProductsNavbar from '../ProductsNavbar/ProductsNavbar';

import IProductsTableProps from '../../interfaces/IProductsTableProps';
import IProduct from '../../interfaces/IProduct';

const ProductsTable : React.FC<IProductsTableProps> = ({categories}) => {
    const [currentCategoryID, setCurrentCategoryID] = useState<number>(categories[0].category.id);
    const [currentProductList, setCurrentProductList] = useState<Array<IProduct>>([]);

    useEffect(() => {
        categories.map((category) => {
            if (category.category.id === currentCategoryID) {
                setCurrentProductList(category.products);
            }
        });
    }, [currentCategoryID]);

    return (
        <>
            <ProductsNavbar 
                categories={categories} 
                currentCategoryID={currentCategoryID} 
                setCurrentCategoryID={setCurrentCategoryID}
            />
            <table>
                <th>
                    <td>Название</td>
                    <td>Цена</td>
                    <td>Действие</td>
                </th>
                {currentProductList.map((product) => {
                    return <tr>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td className={classes.actions}>
                            <button>Изменить</button>
                            <button>Удалить</button>
                        </td>
                    </tr>
                })}
            </table>
        </>
    )
}

export default ProductsTable;
