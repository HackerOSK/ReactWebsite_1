import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://6000-idx-reactwebsite1git-1733035550236.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev/',
    headers: {
      Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LXJlYWN0d2Vic2l0ZTFnaXQtMTczMzAzNTU1MDIzNi5jbHVzdGVyLWUzd3Y2YXdlcjVoN2t2YXl5Zm9laW4ydTRhLmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTczMzk3NTUxMywiZXhwIjoxNzM0MDYxOTEzfQ.bfmnUyyOquDEnIe76XMEunJM7FlyYRqy7YjVIWJcIQzcyDktJaC_luDV5ELX2JyGnaiIZ4-AnStYbt-2ovApiaot_Sr0wwt_3EZpslIEP1T93pubkH-wD_uJqUvdHudS3TVqfQelOsm5A35XiHrQ-pc7T0Hy4IIk5sNlyo0n2T-eJdow3w6rgTxwN-vzniJu8zjCirBrZdOH8wh6sST9GOpcmdf1v6-0X8K2jpXczypI50yjNrP3CX5IlNHyOJsWozRE0cTEFYi0kytV8gbKYaCKpuwMuyZtgG1RXB4p4a_P5tCrdTFuyrrLjColiBQJxos82FBIxdaEzxXOsS0SnA`, // Include JWT
    },
  }),
  cache: new InMemoryCache(),
});

export const ethClient = new ApolloClient({
    link: new HttpLink({
      uri: 'https://5000-idx-reactwebsite1git-1733035550236.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev/',
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LXJlYWN0d2Vic2l0ZTFnaXQtMTczMzAzNTU1MDIzNi5jbHVzdGVyLWUzd3Y2YXdlcjVoN2t2YXl5Zm9laW4ydTRhLmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTczMzk3NTUxMywiZXhwIjoxNzM0MDYxOTEzfQ.bfmnUyyOquDEnIe76XMEunJM7FlyYRqy7YjVIWJcIQzcyDktJaC_luDV5ELX2JyGnaiIZ4-AnStYbt-2ovApiaot_Sr0wwt_3EZpslIEP1T93pubkH-wD_uJqUvdHudS3TVqfQelOsm5A35XiHrQ-pc7T0Hy4IIk5sNlyo0n2T-eJdow3w6rgTxwN-vzniJu8zjCirBrZdOH8wh6sST9GOpcmdf1v6-0X8K2jpXczypI50yjNrP3CX5IlNHyOJsWozRE0cTEFYi0kytV8gbKYaCKpuwMuyZtgG1RXB4p4a_P5tCrdTFuyrrLjColiBQJxos82FBIxdaEzxXOsS0SnA`, // Include JWT
      },
    }),
    cache: new InMemoryCache(),
  });

export default client;
