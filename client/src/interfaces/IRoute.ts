export default interface IRoute {
    path: string;
    element: JSX.Element;
    title: string;
    children?: Array<IRoute>
}