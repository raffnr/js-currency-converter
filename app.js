const fromInput = document.getElementById('from-currency');
const toInput = document.getElementById('to-currency');
const form = document.querySelector('form');
const result = document.getElementById('result');

console.log(fromInput);

// API Host
const host = 'https://api.frankfurter.app';

function getCurrencies() {
    return new Promise((resolve, reject) => {
        const ajax = new XMLHttpRequest();
        ajax.open("GET", `${host}/currencies`);
        ajax.onload = () => {
            if ( ajax.status === 200 ) {
                resolve(JSON.parse(ajax.responseText));
            } else {
                reject(`get product code ${ajax.status}`);
            }
        }

        ajax.send();
    })
}


const currencies = getCurrencies();

currencies
    .then((response) => {
        for (let key in response) {
            const option = document.createElement('option');
            option.setAttribute('value', key);
            option.textContent = `${key} - ${response[key]}`;

            fromInput.append(option);
        }

        for (let key in response) {
            const option = document.createElement('option');
            option.setAttribute('value', key);
            option.textContent = `${key} - ${response[key]}`;

            toInput.append(option);
        }
    } )
    .catch( (error) => {
        throw new Error(error);
    })


    
form.addEventListener('submit', (e) => {
    e.preventDefault();
    result.textContent = fromInput.value;

})
// console.log(result);