const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

let mobileno;
let messagecontent;
app.post("/api", (req, res) => {
  	const { phone, msg } = req.body;
  	mobileno = phone;
	messagecontent = msg;
	console.log(mobileno);
	console.log(messagecontent);


	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({ Status: true , Message: 'Success'}));
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client, MessageMedia } = require('whatsapp-web.js');

//path where the session data will be stored
//const SESSION_FILE_PATH = "./session.json";

//Load the session data if it has been previously saved
/*
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)){
	sessionData = require(SESSION_FILE_PATH);
}*/

//use the saved session
const client = new Client({
	//authStrategy: new LocalAuth(),
    puppeteer: { headless: false }
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    //console.log('QR RECEIVED', qr);
    //session:sessionData,
    qrcode.generate(qr, {small: true});
});

/*
client.on('ready', () => {
    console.log('Client is ready!');
    client.getChats().then(chats => {
    	console.log(chats[0]);
    })
});*/

client.on("ready", () => {
  console.log("Client is ready!");
 
  /*client.getChats().then((chats) => {
    
    	console.log(chats[0]);
    
  });*/
  const chatId = mobileno+"@c.us";//"918861460918@c.us";
  //client.sendMessage("918861460918@c.us", "Hi, This is a Automated text with pdf attachment");
  client.sendMessage(chatId, "Hi, This is a Automated text with pdf attachment");
  
  let filename = "./test.pdf";
  const media = MessageMedia.fromFilePath(filename);
  client.sendMessage(chatId, media);

});

/*
client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});*/

client.on('message', message => {

	//if(message.body === '!ping') {
		//client.sendMessage(message.from, 'pong');
		client.sendMessage("918861460918@c.us", "Hi, This is a Automated text with pdf attachment");

    	const chatId = "918861460918@c.us";

    	let filename = "./test.pdf";

    	const media = MessageMedia.fromFilePath(filename);
    	client.sendMessage(chatId, media);
    	res.end(JSON.stringify({ Status: true , Message: 'Success'}));
		//const attachmentPdf = MessageMedia.fromFilePath("test.pdf");
        //client.sendMessage("918861460918@c.us", attachmentPdf);
	//}
});


/*
client.on('authenticated', (session) => {
		sessionData = session;
		fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err)=>{
			if(err){
				console.error(err);
			}
		})
});
*/
client.initialize();
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});