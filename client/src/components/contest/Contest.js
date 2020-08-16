import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import ContestContext from '../../context/contests/contestContext';
import chef from '../../assets/images/chef.jfif';
import forces from '../../assets/images/forces.jfif';
import coder from '../../assets/images/coder.png';
import earth from '../../assets/images/earth.png';
import leetcode from '../../assets/images/leetcode.png';
import M from 'materialize-css/dist/js/materialize.min.js';
const Contest = ({ contest }) => {
  const { title, date, end, link, platform, start } = contest;
  const contestContext = useContext(ContestContext);
  const { setEvent, userEvents, getUserEvents, error } = contestContext;
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
              : platform === 'Atcoder'
              ? coder
              : platform === 'Hackerearth'
              ? earth
              : leetcode
          }
          alt='Logo'
        />
      </div>

      <div className=' text-3xl font-bold blue-text text-darken-3  container '>
        {platform}
        <div className='text-xl text-indigo-700'>{title}</div>
        <div className='text-sm text-red-a400 '>
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
        userEvents === null ||
        (userEvents !== null &&
          userEvents.filter((userEvent) => title === userEvent.title).length ===
            0) ? (
          <div>
            <button
              className='btn btn-flat '
              onClick={(e) => {
                setEvent({
                  event: {
                    platform,
                    title,
                    link,
                    start,
                    date,
                    end,
                  },
                  gtoken,
                });

                getUserEvents();
                if (!error) {
                  M.toast({ html: `${title} added to bookmarks` });
                }
              }}
            >
              <i className='black-text material-icons'>add_alarm</i>
            </button>
          </div>
        ) : null
      ) : null}
    </div>
  );
};

export default Contest;
