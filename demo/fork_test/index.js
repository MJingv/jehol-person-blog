const http = require('http');
const fork = require('child_process').fork;

const server = http.createServer((req, res) => {
	if (req.url == '/compute') {
		const compute = fork('./fork_process.js');
		compute.send('一个新的子进程');
		// 当一个子进程使用 process.send() 发送消息时会触发 'message' 事件
		process.on('message', sum => {
			res.end(`sum is ${sum}`);
			compute.kill();
		});
		process.on('close', (code, signal) => {
			console.log(`收到close事件，子进程${signal}终止，退出码${code}`);
			compute.kill();
		});
	} else {
		res.end('hello world');
	}
});

server.listen(3020, '127.0.0.1', () => {
	console.log(`http server start at 127.0.0.1:3020`);
});
