export abstract class Serializeable {
  export(): string {
    return JSON.stringify(this);
  }

  abstract import(data: Object);
}
