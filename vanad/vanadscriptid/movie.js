/**
 * Created by Mattias on 18.01.2015.
 */

var anim = new Animation('3s', {x: 880, y:475}, {easing: function(x) {return x*x}});
new Rect(75,90,120,100,5).attr({'fillColor': 'red', rotation: Math.PI/180*28}).addTo(stage).animate(anim);
new Path([50,150, 50,650, 1000,650]).attr("fillColor", "gray").addTo(stage);



/*
Lisada jõud F, millega mõjutatakse keha mingi kraadi võrra mingi tugevusega
Keha võib ka liikuda alt üles, sellel juhul alustada alt, mitte üleval; seistes läheks siis keskelt.
Lisada erinevad kastid, andmed.
Arvutaks välja joonte pikkused vastavalt jõu tugevustele!!!
 */