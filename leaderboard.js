(function(window) {

	var myLeaderBoard = function(json, options) {
		return new myLeaderBoard.fn.init(json, options);
	};

	myLeaderBoard.fn = myLeaderBoard.prototype = {
		init : function() {
			this.scoreBoard = new Table();
		},

		draw : function(json, hook){
			this.scoreBoard.setValues(json);
			$(hook).append(this.scoreBoard.html);
		},
		
		refresh : function() {
			
		}
	};
	
	var Table = function (){
		this.html = this.setHTML();
	};
	
	Table.prototype = {
		setHTML : function(){
			var table = jQuery("<table>");
			var headers = jQuery("<tr>");
			var col1 = jQuery("<th>").html("Rank");
			var col2 = jQuery("<th>").html("Player");
			var col3 = jQuery("<th>").html("Score");
			
			$(headers).append(col1);
			$(headers).append(col2);
			$(headers).append(col3);
			
			$(table).append(headers);
			
			this.table = table;
			return table;
		},
		
		setValues : function(json){
			var rank = 1;
			for(var strArrayValue in json){
				var deets = json[strArrayValue].split("[")[1].split("]")[0].split(",");
				var player = deets[0];
				var score = deets[1];
				
				var new_row = jQuery("<tr>");
			    var col1 = jQuery("<td>").html("#" + rank);
			    var col2 = jQuery("<td>").html(player);
			    var col3 = jQuery("<td>").html(score);
			    
			    $(new_row).append(col1);
			    $(new_row).append(col2);
			    $(new_row).append(col3);
			    
			    $(this.table).append(new_row);
			    
			    rank++;
			}
		}
	};
	
	myLeaderBoard.fn.init.prototype = myLeaderBoard.prototype;

	window.myLeaderBoard = myLeaderBoard;
})(window);
