import express from 'express';

import { config } from 'dotenv';

const app = express();

app.use(express.json());

config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});