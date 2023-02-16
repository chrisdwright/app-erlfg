import { C2S } from "../constants/Routes";

export class Utils {

	public static randomIndex(arrayLength: number) {
		return Math.floor(Math.random() * arrayLength);
	}

	// inclusive
	public static randomInt(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	public static removeDuplicates(arr: any) {
		return arr.filter((value: number, index: number) => arr.indexOf(value) === index);
	}

	public static shuffleArray(array: any[]) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}

	public static getTimestamp() {
		var shortener = 1606779023;
		return Math.floor(Date.now() / 1000) - shortener;
	}

	public static logMessage(id: string, message: any) {
		var ignore: any[] = []; //["h.mp"];

		var found = false;
		for (var i = 0; i < ignore.length; i++)
			if (ignore[i] == message.r)
				found = true;
		if (found) return;

		console.log("(" + id + ") Received Message: " + C2S[message.r]);
	}


}