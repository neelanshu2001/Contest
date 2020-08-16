import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import ContestContext from '../../context/contests/contestContext';
import chef from '../../assets/images/chef.jfif';
import forces from '../../assets/images/forces.jfif';
import coder from '../../assets/images/coder.png';
import M from 'materialize-css/dist/js/materialize.min.js';
const BookmarkedItem = ({ contest }) => {
  const { title, date, end, link, platform, _id } = contest;
  const contestContext = useContext(ContestContext);
  const { removeEvent, error } = contestContext;
  const authContext = useContext(AuthContext);
  const { gtoken } = authContext;
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
              : coder
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
      {gtoken ? (
        <div>
          <button
            className='btn btn-flat'
            onClick={(e) => {
              removeEvent({ title, gtoken: gtoken, id: _id });
              if (!error) {
                M.toast({ html: `${title} deleted from bookmarks` });
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

export default BookmarkedItem;
