import React from 'react';
import IProduct from '../IProduct';

export default interface IAddProductFormProps {
    category: number;
    products: Array<IProduct>;
    setProducts: React.Dispatch<React.SetStateAction<Array<IProduct>>>;
    showNotification: (message: string) => void;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}   