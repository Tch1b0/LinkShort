function create(){
    let link = $("#link").val();
    let name = $("#name").val();
    $.post("create", {"link": link, "short": name}, (data) => {
        let url = data["short"];
        let token = data["token"];
        if (url == null){
            $("#res").html('<span style="color: red">Please enter a valid link</span>');
            $("#res-link").html("");
        }else {
            $("#res").html(`Your short is: <b>${url}</b>`);
            $("#res-link").html(`<a href="https://ls.johannespour.de/${url}">https://ls.johannespour.de/${url}</a>`);
            $("#res-token").html(`Your token is: <b>${token}</b>`);
            $("#token-info").text("You can use your token to edit/delete your shortcut. So you should save it if you want to be able to do these things.")
        }
    });
}

$(document).ready(() => {
    let searchParams = new URLSearchParams(window.location.search)
    if(searchParams.has("info")) {
        let repo = "https://github.com/tch1b0/LinkShort";
        $("#info").html("Hey, it looks like you tried to use the /create route with a GET request."+
        `<br>You can learn more about how the API works here: <a href="${repo}">${repo}</a>`)
    }
    $("#generate").click(() => {
        create();
    });
});