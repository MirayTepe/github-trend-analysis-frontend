import React from 'react';


const RepositoryItem = ({ repository }) => {
  return (
    <li className="repository-item">
      <h3>
        <a href={repository.html_url} target="_blank" rel="noopener noreferrer">
          {repository.name} 📚
        </a>
      </h3>
      <p>{repository.description}</p>
      <ul className="repository-meta">
        <li>
          <span>URL: <a href={repository.html_url} target="_blank" rel="noopener noreferrer">{repository.html_url}</a> 🌎</span>
        </li>
        <li>
          <span>Topics: {repository.topics && repository.topics.length > 0 ? repository.topics.map(topic => topic.topic).join(', ') : 'N/A'} 🌎</span>
        </li>
        <li>
          <span>License: {repository.license?.name || 'N/A'} 📝</span>
        </li>
        <li>
          <span>Language: {repository.language?.name || 'N/A'} 💻</span>
        </li>
        <li>
          <span>Forks: {repository.forks_count} 🍴</span>
        </li>
        <li>
          <span>Stars: {repository.stargazers_count} ⭐️</span>
        </li>
        <li>
          <span>Watchers: {repository.watchers_count} 👀</span>
        </li>
        <li>
          <span>Open Issues: {repository.open_issues_count} 🚨</span>
        </li>
        <li>
          <span>Created At: {new Date(repository.created_at).toLocaleDateString()} 📆</span>
        </li>
        <li>
          <span>Updated At: {new Date(repository.updated_at).toLocaleDateString()} 📆</span>
        </li>
        <li>
          <span>Pushed At: {new Date(repository.pushed_at).toLocaleDateString()} 📆</span>
        </li>
      </ul>
    </li>
  );
};

export default RepositoryItem;
