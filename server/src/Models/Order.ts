import db from '../Database/knex';

interface IProductResponse {
    name: string;
    price: number;
    quantity: number;
}

interface IOrderResponse {
    id: number;
    courier_id: number | null;
    status: number;
    client_name: string;
    client_phone: string;
    address: string;
    note: string | null;
    map_x: string;
    map_y: string;
    products: Array<IProductResponse>
}

class Order {
    static async GetOrders() : Promise<Array<IOrderResponse>> {
        const orders =  await db('orders').select(
            'orders.id',
            'orders.courier_id',
            'orders.status',
            'orders.client_name',
            'orders.client_phone',
            'orders.address',
            'orders.note',
            'orders.map_x',
            'orders.map_y',
            db.raw(`
                    json_agg(
                    json_build_object(
                        'name', products.name,
                        'price', products.price,
                        'quantity', products_lists.quantity
                    )
                    ) as products
                `))
            .join('products_lists', 'orders.id', '=', 'products_lists.order_id')
            .join('products', 'products_lists.product_id', '=', 'products.id')
            .where('orders.status', '=', 1)
            .groupBy('orders.id')
            .orderBy('orders.id')
            .returning('*');
        
        return orders;
    }
}

export default Order;