# DIY Clicker

## Libraries Used

<details>
<summary>
<a href="https://icecreamyou.github.io/MainLoop.js/docs/#!/api/MainLoop">Mainloop.js</a>
</summary>
Mainloops helps building real-time simulated environments in JavaScript. The lib is copied in js/mainloop.js for your convenience, no installation required.
</details>

<details>
<summary>
<a href="https://getbootstrap.com/docs/5.0/getting-started/introduction/">Bootstrap 5</a>
</summary>
Bootstrap is amongst the most popular CSS frameworks and provide a lot of ready-to-use components to build responsive user interfaces. It is loaded using a CDN for your convenience, no installation required.
</details>

## Start Here

This app uses [ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), therefore you need a server to start it. I suggest your use **one of these** HTTP servers for your local development:

- [NPM http-server](https://www.npmjs.com/package/http-server) (requires [Node.js](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/))
- [PHP builtin web server](https://www.php.net/manual/en/features.commandline.webserver.php) (requires [PHP](https://www.php.net/))
- [Python 3 HTTP Server](https://docs.python.org/3/library/http.server.html) (requires [Python 3](https://www.python.org/))

Command line usage:

```bash
# -------------------------------------------------------------------
# NPM http-server

npm install --global http-server  # installation (run this once)
http-server                       # start the server (CTRL+C to stop)

# -------------------------------------------------------------------
# PHP

sudo apt install -y php8.1        # installation for Linux (run this once)
php -S localhost:8080             # start the server (CTRL+C to stop)

# -------------------------------------------------------------------
# Python3

sudo apt install -y python3       # installation for Linux (run this once)
python3 -m http.server            # start the server (CTRL+C to stop)
```

For installation on Windows environments, I suggest you look at those platform websites.

