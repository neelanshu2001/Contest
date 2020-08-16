import React, { useEffect, useContext } from 'react';
import Preloader from '../layout/Preloader';
import ContestContext from '../../context/contests/contestContext';
import BookmarkedItem from '../contest/BookmarkedItem';
import M from 'materialize-css/dist/js/materialize.min.js';

const Bookmarked = () => {
  const contestContext = useContext(ContestContext);
  const {
    error,
    loading,
    clearErrors,
    getUserEvents,
    userEvents,
  } = contestContext;
  useEffect(() => {
    getUserEvents();
    if (error) {
      M.toast({ html: error });
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error]);
  if (!loading && userEvents !== null && userEvents.length === 0) {
    return (
      <div className='text-5xl text-center white pt-20 text-bold'>
        No contests Bookmarked{' '}
      </div>
    );
  }
  return (
    <div className='white py-20 ' style={{ height: '800px' }}>
      <div className='text-center text-5xl font-mono font-bold mb-20'>
        Bookmarked Events
      </div>

      {!loading && userEvents !== null ? (
        <div className=' grid grid-cols-1 gap-4 mt-10'>
          {userEvents.map((contestItem) => (
            <BookmarkedItem contest={contestItem} key={contestItem._id} />
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

export default Bookmarked;
