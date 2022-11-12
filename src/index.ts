import {Client, ClientOptions, Collection, Events, GatewayIntentBits, ModalSubmitFields} from 'discord.js';
import { Command, findCommands } from './commands';

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
  
})