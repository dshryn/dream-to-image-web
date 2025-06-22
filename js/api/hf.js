
const HF_TOKEN = os.env.hfapikey;

export async function generateImageHF({ prompt, steps, scale, seed }) {
    const payload = {
        inputs: prompt,
        options: { use_gpu: true },
        parameters: {
            guidance_scale: scale,
            num_inference_steps: steps,
            seed: seed ?? undefined
        }
    };

    const res = await fetch(
        'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2',
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${HF_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    );

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`HF ${res.status} ${res.statusText}: ${text}`);
    }

    return await res.blob();
}
