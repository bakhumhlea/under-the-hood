import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_GIGS = gql`
  query {
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
    }
  }
`
const Dashboard = () => (
    <Query query={GET_GIGS}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Aww! Error occor</div>
        return (
          <div className="restaurant-list">
            {data.gigs.map((gig,i) => (
              <div className="list-card">
                <h5>{gig.title}</h5>
                <p>{gig.owner.username}</p>
              </div>
            ))}
          </div>
        )
      }}
    </Query>
  )


export default Dashboard;
