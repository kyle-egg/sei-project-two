import axios from 'axios'
import React from 'react'

function App() {
  // console.log(process.env.REACT_APP_MY_API_KEY)
  const [data, setData] = React.useState(null)
  const [iAnsOne, setIAnsOne] = React.useState(null)
  const [iAnsTwo, setIAnsTwo] = React.useState(null)
  const [iAnsThree, setIAnsThree] = React.useState(null)
  const [cAns, setCAns] = React.useState(null)

  const handleRefresh = () => location.reload()

  const handleAnswer = (e) => {
    console.log(e.target.textContent.length)
    console.log(cAns.length)
    // console.log(e.target)
    if (e.target.textContent === cAns) {
      e.target.classList.add('correct')

    } else {
      e.target.classList.add('incorrect')

    }
  }

  React.useEffect(() => {
    const getData = async () => {
      const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple') 
      // setData(response.data)
      setData((response.data.results[0].question))
      // console.log(response.data)
      
      setIAnsOne(response.data.results[0].incorrect_answers[0])
      setIAnsTwo(response.data.results[0].incorrect_answers[1])
      setIAnsThree(response.data.results[0].incorrect_answers[2])
      setCAns(response.data.results[0].correct_answer)
    }
    getData()
  }, [ ])

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">{data}</h1>
        <div>
          <div>
            <div>
              <button className="button" onClick={handleAnswer}>{iAnsOne}</button>
              <button className="button" onClick={handleAnswer}>{iAnsTwo}</button>
            </div>
            <div>
              <button className="button" onClick={handleAnswer}>{iAnsThree}</button>
              <button className="button" onClick={handleAnswer}>{cAns}</button>
            </div>
          </div>
        </div>
        <button className="button" onClick={handleRefresh} > Give Me Another Question! </button>
      </div>
    </section>
  )
}
export default App