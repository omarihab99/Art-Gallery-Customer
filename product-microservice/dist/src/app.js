"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("./config/server");
const product_routes_1 = require("./routes/product.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/proudcts', product_routes_1.ProductRouter);
app.listen(server_1.PORT, () => {
    console.log(`Server is running on port ${server_1.PORT}`);
});
