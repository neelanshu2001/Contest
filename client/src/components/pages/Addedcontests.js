import React, { useEffect, useContext } from 'react';
import Preloader from '../layout/Preloader';
import ContestContext from '../../context/contests/contestContext';
import Addedcontest from '../contest/Addedcontest';
import M from 'materialize-css/dist/js/materialize.min.js';

const Addedcontests = () => {
  const contestContext = useContext(ContestContext);
  const {
    error,
    loading,
    clearErrors,
    getUseraddedcontests,
    userContests,
  } = contestContext;
  useEffect(() => {
    getUseraddedcontests();
    if (error) {
      M.toast({ html: error });
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error]);
  if (!loading &&  userContests!== null && userContests.length === 0) {
    return (
      <div className='text-5xl text-center white pt-20 text-bold'>
        No Added Contests{' '}
      </div>
    );
  }
  return (
    <div className='white py-20 ' style={{ height: '800px' }}>
      <div className='text-center text-5xl font-mono font-bold mb-20'>
        Added Contests
      </div>

      {!loading && userContests !== null ? (
        <div className=' grid grid-cols-1 gap-4 mt-10'>
          {userContests.map((contestItem) => (
            <Addedcontest contest={contestItem} key={contestItem._id} />
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

export default Addedcontests;
