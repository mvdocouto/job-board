import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getJob } from "../../requests";

export class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {job: null};
  }

  async componentDidMount(){
    const { jobId } = this.props.match.params
    const job = await getJob(jobId);
    this.setState({ job })  
  }

  render() {
    const {job} = this.state;
    if(!job){
      return null;
    }
    return (
      <div>
        <h1 className="title">{job.title}</h1>
        <h2 className="subtitle">
          <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
        </h2>
        <div className="box">{job.description}</div>
      </div>
    );
  }
}


// TODO Refactor to function

// const fetchJob  = async (jobId) => {
//   const response = await getJob(jobId);
//   return response;
// }

// export const JobDetail = () => {
//   const { jobId } = useParams();
//   const [job, setJob] = useState(null);
  
//   useEffect(async () => {
//     const data = await getJob(jobId);
//     setJob(data);
//   }, [setJob, jobId]);

//   if (!job) {
//     return null;
//   }
//   return (
//     <div>
//       <h1 className="title">{job.title}</h1>
//       <h2 className="subtitle">
//         <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
//       </h2>
//       <div className="box">{job.description}</div>
//     </div>
//   ); 
// }