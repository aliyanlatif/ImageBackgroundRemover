import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [removedImage, setRemovedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setRemovedImage(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setRemovedImage(null);
    }
  };

  const handleRemoveBackground = () => {
    if (!image) return;
    // For demonstration: simulate background removal by reusing the uploaded image
    setRemovedImage(preview);
    console.log('Removing background for:', image);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <Head>
        <title>Image Background Remover</title>
      </Head>

      <main className="bg-white rounded-lg shadow-lg p-8 max-w-7xl w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Remove Backgrounds from Your Images Instantly!
        </h1>
        
        <p className="text-gray-600 text-center mt-2">
          Our app uses advanced AI technology to help you remove backgrounds from images quickly and easily.
        </p>

        <h2 className="text-lg font-semibold mt-4">Upload Your Image</h2>
        
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          className="mt-2 border border-gray-300 rounded-lg p-2 w-full"
        />

        {/* Side by Side Preview Areas */}
        <div className="mt-4 flex gap-4">
          {/* Uploaded Image Preview with Drag and Drop */}
          <div 
            className="flex flex-col flex-1"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <h3 className="text-lg font-semibold">Image Preview:</h3>
            <div className="mt-2 bg-gray-100 rounded-lg border border-gray-300 h-80 flex items-center justify-center">
              {preview ? (
                <img 
                  src={preview} 
                  alt="Image Preview" 
                  className="rounded-lg"
                  style={{ maxWidth: '100%', maxHeight: '100%' }} 
                />
              ) : (
                <span className="text-gray-500">
                  Drag & drop an image here or upload the input file
                </span>
              )}
            </div>
          </div>

          {/* Background Removed Image Preview */}
          <div className="flex flex-col flex-1">
            <h3 className="text-lg font-semibold">Background Removed Image:</h3>
            <div className="mt-2 bg-gray-100 rounded-lg border border-gray-300 h-80 flex items-center justify-center">
              {removedImage ? (
                <img 
                  src={removedImage} 
                  alt="Background Removed Preview" 
                  className="rounded-lg"
                  style={{ maxWidth: '100%', maxHeight: '100%' }} 
                />
              ) : (
                <span className="text-gray-500">No background removed image yet</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button 
            onClick={handleRemoveBackground} 
            disabled={!image} 
            className={`bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ${!image ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            Remove Background
          </button>
        </div>
      </main>
    </div>
  );
}