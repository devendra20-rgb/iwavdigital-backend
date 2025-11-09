'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export default function ContactsDashboard() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ fullName: "", email: "", company: "", message: "" });
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch all contacts
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/contact`);
      setContacts(Array.isArray(res.data) ? res.data : res.data.contacts || []);
    } catch (err) {
      console.error(err);
      setContacts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Create / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API}/api/contact/${editingId}`, form);
      } else {
        await axios.post(`${API}/api/contact`, form);
      }
      setForm({ fullName: "", email: "", company: "", message: "" });
      setEditingId(null);
      setModalOpen(false);
      fetchContacts();
    } catch (err) {
      console.error(err);
      alert("Error submitting contact");
    }
  };

  // Edit contact
  const handleEdit = (contact) => {
    setForm({
      fullName: contact.fullName,
      email: contact.email,
      company: contact.company,
      message: contact.message || ""
    });
    setEditingId(contact._id);
    setModalOpen(true);
  };

  // Delete contact
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      await axios.delete(`${API}/api/contact/${id}`);
      fetchContacts();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Contacts Dashboard</h1>

      {/* Add / Edit Button */}
      <button
        onClick={() => { setModalOpen(true); setEditingId(null); setForm({ fullName:"", email:"", company:"", message:"" }); }}
        className="mb-4 flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg font-semibold transition"
      >
        <FiPlus /> Add Contact
      </button>

      {/* Contacts Table */}
      {loading ? (
        <div>Loading...</div>
      ) : contacts.length === 0 ? (
        <div>No contacts found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Company</th>
                <th className="p-3 border">Message</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(c => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{c.fullName}</td>
                  <td className="p-3 border">{c.email}</td>
                  <td className="p-3 border">{c.company}</td>
                  <td className="p-3 border">{c.message || "-"}</td>
                  <td className="p-3 border flex gap-2">
                    <button onClick={() => handleEdit(c)} className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg">
                      <FiEdit />
                    </button>
                    <button onClick={() => handleDelete(c._id)} className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Add/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
            <h2 className="text-2xl font-bold text-center mb-4">{editingId ? "Edit Contact" : "Add Contact"}</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                className="border rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Full Name"
                value={form.fullName}
                onChange={e => setForm({...form, fullName: e.target.value})}
                required
              />
              <input
                className="border rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Email"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                required
              />
              <input
                className="border rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Company"
                value={form.company}
                onChange={e => setForm({...form, company: e.target.value})}
              />
              <textarea
                className="border rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Message"
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                rows={3}
              />
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary rounded-lg text-white hover:bg-blue-700 transition">{editingId ? "Update" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
