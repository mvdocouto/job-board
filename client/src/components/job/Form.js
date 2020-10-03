import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useMutation } from "@apollo/react-hooks";
import { addJob } from "../../graphql/queries";

export const JobForm = () => {
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

  const { title, description } = job;

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="input"
                style={{ height: "10em" }}
                name="description"
                value={description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleClick}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
