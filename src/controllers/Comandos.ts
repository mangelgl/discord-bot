import 'dotenv/config';
import { http } from '../plugins/http-plugin';

export class Comandos {

    static registrar (name: string, description: string) {
        const url = `https://discord.com/api/applications/${process.env.APP_ID}/commands`;

        const headers = {
            "Authorization": `Bot ${process.env.BOT_TOKEN}`,
            "Content-type" : "application/json"
        }
        const body = { name, description, type: 1 };

        http.post(url, body, headers);
    }

    static listar () {
        const url = `https://discord.com/api/applications/${process.env.APP_ID}/commands`;
        const headers = {
            "Authorization": `Bot ${process.env.BOT_TOKEN}`
        }

        return http.get(url, headers);
        
    }
}