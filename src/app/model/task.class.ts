export class Task {
  public id: number;
  public title: string;
  public complete: boolean;

  constructor(title: string) {
    this.title = title;
    this.complete = false;
  }
}
