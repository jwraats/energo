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
        }
    ]
}
Energo.init = function (){
    $(function() {
        $.ajax({url: "/api/getGraphs/24", success: function(result){
            console.log(result);
            lineChartData.labels = result.labels;
            lineChartData.datasets[0].data = result.deliver;
            lineChartData.datasets[1].data = result.green;

            var ctx = document.getElementById("graphsMeter").getContext("2d");
            window.myLine = new Chart(ctx).Line(lineChartData, {
                responsive: true
            });
        }});
    });
};
Energo.init();