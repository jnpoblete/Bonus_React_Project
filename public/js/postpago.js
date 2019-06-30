function load(){
    var actual_url = window.location.href;
    var datos_url = actual_url.split('&');
    var id_boleta = datos_url[1].split('=')[1];
    var cart = datos_url[2].split('=')[1];
    var total = datos_url[3].split('=')[1];
    var oc = datos_url[4].split('=')[1];
    var client_id = datos_url[5].split('=')[1];
    var doc = document.getElementById('datos');
    doc.innerHTML = "<h3>Boleta: "+id_boleta+"</h3>";
    doc.innerHTML += "<h3><strong>--------------------------------------------</strong></h3>";
    doc.innerHTML += "<h3>SKU____________________________CANTIDAD</h3>";
    var array1 = cart.split(";");
    for (let index = 0; index < array1.length; index++) {
        var elem = array1[index].split(":")
        doc.innerHTML += "<h3>"+elem[0]+"____________________________"+elem[1]+"</h3>";
    }
    doc.innerHTML += "<h3><strong>--------------------------------------------</strong></h3>";
    doc.innerHTML += "<h3>Bruto: $"+parseInt(total)*(1-0.19)+"</h3>";
    doc.innerHTML += "<h3>Iva: $"+parseInt(total)*(0.19)+"</h3>";
    doc.innerHTML += "<h3>Total: $"+total+"</h3>";
    console.log(actual_url);
    console.log(datos_url);
    console.log(id_boleta);
    console.log(cart);
    console.log(total);
    console.log(oc);
    console.log(client_id)
    crear_orden(cart, oc, client_id);
}

async function crear_orden(cart, oc, client_id){
    url = "http://tuerca9.ing.puc.cl/orders2";
    // url = "http://localhost:8000/orders2";
    //UNA ORDEN POR SKU
    // CART DEL TIPO 20003:2;10001:1
    var array = cart.split(";");
    for (let index = 0; index < array.length; index++) {
        var elem = array[index].split(":")
        const params = {'sku':elem[0], 'cantidad':parseInt(elem[1]), 'almacenId': client_id, 'oc': oc}
        // const params = new URLSearchParams();
        // console.log("SKU: ", elem[0]);
        // console.log("CANTIDAD: ", elem[1]);
        // console.log("ALMACENID: ", client_id);
        // console.log("OC: ", oc);
        // params.append('sku', elem[0]);
        // params.append('cantidad',elem[1]);
        // params.append('almacenId', client_id);   
        // params.append('oc', oc);      
        const config = {
            headers: {
                'group': '9'
            }
        }
        await axios.post(url, params, config)    
        .then(response =>response.data)
        .then((data) => {
            console.log("ORDEN CREADA");                
        })
        .catch(console.log)                
    }
}

load();