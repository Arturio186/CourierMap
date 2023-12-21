import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import router from './Routes/index';
import ErrorHandlingMiddleware from './Middlewares/ErrorHandlingMiddleware';


config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', router);
app.use(ErrorHandlingMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});