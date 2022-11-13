import {Client, Events} from 'discord.js';
import {info} from '../logger';

export default {
	name: Events.ClientReady,
	once: true,
	execute(client: Client<true>) {
		info(`Logged in as ${client.user.tag}`);
	}
};
