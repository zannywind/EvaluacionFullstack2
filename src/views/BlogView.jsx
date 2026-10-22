const posts = [
  { id: 1, title: 'Cómo elegir tu próximo videojuego', summary: 'Tres aspectos para comparar antes de elegir.',
    body: 'Revisa que el juego sea compatible con tu consola, compara el género con tus preferencias y considera si prefieres jugar solo o en compañía. Consulta la clasificación por edades antes de comprar.' },
  { id: 2, title: 'Cuida tus accesorios de juego', summary: 'Hábitos sencillos para cuidar tus dispositivos.',
    body: 'Guarda tus accesorios en un lugar seco, evita tirar de los cables y sigue las instrucciones de limpieza del fabricante. Mantén ventilada tu consola y apágala antes de desconectar sus accesorios.' }
];
export default function BlogView({ postId, onSelectPost }) {
  const post = posts.find((entry) => entry.id === postId);
  if (post) return <article className="card p-4 my-4"><h2>{post.title}</h2><p>{post.body}</p>
    <button className="btn btn-outline-primary align-self-start" onClick={() => onSelectPost(null)}>Volver al blog</button></article>;
  return <section className="my-4"><h2>Blog</h2><div className="row g-3">{posts.map((entry) => <article key={entry.id} className="col-md-6">
    <div className="card h-100 p-3"><h3 className="h5">{entry.title}</h3><p>{entry.summary}</p>
      <button className="btn btn-primary mt-auto" aria-label={`Leer ${entry.title}`} onClick={() => onSelectPost(entry.id)}>Leer artículo</button></div>
  </article>)}</div></section>;
}
