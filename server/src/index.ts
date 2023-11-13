import express from 'express';

import { config } from 'dotenv';

import router from './Routes/index';

const app = express();

app.use(express.json());
app.use(router);

config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});