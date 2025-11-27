import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


var app = express()

app.listen(3000, function() {
    console.log("start! express server on port 3000")
})

app.use(express.static(__dirname));

app.get('/health', (_req, res) => {
    res.json({ ok: true, ts: Date.now() });
})