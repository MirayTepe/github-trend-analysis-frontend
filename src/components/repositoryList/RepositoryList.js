import React from 'react';
import RepositoryItem from './RepositoryItem';
import Spinner from '../spinner/Spinner';
import styles from './RepositoryStyles.css';

const RepositoryList = ({ repositories, isLoading }) => {
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ul className="repository-list">
      {repositories.map((repository) => (
        <RepositoryItem key={repository.id} repository={repository} />
      ))}
    </ul>
  );
};

export default RepositoryList;
