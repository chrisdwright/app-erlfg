import * as $ from "jquery";
import { Constants } from "../constants/Constants";

export class BossData {

  private bosses: BD_Boss[] = [];

  public load(callback: CallableFunction) {
    $.getJSON(Constants.PATH_TO_SHARED + "bosses.json", (json: any) => {
      var nodes = json.bosses;
      for (var i = 0; i < nodes.length; i++)
        this.bosses.push(new BD_Boss(nodes[i]));
      callback();
    });
  }

  public getById(id: number) {
    for (var i = 0; i < this.bosses.length; i++)
      if (this.bosses[i].id == id)
        return this.bosses[i];
    return null;
  }

}

export class BD_Boss {

  public id: number;
  public name: string;

  constructor(json: any) {
    this.id = json.i;
    this.name = json.n;
  }

}