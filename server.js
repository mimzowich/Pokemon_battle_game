const express = require('express');
const app = express();
const PORT = 3000;

function determineWinner(pokemon1, pokemon2) {
    const advantages = {
        Charmander: 'Bulbasaur',
        Bulbasaur: 'Squirtle',
        Squirtle: 'Charmander',
        Hitmonchan: 'Snorlax',
        Snorlax: 'Haunter',
        Haunter: 'Hitmonchan'
    };

    if (pokemon1 === pokemon2) {
        return 'It\'s a draw!';
    } else if (
        (['Charmander', 'Squirtle', 'Bulbasaur'].includes(pokemon1) && ['Hitmonchan', 'Snorlax', 'Haunter'].includes(pokemon2)) ||
        (['Hitmonchan', 'Snorlax', 'Haunter'].includes(pokemon1) && ['Charmander', 'Squirtle', 'Bulbasaur'].includes(pokemon2))
    ) {
        const randomWinner = Math.random() < 0.5 ? pokemon1 : pokemon2;
        return `The winner is: ${randomWinner}`;
    }
    return `The winner is: ${advantages[pokemon1] === pokemon2 ? pokemon1 : pokemon2}`;
}

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/battle', (req, res) => {
    const { pokemon1, pokemon2 } = req.query;

    if (!pokemon1 || !pokemon2) {
        return res.send('Both pokemon1 and pokemon2 are required query parameters.');
    }

    const winner = determineWinner(pokemon1, pokemon2);
    res.send(winner);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
