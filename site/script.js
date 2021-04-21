$(document).ready(() => {
    $("#generate").click(() => {
        let link = $("#link").val();
        $.get("create", {"link": link}, (data) => {
            let url = data["short"]
            if (url == null){
                $("#res").html('<span style="color: red">Please enter a valid link</span>');
                $("#res-link").html("");
            }else {
                $("#res").text(`Your short is: ${url}`);
                $("#res-link").html(`<a href="https://ls.johannespour.de/${url}">https://ls.johannespour.de/${url}</a>`)
            }
        });
    });
});