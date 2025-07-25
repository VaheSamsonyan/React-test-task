"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number },
    image: { type: String },
    description: { type: String },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Product", productSchema);
