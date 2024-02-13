import 'dotenv/config';
import { http } from '../plugins/http-plugin';

export class Comandos {

    registrar (name: string, description: string) {
        const url = `https://discord.com/api/applications/${process.env.APP_ID}/commands`;

        const headers = {
            "Authorization": `Bot ${process.env.DISCORD_TOKEN}`,
            "Content-type" : "application/json"
        }
        const body = { name, description };

        http.post(url, body, headers);
    }

    listar () {
        const url = `https://discord.com/api/applications/${process.env.APP_ID}/commands`;
        const headers = {
            "Authorization": `Bot ${process.env.DISCORD_TOKEN}`
        }

        return http.get(url, headers);
        
    }
}