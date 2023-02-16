export class BossData {

  public id: number;
  public name: string;

  constructor(json: any) {
    this.id = json.i;
    this.name = json.n;
  }

}