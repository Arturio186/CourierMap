import React from 'react';

import classes from './ProductsNavbar.module.scss';

import IProductsNavbarProps from '../../interfaces/IProductsNavbarProps';
import IProductsList from '../../interfaces/IProductsList';

interface ICategory {
    id: number;
    name: string;
}

const ProductsNavbar : React.FC<IProductsNavbarProps> = ({categories, currentCategoryID, setCurrentCategoryID}) => {
    return (
        <section className={classes.navbar}>
            {categories.map((category : ICategory) => { 
                return <p
                        key={category.id} 
                        className={category.id === currentCategoryID ? classes.active : classes.item}
                        onClick={() => setCurrentCategoryID(category.id)}
                    >
                        {category.name}
                    </p>
            })}
        </section>
    )
}

export default ProductsNavbar;
