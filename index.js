import readline from 'readline';

const input = prompt =>
    new Promise(resolve => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(prompt, input => { rl.close(); resolve(input) })
    });

const doIt = function() {
    return Promise.resolve(Math.floor((Math.random() * 10) + 1))
        .then(value => {
            if(value % 2 === 0) {
                return input("Valeur ?")
                    .then(chaine => chaine !== '-')
                    .catch(() => false);
            }
            return Promise.resolve(true);
        })
        .then(isOk => {
            console.log(isOk ? 'Supprimer les fiches' : 'Cancel');
            return isOk ? doIt() : isOk;
        })
}

doIt()
    .catch(err => console.log(err));