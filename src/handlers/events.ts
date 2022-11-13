import { ClientEvents, Events } from "discord.js";
import findFiles from "../util/findFiles";

export interface Event {
  name: keyof ClientEvents,
  once?: boolean,
  execute(...args: any): Promise<void> | void
}

export async function findEvents(baseDir: string) {
  const res: Event[] = [];
  const files = await findFiles(baseDir, 'js');

  for (const file of files) {
    const {default: mod} = await import(file);
    if ('name' in mod && 'execute' in mod) {
      if (Object.keys(Events).some((e) => e === mod.name) && typeof mod.execute === 'function') {
        res.push(mod);
      }
    }
  }

  return res;
} 
