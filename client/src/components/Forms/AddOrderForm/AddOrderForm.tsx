import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, useFieldArray} from 'react-hook-form';

import classes from './AddOrderForm.module.scss';

import normalizeCoords from 'utils/normalizeCoords';

import { GetCategoriesWithProducts } from 'http/CategoriesAPI';

import IAddOrderFormProps from 'interfaces/props/IAddOrderFormProps';
import IAddOrderField from 'interfaces/IAddOrderField';
import IResponseCategoriesWithProducts from 'interfaces/IResponseCategoriesWithProducts';

import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';


const AddOrderForm : React.FC<IAddOrderFormProps> = ({map_x, map_y, visible, couriers}) => {
    const {control, register, handleSubmit, formState: { errors }, setValue, getValues} = useForm<IAddOrderField>({mode: "onChange"});

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'products',
    });

    const [geoCodeLoading, setGeoCodeLoading] = useState(false);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    const [address, setAddress] = useState<string>('');
    const [categoriesWithProducts, setCategoriesWithProducts] = useState<Array<IResponseCategoriesWithProducts>>([])
    const [selectedCategories, setSelectedCategories] = useState<Array<number>>([]);

    const normalizedCoords = normalizeCoords([map_x, map_y]);

    const onSubmit: SubmitHandler<IAddOrderField> = async (data) => {
        console.log(data);
    }

    useEffect(()=> {
        (async () => {
            const response = await GetCategoriesWithProducts();

            if (response.status === 200) {
                setCategoriesWithProducts(response.message.categories)
            }

            setCategoriesLoading(false);
        })();
    }, []);
    

    useEffect(() => {
        if (visible) {
            (async () => {
                setGeoCodeLoading(true)

                const response = await fetch(
                    `https://geocode-maps.yandex.ru/1.x/?apikey=0b375996-25a4-4d5d-9152-504fa8810cd2&geocode=${map_y},${map_x}&format=json`);

                if (response.status === 200) {
                    const result = await response.json();
                    setAddress(result.response.GeoObjectCollection.featureMember[0].GeoObject.name);
                }
                
                setGeoCodeLoading(false)
            })();
        }
    }, [visible]);

    useEffect(() => {
        setValue('map_x', normalizedCoords[0])
        setValue('map_y', normalizedCoords[1])
        setValue('address', address)
    }, [address]);

    useEffect(() => {
        const result : Array<number> = [];

        fields.forEach((field) => {
          result.push(Number(field.category_id));
        });

        setSelectedCategories(result);
    }, [fields]);

    const changeCategory = (index: number, category: number) => {
        const newSelectedCategories = [...selectedCategories];
        newSelectedCategories[index] = category;

        setSelectedCategories(newSelectedCategories);
    }

    return <div className={classes.container}>
        {geoCodeLoading || categoriesLoading ? <p>Загрузка...</p> 
        :
        <div className={classes.formContainer}>
            <h2>Создание заказа</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <div className={classes.columns}>
                    <div className={classes.left}>
                        <div className={classes.inputContainer}>
                            <label 
                                htmlFor="address" 
                                className={`${errors.address ? `${classes.errorLabel}` : ''}`}>
                                    Адрес
                            </label>
                            <Input
                                id="address"  
                                placeholder="Адрес"
                                type="text"
                                register={register('address', {
                                    required: 'Введите адрес'
                                })}
                                error={errors.address}
                            />
                        </div>
                        <div className={classes.inputContainer}>
                            <label 
                                htmlFor="note" 
                                className={`${errors.note ? `${classes.errorLabel}` : ''}`}>
                                    Дополнительно
                            </label>
                            <Input
                                id="note"  
                                placeholder="Дополнительно"
                                type="text"
                                register={register('note', {})}
                                error={errors.note}
                            />
                        </div>
                        <div className={classes.inputContainer}>
                            <label 
                                htmlFor="client_name" 
                                className={`${errors.client_name ? `${classes.errorLabel}` : ''}`}>
                                    Имя клиента
                            </label>
                            <Input
                                id="client_name"  
                                placeholder="Имя клиента"
                                type="text"
                                register={register('client_name', {
                                    required: 'Введите имя клиента'
                                })}
                                error={errors.client_name}
                            />
                        </div>
                        <div className={classes.inputContainer}>
                            <label 
                                htmlFor="client_phone" 
                                className={`${errors.client_phone ? `${classes.errorLabel}` : ''}`}>
                                    Номер клиента
                            </label>
                            <Input
                                id="client_phone"  
                                placeholder="Номер клиента"
                                type="text"
                                register={register('client_phone', {
                                    required: 'Введите номер клиента'
                                })}
                                error={errors.client_phone}
                            />
                            <div className={classes.visuallyHidden}>
                                <Input
                                    id="map_x"  
                                    placeholder="map_x"
                                    type="text"
                                    register={register('map_x', {})}
                                    error={errors.map_x}
                                />
                                <Input
                                    id="map_y"  
                                    placeholder="map_y"
                                    type="text"
                                    register={register('map_y', {})}
                                    error={errors.map_y}
                                />
                            </div>
                            <p className={classes.courierLabel}>Курьер</p>
                            <select {...register("courier_id")}>
                                <option value="-1" selected={true}>Не назначать</option>
                                {couriers.map((courier) => { 
                                    return <option key={courier.id} value={courier.id}>
                                        {`${courier.name} ${courier.surname}`}
                                    </option>
                                    })}
                            </select>
                        </div>
                    </div>
                    <div className={classes.right}>
                        <h3>Продукты</h3>
                        <div className={classes.centered}>
                            {fields.map((product, index) => (
                                <div key={product.id}>
                                    <div className={classes.simpleInputs}>
                                        <select 
                                            {...register(`products.${index}.category_id`)}
                                            onChange={(e) => changeCategory(index, Number(e.target.value))} 
                                        >
                                            <option value="-1" selected={true}>Не выбрано</option>
                                            {categoriesWithProducts.map((category) => 
                                                <option 
                                                    value={category.category_id}
                                                >
                                                    {category.name}
                                                </option>
                                            )}
                                        </select>
                                        <select {...register(`products.${index}.product_id`)}>
                                            <option value="-1">Не выбрано</option>
                                            {categoriesWithProducts.map((category) => {
                                                if (category.category_id === selectedCategories[index]) {
                                                return category.products.map((product) => (
                                                    <option key={product.id} value={product.id}>
                                                        {product.name}
                                                    </option>
                                                ));
                                                }
                                                return null; 
                                            })}
                                        </select>

                                        <input className={classes.quantity}
                                            type="number"
                                            {...register(`products.${index}.quantity`)}
                                        />
                                        <Button onClick={() => remove(index)}>X</Button>
                                    </div>
                                </div>
                            ))}
                            <Button 
                                onClick={(e) => { e.preventDefault(); append({ category_id: -1, product_id: -1, quantity: 0 }) }}
                                style={{margin: '0 auto'}}
                            >
                                Добавить
                            </Button>
                        </div>
                    </div>
                </div>
                <Button>Создать</Button>
            </form>
        </div>
        }
    </div>
}

export default AddOrderForm;