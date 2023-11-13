import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import router from './Routes/index';

config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});