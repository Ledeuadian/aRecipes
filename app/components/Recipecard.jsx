//renamed and added comment to pushed

import React from 'react'
import Link from 'next/link';

const RecipeCard = ({ recipe }) => {
    const { image, label, cuisineType, mealType, uri } = recipe?.recipe

    const id = uri?.split("#")[1]

    return (
        <Link href={`/recipes/${id}`} className='w-full md:w-[220px]'>
        <div className='w-full md:w-[220px]'>
            <div className='bg-_gradient shadow w-full rounded-lg h-full'>
                <img src={image} alt={label} className='rounded-lg h-[200px] md:h-[150px] w-full' />

                <div className='p-3'>
                    <p className='text-white font-semibold'>{label}</p>

                    <div className='mt-2'>
                        <span className='px-2 py-1 text-[12px] capitalize bg-[#45280c43] shadow-xl rounded-full mr-3 text-orange-500'>
                            {cuisineType}
                        </span>
                        <span className='px-2 py-1 text-[12px] capitalize bg-[#45280c43] shadow-xl rounded-full text-orange-500'>
                            {mealType}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default RecipeCard