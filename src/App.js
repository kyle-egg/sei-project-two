import axios from 'axios'
import React from 'react'

function App() {
  let [data, setData] = React.useState(null)
  // const [hideAnswers, setHideAnswers] = React.useState(false)
  const score = []
  // const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  React.useEffect(() => {
    const getData = async () => {
      const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple') 
      setData(response.data.results)
    }
    getData()
    
  }, [ ])
  console.log(data)

  function findSpecial() {
    if (data && data.includes('&quot;')) {
      console.log(data.replaceAll('&quot;', '"'))
      data = data.replaceAll('&quot;', '"')
    }
    if (data && data.includes('&#039;')) {
      // eslint-disable-next-line quotes
      console.log(data.replaceAll('&#039;', "'"))
      // eslint-disable-next-line quotes
      data = data.replaceAll('&#039;', "'")
    }
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
      score.push(1)
      console.log(score)

    } else {
      e.target.classList.add('incorrect')
      score.push(0)
      console.log(score)

    }

  }

  return (
    <section className="section">
      <div className="container">
        {data && data.map(ques => (
          <div key={ques.question}>
            <h1 className="title">{ques.question}</h1>
            <p className="code is-hidden">
              {ques.incorrect_answers.push(ques.correct_answer)}
              {ques.incorrect_answers.sort()}
              
            </p>
            {/* {!hideAnswers &&
            <div> */}
            <button className="button" onClick={handleAnswer}>{ques.incorrect_answers[0]}</button>
            <button className="button" onClick={handleAnswer}>{ques.incorrect_answers[1]}</button>
            <button className="button" onClick={handleAnswer}>{ques.incorrect_answers[2]}</button>
            <button className="button" onClick={handleAnswer}>{ques.incorrect_answers[3]}</button>
            {/* </div>} */}

          </div>
        ))}
      </div>
    </section>

  )
}
export default App