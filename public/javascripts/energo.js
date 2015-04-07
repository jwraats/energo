var Energo = [];
var lineChartData = {
    labels : [],
    datasets : [
        {
            label: "Stroom afnamen",
            fillColor: "rgba(255,0,0,0.2)",
            strokeColor: "rgba(255,0,0,1)",
            pointColor: "rgba(255,0,0,1)",
            pointStrokeColor: "#FF0000",
            pointHighlightFill: "#FF0000",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: []
        },
        {
            label: "Stroom opweken",
            fillColor: "rgba(0,204,102,0.2)",
            strokeColor: "rgba(0,204,102,1)",
            pointColor: "rgba(0,204,102,1)",
            pointStrokeColor: "#00FF80",
            pointHighlightFill: "#00FF80",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: []
        },
        {
            label: "Euro's bespaard",
            fillColor: "rgba(255,217,24,0.2)",
            strokeColor: "rgba(255,217,24,1)",
            pointColor: "rgba(255,217,24,1)",
            pointStrokeColor: "#FFD918",
            pointHighlightFill: "#FFD918",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: []
        }
    ]
}
var token = "";

Energo.init = function (){
    $(function() {
        if($('#graphsMeter').length !== 0){
            Energo.auth(function() {
                Energo.createGraph();
                Energo.createGraphDay();
            });
        }
    });
};
Energo.init();

Energo.auth = function(callback){ 
	$.ajax({
		url: '/api/login',
		type: 'POST',
		data: { username: "energoAPI", password: "f5d5e2cK(8fjd7s&^jf" }
	}).done(function(data){
		token = data.token;
		callback();
	});
}

Energo.createGraph = function(){	
	$.ajax({
		url: '/api/getGraphs/24',
		type: 'GET',
		beforeSend: function(request){request.setRequestHeader("X-Access-Token", token);}
	}).done(function(result) {
        lineChartData.labels = result.labels;
        lineChartData.datasets[0].data = result.deliver;
        lineChartData.datasets[1].data = result.green;
        lineChartData.datasets[2].data = result.greenDiscount;

        var ctx = document.getElementById("graphsMeter").getContext("2d");
        window.myLine = new Chart(ctx).Line(lineChartData, {
            responsive: true,
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        });
    }).fail(function(e) {
		if(e.code == 401) {
			Energo.auth(Energo.createGraph);
		}
	});
};
Energo.createGraphDay = function(){
    $.ajax({
        url: '/api/getGraphs',
        type: 'GET',
        beforeSend: function(request){request.setRequestHeader("X-Access-Token", token);}
    }).done(function(result) {
        lineChartData.labels = result.labels;
        lineChartData.datasets[0].data = result.deliver;
        lineChartData.datasets[1].data = result.green;
        lineChartData.datasets[2].data = result.greenDiscount;

        var ctx = document.getElementById("graphsMeterDay").getContext("2d");
        window.myLine = new Chart(ctx).Line(lineChartData, {
            responsive: true,
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        });
    }).fail(function(e) {
        if(e.code == 401) {
            Energo.auth(Energo.createGraph);
        }
    });
};
