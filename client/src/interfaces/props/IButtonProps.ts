export default interface IButtonProps {
    children: React.ReactNode;
    onClick?: (event : React.MouseEvent<HTMLElement>) => void;
    style?: React.CSSProperties;
}