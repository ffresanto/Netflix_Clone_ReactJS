import React, { useEffect, useState } from "react";
import { MovieRow } from "./components/MovieRow/MovieRow.jsx";
import Tmdb from "./libs/tmdb.jsx";
import './App.css'
import { FeaturedMovie } from "./components/FeaturedMovie/FeaturedMovie.jsx";
import { Header } from "./components/Header/Header.jsx";
import loadingImg from "./image/loading.gif";

const App = () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {

      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);


  useEffect(() => {

    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }

   }, []);

  return (
    <div className="Ppage">
      {/* Header */}
      <Header black={ blackHeader } />

      {/* Destaque */}
      {featuredData && 
        <FeaturedMovie item={ featuredData } />
      }
      
      {/* Listas */}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={ item.items }/>
        ))}
      </section>
      
      {movieList.length <= 0 &&
      <div className="loading">
        <img src={loadingImg} alt="Loading" />
      </div>
      }
    </div>
  ); 
};

export default App;
