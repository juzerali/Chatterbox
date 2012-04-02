$(document).ready(function(){
			now.ready(function(){
				$("#send-button").click(function(){
					now.distributeMessage($("#msgbox").val());
					$("#msgbox").val("");
				});

				now.receiveMessage = function(name, message){
					$("#chatarea").append("<br><b>" + name + "</b>: " + message);
					$('title').text(name + ": " + message);
				};
				now.populateVisitors = function(visitors){
					$.each(visitors, function(key,value){
						$('#visitors').append("<small>"+value+"</small><br/>");
					});
				};
				now.name = prompt("What's your name?", "Anonymous");
				now.addName(now.name);
				
			});
		});