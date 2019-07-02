
var message=document.getElementById("message")
var input=document.getElementById("user")
var res
var pie=document.getElementById("pie")
var verdict=document.getElementById("verdict")
var tag=document.getElementById("tag")
var ptc=document.getElementById("ptc")
var rating=document.getElementById("rating")
var diff=document.getElementById("diff")

var langrating=document.getElementById("langrating")
var pointrating=document.getElementById("pointrating")
var actrating=document.getElementById("actrating")
var diffrating=document.getElementById("diffrating")

var enableFuzzy=false

var jp=false

function toggleLang(){
	jp=!jp
	alert("Japanese mode:"+jp)

	modifyLang()
}

function modifyLang(){
	if(jp){
		//Japanese
		document.getElementById("t1").innerHTML="Codeforces提出査読者"
		input.placeholder="Codeforces アカウント"
		document.getElementById("b1").innerHTML="クリックしてデータを取"
		document.getElementById("b2").innerHTML="クリア"
		document.getElementById("b3").innerHTML="あいまい一致 ON/OFF"
		document.getElementById("b4").innerHTML="言語"

		document.getElementById("x1").innerHTML="提出のRating"
		document.getElementById("x2").innerHTML="言語のRating"
		document.getElementById("x3").innerHTML="配点のRating"
		document.getElementById("x4").innerHTML="アクティビティのRating"
		
	}else{
		document.getElementById("t1").innerHTML="Codeforces Submission Checker"
		input.placeholder="Codeforces Handle"
		document.getElementById("b1").innerHTML="Click to fetch data"
		document.getElementById("b2").innerHTML="Clear"
		document.getElementById("b3").innerHTML="Toggle Fuzzy matching"
		document.getElementById("b4").innerHTML="Japanese/English"

		document.getElementById("x1").innerHTML="User Submission Rating"
		document.getElementById("x2").innerHTML="Language Rating"
		document.getElementById("x3").innerHTML="Points Rating"
		document.getElementById("x4").innerHTML="Activity Rating"
		
	}
}
function enableFuzzyF(){
	enableFuzzy=!enableFuzzy
	if(jp){
		alert("'あいまい一致'は類似言語の併合を意味する\nあいまい一致:"+enableFuzzy)
	}else{
		alert("Fuzzy Matching Means Merging Similar Languages.\nNow fuzzy matching:"+enableFuzzy)
	}
	
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

var diffchart= Highcharts.chart("diff",{


    title: {
        text: 'Pie'
    },

    subtitle:{
        text:"Difficulties"
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
			if(jp){
				return "提出"+subIds[this.x][0]+"<br/>問題:"+subIds[this.x][3]+"<br/>結果:"+subIds[this.x][1]+"<br/>提出日時:"+new Date(subIds[this.x][2]*1000)+"<br/>テストカウントに合格:"+this.y	
			}
			return "Submission "+subIds[this.x][0]+"<br/>Problem:"+subIds[this.x][3]+"<br/>Verdict:"+subIds[this.x][1]+"<br/>Created at "+new Date(subIds[this.x][2]*1000)+"<br/>Passed "+this.y+" Tests"
		}
	}
	
})

function clears(){
	message.innerHTML=(jp?"アボート":"Abort")
	pie.style="display:none"
	verdict.style="display:none"
	tag.style="display:none"
	point.style="display:none"
	ptc.style="display:none"
	rating.style="display:none"
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

/*
	n is the total language the user uses
	We call a language "main language" if an user submits more than 1/n of his total submission.
	We call a language "side language" otherwise
	the points we get for each main language is [10,30,50,65,80]
	for each side language we get [1,2,3,4,5,7,9,11,13,15]
*/
function parseLanguageRating(dict,totsub){
	var langcount=0
	for(x in dict){
		langcount++;
	}

	var mainlc=0,sidelc=0;
	var mainls=[];
	for(x in dict){
		if(dict[x]>=(1/langcount)*totsub){
			mainlc++;
			mainls.push(x);
		}else{
			sidelc++;
		}
	}

	var totscore=0
	var smain=[0,10,30,50,65,80,90,100]
	var sside=[0,3,5,7,9,11,13,15,17,20]
	if(mainlc>=smain.length){
		totscore+=100;
	}else{
		totscore+=smain[mainlc];
	}

	if(sidelc>=sside.length){
		totscore+=20;
	}else{
		totscore+=sside[sidelc];
	}

	langrating.innerHTML=totscore+"/120.Main language(s):"+mainls
	langrating.style.color=toColor(totscore/120)
}

function colorRGB2Hex(color) {
    var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);
 
    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
 }

