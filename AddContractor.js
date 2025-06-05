import React, { useState } from 'react';

export default function AddContractor() {
  const [form, setForm] = useState({
    organization: '',
    inn: '',
    ogrn: '',
    address: '',
    contact: '',
    email: '',
    phone: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:4000/add-contractor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Контрагент успешно добавлен!');
        setForm({
          organization: '',
          inn: '',
          ogrn: '',
          address: '',
          contact: '',
          email: '',
          phone: ''
        });
      } else {
        setMessage(data.error || 'Ошибка при добавлении');
      }
    } catch (error) {
      setMessage('Ошибка сети или сервера');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="organization"
        placeholder="Название организации"
        value={form.organization}
        onChange={handleChange}
        required
      />
      <input
        name="inn"
        placeholder="ИНН"
        value={form.inn}
        onChange={handleChange}
        required
      />
      <input
        name="ogrn"
        placeholder="ОГРН"
        value={form.ogrn}
        onChange={handleChange}
      />
      <input
        name="address"
        placeholder="Адрес"
        value={form.address}
        onChange={handleChange}
      />
      <input
        name="contact"
        placeholder="Контактное лицо"
        value={form.contact}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Телефон"
        value={form.phone}
        onChange={handleChange}
      />
      <button type="submit">Добавить контрагента</button>

      {message && <p>{message}</p>}
    </form>
  );
}
