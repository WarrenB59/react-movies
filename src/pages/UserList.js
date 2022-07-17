import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";

const UserList = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    let moviesId = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=196d32847ba997fce554d2a3ed81eb39&language=fr-FR&external_source=imdb_id`
        )
        .then((res) => setListData((listData) => [...listData, res.data]));
    }
  }, []);
  return (
    <div className="user-list-page">
      <Header />
      <h2>
        Favoris <span>❤️</span>
      </h2>
      <div className="result">
        {listData.length > 0 ? (
          listData.map((movie) => <Card movie={movie} key={movie.id} />)
        ) : (
          <h2>Aucun film ajouté aux favoris</h2>
        )}
      </div>
    </div>
  );
};

export default UserList;
