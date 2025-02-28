const express = require("express");
const port = 3000;
const cors = require("cors");
const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4");
const { default: axios } = require("axios");
const Todo = require("./todos")
const User = require("./users")

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs:
            `
            type Todo{
                id: ID!
                title: String!
                completed: Boolean!
                user: User!
            }

            type User{
                id: ID!
                name: String!
                email: String!
                phone: String!
                website: String!
            }

            type Query{
                getTodos: [Todo]
                getUsers:[User]
                getOneTodo(id: ID!): Todo
                getOneUser(id: ID!): User
            }
            `
        ,
        resolvers: {
            Todo: {
                user: async (todo) => {
                    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`);
                    return data;
                }
            },
            Query: {
                getTodos: async () => {
                    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos/`);
                    return data
                },
                getUsers: async () => {
                    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/`);
                    return data
                },
                getOneTodo: async (_, args) => {
                    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos/${args.id}`);
                    return data;
                },
                getOneUser: async (_, args) => {
                    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${args.id}`);
                    return data;
                }
            }
        }
    })

    app.use(express.json());
    app.use(cors());

    await server.start();

    app.use("/graphql", expressMiddleware(server));
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

startServer();

