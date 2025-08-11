import { AttachmentBuilder, Events, Interaction, MessageFlags } from 'discord.js';
import { ClientWithCommands } from '../colorbot';
import { createCanvas, loadImage } from '@napi-rs/canvas';

export const name = Events.InteractionCreate;
export async function execute(interaction: Interaction) {
  if (interaction.isChatInputCommand()) {
    const command = (interaction.client as ClientWithCommands).commands.get(interaction.commandName);
    if (!command) {
      console.error(`[bot] no command matching ${interaction.commandName} was found!`);
      return;
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
      }
    }
  } else if (interaction.isStringSelectMenu()) {
    if (interaction.customId === 'color-filter') {
      const color = interaction.values[0];
      if (!color) {
        await interaction.reply({ content: `invalid color!`, flags: MessageFlags.Ephemeral });
        return;
      }

      const image = await loadImage(interaction.message.attachments.first()!.url);
      const canvas = createCanvas(500, 500);
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      context.globalAlpha = 0.35;
      switch (color) {
        case "rainbow":
          context.drawImage(await loadImage('https://hc-cdn.hel1.your-objectstorage.com/s/v3/166fb2d12d291df51b25a25428db818c6e36e4fa_image.png'), 0, 0, canvas.width, canvas.height);
          break;
        case "rainbowflag":
          context.drawImage(await loadImage('https://hc-cdn.hel1.your-objectstorage.com/s/v3/166fb2d12d291df51b25a25428db818c6e36e4fa_image.png'), 0, 0, canvas.width, canvas.height);
          break;
        // case "purple":
        //   context.
        //   context.rect()
        //   
        default:
          await interaction.reply({ content: `invalid color "${color}"!`, flags: MessageFlags.Ephemeral });
          return;
      }
      await interaction.update({ files: [new AttachmentBuilder(await canvas.encode('png'), { name: 'image.png' })] });
    } else return;
  } else return;
}