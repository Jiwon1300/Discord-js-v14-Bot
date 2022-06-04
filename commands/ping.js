const {ApplicationCommandOptionType, CommandInteraction} = require('discord.js')

module.exports = {
    name: 'ping',
    description: '퐁을 응답',
    options: [
        {
            name: 'text',
            description: '입력한 옵션을 그대로 출력합니다',
            type: ApplicationCommandOptionType.String, // 옵션의 유형,
            require: true // 필수로 작성하여야 하는지 여부
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    execute:async(interaction)=>{
        interaction.reply({content:interaction.options.getString("text")})
    }
}
