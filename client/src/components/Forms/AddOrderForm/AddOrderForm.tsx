import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler} from 'react-hook-form';

import classes from './AddOrderForm.module.scss';

import normalizeCoords from 'utils/normalizeCoords';

import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';

import ICourier from 'interfaces/ICourier';

interface IAddOrderFormProps {
    map_x: number;
    map_y: number;
    visible: boolean;
    couriers: Array<ICourier>
}

interface IAddOrderField {
    address: string;
    note: string;
    map_x: number;
    map_y: number;
    client_name: string;
    client_phone: string;
    courier_id: number | null;
}

const AddOrderForm : React.FC<IAddOrderFormProps> = ({map_x, map_y, visible, couriers}) => {
    const {register, handleSubmit, formState: { errors }, setValue} = useForm<IAddOrderField>({mode: "onChange"});

    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState<string>('');

    const normalizedCoords = normalizeCoords([map_x, map_y]);

    const onSubmit: SubmitHandler<IAddOrderField> = async (data) => {
        console.log(data);
    }

    const getAddressByCoords = async (x: number, y: number) =>  {
        setLoading(true)

        const response = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?apikey=0b375996-25a4-4d5d-9152-504fa8810cd2&geocode=${y},${x}&format=json`);

        if (response.status === 200) {
            const result = await response.json();
        
            setAddress(result.response.GeoObjectCollection.featureMember[0].GeoObject.name);
        }

        setLoading(false)
    }

    useEffect(() => {
        if (visible) {
            getAddressByCoords(map_x, map_y).then();
        }
    }, [visible]);

    useEffect(() => {
        setValue('map_x', normalizedCoords[0])
        setValue('map_y', normalizedCoords[1])
        setValue('address', address)
    }, [address])

    return <div className={classes.container}>
        {loading ? <p>Загрузка...</p> 
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
                        Здесь выбор продуктов
                    </div>
                </div>
                <Button>Создать</Button>
            </form>
        </div>
        }
    </div>
}

export default AddOrderForm;