import React, { useEffect, useContext } from 'react';
import ContestContext from '../../context/contests/contestContext';
import Preloader from '../layout/Preloader';
import M from 'materialize-css/dist/js/materialize.min.js';
import Contest from '../contest/Contest';
const Today = () => {
  const contestContext = useContext(ContestContext);
  const {
    error,
    loading,
    clearErrors,
    getDayContest,
    todayContest,
  } = contestContext;
  useEffect(() => {
    getDayContest();
    if (error !== null) {
      M.toast(error);
      clearErrors();
    }
  }, [error]);

  if (!loading && todayContest !== null && todayContest.length === 0) {
    return (
      <div className='white text-center text-5xl pt-20 text-bold'>
        No contests today!!
      </div>
    );
  }

  return (
    <div className='white py-20 ' style={{ height: '800px' }}>
      <div className='text-center text-5xl font-mono font-bold mb-12'>
        Contests of the day
      </div>
      {!loading && todayContest !== null ? (
        <div className=' grid grid-cols-1 gap-4 mt-10'>
          {todayContest.map((contestItem) => (
            <Contest contest={contestItem} key={contestItem.id} />
          ))}
        </div>
      ) : (
        <div className='container '>
          <Preloader />
        </div>
      )}
    </div>
  );
};

export default Today;
