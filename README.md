# FreeCodeCamp API Project: URL Shortener


## User stories:
- I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
- When I visit that shortened URL, it will redirect me to my original link.


## Example creation usage:
```
https://url-shortener-mhjo.glitch.me/new/https://www.google.com
```

## Example creation output
```
{
  "original_url":"https://www.google.com",
  "short_url":"https://url-shortener-mhjo.glitch.me/1"
}
```

## Usage:
```
https://url-shortener-mhjo.glitch.me/1
```

## Will redirect to:
```
https://www.google.com/
```
