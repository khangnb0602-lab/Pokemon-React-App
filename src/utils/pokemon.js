export function getIdFromUrl(url) {
    return Number(url.split("/").filter(Boolean).pop());
}