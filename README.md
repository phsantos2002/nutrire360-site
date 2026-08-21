# Nutrire 360 · Site

Site da **Nutrire 360 · Saúde Integrada**, clínica que reúne nutrição, estética e medicina sob o mesmo teto, em **Jacareí, SP** (Vale do Paraíba).

Estrutura estática (HTML + CSS + JS), identidade visual própria (verde-oliva + dourado sobre creme).

---

## 🗂 Versões do site

| Arquivo | Para quê | Status |
|---------|----------|--------|
| **`index.html`** | **Institucional com serviços** — clínica em operação: serviços e "inclui" de cada consulta, bioimpedância, estética avançada, Programas Nutrire 360, profissionais (com os atendimentos de cada um) e localização. Usa `css/app-60.css` + `css/inst-1.css` e `js/main.js` + `js/inst.js`. | ✅ **No ar** |
| `arquivo/pre-lancamento.html` | Campanha de Lista VIP da inauguração (pop-up de captura, countdown). Foi a home até 21/08/2026. | 📦 Arquivada |
| `arquivo/site-pos-lancamento.html` | Rascunho antigo da institucional (placeholders do Unsplash, WhatsApp fictício, aponta para um `css/styles.css` que não existe mais). | ⚠️ Obsoleto |

As páginas em `arquivo/` continuam funcionando (os caminhos de `css/`, `js/` e `assets/`
foram ajustados para `../`) e estão com `noindex`, tanto na meta tag quanto no header do
`vercel.json`. Elas não aparecem no Google e não competem com a home.

### Voltar ao layout anterior, se precisar

```bash
# guarda a institucional e devolve a página de pré-lançamento para a raiz
git mv index.html arquivo/institucional.html
git mv arquivo/pre-lancamento.html index.html
# corrija os caminhos: troque ../css/ ../js/ ../assets/ por css/ js/ assets/
```

Lembre de remover a meta `robots noindex` da página que voltar a ser a home.

### Endereços antigos

`/teste` e `/institucional` (usados na fase de aprovação) redirecionam para a home,
via `redirects` no `vercel.json`. Quem tiver o link antigo cai na página certa.

### Testar localmente

```bash
python3 -m http.server 8000
# home:      http://localhost:8000/
# arquivada: http://localhost:8000/arquivo/pre-lancamento.html
```

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
├── index.html                 ← Institucional com serviços (no ar)
├── admin.html                 ← Painel de leads da Lista VIP (senha)
├── arquivo/                   ← Layouts anteriores, com noindex
│   ├── pre-lancamento.html    ← Home antiga (Lista VIP + countdown)
│   └── site-pos-lancamento.html ← Rascunho antigo (obsoleto)
├── api/
│   ├── lead.js                ← POST: salva lead no Vercel KV
│   └── leads.js               ← GET: lista leads (ADMIN_PASSWORD)
├── css/
│   ├── app-60.css             ← Design system + bloco "PRÉ-LANÇAMENTO — ADIÇÕES"
│   └── inst-1.css             ← Seções da institucional (serviços, programas, profissionais)
├── js/
│   ├── main.js                ← Navbar, mega-menu, smooth scroll, reveal, pop-up, countdown
│   └── inst.js                ← Reveal das seções da institucional
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
