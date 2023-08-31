require('dotenv/config');
const { Client, IntentsBitField, ActivityType } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const logErrors = require('./utils/logErrors');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

// Status presence do bot
let status = [
  {
    name: 'VALORANT',
    type: ActivityType.Competing
  },
  {
    name: 'Master Chef',
    type: ActivityType.Watching
  },
  {
    name: 'League of Legends',
    type: ActivityType.Playing
  },
  {
    name: 'Música',
    type: ActivityType.Listening
  }
]

client.on('ready', () => {
  console.log(`${client.user.username} está online e pronto!`);
  
  // Ramdomiza o status do bot e o tempo em que eles mudam (em milissegundos)
  setInterval(() => {
    let random = Math.floor(Math.random() * status.length); 
    client.user.setActivity(status[random]);
  }, 3600000);
});

// Setup OpenAI API
const configuration = new Configuration({ apiKey: process.env.API_KEY });
const openai = new OpenAIApi(configuration);

// Mensagem de sistema personalizada usada para modificar o comportamento (Prompt)
const systemMessage =
  "Você é um chatBot amigável.";

const ignoreMessagePrefix = process.env.IGNORE_MESSAGE_PREFIX;

let chatChannels = process.env.CHANNEL_ID.split('-');

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!chatChannels.includes(message.channelId)) return;
  if (message.content.startsWith(ignoreMessagePrefix)) return;

  let conversationLog = [{ role: 'system', content: systemMessage }];

  // Buscar mensagens anteriores para usar como contexto
  let prevMessages = await message.channel.messages.fetch({ limit: 8 }); // As últimas 8 mensagens serão usadas como contexto
  prevMessages.reverse();

  let initialReply = await message.reply(
    '<a:carregando:1146470318974701578>'
  );

  prevMessages.forEach((msg) => {
    if (message.content.startsWith(ignoreMessagePrefix)) return;
    if (msg.author.id !== client.user.id && message.author.bot) return; // Ignore todos os bots, exceto ele mesmo

    // Se o autor da mensagem for o próprio bot
    if (msg.author.id === client.user.id) {
      conversationLog.push({
        role: 'assistant',
        content: msg.content,
        name: msg.author.username.replace(/\s+/g, '_').replace(/[^\w\s]/gi, ''),
      });
    }

    // Se a mensagem for de um usuário
    else if (msg.author.id === message.author.id) {
      conversationLog.push({
        role: 'user',
        content: msg.content,
        name: message.author.username.replace(/\s+/g, '_').replace(/[^\w\s]/gi, ''),
      });
    }
  });

  // Gerar uma resposta
  openai
    .createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: conversationLog,
      max_tokens: 500, // Limite de uso de caracteres (opcional)
    })
    .then((result) => {
      let gptReply = result.data.choices[0].message;

      if (gptReply.length > 2000) {
        gptReply = gptReply.slice(0, 1997) + '...';
      }

      initialReply.edit(gptReply);
    })
    .catch(async (error) => {
      // Edita a mensagem com o erro e apaga depois de 10 segundos
      await initialReply.edit(
        `❌ Estou com problemas para me conectar aos servidores do chatGPT, tente mais tarde.\n${error}`
      );

      setTimeout(() => {
        initialReply.delete();
      }, 10000);
    });
});

// Error handling
process.on('unhandledRejection', (reason) => logErrors(reason));
process.on('uncaughtException', (reason) => logErrors(reason));

client.login(process.env.TOKEN);
