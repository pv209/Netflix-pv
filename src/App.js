import React, {useEffect, useState} from 'react'
import './App.css'
import Api from './Api.js';
import MovieRow from './componnents/MovieRow.js';

export default () => {

  const [movieList, setMovieList] = useState ([]);
    useEffect(() => {
      const loadAll  = async () => {
        let list =  await Api.getHomeList();
        setMovieList(list);
      }
      loadAll();
    },[]);

      return (
        <div className='page'>
          <section className="lists">
            {movieList.map((item,key) => (
              <div>
                <MovieRow key={key} title={item.title} items={item.items}/>
              </div>
          ))}
          </section>
        </div>
      );
}
