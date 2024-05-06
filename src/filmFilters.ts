import { Filters, FiltersTypes } from "./index"
import { Film } from "./film"

export function filterFilms(films: Film[], filters: Filters): Film[] {
    let filteredFilms = films.map(film => film)
  const {
      searchFilter: { values: { name: searchName}},
      yearRangeFilter: { filter: yearFilterFrom, filterTo: yearFilterTo },
      ratingFilter: { filter: ratingFilterFrom, filterTo: ratingFilterTo },
      oscarFilter: { filter: oscarFilter },
    } = filters

    if (searchName) {
      filteredFilms = filteredFilms.filter(({name}) => name.includes(searchName))
    }

    if (yearFilterFrom && yearFilterTo) {
      filteredFilms = filteredFilms.filter(({year}) => year <= yearFilterFrom && year >= yearFilterTo)
    } else if (yearFilterFrom) {
      filteredFilms = filteredFilms.filter(({year}) => year >= yearFilterFrom)
    } else if (yearFilterTo) {
      filteredFilms = filteredFilms.filter(({year}) => year <= yearFilterTo)
    }

    if (ratingFilterFrom && ratingFilterTo) {
      filteredFilms = filteredFilms.filter(({raiting}) => raiting <= ratingFilterFrom && raiting >= ratingFilterTo)
    } else if (ratingFilterFrom) {
      filteredFilms = filteredFilms.filter(({raiting}) => raiting >= ratingFilterFrom)
    } else if (ratingFilterTo) {
      filteredFilms = filteredFilms.filter(({raiting}) => raiting <= ratingFilterTo)
    }

    if (oscarFilter) {
      filteredFilms = filteredFilms.filter(({oscar}) => oscar.some(revard => revard === oscarFilter))
    }

  return filteredFilms
}

export function applyFilmFilters(filters: Filters, type: FiltersTypes, value: string | number | null): void {
  if (type === 'yearFrom' && (typeof value === 'number' || value === null)) {
    filters.yearRangeFilter.filter = value
  }
  if (type === 'yearTo' && (typeof value === 'number' || value === null)) {
    filters.yearRangeFilter.filterTo = value
  }
  if (type === 'raitingFrom' && (typeof value === 'number' || value === null)) {
    filters.ratingFilter.filter = value
  }
  if (type === 'raitingTo' && (typeof value === 'number' || value === null)) {
    filters.ratingFilter.filterTo = value
  }
  if (type === 'oscarMatch' && (typeof value === 'string' || value === null)) {
    filters.oscarFilter.filter = value
  }
}

