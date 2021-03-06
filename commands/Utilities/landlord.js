const { Command } = require('discord-akairo');
// const chalk = require('chalk');
const Discord = require('discord.js')
const puppeteer = require('puppeteer')
const mongoose = require("mongoose")
const User = require("../../schemas/UserSchema")
var uniqueValidator = require('mongoose-unique-validator');





class StatsCommand extends Command {
    constructor() {
        super('landlord', {
            aliases: ['landlord'],
            channel: 'guild',
            category: 'Utilities',
            description: {
                content: 'Gives the landlord role upon verification'
            }
        });
    }

    async exec(message) {
        if (!message.member.roles.cache.some(role => role.id === '929780185040027728')) {



            if (message.channel.type != 'dm') {

                const embed = new Discord.MessageEmbed()
                    .setTitle("To get Landlord Role")
                    .setAuthor(message.author.username, message.author.displayAvatarURL(), "")
                    .setColor("0xdbc72b")
                    .setDescription("If you want to get <@&929780185040027728>, you need to hold at least 1 Land in Dine Together.")
                    .addField("The benefits:", ":white_check_mark:   The exclusive benefits of landlords \n :white_check_mark:   Access the channel for Landlord \n :white_check_mark:   Participate in events for Landlord \n :white_check_mark:   In-game mechanisms for landlords will be added gradually")
                    .addField("\u200B", "Now, after reading the rules and benefits carefully")
                    .addField("please check your direct message and reply to me with your wallet address!", "\u200B")
                    .setThumbnail("https://i.imgur.com/1rRdaKY.png")
                    .setFooter("For help contact the mods.", "https://i.imgur.com/pif0c21.png")
                    .setTimestamp()
                message.channel.send({ embed })
            }
            const embed = new Discord.MessageEmbed()
                .setTitle("To get Landlord Role")
                .setAuthor(message.author.username, message.author.displayAvatarURL(), "")
                .setColor("0xdbc72b")
                .setDescription("If you want to get Landlord role, you need to hold at least 1 Land in Dine Together.")
                .addField("The benefits:", ":white_check_mark:   The exclusive benefits of landlords \n :white_check_mark:   Access the channel for Landlord \n :white_check_mark:   Participate in events for Landlord \n :white_check_mark:   In-game mechanisms for landlords will be added gradually")
                .addField("PLEASE ENTER YOUR WALLET ADDRESS BELOW WITHOUT WHITESPACES", "\u200B")
                .setThumbnail("https://i.imgur.com/1rRdaKY.png")
                .setFooter("For help contact the mods.", "https://i.imgur.com/pif0c21.png")
                .setTimestamp()
            let appChannel = (await message.author.send({ embed })).channel

            let filter = m => m.author.id === message.author.id

            // await appChannel.send('How old are you?');
            await appChannel.awaitMessages(filter, { max: 1, time: 90 * 1000, errors: ['time'] }).then(async collected => {
                const ans = (collected.map(answers => answers.content).join());
                // if(ans.substring(0,2)!=="0x"){
                //     message.reply("Please enter a valid wallet address like: ``0x............`` and try running the command in the server again.")
                // }
                if (typeof ans === 'string') {
                    console.log('Variable is a string');
                }
                else {
                    console.log('Variable is not a string');
                }

                const embed = new Discord.MessageEmbed()
                    .setTitle("This is the wallet address you entererd:")
                    .setAuthor(message.author.username, message.author.displayAvatarURL(), "")
                    .setColor("0xdbc72b")
                    .setDescription("``" + ans + "``")
                    .addField("Please wait for a little while, I'm determining your land ownership.", "\u200B")
                    .setThumbnail('https://i.imgur.com/aIA3pcj.png')
                    .setFooter("For help contact the mods.", "https://i.imgur.com/pif0c21.png")
                    .setTimestamp()

                // await appChannel.send(`Your wallet address is : ` + "``" + `${ans}` + "``");
                await appChannel.send({ embed });
                function timeout(ms) {
                    return new Promise((resolve) => setTimeout(resolve, ms));
                }

                const browser = await puppeteer.launch({
                    headless: true,
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox']
                })
                const page = await browser.newPage();
                await page.setDefaultNavigationTimeout(0);
                await page.goto(`https://scan.factorychain.io/address/${ans.trim()}/tokens`);
                await timeout(7000);
                // await page.waitForSelector('#__layout > section > main > div > section > div.card.tomo-card.tomo-card--token > div.tomo-card__body > div > div:nth-child(1) > table > tbody > tr:nth-child(2) > td.tomo-card-value')
                // let element = await page.$('#__layout > section > main > div > section > div.card.tomo-card.tomo-card--token > div.tomo-card__body > div > div:nth-child(1) > table > tbody > tr:nth-child(2) > td.tomo-card-value')
                // let data = await page.evaluate(el => el.textContent, element)
                const found = await page.evaluate(() => window.find("LAND"));
                console.log(found)

                console.log(ans.substring(0, 2))
                if (ans.substring(0, 2) !== "0x") {
                    console.log("Invalid address format was entered:" + ans)
                    const embed = new Discord.MessageEmbed()
                        .setTitle("This is not a valid wallet addresss!")
                        .setAuthor(message.author.username, message.author.displayAvatarURL(), "")
                        .setColor("0xdbc72b")
                        .setDescription("Your wallet address might look like this ``0x361g56gfsgda8***************be0468b25372`` and start with '0x'")
                        .setThumbnail('https://i.imgur.com/vRBKSbf.png')
                        .setFooter("For help contact the mods.", "https://i.imgur.com/pif0c21.png")
                        .setTimestamp()
                        await browser.close()
                    return message.author.send({ embed })
                }

                if (!found) {
                    console.log("Could not find any lands with that address")
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Unfortunately We found that you do not hold any lands. Please try again if you think this is a mistake.")
                        .setAuthor(message.author.username, message.author.displayAvatarURL(), "")
                        .setColor("0xdbc72b")
                        .setDescription("If problem persists after three tries please contact mods for help.")
                        .setThumbnail('https://i.imgur.com/J615WSS.png')
                        .setFooter("For help contact the mods.", "https://i.imgur.com/pif0c21.png")
                        .setTimestamp()
                        await browser.close()
                    message.author.send({ embed })
                }
                else {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("Your wallet address is valid")
                        .setAuthor(message.author.username, message.author.displayAvatarURL(), "")
                        .setColor("0xdbc72b")
                        .setThumbnail('https://i.imgur.com/vuCL5Ep.png')
                        .setFooter("For help contact the mods.", "https://i.imgur.com/pif0c21.png")
                        .setTimestamp()
                    message.author.send({ embed })

                    try {
                        await User.create({
                            username: message.author.username,
                            discordId: message.author.id,
                            address: ans,
                        })
                    } catch (e) {
                        console.log(e)
                        if (e.keyPattern.address === 1) {
                            console.log("wallet address already exists")

                            const embed = new Discord.MessageEmbed()
                                .setTitle("Wallet address owner already exists. If you think this is a mistake please contact the mods.")
                                .setAuthor(message.author.username, message.author.displayAvatarURL(), "")
                                .setColor("0xdbc72b")
                                .setThumbnail('https://i.imgur.com/Xtcr2P7.png')
                                .setFooter("For help contact the mods.", "https://i.imgur.com/pif0c21.png")
                                .setTimestamp()
                                await browser.close()
                            return message.author.send({ embed })
                        }
                        else if (e.keyPattern.username === 1) {
                            console.log("Username already exists")
                            const embed = new Discord.MessageEmbed()
                                .setTitle("Wallet address owner already exists. If you think this is a mistake please contact the mods.")
                                .setAuthor(message.author.username, message.author.displayAvatarURL(), "")
                                .setColor("0xdbc72b")
                                .setThumbnail('https://i.imgur.com/Xtcr2P7.png')
                                .setFooter("For help contact the mods.", "https://i.imgur.com/pif0c21.png")
                                .setTimestamp()
                                await browser.close()
                            return message.author.send({ embed })
                        }
                    }

                    // let role = message.guild.roles.cache.find(r => r.id === "927553751567466536");

                    if (!message.member.roles.cache.some(role => role.id === '929780185040027728')) {
                        const embed = new Discord.MessageEmbed()
                            .setTitle("Congratulations, you have successfully recieved the Landlord role!")
                            .setAuthor(message.author.username, message.author.displayAvatarURL(), "")
                            .setColor("0xdbc72b")
                            .setThumbnail('https://i.imgur.com/oN7uYB7.png')
                            .setFooter("For help contact the mods.", "https://i.imgur.com/pif0c21.png")
                            .setTimestamp()
                        message.member.roles.add("929780185040027728")
                            .then(
                                message.author.send({ embed }),
                                console.log(`Succesfuly added role to member ${message.author.tag}`),
                            )
                            .catch(console.error)

                        await browser.close()

                        // const savedUser = await newUser.save();
                        // newUser.plugin(uniqueValidator, { message: 'user already exists!' });

                    }


                }
            }).catch(async (e) => {
                console.log(e)
                if(e instanceof TimeoutError){
                    const embed = new Discord.MessageEmbed()
                    .setTitle("Unfortunately, it looks like the bot has encountered some problems when determining your land ownership. This usually happens during peak hours, please try again later if it's possible, thanks for your precious time.")
                    .setAuthor(message.author.username, message.author.displayAvatarURL(), "")
                    .setColor("0xdbc72b")
                    .setThumbnail('https://i.imgur.com/KnpJt83.png')
                    .setFooter("For help contact the mods.", "https://i.imgur.com/pif0c21.png")
                    .setTimestamp()
                    message.author.send({embed})
                    await browser.close()
                }
                message.reply('No answer after 1 minute 30 seconds, operation canceled.');

                await browser.close()

            })

        }
        else {

            return message.channel.send(`<@${message.author.id}> You already have the role "Landlord" `).then(msg => {
                setTimeout(() => msg.delete(), 20000)
              })

        }

    }
}

module.exports = StatsCommand;


