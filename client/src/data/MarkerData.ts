export class MarkerData {

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