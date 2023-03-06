import * as $ from "jquery";
import { Constants } from "../constants/Constants";

export class MarkerData {

  public markers: MD_Marker[] = [];

  public load(callback: CallableFunction) {
    $.getJSON(Constants.PATH_TO_SHARED + "markers.json", (json: any) => {
      var nodes = json.markers;
      for (var i = 0; i < nodes.length; i++)
        this.markers.push(new MD_Marker(nodes[i]));
      callback();
    });
  }

  public getById(id: number) {
    for (var i = 0; i < this.markers.length; i++)
      if (this.markers[i].id == id)
        return this.markers[i];
    return null;
  }

}

export class MD_Marker {

  public id: number;
  public name: string;
  public x: number;
  public y: number;
  public bosses: number[];

  constructor(json: any) {
    this.id = json.i;
    this.name = json.n;
    this.x = json.x;
    this.y = json.y;
    this.bosses = json.b;
  }

}