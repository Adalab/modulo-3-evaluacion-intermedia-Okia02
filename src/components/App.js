import "../styles/App.scss";
import adalabers from "../data/promo-patata.json";
import { /*useEffect, */ useState } from "react";
//import callToApi from "../services/api";
//import localStorage from '../services/localstorage';

function App() {
  //variables
  const [data, setData] = useState(adalabers);
  const [search, setSearch] = useState("");
  const [newAdalaber, setNewAdalaber] = useState({
    name: "",
    counselor: "",
    speciality: "",
  });
  //Filtrar y pintar adalabers
  console.log(data);
  const htmlAdalaber = data
    .filter((searchAdalaber) =>
      searchAdalaber.name
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase())
    )
    .map((eachAdalaber, index) => (
      <tr key={index}>
        <td>{eachAdalaber.name}</td>
        <td>{eachAdalaber.counselor}</td>
        <td>{eachAdalaber.speciality}</td>
      </tr>
    ));

  //Añadir adalaber
  const handleNewAdalaber = (ev) => {
    setNewAdalaber({
      ...newAdalaber,
      [ev.currentTarget.id]: ev.currentTarget.value,
    });
  };
  //Recoger valor de la búsqueda
  const handleSearchInput = (ev) => {
    setSearch(ev.currentTarget.value);
  };
  // Submit formulario y lavado
  const handleNewAdalaberClick = (ev) => {
    ev.preventDefault();
    setData([...data, newAdalaber]);
    setNewAdalaber({
      name: "",
      counselor: "",
      speciality: "",
    });
  };

  // api
  /*useEffect(() => {
    callToApi().then((response) => {
      data(response);
    });
  }, []);*/

  return (
    // HTML

    <div className="app">
      <header className="header">
        <h1 className="header__title">Adalabers</h1>
        <form>
          <input
            className="header__search"
            autoComplete="off"
            type="search"
            name="search"
            placeholder="Ej. MariCarmen"
            value={search}
            onChange={handleSearchInput}
          />
          {/*<select onChange={handleSelectInput} className='search__select'>
            <option value='all'>Cualquiera</option>
            <option value={}>{nombre adalabers}</option>
          </select>*/}
        </form>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tutora</th>
              <th>Especialidad</th>
            </tr>
          </thead>
          <tbody className="adalaber-info">{htmlAdalaber}</tbody>
        </table>
        <form className="new-adalaber__form">
          <h2 className="new-adalaber__title">Añadir una adalaber</h2>
          <label>
            <input
              className="new-adalaber__input"
              type="text"
              name="name"
              id="name"
              placeholder="Nombre"
              value={newAdalaber.name}
              onChange={handleNewAdalaber}
            />
          </label>
          <label>
            <input
              className="new-adalaber__input"
              type="text"
              name="counselor"
              id="counselor"
              placeholder="counselora"
              value={newAdalaber.counselor}
              onChange={handleNewAdalaber}
            />
          </label>
          <label>
            <input
              className="new-adalaber__input"
              type="text"
              name="speciality"
              id="speciality"
              placeholder="Python, React, IA..."
              value={newAdalaber.speciality}
              onChange={handleNewAdalaber}
            />
          </label>
          {/*<label htmlFor="github" className="form__label">
            GitHub
          <input
            type="text"
            placeholder="URL"
            name="github"
            id="github"
            className="new-adalaber__input"
            value={newAdalaber.github}
            onChange={handleNewAdalaber}
          /></label>
          <label htmlFor="linkedin" className="form__label">
            Linkedin
          <input
            type="text"
            placeholder="URL"
            name="linkedin"
            id="linkedin"
            className="new-adalaber__input"
            value={newAdalaber.linkedin}
            onChange={handleNewAdalaber}
          /></label>
          <label htmlFor="github" className="form__label">
            Twitter
          <input
            type="text"
            placeholder="URL"
            name="twitter"
            id="twitter"
            className="new-adalaber__input"
            value={newAdalaber.twitter}
            onChange={handleNewAdalaber}
          /></label>*/}
          <input
            className="new-adalaber__btn"
            type="submit"
            value="Añadir"
            onClick={handleNewAdalaberClick}
          />
        </form>
      </main>
    </div>
  );
}

export default App;
