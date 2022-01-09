const { Command } = require('discord-akairo');
const Discord = require('discord.js');
// const fetch = require('node-fetch');
const cheerio = require("cheerio");
const chalk = require('chalk');
// const request = require("request-promise");
const axios = require('axios');
const puppeteer = require('puppeteer')




class SeedCommand extends Command {
    constructor() {
        super('address', {
            aliases: ['address', 'a'],
            channel: 'guild',
            category: 'Utilities',
            description: {
                content: 'This provides the price of FPVU in $'
            },

        });
    }

    async exec(message) {

        // const question = ['Welcome to Landlord verification. If you want to recieve the "Landlord" role, Do the following: \n 1. Enter your token holding wallet address.', 'Enter your token ID']
        // let counter = 0
        const questions = [
            'The following is the address you entered'
        ]
        let counter = 0

        const filter = (m) => {
            return m.author.id === message.author.id
        }

        console.log(message.channel.type)
        const collector = new Discord.MessageCollector(message.channel, filter, {
            max: questions.length,
            time: 1000 * 15, // 15s
        })

        if (!message.member.roles.cache.some(role => role.id === '927565534684405760')) {

            // message.channel.send(questions[counter++])
            const embed = new Discord.MessageEmbed()
                .setTitle("To get Landlord Role")
                .setAuthor(message.author.username, message.author.displayAvatarURL(), "")
                .setColor("0xdbc72b")
                .setDescription("If you want to get <@&927565534684405760>, you need to hold at least 1 Land in Dine Together.")
                .addField("The benefits:", ":white_check_mark:   The exclusive benefits of landlords \n :white_check_mark:   Access the channel for Landlord \n :white_check_mark:   Participate in events for Landlord \n :white_check_mark:   In-game mechanisms for landlords will be added gradually")
                .addField("\u200B", "Now, after reading the rules and benefits carefully, please check your direct message and reply to me with your wallet address!")
                .setFooter("For help contact the mods.", "https://i.imgur.com/pif0c21.png")
                .setTimestamp()
            message.channel.send({ embed })
            collector.on('collect', (m) => {
                if (counter < questions.length) {
                    m.channel.send(questions[counter++])

                }
            })

            collector.on('end', (collected) => {
                console.log(`Collected ${collected.size} messages`)

                if (collected.size < questions.length) {
                    message.reply('You did not answer the questions in time')
                    return
                }

                let counter = 0
                collected.forEach(async (value) => {
                    console.log(questions[counter++], value.content)
                    message.channel.send(value.content)
                    const add = value.content
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    await page.goto(`https://scan.factorychain.io/#/tokens/0x1e8bc5dd400664b7bddbe36eadbf413db28c0649/frc721/${add.trim()}`, { waitUntil: 'networkidle2' });
                    await page.waitForSelector('#__layout > section > main > div > section > div.card.tomo-card.tomo-card--token > div.tomo-card__body > div > div:nth-child(1) > table > tbody > tr:nth-child(2) > td.tomo-card-value')
                    let element = await page.$('#__layout > section > main > div > section > div.card.tomo-card.tomo-card--token > div.tomo-card__body > div > div:nth-child(1) > table > tbody > tr:nth-child(2) > td.tomo-card-value')
                    let data = await page.evaluate(el => el.textContent, element)
                    console.log(data)

                    if (data === "0") {
                        message.channel.send("You are a not a valid token holder, Please try again if you think this is a mistake")
                    }
                    else {
                        message.channel.send("valid token holder!")
                        // let role = message.guild.roles.cache.find(r => r.id === "927553751567466536");
                        if (!message.member.roles.cache.some(role => role.id === '927565534684405760')) {
                            message.member.roles.add("927565534684405760")
                                .then(console.log(`Succesfuly added role to member ${message.author.tag}`))
                                .catch(console.error)
                        }

                    }

                })
            })
        }
        else {

            return message.channel.send(`<@${message.author.id}> You already have the role "Landlord" `)
        }

    }
}



module.exports = SeedCommand;

