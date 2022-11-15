import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'libs/shared/data-access/src/lib/graphql/schema.graphql',
  documents: 'libs/front/data-access/src/lib/graphql/**/*.graphql',
  generates: {
    'libs/front/data-access/src/lib/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
        {
          add: {
            content: [
              '/* eslint-disable @typescript-eslint/ban-ts-comment */',
              '// @ts-nocheck',
            ],
          },
        },
      ],
    },
  },
};
export default config;
