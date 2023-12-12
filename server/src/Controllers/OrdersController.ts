import { Request, Response, NextFunction } from "express";

import Order from "../Models/Order";

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
}

export default OrdersController;