import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => { state.filtersLoadingStatus = 'loading' },
        filtersFetched: (state, action) => {
            state.filters = action.payload;
            state.filtersLoadingStatus = 'idle';
        },
        filtersFetchingError: state => { state.filtersLoadingStatus = 'error' },
        filterChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
    }
})

const { reducer, actions } = filterSlice;

export default reducer;

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filterChanged
} = actions;