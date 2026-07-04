# Lista VIP — configuração do armazenamento e do painel admin

O pop-up de captura salva os leads no **Vercel KV** (banco Redis gratuito da Vercel)
e você visualiza tudo em **nutrire360.com.br/admin**.

Depois do deploy, faça esta configuração **uma única vez**:

## 1. Criar o banco (Vercel KV)

1. Acesse o painel da Vercel → seu projeto **nutrire360-site**.
2. Aba **Storage** → **Create Database** → escolha **KV** (Upstash Redis / “Redis”).
3. Dê um nome (ex.: `nutrire360-leads`) e clique em **Create**.
4. Em **Connect Project**, conecte ao projeto **nutrire360-site** (ambientes Production/Preview/Development).
   - Isso cria automaticamente as variáveis `KV_REST_API_URL` e `KV_REST_API_TOKEN`.

## 2. Definir a senha do admin

1. No projeto → **Settings** → **Environment Variables**.
2. Adicione:
   - **Name:** `ADMIN_PASSWORD`
   - **Value:** a senha que você quiser (ex.: uma senha forte só sua)
   - Ambiente: **Production** (marque Preview também se quiser)
3. Salve.

## 3. Redeploy

- Vá em **Deployments** → menu “···” do último deploy → **Redeploy**
  (ou faça qualquer push). Isso aplica as variáveis novas.

## Pronto

- **Pop-up:** já captura nome, telefone e e-mail e salva no banco.
- **Painel:** acesse **nutrire360.com.br/admin**, digite a `ADMIN_PASSWORD`,
  veja a lista e clique em **Exportar CSV** para baixar em Excel.
- O telefone na tabela vira link direto de WhatsApp; o e-mail abre o cliente de e-mail.

### Observações
- A página `/admin` tem `noindex` (não aparece no Google), mas a proteção real é a senha na API.
- Enquanto o banco/senha não estiverem configurados, o pop-up mostra “não foi possível salvar”.
