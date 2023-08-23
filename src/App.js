import React, {useEffect, useState, useLayoutEffect} from 'react'
import './App.css'
import Api from './api.js';
import MovieRow from './componnents/MovieRow.js';
import FeatureMovie from'./componnents/featureMovie';
import Header from './componnents/Header';

export default () => {

  const [movieList, setMovieList] = useState ([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  useLayoutEffect(() => {
      const loadAll  = async () => {
        let list =  await Api.getHomeList();
        setMovieList(list);
    
        let originals = list.filter(i=>i.slug === 'originals');
        let random = Math.floor(Math.random() * originals[0].items.results.length -1);
        let chosen = originals[0].items.results[random];
        let chosenInfo = await Api.getMovieInfo(chosen.id, 'tv');
        setFeatureData(chosenInfo);
      }
      loadAll();
    },[]);


    useEffect(() => {
      const scrollListener = () => {
        if(window.scrollY > 100 ) {
          setBlackHeader(true);
        }else{
          setBlackHeader(false);
        }
      }
      window.addEventListener('scroll', scrollListener);
      return () => {
        window.removeEventListener('scroll',scrollListener);
      }
    },[]);

      return (
        <div className='page'>
           <Header black={blackHeader}/>
           {featureData &&
           <FeatureMovie item={featureData} />
           }
          <section className="lists">
            {movieList.map((item,key) => (
              <div  key={key}   >
                <MovieRow  title={item.title} items={item.items}/>
              </div>
          ))}
          </section>

          <footer>
            Feito por Paulo Vitor de Farias Borges <br />
            Dados pegos pelo site Themoviedb.org
          </footer>
          {movieList.length <= 0  && 
          <div className="loading">
            <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="loading" />
          </div>
          }
        </div>
      );
}
