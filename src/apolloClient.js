import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://6000-idx-reactwebsite1git-1733035550236.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev/',
    headers: {
      Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LXJlYWN0d2Vic2l0ZTFnaXQtMTczMzAzNTU1MDIzNi5jbHVzdGVyLWUzd3Y2YXdlcjVoN2t2YXl5Zm9laW4ydTRhLmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTczMzkxODkxMSwiZXhwIjoxNzM0MDA1MzExfQ.EpKe4F8UAaAryJN5Hv1Q60901m1xcF_7XEzbhBAo7Zn6NTug_zTvNZp9niBmj2Q-bK1aTw5hWEaSzorYWracAZtve1g8ewUNeGqSU4dh5Nr4WqhJJiKZoYf8BacZm6mXpCgOwdmW4EXv_-nZROY103H4T7akcH8sTsDTz28OdJhzx45OHhroCeAxvMAb4k_S0lAWnQKhKnbwszHx2u_H7C4lM2-wTcS3qy644Uadwy_HohpPhBkqmK5_WQzQfAPt8yu3F81L0RLil6bPgv1Sud6aXlxsHNiN9fH5QEh6BmDl9pD2CjZhmz5hrzbO2AsAeAibC_rdRIeJaSw4zbWmQw`, // Include JWT
    },
  }),
  cache: new InMemoryCache(),
});

export const ethClient = new ApolloClient({
    link: new HttpLink({
      uri: 'https://5000-idx-reactwebsite1git-1733035550236.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev/',
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LXJlYWN0d2Vic2l0ZTFnaXQtMTczMzAzNTU1MDIzNi5jbHVzdGVyLWUzd3Y2YXdlcjVoN2t2YXl5Zm9laW4ydTRhLmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTczMzkxODkxMSwiZXhwIjoxNzM0MDA1MzExfQ.EpKe4F8UAaAryJN5Hv1Q60901m1xcF_7XEzbhBAo7Zn6NTug_zTvNZp9niBmj2Q-bK1aTw5hWEaSzorYWracAZtve1g8ewUNeGqSU4dh5Nr4WqhJJiKZoYf8BacZm6mXpCgOwdmW4EXv_-nZROY103H4T7akcH8sTsDTz28OdJhzx45OHhroCeAxvMAb4k_S0lAWnQKhKnbwszHx2u_H7C4lM2-wTcS3qy644Uadwy_HohpPhBkqmK5_WQzQfAPt8yu3F81L0RLil6bPgv1Sud6aXlxsHNiN9fH5QEh6BmDl9pD2CjZhmz5hrzbO2AsAeAibC_rdRIeJaSw4zbWmQw`, // Include JWT
      },
    }),
    cache: new InMemoryCache(),
  });

export default client;
