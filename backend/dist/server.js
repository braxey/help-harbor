"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// Create an Express application
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)(), body_parser_1.default.json());
// Example route
app.get('/api/example', (req, res) => {
    res.json({ 'data': 'goodbye world' });
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
// Start the server
const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
