
export class EventListener {

  private listeners: CallableFunction[] = [];

  public register(callback: CallableFunction) {
    this.listeners.push(callback);
  }

  public emit(data?: any) {
    for (var i = 0; i < this.listeners.length; i++)
      this.listeners[i](data);
  }

}