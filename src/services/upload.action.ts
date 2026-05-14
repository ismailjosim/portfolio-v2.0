/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import cloudinary from '../lib/cloudinary';

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get('image') as File;

    if (!file) return { success: false, message: 'No file provided' };

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'blog_covers' },
          (error, result) => {
            if (error || !result) reject(error);
            else resolve(result as any);
          }
        );
        stream.end(buffer);
      }
    );

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('uploadImage error:', error);
    return { success: false, message: 'Upload failed' };
  }
}
