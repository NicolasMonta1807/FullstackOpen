import { useState } from 'react'

const FeedbackButton = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ values }) => {
  console.log(values);
  return (
    <>
      <h2>Statistics</h2>
      <p>Good: {values[0]}</p>
      <p>Neutral: {values[1]}</p>
      <p>Bad: {values[2]}</p>
    </>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => { setGood(good + 1) }

  const handleNeutralClick = () => { setNeutral(neutral + 1) }

  const handleBadClick = () => { setBad(bad + 1) }

  return (
    <>
      <h1>Give feedback</h1>
      <FeedbackButton text="Good" handleClick={handleGoodClick} />
      <FeedbackButton text="Neutral" handleClick={handleNeutralClick} />
      <FeedbackButton text="Bad" handleClick={handleBadClick} />
      <Statistics values={[good, neutral, bad]} />
    </>
  );
}

export default App;
