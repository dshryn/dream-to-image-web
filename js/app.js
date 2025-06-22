import { generateImageHF } from './api/hf.js';

const promptEl = document.getElementById('promptInput');
const btnEl = document.getElementById('generateBtn');
const resultEl = document.getElementById('result');

function autoParams(prompt) {
    const len = prompt.length;
    const steps = Math.min(30 + Math.floor(len / 15), 80);
    const scale = prompt.includes(',') ? 8.0 : 7.0;
    return { steps, scale };
}

btnEl.addEventListener('click', async () => {
    const prompt = promptEl.value.trim();
    if (!prompt) return;

    const { steps, scale } = autoParams(prompt);
    btnEl.disabled = true;
    btnEl.textContent = 'Generating…';
    resultEl.innerHTML = '';

    try {
        console.log('→', { prompt, steps, scale });
        const blob = await generateImageHF({ prompt, steps, scale });
        console.log('← blob received');
        const imgURL = URL.createObjectURL(blob);
        const img = document.createElement('img');
        img.src = imgURL;
        img.alt = prompt;
        img.onload = () => URL.revokeObjectURL(imgURL);
        resultEl.appendChild(img);
    } catch (err) {
        console.error('Error:', err);
        resultEl.textContent = `Generation failed: ${err.message}`;
    } finally {
        btnEl.disabled = false;
        btnEl.textContent = 'Generate';
    }
});

promptEl.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        btnEl.click();
    }
});
