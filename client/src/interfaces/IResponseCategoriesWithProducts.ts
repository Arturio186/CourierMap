import IProduct from "./IProduct";

export default interface IResponseCategoriesWithProducts {
    category_id: number;
    name: string;
    products: Array<IProduct>
}