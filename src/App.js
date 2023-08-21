import React, {useEffect, useState} from 'react'
import './App.css'
import Api from './Api.js';
import MovieRow from './componnents/MovieRow.js';
import FeatureMovie from'./componnents/FeatureMovie';

export default () => {

  const [movieList, setMovieList] = useState ([]);
  const [featureData, setFeatureData] = useState(null);
    useEffect(() => {
      const loadAll  = async () => {
        let list =  await Api.getHomeList();
        setMovieList(list);
    
        let originals = list.filter(i=>i.slug === 'originals');
        let random = Math.floor(Math.random() * originals[0].items.results.length -1);
        let chosen = originals[0].items.results[random];
        console.log(chosen);
        let chosenInfo = await Api.getMovieInfo(chosen.id, 'tv');
        setFeatureData(chosenInfo);
      }
      loadAll();
    },[]);

      return (

        <div className='page'>
           {featureData &&
           <FeatureMovie item={featureData} />
           }
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
