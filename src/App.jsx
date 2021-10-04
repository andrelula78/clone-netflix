import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './Components/MovieRow';
import FeaturedMovie from './Components/FeaturedMovie';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);

  useEffect(()=>{
    const loadAll = async () => {
      // Pegando a lista Total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegando o Featured
      let originals = list.filter(i => i.slug === 'originais');
      let randomchosen = Math.floor(Math.random()*(originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomchosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);

    }

    loadAll();
  }, []);

  return (
    <div className="page">

      {featuredData &&
        <FeaturedMovie item={featuredData}/>
        }

      <section className="listas">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
}
