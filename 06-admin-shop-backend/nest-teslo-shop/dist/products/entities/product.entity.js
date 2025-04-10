"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const _1 = require("./");
const user_entity_1 = require("../../auth/entities/user.entity");
let Product = class Product {
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title;
        }
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');
    }
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');
    }
};
exports.Product = Product;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
        description: 'Product ID',
        uniqueItems: true
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'T-Shirt Teslo',
        description: 'Product Title',
        uniqueItems: true
    }),
    (0, typeorm_1.Column)('text', {
        unique: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0,
        description: 'Product price',
    }),
    (0, typeorm_1.Column)('float', {
        default: 0
    }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Anim reprehenderit nulla in anim mollit minim irure commodo.',
        description: 'Product description',
        default: null,
    }),
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 't_shirt_teslo',
        description: 'Product SLUG - for SEO',
        uniqueItems: true
    }),
    (0, typeorm_1.Column)('text', {
        unique: true
    }),
    __metadata("design:type", String)
], Product.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: 'Product stock',
        default: 0
    }),
    (0, typeorm_1.Column)('int', {
        default: 0
    }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['M', 'XL', 'XXL'],
        description: 'Product sizes',
    }),
    (0, typeorm_1.Column)('text', {
        array: true
    }),
    __metadata("design:type", Array)
], Product.prototype, "sizes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'women',
        description: 'Product gender',
    }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Product.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)('text', {
        array: true,
        default: []
    }),
    __metadata("design:type", Array)
], Product.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.OneToMany)(() => _1.ProductImage, (productImage) => productImage.product, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.product, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], Product.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Product.prototype, "checkSlugInsert", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Product.prototype, "checkSlugUpdate", null);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)({ name: 'products' })
], Product);
//# sourceMappingURL=product.entity.js.map