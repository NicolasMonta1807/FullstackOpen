import { useState } from 'react'

const FeedbackButton = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ values }) => {

  const allFeedbacks = values.good + values.neutral + values.bad

  const calculateAverage = () => ((values.good - values.bad) / allFeedbacks)

  const calculatePositive = () => ((values.good * 100) / allFeedbacks)

  return (
    <>
      <h2>Statistics</h2>
      <p>Good: {values.good}</p>
      <p>Neutral: {values.neutral}</p>
      <p>Bad: {values.bad}</p>
      <h3>Totals:</h3>
      <p>All: {allFeedbacks}</p>
      <p>Average: {calculateAverage()}</p>
      <p>Positive: {calculatePositive()}%</p>
    </>
  )
}

function App() {
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const handleGoodClick = () => {
    setFeedbacks({ ...feedbacks, good: feedbacks.good + 1 })
  }

  const handleNeutralClick = () => {
    setFeedbacks({ ...feedbacks, neutral: feedbacks.neutral + 1 })
  }

  const handleBadClick = () => {
    setFeedbacks({ ...feedbacks, bad: feedbacks.bad + 1 })
  }

  return (
    <>
      <h1>Give feedback</h1>
      <FeedbackButton text="Good" handleClick={handleGoodClick} />
      <FeedbackButton text="Neutral" handleClick={handleNeutralClick} />
      <FeedbackButton text="Bad" handleClick={handleBadClick} />
      <Statistics values={feedbacks} />
    </>
  );
}

export default App;
