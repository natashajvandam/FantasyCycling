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
const express_1 = __importDefault(require("express")); // npm i express
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors")); // npm i cors
const PORT = 3005;
const router_js_1 = __importDefault(require("./router.js"));
const node_cron_1 = __importDefault(require("node-cron"));
const updateData_controller_js_1 = require("./controllers/updateData.controller.js");
node_cron_1.default.schedule('0 0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, updateData_controller_js_1.updateAllData)(0, 2, updateData_controller_js_1.updateAllData);
})); // runs everyday at midnight? --> timeline: uae tour (end of february) - il lombardia (beginning of october)
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // body parser
app.use('/', router_js_1.default);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.listen(PORT, () => {
            console.log(`Server running on port: http://localhost:${PORT}`);
            // updateAllData(0, 1, updateAllData); // -> to update instantly for development
        });
    }
    catch (e) {
        console.log('error:', e);
    }
}))();
//# sourceMappingURL=index.js.map