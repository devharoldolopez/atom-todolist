export class Task {
  constructor(
    public title: string,
    public description: string,
    public state: string,
    public createdDate?: string,
    public userId?: string,
    public id?: string,
  ) {}
}