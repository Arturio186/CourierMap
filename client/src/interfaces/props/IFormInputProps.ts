import {UseFormRegisterReturn, FieldError} from 'react-hook-form';

export default interface IFormInputProps {
    id: string;
    type: string;
    register: UseFormRegisterReturn<any>;
    error: FieldError | undefined;
    placeholder: string;
}