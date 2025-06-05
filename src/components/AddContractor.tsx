import React, { useState } from 'react';

const AddContractor: React.FC = () => {
  const [form, setForm] = useState({
    organization: '',
    inn: '',
    ogrn: '',
    address: '',
    contact: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('http://localhost:4000/add-contractor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Ошибка');
        return;
      }

      setSuccess(true);
      setForm({
        organization: '',
        inn: '',
        ogrn: '',
        address: '',
        contact: '',
        email: '',
        phone: '',
      });
    } catch {
      setError('Сервер недоступен');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="organization" placeholder="Название организации" value={form.organization} onChange={handleChange} required />
      <input name="inn" placeholder="ИНН" value={form.inn} onChange={handleChange} required />
      <input name="ogrn" placeholder="ОГРН" value={form.ogrn} onChange={handleChange} />
      <input name="address" placeholder="Адрес" value={form.address} onChange={handleChange} />
      <input name="contact" placeholder="Контактное лицо" value={form.contact} onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="phone" placeholder="Телефон" value={form.phone} onChange={handleChange} />
      <button type="submit">Добавить контрагента</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Контрагент добавлен!</p>}
    </form>
  );
};

export default AddContractor;
