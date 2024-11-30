"use client";

import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImages = async () => {
    if (!file) {
      console.log('File belum dipilih!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); 

    try {
      setUploading(true); 
      const response = await fetch('https://api.cloudinary.com/v1_1/dav8mrfbb/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Upload result:', data);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='flex p-2 flex-col justify-center items-center'>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImages} disabled={uploading} className='p-2 outline-none bg-green-400 rounded-md'>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}
