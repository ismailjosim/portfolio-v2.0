import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Deletes an image from Cloudinary using its URL
 * Extracts the public ID from the Cloudinary URL and deletes it
 * @param imageUrl - The full Cloudinary image URL
 * @returns void
 */
export async function deleteCloudinaryImage(imageUrl: string): Promise<void> {
    try {
        // Extract public ID from Cloudinary URL
        // Format: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{public_id}.{format}
        const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i
        const match = imageUrl.match(regex)

        if (!match || !match[1]) {
            console.warn(`Could not extract public ID from URL: ${imageUrl}`)
            return
        }

        const publicId = match[1]
        const result = await cloudinary.uploader.destroy(publicId)

        if (process.env.NODE_ENV === 'development') {
            // console.log(`✅ Cloudinary image deleted: ${publicId}`, result)
        }
    } catch (error) {
        console.error('Error deleting Cloudinary image:', error)
        throw error
    }
}

export default cloudinary;
