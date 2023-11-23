import React, { useState } from 'react';

import classes from './ProductsNavbar.module.scss';

import IProductsNavbarProps from '../../interfaces/IProductsNavbarProps';
import IProductsList from '../../interfaces/IProductsList';



const ProductsNavbar : React.FC<IProductsNavbarProps> = ({categories, currentCategoryID, setCurrentCategoryID}) => {
    return (
        <section className={classes.navbar}>
            {categories.map((productList : IProductsList) => { 
                return <p 
                        className={productList.category.id === currentCategoryID ? classes.active : classes.item}
                        onClick={() => setCurrentCategoryID(productList.category.id)}
                    >
                        {productList.category.name}
                    </p>
            })}
        </section>
    )
}

export default ProductsNavbar;
