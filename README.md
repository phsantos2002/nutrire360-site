# Nutrire 360 · Site

Site da **Nutrire 360 · Saúde Integrada**, clínica que reúne nutrição, estética e medicina sob o mesmo teto, em **Jacareí, SP** (Vale do Paraíba).

Estrutura estática (HTML + CSS + JS), identidade visual própria (verde-oliva + dourado sobre creme).

---

## 🗂 Duas versões do site

O projeto mantém **duas páginas**, que compartilham o mesmo `css/styles.css` e `js/main.js`:

| Arquivo | Para quê | Status |
|---------|----------|--------|
| **`index.html`** | **Pré-lançamento** — campanha de captação da Lista VIP de inauguração via WhatsApp. Foco em uma única ação. | ✅ Ativo agora |
| **`site-pos-lancamento.html`** | **Institucional completo** — versão definitiva, com serviços, sobre, planos, localização e blog. | 💤 Para ativar na inauguração |

### Como alternar na inauguração

No dia da abertura, basta trocar os nomes dos arquivos (a versão institucional passa a ser a página principal):

```bash
# faça backup da versão de pré-lançamento e promova a institucional
mv index.html pre-lancamento.html
mv site-pos-lancamento.html index.html
```

Depois é só publicar (push no Git → a Vercel/Netlify rebuilda sozinha). Nenhuma alteração de CSS/JS é necessária: ambos os arquivos usam o mesmo design system.

---

## 🚀 Como publicar

Site **estático puro** — sem build, sem Node, sem framework.

### Opção 1 — Vercel (recomendado)

1. Crie um repositório no GitHub e suba esta pasta
2. [vercel.com](https://vercel.com) → **Add New Project** → conecte o repositório
3. **Framework Preset:** Other → **Deploy**
4. Aponte o domínio em **Settings → Domains**

### Opção 2 — Arrastar pasta (sem Git)

- **Vercel:** [vercel.com/new](https://vercel.com/new) → arraste a pasta
- **Netlify:** [app.netlify.com/drop](https://app.netlify.com/drop) → arraste a pasta

### Testar localmente

```bash
python -m http.server 8000
# abra http://localhost:8000
```

---

## 📁 Estrutura

```
nutrire360-site/
├── index.html                 ← Pré-lançamento (ativo) — Lista VIP
├── site-pos-lancamento.html   ← Institucional completo (para a inauguração)
├── css/
│   └── styles.css             ← Design system + bloco "PRÉ-LANÇAMENTO — ADIÇÕES"
├── js/
│   └── main.js                ← Navbar, drawer, smooth scroll, reveal, countdown
├── assets/
│   └── logo.png               ← Logo oficial
├── vercel.json
└── README.md
```

---

## ✏️ O que trocar antes de publicar

Use **Ctrl+Shift+F** (busca global no VS Code) e substitua os placeholders:

| Procurar | Substituir por |
|----------|----------------|
| `5512999999999` | Número real do WhatsApp (DDI 55 + DDD + número, só dígitos) |
| `2026-07-15T09:00:00-03:00` | Data/hora real da inauguração (`data-launch` no hero). Se ficar inválida/nula, o countdown vira badge **"Em breve"** automaticamente |
| `[Endereço completo, Bairro]` / `[Endereço completo]` | Endereço real em Jacareí (na versão institucional) |
| `(12) 9 9999-9999` | Telefone formatado |
| `contato@nutrire360.com.br` | E-mail real |
| `instagram.com/nutrire360` · `facebook.com/nutrire360` | URLs reais das redes |

**Imagens:** os placeholders usam URLs do Unsplash (CDN). Para usar fotos reais, coloque os arquivos em `assets/` e troque os `src` que apontam para `images.unsplash.com`.

**Mapa (institucional):** o iframe é um placeholder genérico de Jacareí. Gere o embed exato em [google.com/maps](https://google.com/maps) → Compartilhar → Incorporar mapa.

---

## 🎯 Estratégia da página de pré-lançamento

Uma única ação primária em toda a página: **entrar na Lista VIP via WhatsApp**. Sequência: Fit → Valor → Confiança → Ação → Continuidade.

Seções (em ordem): navbar minimalista · hero com countdown · manifesto (01/02/03) · 3 pilares (teaser, sem agendamento) · **card Lista VIP** (coração) · equipe teaser · "Em breve em Jacareí" · call final · footer.

**Conformidade CFM 2.336/2023 + CFN:** sem "antes e depois", sem promessa de resultado, sem escassez fabricada. Linguagem educativa e acolhedora; foco em metodologia, não em resultados específicos.

---

## 🎨 Design System

### Cores (CSS variables em `css/styles.css`)

| Token | Hex | Uso |
|-------|-----|-----|
| `--primary` | `#C9A84C` | Dourado do logo — CTAs |
| `--olive` | `#7A8052` | Verde-oliva — acentos |
| `--dark` | `#2B2E26` | Textos escuros / seção final |
| `--bg-page` | `#FCFAF4` | Fundo creme (base do logo) |
| `--bg-warm` / `--bg-warm-darker` | `#F7F2E6` / `#F1EADB` | Fundos bege |
| `--gradient-logo` | oliva → dourado | Destaques (espelha o logo) |

### Tipografia

- **Display** (títulos): **Poppins** — sans-serif clean e moderna
- **Body / UI:** **Montserrat**

### Convenções de texto

- Sem traços decorativos antes de rótulos ou sob títulos
- Sem travessões `—` no corpo: usar `:`, `,` ou `.`; e `·` como separador de marca

---

© 2026 Nutrire 360 · Saúde Integrada · Jacareí, SP
