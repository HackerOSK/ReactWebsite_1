import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://6000-idx-reactwebsite1git-1733035550236.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev/',
    headers: {
      Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LXJlYWN0d2Vic2l0ZTFnaXQtMTczMzAzNTU1MDIzNi5jbHVzdGVyLWUzd3Y2YXdlcjVoN2t2YXl5Zm9laW4ydTRhLmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTczMzgzMTk3MCwiZXhwIjoxNzMzOTE4MzcwfQ.Te9yB_o_BKzyyaTGD9Icv1a01l3H_VRhSAsSwOfVnuKV8z81rU7GMLVM3ZINhs2M_1ZiMTKiH0ktwYCYknDQ5s_b5q0jZt017e1ZeEo_b15RCLcFJgWxMsWZsz8DbNRyn6WWkbCD0jHw4Y0wyU3N2nPWN6Nw1CYTvKTYSL7S6D6JEwmdqnqUw8i8e_sXnlXOKSbBBSFARfxHQYuYA2J6cXqHTscaajT_C1cBBD2Zh7BDjvrSIOec7qlfwpbGSrn2Ep14KKAo9pRTdoHN-poeO06cf6ENj2OEUzI3RSy159-5s-wsDhc7c4akEIL6JRQa9jc_8DtPGRHM9xBiahxQvg`, // Include JWT
    },
  }),
  cache: new InMemoryCache(),
});

export const ethClient = new ApolloClient({
    link: new HttpLink({
      uri: 'https://5000-idx-reactwebsite1git-1733035550236.cluster-e3wv6awer5h7kvayyfoein2u4a.cloudworkstations.dev/',
      headers: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LXJlYWN0d2Vic2l0ZTFnaXQtMTczMzAzNTU1MDIzNi5jbHVzdGVyLWUzd3Y2YXdlcjVoN2t2YXl5Zm9laW4ydTRhLmNsb3Vkd29ya3N0YXRpb25zLmRldiIsImlhdCI6MTczMzgzMTk3MCwiZXhwIjoxNzMzOTE4MzcwfQ.Te9yB_o_BKzyyaTGD9Icv1a01l3H_VRhSAsSwOfVnuKV8z81rU7GMLVM3ZINhs2M_1ZiMTKiH0ktwYCYknDQ5s_b5q0jZt017e1ZeEo_b15RCLcFJgWxMsWZsz8DbNRyn6WWkbCD0jHw4Y0wyU3N2nPWN6Nw1CYTvKTYSL7S6D6JEwmdqnqUw8i8e_sXnlXOKSbBBSFARfxHQYuYA2J6cXqHTscaajT_C1cBBD2Zh7BDjvrSIOec7qlfwpbGSrn2Ep14KKAo9pRTdoHN-poeO06cf6ENj2OEUzI3RSy159-5s-wsDhc7c4akEIL6JRQa9jc_8DtPGRHM9xBiahxQvg`, // Include JWT
      },
    }),
    cache: new InMemoryCache(),
  });

export default client;
