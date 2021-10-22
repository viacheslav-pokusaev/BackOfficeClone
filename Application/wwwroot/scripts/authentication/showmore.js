$(document).ready(function () {
    $("#additional-filds").hide();
        $("#show-more").click(function (e) {
            e.preventDefault();
            $("#additional-filds").show();
        });
})