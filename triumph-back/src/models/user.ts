import { Child } from './child';
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    children: Child[];
}
