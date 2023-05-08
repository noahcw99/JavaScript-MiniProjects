let calculation = localStorage.getItem('calculation') || '';

function updateCalculation(value) {
    if(value === '=') {
        if(eval(calculation)) {
            calculation = eval(calculation);
            document.querySelector('.number-display')
                .innerHTML = calculation;
            //console.log(calculation);
            localStorage.setItem('calculation', calculation);
        }
    } else if (value === 'clear') {
        calculation = '';
        document.querySelector('.number-display')
            .innerHTML = calculation;
        //console.log('Cleared.');
        localStorage.removeItem('calculation');
    } else {
        calculation += `${value}`;
        document.querySelector('.number-display')
            .innerHTML = calculation;
        localStorage.setItem('calculation', calculation);
        //console.log(calculation);
    }
}