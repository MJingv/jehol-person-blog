const computation = () => {
	let sum = 0;
	for (let i = 0; i < 1e10; i++) {
		sum += 1;
	}
	console.log('计算结束啦～～～');
	return sum;
};


process.on('message', msg => {
	console.log(msg, `process.pid  ---  ${process.pid}  process.ppid  ---  ${process.ppid}`);
	const sum = computation();
	console.log(`computation result is ${sum}`)
// 如果Node.js进程是通过进程间通信产生的，那么，process.send()方法可以用来给父进程发送消息
	process.send(sum);
});
