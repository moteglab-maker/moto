const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Бот активний!'));
app.listen(8080);

const botArgs = {
    host: 'SlepTime.aternos.me',
    port: 15037,
    username: 'MrBeast', // Можете змінити на будь-яке ім'я
    version: '1.20.1'
};

function createBot() {
    const bot = mineflayer.createBot(botArgs);

    bot.on('login', () => console.log('Бот зайшов на сервер!'));

    bot.on('spawn', () => {
        console.log('Бот у світі. Починаю стрибати...');
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 60000); // Стрибати раз на хвилину для AFK
    });

    bot.on('end', () => {
        console.log('Виліт із сервера. Перепідключення через 30 сек...');
        setTimeout(createBot, 30000);
    });

    bot.on('error', (err) => console.log('Помилка:', err.message));
}

createBot();
