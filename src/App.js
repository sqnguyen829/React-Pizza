import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state={
    pizzas:[],
    currentPizza:{
      id:0,
      topping:'',
      size:'',
      vegetarian:false
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
    .then(res => res.json())
    .then(data => {
      this.setState({
        pizzas:data
      })
    })
  }

  pickPizza = (pizza) => {
    this.setState({
      currentPizza:pizza
    })
  }

  handleTopping = (value) => {
    console.log(value)
    this.setState({
      currentPizza:{
        ...this.state.currentPizza,
        topping:value
      }
    })
  }

  handleSize = (value) => {
    this.setState({
      currentPizza:{
        ...this.state.currentPizza,
        size:value
      }
    })
  }

  handleVegetarian= (value) => {
    this.setState({
      currentPizza:{
        ...this.state.currentPizza,
        vegetarian:value
      }
    })
  }

  handleSubmit = () => {
    if(this.state.currentPizza.id!==0){
      fetch(`http://localhost:3000/pizzas/${this.state.currentPizza.id}`, {
        method:'PATCH',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(this.state.currentPizza)
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          pizzas: this.state.pizzas.map(pizza => pizza.id === data.id? data : pizza)
        })
      })
    }
  }

  render() {
    let pizza = this.state.pizzas
    console.log(this.state.currentPizza)
    return (
      <Fragment>
        <Header/>
        <PizzaForm  pizza={this.state.currentPizza} 
                    check={this.state.check} 
                    handleCheck={this.handleCheck} 
                    handleSize={this.handleSize}
                    handleTopping={this.handleTopping}
                    handleVegetarian={this.handleVegetarian}
                    handleSubmit={this.handleSubmit}
        />
        <PizzaList pizzas={pizza} pickPizza = {this.pickPizza}/>
      </Fragment>
    );
  }
}

export default App;
