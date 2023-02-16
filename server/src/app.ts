import WebSocket, { Server } from "ws";
import { DatabaseManager } from "./managers/database/DatabaseManager";
import { RequestManager } from "./managers/requests/RequestManager";
import { User } from "./managers/user/User";
import { UserManager } from "./managers/user/UserManager";
import { Timer } from "./utils/Timer";

export class App {

	private server: Server;
	private timer: Timer;

	public db: DatabaseManager;
	public users: UserManager;
	public requests: RequestManager;

	constructor() {
		this.init();
		this.startServer();

		//this.timer = new Timer(this.update.bind(this));

		console.log("Server Ready...");
	}

	private init() {
		this.db = new DatabaseManager();
		this.users = new UserManager();
		this.requests = new RequestManager(this);
	}

	private startServer() {
		this.server = new Server({ host: "192.168.0.19", port: 5101 });

		this.server.on("connection", (ws: WebSocket, req) => {
			var newUser = new User(this, ws);
			this.users.add(newUser);
		});

		//process.on("SIGTERM", handleShutdown);
		//process.on("SIGINT", handleShutdown);
		//process.on("uncaughtException", this.onError);
		//process.on("unhandledRejection", this.onError);
	}

	private onError(error: {}) {
		console.log(error);
	}

	private update(deltaTime: number) {
	}

}

var app = new App();