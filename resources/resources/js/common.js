function ajaxSessionTimeout()
{
    // Handle Ajax session timeout here
	debug("session time out!");
	if($("#sessionTimeOutModal").length > 0){
		$("#sessionTimeOutModal").modal({
			overlayId: 'sessionTimeOutModal',
			containerId: 'sessionTimeOutModalBox',
			opacity:50,				
			overlayCss:{
				backgroundColor:'#000',
				cursor:'',
				zIndex:9999
			},
			overlayClose:false
		});	
	}else{
		alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
	}	
}

function ajaxError(code)
{    
	alert("관리자에게 문의해 주십시오.["+code+"]");
}

function ajaxErrorHandle(status){
	switch (status)
    {
       case 401:
    	   ajaxSessionTimeout();
    	   break; 
       case 403:
    	   ajaxError(403);
    	   break
       case 404:
    	   ajaxError(404);
    	   break;
       case 500:
    	   ajaxError(500);
    	   break;
       case 410:
    	   ajaxError(410);
    	   break;
       default:
           alert("관리자에게 문의해 주십시오.");
    	   break;
    }
}
$(document).ajaxError(function(event, xhr, options) {
	debug("common xhr.status:"+xhr.status);
	ajaxErrorHandle(xhr.status);    
});

(function($) {
	
	 $.fn.jqueryPager = function(options) {
		 
	  // 기본값 설정
	  var defaults = {
	   pageSize: 10,
	   currentPage: 1,
	   pageTotal: 0,
	   pageBlock: 10,
	   pageClick: 'goPage'
	  };
	
	  var subOption = $.extend(true, defaults, options); // defaults와 option을 병합한다.
	
	  return this.each(function() {
	   debug($(this).html());
	   var currentPage = subOption.currentPage*1;  // 현재 페이지
	   var pageSize = subOption.pageSize*1;   // 출력 리스트 수
	   var pageBlock = subOption.pageBlock*1;  // 1~10까지 블락 
	   var pageTotal = subOption.pageTotal*1;  // 총 데이터 수
	   var pageClick = subOption.pageClick;
	   
	   if (!pageSize) pageSize = 10;     // 출력 리스트수가 없으면 초기값 10으로 설정
	   if (!pageBlock) pageBlock = 10;     // 블락 초기값이 없으면 10으로 설정
	
	   var pageTotalCnt = Math.ceil(pageTotal/pageSize);
	   var pageBlockCnt = Math.ceil(currentPage/pageBlock);
	   var sPage, ePage;
	   var html = "";
	
	   if (pageBlockCnt > 1) {
		   sPage = (pageBlockCnt-1)*pageBlock+1;
	   } else {
		   sPage = 1;
	   }
	
	   if ((pageBlockCnt*pageBlock) >= pageTotalCnt) {
		   ePage = pageTotalCnt;
	   } else {
		   ePage = pageBlockCnt*pageBlock;
	   }
	
	   html += '&nbsp;<li class="first" onclick="'+pageClick+'(' + 1 + ');"><a href="#"><span>FIRST</span></a>&nbsp;</li>';
	   if (sPage > 1) {	    
		   html += '<li class="pre" onclick="'+pageClick+'(' + (sPage-pageBlock) + ');"><a href="#tmp"><span>이전</span></a>&nbsp;</li>';
	   }else{
		   html += '<li class="pre"><a href="#tmp"><span>이전</span></a>&nbsp;</li>';		      
	   }
	
	   for (var i=sPage; i<=ePage; i++) {
		   if (currentPage == i) {
			   html += '<li><strong>' + i + '</strong></li>&nbsp;';
		   } else {
			   html += '<li onclick="'+pageClick+'(' + i + ');"><a href="#">' + i + '</a>&nbsp;</li>';
		   }
	   }
	   
	   if (ePage < pageTotalCnt) {
		   html += '<li class="next" onclick="'+pageClick+'(' + (ePage+1) + ');"><a href="#"><span>다음</span></a>&nbsp;</li>';	    
	   }else{
		   html += '<li class="next" ><a href="#tmp"><span>다음</span></a>&nbsp;</li>';
	   }
	   html += '<li class="end" onclick="'+pageClick+'(' + pageTotalCnt + ');"><a href="#"><span>끝</span></a>&nbsp;</li>';
		
	   $(this).empty().append(html);
	
	  });
	
	 }
	
	})(jQuery);



