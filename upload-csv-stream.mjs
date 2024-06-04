import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvFilePath = path.join(__dirname, 'csv-to-upload', 'tasks.csv');

async function sendRow(row) {
    return fetch("http://localhost:3333/tasks", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: row.title,
            description: row.description
        })
    }).then(response => response.text())
    .then(data => {
        console.log('Response:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function processCSV(filePath) {
    const readStream = fs.createReadStream(filePath);
    const parser = parse({ delimiter: ',', columns: true });

    readStream.pipe(parser);

    parser.on('data', async (row) => {
        console.log('Reading row:', row);
        await sendRow(row);
    });

    parser.on('end', () => {
        console.log('CSV parsed successfully \n');
    });

    parser.on('error', (err) => {
        console.error('Error while parsing CSV: \n', err);
    });
}

processCSV(csvFilePath);
