import dotenv from 'dotenv';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { getMockFiles } from './helpers/getMockFiles';
import { Mock, MockRequestType } from './mock.interface';

dotenv.config();

const port: number = Number(process.env.PORT || 3000);
const corsOrigin: string = process.env.CORS_ORIGIN || '*';
const corsCredentials: boolean = process.env.CORS_CREDENTIALS === 'true';

const serverAddress = `http://localhost:${port}`;

const mocks = getMockFiles();

if (mocks.length === 0) {
  console.warn('\n[WARN] No mock data found!\n');

  process.exit(0);
}

const app = fastify();

app.register(cors, {
  origin: corsOrigin,
  credentials: corsCredentials,
});

mocks.forEach((mock) => {
  const basePath = mock.replace(/\.json$/, '');
  const mockData: Mock = require(`../data/${mock}`);

  console.log(`┌ \`${basePath}\` API`);
  Object.keys(mockData).forEach((route) => {
    const { method, response } = mockData[route];
    route = route.replace(/^\//, '');

    app[method.toLowerCase() as MockRequestType](
      `/${basePath}/${route}`,
      async (request, reply) => {
        reply.code(response.code);

        return response.body;
      },
    );

    console.log(`├─── ${method} ${serverAddress}/${basePath}/${route}`);
  });

  console.log('│');
});

const start = async () => {
  try {
    await app.listen({ port });

    console.log('│');
    console.log('├───────────────────────────────────────────────────┐');
    console.log(`│  ProtoVerse is running on ${serverAddress}/  │`);
    console.log('└───────────────────────────────────────────────────┘');
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