Date.prototype.format = function(f) {

    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;

        }

    });

};



String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};

String.prototype.zf = function(len){return "0".string(len - this.length) + this;};

Number.prototype.zf = function(len){return this.toString().zf(len);};

/**
 * converted stringify() to jQuery plugin.
 * serializes a simple object to a JSON formatted string.
 * Note: stringify() is different from jQuery.serialize() which URLEncodes form elements

 * UPDATES:
 *      Added a fix to skip over Object.prototype members added by the prototype.js library
 * USAGE:
 *  jQuery.ajax({
 *     data : {serialized_object : jQuery.stringify (JSON_Object)},
 *  success : function (data) {
 *
 *  }
 *   });
 *
 * CREDITS: http://blogs.sitepointstatic.com/examples/tech/json-serialization/json-serialization.js
 */
jQuery.extend({
    stringify  : function stringify(obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj + '"';
            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);

            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null) v = jQuery.stringify(v);
                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    }
});


	
/*
 * pm/ 개발자 목록 조회후 선택
 * 
 * @param user_exec_func : 실행할 함수명
 * @param user_exec_params : 실행하는 함수에 전달할 파라메터
 * 
 * ex)
 * <div class="wordsbox user_search" user_exec_func="addUser" user_exec_params="{list_id:'pmlist'}">
 * 실행되는 함수 (addUser(emp_object, exec_params)) 구현
 * 아래와 같이 함수 실행됨
 * addUser({list_id:'pmlist'}, {'empName':'김산수','empNo':'J005606','deptName':'서부CM센터_F&U신용정보'});
 * 
<div class="add">
<div class="wordsbox user_search" user_exec_func="addUser" user_exec_params="{list_id:'pmlist'}">
	<input type="text" id="pminfo" class="text" style="width:277px;" />														
</div>
<!-- <a href="#" class="plus"><span>추가</span></a> -->
</div>

<ul id="pmlist">
<li th:each="pminfo , rowStat : ${pm}">
	<input type='text' readonly='readonly' th:value="${pminfo.user.empName}" class='base' style='width:242px;' />
	<a th:id="${pminfo.getEmpNo()}" href='javascript:;' class='minus'><span>삭제</span></a>
</li>									
</ul>

<script>
function addUser(exec_params, emp_object){

}
</script>
*/
$(function(){

	
	$('body').click(function(){
		//debug($(".user_search input[type=text]").is(':focus'));
		if(!$(".user_search input[type=text]").is(':focus')) $(".user_search input[type=text]").parent().find('.list').hide();
	});
	
	$(".user_search input[type=text]").on("keyup", function(e) {

		//console.log(e.keyCode);
		if(e.keyCode != '13') return;
		
		var thisObj = $(this);
		var wordsboxObj = $(this).parent();		
		var this_elem = $(this).attr("id");
		var search_word = $("#"+this_elem).val();
		
		searchUser("/users/search",search_word,wordsboxObj,thisObj,this_elem);
		


	}).on('click focus',function(){
		var thisObj = $(this);
		var wordsboxObj = $(this).parent();
		var html = '<div class="list"><ul><li>이름 또는 사번을 입력 후 엔터를 치면 검색됩니다.</li></ul></div>';
		if(wordsboxObj.find('.list').length > 0){
			wordsboxObj.find('.list').remove();
		}
		thisObj.after(html);
		wordsboxObj.find('.list').show();
		
	});
	

	// 하위메뉴가 없는 경우 숨김
	//fnHideEmptyLeftMenu();
	

});

