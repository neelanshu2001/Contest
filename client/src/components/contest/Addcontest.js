import React, { useContext } from 'react';
import { Form, FormGroup, Label, Input,Button } from 'reactstrap';
import ContestContext from '../../context/contests/contestContext';
// const platforms = [
//   "Codeforces",
//   "Atcoder",
//   "Codechef",
//   "Hackerearth",
//   "Leetcode"
// ];
const Addcontest= () => {
  const contestContext = useContext(ContestContext);
  const { addContest,getContests,getDayContest } = contestContext;
  const [state, setState] = React.useState({
    platform: '',
    title: '',
    startdate: '',
    starttime: '',
    enddate: '',
    endtime: '',
    link: ''
  })
    const platform=state.platform;
    const title=state.title;
    const startdate=state.startdate;
    const starttime=state.starttime;
    const enddate=state.enddate;
    const endtime=state.endtime;
    const link=state.link;
    const enabled= platform.length>0 && title.length>0 && startdate.length>0 && starttime.length>0 && enddate.length>0 && endtime.length>0 && link.length>0
   
    const onChange = (e) => {
      setState({ ...state,
         [e.target.name]:e.target.value 
      });
    };
    const onSubmit = (e) =>{
      e.preventDefault();
      const newContest = {
        platform:state.platform,
        title:state.title,
        startdate:state.startdate,
        starttime:state.starttime,
        enddate:state.enddate,
        endtime:state.endtime,
        link: state.link
      }
      addContest(newContest); 
      setState(
        {
        platform: '',
    title: '',
    startdate: '',
    starttime: '',
    enddate: '',
    endtime: '',
    link: ''
        }
      )
      getContests();
      getDayContest();
    }
    return (
        <div id='addcontest' className="modal">
        <div className='modal-content'>
        <div className='text-center text-5xl text-black-300 font-bold mb-12'>
          Add Contest
          </div>
          <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label for="platform" >Platform</Label>
        <Input
          type="text"
          name="platform"
          id="platform"
          placeholder="Enter Platform"
          onChange={onChange}
          value={state.platform}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
          placeholder="Enter Title of Contest"
          onChange={onChange}
          value={state.title}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="link">Link</Label>
        <Input
          type="text"
          name="link"
          id="link"
          placeholder="Enter Link of Contest"
          onChange={onChange}
          value={state.link}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="startdate">Start Date</Label>
        <Input
          type="date"
          name="startdate"
          id="startdate"
          placeholder="Enter start date of Contest"
          onChange={onChange}
          value={state.startdate}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="starttime">Start Time</Label>
        <Input
          type="time"
          name="starttime"
          id="starttime"
          placeholder="Enter start time of Contest"
          onChange={onChange}
          value={state.starttime}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="enddate">End Date</Label>
        <Input
          type="date"
          name="enddate"
          id="enddate"
          placeholder="Enter end date of Contest"
          onChange={onChange}
          value={state.enddate}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="endtime">End Time</Label>
        <Input
          type="time"
          name="endtime"
          id="endtime"
          placeholder="Enter end time of Contest"
          onChange={onChange}
          value={state.endtime}
          required
        />
      </FormGroup>
          <Button className="modal-action modal-close waves-effect waves-red btn" disabled={!enabled}>
                    Add Contest
          </Button>
      </Form>
    </div>
      </div>
    );
};
  export default Addcontest;