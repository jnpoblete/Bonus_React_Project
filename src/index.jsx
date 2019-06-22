import React, {Component} from 'react';
import {render} from 'react-dom';
import Products from './components/products.jsx';
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          products: [],
          cart:[],
        };
        this.handleClick = this.handleClick.bind(this);
      }


    componentDidMount() {
      var headerss = new Headers();
      headerss.append("group", "9");
      headerss.append('Access-Control-Allow-Origin', 'http://localhost:3000');
      headerss.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
      headerss.append('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X- Request-With');
      var miInit = { method: 'GET',
                headers:{    
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*' 
              },
               mode: 'cors',
               cache: 'default' };
      axios.get('http://tuerca9.ing.puc.cl/control/products/', miInit)
      .then(response =>response.data)
      .then((data) => {
        for (let index = 0; index < data.length; index++) {
          if((10001 <= data[index].sku && data[index].sku<= 10025) || (20001 <= data[index].sku && data[index].sku<= 20005) || (30001 <= data[index].sku && data[index].sku <= 30008)){
            this.setState({ products: [...this.state.products, data[index]] })
          }          
        }
      })
      .catch(console.log)
    }


    render() {
      return (
        <div>
          <center><h1>Our Products</h1></center>
          {this.state.products.map((product) => (
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{product.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{product.sku}</h6>
                {/* <p class="card-text">{product.name}</p> */}
                <button onClick={()=>{this.handleClick(product)}}> Add Cart</button>
              </div>
            </div>
          ))}
        </div>
      )
      }

      handleClick(item) {
        this.setState({ cart: [...this.state.cart, item] })
        console.log("producto agreagado al carro", item.sku)
        console.log(this.state.cart)
      }
      
  }


render(
    <App/>
    , document.getElementById('react-app')
);