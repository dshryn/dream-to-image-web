
const HF_TOKEN = '';

export async function generateImageHF({ prompt, steps, scale, seed }) {
    const response = await fetch(
        'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2',
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${HF_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: prompt,
                options: { use_gpu: true },
                parameters: {
                    guidance_scale: scale,
                    num_inference_steps: steps,
                    seed: seed || null
                }
            })
        }
    );

    if (!response.ok) throw new Error('Generation failed');
    const blob = await response.blob();
    return blob;
}