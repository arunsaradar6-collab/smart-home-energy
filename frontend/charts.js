let chart;

function drawAnalyticsChart(devices){
  const ctx=document.getElementById("analyticsChart");

  if(chart) chart.destroy();

  chart=new Chart(ctx,{
    type:"pie",
    data:{
      labels:devices.map(d=>d.name),
      datasets:[{
        data:devices.map(d=>d.power)
      }]
    },
    options:{
      responsive:true,
      maintainAspectRatio:false
    }
  });
}