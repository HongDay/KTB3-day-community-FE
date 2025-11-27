import { jest } from '@jest/globals';

import request from 'supertest';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import checkEmail from '../api/signup/userEmailCheckRequest.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '..')));

app.get('/health', (_req, res) => {
    res.json({ ok: true, ts: Date.now() });
})

// index.html 파일
const indexHtml = fs.readFileSync(
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

describe('check checkEmail() function', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    })
    it("check request URL", async() => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ data: { availability: false } })
        });

        const result = await checkEmail('asdlkfjawefiojqewofi');

        const [calledUrl] = global.fetch.mock.calls[0];
        expect(calledUrl.toString()).toContain('https://ktbpractice-hongday.n-e.kr');
        expect(result).toBe(false);
    });
});