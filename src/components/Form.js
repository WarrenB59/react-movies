import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Form = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortGoodBad, setSortGoodBad] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setSearch("Avengers");
  }, []);
  useEffect(() => {
    console.log(search);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=196d32847ba997fce554d2a3ed81eb39&query=${search}&language=fr-FR`
      )
      .then((res) => setMoviesData(res.data.results));
  }, [search]);

  useEffect(() => {
    console.log(title);
  }, [title]);

  const submit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=196d32847ba997fce554d2a3ed81eb39&query=${title}&language=fr-FR`
      )
      .then((res) => setMoviesData(res.data.results));
  };
  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Entrez le titre d'un film"
            id="search-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="submit"
            value="Rechercher"
            onClick={submit}
            // Bouton rechercher à mettre en marche avec fonction onClick
          />
        </form>
        <div className="btn-sort-container">
          <div
            className="btn-sort"
            id="goodToBad"
            onClick={() => setSortGoodBad("goodToBad")}
          >
            Top<span>➜</span>
          </div>
          <div
            className="btn-sort"
            id="badToGood"
            onClick={() => setSortGoodBad("badToGood")}
          >
            Flop<span>➜</span>
          </div>
        </div>
      </div>
      <div className="result">
        {moviesData
          .slice(0, 20)
          .sort((min, max) => {
            if (sortGoodBad === "goodToBad") {
              return max.vote_average - min.vote_average;
            } else if (sortGoodBad === "badToGood") {
              return min.vote_average - max.vote_average;
            } else {
              return 0;
            }
          })
          .map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Form;
