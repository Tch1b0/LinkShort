# LinkShort
This is a Link Shortner made with the [express]("https://expressjs.com/de/") package in Javascript.

## How to use
You can create shortcuts on [The main page](https://ls.johannespour.de/site) of the Project or you can use the API on your own like this:
### Create shortcut
Make a `POST` request to `https://ls.johannespour.de/create` with the parameter `link` as the key and the link you want to short as a value.<br>
```json
method: "POST"
url: "https://ls.johannespour.de/create"
data: {"link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
```
Example request with [cURL](https://de.wikipedia.org/wiki/CURL):
```bash
curl -X POST -d "link=https://www.youtube.com/watch?v=dQw4w9WgXcQ" https://ls.johannespour.de/create
```
Response:
```json
{
    "short": "17a76043"
}
```

### Use shortcut
[https://ls.johannespour.de/17a76043](https://ls.johannespour.de/17a76043)

## Host on your own
```sh
$ git clone https://github.com/Tch1b0/LinkShort

$ cd ./Linkshort/

$ docker-compose build

$ docker-compose up -d
```
The service is now running on port `5002`.