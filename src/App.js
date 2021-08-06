import axios from 'axios'
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'

function App() {
  let [data, setData] = React.useState(null)
  const scoreDisplay = document.querySelector('#score-display')
  let score = 0

  React.useEffect(() => {
    const getData = async () => {
      const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple') 
      setData(response.data.results)
    }
    getData()
    
  }, [ ])
  // console.log(data)

  function handleRefresh() {
    location.reload()
  }
  
  function findSpecial() {
    console.log(data)
    data && data.map(clense => {
      console.log(clense.question)
      if (data && clense.question.includes('&quot;')) {
        clense.question = clense.question.replaceAll('&quot;', '"')
        console.log(data)
      }
      
      if (data && clense.question.includes('&#039;')) {
        // eslint-disable-next-line quotes
        clense.question = clense.question.replaceAll('&#039;', "'")
        console.log(data)
      }
      if (data && clense.question.includes('&eacute;')) {
        clense.question = clense.question.replaceAll('&eacute;', 'é')
      }
      if (data && clense.question.includes('&amp;')) {
        clense.question = clense.question.replaceAll('&amp;', '&')
      }
      if (data && clense.question.includes('&shy;')) {
        clense.question = clense.question.replaceAll('&shy;', '')
      }
      if (data && clense.incorrect_answers.includes('&quot;')) {
        clense.incorrect_answers = clense.incorrect_answers.replaceAll('&quot;', '"')
        console.log(data)
      }
      if (data && clense.incorrect_answers.includes('&#039;')) {
        // eslint-disable-next-line quotes
        clense.incorrect_answers = clense.incorrect_answers.replaceAll('&#039;', "'")
        console.log(data)
      }
      if (data && clense.incorrect_answers.includes('&eacute;')) {
        clense.incorrect_answers = clense.incorrect_answers.replaceAll('&eacute;', 'é')
      }
      if (data && clense.incorrect_answers.includes('&amp;')) {
        clense.incorrect_answers = clense.incorrect_answers.replaceAll('&amp;', '&')
      }
      if (data && clense.incorrect_answers.includes('&shy;')) {
        clense.incorrect_answers = clense.incorrect_answers.replaceAll('&shy;', '')
      }
      if (data && clense.correct_answer.includes('&quot;')) {
        clense.correct_answer = clense.correct_answer.replaceAll('&quot;', '"')
        console.log(data)
      }
      if (data && clense.correct_answer.includes('&#039;')) {
        // eslint-disable-next-line quotes
        clense.correct_answer = clense.correct_answer.replaceAll('&#039;', "'")
        console.log(data)
      }
      if (data && clense.correct_answer.includes('&eacute;')) {
        clense.correct_answer = clense.correct_answer.replaceAll('&eacute;', 'é')
      }
      if (data && clense.correct_answer.includes('&amp;')) {
        clense.correct_answer = clense.correct_answer.replaceAll('&amp;', '&')
      }
      if (data && clense.correct_answer.includes('&shy;')) {
        clense.correct_answer = clense.correct_answer.replaceAll('&shy;', '')
      }
    }
    )
  }
  

  // In what year was Pok&eacute;mon Diamond &amp; Pearl released in Japan?

  findSpecial()
  // console.log(data)

  const handleAnswer = (e) => {
    const correctAns = data.map(ques => (ques.correct_answer))
    // setHideAnswers(!hideAnswers)
    console.log(correctAns)
    console.log(e.target.textContent)

    if (correctAns.includes(e.target.textContent)) {
      e.target.classList.add('correct')
      score += 100
      scoreDisplay.textContent = score
      console.log(score)

    } else {
      e.target.classList.add('incorrect')
      console.log(score)

    }

  }

  return (
    <BrowserRouter>
      <>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/quiz">
            <section className="section">
              {console.log(data)}
              <div className="container is-max-desktop">
                <h2 className="title score">Your Score: <span id="score-display"></span></h2>
                {data && data.map(ques => (
                  <div className="qwrapper container" key={ques.question}>
                    <h1 className="title">{ques.question}</h1>
                    <p className="code is-hidden">
                      {ques.incorrect_answers.push(ques.correct_answer)}
                      {ques.incorrect_answers.sort()}
                    </p>
                    <button className="button" onClick={handleAnswer}>{ques.incorrect_answers[0]}</button>
                    <button className="button" onClick={handleAnswer}>{ques.incorrect_answers[1]}</button>
                    <button className="button" onClick={handleAnswer}>{ques.incorrect_answers[2]}</button>
                    <button className="button" onClick={handleAnswer}>{ques.incorrect_answers[3]}</button>
                  </div>
                ))}
              </div>
              <button className="button" onClick={handleRefresh}>Give Me More Questions!</button>

            </section>
          </Route>
        </Switch>
      </>
    </BrowserRouter>
  )
}
export default App