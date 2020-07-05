import { testConn } from './src/test-utils/testConn';
import { Connection } from 'typeorm';
import { gCall } from './src/test-utils/gCall';

let connection: Connection;
beforeAll(async () => {
  connection = await testConn();
});

afterAll(async () => {
  await connection.close();
})


const registrationTestBob = {
  id: 'create user bob',
  query: `
  mutation($firstName:String!) {
    register(firstName: $firstName)
  }
  `,
  variables: {
    firstName: 'bob'
  },
  context: {},
  expected: {
    data: {register: 'bob'}
  }
}

const registerMutation = `
  mutation($firstName:String!) {
    register(firstName: $firstName)
  }
`;


describe('register', () => {
  const cases = [registrationTestBob];
  cases.forEach(obj => {
    const {id, query, variables, expected} = obj;
    it(`query: ${id}`, async () => {
      const response = await gCall({
        source: query,
        variableValues: variables
      });
      expect(response).toEqual(expected);
    });
  });
});