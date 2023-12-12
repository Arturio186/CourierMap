import { authHost } from ".";

export const GetCategories = async () => {
    const {data} = await authHost.get('categories/');

    return data;
}

export const GetCategoriesWithProducts = async () => {
    const {data} = await authHost.get('categories/categoriesandproducts');

    return data;
}

export const DeleteCategoryByID = async (id : number) => {
    const {data} = await authHost.delete(`categories/delete/${id}`);
    
    return data;
}

export const EditCategoryByID = async (id: number, name: string) => {
    const {data} = await authHost.post(`categories/edit/${id}`, {
        name
    })

    return data;
}

export const AddCategory = async (name: string) => {
    const {data} = await authHost.post('categories/create', {
        name
    });

    return data;
}