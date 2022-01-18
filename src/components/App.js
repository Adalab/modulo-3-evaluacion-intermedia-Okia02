import "../styles/App.scss";
//import adalabers from "../data/promo-patata.json";
import { useEffect, useState } from "react";
import getAdalabers from "../services/api";

function App() {
  //variables
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("");
  const [newAdalaber, setNewAdalaber] = useState({
    name: "",
    counselor: "",
    speciality: "",
  });

  // Traer datos desde la API
  useEffect(() => {
    getAdalabers().then((AdalaberData) => {
      setData(AdalaberData);
    });
  }, []);

  //Filtrar y pintar adalabers
  const htmlAdalaber = data
    .filter((searchAdalaber) =>
      searchAdalaber.name
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase())
    )
    .filter((selectCounselor) => {
      return selectCounselor.counselor.toLowerCase().includes(select);
    })
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
  //Recoger valor de select
  const handleSelectInput = (ev) => {
    setSelect(ev.currentTarget.value);
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

  return (
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
          <select
            onChange={handleSelectInput}
            className="search__select"
            value={select}
          >
            <option value="">Cualquiera</option>
            <option value="iván">Iván</option>
            <option value="yanelis">Yanelis</option>
            <option value="dayana">Dayana</option>
          </select>
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
