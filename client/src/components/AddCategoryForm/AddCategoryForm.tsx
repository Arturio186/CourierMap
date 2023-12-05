import React, { useState } from 'react';
import { useForm, SubmitHandler} from 'react-hook-form';

import classes from './AddCategoryForm.module.scss'

import IAddCategoryField from 'interfaces/IAddCategoryField';
import IAddCategoryFormProps from 'interfaces/props/IAddCategoryFormProps';

import { AddCategory } from 'http/CategoriesAPI';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

const AddCategoryForm : React.FC<IAddCategoryFormProps> = ({categories, setCategories, showNotification, setVisible}) => {
    const {register, handleSubmit, formState: { errors }} = useForm<IAddCategoryField>({mode: "onChange"});

    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<IAddCategoryField> = async (data) => {
        setLoading(true);
        alert(data);
        const response = await AddCategory(data.name);
        
        if (response.status === 200) {
            console.log(response.message)
            setCategories([...categories, response.message.createdCategory]);
            showNotification(`Успешно добавил новую категорию ${response.message.createdCategory.name}`);
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
                <h2 className={classes.title}>Добавление категории</h2>
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
                    <Button>Добавить</Button>
                </form>
            </>
            }
            
        </div>
    )
}

export default AddCategoryForm;