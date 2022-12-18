const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const surname = document.getElementById('surname');
form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')

}
const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const surnameValue = surname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if (usernameValue === '') {
        setError(username, 'Требуется имя пользователя');
    } else {
        setSuccess(username);
    }

    if (surnameValue === '') {
        setError(surname, 'Требуется фамилия пользователя');
    } else {
        setSuccess(surname);
    }

    if (emailValue === '') {
        setError(email, 'Требуется почта');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Укажите действительный адрес электронной почты');
    } else {
        setSuccess(email);
    }
    if (passwordValue === '') {
        setError(password, 'Требуется пароль');
    } else if (passwordValue.length < 8) {
        setError(password, 'Пароль должен быть длиннее восьми символов')
    } else {
        setSuccess(password);
    }

    if (password2Value === '') {
        setError(password2, 'Пожалуйста, проверьте пароль');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Пароли не совпадают");
    } else {
        setSuccess(password2);
    }

    let request = new XMLHttpRequest
    request.open('POST', './assets/server.php')
    request.setRequestHeader("Content-type", "application/json;charset=UTF-8")
    let data = {
        name: name
    }
    request.send(JSON.stringify(data))
    request.onreadystatechange = function() {
        if (request.readyState === 4)
            if (request.status === 200) {
                console.log(request.responseText)
            }
    }
    return false;
};