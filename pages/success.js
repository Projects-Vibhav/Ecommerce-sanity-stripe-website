import React,{useState, useEffect} from 'react'
import Link from 'next/Link';
import {BsBagCheckFill} from 'react-icons/bs';
import {useRouter} from 'next/router';
import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const success = () => {
    const {setCartItems, setTotalPrice, setTotalQuantities}  = useStateContext();


    useEffect(()=> {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireworks();
    },[])
  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>

            </p>
            <h2>Thanks for you purchase!!</h2>
            <p className='email-msg'>
                Check your inbox for confirmation!
            </p>
            <p className='desc'>
                If you have any concerns please let us know at :
                <a className='email' href = "order@example.com"></a>
            </p>
            <Link href='/'>
                <button type='button' width="300px" className='btn'>
                    Continue Shopping!
                </button>
            </Link>
        </div>
    </div>
  )
}

export default success