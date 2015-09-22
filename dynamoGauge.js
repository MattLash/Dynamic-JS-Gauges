   //create all radial gauges:
  function createGauge(gaugeID, score, color){
    var canvas = document.getElementById(gaugeID);
    var ctx = canvas.getContext("2d");
    var winWidth = window.innerWidth;
    var pi = Math.PI;

    if(winWidth >1200){
        ctx.canvas.width = 180;
        ctx.canvas.height = 180;
      } else if(winWidth > 600 && winWidth<=1200){
        ctx.canvas.width = 150;
        ctx.canvas.height = 150;
      } else {
        ctx.canvas.width = 100;
        ctx.canvas.height = 100;
      }

    //------------------------------------ //
    //-------internal parameters-----------//

    var canvasColor = "#333";
    var bgColor = "#E2E2E2";
    var gColor = color;
    var W = canvas.width;
    var H = canvas.height;
    var gDiameter = W/3;
    var gWidth = W/18;
    var gOrigin = -pi/2; //origin is at the top (phased ccw 90deg by -pi/2)
    var gStop = 2*pi - pi/2; //also at the top, but wound around 2pi
    var angle = -pi/2; //initialized at the origin
    var finalPercent = score; //we want 2pi to correspond with 100%, and also shifted backward pi/2
    var percent = 0;

    setInterval(animateGauge, 30);

    function animateGauge(){

      //clear canvas 
      ctx.fillStyle = canvasColor;
      ctx.fillRect(0,0,W,H);

       //draw background of gauge
      ctx.strokeStyle = bgColor;
      ctx.lineWidth = gWidth;
      ctx.beginPath();
      ctx.arc(W/2,H/2,gDiameter,gOrigin,gStop);
      ctx.stroke();

      //text of percentage 
      ctx.fillStyle = gColor;
      ctx.font = "20px Helvetica";
      text = percent + "%";
      text_width = ctx.measureText(text).width;
      ctx.fillText(text, W/2 - text_width/2, H/2+5); 

      //redraw gauge at increased percent level 
      ctx.beginPath();
      ctx.strokeStyle = gColor;
      ctx.lineWidth = gWidth;
      angle = (percent)*2*pi/100-pi/2; //convert percent to radians
      ctx.arc(W/2, H/2, gDiameter, gOrigin, angle);
      ctx.stroke();

      //add one until percent reaches final
      if(percent<finalPercent){
        percent+=1;
      }else{
        clearInterval(animateGauge);
      } // /else
    } // /animateGauge
  } // /createGauge

  function gaugeOnScroll(){
    var scrolled = $window.scrollTop();
    var win_height_padded = $window.height()*.9;

    $('#software-skills:not(.animated)').each(function(){
      var $targetObject = $(this); //cache the current object #software-skills
      var offsetTop = $targetObject.offset().top;
      if(scrolled + win_height_padded > offsetTop){
        createGauge("gauge6", 70, "#44A0CC"); 
        createGauge("gauge7", 55, "#44A0CC"); 
        createGauge("gauge8", 50, "#44A0CC"); 
        createGauge("gauge9", 22, "#44A0CC"); 
        createGauge("gauge10", 36, "#44A0CC"); 
        $targetObject.addClass(' animated ');
      }
    }); 
  } // /gaugeOnScroll

   $window.on('scroll', gaugeOnScroll); 
