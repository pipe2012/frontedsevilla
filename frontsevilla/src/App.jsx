import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL;

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  const load = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setItems(data);
  };

  const add = async () => {
    if (!name.trim()) return;
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    setName('');
    load();
  };

  const remove = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={styles.container}>
      <h2>🍽 Lista simple</h2>

      <div style={styles.form}>
        <input
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nuevo item"
        />
        <button style={styles.button} onClick={add}>
          Agregar
        </button>
      </div>

      <ul style={styles.list}>
        {items.map((item) => (
          <li key={item.id} style={styles.item}>
            {item.name}
            <button style={styles.delete} onClick={() => remove(item.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: '40px auto',
    padding: 20,
    fontFamily: 'Arial'
  },
  form: {
    display: 'flex',
    gap: 10,
    marginBottom: 20
  },
  input: {
    flex: 1,
    padding: 10
  },
  button: {
    padding: '10px 15px',
    background: '#333',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    background: '#f4f4f4',
    padding: 10,
    marginBottom: 10
  },
  delete: {
    border: 'none',
    background: 'red',
    color: 'white',
    cursor: 'pointer'
  }
};