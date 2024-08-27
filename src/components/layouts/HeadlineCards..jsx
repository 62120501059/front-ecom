import React from 'react';

const HeadlineCards = () => {
  return (
    <div className='max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-3 gap-6'>
      {/* Card */}
      <div className='rounded-xl relative'>
        {/* Overlay */}
        <div className='absolute w-full h-full bg-black/25 rounded-xl text-white'>
          <p className='font-bold text-2xl px-2 pt-4'>Meatball</p>
          {/* <p className='px-2'>Through 8/26</p> */}
          {/* <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-2 absolute bottom-4'>Order Now</button> */}
        </div>
        <img
          className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl'
          src='https://i.pinimg.com/564x/cf/1c/8f/cf1c8ffcef68816fc7e0d6568db1d423.jpg'
          alt='/'
        />
      </div>
      {/* Card */}
      <div className='rounded-xl relative'>
        {/* Overlay */}
        <div className='absolute w-full h-full bg-black/25 rounded-xl text-white'>
          <p className='font-bold text-2xl px-2 pt-4'>Frozen Fish</p>
          {/* <p className='px-2'>Added Daily</p> */}
          {/* <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-2 absolute bottom-4'>Order Now</button> */}
        </div>
        <img
          className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl'
          src='https://i.pinimg.com/564x/0e/18/9c/0e189cb2b5f76fe5dcd0710576c6046f.jpg'
          alt='/'
        />
      </div>
      {/* Card */}
      <div className='rounded-xl relative'>
        {/* Overlay */}
        <div className='absolute w-full h-full bg-black/50 rounded-xl text-white'>
          <p className='font-bold text-2xl px-2 pt-4'>Shrimp,Shellfish, Crab</p>
          {/* <p className='px-2'>Tasty Treats</p> */}
          {/* <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-2 absolute bottom-4'>Order Now</button> */}
        </div>
        <img
          className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl'
          src='https://i.pinimg.com/564x/29/74/0a/29740a13d254a39b8a2306aa2120ebb9.jpg'
          alt='/'
        />
      </div>
    </div>
  );
};

export default HeadlineCards;