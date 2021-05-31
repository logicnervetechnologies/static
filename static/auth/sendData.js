var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

$( "form" ).submit(function( event ) {
    var data = $( this ).serializeArray();
    var newData = new Object();
    newData.name = data[0].value;
    newData.email = data[1].value;
    newData.selection = data[2].value;
    console.log(JSON.stringify(newData));
    $.ajax({
          url:"http://localhost:5000/getinfo ",
          type:"POST",
  
          data: newData,
          success:function(response) {
            //document.getElementById("total_items").value=response;
           document.getElementById("disp").innerHTML =response;
         },
         error:function(){
          alert("error");
         }
  
        });
        
    event.preventDefault();
});