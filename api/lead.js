// POST /api/lead — salva um lead da Lista VIP no Vercel KV (Upstash Redis via REST).
// Sem dependências npm: usa fetch nativo (Node 18+ na Vercel).

function kvConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
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
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido.' });
    return;
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body || '{}'); } catch (_) { body = {}; }
    }
    if (!body || typeof body !== 'object') body = {};

    const nome = String(body.nome || '').trim().slice(0, 120);
    const telefone = String(body.telefone || '').trim().slice(0, 40);
    const email = String(body.email || '').trim().slice(0, 160);
    const origem = String(body.origem || 'popup').trim().slice(0, 40);

    if (!nome || !telefone || !email) {
      res.status(400).json({ error: 'Preencha nome, telefone e e-mail.' });
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      res.status(400).json({ error: 'E-mail inválido.' });
      return;
    }
    if (telefone.replace(/\D/g, '').length < 10) {
      res.status(400).json({ error: 'Telefone inválido.' });
      return;
    }

    const record = {
      nome,
      telefone,
      email,
      origem,
      data: new Date().toISOString(),
      ip:
        (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || null,
    };

    await kvCommand(['LPUSH', 'leads', JSON.stringify(record)]);

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Não foi possível salvar agora. Tente novamente.', detail: String((err && err.message) || err) });
  }
};
