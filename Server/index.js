import express from 'express'; //npm i express
const app = express();
import cors from 'cors'; //npm i cors
const PORT  = 3005;
import router from './router.js';
import db from './models/index.model.js'; //------------------------part2

app.use(cors());
app.use(express.json()); // body parser
app.use(router);

(async function () {
  try {
    await db //-------------------------------------------------part2
    app.listen(PORT, () => {
      console.log(`Server running on port: http://localhost:${PORT}`)
    });  
  } catch (e) {
    console.log('error:', e)
  };
})();;



