
	var barSelected = "progress-bar1";
	var total  = 0;
	var data;
	/*Function to update slider value on click of button*/
	function sliderUpdation(event){
		var value = parseInt(event.currentTarget.textContent);
		var width = parseInt(document.getElementById(barSelected).style.width.split('%')[0]);
		if(total === 0){
			total = width;
		}
		total = total + value;
		if(total>100){
			document.getElementById(barSelected).style.backgroundColor = "#FF5722";
			document.getElementById(barSelected).style.width = '100%';
			if(data.limit>=total){
				document.getElementById(barSelected).previousElementSibling.innerHTML = total+'%';
			}else{
				document.getElementById(barSelected).previousElementSibling.innerHTML = data.limit+'%';
				total = data.limit;
			}

		}else{
			document.getElementById(barSelected).style.backgroundColor = "rgba(0, 150, 136, 0.33)";
			if(total<=0){
				total = 0;
				document.getElementById(barSelected).style.width = total+'%';
			}else{
				document.getElementById(barSelected).style.width = total+'%';
			}
			
			document.getElementById(barSelected).previousElementSibling.innerHTML = total+'%';
		  
		}
	};
	/*Function to create buttons*/
	function createButtons(){
		var i=0;
		var length = data.buttons.length;
		var parentElem = document.getElementById('buttons');
		for(;i<length;){
		  var elem = document.createElement("button");   
		  var textNode = document.createTextNode(""+data.buttons[i]);
		  elem.appendChild(textNode);
		  elem.addEventListener('click',sliderUpdation);
		  parentElem.appendChild(elem);
		  i++;
		}
	};
	/*Function to create drop down for selecting slider bars dynamically*/
	function createDropDownForSelectingBars(){
		var i=0;
		var length =data.bars.length;
		var parentElem = document.getElementById('buttons');
		var elem = document.createElement("select");
		
		for(;i<length;){
		     
		  var option = document.createElement("option");
		  var k = i+1;
		  option.value = "progress-bar"+k;
		  var j = i+1;
		  option.text = "Progress Bar "+j;
		  elem.appendChild(option);
		  i++;
		}
		
		elem.addEventListener('change',function(event){
			barSelected = event.currentTarget.value;
			total = 0;

		});
		parentElem.appendChild(elem);
	};
	/*Function to create slider bars*/
	function createBars(){
		var i=0;
		var length = data.bars.length;
		var parentElem = document.getElementById('bars');
		for(;i<length;){
		  var elem = document.createElement("div");
		  elem.className = 'parent-progress-bar';
		  var childElem = document.createElement("div"); 
		  childElem.className = 'progress-bars';
		  var k = i+1;
		  childElem.id="progress-bar"+k;
		  var textNode = document.createTextNode(data.bars[i]+"%");
		  var textDisplayElem = document.createElement("div"); 
		  textDisplayElem.appendChild(textNode);
		  textDisplayElem.className = 'bar-progress-data';
		  elem.appendChild(textDisplayElem);
		  elem.appendChild(childElem);
		  parentElem.appendChild(elem);
		  childElem.style.width = data.bars[i]+"%";
		  i++;
		}
	};
	/*Self Invoking Function : It is used to load data via ajax request*/
	(function loadData() {
	    var xmlhttp = new XMLHttpRequest();

	    xmlhttp.onreadystatechange = function() {
	        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
	           if (xmlhttp.status == 200) {
	           	
	               data = JSON.parse(xmlhttp.responseText);
	               createBars();
	               createDropDownForSelectingBars();
	               createButtons();
	               
	           }
	           else {
	               alert('error');
	           }
	        }
	    };

	    xmlhttp.open("GET", "data/data.json", true);
	    xmlhttp.send();
	})();