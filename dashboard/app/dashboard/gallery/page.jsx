"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FiUpload, FiTrash2 } from "react-icons/fi";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export default function GalleryDashboard() {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all images from API
  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API}/api/gallery`);
      setImages(res.data.images || []);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // ✅ Upload new images
  const uploadImages = async (e) => {
    e.preventDefault();
    if (!files.length) return alert("Please select images");

    const fd = new FormData();
    for (const file of files) fd.append("images", file);

    setLoading(true);
    try {
      await axios.post(`${API}/api/gallery`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Images uploaded successfully!");
      setFiles([]);
      fetchImages();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
    setLoading(false);
  };

  // ✅ Delete an image
  const deleteImage = async (id) => {
    if (confirm("Are you sure you want to delete this image?")) {
      try {
        await axios.delete(`${API}/api/gallery/${id}`);
        fetchImages();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
        Gallery Management
      </h1>

      {/* Upload Form */}
      <form
        onSubmit={uploadImages}
        className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-4"
      >
        <label className="block text-gray-700 font-medium">
          Select Images (multiple allowed)
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setFiles(Array.from(e.target.files))}
          className="w-full border rounded-lg px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition"
        >
          <FiUpload />
          {loading ? "Uploading..." : "Upload Images"}
        </button>
      </form>

      {/* Gallery Grid */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        {images.length === 0 ? (
          <div className="text-center text-gray-600 py-6">
            No images uploaded yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img) => (
              <div key={img._id} className="relative group border rounded-lg overflow-hidden">
                <img
                  src={`${API}${img.images[0]}`} // first image in the array
                  alt="Gallery"
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => deleteImage(img._id)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
