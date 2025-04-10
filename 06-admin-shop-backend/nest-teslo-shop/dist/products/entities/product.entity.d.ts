import { ProductImage } from './';
import { User } from '../../auth/entities/user.entity';
export declare class Product {
    id: string;
    title: string;
    price: number;
    description: string;
    slug: string;
    stock: number;
    sizes: string[];
    gender: string;
    tags: string[];
    images?: ProductImage[];
    user: User;
    checkSlugInsert(): void;
    checkSlugUpdate(): void;
}
