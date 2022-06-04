const { Client,GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client({intents:[GatewayIntentBits.Guilds]});
const { token } = require('./config.json');
const slashCommandArray = [];
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));

client.slashCommands = new Collection();

commandFiles.forEach(file=>{
    const command = require(`./commands/${file}`);
    client.slashCommands.set(command.name,command);
    slashCommandArray.push(command);
})

client.on('ready',async ()=>{
    await client.guilds.cache.get('784658701394509876').commands.set(slashCommandArray); // 길드에 커맨드를 설정
    console.log(`${client.user.tag} 준비완료`)
});

client.on('interactionCreate',async (interaction)=>{
    if(!interaction.isChatInputCommand) return; // 상호작용의 유형이 커맨드가 아니면 반환
    
    const command = client.slashCommands.get(interaction.commandName);
    if(!command) return; // 등록되지 않은 명령어일 경우 반환
    
    try{
        command.execute(interaction)
    }catch(error) {
        console.log(error)
    }


});


client.login(token);