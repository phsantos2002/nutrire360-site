// GET /api/leads?key=SENHA — lista os leads (protegido por ADMIN_PASSWORD).
// Usado pela página /admin. Sem dependências npm.

function kvConfig() {
  const env = process.env;
  // Nomes conhecidos primeiro
  let url = env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL;
  let token = env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN;
  // Fallback: detecta qualquer variante com prefixo (ex.: STORAGE_KV_REST_API_URL)
  if (!url) {
    const k = Object.keys(env).find((n) => /REST_API_URL$/.test(n));
    if (k) url = env[k];
  }
  if (!token) {
    const k = Object.keys(env).find((n) => /REST_API_TOKEN$/.test(n) && !/READ_ONLY/.test(n));
    if (k) token = env[k];
  }
  return { url, token };
}

async function kvCommand(command) {
  const { url, token } = kvConfig();
  if (!url || !token) throw new Error('KV não configurado');
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });
  if (!r.ok) {
    const detail = await r.text().catch(() => '');
    throw new Error(`KV erro ${r.status}: ${detail}`);
  }
  return r.json();
}

module.exports = async (req, res) => {
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass) {
    res.status(500).json({ error: 'ADMIN_PASSWORD não configurado no servidor.' });
    return;
  }

  const headerKey = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  const provided = (req.query && req.query.key) || headerKey;
  if (provided !== pass) {
    res.status(401).json({ error: 'Não autorizado.' });
    return;
  }

  try {
    const data = await kvCommand(['LRANGE', 'leads', '0', '-1']);
    const raw = (data && data.result) || [];
    const leads = raw
      .map((s) => {
        try { return JSON.parse(s); } catch (_) { return null; }
      })
      .filter(Boolean);

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ ok: true, count: leads.length, leads });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar leads.', detail: String((err && err.message) || err) });
  }
};
