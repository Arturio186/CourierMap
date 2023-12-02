import React from 'react';

import IProduct from '../IProduct';

export default interface IEditProductFormProps {
    targetProduct: IProduct;
    products: Array<IProduct>;
    setProducts: React.Dispatch<React.SetStateAction<Array<IProduct>>>;
    showNotification: (message: string) => void;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}   