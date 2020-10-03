import { useState } from "react";
import { useHistory } from "react-router-dom";

import { useMutation } from "@apollo/react-hooks";
import { addJob } from "../graphql/queries";


export const useCreateJob = () => {
  const [job, setJob] = useState({});
  const history = useHistory();

  const [createJob] = useMutation(addJob, {
    onCompleted: ({ createJob }) => {
      history.push(`/jobs/${createJob.id}`);
    },
  });

  const handleChange = (event) => {
    const auxValues = { ...job };
    auxValues[event.target.name] = event.target.value;
    setJob(auxValues);
  };

  const handleClick = (event) => {
    event.preventDefault();
    const { title, description } = job;
    createJob({
      variables: {
        input: { title, description },
      },
    });
  };

  return {
    job,
    handleChange,
    handleClick
  };
};
