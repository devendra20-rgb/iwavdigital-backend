'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  useEffect(() => { (async () => {
    const res = await axios.get(`${API}/api/events`);
    setEvents(res.data.events || []);
  })(); }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">Events</h1>
      <ul className="space-y-4">
        {events.map(ev => (
          <li key={ev._id} className="border rounded-xl p-4 hover:shadow-md transition">
            <div className="font-semibold text-lg text-orange-600">{ev.name}</div>
            <div className="text-gray-600 mt-1">{ev.description || ''}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
