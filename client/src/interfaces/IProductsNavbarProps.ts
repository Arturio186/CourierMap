import IProductsList from "./IProductsList";

export default interface IProductsNavbarProps {
    categories: Array<IProductsList>;
    currentCategoryID: number;
    setCurrentCategoryID: React.Dispatch<React.SetStateAction<number>>
}