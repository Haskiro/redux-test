import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from '../../hooks/http.hook';
import { useDispatch } from 'react-redux';
import { heroAdded } from '../heroesList/heroesSlice'
import { useSelector } from 'react-redux';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElemenet] = useState('');

    const { request } = useHttp();
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters.filters).filter(item => item.name !== 'all');


    // Хитровыебаный метод для изменения state, связанного с каждым из полей. Написан по приколу, не рационален и не читабелен
    // const onChangeField = (e, i) => {
    //     const setter = 'set' + refList.current[i].name[0].toUpperCase() + refList.current[i].name.substr(1);
    //     eval(`${setter}(${"'" + e.target.value + "'"})`);
    // }

    const renderFilters = (filtes) => {
        return (
            filters.map(({ name, label }) => (<option value={name} key={name}>{label}</option>))
        );
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name: name,
            description: description,
            element: element
        }

        request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
            .then(dispatch(heroAdded(newHero)))
            .catch(err => console.log(err));


    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    placeholder="Как меня зовут?" />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="text"
                    placeholder="Что я умею?"
                    style={{ "height": '130px' }} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    value={element}
                    onChange={(e) => setElemenet(e.target.value)}
                    id="element"
                    name="element">
                    <option >Я владею элементом...</option>
                    {renderFilters(filters)}
                </select>
            </div>

            <button
                type="submit"
                className="btn btn-primary"
            >Создать</button>
        </form>
    )
}

export default HeroesAddForm;