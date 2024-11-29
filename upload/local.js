// pages/api/upload.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Ambil file dari body request
      const file = req.body.file;

      // Upload gambar ke Cloudinary
      const result = await cloudinary.uploader.upload('./assets/yeps.png', {
        folder: 'your-folder-name', // Optional: letakkan di folder Cloudinary
        use_filename: true,         // Gunakan nama file asli
      });

      res.status(200).json({ success: true, result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Upload failed', error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
