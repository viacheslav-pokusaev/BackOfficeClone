$(document).ready(function () {

    let loginCaptcha = $('#loginCaptcha');
    let regCaptcha = $('#regCaptcha');

    refreshCaptcha = function () {
        $.ajax({
            url: '/Account/CaptchaImage',            
            success: function (result) {
                loginCaptcha.css("background-image", result);
                regCaptcha.css("background-image", result);
            },
        });
    }

    refreshCaptcha();

});