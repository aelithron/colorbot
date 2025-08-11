import { createCanvas, Image, loadImage } from '@napi-rs/canvas';
import { ActionRowBuilder, AttachmentBuilder, ChatInputCommandInteraction, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuComponent, StringSelectMenuOptionBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('start')
	.setDescription('Starts a new picture :3')
	.addAttachmentOption(option =>
		option.setName('image')
			.setDescription('Upload an image! Defaults to the sea monster if none provided.')
			.setRequired(false)
	);
export async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();
	const attatchedImage = interaction.options.getAttachment('image');
	let image: Image;
	if (attatchedImage) {
		image = await loadImage(attatchedImage.url);
	} else {
		image = await loadImage('https://hc-cdn.hel1.your-objectstorage.com/s/v3/83453e46f70604e0e3b8f7df907d1cbc8f96e935_screen_shot_2025-08-11_at_3.00.42_am.png');
	}
	const canvas = createCanvas(500, 500);
	const context = canvas.getContext('2d');
	context.drawImage(image, 0, 0, canvas.width, canvas.height);
	const colorPicker = new StringSelectMenuBuilder()
		.setCustomId('color-filter')
		.setPlaceholder('Add a color...')
		.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel('Rainbow')
				.setEmoji('🌈')
				.setDescription('Add a rainbow filter over your image!')
				.setValue('rainbow')
		)

	const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(colorPicker);
	await interaction.editReply({ files: [new AttachmentBuilder(await canvas.encode('png'), { name: 'image.png' })], components: [row] });
};