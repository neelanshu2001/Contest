import React from 'react';
import chef from '../../assets/images/chef.jfif';
import forces from '../../assets/images/forces.jfif';

const Contest = ({ contest }) => {
  const { title, date, end, link, platform } = contest;
  return (
    <div className='container flex flex-row grey lighten-3 shadow-2xl  p-8 rounded-lg'>
      <div className='mr-12 mb-4'>
        <img
          className='object-scale-down '
          src={platform === 'Codechef' ? chef : forces}
          alt='Logo'
        />
      </div>

      <div className=' text-3xl font-bold blue-text text-darken-3  container '>
        {platform}
        <div className='text-xl text-indigo-700'>{title}</div>
        <div className='text-sm text-red-400 '>
          Start :<span className='text-red-600'> {date}</span>
        </div>
        <div className='text-sm text-red-400'>
          End: <span className='text-red-600'> {end}</span>
        </div>
        <div className='text-sm mt-4'>
          {link !== null ? (
            <a href={link} className='btn btn-small blue'>
              Enter
            </a>
          ) : (
            <a href='#' className='btn btn-small disabled'>
              Enter
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contest;
