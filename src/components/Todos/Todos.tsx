import { Card, Col, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./Todos.css";
import testData from "../../data/testData.json"

const Todos = () => {
  const currentDate = new Date();

  const [todos, setTodos] = useState(testData);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true); // Set loading before sending API request
    // TODO: Use fetch to handle GET API call to the backend for todo list data
    // fetch('https://some.api.com/data')
    //     .then(response => response.json())
    //     .then(data => {
    //         setTodos(data);
    //         setIsLoading(false);
    //     });
    fetch('https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/get', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'    
        }
   })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong: ' + response.status + " Error");
    })
    .then(data =>  {
      setIsLoading(false); // Stop loading response received
      console.log("success =========>", data)
      setTodos(data);
    })
    .catch(error => {
      setIsLoading(false); // Stop loading in case of error  
      console.error("error =========>",error)
    });
  }, []);

  useEffect(() => {

  }, [todos]);

  /**
   * Updates the status of a todo object and sends an updated PATCH request to the API
   * @param todoId 
   * @param newComplete 
   */
  function updateCompletedTodo(todoId: string, newComplete: boolean) {
    setTodos((prev) => {
      const newTodos = [...prev];
      const findTodoIndex = newTodos.findIndex((todo) => todo.id === todoId);
      newTodos[findTodoIndex].isComplete = newComplete;
      fetch(`https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/patch/${todoId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({isComplete: newTodos[findTodoIndex].isComplete }),
   })
    .then(response =>  {
      if (response.ok) {
        return response.json();
      }
      throw new Error ('Something went wrong: ' + response.status + " Error")
    })
    .then(data => console.log(data))
    .catch(error => console.error("error =========>",error));
    return newTodos;
    });
  }

  return (
    <div className="todo-cards">
      {/* Overdue items at the top */}
      {todos
        .filter(
          (todo) =>
            !todo.isComplete &&
            todo.dueDate !== null &&
            new Date(todo.dueDate) < currentDate
        )
        .sort((a, b) => {
          if (a.dueDate === b.dueDate) {
            return 0;
          }

          if (a.dueDate === null) {
            return 1;
          }

          if (b.dueDate === null) {
            return -1;
          }

          const dueDateA = new Date(a.dueDate);
          const dueDateB = new Date(b.dueDate);

          if (dueDateA < dueDateB) {
            return -1;
          }

          if (dueDateA > dueDateB) {
            return 1;
          }

          return 0;
        })
        .map((todo) => {
          return (
            <Card style={{ background: "#FF7F7F" }} className="mt-3">
              <Row>
                <Col>
                  <Card.Body>
                    <Form.Check
                      type="checkbox"
                      key={todo.id}
                      label={todo.description}
                      checked={todo.isComplete}
                      onChange={() =>
                        updateCompletedTodo(todo.id, !todo.isComplete)
                      }
                    ></Form.Check>
                  </Card.Body>
                </Col>
                <Col>{new Date(todo.dueDate).toLocaleDateString()}</Col>
              </Row>
            </Card>
          );
        })}
      {/* Sort by dates by due soonest and no due dates  */}
      {todos
        .filter(
          (todo) =>
            !todo.isComplete &&
            (todo.dueDate == null || new Date(todo.dueDate) > currentDate)
        )
        .sort((a, b) => {
          if (a.dueDate === b.dueDate) {
            return 0;
          }

          if (a.dueDate === null) {
            return 1;
          }

          if (b.dueDate === null) {
            return -1;
          }

          const dueDateA = new Date(a.dueDate);
          const dueDateB = new Date(b.dueDate);

          if (dueDateA < dueDateB) {
            return -1;
          }

          if (dueDateA > dueDateB) {
            return 1;
          }

          return 0;
        })
        .map((todo) => {
          return (
            <Card className="mt-3">
              <Row>
                <Col>
                  <Card.Body>
                    <Form.Check
                      type="checkbox"
                      key={todo.id}
                      label={todo.description}
                      checked={todo.isComplete}
                      onChange={() =>
                        updateCompletedTodo(todo.id, !todo.isComplete)
                      }
                    ></Form.Check>
                  </Card.Body>
                </Col>
                <Col>
                  {todo.dueDate !== null
                    ? new Date(todo.dueDate).toLocaleDateString()
                    : null}
                </Col>
              </Row>
            </Card>
          );
        })}
      {/* Completed items at the bottom */}
      {todos
        .filter((todo) => todo.isComplete)
        .sort((a, b) => {
          if (a.dueDate === b.dueDate) {
            return 0;
          }

          if (a.dueDate === null) {
            return 1;
          }

          if (b.dueDate === null) {
            return -1;
          }

          const dueDateA = new Date(a.dueDate);
          const dueDateB = new Date(b.dueDate);

          if (dueDateA < dueDateB) {
            return -1;
          }

          if (dueDateA > dueDateB) {
            return 1;
          }

          return 0;
        })
        .map((todo) => {
          return (
            <Card style={{ background: "#90ee90" }} className="mt-3">
              <Row>
                <Col>
                  <Card.Body>
                    <Form.Check
                      type="checkbox"
                      key={todo.id}
                      label={todo.description}
                      checked={todo.isComplete}
                      onChange={() =>
                        updateCompletedTodo(todo.id, !todo.isComplete)
                      }
                    ></Form.Check>
                  </Card.Body>
                </Col>
                <Col>
                  {todo.dueDate !== null
                    ? new Date(todo.dueDate).toLocaleDateString()
                    : null}
                </Col>
              </Row>
            </Card>
          );
        })}
    </div>
  );
};

export default Todos;
