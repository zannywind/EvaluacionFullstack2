import { useState } from 'react';
export default function ContactView() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) { setStatus('Completa nombre y mensaje sin usar solo espacios.'); return; }
    setStatus('Mensaje validado. Esta demostración no envía correos.');
  };
  return <section className="my-4"><h2>Contacto</h2><p>Formulario de demostración para consultas sobre la tienda.</p>
    <form className="card p-3 p-md-4" onSubmit={submit}>
      <label htmlFor="contact-name" className="form-label">Nombre</label><input id="contact-name" className="form-control mb-3" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <label htmlFor="contact-email" className="form-label">Correo</label><input id="contact-email" className="form-control mb-3" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <label htmlFor="contact-message" className="form-label">Mensaje</label><textarea id="contact-message" className="form-control mb-3" required rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      <button className="btn btn-primary align-self-start">Validar mensaje</button>
      {status && <p role="status" className="mt-3 mb-0">{status}</p>}
    </form></section>;
}
