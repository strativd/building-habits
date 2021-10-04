import styled from 'styled-components';
import React from 'react';

const ErrorStyles = styled.div`
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  border-left: 3px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 0.5rem;
  }
`;

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;

  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map((err, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <ErrorStyles key={index}>
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          {err.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyles>
    ));
  }

  return (
    <ErrorStyles>
      <p data-test="graphql-error">
        <strong>Shoot!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  );
};

export default DisplayError;
