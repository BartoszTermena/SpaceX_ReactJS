import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';
import Spinner from './spinner/Spinner';


const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
    launches {
        flight_number
        mission_name
        launch_date_local
        launch_success
    }
}
`;


class Launches extends Component {
    state = {
        search: ''
    }

    onchange = e =>{
        this.setState({ search : e.target.value });
    }
     
  render() {
    return (
      <div className="mt-5">
        <input 
        onChange={this.onchange}
        type="text" 
        placeholder="Search Launch..." 
        className="form-control"/>
        <MissionKey />
        <Query query={LAUNCHES_QUERY} >
            
            {({ loading, error, data }) => {
               
                if(loading) return <Spinner />
                if(error) console.log(error);
                const {search} = this.state;
                const filteredlaunches = data.launches.filter( launch =>{
                  return launch.mission_name.toLowerCase().indexOf( search.toLowerCase() ) !== -1
              })
                
                return (
                <Fragment>
                    {filteredlaunches.reverse().map(launch => (
                        <LaunchItem key={launch.flight_number} launch={launch}/>
                    ))}
                </Fragment>
                );
            }}
        </Query>
      </div>
    )
  }
}
export default Launches;