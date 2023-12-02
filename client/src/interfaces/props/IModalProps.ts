export default interface IModalProps {
    children: React.ReactNode;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}