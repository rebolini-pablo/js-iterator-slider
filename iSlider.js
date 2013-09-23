/**
 * JS Iterator Pattern for image slider.
 * @author Rebolini Pablo <rebolini.pablo@gmail.com>
 */
var iSlider = (function(){
	"use strict";
	
    if(!window.iS_Conf) throw 'Objeto maestro no encotrado. Slider abortado';
	if(!window.$ || !window.jQuery) throw 'Libreria jQuery no encontrada. Slider abortado.';
    
    var index   = 0
    ,    data   = window.iS_Conf
    ,    length = data.length
    ,    _objDiv= $('#iSlider');
    
    return{        
        next: function() {
             var element;
             if (!this.hasNext()) {
                 return null;
             }
             index += 1;
             element = data[index];
             return element;
        },
        hasNext: function() {
           return index < length;
        },                
        rewind: function() {
            index = 0;
            return data[index];
        },
        current: function() {
            return data[index];
        },      
        transition: function(obj){
            if(obj.hasOwnProperty('ruta')){
                _objDiv.fadeOut(5000, function(){                             
                    _objDiv.css({background:'url('+obj.ruta+') left center no-repeat fixed'}).fadeIn(5000, function(){
                        iSlider.play();
                    });
                });
            }
        },
        play : function(){
            if(this.hasNext()) {
                this.transition(this.current());
                this.next();
            }else{
                this.rewind(); 
                this.play();
           } 
        }
    };
}());