import db from '../Database/knex';
import IProductData from '../Interfaces/IProductData';

class Product {
    static async Create(category_id : number, name: string, price: number) : Promise<IProductData> {
        const [product] : IProductData[] = await db('products')
            .insert({ 
                category_id: category_id,
                name: name,
                price: price
            })
            .returning('*');
        
        return product;
    }
}

export default Product;