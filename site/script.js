$(document).ready(() => {
    let searchParams = new URLSearchParams(window.location.search)
    if(searchParams.has("info")) {
        let repo = "https://github.com/tch1b0/LinkShort";
        $("#info").html("Hey, it looks like you tried to use the /create route with a GET request."+
        `<br>You can learn more about how the API works here: <a href="${repo}">${repo}</a>`)
    }
    $("#generate").click(() => {
        let link = $("#link").val();
        $.post("create", {"link": link}, (data) => {
            let url = data["short"];
            if (url == null){
                $("#res").html('<span style="color: red">Please enter a valid link</span>');
                $("#res-link").html("");
            }else {
                $("#res").text(`Your short is: ${url}`);
                $("#res-link").html(`<a href="https://ls.johannespour.de/${url}">https://ls.johannespour.de/${url}</a>`);
            }
        });
    });
});