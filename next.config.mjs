import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Ensure Next uses this repo as the tracing root so it doesn't infer a parent folder
    outputFileTracingRoot: path.join(__dirname),
    images:{
        unoptimized: true
    }
};

export default nextConfig;
