<canvas id="master-graph-canvas" width="1510" height="320"></canvas>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js"></script>
<script>
function barGraph(mail, retail) {
    var barData = {
        labels : ["Jan","Feb","Mar","Apr","May","Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets : [{
            label: "Monthly Copayment Prices from Mail",
            lineTension: 0,
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data : [mail[0],
                    mail[1], 
                    mail[2], 
                    mail[3], 
                    mail[4], 
                    mail[5], 
                    mail[6], 
                    mail[7], 
                    mail[8], 
                    mail[9], 
                    mail[10], 
                    mail[11]]
        }, {
            label: "Monthly Copayment Prices from Retail",
            lineTension: 0,
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data : [retail[0],
                    retail[1], 
                    retail[2], 
                    retail[3], 
                    retail[4], 
                    retail[5], 
                    retail[6], 
                    retail[7], 
                    retail[8], 
                    retail[9], 
                    retail[10], 
                    retail[11]]
        }]
    }

    var ctx = document.getElementById("master-graph-canvas").getContext("2d");
    var myChart = new Chart(ctx).Line(barData);
}
</script>
        