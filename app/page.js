import React, { Fragment } from "react";
import Header from "./components/Header";
import Recipes from "./components/Recipe";

export default function Home() {
  return (
    <Fragment>
    <main className='w-full flex flex-col'>
   
    <Header 
        title={
                <p> Explore your cravings <br />with this recipes!</p>
              }
        type='home'
              />
        
        <section id="recipes" className='md:max-w-[1440px] mx-auto px-4 md:px-20'>
            <Recipes />
        </section>  
    </main>
  </Fragment>
  )
}
