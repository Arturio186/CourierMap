import db from '../Database/knex';
import ICategoryData from '../Interfaces/ICategoryData';

class Category {
    static async Create(name: string) : Promise<ICategoryData> {
        const [category] : ICategoryData[] = await db('products_categories')
            .insert({ 
                name: name
            })
            .returning('*');
        
        return category;
    }

    static async GetCategories() : Promise<ICategoryData[]> {
        return await db('products_categories').select('*');
    }
}

export default Category;