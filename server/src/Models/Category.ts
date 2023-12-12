import db from '../Database/knex';
import ICategoryData from '../Interfaces/ICategoryData';

interface ICategoryWithProductsData {
    id: number;
    name: string;
    products: Array<ISimpleProduct>;
};

interface ISimpleProduct {
    id: number;
}

class Category {
    static async Create(name: string) : Promise<ICategoryData> {
        const [category] : ICategoryData[] = await db('categories')
            .insert({ 
                name: name
            })
            .returning('*');
        
        return category;
    }

    static async Delete(id : number) : Promise<void> {
        try {
            await db('categories').where({id: id}).del()
        }
        catch (error) {
            throw error;
        }
    }

    static async Update(id: number, name: string) : Promise<ICategoryData> {
        const [category] : ICategoryData[] = await db('categories').where({id: id})
            .update({
                name: name,
            })
            .returning('*');
        
        return category;
    }

    static async GetCategories() : Promise<ICategoryData[]> {
        return await db('categories').select('*');
    }

    static async GetCategoriesWithProducts() : Promise<ICategoryWithProductsData[]> {
        return await db('categories')
            .select('categories.id as category_id', 'categories.name', db.raw('JSON_AGG(products) as products'))
            .leftJoin('products', 'categories.id', 'products.category_id')
            .groupBy('categories.id', 'categories.name')
    }
}

export default Category;