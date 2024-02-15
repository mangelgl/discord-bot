import 'dotenv/config';
import express, { Request, Response } from 'express';
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from 'discord-interactions';
import { VerifyDiscordRequest, getCurrentDate, getRandomEmoji } from './utils/utils';




export class Server {

    private server;
    private PORT: number = Number(process.env.PORT) || 3000;

    constructor(  ) {
        this.server = express();
        
        this.verificaPeticionesEntrantes();
        this.setEndpoints();
        this.listen();
    }    
    

    listen () {
        this.server.listen(this.PORT, () => {
            console.log('Listening on port', this.PORT);
        });
    }

    private verificaPeticionesEntrantes () {
        // Analiza el cuerpo de la petición y verifica las peticiones entrantes usando el paquete discord-interactions
        this.server.use(
            express.json(
                { verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }
            )
        );
    }

    private logIncomingRequests ( req: Request, res: Response ) {
        
        console.log( `${req.method} ${res.statusCode}\t ${req.url}` );                
    }

    private setEndpoints () {
        
        this.server.get('/', (req: Request, res: Response): void => {
            this.logIncomingRequests( req, res );
            res.send('Hello World!'); 
        });

        this.server.get('/saludo', (req: Request, res: Response): void => {
            this.logIncomingRequests( req, res );
            res.send('Hola mi buen amigo!');
        });
  
        /**
         * ! /interactions
         * Endpoint donde el cliente (Discord) enviará peticiones HTTP
         */
        this.server.post('/interactions', async function (req, res) {
            // Interaction type and data
            const { type, id, data } = req.body;
        
            if (type === InteractionType.PING) return res.send({ type: InteractionResponseType.PONG });            
        
            /**
             * Gestiona las peticiones de slash commands (comandos de /)
             * Véase https://discord.com/developers/docs/interactions/application-commands#slash-commands
             */
            if (type === InteractionType.APPLICATION_COMMAND) {
                const { name } = data;
            
                /**
                 * ! debug
                 */
                if (name === 'challenge' && id) {
                    return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: { type, id, data },
                    }
                    });
                }
            
                /**
                 * ! test
                 * Envía el típico mensaje 'hello world' + un emoji aleatorio
                 */
                if (name === 'test') {      
                    return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: 'hello world ' + getRandomEmoji(),
                    },
                    });
                }
            
                /**
                 * ! saludo
                 * Envía un mensaje con un saludo
                 */
                if (name === 'saludo') {
                    return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: 'hello, im a bot and im here to help you',
                    }
                    });
                }
            
                /**
                 * ! date
                 * Envía la fecha actual
                 */
                if (name === 'date') {      
                    return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: getCurrentDate()
                    }
                    });
                }
            
                /**
                 * ! rock-paper-scissors
                 * Envía un juego de piedra, papel o tijera
                 */
                /* if (name === 'challenge') {
                    return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: ''
                    }
                    });
                } */
            }
        });
    }
}