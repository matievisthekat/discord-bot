import {ChatInputCommandInteraction, SlashCommandBuilder} from 'discord.js';

export default {
	slash: new SlashCommandBuilder().setName('ping').setDescription('Play ping pong!'),
	async execute(int: ChatInputCommandInteraction) {
		await int.reply({content: 'Pong!'});
	}
};
