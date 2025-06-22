import { generateImage } from './api/pollinations.js';

const inputEl = document.getElementById('promptInput');
const btnEl = document.getElementById('generateBtn');
const resultEl = document.getElementById('result');

btnEl.addEventListener('click', async () => {
    const prompt = inputEl.value.trim();
    if (!prompt) return;
    btnEl.disabled = true;
    btnEl.textContent = 'Generating…';
    resultEl.innerHTML = '';
    try {
        const blob = await generateImage(prompt);
        const imgURL = URL.createObjectURL(blob);
        const img = document.createElement('img');
        img.src = imgURL;
        img.alt = prompt;
        img.onload = () => URL.revokeObjectURL(imgURL);
        resultEl.appendChild(img);
    } catch {
        resultEl.textContent = 'Failed to generate image.';
    } finally {
        btnEl.disabled = false;
        btnEl.textContent = 'Generate';
    }
});
