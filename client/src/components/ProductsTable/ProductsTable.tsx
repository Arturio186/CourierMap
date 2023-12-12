import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

import classes from './ProductsTable.module.scss';

import IProduct from 'interfaces/IProduct';
import ICategory from 'interfaces/ICategory';

import { GetProductsByCategoryID, DeleteProductByID } from 'http/ProductsAPI';
import { GetCategories } from 'http/CategoriesAPI';

import ProductsNavbar from 'components/ProductsNavbar/ProductsNavbar';
import AddProductForm from 'components/Forms/AddProductForm/AddProductForm';
import EditProductForm from 'components/Forms/EditProductForm/EditProductForm';

import Notification from '../UI/Notification/Notification';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';

const ProductsTable : React.FC = () => {
    const [currentCategoryID, setCurrentCategoryID] = useState<number>(-1);
    const [targetProduct, setTargetProduct] = useState<IProduct>({id: -1, name: '', price: -1, category_id: -1});

    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categories, setCategories] = useState<Array<ICategory>>([]);

    const [products, setProducts] = useState<Array<IProduct>>([]);
    const [productsLoading, setProductsLoading] = useState(false);

    const [notification, setNotification] = useState<JSX.Element | null>(null);

    const [modalAddProduct, setModalAddProduct] = useState(false);
    const [modalEditProduct, setModalEditProduct] = useState(false);

    useEffect(()=> {
        (async () => {
        
            const response = await GetCategories();

            if (response.status === 200) {
                const categories = response.message.categories;

                if (categories.length > 0) {
                    setCurrentCategoryID(categories[0].id)
                    setCategories(response.message.categories)
                }
            }
            setCategoriesLoading(false);
        })();
      }, []);


    useEffect(() => {
        setProductsLoading(true);

        (async () => {
            const response = await GetProductsByCategoryID(currentCategoryID);

            if (response.status === 200) {
                setProducts(response.message.products);
            }

            setProductsLoading(false);
        })();
    }, [currentCategoryID]);

    const showNotification = (message : string) => {
        setNotification(<Notification 
            message={message} 
            onClose={() => setNotification(null)
        } />);
    };

    const DeleteProduct = async (id : number) => {
        const response = await DeleteProductByID(id);

        if (response.status === 200) {
            showNotification(`Продукт с id ${id} успешно удален`)
            setProducts(products.filter((product) => product.id != id))
        }
        else {
            showNotification("Не удалось удалить продукт")
        }
    }

    const ChangeProduct = async (id : number) => {
        products.forEach((product) => {
            if (product.id === id) {
                setTargetProduct(product);
            }
        })
        setModalEditProduct(true);
    }

    return (
        categoriesLoading || productsLoading ? 
        <p>Загрузка...</p>
        :
        <>
            <Modal visible={modalAddProduct} setVisible={setModalAddProduct}>
                <AddProductForm 
                    category={currentCategoryID}
                    products={products}
                    setProducts={setProducts}
                    showNotification={showNotification}
                    setVisible={setModalAddProduct}
                />
            </Modal>
            <Modal visible={modalEditProduct} setVisible={setModalEditProduct}>
                <EditProductForm 
                    targetProduct={targetProduct}
                    products={products}
                    setProducts={setProducts}
                    showNotification={showNotification}
                    setVisible={setModalEditProduct}
                />
            </Modal>
            
            <Button onClick={() => setModalAddProduct(true)}>Добавить продукт</Button>

            <ProductsNavbar 
                categories={categories} 
                currentCategoryID={currentCategoryID} 
                setCurrentCategoryID={setCurrentCategoryID}
            />
            {products.length == 0 ? 
                <p>Нет данных</p>
                :
                <div className={classes.table}>
                    <div className={classes.table__head}>
                        <div className={classes.table__row}>
                            <p>Название</p>
                            <p>Цена</p>
                            <p>Действие</p>
                        </div>
                    </div>
                    <div className={classes.table__body}>
                        {products.map((product) => {
                            return <div className={classes.table__row} key={product.id}>
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                                <p className={classes.actions}>
                                    <button onClick={() => ChangeProduct(product.id)}>Изменить</button>
                                    <button onClick={() => DeleteProduct(product.id)}>Удалить</button>
                                </p>
                            </div>
                        })}
                    </div>
                </div>
            }
            {notification &&
                ReactDOM.createPortal(notification, document.body)}
        </>   
    )
}

export default ProductsTable;
