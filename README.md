# LinkShort
This is a Link Shortner made with the [express]("https://expressjs.com/de/") package in Javascript.

## How to use
You can create shortcuts on [The main page](https://ls.johannespour.de/site) of the Project or you can make requests like this:
### Create shortcut
Request:
```json
method = "GET",
url = "https://ls.johannespour.de/create",
data = {"link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
```
Response:
```json
{
    "short": "17a76043"
}
```

### Use shortcut
[https://ls.johannespour.de/17a76043](https://ls.johannespour.de/17a76043)