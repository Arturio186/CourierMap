import React from 'react';
import { useForm, SubmitHandler} from 'react-hook-form';

import classes from './EditProductForm.module.scss'

import { EditProductByID } from 'http/ProductsAPI';
import IProduct from 'interfaces/IProduct';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';


interface IEditProductField {
    name: string;
    price: number;
}

interface IEditProductFormProps {
    targetProduct: IProduct;
    products: Array<IProduct>;
    setProducts: React.Dispatch<React.SetStateAction<Array<IProduct>>>;
    showNotification: (message: string) => void;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}   

const EditProductForm : React.FC<IEditProductFormProps> = ({targetProduct, products, setProducts, showNotification, setVisible}) => {
    const {register, handleSubmit, formState: { errors }} = useForm<IEditProductField>({mode: "onChange"});

    const onSubmit: SubmitHandler<IEditProductField> = async (data) => {
        const response = await EditProductByID(targetProduct.id, data.name, Number(data.price));
        
        if (response.status === 200) {
            const updatedProduct = response.message.updatedProduct;

            const withoutTarget = products.filter((product) => product.id != updatedProduct.id);

            setProducts([...withoutTarget, updatedProduct]);
            showNotification(`Успешно изменен продукт ${updatedProduct.name}`);

            setVisible(false);
        } else {
            showNotification(`Ошибка при добавлении. ${response.message}`)
        }
    }

    return (
        <div className={classes.container}>
            <h2 className={classes.title}>Изменение продукта</h2>
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
                <Button>Изменить</Button>
            </form>
        </div>
    )
}

export default EditProductForm;