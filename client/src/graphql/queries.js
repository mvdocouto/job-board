import gql from 'graphql-tag'

const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    title
    description
    company {
      id
      name
      description
    }
  }
`;

export const listJobs = gql`
  {
    jobs {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

export const loadJob = gql`
  query getJob($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

export const loadCompany = gql`
  query getCompany($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
        description
      }
    }
  }
`;

export const addJob = gql`
  mutation createJob($input: CreateJobInput!) {
    createJob(input: $input) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;