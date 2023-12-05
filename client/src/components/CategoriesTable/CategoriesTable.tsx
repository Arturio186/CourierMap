import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import classes from './Categories.module.scss';

import { GetCategories, DeleteCategoryByID, EditCategoryByID } from 'http/CategoriesAPI';

import ICategory from 'interfaces/ICategory';

import AddCategoryForm from 'components/AddCategoryForm/AddCategoryForm';
import EditCategoryForm from 'components/EditCategoryForm/EditCategoryForm';

import Modal from 'components/UI/Modal/Modal';
import Notification from 'components/UI/Notification/Notification';
import Button from 'components/UI/Button/Button';

const CategoriesTable : React.FC = () => {
    const [categories, setCategories] = useState<Array<ICategory>>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    const [targetCategory, setTargetCategory] = useState<ICategory>({id: -1, name: ''});

    const [notification, setNotification] = useState<JSX.Element | null>(null);

    const [modalAddCategory, setModalAddCategory] = useState(false);
    const [modalEditCategory, setModalEditCategory] = useState(false);

    useEffect(()=> {
        (async () => {
            const response = await GetCategories();

            if (response.status === 200) {
                setCategories(response.message.categories)
            }

            setCategoriesLoading(false);
        })();
    }, []);

    const showNotification = (message : string) => {
        setNotification(<Notification 
            message={message} 
            onClose={() => setNotification(null)
        } />);
    };

    const ChangeCategory = (id : number) => {
        categories.forEach((category) => {
            if (category.id === id) {
                setTargetCategory(category);
            }
        })
        setModalEditCategory(true);
    }

    const DeleteCategory = async (id : number) => {
        const response = await DeleteCategoryByID(id);

        if (response.status === 200) {
            showNotification(`Категория с id ${id} успешно удален`)
            setCategories(categories.filter((category) => category.id != id))
        }
        else {
            showNotification("Не удалось удалить продукт")
        }
    }

    return <>
        {categoriesLoading ? 
        <p>Загрузка...</p> 
        :
        <>
            <Modal visible={modalAddCategory} setVisible={setModalAddCategory}>
                <AddCategoryForm 
                    categories={categories}
                    setCategories={setCategories}
                    showNotification={showNotification}
                    setVisible={setModalAddCategory}
                />
            </Modal>
            <Modal visible={modalEditCategory} setVisible={setModalEditCategory}>
                <EditCategoryForm 
                    targetCategory={targetCategory}
                    categories={categories}
                    setCategories={setCategories}
                    showNotification={showNotification}
                    setVisible={setModalEditCategory}
                />
            </Modal>
            <Button onClick={() => setModalAddCategory(true)}>Добавить категорию</Button>
            <table>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => {
                        return <tr key={category.id}>
                            <td>{category.name}</td>
                            <td className={classes.actions}>
                                <button onClick={() => ChangeCategory(category.id)}>Изменить</button>
                                <button onClick={() => DeleteCategory(category.id)}>Удалить</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            {notification &&
                ReactDOM.createPortal(notification, document.body)}
        </>}
    </>
}

export default CategoriesTable;