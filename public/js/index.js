

const id_productor = '5cbd31b7c445af0004739beb';
var apiKey = "R&FTHQi3AkqUx%6";
var direction = "";
var total = 0;

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

async function crear_boleta(){
    var client_id = document.getElementById("client_id").value;
    var client_name = document.getElementById("client_name").value;
    total = document.getElementById('total').textContent.split("=")[1];
    console.log(total);
    console.log(client_id);
    console.log(client_name);
    url = "https://integracion-2019-dev.herokuapp.com/sii/boleta";
    body = {
        "proveedor": id_productor,
        "cliente":client_id,
        "total":total,
    };
    var miInit = { 
        method: 'POST',
        headers:{    
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' 
            },
            mode: 'cors',
            cache: 'default',
            json:body,
    };
    await axios.get(url, miInit)
    .then(response =>response.data)
    .then((data) => {
    })
    .catch(console.log)
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
