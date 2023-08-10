export function displayError(method, msg) {
    if (method == "sangmyung") {
        document.querySelector('#error').innerHTML = msg;
        document.querySelector('#error').classList.replace('hidden', 'inline-block')
        setTimeout(function () {
            document.querySelector('#error').classList.replace('inline-block', 'hidden')
        }, 3000);
    }
}