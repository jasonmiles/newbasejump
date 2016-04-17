'use strict';

var path = process.cwd();


require('datejs');


var months = [
			 "January",
			 "February",
			 "March",
			 "April",
			 "May",
			 "June",
			 "July",
			 "August",
			 "September",
			 "October",
			 "November",
			 "December"];

module.exports = function (app, passport) {


	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
		
	app.route('/:date')
		.get(function (req, res) {
			
			if(!isNaN(req.params.date))
			{
				var dateTime = new Date(req.params.date * 1000);
				var dateString = months[dateTime.getMonth()] + " " + dateTime.getDate() + ", " + dateTime.getFullYear();
				var dateObj = {"unix" : req.params.date, "natural" : dateString};
				res.send(dateObj);
			}
			
			else
			{
			for(var i = 1; i < months.length; i++)
			{
				
				var re = new RegExp(months[i],"ig");
			
				if(req.params.date.match(re))
				{
					var unixtime = Date.parse(req.params.date).getTime()/1000;
					var dateTime = new Date(unixtime * 1000);
					var dateString = months[dateTime.getMonth()] + " " + dateTime.getDate() + ", " + dateTime.getFullYear();
					var dateObj = {"unix" : unixtime, "natural" : dateString};
					res.send(dateObj);
				}
			}
			var dateObj = {"unix" : null, "natural" : null};
			res.send(dateObj);
			}
			

			
		})


};
