import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost'

import { isLoggedIn, getAccessToken } from "../auth";
import { addJob, listJobs, loadJob, loadCompany } from "./queries";

const SERVER_URL = 'http://localhost:9000/graphql'


const authlink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    operation.setContext({
      headers: {
        'authorization': 'Bearer ' + getAccessToken()
      },
    });
  }
  return forward(operation);
});

export const client = new ApolloClient({
  link: ApolloLink.from([
    authlink,
    new HttpLink({ uri: SERVER_URL })
  ]),
  cache: new InMemoryCache(),
});


export const createJob = async (input) => {
  const { data } = await client.mutate({
    mutation: addJob,
    variables: {input},
    update: (cache, data) => {
      cache.writeQuery({ 
        query: loadJob,
        variables: { id: data.job.id},
        data
      })
    }
  });
  return data;
}; 

export const loadJobs = async () => {
  const { data } = await client.query({ 
    query: listJobs, 
    fetchPolicy: 'no-cache'
  });
  return data.jobs;
}; 


export const getJob = async (id) => {
  const { data } = await client.query({ query: loadJob, variables: {id} });  
  return data.job; 
};

export const getCompay = async (id) => {
  const { data } = await client.query({ query: loadCompany, variables: { id } });  
    return data.company; 
};
