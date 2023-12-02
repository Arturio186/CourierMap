import ICategory from "../ICategory";

export default interface IProductsNavbarProps {
    categories: Array<ICategory>;
    currentCategoryID: number;
    setCurrentCategoryID: React.Dispatch<React.SetStateAction<number>>
}