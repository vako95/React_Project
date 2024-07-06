import React, { useState, useEffect } from 'react';

import { createClient } from 'pexels';
import { Pagination,CircularProgress  } from '@mui/material';

import { Apiconnect } from '../../../keys';

import './InfoApp.css';



const InfoApp = () => {
  const [loading, setLoading] = useState(true);
  const [photor, setPhotor] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage,setTotalPage] = useState(0);
  
  useEffect(() => {
    const client = createClient(Apiconnect);
    setLoading(true);
    
    client.photos.curated({per_page:6,  page: page })
      .then((res) => {
        setPhotor(res.photos);
        const total = Math.ceil(res.total_results / 10)
        setTotalPage(total)
      
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  const pageChanger = (change, value) => {
   
    setPage(value);
  };

  return (
    <div className="info">
      {loading ? (
        <div className='white-text'><h1>Loading...</h1><CircularProgress /></div>
        
      ) : (
        
        <>
        
          <h1 className='galler'>Image Gallery</h1>
          {photor && photor.length > 0 ? (
            <div className='img_con'>
              {photor.map((data) => (
                <div className='imager' key={data.id}>
                  
                
  <div class="gallery-image">
    <div class="img-box">
    <img src={data.src.landscape} alt={data.alt} />
      <div class="transparent-box">
        <div class="caption">
     
          <p class="opacity-low">{data.alt}</p>
        </div>
      </div> 
    </div>


 
   
   
  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='white-text'>No Photos Found</div>
          )}
          <div className="pagination-container">
            <Pagination
              count={totalPage} 
              page={page}
              onChange={pageChanger}
              color="secondary"
              />
          </div>
        </>
      )}
    </div>
    
  );
};

export default InfoApp;