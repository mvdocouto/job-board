const db = require("./db");

const Query = {
  jobs: () => db.jobs.list(),
  job: (root, { id }) => db.jobs.get(id),
  companies: () => db.companies.list(),
  company: (root, { id }) => db.companies.get(id),
  users: () => db.users.list(),
  user: (root, { email, password }) => db.users.get(email, password),
};

const Mutation = {
  createJob: (root, { input }, {user} ) => {
    if(!user){
      throw new Error('unauthorized')
    }
    const id = db.jobs.create({ ...input, companyId: user.companyId });
    return db.jobs.get(id)
  }
}

const Job = {
  company: (job) => db.companies.get(job.companyId)
};

const User = {
  company: (job) => db.companies.get(job.companyId),
};

const Company = {
  jobs: (company) => db.jobs.list()
    .filter((job) => job.companyId === company.id)
};

module.exports = { Query, Mutation, Job, User, Company };  