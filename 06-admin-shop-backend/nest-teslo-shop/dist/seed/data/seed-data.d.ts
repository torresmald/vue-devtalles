interface SeedProduct {
    description: string;
    images: string[];
    stock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    gender: 'men' | 'women' | 'kid' | 'unisex';
}
type ValidSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
type ValidTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';
interface SeedUser {
    email: string;
    fullName: string;
    password: string;
    roles: string[];
}
interface SeedData {
    users: SeedUser[];
    products: SeedProduct[];
}
export declare const initialData: SeedData;
export {};
