'use strict';

$(document).ready(function () {
    
    $('.wareImageContainer').click(function (event) {
        
        window.location = "/Shop/GetOneWare?id=" + $(this).data("id");
    })
});