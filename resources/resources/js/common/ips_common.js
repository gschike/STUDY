
var Common = function() {
	if( window.console == undefined ){ console = { log : function(){} }; } 

	this.DEFAULT_PATH = "/ajax/";
	//2018-04-16 by PHI
	this.NOTITALK_PATH = "/ajaxTalk/";
	this.BIZTALK_TEMPLATE_API_URL = "http://www.biztalk-center.co.kr/biztalkapi/template/";
	
	this.DEFAULT_AJX_TIME = 3000000;
	
	//  input 데이터 긁어오기
	this.getInputTagToJson = function(obj) {
		var str = "";

		$("input",obj).each(function() {
			//if($(this).parents().attr("id") == $(obj).attr("id")){//현재 div의 div의 input은 파싱 안함
				
				if($(this).attr("type") != "radio"){
					if(str.length) str += ",";
				}
				
				if(typeof($(this).attr("code")) == "string") {
					if($(this).attr("code").length > 0) {
						str += ''+$(this).attr("name")+':"'+encodeURIComponent($(this).attr("code"))+'"';
					}
					else str += ''+$(this).attr("name")+':"'+encodeURIComponent($(this).val())+'"';
				}
				else if($(this).attr("type") == "checkbox") {
					if(this.checked == true) {
						str += ''+$(this).attr("name")+':"'+encodeURIComponent($(this).val())+'"';
					}
					else {
						str += ''+$(this).attr("name")+':""';
					}
				}
				else if($(this).attr("type") == "radio"){
					if(this.checked == true) {
						if(str.length) str += ",";
						str += $(this).attr("name")+':"'+encodeURIComponent($(this).val())+'"';
					}
				}
				else{
					
					if($("input[name='"+$(this).attr("name")+"']",obj).length > 1){
						
						str += '"'+$(this).attr("name")+'":';
						var arrStr = "";
						$("input[name='"+$(this).attr("name")+"']",obj).each(function() {
							var item = $(this).val();
							if(item != ""){
								if(arrStr.length > 0) arrStr += ",";
								arrStr += '"'+encodeURIComponent(item)+'"';
							}
						});
						str += "["+arrStr+"]";

					}else{
						str += '"'+$(this).attr("name")+'":"'+encodeURIComponent($(this).val())+'"';	
					}
					
					//str += ''+$(this).attr("name")+':"'+encodeURIComponent($(this).val())+'"';
				}
			//}
		});
		
		$("textarea",obj).each(function() {
			if(str.length) str += ",";
			str += ''+$(this).attr("name")+':"'+encodeURIComponent($(this).val())+'"';
		});
		
		$("select",obj).each(function() {
			if(str.length) str += ",";
			str += ''+$(this).attr("name")+':"'+encodeURIComponent($("option:selected",$(this)).val())+'"';
		});
		//json 배열 파라미터 만들기 (toJsonArr())
		$("div",obj).each(function() {
			var arr = Common.toJsonArr(this);
			if(arr != ""){
				if(str.length) str += ",";
				str += ''+$(this).attr("id")+':'+arr+'';
			}
		});

		str = "{"+str+"}";
		var json = _IBJson.decode(str);
		
		return json;
	};

	//josn 배열 만들기
	this.toJsonArr = function(obj) {
		
		var json = "";
		
		var obj_tag = new Array(); 		// my object
		var object_val = $(obj).children("#objectArray").val();
	
		if(object_val != null && object_val != undefined){
			var names = object_val.split(":");
			for(var i = 0; i < names.length ; i++){
				obj_tag.push(names[i]);
			}
		}else{
			return "";
		}
		
		//파싱하기 (objectName, tag value null 일 경우 리턴)
		if(obj_tag == null || obj_tag.length < 0){
			json ="";
			return json;
		}
		
		$(obj_tag['0']).each(function(index){
			if(json.length) json += ",";
			var temp = "";
			for(var j = 0; j < obj_tag.length; j++){
				if(temp.length) temp += ",";
				var code = $(obj_tag[j]).eq(index).attr("id");
				var value = $(obj_tag[j]).eq(index).val();
				//temp += '"'+code+'":"'+encodeURIComponent(value)+'"';
				temp += '"'+code+'":"'+encodeURIComponent(value)+'"';
			}
			json +="{"+temp+"}";
		});
		json = "["+json+"]";
		return json;
	};
	
	

	//exception code alert msg
	this.getAlertMsg = function(code) {
		var code_msg_set = {
				//javascript code
				"201":"결과를 호출에 실패 했습니다."
				,"202":"결과를 받아 오지 못했습니다."				
				,"503":"로그인 정보가 잘못 되었습니다."	
				// common code
				, "0":"정상처리 되었습니다."
				, "1001":"플러스친구를 선택해주세요."
				, "1002":"업무구분 카테고리를 선택해주세요."
				, "1003":"템플릿코드가 중복되었습니다."
				, "1004":"템플릿제목을 확인해주십시오."
				, "1005":"템플릿코드 중복확인이 필요합니다."
				, "1006":"템플릿코드를 확인해주십시오."
				, "1007":"내용을 입력해주십시오."
				, "1008":"등록된 템플릿이 없습니다."
				, "1009":"검색어를 확인해 주십시오."
				, "1010":"검색된 템플릿이 없습니다."
				, "1011":"지원하지 않는 파일입니다."				
				, "1012":"파일을 선택해주십시오."
				, "1013":"미리보기 데이터가 없습니다."
				, "1014":"그룹명이 중복되었습니다."
				, "2000":"사원정보가 존재하지 않습니다."	
				, "2002":"업무구분 카테고리가 존재하지 않습니다."
				, "3000":"권한이 없습니다."
				, "4000":"회사 또는 부서의 서비스 이용이 중지되어 로그인할 수 없습니다.\n서비스 이용 여부를 확인해 주세요."
				, "8000":"로그인 페이지로 이동합니다."
				, "8001":"잘못 된 호출 입니다."
				, "8002":"존재하지 않는 페이지 입니다."
				, "9001":"입력 파라미터가 잘못 되었습니다."
				, "9002":"구문에러 입니다."
				, "9003":"BizTal Api 연동오류"
				, "9999":"알 수 없는 예외상황이 발생했습니다."
		};
		var return_msg = code_msg_set[code];
		if(return_msg == null || return_msg == "undefined") {
			return_msg = code+"예외 code 추가";
		}
		return return_msg;
	};
	
	this.getInspectionStatustMsg = function(code){
		var code_msg_set = {
				//javascript code
				"REG":"접수"
				,"APL":"등록"				
				,"INS":"검수중"	
				, "COM":"승인"
		};
		var return_msg = code_msg_set[code];
		if(return_msg == null || return_msg == "undefined") {
			return_msg = code+"예외 code 추가";
		}
		return return_msg;
	};
	
	// 페이징
	this.pagingDraw = function(obj, wrapObj) {		
		var data = {"total_count":obj.list.total_count,"current_page":obj.list.current_page,"vertical_count":obj.list.vertical_count,"horizon_count":obj.list.horizon_count};
		var result = _IBPaging.init(data);
		if(wrapObj == "" || wrapObj == undefined) wrapObj = $("#content");
		var str = "";

		if(result.prev > 0) str += "<li style=\"text-align:center;float:left;display:contents\"><a href=\"#none\" class=\"icon prev\" num=\""+result.prev+"\"><span>&lt;</span></a></li>";
		//else str += "<li><a href=\"#null\" class=\"icon prev\"><span>&lt;</span></a></li>";
		else str += "";
		str += "<li class=\"num\" style=\"text-align:center;float:left;display:contents\">";
		for(var i = result.page_start ; i < (result.page_start+result.horizon_count) ; i++) {
			if(i > result.last) break;

			if(i == result.current_page) 
				str += "<a href=\"#null\" name=\"number\" class=\"on\">"+i+"</a>";
			else 
				str += "<a href=\"#null\" name=\"number\" num=\""+i+"\">"+i+"</a>";
		}
		str += "</li>";
		if(result.next > 0) str += "<li style=\"text-align:center;float:left;display:contents\"><a href=\"#none\" class=\"icon next\" num=\""+result.next+"\"><span>&gt;</span></a></li>";
		//else str += "<li><a href=\"#null\" class=\"icon next\"><span>&gt;</span></a></li>";
		else str += "";
		$("#pagingDiv").html(str);
		$("#pagingDiv a[name='number']:first").addClass("first");
		
		//$("#pagingDiv a[name='number'],.paging a[class='prev'],.paging a[class='next']").unbind("click").click(function() {

		$("#pagingDiv a").unbind("click").click(function() {
			var page = $(this).attr("num");
			if(page != undefined) {
				var start = (page * obj.list.vertical_count) - obj.list.vertical_count;
				obj.list.current_page = page;
				_latest_mo = "";
				
				try {
					obj.search.get(start);
				}
				catch(e) {
					Common.getAlertMsg("502");
				}
			}
		});
	};	
	
	// 페이징
	this.pagingLayerDraw = function(obj, wrapObj) {		
		var data = {"total_count":obj.total_count,"current_page":obj.current_page,"vertical_count":obj.vertical_count,"horizon_count":obj.horizon_count};
		var result = _IBPaging.init(data);
		if(wrapObj == "" || wrapObj == undefined) wrapObj = $("#content");
		//console.log("pagingDraw :"+_IBJson.encode(data));
		//console.log("result :"+_IBJson.encode(result));
		var str = "";
		if(result.prev > 0) str += "<li style=\"text-align:center;float:left;display:contents\"><a href=\"#none\" class=\"icon prev\" num=\""+result.prev+"\"><span>&lt;</span></a></li>";
		//else str += "<li><a href=\"#null\" class=\"icon prev\"><span>&lt;</span></a></li>";
		else str += "";
		str += "<li class=\"num\" style=\"text-align:center;float:left;display:contents\">";
		for(var i = result.page_start ; i < (result.page_start+result.horizon_count) ; i++) {
			if(i > result.last) break;

			if(i == result.current_page) 
				str += "<a href=\"#null\" name=\"number\" class=\"on\">"+i+"</a>";
			else 
				str += "<a href=\"#none\" name=\"number\" num=\""+i+"\">"+i+"</a>";
		}
		str += "</li>";
		if(result.next > 0) str += "<li style=\"text-align:center;float:left;display:contents\"><a href=\"#none\" class=\"icon next\" num=\""+result.next+"\"><span>&gt;</span></a></li>";
		//else str += "<li><a href=\"#null\" class=\"icon next\"><span>&gt;</span></a></li>";
		else str += "";

		//console.log("paging str : " + str);
		//$("#pagingLayerDiv", obj.id).html(str);
		$("#pagingLayerDiv").html(str);
		//$("#pagingLayerDiv a[name='number']:first", obj.id).addClass("first");
		$("#pagingLayerDiv a[name='number']:first").addClass("first");
		//$("#pagingLayerDiv a[name='number'],.paging a[class='prev'],.paging a[class='next']").unbind("click").click(function() {
		//$("#pagingLayerDiv a", obj.id).unbind("click").click(function() {
		$("#pagingLayerDiv a").unbind("click").click(function() {
			var page = $(this).attr("num");
			if(page != undefined) {
				var start = (page * obj.vertical_count) - obj.vertical_count;
				obj.current_page = page;
				_latest_mo = "";
				
				try {
					obj.search.get(start, "paging");
				}
				catch(e) {
					Common.getAlertMsg("502");
				}
			}
		});
	};	

	// select tag 셋팅
	/*
	Common.setSelectTag({
		OBJECT_NAME : "name",
		API :"apiCall",
		DEFAULT : {NULL:"전체"},
		REVERSE : true						
	});
	*/
	this.setSelectTag = function(config) {
		var _id = "";
		
		//아이디
		if(typeof(config.SECTION) == "object") _id = $("select[name='"+config.OBJECT_NAME+"']", config.SECTION);
		else _id = $("select[name='"+config.OBJECT_NAME+"']");
		_id.html("");

		if(typeof(config.VALUE) != "object") config.VALUE = {CODE:"CODE",NAME:"NAME"};
		if(typeof(config.DEBUG) != "string" && typeof(config.DEBUG) != "boolean") config.DEBUG = false;
		if(typeof(config.API) != "string" && typeof(config.API) != "boolean") config.API = "";
		if(typeof(config.PARAM) != "object") config.PARAM = {"TYPE":""};
		if(typeof(config.REVERSE) != "string" && typeof(config.REVERSE) != "boolean") config.REVERSE = false;
		
		if(typeof(config.DEFAULT) == "object") {
			if(typeof(config.DEFAULT['NULL']) == "string" || typeof(config.DEFAULT['NULL']) == "number" ) _id.append('<option value="">'+config.DEFAULT['NULL']+'</option>');

			if(typeof(config.DEFAULT.length) == "number") {
				if(config.REVERSE == true) {
					var arrTmp = new Array();
					for(var i in config.DEFAULT) {
						arrTmp[arrTmp.length] = config.DEFAULT[i];
					}

					for(var i=(arrTmp.length-1);i>=0;i--) {
						var val = arrTmp[i];
						_id.append('<option value="'+val.CODE+'">'+val.NAME+'</option>');
					}
				}
				else {
					for(var i in config.DEFAULT) {
						var val = config.DEFAULT[i];
						_id.append('<option value="'+val.CODE+'">'+val.NAME+'</option>');
					}
				}
			}
			else {				
				if(config.REVERSE == true) {
					var arrTmp = new Array();
					for(var i in config.DEFAULT) {
						if(i != "NULL") {
							arrTmp[arrTmp.length] = {"CODE":i,"NAME":config.DEFAULT[i]};
						}
					}
					for(var i=(arrTmp.length-1);i>=0;i--) {
						var val = arrTmp[i];
						_id.append('<option value="'+val.CODE+'">'+val.NAME+'</option>');
					}
				}
				else {
					for(var i in config.DEFAULT) {
						if(i != "NULL") {
							var val = config.DEFAULT[i];
							if(val.length) _id.append('<option value="'+i+'">'+val+'</option>');
						}
					}
				}
			}
		}

		if(config.API.length > 0 || typeof(config.JSON) == "object") {
			var json = {procType:config.API};
			
			if(typeof(config.JSON) == "object") json = config.JSON;
			
			$.post(DEFAULT_PATH+"api.do",{jsonbody:_IBJson.encode(json)},function(_data, _status) {
				if(config.DEBUG == "true" || config.DEBUG == true) Common.debugDivDraw(_data);
				
				var json = _IBJson.decode(_data);
				if(json) {
					for(var i=0;i<json.data.length;i++) {
						var obj = json.data[i];
						_id.append('<option value="'+obj[config.VALUE.CODE]+'">'+obj[config.VALUE.NAME]+'</option>');
					}
				}
			});
		}
	};

	this.debugDivDraw = function(val) {
		if(typeof($("#div_debug").attr("id")) != "string") {
			$("body").append('<div id="div_debug" style="width:1500px;word-wrap:break-word;padding-top:20px"></div>');
		}

		if(typeof(val) == "object") {
			val = _IBJson.encode(val);
		}
		$("#div_debug").append(val+"<br><br>");
	};
	
	this.currentDate = function(dayOff, format){
		var nowDate = new Date();
		
		if(typeof dayOff != "undefined") nowDate.setDate(nowDate.getDate()+dayOff);
		if(typeof format == "undefined") format = ".";
		
		var year = nowDate.getFullYear();
		var month = nowDate.getMonth()+1;
		var date = nowDate.getDate();
		
		if(month < 10) month = "0"+month;
		if(date < 10) date = "0"+date;
		
		return year+format+month+format+date;
	};
	this.byteCheck = function(_this, cnt, message){
		var value = $(_this).val();
		
		if(value == null || value.length == 0) return;
		
		var nbytes = 0;
		nbytes  = _IBString.check_byte_size(value);
		
		if(nbytes > cnt){
            var str = _IBString.substring_byte_size(value, 0, cnt); 

            if(message != undefined){
				alert(message); 
			}
			
			$(_this).val(str);
			
			return false;
		}
		
		return nbytes;
	};	this.convFormat = function(value, type){
		if(typeof type == "undefined") type = "number";
		
		if(type == "phone"){
			return _IBCommon.format_phone(value);
		}else if(type == "number"){
			return _IBCommon.format_number(value);
		}else{
			return "";
		}
	};
	this.convFormat = function(value, type){
		if(typeof type == "undefined") type = "number";
		
		if(type == "phone"){
			return _IBCommon.format_phone(value);
		}else if(type == "number"){
			return _IBCommon.format_number(value);
		}else{
			return "";
		}
	};
	this.getMaxData = function(num){
		num =  num.toString(); 
		var len = num.length;
		var division = 1; 
		var maxData= 0;
		if(len == 1){		
			maxData = 10;
			return maxData;
		}else{
			if(len == 2){
				division = 10;		
			}else if(len > 2){
				for(var i=0; i<len-2; i++){
					division = division * 10;
				}
			}
			maxData = parseInt(num / division);
			maxData = parseInt(maxData) + parseInt(1);
			maxData = maxData * division;

			return maxData;
		}
	};
	
	//IE8일 경우, placeholder 처리
	this.searchValueCheck = function(obj){
		var placeholder = $(obj).attr("placeholder");
		var value = $(obj).val();
	
		if(placeholder == value){
			$(obj).val("");
		}
	};
	
	this.XSSfilter = function( content ) {
	    return _IBCommon.replace_tag(content);
	};	
	
	this.trim = function(value) {
		value = value.replace(/^\s*/, ""); // 앞 공백 제거
		value = value.replace(/\s*$/, ""); // 뒤 공백 제거
		return value;
	};
	//구분자로 나누어진 문자열을 최대 글자수로 제한하여 줄임말 표현
	//parameter : value-문자열, viewLength-보여줄 문자열의 최대 글자수, delimiter-구분자
	this.reduceWord = function(value, max_length, delimiter){
		
		if(typeof value == "undefined") return value;
		if(typeof max_length == "undefined") max_length = 100;
		if(typeof delimiter == "undefined") delimiter = ",";
		
		var valueLength = value.length;
		
		if(valueLength > max_length){
			var valueArr = value.split(delimiter);
			var remindCnt = 0;
			value = "";
			
			for(var j = 0;  j< valueArr.length; j++){
				var val = value;
				if(val != "") val += ", "+valueArr[j];
				else val += valueArr[j];
				
				if(val.length > max_length){
					remindCnt = valueArr.length - j;
					break;
				}
				value = val;
			}
			if(remindCnt > 0){
				value = value + "...외 "+remindCnt+"개";
			}
		}
		return value;
	};
	this.checkMixEngNum = function(value){
		var chk_num = value.search(/[0-9]/g);
		var chk_eng = value.search(/[a-z]/ig);
		if(chk_num < 0 || chk_eng < 0)  return false;
		return true;
	};
	this.checkRepeat= function(value){
		var dulCnt = 0;
		var seqCnt = 0;
		var seqReCnt = 0;
		
		var temppwd1 = "";
		var temppwd2 = "";
		for(var i=0; i<value.length; i++){
			temppwd1 = value.charAt(i);
			temppwd2 = value.charAt(i+1);
			
			if(temppwd1.search(/\W|\s/g) == -1 || temppwd2.search(/\W|\s/g) == -1){
				//동일문자 확인
				if(temppwd1 == temppwd2) dulCnt++;
				//연속성(+) 확인
				if(temppwd2.charCodeAt(0) - temppwd1.charCodeAt(0) == 1) seqCnt++;
				//연속성(-) 확인
				if(temppwd2.charCodeAt(0) - temppwd1.charCodeAt(0) == -1) seqReCnt++;
			}
		}
		
		if( dulCnt >= 3 || seqCnt >=3 || seqReCnt >=3) return false; 
		return true;
	};
	this.checkExtension = function(type , file_name){
		//type :2 excel
		var extensions  = Common.gettFileExt(2);
		extension = file_name.substring(file_name.lastIndexOf('.')+1);
		var temp = false;
		if(extension!=''){
		   for(var e=0; e<extensions.length; e++){
			   if(extensions[e].toLowerCase() == extension){
				   temp = true;
				   break;
			   }
		   }
		}else{
			temp = false;
		}
		return temp;
	};
	
	this.gettFileExt = function(type){
		var imgExtensionArr = ["png","bmp","jpg","jpeg","gif"];
		var excelExtensionArr = ["xlsx","xlsm","xlsb","xls"];
		var pptExtensionArr = ["ppt","pptm","pptx"];
		var wordExtensionArr = ["docx","docm","doc"];
		var etcDocumentExtensionArr = ["pdf","txt","hwp"];

		var extensions;
		 
		 switch(type){
		 	case 1 : extensions = imgExtensionArr;
		 		break;
		 	case 2 : extensions = excelExtensionArr;
		 		break;
		 	case 3 : extensions = pptExtensionArr;
		 		break;
		 	case 4 : extensions = wordExtensionArr;
		 		break;
		 	case 5 : extensions = etcDocumentExtensionArr;
		 		break;
		 	case 6 : extensions = allExtensionsArr;
		 		break;
		 	case 7 : extensions = documentExtensionArr;
		 		break;
		 	default : extensions = allExtensionsArr;
		 		break;
		 }
		 return extensions;
	};
	
};
var Common = new Common();

window.onload = function() {
	
	$(".icon-home a").click(function(){
		location.href = "/report/summary.do";
	});
	
	$('#logout').click(function(){
		var param = "";
		$.ajax({url : "/login/logout.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
			var json = _IBJson.decode(_data);
	
			if(json) {
				if(json.data) {
					var data = json.data;
					var result_code = data.resultCode;
					if(result_code == "1000") {
						alert("로그아웃 되었습니다.");
						location.href = "/common/loginForm.do";
					}else if(result_code == "2000") {
						//비밀번호 틀림
						alert(Common.getAlertMsg('504'));
					}
				}else {
					//json data not exist
					alert(Common.getAlertMsg("501"));
				}
			}
		}});
	});
};