const {
	isMainThread,
	parentPort,
	workerData,
	threadId,
	MessageChannel,
	MessagePort,
	Worker
} = require('worker_threads');
const mainThread = () => {
	console.log('main----');
};
const workerThread = () => {
	console.log('worker----');
};

if (isMainThread) {
	mainThread();
} else {
	workerThread();
}
