const fromInput = document.getElementById('from-currency');
const toInput = document.getElementById('to-currency');
const form = document.querySelector('form');
const result = document.getElementById('result');
const amountInput = document.getElementById('amount');


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

function convert() {
    return new Promise( (resolve, reject) => {
        const ajax = new XMLHttpRequest();

        if (fromInput.value !== toInput.value) {
            const param = new URLSearchParams();
            param.append('amount', amountInput.value);
            param.append('from', fromInput.value);
            param.append('to', toInput.value);
    
            ajax.open("GET", `${host}/latest?${param.toString()}`);
        } else {
            ajax.open("GET", `${host}/latest`);
        }

        ajax.onload = () => {
            if ( ajax.status === 200 && fromInput.value !== toInput.value)  {
                resolve(JSON.parse(ajax.responseText));
            } else if (fromInput.value === toInput.value) {
                const obj = {rates: {}};     
                obj.rates[fromInput.value] = amountInput.value;
                resolve(obj)
            } else {
                reject(`Error convert code ${ajax.status}`)
            }
        }

        ajax.send();
    } )
}

// Adding currencies to select option
const currencies = getCurrencies();

currencies
    .then( response => {
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
    .catch( error => {
        throw new Error(error);
    })


form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    convert()
        .then( response => {
            result.textContent = response.rates[toInput.value];
            amountInput.value = '';
        } )
        .catch( error => {throw new Error(error)} )


})
