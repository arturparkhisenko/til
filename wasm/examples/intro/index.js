const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const mimeType = {
	'.ico': 'image/x-icon',
	'.html': 'text/html',
	'.xml': 'application/xml',
	'.css': 'text/css',
	'.js': 'text/javascript',
	'.json': 'application/json',
	'.md': 'text/markdown',
	'.pdf': 'application/pdf',
	// images
	'.png': 'image/png',
	'.gif': 'image/gif',
	'.svg': 'image/svg+xml',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	// fonts
	'.eot': 'application/vnd.ms-fontobject',
	'.ttf': 'application/octet-stream',
	'.woff': 'application/x-font-woff',
	'.woff2': 'application/x-font-woff',
  // wasm
	'.wasm': 'application/wasm',
};

http.createServer((req, res) => {

	const parsedUrl = url.parse(req.url);
	let pathName = `.${parsedUrl.pathname}`;

  console.log(parsedUrl.pathname);

	fs.exists(pathName, function (exist) {
    // if the file is not found, return 404
    if (!exist) {
      res.statusCode = 404;
      res.end(`pathName ${pathName} not found!`);
      return;
    }

    // read file from file system
    fs.readFile(pathName, function(err, data){
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // based on the URL path, extract the file extention
        const ext = path.parse(pathName).ext;
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
        res.end(data);
      }
    });
  });

}).listen(8080);
