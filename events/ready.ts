import { ActivityType, Client, Events } from 'discord.js';

export const name = Events.ClientReady;
export const once = true;
export async function execute(client: Client) {
  if (process.argv.includes('--reload-cmds')) import('../deploycmds.ts');
  client.user?.setActivity(`with cans of paint!`, { type: ActivityType.Playing });
  console.log(`[bot] ready (as: ${client.user!.tag}) :3`);
}