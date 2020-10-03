import React, { useState } from 'react';
import { useQuery} from '@apollo/react-hooks'
import { JobList } from './List';
import { listJobs } from "../../graphql/queries";

 export const JobBoard = () => {
  
  const [jobs, setJobs] = useState([])
  useQuery(listJobs, {
    onCompleted: (data) => {
      setJobs(data.jobs)
    }
  });

  return (
      <div>
        <h1 className="title">Job Board</h1>
        <JobList jobs={jobs} />
      </div>
    )

} 