import gql from 'graphql-tag';

const query = gql`
  query gigs {
    gigs {
      _id
      owner {
        username
      }
      title
      desc
      likes {
        count
      }
      views {
        count
      }
      tools {
        name
      }
    }
  }
`

export default query;