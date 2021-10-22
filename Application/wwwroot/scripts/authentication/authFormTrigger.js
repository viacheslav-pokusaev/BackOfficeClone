$(document).ready(function () {

    authFormTrigger = function () {
        if ($('#loginbox').css('display') == 'none') {
            $('#signupbox').hide(); $('#loginbox').show();
        }
        else {
            $('#loginbox').hide(); $('#signupbox').show();
        }       
    }
});