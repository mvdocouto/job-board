import React from "react";
import { Link } from "react-router-dom";

const Job = ({ job }) => {
  const { company, title, id } = job;
  const text = company ? `${title} at ${company.name}` : title;

  return (
    <li className="media" key={id}>
      <div className="media-content">
        <Link to={`/jobs/${id}`}>{text}</Link>
      </div>
    </li>
  );
};

export const JobList = ({ jobs }) => (
  <ul className="box">
    {jobs.map((job, index) => (
      <Job key={index} job={job} />
    ))}
  </ul>
);
