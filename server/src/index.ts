import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { inquiriesRouter } from './routes/inquiries.js';

const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json({ limit: '100kb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/inquiries', inquiriesRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.listen(config.port, () => {
  console.log(`AOA backend listening on http://localhost:${config.port}`);
});
