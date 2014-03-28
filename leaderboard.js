(function() {

	var myLeaderBoard = function(json, options) {
		return new myLeaderBoard.fn.init(json, options);
	};

	myLeaderBoard.fn = myLeaderBoard.prototype = {
		init : function(hook) {
			this.scoreBoard = new Table();
			this.hook = hook;
		},

		refresh : function(url) {
			//ur ajax goes here
			var me = this;
			$.getJSON(url, function(data) {
				if (data) {
					me.draw(data);
				}
			});

			//dummy data
			//var scores = ["[elvira01, 53429692.000000]", "[oz03, -27045615.000000]", "[oz03, 77045615.000000]", "[lls05, 12797740.000000]", "[oz00, 8739146.000000]", "[t101, 7659554.000000]", "[com01, 7137569.000000]"];
			//this.draw(scores, $("#background-image"));
		},

		draw : function(json) {
			this.scoreBoard.refreshValues(json);
			if ($(this.hook).find('table').length == 0) {
				$(this.hook).html(this.scoreBoard.html);
				$($(this.hook).find('table')[0]).tableSort({
					animation : 'slide',
					speed : 500,
					direction : 'descending',
					sortBy : ['text', 'numeric']
				});
			}
		}
	};

	var Table = function() {
		this.html = this.setHTML();
	};

	Table.prototype = {
		setHTML : function() {
			var table = jQuery("<table>");
			var headers = jQuery("<tr>");
			var col2 = jQuery("<th>").html("Player").attr("id", "player-col");
			var col3 = jQuery("<th>").html("Score").attr("id", "score-col");
			;

			$(headers).append(col2);
			$(headers).append(col3);

			$(table).append(headers);

			this.table = table;
			return table;
		},

		refreshValues : function(json) {
			for (var strArrayValue in json) {
				var deets = json[strArrayValue].split("[")[1].split("]")[0].split(",");
				var player = deets[0].trim();
				var score = deets[1].trim();

				var id = "#" + player;

				if ($(id).length != 0) {
					$($(id).find("td")[1]).html(score);
				} else {
					var new_row = jQuery("<tr>").attr("id", player);
					var col2 = jQuery("<td>").html(player);
					var col3 = jQuery("<td>").html(score);

					$(new_row).append(col2);
					$(new_row).append(col3);

					$(this.table).append(new_row);
				}
			}
			$($(this.table).find("#score-col")[0]).click();
		}
	};

	myLeaderBoard.fn.init.prototype = myLeaderBoard.prototype;

	window.myLeaderBoard = myLeaderBoard;
})();
