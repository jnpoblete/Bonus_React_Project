import axios from 'axios';


const id_productor = '5cbd31b7c445af0004739beb';

function pagar(){
    var carro = document.getElementById("cart").textContent.split(";");
    var counts  = {};
    for (var i = 0; i < carro.length; i++) {
        var key_val = carro[i].split(":");
        counts[key_val[0]] = key_val[1];
      }
    console.log(counts);
}

function crear_boleta(cliente){
    url = "https://integracion-2019-dev.herokuapp.com/sii/boleta";
    headers = {'Content-Type': 'application/json'};
    body = {
        "cliente": cliente,
        "proveedor": id_productor,
        "sku": "45",
        "fechaEntrega": 1493214596281,
        "cantidad": "10",
        "precioUnitario": "100",
        "canal": "b2b",
        "notas": "",
        "urlNotificacion": ""
    };
    axios.put(
        url, headers=headers, json=body
    )
    .then(r => console.log(r.status))
    .catch(e => console.log(e));
}


