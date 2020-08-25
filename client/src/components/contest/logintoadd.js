import React from 'react';
import {Button } from 'reactstrap';
const Logintoadd= () => {
    return (
        <div id='logintoadd' className="modal">
        <div className='modal-content'>
        <div className='text-center text-5xl text-black-300 font-bold mb-12'>
          Add Contest
          </div>
         Please <a href="/login">LOGIN</a> To Add Contests.
         <div className="modal-footer">
            <Button className="modal-action modal-close waves-effect waves-red btn" >
                        Close
            </Button>
         </div>
    </div>
      </div>
    );
};
  export default Logintoadd;