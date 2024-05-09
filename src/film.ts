export class Film {
  constructor(
    readonly name: string,
    readonly year: number,
    public raiting: number,
    private _oscar: string[] = []
  ) { }

  get oscar(): string[] {
    return this._oscar
  }
  addOscar(oscarToAdd: string): void {
    this._oscar.push(oscarToAdd)
  }
}
