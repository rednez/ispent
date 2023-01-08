import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../environments/environment';

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

  return {
    cache: new InMemoryCache(),
    link: ApolloLink.from([basic, auth, httpLink.create({ uri })]),
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
