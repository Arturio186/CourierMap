import React, { useState } from 'react';

import './Products.scss';

import ProductsTable from '../../components/ProductsTable/ProductsTable';

const Products : React.FC = () => {
    return (
        <div className="inner-content">
            <ProductsTable />
        </div>  
    )
}

export default Products;