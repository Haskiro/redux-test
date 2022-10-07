const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroesList: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
                filteredHeroesList: filteredList(action.payload, state.activeFilter)
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'HERO_DELETED':
            const newHeroes = state.heroes.filter(item => item.id !== action.payload);

            return {
                ...state,
                heroes: newHeroes
            }
        case 'HERO_ADDED':
            const newHeroList = [...state.heroes, action.payload]

            return {
                ...state,
                heroes: newHeroList,
                filteredHeroesList: filteredList(newHeroList, state.activeFilter)

            }

        case 'FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroesList: filteredList(state.heroes, action.payload)
            }

        default: return state
    }
}

const filteredList = (arr, filter) => {
    if (filter === 'all') return arr;

    return arr.filter(item => item.element === filter)
}

export default reducer;