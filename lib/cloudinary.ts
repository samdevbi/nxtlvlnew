import { v2 as cloudinary } from "cloudinary";

const configured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (configured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export function isCloudinaryConfigured(): boolean {
  return Boolean(configured);
}

export async function uploadImage(
  buffer: Buffer,
  folder: string,
  filename?: string
): Promise<{ url: string; publicId: string }> {
  if (!configured) {
    throw new Error("Cloudinary is not configured");
  }

  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder: `nxtlvl/${folder}`,
        public_id: filename,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Upload failed"));
          return;
        }
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    upload.end(buffer);
  });
}

export async function deleteImage(publicId: string): Promise<void> {
  if (!configured) return;
  await cloudinary.uploader.destroy(publicId);
}
