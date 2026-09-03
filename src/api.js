const API_BASE_URL = 'http://127.0.0.1:8000/api';

export async function fetchResources() {
  const res = await fetch(`${API_BASE_URL}/resources`);
  if (!res.ok) throw new Error('Failed to fetch resources');
  return res.json();
}

export async function fetchLegalRights() {
  const res = await fetch(`${API_BASE_URL}/legal-rights`);
  if (!res.ok) throw new Error('Failed to fetch legal rights');
  return res.json();
}

export async function fetchEmergencyContacts() {
  const res = await fetch(`${API_BASE_URL}/emergency-contacts`);
  if (!res.ok) throw new Error('Failed to fetch emergency contacts');
  return res.json();
}

export async function fetchSafetyTips() {
  const res = await fetch(`${API_BASE_URL}/safety-tips`);
  if (!res.ok) throw new Error('Failed to fetch safety tips');
  return res.json();
}

export async function submitComplaint(complaintData) {
  const res = await fetch(`${API_BASE_URL}/complaints`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(complaintData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || 'Failed to submit complaint');
  }
  return data;
}

export async function triggerSOS(sosData) {
  const res = await fetch(`${API_BASE_URL}/sos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sosData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || 'Failed to trigger SOS alert');
  }
  return data;
}
