import { authHost } from ".";

export const GetCategories = async () => {
    const {data} = await authHost.get('categories/');

    return data;
}

export const GetProductsByCategoryID = async (category_id : number) => {
    const {data} = await authHost.get(`products/${category_id}`);
    
    return data;
}

export const DeleteProductByID = async (id : number) => {
    const {data} = await authHost.delete(`products/delete/${id}`);
    
    return data;
}
