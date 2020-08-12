import React, { useEffect, useContext } from 'react';
import ContestContext from '../../context/contests/contestContext';
import Preloader from '../layout/Preloader';
import M from 'materialize-css/dist/js/materialize.min.js';
import ModalContest from '../contest/ModalContest';
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
      <div className=' text-center text-5xl pt-20 text-bold'>
        No contests today!!
      </div>
    );
  }

  return (
    <div id='today' className='modal bottom-sheet'>
      <div className='modal-content grey darken-3'>
        <div className='text-center text-5xl text-gray-300 font-bold mb-12'>
          Today
        </div>
        {!loading && todayContest !== null ? (
          <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-10'>
            {todayContest.map((contestItem) => (
              <ModalContest contest={contestItem} key={contestItem.id} />
            ))}
          </div>
        ) : (
          <div className='container '>
            <Preloader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Today;
