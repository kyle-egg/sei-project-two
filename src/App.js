import axios from 'axios'
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home'

function App() {
  const [data, setData] = React.useState(null)
  const [score, setScore] = React.useState(0)
  const isLoading = !data
  
  React.useEffect(() => {
    const getData = async () => {
      const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple') 
      const rawData = response.data.results
      const refData = rawData.map((item, index) => {
        const answer = decodeData(item.correct_answer)
        const options = [ 
          ...item.incorrect_answers.map(answer => decodeData(answer)), 
          answer
        ]
        return {
          id: `${index}-${Date.now()}`,
          questions: decodeData(item.question),
          answer: answer,
          options: options.sort(),
        }
      })
      setData(refData)
    }
    getData()
    
  }, [])
  
  // *** Data Decoding Function
  function decodeData(str) {
    const dataCleaner = document.createElement('textarea')
    dataCleaner.innerHTML = str
    return dataCleaner.value
  }
  const handleAnswer = (e) => {
    const correctAns = data.map(ans => (ans.answer))
    if (correctAns.includes(e.target.textContent)) {
      setScore(score + 10)
      e.target.classList.add('correct')
    } else {
      setScore(score - 5)
      e.target.classList.add('incorrect')
    }
  }
  const handleMoreQs = () => {
    location.href = '/quiz'
  }
  const handleHome = () => {
    location.href = '/'
  }

  return (
    <BrowserRouter>
      <Route exact path="/">
        <Home />   
      </Route>
      <Route exact path="/quiz">
        <section className="section">
          <div className="container is-max-desktop">
            <div>
              <h2 id="score" className="title">Score: {score}</h2>
            </div>
            {!isLoading && data.map(card => (
              <div key={card.id} className="qwrapper container">
                <h2 className="title">{card.questions}</h2>
                <div>
                  <button className="button" onClick={handleAnswer}>{card.options[0]}</button>
                  <button className="button" onClick={handleAnswer}>{card.options[1]}</button>
                  <button className="button" onClick={handleAnswer}>{card.options[2]}</button>
                  <button className="button" onClick={handleAnswer}>{card.options[3]}</button>
                </div>
              </div>
            ))}
          </div>
          <h2 id="score" className="title">Score: {score}</h2>
          <button className="button" onClick={handleMoreQs}>Play Again!</button>
          <button className="button" onClick={handleHome}>Take me home!</button>
        </section>
      </Route>
    </BrowserRouter>
  )
}
export default App