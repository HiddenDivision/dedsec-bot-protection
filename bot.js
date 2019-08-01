const {Client, Attachment, RichEmbed, Guild, GuildMember, MessageMentions, Role} = require('discord.js');
const bot = new Client();
const superagent = require('superagent');

const PREFIX = '​';
const testpre = '-';

bot.on('ready', () =>{
	console.log('Online.');
	var Channel = bot.channels.get("601423369883222016");
	Channel.fetchMessage("601423653724225536");
	bot.user.setActivity('you getting killed.', { type: ('WATCHING')})
})

bot.on('raw', event =>{
	const eventname = event.t
	if(eventname === 'MESSAGE_REACTION_ADD')
	{
		var reactionChannel = bot.channels.get(event.d.channel_id);
		if(event.d.message_id === '601423653724225536')
		{
			reactionChannel.fetchMessage(event.d.message_id)
			.then(msg => {
			var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
			var user = bot.users.get(event.d.user_id)
			})
			.catch(err => console.log(err))
		}
		else {
			reactionChannel.fetchMessage(event.d.message_id)
			.then(msg => {
			var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
			var user = bot.users.get(event.d.user_id)
			})
			.catch(err => console.log(err))
		}
	}
});

bot.on('messageReactionAdd', (messageReaction, user) =>{
	var roleName = messageReaction.emoji.name
	var role = messageReaction.message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());
	console.log(roleName)
	var member = messageReaction.message.guild.members.find(member => member.id === user.id);
	if(member)
	{
		member.addRole(role.id)
		console.log("Success.")
	}
})

bot.on('guildMemberAdd', member =>{

	const channel = member.guild.channels.find(channel => channel.name === "𝔚𝔢𝔩𝔠𝔬𝔪𝔢");
	if(!channel) return;
	let role = member.guild.roles.find("name", "𝔊𝔲𝔢𝔰𝔱𝔰");
	member.addRole(role.id);
	channel.sendMessage(`Welcome in 〷 𝔅𝔬𝔯𝔫 𝔎𝔦𝔩𝔩𝔢𝔯𝔰 𝔓𝔲𝔟𝔩𝔦𝔠 〷, ${member}.`);
})

bot.on('guildMemberRemove', member =>{

	const channel = member.guild.channels.find(channel => channel.name === "𝔚𝔢𝔩𝔠𝔬𝔪𝔢");
	if(!channel) return;
	channel.sendMessage(`${member} got killed. We will see you at the graveyard.`)
})

