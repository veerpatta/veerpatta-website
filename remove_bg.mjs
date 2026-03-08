import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';

async function run() {
    console.log("Starting background removal...");
    const image_path = 'assets/images/hero-main.png';
    try {
        const blob = await removeBackground(image_path);
        const buffer = Buffer.from(await blob.arrayBuffer());
        fs.writeFileSync('assets/images/hero-popout.png', buffer);
        console.log("Background removed and saved to hero-popout.png!");
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

run();
