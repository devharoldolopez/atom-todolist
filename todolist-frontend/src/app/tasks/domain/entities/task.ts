export class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public state: string,
    public createdDate: Date,
  ) {}
}