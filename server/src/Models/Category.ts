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

    static async Delete(id : number) : Promise<void> {
        try {
            await db('products_categories').where({id: id}).del()
        }
        catch (error) {
            throw error;
        }
    }

    static async Update(id: number, name: string) : Promise<ICategoryData> {
        const [category] : ICategoryData[] = await db('products_categories').where({id: id})
            .update({
                name: name,
            })
            .returning('*');
        
        return category;
    }

    static async GetCategories() : Promise<ICategoryData[]> {
        return await db('products_categories').select('*');
    }
}

export default Category;