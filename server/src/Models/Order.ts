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

interface IOrderRequest {
    address: string;
    note: string;
    map_x: number;
    map_y: number;
    client_name: string;
    client_phone: string;
    courier_id: number | null;
    products: Array<IOrderProductsRequest>;
}

interface IOrderProductsRequest {
    category_id: number;
    product_id: number;
    quantity: number;
}

interface IProductsListsDB {
    order_id: number;
    product_id: number;
    quantity: number;
}

interface IOrderDB {
    id: number;
    courier_id: number | null;
    status: number;
    address: string;
    note: string | null;
    map_x: number;
    map_y: number;
    client_name: string;
    client_phone: string;
    order_time: Date | null;
    delivery_time: Date | null;
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
                        'quantity', products_lists.quantity)
                    ) as products,
                    sum(products.price * products_lists.quantity) as total_price
                `))
            .join('products_lists', 'orders.id', '=', 'products_lists.order_id')
            .join('products', 'products_lists.product_id', '=', 'products.id')
            .where('orders.status', '=', 1)
            .groupBy('orders.id')
            .orderBy('orders.id')
            .returning('*');
        
        return orders;
    }

    static async Create(order : IOrderRequest) : Promise<void> {
        const [returnedOrder] : IOrderDB[] = await db('orders')
            .insert({ 
                address: order.address,
                note: order.note,
                map_x: order.map_x,
                map_y: order.map_y,
                client_name: order.client_name,
                client_phone: order.client_phone,
                courier_id: order.courier_id
            })
            .returning('*');
        
        const insertMtoN : Array<IProductsListsDB> = []

        order.products.forEach((product) => {
            insertMtoN.push({
                order_id: returnedOrder.id,
                product_id: product.product_id,
                quantity: product.quantity
            })
        })

        await db('products_lists').insert(insertMtoN); 

        console.log(returnedOrder)
        
    }
}

export default Order;