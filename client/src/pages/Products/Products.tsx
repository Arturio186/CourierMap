import React, { useState } from 'react';

import './Products.scss';

import ProductsTable from '../../components/ProductsTable/ProductsTable';

const Products : React.FC = () => {
    const data = [
        {category: {id: 1, name: 'Напитки'}, products: [
            {name: 'Sprite', price: 200},
            {name: 'Fanta', price: 160},
            {name: 'Baikal', price: 150},
            {name: 'Tarhun', price: 150},
            {name: 'Pepsi', price: 140},
        ]},
        {category: {id: 2, name: 'Закуски'}, products: [
            {name: 'Гренки', price: 200},
            {name: 'Чипсы', price: 160},
            {name: 'Картофель фри', price: 150}
        ]},
        {category: {id: 3, name: 'Горячая еда'}, products: [
            {name: 'Паста карбонара', price: 400},
            {name: 'Хачапури', price: 360},
            {name: 'Борщ', price: 350},
            {name: 'Солянка', price: 250},
            {name: 'Гороховый суп', price: 240},
        ]},
    ]

    return (
        <div className="inner-content">
            <ProductsTable categories={data} />
        </div>  
    )
}

export default Products;