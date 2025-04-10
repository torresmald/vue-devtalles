import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './../common/dtos/pagination.dto';
import { User } from '../auth/entities/user.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto, user: User): Promise<{
        images: string[];
        id: string;
        title: string;
        price: number;
        description: string;
        slug: string;
        stock: number;
        sizes: string[];
        gender: string;
        tags: string[];
        user: User;
    }>;
    findAll(paginationDto: PaginationDto): Promise<{
        images: string[];
        id: string;
        title: string;
        price: number;
        description: string;
        slug: string;
        stock: number;
        sizes: string[];
        gender: string;
        tags: string[];
        user: User;
    }[]>;
    findOne(term: string): Promise<{
        images: string[];
        id: string;
        title: string;
        price: number;
        description: string;
        slug: string;
        stock: number;
        sizes: string[];
        gender: string;
        tags: string[];
        user: User;
    }>;
    update(id: string, updateProductDto: UpdateProductDto, user: User): Promise<{
        images: string[];
        id: string;
        title: string;
        price: number;
        description: string;
        slug: string;
        stock: number;
        sizes: string[];
        gender: string;
        tags: string[];
        user: User;
    }>;
    remove(id: string): Promise<void>;
}
