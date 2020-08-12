import React, { useEffect, useContext } from 'react';
import ContestContext from '../../context/contests/contestContext';
import Preloader from '../layout/Preloader';
import M from 'materialize-css/dist/js/materialize.min.js';
import Contest from '../contest/Contest';
const Home = () => {
  const contestContext = useContext(ContestContext);
  const { error, loading, clearErrors, getContests, contest } = contestContext;
  useEffect(() => {
    getContests();
    if (error !== null) {
      M.toast(error);
      clearErrors();
    }
  }, [error]);

  if (!loading && contest !== null && contest.length === 0) {
    return (
      <div className='text-5xl text-center white pt-20 text-bold'>
        No contests{' '}
      </div>
    );
  }

  return (
    <div className='white py-20 ' style={{ height: '800px' }}>
      <div className='text-center text-5xl font-mono font-bold mb-12'>
        Upcoming Contests
      </div>
      <div className='fixed-action-btn'>
        <a
          className=' btn-large waves-effect waves-light btn btn-floating  red accent-3 modal-trigger'
          href='#today'
        >
          <i class='material-icons white-text'> event</i>
        </a>
      </div>

      {!loading && contest !== null ? (
        <div className=' grid grid-cols-1 gap-4 mt-10'>
          {contest.map((contestItem) => (
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

export default Home;
