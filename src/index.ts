import { filterFilms, applyFilmFilters } from "./filmFilters"
import { Film } from "./film"
import { Category } from "./category"


type MatchFilter<T extends string | number> = {
  filter: T | null
}
type RangeFilter = {
  filter: number | null,
  filterTo: number | null
}
type SearchFilter = {
  values: {
    name: string | null,
  }
}
export type Filters = {
  searchFilter: SearchFilter,
  yearRangeFilter: RangeFilter,
  ratingFilter: RangeFilter,
  oscarFilter: MatchFilter<string>,
}
export type FiltersTypes = 'yearFrom' | 'yearTo' | 'raitingFrom' | 'raitingTo' | 'oscarMatch'

class FimlsList {
  private _films: Film[] = []
  private filters: Filters = {
    searchFilter: {
      values: {
        name: null
      }
    },
    yearRangeFilter: {
      filter: null,
      filterTo: null
    },
    ratingFilter: {
      filter: null,
      filterTo: null
    },
    oscarFilter: {
      filter: null
    },
  }

  get films(): Film[] {
    return filterFilms(this._films, this.filters)
  }

  applySearchValue(value: string): void {
    this.filters.searchFilter.values.name = value
  }

  applyFiltersValue(filterType: FiltersTypes, value: string | number): void {
    applyFilmFilters(this.filters, filterType, value)
  }

  addFilm(name: string, year: number, raiting: number) {
    this._films.push(new Film(name, year, raiting))
  }
}

class CategoryList {
  private _categories: Category[] = []
  private searchFilter: SearchFilter = {
    values: {
      name: null
    }
  }

  addCategory(name: string) {
    this._categories.push(new Category(name))
  }

  get categories(): Category[] {
    const searchValue = this.searchFilter.values.name
    if (typeof searchValue === 'string' && searchValue.trim().length > 0) {
      return this._categories.filter(({name}) => name.includes(searchValue))
    } else {
      return this._categories
    }
  }

  applySearchValue(value: string): void {
    this.searchFilter.values.name = value
  }

}

