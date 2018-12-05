const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const TOKEN = "NTA3NTM4OTMyOTU1NjExMTM3.DukKzg.328Eo6rB1XaOgIpz9sKBMrOwBFQ";

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("The elves make toys", {type: "WATCHING"});
  bot.user.setGame("Naughty or Nice");
});

bot.on("guildMemberAdd", function(member)
{
    member.send("**ChristmasBot** *Ho, Ho, Ho Merry Christmas and & welcome to **MCAlias!*");
    let memberRole = member.guild.roles.find("name", "Elf");
    member.addRole(memberRole);
});

bot.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find('name', 'welcome-leave');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField('Name : ', `${member}`)
        .addField('Welcome!', `Welcome to the server, ${member}`)
        .addField('User :', "**[" + `${member}` + "]**")
        .addField('Your are the member', `${member.guild.memberCount}`)
        .addField("Name", `<@` + `${member.id}` + `>`, true)
        .addField('Server', `${member.guild.name}`, true )
        .setFooter(`xoxo`)
        .setTimestamp()

        channel.sendEmbed(embed);
});

bot.on('guildMemberAdd', member => {

    console.log(`${member}`, "has joined" + `${member.guild.name}`)

});

bot.on('guildMemberRemove', member => {
    let channel = member.guild.channels.find('name', 'welcome-leave');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField('Name:', `${member}`)
        .addField('Has Let the Server', 'Goodbye Merry Christmas!')
        .addField('The server now as', `${member.guild.memberCount}` + " members")
        .setFooter(`**${member.guild.name}`)
        .setTimestamp()

        channel.sendEmbed(embed);
});

bot.on('guildMemberRemove', member => {
    console.log(`${member}` + "has left" + `${member.guild.name}` + "Sending leave message now")
    console.log("Leave Message Sent")
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}kick`){

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("**Usage:** !kick <@UsersID> <Reason>");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to execute that command here.");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("**~Kick~**")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if(!kickChannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("**Usage:** !ban <@UsersID> <Reason>");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You don't have permission to execute that command here.!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("**~Ban~**")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


    return;
  }


  if(cmd === `${prefix}wishlist`){

    //!report @ned this is the reason

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Usage: !wishlist <@YourID> <List>");
    let rreason = args.join(" ").slice(22);

    let bicon = bot.user.displayAvatarURL;
    let wishlistEmbed = new Discord.RichEmbed()
    .setDescription("Wishlist")
    .setColor("#f01515")
    .setThumbnail(bicon)
    .addField("Wishlist Creator", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("List", rreason);

    let wishlistchannel = message.guild.channels.find(`name`, "wishlists");
    if(!wishlistchannel) return message.channel.send("Couldn't find lists in the wishlist channel.");


    message.delete().catch(O_o=>{});
    wishlistchannel.send(wishlistEmbed);

    return;
  }




  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }



  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .addField("Creator", "Ramell");

    return message.channel.send(botembed);
  }

  if(cmd === `${prefix}help`){
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Christmas Bot Commands")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("!kick", "kicks the user that was being naughty.")
    .addField("!ban", "Removes the user that shall be put on the naughty list.")
    .addField("!wishlist", "Send santa your wishlist by doing !wishlist")
    .addField("!botinfo", "This shows the ChristmasBots info.")
    .addField("!serverinfo", "Shows the Servers info.")
    .addField("Creator", "Ramell");

    return message.channel.send(botembed);
  }
});
const token = process.env.TOKEN;
bot.login(TOKEN);
