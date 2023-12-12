import { Request, Response, NextFunction } from "express";

import Order from "../Models/Order";

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



class OrdersController {
    static async All(req: Request, res: Response, next: NextFunction) {
        try {
            const orders = await Order.GetOrders();

            await Order.GetOrders();

            res.json({status: 200, message: {orders: orders}});
        }
        catch (error) {
            console.log(error)
        }
    }

    static async Store(req: Request, res: Response, next: NextFunction) {
        try {
            const { address, client_name, client_phone, courier_id, map_x, map_y, note, products } = req.body.order;
            
            const requestOrder : IOrderRequest = { 
                address: address, 
                client_name: client_name,
                client_phone: client_phone,
                courier_id: courier_id,
                map_x: map_x,
                map_y: map_y,
                note: note,
                products: products
            }

            const responseOrder = await Order.Create(requestOrder);

            res.json({status: 200, message: {created_order: responseOrder}});
        }
        catch (error) {
            console.log(error)
        }
    }
}

export default OrdersController;