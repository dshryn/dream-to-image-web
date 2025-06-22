export async function generateImage(prompt) {
    const url = `https://pollinations.ai/c/prompt:${encodeURIComponent(prompt)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('API error');
    return await response.blob();
}
