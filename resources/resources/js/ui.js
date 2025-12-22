/* 
	LNB
*/

$(document).ready(function () {
	// Initialize
	$("#lnb ul.depth1>li.on").find("ul.depth2>li").not(".on").find("ul").hide();
	$("#lnb ul.depth1>li").not(".on").find("ul").hide();
	$("#lnb ul.depth1>li>a, #lnb ul.depth2>li>a").click(function () {
		if ($(this).parent("li").find("ul").length > 0) {
			
			if (!$(this).parent("li").hasClass("on")) {
					$(this).parent().parent().find(">li.on>ul").hide().end().find(">li.on").removeClass("on");
					//$(this).parent().parent().find(">li.on>ul").end().find(">li.on").removeClass("on");
					
					$(this).parent("li").addClass("on").find(">ul").slideDown(300, function () {
					if ($(this).parent().find("ul>li.on").length == 0){
						$(this).parent().find("ul>li:first>a").trigger("click");
					}					
				});
			}
			return false;
		}
	});
	
	//board_list event
	$("div.board_list tr").click(function () {
        $("div.board_list tr").removeClass("on").css({"color": "#393d48","background": "#fff"});
        //$(this).addClass("active").css({"color": "darkred","font-weight": "bolder"});
        $(this).addClass("on").css({"color": "#fff","background": "#393d48"});
    });
	
});



$(function () {

	// tab1
    $("#tabs1 .tab_content").hide();
    $("#tabs1 .tab_content:first").show();

    $("#tabs1 ul.tabmenu li").click(function () {
        $("#tabs1 ul.tabmenu li").removeClass("active").css("color", "#333");
        //$(this).addClass("active").css({"color": "darkred","font-weight": "bolder"});
        $(this).addClass("active").css("color", "#000");
        $("#tabs1 .tab_content").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
    });

	// tab2
    $("#tabs2 .tab_content").hide();
    $("#tabs2 .tab_content:first").show();

    $("#tabs2 ul.tabmenu li").click(function () {
        $("#tabs2 ul.tabmenu li").removeClass("active").css("color", "#333");
        //$(this).addClass("active").css({"color": "darkred","font-weight": "bolder"});
        $(this).addClass("active").css("color", "#000");
        $("#tabs2 .tab_content").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
    });

	// tab3
    $("#tabs3 .tab_content").hide();
    $("#tabs3 .tab_content:first").show();

    $("#tabs3 ul.tabmenu li").click(function () {
        $("#tabs3 ul.tabmenu li").removeClass("active").css("color", "#333");
        //$(this).addClass("active").css({"color": "darkred","font-weight": "bolder"});
        $(this).addClass("active").css("color", "#000");
        $("#tabs3 .tab_content").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
    });
	
	// calendar
	$(".calendar li").click(function () {
        $(".calendar li").removeClass("active").css({"color": "#555","background": "#fff"});
        $(this).addClass("active").css({"color": "#fff","background": "#f46b01"});
		$(".calendar li.Reddate").removeClass("active").css({"color": "#fe0000","background": "#fff"});
        $(this).addClass("active").css({"color": "#fff","background": "#f46b01"});
		$(".calendar li.Bluedate").removeClass("active").css({"color": "#0060BF","background": "#fff"});
        $(this).addClass("active").css({"color": "#fff","background": "#f46b01"});
    });
	
	// tabPopup
	$("#tabsP .tab_contentP").hide();
    $("#tabsP .tab_contentP:first").show();

    $("#tabsP ul.tabmenu li").click(function () {
        $("#tabsP ul.tabmenu li").removeClass("active").css("color", "#333");
        //$(this).addClass("active").css({"color": "darkred","font-weight": "bolder"});
        $(this).addClass("active").css("color", "#000");
        $("#tabsP .tab_contentP").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
    });
	
	
	//MoniterChart1
	$("#MoniterChart1 .chart_content").hide();
    $("#MoniterChart1 .chart_content:first").show();

    $("#MoniterChart1 div.btnchart li").click(function () {
        $("#MoniterChart1 div.btnchart li").removeClass("on").css("color", "#fff");
        $(this).addClass("on").css("color", "#fff");
        $("#MoniterChart1 .chart_content").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
    });
	
	
	//MoniterChart2
	$("#MoniterChart2 .chart_content").hide();
    $("#MoniterChart2 .chart_content:first").show();

    $("#MoniterChart2 div.btnchart li").click(function () {
        $("#MoniterChart2 div.btnchart li").removeClass("on").css("color", "#fff");
        $(this).addClass("on").css("color", "#fff");
        $("#MoniterChart2 .chart_content").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
    });
	
	//MoniterChart3
	$("#MoniterChart3 .chart_content2").hide();
    $("#MoniterChart3 .chart_content2:first").show();

    $("#MoniterChart3 div.btnchart li").click(function () {
        $("#MoniterChart3 div.btnchart li").removeClass("on").css("color", "#fff");
        $(this).addClass("on").css("color", "#fff");
        $("#MoniterChart3 .chart_content2").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
    });
	
	//MoniterChart4
	$("#MoniterChart4 .chart_content2").hide();
    $("#MoniterChart4 .chart_content2:first").show();

    $("#MoniterChart4 div.btnchart li").click(function () {
        $("#MoniterChart4 div.btnchart li").removeClass("on").css("color", "#fff");
        $(this).addClass("on").css("color", "#fff");
        $("#MoniterChart4 .chart_content2").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
    });
	
	//MoniterChart5
	$("#MoniterChart5 .chart_content2").hide();
    $("#MoniterChart5 .chart_content2:first").show();

    $("#MoniterChart5 div.btnchart li").click(function () {
        $("#MoniterChart5 div.btnchart li").removeClass("on").css("color", "#fff");
        $(this).addClass("on").css("color", "#fff");
        $("#MoniterChart5 .chart_content2").hide()
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
    });
});


