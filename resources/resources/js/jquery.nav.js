/* 
	GNB
*/
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
	// Add Active class to clicked menu item
	/*onClickAfter: function(e, topnav) {
		e.preventDefault();
		$('.dropdown-content').find('li').removeClass('active');
		var li =  $(this).parent();
		var lis = li.parents('li');
		li.addClass('active');
		lis.addClass('active');
	}*/
}






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

	$('div.user ul.article li a').live('mouseenter',function(){ //User
		$(this).animate({opacity:1});
	}).live('mouseleave',function(){
		$(this).animate({opacity:0.45});
	});

	$('ul.quick li').live('mouseenter',function(){ //Quick
		$(this).children().animate({opacity:0.6});
	}).live('mouseleave',function(){
		$(this).children().animate({opacity:1});
	});

	$("div.family ul").hide(); // FamilySite
	$(document).ready(function () {
		$("div.family").mouseover(function () {
			$("div.family ul").show();
			$(this).addClass("on");
		});
		$("div.family").mouseout(function () {
			$("div.family ul").hide();
			$(this).removeClass("on");
		});
	});

	$("div.family").find('h2').live('mouseenter',function(){ // TitleMouseOver
		$(this).find('span em').animate({opacity:0.7});
	}).end().live('mouseleave',function(){
		$(this).find('span em').animate({opacity:0.4});
	});

	$('div.family div.box ul li').live('mouseenter',function(){ //ListMouseOver
		$(this).children().animate({opacity:1});
	}).live('mouseleave',function(){
		$(this).children().animate({opacity:0.3});
	});
});
