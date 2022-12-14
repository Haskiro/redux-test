import { useDispatch, useSelector } from 'react-redux';
import { filterChanged, fetchFilters, selectAll } from './filtersSlice';
import { useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import classNames from 'classnames';
import store from '../../store';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const dispatch = useDispatch();
    const filters = selectAll(store.getState())
    const { filtersLoadingStatus, activeFilter } = useSelector(state => state.filters)

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner />;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilter = (filters) => {
        if (filters.legnth === 0) {
            return <h5 className="text-center mt-5">Нет доступных фильтров</h5>
        }

        return filters.map(({ className, label, name }) => {
            const btnClass = classNames('btn', className, {
                active: name === activeFilter
            });
            return (
                <button
                    className={btnClass}
                    key={name}
                    name={name}
                    onClick={() => dispatch(filterChanged(name))}
                >{label}</button>
            )
        })
    }

    const elements = renderFilter(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;