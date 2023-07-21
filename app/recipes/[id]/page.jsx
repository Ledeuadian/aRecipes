'use client'

import React, { useEffect, useState } from 'react'
import { fetchRecipe, fetchRecipes } from '@/utils'
import Loading from '@/app/components/Loading'
import Header from '@/app/components/Header'
import { GiIceCreamScoop } from "react-icons/gi"
import { BsPatchCheck } from "react-icons/bs"
import RecipeCard from '@/app/components/Recipecard'
import { useParams } from 'next/navigation'
import { AiOutlineStar } from "react-icons/ai"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null)
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const {data : session} = useSession();
  const { id } = useParams()
  const router = useRouter();

  const getRecipe = async (id) => {
    try {
      setLoading(true)

      const data = await fetchRecipe(id)

      setRecipe(data)

      const recommend = await fetchRecipes({ query: recipe?.label, limit: 5 })

      setRecipes(recommend)

      setLoading(false)


    } catch (error) {
      console.log(error)

      setLoading(false)
    }
  }

  useEffect(() => {
    getRecipe(id)
  }, [id])


  if (loading) {
    return (
      <div className='w-full h-[100vh] flex items-center justify-center'>
        <Loading />
      </div>
    );
  }

  const addFavorite = async(e) => {
    e.preventDefault();

    try {
         const response = await fetch('/api/favorites/add',
         {
             method:'POST',
             body:JSON.stringify({
                 userId: session?.user.id,
                 recipeId: id,
                
         }),
      });
         if(response.ok){
             router.push(`/recipes/${id}`);
         }
    } catch (error) {
         console.log(error);
    }
 }
  return (
    <div className='w-full'>
      <Header
        title={recipe?.label} 
        image={recipe?.image}
      />

      <div className='w-full px-4 lg:px-20 pt-5'>

        <div className='flex gap-10 items-center justify-center px-4'>
          <div className='flex flex-col justify-between'>
            <span className='text-white text-center border border-gray-500 py-1.5 px-2 rounded-full mb-2'>{recipe?.calories.toFixed(2)} </span>

            <p className='text-neutral-100 text-[12px] md:text-md'>CALORIES</p>
          </div>

          <div className='flex flex-col justify-center'>
            <span className='text-white text-center border border-gray-500 py-1.5 rounded-full mb-2'>
              {recipe?.totalTime}
            </span>
            <p className='text-neutral-100 text-[12px] md:text-md'>
              TOTAL TIME
            </p>
          </div>

          <div className='flex flex-col justify-center'>
            <span className='text-white text-center border border-gray-500 py-1.5 rounded-full mb-2'>
              {recipe?.yield}
            </span>
            <p className='text-neutral-100 text-[12px] md:text-md'>SERVINGS</p>
          </div>


        </div>

        <div className='w-full flex flex-col md:flex-row gap-8 py-20 pxx-4 md:px-10'>
          {/* LEFT SIDE */}
          <div className='w-full md:w-2/4 md:border-r border-slate-800 pr-1'>
            <div className='flex flex-col gap-5'>
              <p className='text-orange-500 text-2xl underline'>Ingredients</p>

              {
                recipe?.ingredientLines?.map((ingredient, index) => {
                  return (
                    <p key={index} className='text-neutral-100 flex gap-2'>
                      <GiIceCreamScoop className='text-orange-800 text-xl' /> {ingredient}
                    </p>
                  )
                })
              }
            </div>

            <div className='flex flex-col gap-3 mt-20'>
              <p className='text-orange-700 text-2xl underline'>Health Labels</p>

              <div className='flex flex-wrap gap-4'>
                {
                  recipe?.healthLabels.map((item, index) => (
                    <p className='text-white flex gap-2 bg-[#fff5f518] px-4 py-1 rounded-full ' key={index}>
                      <BsPatchCheck color='green' /> {item}
                    </p>
                  ))
                }

              </div>
              {session?.user ? (
              <form 
              type='Create'
              onSubmit={addFavorite}>
              <button className='
                  rounded
                border-slate-200 
                outline-blue-200 
                flex w-full 
                content-center 
                justify-center 
                text-lg 
                text-white mt-5
                hover:text-slate-400'
                type="submit"        
              >
                    <AiOutlineStar className='self-center'/>
                        Add Favorite
              </button>
              </form>
              ):(
              <div>

              </div>
              )}
            </div>
          </div>


          {/* RIGHT SIDE */}
          <div className='w-full md:w-2/4 2xl:pl-10 mt-20 md:mt-0'>
            {
              recipes?.length > 0 && (
                <>
                  <p className='text-white text-2xl'>Also Try This</p>

                  <div className='flex flex-wrap gap-6 px-1 pt-3'>
                    {
                      recipes?.map((item, index) => (
                        <RecipeCard recipe={item} index={index} />
                      ))
                    }
                  </div>
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail