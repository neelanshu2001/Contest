import React from 'react';

const About = () => {
  return (
    <div
      className='white center'
      style={{
        paddingTop: '20px',
        paddingBottom: '20px',
        height: '900px',
        overflowY: 'auto',
      }}
    >
      <div style={{ fontSize: '60px', fontFamily: 'serif' }}>About</div>
      <div className='container' style={{ marginTop: '40px' }}>
        <div
          className='black white-text '
          style={{
            textDecorationWidth: '10px',
            fontSize: '30px',
            marginBottom: '25px',
          }}
        >
          Project for IITI-Soc
        </div>
      </div>
    </div>
  );
};

export default About;
