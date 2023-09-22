import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
const PORT = process.env.PORT || 3000;

export{PORT};