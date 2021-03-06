import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { GitHubQuery, GitHubQueryVariables } from './__generated__/git-hub-query';

const repositoryFragment = gql`
  fragment RepositoryFragment on Repository {
    description
  }
`;

const query = gql`
  ${repositoryFragment}
  query GitHubQuery($first: Int!) {
    viewer {
      repositories(first: $first) {
        nodes {
          id
          ...RepositoryFragment
        }
      }
    }
  }
`;

export default () => {
  const { data } = useQuery<GitHubQuery, GitHubQueryVariables>(query, { variables: { first: 100 } });
  if (!data) return null;
  return (
    <ul>
      {data.viewer!.repositories!.nodes!.map(repo => (
        <li key={repo!.id}>
          <span>{repo!.description}</span>
        </li>
      ))}
    </ul>
  );
};
