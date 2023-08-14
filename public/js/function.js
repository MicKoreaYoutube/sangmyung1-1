export function displayError(msg) {
    if (typeof window !== "undefined") {
        document.querySelector('#errorMessage').innerHTML = msg;
        document.querySelector('#error').classList.replace('hidden', 'inline-block')
        setTimeout(function () {
            document.querySelector('#error').classList.replace('inline-block', 'hidden')
        }, 3000);
    }
}

export function logined() {
    alert('이미 로그인 하셨습니다.')
    history.go(-1)
}

export function logouted() {
    alert('로그인을 하셔야 접속 하실 수 있습니다.')
    history.go(-1)
}