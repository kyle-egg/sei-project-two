import { Link } from 'react-router-dom'

function Home () {
  return (
    <Link to="/quiz">
      <section className="hero">
        <div className="hero-body">
          <p className="title">
      Welcome to the Pub Quiz Generator!
          </p>
          <p className="subtitle">
      Grab a beer and enjoy! 
            <br>
            </br>
      Click anywhere to start the Quiz!
          </p>
        </div>

      </section>
    </Link>
  )
}

export default Home