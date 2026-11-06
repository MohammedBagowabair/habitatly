const MAX_EDGE = 1280;

function drawBitmap(bitmap: ImageBitmap): string {
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    throw new Error("Could not prepare that image.");
  }
  context.fillStyle = "#F8F8F3";
  context.fillRect(0, 0, width, height);
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.76);
}

export async function fileToDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  return drawBitmap(bitmap);
}

export async function urlToDataUrl(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Could not read that image.");
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);
  return drawBitmap(bitmap);
}

export function isAcceptedImage(file: File): boolean {
  const type = file.type.toLowerCase();
  if (type === "image/jpeg" || type === "image/png" || type === "image/webp") return true;
  return /\.(jpe?g|png|webp)$/i.test(file.name);
}
