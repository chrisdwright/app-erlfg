import { Requests } from "./Requests";

export class Request {

  private parent: Requests;

  constructor(parent: Requests) {
    this.parent = parent;
  }

}