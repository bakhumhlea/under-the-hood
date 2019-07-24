import gql from 'graphql-tag'

const query = gql`
    query user($_id: String) {
      user(_id:$_id) {
        username
        email
      }
    }
  `
export default query;
