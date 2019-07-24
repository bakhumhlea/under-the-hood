export default `
  type User {
    _id: String
    username: String
    email: String
  }
  type Query {
    user(_id: String!): User
    users: [User]
  }
  type Mutation {
    addUser(username: String!, email: String!): User
    editUser(_id: String!, username: String, email: String): User
    deleteUser(_id: String): User
  }
`;