import React from 'react';
import PropTypes from 'prop-types';

export function FetchResults(results) {
  return results.map(result => (<li key={result.id}>{result.description}</li>));
}


export default function Fetch({ status, results, onFetchClick }) {
  return (
    <div>
      <div>{status}</div>
      <button onClick={() => onFetchClick('http://localhost:3000/api/test.json')} className="fetch-request" >Fetch something</button>
      <ul>
        {FetchResults(results)}
      </ul>
    </div>
  );
}

Fetch.propTypes = {
  status: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  onFetchClick: PropTypes.func.isRequired
};
