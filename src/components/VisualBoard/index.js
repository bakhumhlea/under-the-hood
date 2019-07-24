import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag';
import { graphql ,Query } from 'react-apollo';
import query from './query';

import styles from './styles.scss';
import D3Project from '../D3Project';
import LoadingCircle from '../Loading/LoadingCircle';

class VisualBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gigId: ''
    }
  }

  handleClick(id) {
    this.setState({
      gigId: id
    })
  }

  render() {
    if (typeof this.props.data.gigs == 'undefined') {
      return (
          <div className={styles.visualPage}>
            <LoadingCircle/>
          </div>
        );
    }
    const { data } = this.props;
    return (
      <div className={styles.visualPage}>
        {/* <h1 className={styles.pageTitle}>Visual Board</h1> */}
        <D3Project/>
        <div className={styles.visualBoard}>
          {data.gigs.map((gig,i) => (
            <div className={styles.visualCard} key={i} onClick={()=>this.handleClick(gig._id)}>
              <h5 className={styles.cardTitle}>{gig.title}</h5>
              <p className={styles.cardOwner}>by {gig.owner.username}</p>
              <p className={styles.toolTag}>
                {gig.tools.map((t,i)=>(
                  <span key={i} className={styles.tag}>{t.name}</span>
                ))}
              </p>
            </div>
          ))}
        </div>
        <div>{this.state.gigId}</div>
      </div>
    )
  }
}

VisualBoard.propTypes = {
  user: PropTypes.string.isRequired
}

export default graphql(query,{}) (VisualBoard);
