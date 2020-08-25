import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import ContestContext from '../../context/contests/contestContext';
import chef from '../../assets/images/chef.jfif';
import forces from '../../assets/images/forces.jfif';
import coder from '../../assets/images/coder.png';
import earth from '../../assets/images/earth.png';
import leetcode from '../../assets/images/leetcode.png';
import other from '../../assets/images/other.jpg';
import M from 'materialize-css/dist/js/materialize.min.js';
const Addedcontest = ({ contest }) => {
  const { title, startdate,starttime, enddate, endtime, link, platform, _id } = contest;
  const contestContext = useContext(ContestContext);
  const { deleteAddedContest,getContests, getDayContest, error } = contestContext;
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  const start=new Date( (startdate).concat(' ',(starttime),' +0000' ) );
  const end_=new Date( (enddate).concat(' ',(endtime),' +0000' ) );
  const date=start.toUTCString().slice(0, -4);
  const end=end_.toUTCString().slice(0, -4);
  return (
    <div className='container flex flex-row grey lighten-3 shadow-2xl  p-8 rounded-lg'>
      <div className='mr-12 mb-4'>
        <img
          className='object-scale-down '
          src={
            platform === 'Codechef'
              ? chef
              : platform === 'CodeForces'
              ? forces
              : platform === 'Atcoder'
              ? coder
              : platform === 'Hackerearth'
              ? earth
              : platform === 'Leetcode'
              ? leetcode
              : other
          }
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
            <a href={link} className='btn btn-small disabled'>
              Enter
            </a>
          )}
        </div>
      </div>
      {isAuthenticated ? (
        <div>
          <button
            className='btn btn-flat'
            onClick={(e) => {
              deleteAddedContest({ title, id: _id });
              getContests();
              getDayContest();
              if (!error) {
                M.toast({ html: `${title} deleted from Added Contests` });
              }
            }}
          >
            <i className='text-black material-icons'>delete</i>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Addedcontest;
