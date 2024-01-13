export default class KnownError extends Error {
	public isKnownError = true;
	public statusCode: number;
	public shouldLog: boolean;

	constructor(message: string, statusCode: number, shouldLog = false) {
		super(message);
		this.statusCode = statusCode;
		this.shouldLog = shouldLog;
	}
}
