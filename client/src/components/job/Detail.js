import React from "react";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { loadJob } from "../../graphql/queries";

export const JobDetail = ({ match }) => {
  const jobId = match.params.jobId;
  const { data, loading } = useQuery(loadJob, {
    variables: { id: jobId },
  });
  const job = data ? data.job : {};

  if (loading) {
    return <ReactPlaceholder showLoadingAnimation type="media" rows={5} />;
  } else {
    const { title, company, description } = job;
    return (
      <div>
        <h1 className="title">{title}</h1>
        <h2 className="subtitle">
          <Link to={`/companies/${company.id}`}>{company.name}</Link>
        </h2>
        <div className="box">{description}</div>
      </div>
    );
  }
};
