import React from 'react'

import {Product, FooterBanner, HeroBanner} from '../components';

import {client} from '../lib/client';

const index = ({products,bannerData}) => {
  return (
    <>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
     

    <div className='products-heading'>
      <h2> Best Selling Products</h2>
      <p> Comfortable streetwear!!</p>
    </div>

    <div className='products-container'>
      {products?.map( // ? is for checking if we have atleast one product
        (product)=><Product key={product._id} product = {product}/>
      )}
    </div>

    <FooterBanner footerBanner  = {bannerData && bannerData[0]}/>
    </>
  )
};

export const getServerSideProps = async() =>{
  const query ='*[_type == "product"]'; //Fetching all products (using*)
  const products  = await client.fetch(query);

  const bannerQuery ='*[_type == "banner"]'; //Fetching all products (using*)
  const bannerData  = await client.fetch(bannerQuery);

  return {
    props:{products,bannerData}
  }


}

export default index