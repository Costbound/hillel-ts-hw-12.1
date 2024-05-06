import { Film } from "./film"

export class Category {
    private _films: Film[] = []
  
    constructor(
        readonly name: string,
    ) { }
  
    get films(): Film[] {
        return this._films
    }
    addFilm(filmToAdd: Film): void {
        this._films.push(filmToAdd)
    }
    removeFilm(filmToRemove: string): void {
        this._films.splice(
            this._films.findIndex(({ name }) => name === filmToRemove),
            1)
    }
}