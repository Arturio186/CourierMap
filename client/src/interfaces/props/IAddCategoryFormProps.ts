import ICategory from "interfaces/ICategory";

export default interface IAddCategoryFormProps {
    categories: Array<ICategory>;
    setCategories: React.Dispatch<React.SetStateAction<Array<ICategory>>>;
    showNotification: (message: string) => void;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}   