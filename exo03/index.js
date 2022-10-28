const fs = require('fs/promises');
const path = require('path');


const filePersonnage = path.resolve(__dirname, 'data', 'personnage.json');
const fileSavePersonnage = path.resolve(__dirname, 'data', 'result.json');

let count = 0;
fs.readFile(filePersonnage, { encoding: 'utf-8' })
    .then((valueText) => {
        const json = JSON.parse(valueText);
        console.log('Data JSON =>', json);

        const personnages = getPersonnages(json);
        console.log('Nombre de récursive : ' + count);
        console.log(personnages);

        savePersonnages(personnages);
    });

const savePersonnages = (personnages) => {
    const data = {
        nbPersonnage: personnages.length,
        personnages
    };
    const json = JSON.stringify(data, null, 4);

    fs.writeFile(fileSavePersonnage, json, { encoding: 'utf-8' })
        .then(() => {
            console.log('Saved !');
        })
        .catch((error) => {
            console.log(error);
        });
};

const getPersonnages = (data) => {
    count++;
    if (data.membre !== undefined) {
        const personnages = [];
        data.membre.forEach(element => {
            const internalPersonnages = getPersonnages(element);
            personnages.push(...internalPersonnages);
        });
        return personnages;
    }
    else {
        return [data];
    }
};