
var message=document.getElementById("message")
var input=document.getElementById("user")
var res
var pie=document.getElementById("pie")
var verdict=document.getElementById("verdict")
var tag=document.getElementById("tag")
var ptc=document.getElementById("ptc")

var enableFuzzy=false

function enableFuzzyF(){
	enableFuzzy=!enableFuzzy
	alert("Fuzzy Matching Means Merging Similar Languages.\nNow fuzzy matching:"+enableFuzzy)
}

var langchart= Highcharts.chart("pie",{

    title: {
        text: 'Pie'
    },

    subtitle:{
        text:"Languages"
    },

    plotOptions:{
        pie: {
           allowPointSelect: true,
           cursor: 'pointer',
           dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} % ({point.y})',
              style: {
                 color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
           }
        }
    },

    credits:{
        enabled:false
    },
    series: [{
        type:"pie",
        name:"lang",
        data:[
            ["UNKNOWN",1]
        ]
    }]
});

var verdictchart= Highcharts.chart("verdict",{


    title: {
        text: 'Pie'
    },

    subtitle:{
        text:"Verdicts"
    },

    plotOptions:{
        pie: {
           allowPointSelect: true,
           cursor: 'pointer',
           dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} % ({point.y})',
              style: {
                 color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
           }
        }
    },

    credits:{
        enabled:false
    },
    series: [{
        type:"pie",
        name:"submission",
        data:[
            ["UNKNOWN",1]
        ]
    }]
});

var tagchart= Highcharts.chart("tag",{


    title: {
        text: 'Pie'
    },

    subtitle:{
        text:"Tags"
    },

    plotOptions:{
        pie: {
           allowPointSelect: true,
           cursor: 'pointer',
           dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} % ({point.y})',
              style: {
                 color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
           }
        }
    },

    credits:{
        enabled:false
    },
    series: [{
        type:"pie",
        name:"submission",
        data:[
            ["UNKNOWN",1]
        ]
    }]
});

var pointchart= Highcharts.chart("point",{


    title: {
        text: 'Pie'
    },

    subtitle:{
        text:"Points"
    },

    plotOptions:{
        pie: {
           allowPointSelect: true,
           cursor: 'pointer',
           dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} % ({point.y})',
              style: {
                 color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
           }
        }
    },

    credits:{
        enabled:false
    },
    series: [{
        type:"pie",
        name:"submission",
        data:[
            ["UNKNOWN",1]
        ]
    }]
});

var subIds=new Object()

var ptcchart = Highcharts.chart('ptc', {
	
	chart :{
		zoomType: 'x',
    },
    title: {
        text: 'PTC'
    },

	plotOptions: {
		line: {
			marker: {
				enabled: true
			}
		}
	},
	
	xAxis:{
		type: 'datetime'
	},
    subtitle:{
        text:"Passed Tests Count"
    },

    credits:{
        enabled:false
    },
    series: [{
        data: [],
        name: 'Passed Test Count'
    }],
	
	tooltip:{
		formatter:function(){
			return "Submission "+subIds[this.x][0]+"<br/>Problem:"+subIds[this.x][3]+"<br/>Verdict:"+subIds[this.x][1]+"<br/>Created at "+new Date(subIds[this.x][2]*1000)+"<br/>Passed "+this.y+" Tests"
		}
	}
	
})

function clears(){
	message.innerHTML="Abort"
	pie.style="display:none"
	verdict.style="display:none"
	tag.style="display:none"
	point.style="display:none"
	ptc.style="display:none"
}

function fuzzy(str){
	if(!enableFuzzy){
		return str;
	}else{
		if(str.includes("C++")){
			return "C++";
		}
		if(str.includes("Java")){
			return "Java";
		}
		if(str.includes("Python") || str.includes("PyPy")){
			return "Python";
		}
		if(str.includes("C#")){
			return "C#";
		}
		if(str.includes("C")){
			return "C";
		}
		if(str.includes("Delphi") || str.includes("Pascal") || str.includes("FPC")){
			return "Pascal";
		}
		return str;
	}
}

