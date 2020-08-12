import React, { useContext, useRef, useEffect } from 'react';
import ContestContext from '../../context/contests/contestContext';

const Searchbar = () => {
  const contestContext = useContext(ContestContext);

  const { filterContests, clearFilter, filtered } = contestContext;
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContests(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <div className='container '>
      <nav className='grey lighten-2'>
        <div className='nav-wrapper'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className='input-field grey-text text-darken-3'>
              <input
                ref={text}
                id='search'
                type='search'
                placeholder='Name/Platform/Date'
                onChange={onChange}
                required
              />
              <label className='label-icon' htmlFor='search'>
                <i className='material-icons grey-text text-darken-3'>search</i>
              </label>
              <i
                className='material-icons grey-text text-darken-3'
                onClick={(e) => {
                  text.current.value = null;
                  clearFilter();
                }}
              >
                close
              </i>
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Searchbar;
