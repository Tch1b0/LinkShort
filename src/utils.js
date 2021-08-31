function validateLink(link) {
    // Does the Link really look like a valid link?

    // Does the Link already start with "http://" or "https://"?
    // If not then append it
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
        link = `http://${link}`;
    }

    let re =
        /^https?:\/\/(([a-z0-9]){0,}\.)?([a-z0-9]){2,63}\.[a-z]{2,}(\/[\s\S]{0,}?){0,}$/gi;

    // Is the link recognized as a Link?
    // If not then return false
    return re.exec(link) != null ? link : false;
}

function invalidParameter(obj, res) {
    if (obj == undefined) {
        res.writeHead(400);
        res.send();
        return true;
    } else {
        return false;
    }
}

module.exports = { validateLink, invalidParameter };
