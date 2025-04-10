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
exports.SeedController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const seed_service_1 = require("./seed.service");
let SeedController = class SeedController {
    constructor(seedService) {
        this.seedService = seedService;
    }
    executeSeed() {
        return this.seedService.runSeed();
    }
};
exports.SeedController = SeedController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Destruye y crea una nueva base de datos',
        description: 'Destruye y crea la base de datos de productos y usuarios, esto invalida también tokens existentes y usuarios creados.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Seed ejecutado con éxito' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeedController.prototype, "executeSeed", null);
exports.SeedController = SeedController = __decorate([
    (0, swagger_1.ApiTags)('Seed'),
    (0, common_1.Controller)('seed'),
    __metadata("design:paramtypes", [seed_service_1.SeedService])
], SeedController);
//# sourceMappingURL=seed.controller.js.map