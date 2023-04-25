export const apiUrl = {
  auth: {
    login: "http://localhost:4000/users/authenticate",
    register: "http://localhost:4000/users/register",
    getAll: "http://localhost:4000/users/authenticate",
    update: "http://localhost:4000/users",
  },
  task: {
    getAll: "http://localhost:4000/task/",
    getById: "http://localhost:4000/task/",
    getByUserId: "http://localhost:4000/task/dashboard",
    update: "http://localhost:4000/task/",
    delete: "http://localhost:4000/task/",
    create: "http://localhost:4000/task/create",
  },
  account: {
    register: "http://localhost:4000/accounts/register",
    authenticate: "http://localhost:4000/accounts/authenticate",
  },
}