function parseJson(){
	message.innerHTML="Parsing Json..."
	if(res.status!="OK"){
		error(300,"Status is "+res.status+" but 'OK' was expected")
		return
	}
	
	var subs=res.result
	
	//Language Parse
	var dict=new Object();
	for(var i=0;i<subs.length;i++){
		var str=fuzzy(subs[i].programmingLanguage);
		if(dict[str]==undefined){
			dict[str]=0
		}
		
		dict[str]++
	}
	
	var dict2=new Array();
	for(x in dict){
		dict2.push([x,dict[x]])
	}
	
	langchart.series[0].setData(dict2)
	pie.style="display:block"
	
	
	//Verdict Parse
	
	dict=new Object();
	for(var i=0;i<subs.length;i++){
		var str=subs[i].verdict;
		if(dict[str]==undefined){
			dict[str]=0
		}
		
		dict[str]++
	}
	
	dict2=new Array();
	for(x in dict){
		dict2.push([x,dict[x]])
	}
	
	verdictchart.series[0].setData(dict2)
	verdict.style="display:block"
	
	//Points Parse
	
	dict=new Object();
	for(var i=0;i<subs.length;i++){
		var str=subs[i].problem.points;
		if(dict[str]==undefined){
			dict[str]=0
		}
		
		dict[str]++
	}
	
	dict2=new Array();
	for(x in dict){
		if(x=="undefined"){
			dict2.push(["Unknown",dict[x]])
		}else{
			dict2.push([x,dict[x]])
		}
		
	}
	
	pointchart.series[0].setData(dict2)
	point.style="display:block"
	
	//Tags Parse
	dict=new Object();
	for(var i=0;i<subs.length;i++){
		for(var j=0;j<subs[i].problem.tags.length;j++){
			var str=subs[i].problem.tags[j]
			
			if(dict[str]==undefined){
				dict[str]=0
			}
			dict[str]++
		}
		
	}
	
	dict2=new Array();
	for(x in dict){
		if(x=="undefined"){
			dict2.push(["Unknown",dict[x]])
		}else{
			dict2.push([x,dict[x]])
		}
		
	}
	
	tagchart.series[0].setData(dict2)
	tag.style="display:block"
	
	//PTC Parse
	
	dict=new Array();
	subIds=new Object();
	for(var i=0;i<subs.length;i++){
		var str=subs[i].passedTestCount;
		dict.push([subs[i].creationTimeSeconds*1000,parseInt(str)])
		subIds[subs[i].creationTimeSeconds*1000+""]=[subs[i].id,subs[i].verdict,subs[i].creationTimeSeconds,subs[i].problem.name]
	}
	dict.sort()
	
	ptcchart.series[0].setData(dict)
	ptc.style="display:block"
	
	message.innerHTML="OK.All done."+subs.length+" submissions in total."
}

function get_request(user){
	
	
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('GET', "https://codeforces.com/api/user.status?handle="+user, true);
	httpRequest.send(null);
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState == 4 && httpRequest.status == 200) {
			var json = httpRequest.responseText;
			
			res=eval("("+json+")")
			
			parseJson()
			
		}else{
			if(httpRequest.readyState == 3){
				message.innerHTML="Downloading Data From Codeforces: ready state "+httpRequest.readyState+" and request status "+httpRequest.status+" is returned"
			}
		}
	};
	
	
}

function fetch(){
	message.innerHTML="Pending Request To Codeforces..If it takes too long, check if your username is ok"
	
	if(input.value==""){
		error(101,"Input is empty")
		return;
	}
	
	get_request(input.value)
	
	// error(100,"Feature is not ready")
}

function error(code,mess){
	message.innerHTML="Error code "+code+":"+mess
}
