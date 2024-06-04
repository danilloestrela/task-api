import fs from 'node:fs';
import path from 'node:path';

const envPath = path.resolve(process.cwd(), '.env');

try {
    if (fs.existsSync(envPath)) {
        const envData = fs.readFileSync(envPath, 'utf8');
        envData.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                process.env[key.trim()] = value.trim();
            }
        });
    } else {
        process.env = {};
    }
} catch (error) {
    console.error(`Error reading .env file at ${envPath}: ${error.message}`);
}
