import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('start')
	.setDescription('Starts a new picture :3');
export async function execute(interaction: CommandInteraction) {
	interaction.reply(`templating the bot out!`);
};