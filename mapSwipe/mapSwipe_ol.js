/*!
*** AUTHOR
    Bikram Shakya

*** BUILD DATE
    May 6, 2020

*** REFERENCE SITE
    https://gist.github.com/PiotrKrosniak/8731842
    https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-compare/   
*/

var mapSwipe=function(map,view){
    var self = this;
    var _map=map;
    var _mapDiv=$('#'+_map.getTarget());

    var _rmap;
    var _rmapDiv;
    var _swipeStarted;

    

    //var _rmap_id='r_swipe_'+_mapDiv.attr('id');

    _rmapDiv = $('<div />').insertBefore(_mapDiv);
    _rmapDiv.addClass(_mapDiv.attr('class'));
    _rmapDiv.addClass(_mapDiv.attr('style'));
    //_rmapDiv.css({'top':'400px'})

    //resize_rMapDiv();
    

    var _view = view;
    _rmap=new ol.Map({
        target: _rmapDiv[0],
        //layers: layers,                    
        view: _view
    });
   
    var _swipeBar=$('<div class="mapSwipe-bar"/>').insertAfter(_mapDiv);
    var _swipeHandle=$('<div class="mapSwipe-handle"/>').appendTo(_swipeBar);
    _swipeBar.hide();

    _swipeHandle.mousedown(function(){
        _swipeStarted=true;
    })
    
    var topLimit= _mapDiv.offset().top;
    var leftLimit = _mapDiv.offset().left;
    var bottomLimit = topLimit+_swipeBar.height();

    function clipMap(epx){
        _mapDiv.css({
            'clip': 'rect(0px, '+epx+'px, '+bottomLimit+'px, 0px)'
        })
    }

    $(document).mouseup(function(e){
        _swipeStarted=false;       
    })

    $(document).mousemove(function(event){
        if(!_swipeStarted)
            return;
        var py=event.pageY - topLimit;
        if(py<(30))
            py=30
        
        if(py>(_swipeBar.height()-20))
            py=_swipeBar.height()-20;

        _swipeHandle.css({
            'top':py +'px',
        })

        var px = event.pageX -leftLimit;
        if(px<0)
            px=0;

        if(px>_mapDiv.width()-1)
            px=_mapDiv.width()-1;
            
        _swipeBar.css({
            'left':px +'px'
        })

         clipMap(event.pageX-leftLimit);
        
    })

    return{
        start:function(){
            startSwipe();
        },
        stop:function(){
            stopSwipe();
        },
        getMap:function(){return _rmap;},
        getDiv:function(){return _rmap.getDiv();},

    }

    function startSwipe(){
        _swipeBar.show();
         clipMap(_swipeBar.position().left);
    }
    
    function stopSwipe(){
        _mapDiv.css({'clip':''});
        _swipeBar.hide();
    }

   
    function resize_rMapDiv(){
        _rmapDiv.width(_mapDiv.width()).height(_mapDiv.height());
    }
}