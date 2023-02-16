import { S2C } from "./constants/Routes";

export class Utils {

  public static logMessage(message: any) {
    var ignore = [];

    var found = false;
    for (var i = 0; i < ignore.length; i++)
      if (ignore[i] == message.r)
        found = true;
    if (found) return;

    console.log("");
    console.log("=================================================================");
    console.log("Received Message: " + S2C[message.r]);
    console.log(message);
    console.log("=================================================================");
    console.log("");
  }

}