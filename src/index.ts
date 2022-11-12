import {config} from 'dotenv';
config();

import {Client, ClientOptions, Collection, Events, GatewayIntentBits, ModalSubmitFields} from 'discord.js';
import { Command, findCommands } from './commands';
import { info } from './logger';

class Bot extends Client {
  commands: Collection<string, Command> = new Collection();

  constructor(opts: ClientOptions) {
    super(opts);
  }

  async populateCommands() {
    const files = await findCommands('/');
    files.forEach((f) => this.commands.set(f.slash.name, f));
    return this.commands;
  }
}

const client = new Bot({intents: [GatewayIntentBits.Guilds]});

client.on(Events.ClientReady, (c) => {
  info(`Logged in as ${c.user.tag}`);
});

client.populateCommands().then(async () => {
  await client.login(process.env.TOKEN);
});
