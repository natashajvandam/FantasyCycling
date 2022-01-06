import express from 'express'; //npm i express
const app = express();
import cors from 'cors'; //npm i cors
const PORT  = 3005;
import router from './router.js';
import cron from 'node-cron';
import {updateAllData} from './controllers/updateData.controller.js'

cron.schedule('1 * * * * *', async () => { updateAllData() } );
  //proper timeline: uae tour (end of february) - il lombardia (beginning of october)
app.use(cors());
app.use(express.json()); // body parser
app.use(router);

(async function () {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port: http://localhost:${PORT}`)
    });  
  } catch (e) {
    console.log('error:', e)
  };
})();;



