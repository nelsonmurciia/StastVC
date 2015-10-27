var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');

var parseFeed = function(data) {
  var items = [];
   {
    // muestra cantidad usuarios
     var usuarios = 'Usuarios:';
      var cargas = 'Cargas:';
      var retiros = 'Retiros:';
     var cargarp = 'Cargas pendts:';
     var retirosp = 'Retiros pendts:';

    // cantidad 
    var cant_usr = data.total_all;
    var cargar_usr = data.cargarpp;
    var retiros_usr = data.retiropp;
    var carga_pen = data.cargarp;
    var retiros_pen = data.retirop;
    
   

    // Add to menu items array
    items.push({
      title:usuarios,
      subtitle:cant_usr,
    });
        items.push({
      title:cargas,
      subtitle:cargar_usr
    }); 
            items.push({
      title:retiros,
      subtitle:retiros_usr
    });  
            items.push({
      title:cargarp,
      subtitle:carga_pen
    }); 
           items.push({
      title:retirosp,
      subtitle:retiros_pen
    }); 
     
  }

  // Finally return whole array
  return items;
};


var splashWindow = new UI.Window();

// Text element to inform user
var text = new UI.Text({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  text:'Descargando información',
  font:'GOTHIC_28_BOLD',
  color:'blue',
  textOverflow:'wrap',
  textAlign:'center',
	backgroundColor:'GColorVividCerulean'

});

// Add to splashWindow and show
splashWindow.add(text);
splashWindow.show();


ajax(
  {
    url:'https://virtualconex.com/apppebble/statsVC.php',
    type:'json'
  },
  function(data) {
    // Create an array of Menu items
    var menuItems = parseFeed(data);

    // Construct Menu to show to user
    var resultsMenu = new UI.Menu({
      sections: [{
        title: 'VirtualConex - Stats',
        items: menuItems
      }]
    });

    // Show the Menu, hide the splash
    resultsMenu.show();
    splashWindow.hide();
  },
  function(error) {
    console.log('Download failed: ' + error);
  }
);