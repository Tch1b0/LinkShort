/**
 * Validate that a link is correct
 * @param link The link you want to validate
 * @returns Either your `link` if it's valid or `false` if it is not
 */
export function validateLink(link: string): string | boolean {
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

/**
 * Get a parameter from the body or form of a request
 * @param req The request object
 * @param key The key you want to get
 * @returns The value of the key
 */
export function getParamFromReq(req: any, key: string): any {
    var val = req.params[key];
    if (val === undefined) {
        val = req.body[key];
    }

    return val;
}

export function sendError(res: any, errorCode: number): void {
    var text: string;

    switch (errorCode) {
        case 400:
            text = "400 Bad Request - Some parameters were wrong or missing";
        case 401:
            text =
                "401 Unauthorized - You do not have the permissions to do this action";
        case 404:
            text = "404 Not Found - No content found";
        case 405:
            text =
                "405 Method not allowed - You can not access this ressource with this request method";
    }

    res.writeHead(errorCode, text);
    res.send();
}