function toColor(frac){
	var r=parseInt((1-frac)*255)
	var g=parseInt(frac*255)
	var b=0
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function parsePointRating(dict,totsub){
	var totpts=0
	var mxpts=4000
	for(x in dict){
		if(x!="undefined"){
			totpts+=dict[x]*parseInt(x)
			mxpts=Math.max(mxpts,parseInt(x))
		}else{
			totpts+=dict[x]*4000
		}
	}

	var score=parseInt(totpts/totsub)
	pointrating.innerHTML=score+"/"+mxpts+"."
	pointrating.style.color=toColor(score/mxpts)
}

/*
	activityRating=sigma((lastSubmissionTime-submissionTime)/(lastSubmissionTime-firstSubmissioonTime)*passTests*(verdict!="OK"?1.2:1))
*/
function parseActivityRating(dict,subIds){
	
	var rating=0,last=dict[dict.length-1][0],first=dict[0][0]
	for(var i=0;i<dict.length;i++){
		rating+=(last-dict[i][0])/(last-first)*dict[i][1]*(subIds[dict[i][0]][1]!="OK"?1.2:1)
	}

	actrating.innerHTML=rating
	actrating.style.color=toColor(rating/50000)
}

function parseDifficultyRating(dict){
	var rating=dict[parseInt(dict.length/3*2)]
	diffrating.innerHTML=rating
	diffrating.style.color=toColor(rating/4000)
}

function parseJson(){
	message.innerHTML=(jp?"Jsonを解析しています...":"Parsing Json...")
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
	
	//Parse language rating
	parseLanguageRating(dict,subs.length)


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
	
	//Parse Point Rating
	parsePointRating(dict,subs.length)

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
	
	//Difficulty Parse
	dict=new Object();
	rat=[];
	for(var i=0;i<subs.length;i++){
		var str=subs[i].problem.rating;
		
		if(dict[str]==undefined){
			dict[str]=0
		}
		dict[str]++
	
		rat.push(parseInt(str));
	}
	
	dict2=new Array();
	for(x in dict){
		if(x=="undefined"){
			dict2.push(["Unknown",dict[x]])
		}else{
			dict2.push([x,dict[x]])
		}
		
	}
	
	diffchart.series[0].setData(dict2)
	diff.style="display:block"
	
	rat.sort(function(val1,val2){
		return val1-val2;
	});

	// Parse Difficulty Rating
	parseDifficultyRating(rat);
	
	

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
	
	//Parse activity rating
	parseActivityRating(dict,subIds);

	rating.style="display:block"

	message.innerHTML=(jp?"OK.全部できた。"+subs.length+"提出":"OK.All done."+subs.length+" submissions in total.")
}

function get_request(user){
	
	
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('GET', "https://codeforces.com/api/user.status?handle="+user+"&count=10000", true);
	httpRequest.send(null);
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState == 4 && httpRequest.status == 200) {
			var json = httpRequest.responseText;
			
			res=eval("("+json+")")
			
			parseJson()
			
		}else{
			if(httpRequest.readyState == 3){
				if(jp){
					message.innerHTML="Codeforcesからのデータのダウンロード: 準備状態:"+httpRequest.readyState+" & リクエストステータス: "+httpRequest.status
				}else{
					message.innerHTML="Downloading Data From Codeforces: ready state "+httpRequest.readyState+" and request status "+httpRequest.status+" is returned"
				}
				
			}
		}
	};
	
	
}

function fetch(){
	if(jp){
		message.innerHTML="Codeforcesにリクエストを送信する..時間がかかりすぎる場合は、ユーザー名が正しいかどうかを確認してください"
	}else{
		message.innerHTML="Pending Request To Codeforces..If it takes too long, check if your username is ok"
	}
	
	
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
