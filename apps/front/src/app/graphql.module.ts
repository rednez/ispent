import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Observable } from '@apollo/client/core';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../environments/environment';
import firebase from 'firebase/compat/app';

function createApollo(httpLink: HttpLink) {
  const uri = environment.apollo.uri;
  const basic = setContext(() => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext(() => {
    const token = sessionStorage.getItem('accessToken');

    if (!token) {
      return {};
    } else {
      return {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      };
    }
  });

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      if (graphQLErrors[0].message.includes('Firebase ID token has expired')) {
        return new Observable((observer) => {
          firebase
            .auth()
            .currentUser?.getIdToken(true)
            .then((idToken) => {
              sessionStorage.setItem('accessToken', idToken);

              operation.setContext(({ headers = {} }) => {
                return {
                  headers: {
                    ...headers,
                    Authorization: 'Bearer ' + idToken,
                  },
                };
              });

              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              };

              forward(operation).subscribe(subscriber);
            })
            .catch((error) => {
              observer.error(error);
            });
        });
      }
    }
  });

  return {
    cache: new InMemoryCache(),
    link: ApolloLink.from([basic, auth, errorLink, httpLink.create({ uri })]),
  };
}

@NgModule({
  exports: [CommonModule, ApolloModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphqlModule {}
