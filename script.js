function validation(form) {
    var elemLogin;
    var elemPass;
    var regExp;
    var regExpPass;

    form = document.forms.simpleForm;
    elemLogin = form.elements.login.value;
    elemPass = form.elements.password.value;
    regExp = new RegExp('^[A-Z0-9]{2,15}$', 'gi');
    regExp = regExp.test(elemLogin);
    regExpPass = new RegExp('^[A-Z0-9#$]{6,15}$', 'gi');
    regExpPass = regExpPass.test(elemPass);

    if (regExp === true && regExpPass === true) {
        console.log('Welcome');
        console.log(storages(elemLogin, elemPass));
    } else {
        event.preventDefault();
        console.log('Enter correct data!');
    }
};

function storages(elemLogin, elemPass) {
    var locValue;
    var locValuePass;

    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('login', elemLogin);
        locValue = localStorage.getItem('login');
        localStorage.setItem('password', elemPass);
        locValuePass = localStorage.getItem('password');
        return 'name: ' + locValue + ' password: ' + locValuePass;
    } else {
        var options = {
            expires: 10
        };
        setCookie(elemLogin, elemPass, options);
    }
};

function setCookie(name, value, options) {
    var expires;
    var updatedCookie;

    options = options || {};

    expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + (expires * 24 * 60 * 60 * 1000));
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    updatedCookie = name + "=" + value;

    for (var propName in options) {
        var propValue;
        updatedCookie += "; " + propName;
        propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

document.addEventListener("submit", validation, false);

