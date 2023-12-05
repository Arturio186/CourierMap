import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import classes from './EditCategoryForm.module.scss';

import { EditCategoryByID } from 'http/CategoriesAPI';

import IEditCategoryFormProps from 'interfaces/props/IEditCategoryFormProps';
import IEditCategoryField from 'interfaces/IEditCategoryField';

import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';


const EditCategoryForm : React.FC<IEditCategoryFormProps> = ({targetCategory, categories, setCategories, showNotification, setVisible}) => {
    const {register, handleSubmit, formState: { errors }, setValue} = useForm<IEditCategoryField>({mode: "onChange"});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setValue('name', targetCategory.name);
    }, [targetCategory]);

    const onSubmit: SubmitHandler<IEditCategoryField> = async (data) => {
        setLoading(true);

        const response = await EditCategoryByID(targetCategory.id, data.name);
        
        if (response.status === 200) {
            const updatedCategory = response.message.updatedCategory;
            
            const updatedCategories = categories.map((category) => category.id === updatedCategory.id ? updatedCategory : category)

            setCategories(updatedCategories);

            showNotification(`Успешно изменена категория ${updatedCategory.name}`);
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
                <h2 className={classes.title}>Изменение категории</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <label htmlFor="name">Название</label>
                    <Input
                        id="name"  
                        placeholder="Название"
                        type="text"
                        register={register('name', {
                            required: 'Не может быть пустое название',
                        })}
                        error={errors.name}
                    />
                    <Button>Изменить</Button>
                </form>
            </>
            }
        </div>
    )
}

export default EditCategoryForm;