import * as L from "leaflet";

export class Icons {

  private icons: Icon[] = [];

  constructor() {
    this.icons.push(new Icon("idle", [50, 50], [25, 25], [-3, -76]));
    this.icons.push(new Icon("pve", [50, 50], [25, 25], [-3, -76]));
    this.icons.push(new Icon("pvp", [50, 50], [25, 25], [-3, -76]));
    this.icons.push(new Icon("pvpve", [50, 50], [25, 25], [-3, -76]));
  }

  public get(numOfPvE: number, numOfPvP: number) {
    if (numOfPvE == 0 && numOfPvP == 0)
      return this.getById("idle").asset;
    else if (numOfPvE > 0 && numOfPvP == 0)
      return this.getById("pve").asset;
    else if (numOfPvE == 0 && numOfPvP > 0)
      return this.getById("pvp").asset;
    else if (numOfPvE > 0 && numOfPvP > 0)
      return this.getById("pvpve").asset;
  }

  private getById(id: string) {
    for (var i = 0; i < this.icons.length; i++)
      if (this.icons[i].id == id)
        return this.icons[i];
    return null;
  }

}

export class Icon {

  public id: string;
  public asset: L.Icon;

  constructor(id: string, size: number[], anchor: number[], popAnchor: number[]) {
    this.id = id;
    this.asset = L.icon({
      iconUrl: `images/map/markers/${id}.png`,
      iconSize: size as L.PointExpression,
      iconAnchor: anchor as L.PointExpression,
      popupAnchor: popAnchor as L.PointExpression
    });
  }

}