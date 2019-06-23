import React, {Component} from 'react';
import {render} from 'react-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from 'axios';

var cart = [];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          products: [],
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

    createNotification(type, mensaje){
      console.log(type)
      return () => {
        switch (type) {
          case 'info':
            NotificationManager.info('Info message');
            break;
          case 'success':
            NotificationManager.success('Success message', mensaje);
            break;
          case 'warning':
            NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
            break;
          case 'error':
            NotificationManager.error('Error message', 'Click me!', 5000, () => {
              alert('callback');
            });
            break;
        }
      };
    };  
    
    
    render() {
      return (
        <div>
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

        cart.push(item);
        console.log("producto agreagado al carro", item.sku)
        console.log(cart)
        this.createNotification('success', 'Product ' + item.name +' added to cart')()       
        update_boleta(item)
      } 
  }
  
render(
    <App/>,document.getElementById('react-app')    
);



function update_boleta(){
  var counts = {};
  for (var i = 0; i < cart.length; i++) {
    var num = cart[i].sku;
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }
  var texto = "";
  console.log(counts);
  var doc = document.getElementById('boleta')
  doc.innerHTML = "<h3>Boleta</h3>";
  var total = 0;
  var agregados = []
  for (let index = 0; index < cart.length; index++) {
    const product = cart[index];
    if(!agregados.includes(product.sku)){
      doc.innerHTML +='<div class="product"><h5 class="card-title">'+product.name+'</h5><h7>Cantidad: '+counts[product.sku]+'</h7><button onClick=sacar()> Sacar</button></div>'    
      agregados.push(product.sku);
      if(texto == ""){
        texto += product.sku + ":" + counts[product.sku];
      }
      else{
        texto += ";" + product.sku + ":" + counts[product.sku];
      }
    }
    total += product.price;
  }
  doc.innerHTML += "<h4 id='total'>TOTAL = " + total + "</h4>"
  doc.innerHTML += "</br></br></br>"
  doc.innerHTML += "<button onclick=pagar()> PAGAR </button>"
  doc.innerHTML +="<h9 id='cart' class='hidde'>"+texto+"</h9>"
}

