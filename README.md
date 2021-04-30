# Scraper for prices on: Steam-market / skinport.com / skinbaron.com

Currently working on HTTP-Version, only Steam-market data available

[Current data sets can be found here](https://github.com/lgoebert/webScraping/tree/main/byHttp/plotting/files)


Currently, there are four columns:

```csv
"date","lowest_price","median_price","volume"
```
Start using:
```
nohup node index.js > ~/logs/scraper.txt &
```
### byHttp TODO:

- Application

  1. Get twitter posts by CSGO-Account

  - Filter Keywords (e.g. "Operation")

    - Rate importace (e.g. Operation -> + 8pts.)
    - Corellation between twitter post and prices
    - Delay between posts and price changes

  - Get Update size (e.g. from csgodatabase)

  4. Automatically switch VPN / IP when too many requests

  - check response header for such message
  - Write bash script to automatically fill username / password promt in terminal

- Website
  1. Handle user-inputs
  2. Enable searching for Skins
