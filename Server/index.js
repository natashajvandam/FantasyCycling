import express from 'express'; //npm i express
const app = express();
import cors from 'cors'; //npm i cors
const PORT  = 3005;
import router from './router.js';
import cron from 'node-cron';
import {updateAllData} from './controllers/updateData.controller.js';
import { auth } from 'express-openid-connect';

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'ZH2CPYnScrWWn8S_C_x2n_ifpDcT4X319Nrfx0VkH_R_GV-Hcc7xtINZZip7seuN',
  baseURL: 'https://localhost:3005',
  clientID: 'B6YeOn4XZ1Er8FtD0bgKh5atqOhGaJoG',
  issuerBaseURL: 'https://dev-874owraq.us.auth0.com'
};

cron.schedule('0 0 0 * * *', async () => { updateAllData(0, 2, updateAllData) } ); // runs everyday at midnight? --> timeline: uae tour (end of february) - il lombardia (beginning of october)
app.use(cors());
app.use(express.json()); // body parser

// app.use(auth(config));

app.use('/', router);

(async function () {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port: https://localhost:${PORT}`)
      // updateAllData(0, 1, updateAllData); // -> to update instantly for development
    });  
  } catch (e) {
    console.log('error:', e)
  };
})();;



