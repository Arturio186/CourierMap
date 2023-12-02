import React from 'react';
import { useForm, SubmitHandler} from 'react-hook-form';

import classes from './AddProductForm.module.scss'

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { AddProduct } from '../../http/ProductsAPI';
import IProduct from '../../interfaces/IProduct';

interface IAddProductField {
    name: string;
    price: number;
}

interface IAddProductFormProps {
    category: number;
    products: Array<IProduct>;
    setProducts: React.Dispatch<React.SetStateAction<Array<IProduct>>>;
    showNotification: (message: string) => void;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}   

const AddProductForm : React.FC<IAddProductFormProps> = ({category, products, setProducts, showNotification, setVisible}) => {
    const {register, handleSubmit, formState: { errors }} = useForm<IAddProductField>({mode: "onChange"});

    const onSubmit: SubmitHandler<IAddProductField> = async (data) => {
        const response = await AddProduct(data.name, Number(data.price), category);
        
        if (response.status === 200) {
            setProducts([...products, response.message.createdProduct]);
            showNotification(`Успешно добавил новый продукт ${response.message.createdProduct.name}`);
            setVisible(false);
        } else {

        }
    }

    return (
        <div className={classes.container}>
            <h2 className={classes.title}>Добавление продукта</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <Input
                    id="name"  
                    placeholder="Название"
                    type="text"
                    register={register('name', {
                        required: 'Не может быть пустое название',
                    })}
                    error={errors.name}
                />
                <Input
                    id="price"  
                    placeholder="Цена"
                    type="number"
                    register={register('price', {
                        required: 'Цена не должна отсутствовать',
                    })}
                    error={errors.price}
                />
                <Button>Добавить</Button>
            </form>
        </div>
    )
}

export default AddProductForm;