import fs from 'fs';
import path from 'path';
import {Interaction, SlashCommandBuilder} from 'discord.js';
import findFiles from '../util/findFiles';

export interface Command {
	slash: SlashCommandBuilder;
	execute(int: Interaction): Promise<void>;
}

export async function findCommands(baseDir: string): Promise<Command[]> {
	const res: Command[] = [];
	const files = await findFiles(baseDir, 'js');

	for (const file of files) {
		const {default: mod} = await import(file);
		if ('slash' in mod && 'execute' in mod) {
			if (mod.slash instanceof SlashCommandBuilder && typeof mod.execute === 'function') {
				res.push(mod);
			}
		}
	}

	return res;
}
