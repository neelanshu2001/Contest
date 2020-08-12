import React from 'react';

const ModalContest = ({ contest }) => {
  const { title, date, end, link, platform } = contest;
  return (
    <div className='container grey lighten-3 shadow-2xl  p-4 rounded-lg'>
      <div className=' text-2xl font-bold blue-text text-darken-3  container '>
        {platform}
        <div className='text-md text-indigo-700'>{title}</div>
        <div className='text-sm text-red-400 '>
          Start :<span className='text-red-600'> {date}</span>
        </div>
        <div className='text-sm text-red-400'>
          End: <span className='text-red-600'> {end}</span>
        </div>
        <div className='text-sm mt-4'>
          {link !== null ? (
            <a href={link} className='btn btn-small blue'>
              <i class='small material-icons'>chevron_right</i>
            </a>
          ) : (
            <a href={link} className='btn btn-small disabled'>
              <i class='small material-icons'>chevron_right</i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalContest;
