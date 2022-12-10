const config = require("config");
const express = require('express');
const cors = require('cors');
const {Client} = require('@notionhq/client');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

const app = express();
app.use(cors());

const PORT = 4000;
const HOST = "localhost";

const notion = new Client({auth: config.get("notionConfig.key")})
const database_id = config.get("notionConfig.databaseId");

app.post('/submitFormToNotion', jsonParser, async (req,res) => {
    
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const extraInfo = req.body.extraInfo;
    try {
        const resposne = await notion.pages.create({
            parent: {database_id: database_id},
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: name
                            }
                        }
                    ]
                },
                "Phone Number": {
                    rich_text: [
                        {
                            text: {
                                content: phoneNumber
                            }
                        }
                    ]
                },
                "Extra Information": {
                    rich_text: [
                        {
                            text: {
                                content: extraInfo
                            }
                        }
                    ]
                }
            }
        })
        console.log('Response: ');
        console.log(resposne);
    } catch(err) {
        console.log('Error: ');
        console.log(err);
    }
    
})

app.listen(PORT, HOST, () => {
    console.log("Starting proxy at " + HOST + " : " + PORT);
})