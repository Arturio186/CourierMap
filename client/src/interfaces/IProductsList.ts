import IProduct from "./IProduct";
import ICategory from "./ICategory";

export default interface IProductsList {
    category: ICategory;
    products: Array<IProduct>;
}