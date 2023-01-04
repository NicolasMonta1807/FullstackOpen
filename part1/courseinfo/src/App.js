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
    <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
    <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
    <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
  </div>
)

const Total = (props) => (
  <p>Number of exercises {props.totalExercises}</p>
)

const App = () => {
  const course = "Half Stack application development"
  const part1 = {
    name: "Introduction to react",
    exercises: 10
  }
  const part2 = {
    name: "Using props to pass data",
    exercises: 7
  }
  const part3 = {
    name: "State of a component",
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total totalExercises={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
}

export default App;
