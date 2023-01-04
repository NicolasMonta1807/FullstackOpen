const Header = ({course}) => (
  <h1>{course}</h1>
)

const Part = ({name, exercises}) => (
  <p>
    {name} {exercises}
  </p>
)

const Content = ({parts}) => (
  <>
    {parts.map((part, index) => (
      <Part name={part.name} exercises={part.exercises} key={index}/>
    ))}
  </>
)


const Total = ({parts}) => (
  <p>
    Total Exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}
  </p>
)

const App = () => {
  const course = "Half Stack application development"
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
}

export default App;
