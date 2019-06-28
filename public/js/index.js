
var apiKey = "R&FTHQi3AkqUx%6";
var direction = "";
var total = 0;
var url_actual = window.location.href;
const url_pago_dev = 'https://integracion-2019-dev.herokuapp.com';
const url_pago_prod = 'https://integracion-2019-prod.herokuapp.com';
var url_sitio_pago1 = "/web/pagoenlinea?callbackUrl=";
const URL_OK = url_actual + "postpago";
const struct_fail = "&cancelUrl=";
const URL_FAIL = url_actual + "close"
const boleta_id = "&boletaId=";
var dev = 'true';
var id_productor = '5cc66e378820160004a4c3c4';
if(dev == 'true'){
    id_productor = '5cbd31b7c445af0004739beb';
}  
function pagar(){
    var carro = document.getElementById("cart").textContent.split(";");
    var counts  = {};
    for (var i = 0; i < carro.length; i++) {
        var key_val = carro[i].split(":");
        counts[key_val[0]] = key_val[1];
      }
    open_form();
    console.log(counts);
}
var doc_map = document.getElementById("map");
var datos_boleta = "";
async function crear_boleta(){
    var client_id = document.getElementById("client_id").value;
    var client_name = document.getElementById("client_name").value;
    total = document.getElementById('total').textContent.split("=")[1];
    console.log(total);
    console.log(client_id);
    console.log(client_name);
    url = "https://integracion-2019-prod.herokuapp.com/sii/boleta"
    if(dev == "true"){
    url = "https://integracion-2019-dev.herokuapp.com/sii/boleta";
    }
    body = {
        'cliente':client_id,
        'proveedor':id_productor,
        'total':parseInt(total),
    };
    const params = new URLSearchParams();
    params.append('cliente', client_id);
    params.append('proveedor', id_productor);
    params.append('total', parseInt(total));      
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    doc_map.style.backgroundColor = "white";
    doc_map.innerHTML = "<h3 class='centered'> LOADING </h3>";
    console.log("CART ", document.getElementById("cart").textContent);
    await axios.post(url, params, config)    
    // await axios.post(url, body, {headers: headers})
    .then(response =>response.data)
    .then((data) => {
        console.log("funciono");
       datos_boleta = data;
        render_pre_boleta();
    })
    .catch(console.log)
}


function render_pre_boleta(){
    var data = datos_boleta;
    doc_map.innerHTML = "<h2> Pre-Boleta </h2>";
    doc_map.innerHTML += "<h4> Id: "+data['_id']+" </h4>";
    doc_map.innerHTML += "<h4> Cliente: "+client_name+" </h4>";
    doc_map.innerHTML += "<h4> Fecha Creacion: "+data['created_at']+" </h4>";
    doc_map.innerHTML += "<h4> Bruto: $"+data['bruto']+" </h4>";
    doc_map.innerHTML += "<h4> Iva: $"+data['iva']+" </h4>";
    doc_map.innerHTML += "<h4> Total: $"+parseInt(total)+" </h4>";
    doc_map.innerHTML += "<h4> Despachar a: "+direction+" </h4>";
    var btn = document.getElementById("btn_pagar");
    btn.style.display = 'none';
    doc_map.innerHTML += "<br></br>";
    doc_map.innerHTML += "<h3 id='redirigiendo'>REDIRIGIENDO...</h3>";
    doc_map.innerHTML += "<button type='button' id='btn_reintentar' class='btn' onclick='crear_boleta()'>Reintentar Pago</button>";
    doc_map.innerHTML += "<div id='loader' class='loader'></div>"
    document.getElementById('btn_reintentar').style.display = 'none';
    sleep(3000).then(() => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('redirigiendo').style.display = 'none';
        document.getElementById('btn_reintentar').style.display = 'block';
        redirigi_pago(data['_id'], data['oc'], client_id);       
    });              
}


function redirigi_pago(id_boleta, oc, client_id){
    var url_pagar = "";
    var ok = '&id_boleta=' + id_boleta +'&cart='+ document.getElementById("cart").textContent +'&total='+parseInt(total)+'&oc='+oc + "&almacen_id="+client_id;
    url_pagar = url_pago_prod + url_sitio_pago1 + encodeURIComponent(URL_OK + ok) +struct_fail +encodeURIComponent(URL_FAIL) + boleta_id + id_boleta;
    if(dev == "true"){
        url_pagar = url_pago_dev + url_sitio_pago1 + encodeURIComponent(URL_OK + ok) + struct_fail +encodeURIComponent(URL_FAIL) + boleta_id + id_boleta;
    }

    console.log(url_pagar);
    var win = window.open(url_pagar, '_blank');
    win.focus();
}

function open_form(){
    document.getElementById("myForm").style.display = "inline-block";
    init_map();
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  function init_map(){

  var 
    vectorSource = new ol.source.Vector(),
    vectorLayer = new ol.layer.Vector({
      source: vectorSource
    }),
    olview = new ol.View({
        center: ol.proj.fromLonLat([-70.6472400, -33.4726900]),
        zoom: 10,
        minZoom: 2,
        maxZoom: 20
    }),
    map = new ol.Map({
        target: document.getElementById('map'),
        view: olview,
        layers: [
            new ol.layer.Tile({
                style: 'Aerial',
                source: new ol.source.OSM()
            }),
            vectorLayer
        ]
    });

  var iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: '//raw.githubusercontent.com/jonataswalker/map-utils/master/images/marker.png'
    }),
    text: new ol.style.Text({
        font: '12px Calibri,sans-serif',
        fill: new ol.style.Fill({ color: '#000' }),
        stroke: new ol.style.Stroke({
            color: '#fff', width: 2
        }),
        text: 'Direccion'
    })
});
map.on('click', function(evt){
    var feature = new ol.Feature(
        new ol.geom.Point(evt.coordinate)
    );
    direction = evt.coordinate;
    feature.setStyle(iconStyle);
    vectorSource.addFeature(feature);
    var doc = document.getElementById("client_direction");
    doc.value = direction[0] + ","+direction[1];
});

}



// sleep time expects milliseconds
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
