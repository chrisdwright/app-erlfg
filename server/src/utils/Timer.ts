export class Timer {

	private callback: CallableFunction;
	private interval: number;
	private lastTime: number;

	constructor(callback: CallableFunction) {
		this.callback = callback;
		this.interval = 1000;
		this.lastTime = Date.now();

		this.tick();
	}

	tick() {
		var currentTime = Date.now();
		var deltaTime = currentTime - this.lastTime;
		this.callback(deltaTime);

		this.lastTime = currentTime;
		setTimeout(this.tick.bind(this), this.interval);
	}

}