import { iniciarBot } from './bot.js' 

async  function main() {
    try {
        console.log(" 🤖 Iniciando bot de cierres... ");
        await iniciarBot();
    }
    catch (error) {
        console.error(" Error critico del bot", error);
        process.exit(1);
    }
}

main();