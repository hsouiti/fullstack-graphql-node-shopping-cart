import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { Header, Footer } from '../components'
import { Home, Products, NoMatch } from '../pages'


const AppRouter = () => {
  return (
    <Container maxWidth="xl">
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/products' component={Products} />
          <Route component={NoMatch} />
        </Switch>
        <Footer />
      </Router>
    </Container>
  )
}

export default AppRouter