// radio click event = templet
function viewList(chk){
	
	if(chk==1){
		document.getElementById("templet1").style.display='block';
		document.getElementById("templet2").style.display='none';
	}else if(chk==2){
		document.getElementById("templet1").style.display='none';
		document.getElementById("templet2").style.display='block';
	}else if(chk==3){
		document.getElementById("templet3").style.display='none';
		document.getElementById("templet4").style.display='block';
	}else if(chk==4){
		document.getElementById("templet3").style.display='none';
		document.getElementById("templet4").style.display='block';
	}
}

function sendAdd(chk){
	
	if(chk==1){
		document.getElementById("sendAdd1").style.display='block';
		document.getElementById("sendAdd2").style.display='none';
		document.getElementById("sendAdd3").style.display='none';
	}else if(chk==2){
		document.getElementById("sendAdd1").style.display='none';
		document.getElementById("sendAdd2").style.display='block';
		document.getElementById("sendAdd3").style.display='none';
	}else if(chk==3){
		document.getElementById("sendAdd1").style.display='none';
		document.getElementById("sendAdd2").style.display='none';
		document.getElementById("sendAdd3").style.display='block';
	}
}

// 톡템플릿 선택

function sendList(chk){
	
	if(chk==1){
		document.getElementById("kakaoSendBox1").style.display='block';
		document.getElementById("kakaoSendBox2").style.display='none';
	}else if(chk==2){
		document.getElementById("kakaoSendBox1").style.display='none';
		document.getElementById("kakaoSendBox2").style.display='block';
	}else if(chk==3){
		document.getElementById("kakaoSendBox3").style.display='block';
		document.getElementById("kakaoSendBox4").style.display='none';
	}else if(chk==4){
		document.getElementById("kakaoSendBox3").style.display='none';
		document.getElementById("kakaoSendBox4").style.display='block';
	}
}

