var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express'; // npm i express
const app = express();
import cors from 'cors'; // npm i cors
const PORT = 3005;
import router from './router.js';
import cron from 'node-cron';
import { updateAllData } from './controllers/updateData.controller.js';
cron.schedule('0 0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    updateAllData(0, 2, updateAllData);
})); // runs everyday at midnight? --> timeline: uae tour (end of february) - il lombardia (beginning of october)
app.use(cors());
app.use(express.json()); // body parser
app.use('/', router);
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