//redirecting request 

const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;
    if (url === '/') {  
        res.write('<html>');
        res.write('<head><title>Ente message</title></head>');
        res.write('<body><form action="/message"  method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url ==='/message' && method === 'POST') {
        fs.writeFileSync('message.txt', 'DUMMY');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    res.write('<html>');
    res.write('<head><title></title></head>');
    res.write('<body><h1>Hello from node.js server!</h1></body>')
    res.write('</html>');
    res.end();
});

server.listen(3000);