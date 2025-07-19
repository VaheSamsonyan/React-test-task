"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const getAll = () => __awaiter(void 0, void 0, void 0, function* () { return product_model_1.default.find().populate("owner", "firstName lastName"); });
exports.getAll = getAll;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () { return product_model_1.default.findById(id); });
exports.getById = getById;
const create = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.create(Object.assign(Object.assign({}, data), (userId && { owner: userId })));
});
exports.create = create;
const update = (id, data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findById(id);
    if (!product)
        throw new Error("Product not found");
    Object.assign(product, data);
    return yield product.save();
});
exports.update = update;
const remove = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findById(id);
    if (!product)
        throw new Error("Product not found");
    yield product.deleteOne();
});
exports.remove = remove;
