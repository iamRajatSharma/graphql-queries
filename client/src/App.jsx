import './App.css'
import { gql, useQuery } from "@apollo/client";
import ListGroup from 'react-bootstrap/ListGroup';


const query = gql`
   query TodoQuery{
        getTodos {
            id
            title
            completed    
        }
    }
`

function App() {
    const { data, loading } = useQuery(query)
    return (
        <>
            <div>
                <h1>Hello GraphQL</h1>
                {
                    loading ? <p>Loading...</p> : data.getTodos.map(todo => (
                        <ListGroup key={todo.id}>
                            <ListGroup.Item>{todo.id}</ListGroup.Item>
                            <ListGroup.Item>{todo.title}</ListGroup.Item>
                            <ListGroup.Item>{todo.completed ? 'Completed' : 'Not Completed'}</ListGroup.Item>
                        </ListGroup>
                    ))
                }
            </div>

        </>
    )
}

export default App
