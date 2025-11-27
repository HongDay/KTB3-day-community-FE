const request = require('supertest');
const express = require('express');
const fs = require('fs');
const path = require('path');


const app = express();

app.use(express.static(path.join(__dirname, '..')));

app.get('/health', (_req, res) => {
    res.json({ ok: true, ts: Date.now() });
})

// index.html 파일
indexHtml = fs.readFileSync(
    path.join(__dirname, '..', 'index.html'),
    'utf8'
);

describe('GET static resources', () => {
    it("GET / should return index.html", async() => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text.trim()).toBe(indexHtml.trim());
    });

    it("GET /health should return ok:true", async() => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
        expect(res.body.ok).toEqual(true);
    })

});