import { useQuery } from '@apollo/client';

import { CURRENT_USER_QUERY } from './graphql/users';

export default function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);

  return data?.authenticatedItem;
}
