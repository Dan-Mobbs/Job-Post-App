import React, { useState } from 'react';
import './App.css';
import useFetchJobs from './useFetchJobs';
import { Container  } from 'react-bootstrap';
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';

function App() {  
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const { jobs, loading, error, hasNextPage} = useFetchJobs(params, page)

  function handleParamChange(e) {
    const param = e.target.name
    const value = e.target.value
    setPage(1)
    setParams(prevParams => {
      return { ...prevParams, [param]: value }

    })
  }

  return (
    <>
      <Container className="my-4">
        
          <h1>GitHub Jobs for Beginners</h1>
        <SearchForm params={params} onParamChange={handleParamChange} />
        <JobsPagination page={page} setPage={setPage} hasNextPage={true} />
          { loading && <h1>Loading...</h1>  } 
          { error && <h1>Error, try refreshing page...</h1>  }
          {jobs.map(job => {
            return <Job key={job.id} job={job} />
          })} 
        <JobsPagination page={page} setPage={setPage} hasNextPage={true}></JobsPagination>
        {hasNextPage}
        
      </Container>
    </>
  );

}

export default App;
