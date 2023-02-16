import { createPool, Pool } from "mysql";

export class DatabaseManager {

	private HOST = "localhost"
	private PORT = 3306;
	private USER = "root";
	private PASS = "";
	private DATABASE = "app_eldenring";

	private pool: Pool;

	constructor() {
		this.init();
	}

	public getPool() {
		return this.pool;
	}

	private init() {
		this.pool = createPool({
			connectionLimit: 10,
			host: this.HOST,
			port: this.PORT,
			user: this.USER,
			password: this.PASS,
			database: this.DATABASE
		});
	}

}