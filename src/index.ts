import {config} from 'dotenv';
config();

import {Client, ClientEvents, ClientOptions, Collection, Events, GatewayIntentBits} from 'discord.js';
import {Command, findCommands} from './handlers/commands';
import {findEvents, Event} from './handlers/events';
import {join} from 'path';
import {info} from './logger';

class Bot extends Client {
	commands: Collection<string, Command> = new Collection();
	events: Collection<keyof ClientEvents, Event> = new Collection();

	constructor(opts: ClientOptions) {
		super(opts);
	}

	async populateCommands() {
		const cmds = await findCommands(join(__dirname, 'commands'));
		cmds.forEach((c) => this.commands.set(c.slash.name, c));
	}

	async populateEvents() {
		const events = await findEvents(join(__dirname, 'events'));
		events.forEach((e) => {
			this.events.set(e.name, e);
			this[e.once ? 'once' : 'on'](e.name, (...args) => e.execute(...args));
		});
	}
}

const client = new Bot({intents: [GatewayIntentBits.Guilds]});

client.populateCommands().then(async () => {
	await client.populateEvents();
	await client.login(process.env.TOKEN);
});
