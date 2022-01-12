module.exports = {
    name: 'rps',
    description: 'Plays rock paper scissors',
    async execute(message, client, args, Discord) {
      // This is required for this command to work 
      const { MessageActionRow, MessageButton } = require('discord.js');
      const ifilter = i => i.user.id === message.author.id;
      const collector = message.channel.createMessageComponentCollector({ filter: ifilter, time: 30000 })
      const wait = require('util').promisify(setTimeout);
     // Main code is under by the way 
    
      let Choice = ['🪨', '📰', '✂️'] // What the bot picks out of.
      let botChoice = Choice[Math.floor(Math.random() * Choice.length)] //Pick a random emoji from that string ['🪨', '📰', '✂️'] so out of that.

      // Rock
      const bRock = new MessageButton()
        .setCustomId("rock") // The Button ID.
        .setStyle('SECONDARY') // Makes the button gray/grey.
        .setLabel("🪨"); // Sets the bit you click as a Rock.
      // Paper
      const bPaper = new MessageButton()
        .setCustomId("paper") // The Button ID.
        .setStyle('SECONDARY') // Makes the button gray/grey.
        .setLabel("📰"); // Set the bit you click as a piece of paper.
      //Scissor
      const bScissor = new MessageButton()
        .setCustomId("scissor") // The Button ID.
        .setStyle('SECONDARY') // Makes the button gray/grey.
        .setLabel("✂️"); // Sets the bit you click as a pair of Scissors.

      // This is to compilealls all into 1
      const Buttons = new MessageActionRow()
        .addComponents([bRock, bPaper, bScissor]);

     // To send the Buttons and also a embed/message etc works as the normal v13 ways :)
      message.channel.send({
        content: `I have chose ${botChoice}, Alpha command, not finished!`, components: [Buttons]
      })

     // Now to collect the buton clicks
      collector.on('collect', async i => {
        if (i.customId === 'rock') { // This checks if you clicked the Rock button, it says rock in because i have the rock id as rock, this is changable
          await i.deferUpdate(); // Checks for button clicks
          await wait(250); // It waits to send the message because it looks smoother i guess i dont realy know why i just like it you can take this line out if you would like too
          if (botChoice === '🪨') { // Now this is where it reacts, so if the bot has picked '🪨' form line 10 then picked it again form line 11 it will do what ever u want it too do after that, so put what u want the bot to do in line 44
            await message.channel.send({ content: 'picked that too' }) // This is changeable as the line above says
          }
          // await i.editReply({ content: 'A button was clicked!', components: [] }); this is for testing, this will also be take out in latter updates 
        }
      });

      collector.on('end', collected => console.log(``)); // This checks now many times a button was clicked in the command in the space of 30 secondes i know its bad to make it console log nothing i just dont want console getting packed with logs, might update this to make it do other stuff, like type in a channel i dont know
    }
}
