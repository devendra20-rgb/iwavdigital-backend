"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

const positions = [
  "Affiliate Manager",
  "Performance Marketing Specialist",
  "Campaign Analyst",
  "Business Development",
  "Content Strategist",
  "Full-Stack Developer",
  "Data Analyst",
];

export default function CareersDashboard() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    position: positions[0],
    message: "",
  });
  const [resume, setResume] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // ✅ Fetch careers
  const fetchCareers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/career`);
      setCareers(res.data.careers || []);
    } catch (err) {
      console.error(err);
      setCareers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  // ✅ Create / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => fd.append(key, value));
    if (resume) fd.append("resume", resume);

    if (editingId) {
      await axios.put(`${API}/api/career/${editingId}`, fd);
    } else {
      await axios.post(`${API}/api/career`, fd);
    }

    resetForm();
    fetchCareers();
  };

  // ✅ Edit
  const handleEdit = (career) => {
    setForm({
      fullName: career.fullName,
      email: career.email,
      position: career.position,
      message: career.message || "",
    });
    setEditingId(career._id);
    setModalOpen(true);
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (confirm("Delete this application?")) {
      await axios.delete(`${API}/api/career/${id}`);
      fetchCareers();
    }
  };

  const resetForm = () => {
    setForm({
      fullName: "",
      email: "",
      position: positions[0],
      message: "",
    });
    setResume(null);
    setEditingId(null);
    setModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        Careers Dashboard
      </h1>

      {/* ✅ Add new button */}
      <button
        onClick={() => {
          resetForm();
          setModalOpen(true);
        }}
        className="mb-4 flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition"
      >
        <FiPlus /> Add New
      </button>

      {/* ✅ Table */}
      {loading ? (
        <div>Loading...</div>
      ) : careers.length === 0 ? (
        <div>No applications found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Position</th>
                <th className="p-3 border">Message</th>
                <th className="p-3 border">Resume</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {careers.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{c.fullName}</td>
                  <td className="p-3 border">{c.email}</td>
                  <td className="p-3 border">{c.position}</td>
                  <td className="p-3 border">{c.message || "-"}</td>

                  {/* ✅ Download Resume */}
                  <td className="p-3 border">
                    {c.resumePath ? (
                      <a
                        href={`${API}/api/career/download/${c.resumePath.split("/").pop()}`}
                        download
                        className="text-blue-600 underline hover:text-blue-900"
                      >
                        Download
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="p-3 border flex gap-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h2 className="text-2xl font-bold text-center mb-4">
              {editingId ? "Edit Application" : "Add Application"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                className="border rounded-lg w-full px-4 py-2 focus:ring-2 focus:ring-orange-400"
                placeholder="Full Name"
                value={form.fullName}
                onChange={(e) =>
                  setForm({ ...form, fullName: e.target.value })
                }
                required
              />

              <input
                className="border rounded-lg w-full px-4 py-2 focus:ring-2 focus:ring-orange-400"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />

              <select
                className="border rounded-lg w-full px-4 py-2 focus:ring-2 focus:ring-orange-400"
                value={form.position}
                onChange={(e) =>
                  setForm({ ...form, position: e.target.value })
                }
              >
                {positions.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>

              <textarea
                className="border rounded-lg w-full px-4 py-2 focus:ring-2 focus:ring-orange-400"
                placeholder="Message (optional)"
                rows={3}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files?.[0])}
                className="text-gray-700"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 rounded-lg text-white hover:bg-orange-700"
                >
                  {editingId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
