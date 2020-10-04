import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { JobList } from "../Job/List";
import { loadCompany } from "../../graphql/queries";

export const CompanyDetail = ({ match }) => {
  const companyId = match.params.companyId;
  const { data, loading } = useQuery(loadCompany, {
    variables: { id: companyId },
  });
  const company = data ? data.company : {};

  if (loading) {
    return null;
  } else {
    const { name, description, jobs } = company;
    return (
      <div>
        <h1 className="title">{name}</h1>
        <div className="box">{description}</div>
        <h5 className="title is-5"> Jobs at {name}</h5>
        <JobList jobs={jobs} />
      </div>
    );
  }
};