bot.on('message', msg=>{
	if(msg.content === "-meme"){
		const randomPuppy = require('random-puppy');
		const snekfetch = require('snekfetch');
		let reddit = [
			"meme",
			"animemes",
			"MemesOfAnime",
			"animememes",
			"AnimeFunny",
			"dankmemes",
			"dankmeme",
			"wholesomememes",
			"MemeEconomy",
			"meirl",
			"me_irl",
			"2meirl4meirl"
		];
		let subreddit = reddit[Math.floor(Math.random() * reddit.length - 1)];
		msg.channel.startTyping();
		randomPuppy(subreddit).then(url =>{
			snekfetch.get(url).then(async res =>{
				await msg.channel.sendMessage({
					files: [{
						attachment: res.body,
						name: 'meme.png'
					}]
				}).then(msg.channel.stopTyping());
			});
		});
	}
	if(msg.content === "-help"){
		const embed = new RichEmbed()
		.setTitle('Available Commands :')
		.addField('General commands', "'-help' : Shows you all available commands.\n'-kick' : Kicks a specific user from the server.\n'-ban' : Ban a specific user from the server.\n'-unban' : Unban a specific user from the server (Only with the discord ID).\n'-purge' : Pruge a specific amount of messages on the channel.\n'-announcement' : Make a public announcement to the server.")
		.addField('Entertainment commands', "'-meme' : Sends memes.\n'-OwO' : Makes any text in OwO.\n'Pwease send Spanzer's thighs.' (Without the prefix) : Send's Spanzer's thighs.")
		.addField('Current normal prefix', "'-' : It's the current prefix.")
		.setColor(0x160033)
		msg.channel.sendEmbed(embed);
	}
	if(msg.content === "Pwease send Spanzer's thighs."){
		const attachement = new Attachment('https://cdn.discordapp.com/attachments/574629212258959387/594448748256428042/JPEG_20190510_205536.jpg');
		msg.channel.sendMessage(attachement);
	}
	let args2 = msg.content.substring(testpre.length - 1).split(" ");
	switch(args2[0]){
		case '-OwO':
			if(!args2[1]) return msg.channel.sendMessage('OwO?');
			const owoMessage = args2.join(" ").slice(5);
			someString = owoMessage
			anotherString = someString.replace(/r/g, 'w');
			s1 = anotherString.replace(/R/g, 'W');
			s2 = s1.replace(/y/g, 'w');
			s3 = s2.replace(/Y/g, 'W');
			s4 = s3.replace(/l/g, 'w');
			s5 = s4.replace(/L/g, 'W');
			msg.channel.bulkDelete('1');
			msg.channel.sendMessage(s5);
		break;
	}
	let args = msg.content.substring(PREFIX.length - 1).split(" ");
	switch(args[0]){
		case '-purge':
			const command = args.join(" ");
			if(command.includes('-')) return;
			if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.sendMessage("You don't have the permission to purge messages!");
			if(!msg.guild.me.hasPermission("MANAGE_MESSAGES")) return msg.channel.sendMessage("I don't have the allowed permission to purge messages!");
			if(!args[1]) return msg.channel.sendMessage('Please specify a number of messages to be purged!');
			msg.channel.bulkDelete(args[1]);
		break;
		case '-iregards':
			mention = msg.mentions.users.first();
			if(!msg.author.id === '333357946744602647') return msg.channel.sendMessage("You are not the leader. You can't do that.");
			if(!args[1]) return msg.channel.sendMessage('Who are you trying to send your regards?')
			const regard = new Attachment('https://cdn.discordapp.com/attachments/598945838646951956/600162120998322178/BORN_KILLERS.gif')
			mention.sendMessage('𝔅𝔬𝔯𝔫 𝔎𝔦𝔩𝔩𝔢𝔯𝔰 sends their regards.');
			mention.sendMessage(regard);
			msg.channel.bulkDelete(1);
		break;
		case '-announcement':
			if(!args[1]) return msg.channel.sendMessage('What are you trying to announce?')
			if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.sendMessage("You don't have the permission to make an announcement!");
			if(!msg.guild.me.hasPermission("ADMINISTRATOR")) return msg.channel.sendMessage("I don't have the allowed permission to make an announcement!");
			const aMessage = args.join(" ").slice(14);
			const achannel = bot.channels.find(channel => channel.name === "𝔄𝔫𝔫𝔬𝔲𝔫𝔠𝔢𝔪𝔢𝔫𝔱𝔰");
			const aAuthor = msg.author.username
			const agif = new Attachment('https://cdn.discordapp.com/attachments/598945838646951956/600162120998322178/BORN_KILLERS.gif');
			if(!achannel) return;
			msg.channel.bulkDelete(1);
			achannel.sendMessage('@everyone \n \n' + aMessage + '\n \n' + 'Announcement made by ' + aAuthor + '.')
			achannel.sendMessage(agif)
		break;
		case '-kick':
			if(!args[1]) return msg.channel.sendMessage('Please specify a user!')
			const tuser = msg.mentions.users.first();
			const kreason = args.join(" ").slice(28);
			if(tuser){
				const member = msg.guild.member(tuser)
				if(member){
					if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.sendMessage("You don't have the permission to kick someone!");
					if(!msg.guild.me.hasPermission("KICK_MEMBERS")) return msg.channel.sendMessage("I don't have the allowed permission to kick someone!");
					if(!kreason){
						member.kick('You were kicked.');
						const kembed = new RichEmbed()
						.setTitle('User has been kicked!')
						.addField("User's name", tuser)
						.addField("User's ID", tuser.id)
						.addField("Reason", 'No reason specified.');
						msg.channel.sendEmbed(kembed);
					}
					else{
						member.kick(kreason);
						const kembed = new RichEmbed()
						.setTitle('User has been kicked!')
						.addField("User's name", tuser)
						.addField("User's ID", tuser.id)
						.addField("Reason", kreason);
						msg.channel.sendEmbed(kembed);
					}
				}
			}
		break;
		case '-ban':
			if(!args[1]) return msg.channel.sendMessage('Please specify a user!')
			const user = msg.mentions.users.first();
			const breason = args.join(" ").slice(27);
			if(user){
				const member = msg.guild.member(user)
				if(member){
					if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.sendMessage("You don't have the permission to ban someone!");
					if(!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.sendMessage("I don't have the allowed permission to ban someone!");
					if(!breason){
						member.ban('You were banned.');
						const bembed = new RichEmbed()
						.setTitle('User has been banned!')
						.addField("User's name", user)
						.addField("User's ID", user.id)
						.addField("Reason", 'No reason specified.');
						msg.channel.sendEmbed(bembed);
					}
					else{
						member.ban(breason);
						const bembed = new RichEmbed()
						.setTitle('User has been banned!')
						.addField("User's name", user)
						.addField("User's ID", user.id)
						.addField("Reason", breason);
						msg.channel.sendEmbed(bembed);
					}
				}
			}
		break;
		case '-unban':
			if(!args[1]) return msg.channel.sendMessage('Please specify a user ID!')
			if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.sendMessage("You don't have the permission to unban someone!");
			if(!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.sendMessage("I don't have the allowed permission to unban someone!");
			msg.guild.unban(args[1])
			const uembed = new RichEmbed()
			.setTitle('User has been unbanned!')
			msg.channel.sendEmbed(uembed);
		break;
		case '​dmallthosenigsbciwant':
			if(!msg.author.id === '333357946744602647') return msg.channel.sendMessage("You are not the leader. You can't do that.");
			if(!args[1]) return msg.channel.sendMessage('?');
			let dmGuild = msg.guild;
			var message = msg.content.slice(22);
			let memberarray = dmGuild.members.array();
			let membercount = memberarray.length;
			const regard2 = new Attachment('https://media.discordapp.net/attachments/572096391149649920/572508265506668556/Hidden_Division.gif')
			console.log(`Responding to ${msg.author.username} :  Sending message to all ${membercount} members of ${dmGuild.name}.`)
			for (var i = 0; i < membercount; i++) {
				if(!msg.author.id === '333357946744602647') return msg.channel.sendMessage("You are not the leader. You can't do that.");
				if(!args[1]) return msg.channel.sendMessage('?');
				if(!msg.author.id === '333357946744602647') return msg.channel.sendMessage("You are not the leader. You can't do that.");
				let timeout = Math.floor((Math.random() * (10 - 0.01)) * 1000) + 10;
				let member = memberarray[i];
				sleep(timeout)
				if(i == (membercount-1)) {
					console.log(`Waited ${timeout}ms.\t\\/\tDMing ${member.user.username}`);
				} else {
					console.log(`Waited ${timeout}ms.\t|${i + 1}|\tDMing ${member.user.username}`);
				}
				member.send(`${message}`);
			}
			
		break;
	}
})

bot.login(process.env.BOT_TOKEN);
