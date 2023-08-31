## 🤖 ChatGPT 3.5 turbo Discord BOT
Este é um ChatBot para Discord que usa a API do OpenAI  e usa o modelo de linguagem gpt-3.5-turbo para gerar respostas de conversas. O bot também possui recursos de presença de status aleatório.

## *Tecnologias Utilizadas*

| Tecnologia                 | Descrição                                                                                     |
|---------------------------|-----------------------------------------------------------------------------------------------|
| [Node.js](https://nodejs.org/)               | Plataforma de tempo de execução JavaScript usada para executar o código.                    |
| [Discord.js](https://discord.js.org/)        | Biblioteca JavaScript para interagir com a API do Discord.                                    |
| [OpenAI API](https://beta.openai.com/)       | API da OpenAI para geração de texto com modelos de linguagem avançados.                       |


## *Instalação* 

* Clone este repositório para o seu ambiente local:
```bash
git clone https://github.com/TiagoAssuno/discord-chatbot.git
```
* Instale as dependências necessárias usando o npm (Node Package Manager):
```bash
npm install
```
Crie um arquivo `.env` na raiz do diretório do projeto ou renomeie o `.env.exemplo` e defina as variáveis de ambiente necessárias:
```bash
# Discord bot token
TOKEN =TOKEN-DO-BOT-AQUI

# OpenAI API key
API_KEY =API-DA-OPENAI-AQUI

# Você pode adicionar vários canais adicionando - entre os IDs dos canais (sem espaços)
CHANNEL_ID = ID DO CANAL DE TEXTO AQUI

# ----- OPCIONAL -----

# As mensagens que começam com isso serão ignoradas pelo bot
# Não incluir isso fará com que seu bot leia e responda a TODAS as mensagens (não recomendado)
IGNORE_MESSAGE_PREFIX = !

# Usado para registrar erros usando um URL webhook 
LOGS_WEBHOOK_URL =
```
⚠ Certifique-se de substituir os valores acima pelos valores reais ⚠


* Inicie o bot executando o seguinte comando:
```bash
npm run start
```
✅ Agora o seu ChatBot está online e pronto para ser usado!
# 🔑 *Encontre sua chave API da OpenAI:*
  * Vá para https://beta.openai.com/account/api-keys e logue com sua conta ou crie uma.
  * Crie uma chave em `Create new secret key`
  * Copie a key e cole no arquivo `.env`

## Uso
O bot responderá somente as mensagens nos canais especificados em CHANNEL_ID. Ele usará a API do OpenAI para gerar respostas de conversas baseadas nas mensagens anteriores.
