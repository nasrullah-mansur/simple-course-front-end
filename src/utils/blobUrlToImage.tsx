import { envVars } from "@/config/env";

export async function blobUrlToImage(
    blobUrl: string,
    fileName = `upload-image.jpg`,
    maxSizeMB = 2,
    mimeType = "image/jpeg",
    quality = 0.8
): Promise<File | null> {

    if (blobUrl.includes(envVars.VITE_ASSET_URL)) {
        return null;
    }

    // Fetch the blob from the blob URL
    const response = await fetch(blobUrl);
    const blob = await response.blob();

    // If it's already small enough, just wrap it
    if (blob.size <= maxSizeMB * 1024 * 1024 && blob.type === mimeType) {
        return new File([blob], fileName, { type: blob.type });
    }

    // Otherwise, draw to a canvas and compress
    const bitmap = await createImageBitmap(blob);

    // Scale down if needed
    const scale = Math.min(
        1,
        Math.sqrt((maxSizeMB * 1024 * 1024) / blob.size) // crude heuristic
    );

    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(bitmap.width * scale);
    canvas.height = Math.floor(bitmap.height * scale);

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get 2D context");

    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    // Convert to JPEG with compression
    const compressedBlob: Blob = await new Promise((resolve) =>
        canvas.toBlob(
            (b) => resolve(b as Blob),
            mimeType,
            quality // 0–1 (lower = smaller file)
        )
    );

    // Wrap as File
    return new File([compressedBlob], fileName, { type: mimeType });
}
