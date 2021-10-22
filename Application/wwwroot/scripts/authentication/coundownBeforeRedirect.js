$(document).ready(function () {
    let seconds = 5;
    let elCoundown = $("#countdown");
    countdown = function () {
        if (elCoundown) {
            if (seconds < 0) {
                window.location = $('#loginRefference').val();
            } else {
                elCoundown.html(seconds);
                window.setTimeout("countdown()", 1000);
            }
            seconds = seconds - 1;
        }
    }

    countdown();
});