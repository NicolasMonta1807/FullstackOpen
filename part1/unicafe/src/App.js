import { useState } from 'react'

const FeedbackButton = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ values }) => {

  const allFeedbacks = values.good + values.neutral + values.bad

  if (allFeedbacks === 0) {
    return (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="No feedback given" />
          </tbody>
        </table>
      </>
    )
  }

  const calculateAverage = () => ((values.good - values.bad) / allFeedbacks)

  const calculatePositive = () => ((values.good * 100) / allFeedbacks)

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good: " value={values.good}></StatisticLine>
          <StatisticLine text="Neutral: " value={values.neutral}></StatisticLine>
          <StatisticLine text="Bad: " value={values.bad}></StatisticLine>
          <StatisticLine text="All: " value={allFeedbacks}></StatisticLine>
          <StatisticLine text="Average: " value={calculateAverage()}></StatisticLine>
          <StatisticLine text="Positive: " value={calculatePositive()}></StatisticLine>
        </tbody>
      </table>
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
