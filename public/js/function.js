export function displayError(msg) {
    document.querySelector('#errorMessage').innerHTML = msg;
    document.querySelector('#error').classList.replace('hidden', 'inline-block')
    setTimeout(function () {
        document.querySelector('#error').classList.replace('inline-block', 'hidden')
    }, 3000);
}