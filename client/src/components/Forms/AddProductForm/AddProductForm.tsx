import React, { useState } from 'react';
import { useForm, SubmitHandler} from 'react-hook-form';

import classes from './AddProductForm.module.scss'

import { AddProduct } from 'http/ProductsAPI';

import IAddProductFormProps from 'interfaces/props/IAddProductFormProps';
import IAddProductField from 'interfaces/IAddProductField';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

const AddProductForm : React.FC<IAddProductFormProps> = ({category, products, setProducts, showNotification, setVisible}) => {
    const {register, handleSubmit, formState: { errors }} = useForm<IAddProductField>({mode: "onChange"});

    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<IAddProductField> = async (data) => {
        setLoading(true);

        const response = await AddProduct(data.name, Number(data.price), category);
        
        if (response.status === 200) {
            setProducts([...products, response.message.createdProduct]);
            showNotification(`Успешно добавил новый продукт ${response.message.createdProduct.name}`);
            setVisible(false);
        } else {
            showNotification(`Ошибка при добавлении. ${response.message}`)
        }

        setLoading(false);
    }

    return (
        <div className={classes.container}>
            {loading ? <p>Загрузка...</p> 
            :
            <>
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
            </>
            }
            
        </div>
    )
}

export default AddProductForm;