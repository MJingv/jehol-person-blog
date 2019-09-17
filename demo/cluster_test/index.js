const http = require('http');
const numCPUs = require('os').cpus().length;
const cluster = require('cluster');

if (cluster.isMaster) {
	console.log(`the master process id is    ${process.pid}`);

	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on('exit', (worker, code, signal) => {
		console.log('worker process died,id', worker.process.pid);

	});
} else {
	//worker共享一个tcp连接
	http.createServer((req, res) => {
		res.writeHead(200);
		res.end('hello world');
	}).listen(8000, () => {
		console.log('listen at 8000');
	});

}
