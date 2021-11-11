import React from 'react'
import{Link } from 'react-router-dom'


export const Home = () => {
    return (
        <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">JUST RUN </h1>
          <p className="lead">
            This site is for running enthusiasts who wanna run and help the other runners to find the routes of the city.All you need to do is Sign Up/Sign In to start.
          </p>
          <div className="buttons">
            <Link to='/register' className="btn btn-primary">Sign Up</Link>
         
          </div>
        </div>
      </div>
    </section>
    )
}
export default Home;