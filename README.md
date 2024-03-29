# LinkShort

![License Badge](https://img.shields.io/github/license/Tch1b0/LinkShort) ![Current Build](https://img.shields.io/github/actions/workflow/status/Tch1b0/LinkShort/test_api.yml?branch=master&label=ci)

This is a Link Shortner made with [express.js]("https://expressjs.com/de/") in Typescript.

## How to use

You can create shortcuts on [The main page](https://ls.johannespour.de/site) of the Project. <br>
[Click me](https://github.com/Tch1b0/LinkShort/wiki/Routes) to see a documentation of the `API`

## Host on your own

```sh
$ git clone https://github.com/Tch1b0/LinkShort

$ cd ./Linkshort/

$ echo "REDIS_PASSWORD=<Your Password>" >> .env

$ docker-compose build

$ docker-compose up -d
```

The service is now running on port `5002`.
