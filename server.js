// Importar módulos
const http = require('http');
const fs = require('fs');

// Crear servidor
const server = http.createServer((req, res) => {

    // Cabeceras
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Servir HTML
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
        return;
    }

    // Manejo de preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Ruta login
    if (req.method === 'POST' && req.url === '/login') {

        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const data = JSON.parse(body);

            const usuario = data.usuario;
            const password = data.password;

            if (usuario === 'admin' && password === '1234') {
                res.end(JSON.stringify({
                    mensaje: 'Autenticación satisfactoria'
                }));
            } else {
                res.end(JSON.stringify({
                    error: 'Error en la autenticación'
                }));
            }
        });

    } else {
        res.end(JSON.stringify({
            mensaje: 'Ruta no encontrada'
        }));
    }
});

// Puerto
server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});