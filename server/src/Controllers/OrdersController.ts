import { Request, Response, NextFunction } from "express";

import Order from "../Models/Order";
import APIError from "../Errors/APIError";
import CheckObjectProperties from "../Utilities/CheckObjectProperties";

import IOrderRequest from "../Interfaces/IOrderRequest";

class OrdersController {
    static async All(req: Request, res: Response, next: NextFunction) {
        try {
            const orders = await Order.GetOrders();

            await Order.GetOrders();

            res.json({status: 200, message: {orders: orders}});
        }
        catch (error) {
            next(error)
        }
    }

    static async Store(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.body.order) {
                return next(APIError.BadRequest('There is no order data'))
            }

            if (!CheckObjectProperties(req.body.order, 
                ['address', 'client_name', 'client_phone', 'courier_id', 'map_x', 'map_y', 'note', 'products'])) {
                    return next(APIError.BadRequest('Not all data in the req.body.order'))
            }
            
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
            next(error)
        }
    }
}

export default OrdersController;