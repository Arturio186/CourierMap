import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import classes from './EditProductForm.module.scss';

import { EditProductByID } from 'http/ProductsAPI';

import IEditProductField from 'interfaces/IEditProductField';
import IEditProductFormProps from 'interfaces/props/IEditProductFormProps';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

const EditProductForm : React.FC<IEditProductFormProps> = ({targetProduct, products, setProducts, showNotification, setVisible}) => {
    const {register, handleSubmit, formState: { errors }, setValue} = useForm<IEditProductField>({mode: "onChange"});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setValue('name', targetProduct.name);
        setValue('price', targetProduct.price);
    }, [targetProduct]);

    const onSubmit: SubmitHandler<IEditProductField> = async (data) => {
        setLoading(true);

        const response = await EditProductByID(targetProduct.id, data.name, Number(data.price));
        
        if (response.status === 200) {
            const updatedProduct = response.message.updatedProduct;
            
            const updatedProducts = products.map((product) => product.id === updatedProduct.id ? updatedProduct : product)

            setProducts(updatedProducts);

            showNotification(`Успешно изменен продукт ${updatedProduct.name}`);

            
        } else {
            showNotification(`Ошибка при изменении. ${response.message}`)
        }
        setLoading(false);
        setVisible(false);
    }

    return (
        <div className={classes.container}>
            {loading ? <p>Загрузка...</p> 
            :
            <>
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
            </>
            }
        </div>
    )
}

export default EditProductForm;