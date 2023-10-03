function battle(pokemonName) {
    fetch('/battle', {
        method: 'POST',
        body: JSON.stringify({name: pokemonName}),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = 'Result: ' + data.result;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
    
