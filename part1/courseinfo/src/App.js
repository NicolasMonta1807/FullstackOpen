const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
)

const Content = (props) => (
  <div>
    <Part name={props.names[0]} exercises={props.exercises[0]} />
    <Part name={props.names[1]} exercises={props.exercises[1]} />
    <Part name={props.names[2]} exercises={props.exercises[2]} />
  </div>
)

const Total = (props) => (
  <p>Number of exercises {props.totalExercises}</p>
)

const App = () => {

  const course = "Half Stack application development"
  const part1 = "Introduction to react"
  const exercises1 = 10
  const part2 = "Using props to pass data"
  const exercises2 = 7
  const part3 = "State of a component"
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content names={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]} />
      <Total totalExercises={exercises1 + exercises2 + exercises3} />
    </div>
  );
}

export default App;