//
function searchUser(urlPath,search_word,wordsboxObj,thisObj,this_elem){
	
	if(thisObj==null || thisObj==undefined){
		thisObj=$(".user_search input[type=text][id="+this_elem+"]");
		wordsboxObj=$(thisObj).parent();
		debug(">>> this_elem:"+this_elem);
		debug(">>> thisObj:"+thisObj);
		debug(">>> wordsboxObj:"+wordsboxObj);
	}
	
	
	
	var query = escape(encodeURIComponent(search_word));
	if (search_word.length < 2) return false;
	thisObj.val("");
	
	var url = urlPath+"?empName=" + query;
	
	var execFunc = wordsboxObj.attr('user_exec_func');
	var execParams = wordsboxObj.attr('user_exec_params');
	debug('url:'+url);
	debug('execFunc:'+execFunc);
	debug('execParams:'+execParams);
	
	if(execFunc == undefined || execFunc == null || execFunc == '') return false;
	execParams = execParams.replace(/"/g, '\'');
	
	
	if(typeof(execParams) != 'undefined'){
		try{
			eval("var params = "+execParams+";");
			if(typeof(params) != 'undefined' || typeof(params.empAcl) != 'undefined') url += "&empAcl="+params.empAcl;
		}catch(e){}
	}

	url += "&dummy="+Math.random();
	debug(url);
	
	
	$.getJSON(url, function( data) {
		debug("data.length:"+data.length);
		// 기존 데이터 삭제
		if(wordsboxObj.find('.list').length > 0){
			wordsboxObj.find('.list').remove();
		} 
		
		debug(">>>>> search data length:"+data.length);
		
		if(data != null && data.length >= 1){
			if(data.length == 1){
				var item = data[0];
				var newObj = new Object();
				newObj.empName = item.empName;
				newObj.empNo = item.empNo;
				newObj.deptName = item.deptName=="null"?"":item.deptName;
				newObj.companyName = item.companyName;
				newObj.bpCompany = item.bpCompany;
				newObj.telNo = item.telNo;
				newObj.mobileNo = item.mobileNo;
				newObj.emailAddr = item.emailAddr;
				newObj.regDate = item.regDate;					
				newObj.ocSip = item.ocSip;
				newObj.userType = item.userType;
				var strItem = $.stringify(newObj).replace(/"/g, '\'');
				//console.log(strItem);
				//console.log(execFunc+"("+ execParams + ","+strItem + ")");
				eval(execFunc+"("+ execParams + ","+strItem +  ")");
				wordsboxObj.find('.list').hide();
			}else if(data.length >= 49 ){
				var html = "<div class='list'><ul><li>검색결과가 너무 많습니다.<br><b>"+search_word+"</b> 에 대한 결과만 확인하시려면<br><a href=\"javascript:searchUser('/users/searchAUser','"+search_word+"',null,null,'"+this_elem+"');\"><strong>여기를 클릭해주세요</strong></a></li></ul></div>";
				thisObj.after(html);
				wordsboxObj.find('.list').show();
				
			}else{
				var html = '<div class="list"><ul>';
				$.each(data, function(index, item) {
					var newObj = new Object();
					newObj.empName = item.empName;
					newObj.empNo = item.empNo;
					newObj.deptName = item.deptName=="null"?"":item.deptName;
					newObj.companyName = item.companyName;
					newObj.bpCompany = item.bpCompany;
					newObj.telNo = item.telNo;
					newObj.mobileNo = item.mobileNo;
					newObj.emailAddr = item.emailAddr;
					newObj.regDate = item.regDate;
					newObj.ocSip = item.ocSip;
					newObj.userType = item.userType;
					
					var strItem = $.stringify(newObj).replace(/"/g, '\'');
					var items = "<li onclick=\"javascript:"+execFunc+"("+ execParams + ","+strItem + ");\" >" 
						+ item.empName + "/"+ item.empNo + "" + (item.deptName=="null"?"":"/"+item.deptName)
						+ "</li>";
					html += items;
					//console.log(items);
				});
				html += '</ul></div>';
				
				
				thisObj.after(html);
				wordsboxObj.find('.list').show();
			}
			
		}else{
			var html = '<div class="list"><ul><li>해당 사용자가  없습니다.</li></ul></div>';
			thisObj.after(html);
			wordsboxObj.find('.list').show();
		}
		
	});
	
}

//하위메뉴가 없는 경우 숨김
function fnHideEmptyLeftMenu(){
	$('#lnb>ul.depth1>li').each(function(idx, item){
		var thisli = $(item);
		debug(thisli.find('em').text()+' cnt:'+thisli.find('ul.depth2>li').length);
		if(thisli.find('ul.depth2>li').length == 0){
			thisli.hide();
		}
	});
}

//메뉴 활성화
function fnSetMenu(depth1, depth2){
	
	debug(depth1+'>'+depth2);

	// 하위메뉴가 없는 경우 숨김
	fnHideEmptyLeftMenu();

	//$("#lnb ul.depth1>li.on").find("ul.depth2>li").not(".on").find("ul").hide();
	//$("#lnb ul.depth1>li").not(".on").find("ul").hide();
	//var thisObj = $("#lnb>ul>li:nth-child("+depth1+")");
	var thisObj = $("#lnb>ul>li[id=lnb_"+depth1+"]");

	if (thisObj.find("ul").length > 0) {
		//depth2 active 적용을 위해 주석 처리 2018-05-11 PHI
		//if (!thisObj.hasClass("on")) {
			thisObj.parent().find(">li.on>ul").hide().end().find(">li.on").removeClass("on");
			thisObj.addClass("on").find("ul").slideDown("fast", function () {
				thisObj.find("ul>li[id=lnb_"+depth1+"]").addClass("active"); //add by 2013.12.04
				thisObj.find("ul>li[id=lnb_"+depth1+"_"+depth2+"]").addClass("active");
			});
		//}
		return false;
	}
		
}
	 
//로그인
function fnLogin(){
	location.href="/login/form";
}
//로그아웃
function fnLogout(){
	location.href="/login/logout";
}
//회원가입
function fnJoin(){
	location.href="/login/join";
}
function fnAdmRel(){
	location.href="/rel/user_list";
}	



function loadDatePicker(){
	$(".datepicker").datepicker({ // 달력
		showOn: "both", // 버튼과 텍스트 필드 모두 캘린더를 보여준다.
		buttonImage: "/images/common/btn/btn_calendar.gif", // 버튼 이미지
		buttonImageOnly: true, // 버튼에 있는 이미지만 표시한다.
		minDate: '-100y', // 현재날짜로부터 100년이전까지 년을 표시한다.
		nextText: '다음 달', // next 아이콘의 툴팁.
		prevText: '이전 달', // prev 아이콘의 툴팁.
		numberOfMonths: [1,1], // 한번에 얼마나 많은 월을 표시할것인가. [2,3] 일 경우, 2(행) x 3(열) = 6개의 월을 표시한다.
		//stepMonths: 3, // next, prev 버튼을 클릭했을때 얼마나 많은 월을 이동하여 표시하는가.
		yearRange: 'c-100:c+10', // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.
		showButtonPanel: true, // 캘린더 하단에 버튼 패널을 표시한다.
		currentText: 'Today' , // 오늘 날짜로 이동하는 버튼 패널
		closeText: '닫기',  // 닫기 버튼 패널
		dateFormat: "yy-mm-dd", // 텍스트 필드에 입력되는 날짜 형식.
		showAnim: "slide", //애니메이션을 적용한다.
		showMonthAfterYear: true, // 월, 년순의 셀렉트 박스를 년,월 순으로 바꿔준다.
		beforeShow: function (input) { 
			dpClearButton(input);
		},
		onChangeMonthYear: function (input) { 
			dpClearButton(input);
		}
	});

	function dpClearButton (input) {
		setTimeout(function() {
			$('<button type=button class=clear><span>clear</span></button>').click(function(){
			var instance = input;
			$.datepicker._clearDate( instance );
			}).insertAfter('.ui-datepicker-current.ui-state-default.ui-priority-secondary.ui-corner-all');
			$("#ui-datepicker-div").wrapInner( "<div class='datepickerbox'></div>");
			$(".ui-datepicker-title>.ui-datepicker-year").after("<span>.</span>");
		}, 1 );
	}
	//$(".datepicker").datepicker('refresh');

}

var isDebugging = false;
function debug(data){
	if(typeof(console) != 'undefined'){
		if(isDebugging) console.log(data);
	}
}

//카운트다운 스크립트
var RemainTime
function showCountdown(ExpireTime, objId)
{
    var day, hour, min, sec, mod;
    var CountText;
    RemainTime = ExpireTime - 1;

    CountText = "";

    //    지나간자료는 나타내지않음
    if (RemainTime >= 0)
    {
        //    남은일수
        day = Math.floor(ExpireTime / (3600 * 24));
        mod = ExpireTime % (24 * 3600);
        //    남은시간
        hour = Math.floor(mod / 3600);
        mod = mod % 3600;
        //    남은분
        min = Math.floor(mod / 60);
        //    남은초
        sec = mod % 60;

        CountText = (day > 0) ? day + "일 " : "";
        CountText = (hour > 0) ? CountText + hour + "시간 " : (CountText.length > 0) ? CountText + hour + "시간 " : CountText;
        CountText = (min > 0) ? CountText + min + "분 " : (CountText.length > 0) ? CountText + min + "분 " : CountText;
        CountText = CountText + sec + "초"
    }

    if (( sec <= 0 && CountText == "0초" ) )
    {
        //    이제그만...
        CountText = "종료";
    }

    //    화면에 값 뿌려주기...
    //window.document.all.Countdown.value = CountText;
    //$("#remainTime").text(CountText);
    $("#"+objId).text(CountText);
    

    if (CountText != "" && CountText != "종료")
    {
        //    매 1초마다 재귀호출
        setTimeout("showCountdown(RemainTime,'"+ objId+"')", 1000);
    }
}

$(function(){
	
	// set default block ui
 	$.blockUI.defaults.message = '<img src="/images/common/bg/loading_box.gif" />';
	//$.blockUI.defaults.css.border = '1px solid #aaa';
	$.blockUI.defaults.css.backgroundColor = '#fff';	
	$.blockUI.defaults.css.width = '241px';
	$.blockUI.defaults.css.height = '134px';
	
	
	$.blockUI.defaults.overlayCSS.opacity = 0.5;
	
	$.fn.deleteLabel = function () {
		if ($(this).val().length == 0) {
			$(this).prev("label").show();
		}else{
			$(this).prev("label").hide();
		}
	}
});

function fnLAjaxListCss(){ // ajax 호출 후 리스트 css 재적용시 호출
	$("div.board_list tr td").each(function(index){ //Board Mouse Over
		$(this).parent().mouseover(function(){			
			$(this).addClass("on");
			$("div.board_list tr.on td a").addClass("on");
		});
		$(this).parent().mouseout(function(){			
			$(this).removeClass("on");
			$("div.board_list tr td a").removeClass("on");
		});
	});
}

//타겟으로 스크롤링 되게 하는 함수
//targetStr(class인경우 ".className" , id인경우 "#ObjId") 
function fnGoScroll(targetStr){
	 $('html,body').animate({scrollTop:$(targetStr).offset().top},'slow');
}

//EUC한글 체크
CHECK_CHARS =  "가각간갇갈갉갊감갑값갓갔강갖갗같갚갛개객갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫났낭낮낯낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫달닭닮닯닳담답닷닸당닺닻닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많맏말맑맒맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바박밖밗반받발밝밞밟밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤샥샨샬샴샵샷샹섀섄섈섐섕서석섞섟선섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄업없엇었엉엊엌엎에엑엔엘엠엡엣엥여역엮연열엶엷염엽엾엿였영옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응읒읓읔읕읖읗의읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝";
CHECK_CHARS += "　！'，．／：；？＾＿｀｜￣、。?‥…¨〃￢―∥＼～´?ˇ˘˝˚˙¸˛¡¿ː＂（）［］｛｝‘’“”〔〕〈〉《》「」『』【】+－＜=＞±×÷≠≤≥∞∴♂♀∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢⇒⇔∀∃∮∑∏＄％￦Ｆ′″℃Å￠￡￥¤℉‰㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎦㎙㎚㎛㎜㎝㎞㎟㎠㎡㎢㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰㎱㎳㎴㎵㎶㎷㎸㎹㎀㎁㎂㎃㎄㎺㎻㎼㎽㎾㎿㎐㎑㎒㎓㎔Ω㏀㏁㎊㎋㎌㏖㏅㎭㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆＃＆＊＠■※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞■†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡■■─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃╄╅╆╇╈╉╊㉠㉡㉢㉣㉤㉥㉦㉧㉨㉩㉪㉫㉬㉭㉮㉯㉱㉲㉳㉴㉵㉶㉷㉸㉹㉺㉻㈀㈁㈂㈃㈄㈅㈆㈇㈈㈉㈊㈋㈌㈍㈎㈏㈐㈑㈒㈓㈔㈕㈖㈗㈘㈙㈚㈛ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⑻⒵⑴⑵⑶⑷⑸⑹⑺⒴⑼⑽⑾⑿⒀⒁⒂ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ½⅔⅔¼¾⅛⅜⅝⅞¹²³⁴ⁿ₁₂₃₄ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣㅥㅦㅧㅨㅩㅪㅫㅬㅭㅮㅯㅰㅱㅲㅳㅴㅵㅶㅷㅸㅹㅺㅻㅼㅽㅾㅿㆀㆁㆂㆃㆄㆅㆆㆇㆈㆉㆊㆋㆌㆍㆎＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚㅍΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω";

CHECK_CHARS += "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
CHECK_CHARS += "ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ";
CHECK_CHARS += "ァィゥェォアイウエオカキクケコガギグゲゴサシスセソザジズゼゾタチッツテトダヂヅデドナニヌネノハヒフヘホバビブベボパピプペポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ";
CHECK_CHARS += "ぁぃぅぇぉあいうえおかきくけこがぎぐげごさしすせそざじずぜぞたちっつてとだぢづでどなにぬねのはひふへほばびぶべぼぱぴぷぺぽまみむめもゃやゅゆょよらりるれろゎわゐゑをん";
//CHECK_CHARS += "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";

//천자문
CHECK_CHARS += "天地玄黃宇宙洪荒日月盈?辰宿列張寒來暑往秋收冬藏閏餘成歲律呂調陽雲騰致雨露結爲霜金生麗水玉出崑岡劍號巨闕珠稱夜光果珍李柰菜重芥薑海鹹河淡鱗潛羽翔龍師火帝鳥官人皇始制文字乃服衣裳推位讓國有虞陶唐弔民伐罪周發殷湯坐朝問道垂拱平章愛育黎首臣伏戎羌遐邇壹體率賓歸王鳴鳳在樹白駒食場化被草木賴及萬方蓋此身髮四大五常恭惟鞠養豈敢毁傷女慕貞烈男效才良知過必改得能莫忘罔談彼短靡恃己長信使可覆器欲難量墨悲絲染詩讚羔羊景行維賢克念作聖德建名立形端表正空谷傳聲虛堂習聽禍因惡績福緣善慶尺璧非寶寸陰是競資父事君曰嚴與敬孝當竭力忠則盡命臨深履薄夙興溫淸似蘭斯馨如松之盛川流不息淵澄取映容止若思言辭安定篤初誠美愼終宜令榮業所基籍甚無竟學優登仕攝職從政存以甘棠去而益詠樂殊貴賤禮別尊卑上和下睦夫唱婦隨外受傅訓入奉母儀諸姑伯叔猶子比兒孔懷兄弟同氣連枝交友投分切磨箴規仁慈隱惻造次弗離節義廉退顚沛匪虧性靜情逸心動神疲守眞志滿逐物意移堅持雅操好爵自?都邑華夏東西二京背邙面洛浮渭據涇宮殿盤鬱樓觀飛驚圖寫禽獸畵彩仙靈丙舍傍啓甲帳對楹肆筵設席敲瑟吹笙陞階納陛弁轉疑星右通廣內左達承明旣集墳典亦聚群英杜藁鍾隸漆書壁經府羅將相路夾槐卿戶封八縣家給千兵高冠陪輦驅?振纓世祿侈富車駕肥輕策功茂實勒碑刻銘磻溪伊尹佐時阿衡奄宅曲阜微旦孰營桓公匡合濟弱扶傾綺回漢惠說感武丁俊乂密勿多士寔寧晋楚更覇趙魏困橫假途滅踐土會盟何遵約法韓弊煩刑起頗牧用軍最精宣威沙漠馳譽丹靑九州禹跡百郡秦幷嶽宗恒岱禪主云亭雁門紫塞鷄田赤城昆池碣石鉅野洞庭曠遠綿邈巖岫杳冥治本於農務玆稼穡載南畝我藝黍稷稅熟貢新勸賞黜陟孟軻敦素史魚秉直庶幾中庸勞謙謹勅聆音察理鑑貌辨色貽厥嘉猷勉其祗植省躬譏誡寵增抗極殆辱近恥林皐幸卽兩疏見機解組誰逼索居閑處沈默寂寥求古尋論散慮逍遙欣奏累遣謝歡招渠荷的歷園莽抽條枇杷晩翠梧桐早凋陳根委落葉飄游獨運凌摩絳耽讀翫市寓目囊箱易攸畏屬耳垣牆具膳飡飯適口充腸飽烹宰飢厭糟糠親戚故舊老少異糧妾御績紡侍巾房紈扇圓潔銀燭煌晝眠夕寐藍筍象牀絃歌酒接杯擧觴矯手頓足悅豫且康嫡後嗣續祭祀蒸嘗稽再拜悚懼恐惶牒簡要顧答審詳骸垢想浴執熱願凉驢犢特駭躍超誅斬賊盜捕獲叛亡布射遼丸琴阮嘯恬筆倫紙鈞巧任釣釋紛利俗竝皆佳妙毛施淑姿工嚬姸笑年矢每催曦暉朗曜琁璣縣斡晦魄環照指薪修祐永綏吉矩步引領俯仰廊廟束帶矜莊徘徊瞻眺固陋寡聞愚蒙等謂語助者焉哉乎也";

//중학교 기초한자900
//CHECK_CHARS += "家佳街可歌加價假角各脚干間看渴甘減感敢甲江降講强改皆個開客更去巨居車擧建乾犬見堅決結潔京景輕經庚耕敬驚慶競癸季界計溪鷄古故固苦考高告谷曲穀困坤骨工功空共公果課科過官觀關光廣交校敎橋九口救究久舊句球國君軍郡弓權卷勸貴歸均極近勤根金今禁給及急記期基氣技其幾己起旣吉暖難南男內乃女年念怒農能多單短端丹但達談答堂當大對代待德刀到度道島都圖徒獨讀同洞童冬東動斗豆頭得等登燈落樂卵浪郞來冷良兩量　旅力歷連練列烈令領例禮路老勞露綠論料流柳留六陸倫律里理利李林立馬莫萬滿晩末望亡忙忘每買賣妹麥免勉面眠名命明鳴母毛暮木目卯妙武務無戊茂舞墨門問聞文物勿未味美米尾民密朴反飯半發方放訪房防拜杯白百番伐凡法變別病兵丙保步報福服復伏本奉逢夫父富婦扶部否浮北分不佛朋比非備悲飛鼻貧氷四士史師死思事仕射謝使舍巳寺私絲山産算散殺三上尙常賞商相霜想傷喪色生西序書暑夕石昔惜席先線善選鮮船仙舌雪說設姓性成城誠盛省星聖聲世洗稅細勢歲小少所消素笑俗速續孫送松水手受授守收數首誰須雖愁樹壽修秀叔淑宿順純戌崇習拾勝乘承市示是時詩視始施試氏食植識式身神臣信新申辛失室實心深甚十兒我惡安案顔眼暗巖仰愛哀夜野也約藥弱若羊洋養陽讓揚魚語漁於憶億言嚴業餘與余汝如易逆亦然硏煙熱悅炎葉永英迎榮藝五午吾悟誤烏玉屋溫瓦臥完曰王往外要欲浴用勇容宇右牛友雨于憂又尤遇雲運云雄元原遠園願怨圓月位危爲偉威由油酉有猶唯遊柔遺幼肉育恩銀乙音飮陰吟邑泣應衣義議醫意依矣二耳移以已而異益人因引仁忍認寅印一日壬入子字自者慈　作昨長場將章壯材財在再才栽哉爭貯低著的赤適敵田全前展電傳典戰錢節絶店接正政定情庭精丁頂停井貞靜淨弟題除帝製第祭諸早造鳥調朝助祖兆足族存尊卒種從宗終鐘左坐罪主注住晝酒宙朱走竹中衆重卽增曾證只止知地指志支至紙枝持之直眞進辰盡質集執此次借且着察參唱昌窓採菜責冊處妻尺千天川淺泉鐵靑淸聽請晴體初草招村寸最秋追推祝丑春出充忠蟲取就吹治致齒則親七針快打他脫探太泰宅土通統退投特波破判八敗貝篇便片平閉布抱暴表品風　皮彼必匹筆下何夏賀河學寒韓漢恨限閑合恒海解害亥行幸香鄕向虛許革現賢血協兄形刑惠好號湖乎虎戶呼或混婚紅火化花和話華貨　歡患活黃皇回會孝效後厚訓休凶胸黑興喜希";

//고등학교 기초한자 900
//CHECK_CHARS += "架暇却閣覺刻刊肝幹簡姦懇監鑑康剛鋼綱介慨槪蓋距拒據健件傑乞儉劍檢格擊激隔絹肩遣牽缺兼謙竟境鏡頃傾硬警徑卿系係戒械繼契桂啓階繫枯姑庫孤鼓稿顧哭孔供恭攻恐貢寡誇郭館管貫慣冠寬鑛狂掛塊愧怪壞郊較巧矯丘俱懼狗龜驅構具區拘球苟菊局群屈窮宮券拳厥軌鬼規叫糾菌克劇斤僅謹琴禽錦級肯忌棄祈豈機騎紀飢旗欺企奇寄器畿緊那諾納娘奈耐寧努奴腦惱泥茶旦團壇斷段檀淡擔畓踏唐糖黨貸臺隊帶桃稻跳途陶逃倒導挑盜渡塗毒篤督豚敦突凍銅鈍屯騰羅絡亂欄蘭濫覽廊略掠梁糧諒麗慮勵曆鍊憐聯戀蓮劣裂廉獵零靈嶺隷爐祿錄鹿弄賴雷了僚龍屢樓累淚漏類輪栗率隆陵吏離裏履梨隣臨磨麻幕漠漫慢茫妄罔媒梅埋脈孟盲盟猛綿滅銘冥募某謀貌慕模侮冒牧睦沒夢蒙墓廟苗貿霧默微眉迷敏憫蜜泊博拍薄迫叛班返盤般伴髮拔倣芳邦妨傍培輩倍排配背伯煩飜繁罰範犯壁碧辨辯邊竝屛補寶譜普卜複腹覆蜂鳳封峯符簿賦赴附付腐府副負紛奮墳奔粉憤拂崩卑妃批肥碑　婢費賓頻聘似捨斯沙蛇詐詞賜寫辭邪査斜司社祀削朔嘗裳詳祥床象像桑狀償雙塞索敍徐庶恕署緖誓逝析釋宣禪旋涉攝召昭蘇騷燒訴掃疏蔬束粟屬損訟誦頌刷鎖衰囚睡輸遂隨帥獸殊需垂搜孰肅熟循旬殉瞬脣巡術述濕襲僧昇侍矢息飾伸愼晨審尋牙亞芽雅餓岳雁岸謁壓押央殃涯厄額耶躍樣壤楊御抑焉予輿域役驛疫譯宴燕沿燃演鉛延軟緣閱染鹽泳詠映營影豫譽銳傲嗚娛汚獄翁擁緩畏腰遙謠搖慾辱庸偶愚郵羽優韻援院源員越緯胃謂違圍慰僞衛委幽惟維乳儒裕誘愈悠閏潤隱淫凝儀疑宜夷翼姻逸任賃刺姿紫資玆恣爵酌殘潛暫雜張粧腸莊裝墻障藏丈掌葬奬帳臟載災裁宰抵底寂摘滴績跡賊積籍專轉殿折切竊點漸占蝶廷訂程亭征整際堤濟制齊提弔照租燥組條操潮拙縱佐座周舟州柱株洲奏珠鑄準俊遵仲憎症蒸贈遲智誌池職織珍鎭振陳陣震姪疾秩徵懲差捉錯贊讚慙慘創暢蒼倉債彩策斥戚拓薦賤遷踐哲徹尖添妾廳替滯逮遞抄肖礎超秒促觸燭總聰銃催抽醜逐縮畜築蓄衝臭趣醉側測層恥値置漆沈侵寢枕浸稱墮妥托濁濯卓歎彈炭誕奪貪塔湯怠殆態澤擇討吐痛鬪透播罷派頗把販版板編遍偏評幣廢弊肺蔽胞包浦飽捕幅爆標票漂被避疲畢荷鶴旱汗割含咸陷巷港航抗項奚該核響享軒憲獻險驗顯懸玄縣絃穴嫌脅亨螢衡慧兮毫互浩胡豪護惑昏魂忽洪弘鴻禾禍擴確穫還環丸換荒況悔懷獲劃橫曉侯候毁輝揮携吸稀戱";

function DoCheckLang(str) 
{
	   var inText = str;
	   var ret;
	   var chr;

	   for (var i = 0; i < inText.length; i++)  {
			 ret = inText.charCodeAt(i);

			 if (ret > 127 && ret != 160)  {
					chr = inText.charAt(i);

					if(CHECK_CHARS.indexOf(chr) < 0) {
						  alert ( "[" + chr + "] 지원하지 않는 문자입니다.\n\n다른 문자로 변경하여 전송 해 주세요." ); 
						  return false;
					}
			 }
	   }
	   return true;
}
