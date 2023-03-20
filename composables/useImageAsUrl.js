export function useImageAsUrl(file) {
    // convert file to a base64 url
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
    });
}