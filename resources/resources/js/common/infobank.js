// ************************************************************************************************************************************************************************************
// AJAX ver 1.5(2012.12.28)
// ************************************************************************************************************************************************************************************
/*
###	connect : function(url, method, post_param, fn_success, fn_error, fn_changestatus) 
		* desc
			ajax를 이용하여 페이지를 호출 
		* request
			required string url
			required string method
			required json post_param
			required function fn_success
			optional function fn_error
			optional function fn_changestatus
		* response type
			json 
		* ex
			_IBAjax.connect("sample.html","POST", {"param":"123456"}, _callback_result, _callback_error, _callback_changestatus, _callback_type);
*/
	_IBAjax = {
		callback_type : null,
		// page 호출
		connect : function(url, method, post_param, fn_success, fn_error, fn_changestatus, _callback_type) {
			var _xhr = null;
			var _data = null;

			if(_callback_type == "TEXT") _IBAjax.callback_type = _callback_type;
			else _IBAjax.callback_type = "JSON";
	
			// request http
			try{
				_xhr = _IBAjax._getXHRObject();
				_xhr.open(method , url , true);
				_xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
				_xhr.onreadystatechange = function() 
				{
					try
					{
						_data = _IBAjax._xhr_parse(_xhr, url, fn_success, post_param);
						fn_changestatus(_data);
					}
					catch (e){}
					

					if (_xhr.readyState == 4)
					{
						if(_xhr.status == 200){
							_data = _IBAjax._xhr_parse(_xhr, url, fn_success, post_param);

							fn_success(_data);
						}
						else {
							try {
								_data = _IBAjax._xhr_parse(_xhr, url, fn_success, post_param);
								fn_error(_data);
							}
							catch(ex){
								_data = _IBAjax._xhr_parse(_xhr, url, fn_success, post_param);
								fn_error(_data);
							}
						}
					}
				};
			
				var param = "";
				for(var i in post_param) {
					if(param.length > 0) param += "&";
					param += i + "=" + (post_param[i]);
				}

				//alert(param);

				_xhr.send(param);
			}
			catch(e) {
				try {
					_data = _IBAjax._xhr_parse(_xhr, url, fn_success, post_param);
					fn_error(_data);
				}
				catch(ex){
					_data = _IBAjax._xhr_parse(_xhr, url, fn_success, post_param);
					fn_error(_data);
				}
			}
		},
		// ajax object 선언
		_getXHRObject : function(){
			if (typeof window.XMLHttpRequest != 'undefined') {
				XMLHTTP = new XMLHttpRequest;
			}
			else if (typeof window.ActiveXObject) {
				try {
					XMLHTTP = new ActiveXObject('Msxml2.XMLHTTP');
				}
				catch (ex) {
					XMLHTTP = new ActiveXObject('Microsoft.XMLHTTP');
				}
			}
			return(XMLHTTP);
		},
		// data parse
		_xhr_parse : function(_xhr, url, fn_success, post_param) {
			var tmp = null;
			var name = null;

			var responseBody = null;
			var status = null; 
			var statusText = null;
			var onload = null;
			var readyState = null;

			for(var i in _xhr) {
				name = i;
				tmp = _xhr[i];

				if("responseBody" == name || "responseText" == name || "responseXML" == name) {
					if(_IBAjax.callback_type == "JSON") tmp = _IBJson.decode(_xhr[i]);
					responseBody = tmp;
				}
				else if("status" == name) status = tmp;
				else if("statusText" == name) statusText = tmp;
				else if("onload" == name) onload = tmp;
				else if("readyState" == name) readyState = tmp;
			}


			//_return = _IBJson.decode({"status":"'+status+'","statusText":"'+statusText+'","onload":"'+onload+'","readyState":"'+readyState+'","url":"'+url+'","fn":"'+encodeURIComponent(fn_success)+'","post_param":'+_IBJson.encode(post_param)+',"responseBody":'+responseBody+'});
			_return = {"status":status,"statusText":statusText,"onload":onload,"readyState":readyState,"url":url,"post_param":_IBJson.encode(post_param),"responseBody":responseBody};
			//_return = $.extend(_return, _data);

			return _return;
		}
	};


// ************************************************************************************************************************************************************************************
// Browser
// ************************************************************************************************************************************************************************************
/*
###	get_size_width : function()
		* desc
			브라우저의 가로 사이즈를 가져 옴
		* response type
			number
		* ex
			var width = _IBBrowser.get_size_width();

###	get_size_height : function()
		* desc
			브라우저의 세로 사이즈를 가져 옴
		* response type
			number
		* ex
			var height = _IBBrowser.get_size_height();

###	is_mobile : function()
		* desc
			모바일 기기인지 체크
		* response type
			boolean
		* ex
			var mobile = _IBBrowser.is_mobile();

###	in_device : function(value)
		* desc
			브라우저 타입 체크하기
		* request
			required string value (파이프 라인으로 구분지어 2개 이상 조회 가능)
		* response type
			boolean
		* ex
			var device = _IBBrowser.in_device("iphone|ipod|ipad");
*/
	_IBBrowser = {
		// 브라우저의 가로 길이
		get_size_width : function() {
			if(document.documentElement && document.documentElement.clientWidth) 
				return parseInt(document.documentElement.clientWidth);
			else 
				return parseInt(document.body.clientWidth);
		},
		// 브라우저의 세로 길이 
		get_size_height : function() {
			if(document.documentElement && document.documentElement.clientHeight) 
				return parseInt(document.documentElement.clientHeight);
			else 
				return parseInt(document.body.clientHeight);
		},
		// 제품명과 회사명을 이용한 모바일기기 체크
		is_mobile : function() {
			var UserAgent = navigator.userAgent;
			if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) return true;
			else return false;
		},
		// device가 포함되어 있는지 체크 파이프라인(|)으로 디바이드 중복 입력 가능(기본값은 iphone|ipod|mobile safari)
		in_device : function(value) {
			if(value == "undefiend" || value == undefined || value.length == 0) value = "iphone|ipod|mobile safari";	 // default value;
			//var value = new Array("iphone","ipod","mobile safari"); // iphone, ipod, ipad, mobile safari(안드로이드폰), android(안드로이드폰, 안드로이드패드)
			//value = value.join("|").toLowerCase();
			var UserAgent = navigator.userAgent.toLowerCase();			
			if(UserAgent.match(value) != null) return true;
			else return false;
		}
	};


// ************************************************************************************************************************************************************************************
// Common
// ************************************************************************************************************************************************************************************	
/*
###	format_number : function(value)
		* desc
			숫자값을 3자리 단위로 (,)를 넣어 number format으로 리턴
		* request
			required number value
		* response type
			string
		* ex
		
###	format_phone : function(value)
		* desc
			전화번호 형태로 파싱하여 리턴 01012345678 => 010-1234-5678
		* request
			required number value
		* response type	
			string
		* ex
		
###	is_email : function(value)
		* desc
			이메일 형식이 맞는지 체크(맞다면 true)
		* request
			required string value
		* response type
			boolean
		* ex
		
###	is_phone : function(value)		
		* desc
			폰번호 형식이 맞는지 체크
		* request
			required string value
		* response type
			boolean
		* ex
		
###	is_url : function(value)
		* desc
			url 형식이 맞는지 체크
		* request
			required string value
		* response type
			boolean
		* ex
		
###	is_numeric : function(value)
		* desc
			숫자인지 아닌지 체크
		* request
			required object value
		* response type
			boolean
		* ex
		
###	is_null : function(value)
		* desc
			null값인지 아닌지 체크
		* request
			required object value
		* response type
			boolean
		* ex
		
###	check_type : function(value)
		* desc
			변수의 타입을 리턴
		* request
			required object value
		* response type
			string
		* ex
		
###	byte_separate : function(value)
		* desc
			byte 데이터를 2진수로 끊어서 array 형태로 리턴
		* request
			required number value
		* response type
			array
		* ex
		
###	byte_combine : function(arr)
		* desc
			byte 데이터를 합친다. `"1,4,128"` or `new Array(1, 4, 128)` or `new Array("1","4","128")`
		* request
			required array arr
		* response type
			string
		* ex
		
###	get_cookie : function(cKey)
		* desc
			쿠키 조회(키)
		* request
			required string cKey
		* response type
			string
		* ex
		
###	set_cookie : function(cKey, cValue, cDate, cPath)  name,pwd
		* desc
			쿠키 설정(키, 값, 날짜(일단위), 경로)
		* request
			required string cKey
			required string cValue
			optional string cDate
			optional string cPath
		* response type
			null
		* ex

###	format_zero_byte : function(value, len)
		* desc
			숫자 앞에 0을 붙여서 마지막 len 길이만큼 리턴
		* request
			required number value
			optional number len(default : 2)
		* response type
			string
		* ex
		
###	format_datetime : function(timestamp, ttype, lang, rtype)
		* desc
			uuid에서 시간값 가져오기
		* request
			required number timestamp
			optional number ttype (default : 24...12)
			optional string lang (default : kr....en)
			optioanl string rtype (default : datetime.......datetime2, date, time)
		* response type
			string
		* ex

###	UTF8_encode : function(value)
		* desc
			UTF8 Encode
		* request
			required string value
		* response type
			string
		* ex
		
###	UTF8_decode : function(value)
		* desc
			UTF8 Decode
		* request
			required string value
		* response type
			string
		* ex
		
###	base64_encode : function(value)
		* desc
			base64로 encoding
		* request
			required string value
		* response type
			string
		* ex
		
###	base64_decode : function(value)
		* desc
			base64로 decoding
		* request
			required string value
		* response type
			string
		* ex

###	is_valid_only_number : function(value) 
		* desc
			숫자만 존재하는지 유효성 체크
		* request
			required string value
		* response type
			boolean

###	is_valid_only_kor : function(value) 
		* desc
			한글만 존재하는지 유효성 체크
		* request
			required string value
		* response type
			boolean

###	is_valid_only_eng : function(value) 
		* desc
			영어만 존재하는지 유효성 체크
		* request
			required string value
		* response type
			boolean

###	is_valid_date : function(ymd) 
		* desc
			날짜값 유효성 체크
		* request
			required string ymd
		* response type
			boolean

###	is_valid_name_type : function(value)
		* desc
			이름 타입이 맞는지 체크(영문, 한글, 숫자, 싱글쿼터만 허용)
		* request
			required string value
		* response type
			boolean

###	is_valid_id_type : function(value)
		* desc
			아이디 타입이 맞는지 체크(영문, 숫자, 일부 특수문자만 허용)
		* request
			required string value
		* response type
			boolean

###	compare_pwd : function(value1, value2, len) 
		* desc
			비밀번호와 비밀번호 확인의 값을 비교 체크(-10 : value1의 값이 없음, -11 : value1의 길이가 len보다 짧음, -20 : value2의 값이 없음, -21 : value2의 길이가 len보다 짧음, -30 : value1과 value2의 값이 맞지 않음, 1 : 서로 맞음)
		* request
			required string value1
			required string value2
			optional number len(default : 1)
		* response type
			number

###	remove_tag : function(value) 
		* desc
			문자열에서 tag를 모두 삭제 한다
		* request
			required string value
		* response type
			string

###	replace_tag : function(value) 
		* desc
			tag의 괄호를 &lt; &gt;로 바꾼다.
		* request
			required string value
		* response type
			string

###	replace_url_text : function(value, target)
		* desc
			url이나 email에 대해서 <a> tag로 감싼다 
		* request
			required string value
			optional string target(default : _blank)
		* response type
			string

###	onload_img_resize : function(obj, maxWidth, maxHeight) 
		* desc
			이미지 리사이징(onload 할때부터 이미지를 비율에 맞게 리사이징해서 불러 옴)
		* request
			required object obj
			required number maxWidth
			required number maxHeight
		* response type
			null
		* ex
			<img src="image.jpg" onload="_IBCommon.onload_img_resize(this, 100, 100);">


###	get_img_size : function(obj)		
		* desc
			이미지의 사이즈를 가져 옴
		* request
			required string obj
		* response type
			array
		* ex
			<img src="image.jpg" id="img1">	_IBCommon.get_img_size('img1');


###	resize_img : function(obj, maxWidth, maxHeight)
		* desc
			이미지 리사이징
		* request
			required string obj
			required number maxWidth
			required number maxHeight
		* response type
			null
		* ex
			_IBCommon.resize_img('img1',200,300)

*/
	_IBCommon = {
		// 숫자만 입력 가능하도록
		only_number : function() {
			_IBCommon.input_only_number();
		},
		input_only_number : function() { // onkeypress="_IBCommon.input_only_number();" onBlur="_IBCommon.input_only_number();" style="ime-mode:disabled;"
		  var key = event.keyCode;

		  if(!(key==8||key==9||key==13||key==16||key==17||key==39||key==37||key==65||key==67||key==86||key==187||key==189||key==46||key==144||(key>=48 && key<=57)||key==110||key==190||key==45||key==35 || (key >=96 && key <=105))) {
			  event.returnValue = false;
		  }
		  else return true;
		},
		// 숫자값을 3자리 단위로 (,)를 넣어 number format으로 리턴
		format_number : function(value) {
			if(value == "" || value == null) value = 0;
			return value.toString().replace( /([0-9]+?)(?=(?:[0-9]{3})+$)/g , '$1,' );
		},
		// 전화번호 형태로 파싱하여 리턴 01012345678 => 010-1234-5678
		format_phone : function(value) {
			if(typeof(value) != "string") return "";
			if(value.length == 0) return value;
			
			value = (value.replace(/[^0-9#]/g, ""));

			if(value.substring(0,1)=="#") return value;

			var arrNum = new Array();
			var list = ",02,051,053,032,062,042,052,031,033,043,041,063,061,054,055,064,010,011,013,014,015,016,017,018,019,070,080,060";

			if(list.indexOf(","+value.substring(0,2)+",") >= 0) {
				arrNum[0] = value.substring(0,2);
				value = "0"+value;
			}
			else arrNum[0] = value.substring(0,3);
			
			if(value.length >= 11) {
				arrNum[1] = value.substring(3,7);
				arrNum[2] = value.substring(7,20);
			}
			else {
				arrNum[1] = value.substring(3,6);
				arrNum[2] = value.substring(6,20);
			}

			var $return = "";
			$return = arrNum[0];
			if($return.length > 0 && arrNum[1].length > 0) $return += "-";
			$return += arrNum[1];
			if($return.length > 0 && arrNum[2].length > 0) $return += "-";
			$return += arrNum[2];
			
			if(value.length == 8 && value.substring(0,2) == "15") {
				$return = value.substring(0,4) + "-" + value.substring(4,8);
			}

			return $return;
		},
		// 이메일 형식이 맞는지 체크(맞다면 true)
		is_email : function(value) {
			var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;

			 //입력을 안했다면
			 if(value.length == 0) return true;
	 
			 //데이터 형식이 맞지 않다면
			 if (!value.match(regExp)) return false;
			 else return true;
		},
		
		// 폰번호 형식이 맞는지 체크
		is_phone : function(value) {		
			var regExp1 = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
			 //입력을 안했다면
			 if(value.length == 0) return false;
			 //데이터 형식이 맞지 않다면
			 if (value.match(regExp1)) return 1;
			 else return false;
		},
		
		// 폰번호 + 일반전화번호 형식이 맞는지 체크
		is_phone_tel : function(value) {		
			var regExp1 = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
			var regExp2 = /^0\d{1,3}-?\d{3,4}-?\d{4}$/;
			 //입력을 안했다면
			 
			 if(value.length == 0) return false;
	 
			 //데이터 형식이 맞지 않다면
			 if (value.match(regExp1)) return 1;
			 else if (value.match(regExp2)) return 2;
			 else return false;
		},
		
		// url 형식이 맞는지 체크
		is_url : function(value) {
			var regExp = /^([a-z]+):\/\/((?:[a-z가-힣\d\-]{2,}\.)+[a-z]{2,})(:\d{1,5})?(\/[^\?]*)?(\?.+)?$/i;

			 //입력을 안했다면
			 
			 if(value.length == 0) return false;
	 
			 //데이터 형식이 맞지 않다면
			 if (!value.match(regExp)) return false;
			 else return true;
		},
		// 숫자인지 아닌지 체크
		is_numeric : function(value) {
			var num = parseInt(value); // 정수 변환
			if (isNaN(num)) { // 값이 NaN 이면 숫자 아님.
				return false;
			}
			
			return true;
		},
		// null값인지 아닌지 체크
		is_null : function(value) {
			if(value == undefined) return true;
			if(value.length == 0) return true;
			else return false;
		},
		// 날 짜 유효성 체크(월)
		is_valid_month : function(mm) {
			var m = parseInt(mm,10);
			return (m >= 1 && m <= 12);
		},
		// 날짜 유효성 체크(일)
		is_valid_day : function(yyyy, mm, dd) {
			var m = parseInt(mm,10) - 1;
			var d = parseInt(dd,10);
			var end = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
			if ((yyyy % 4 == 0 && yyyy % 100 != 0) || yyyy % 400 == 0) {
				end[1] = 29;
			}
			return (d >= 1 && d <= end[m]);
		},		 
		// 날짜값 유효성 체크(연월일)
		is_valid_date : function(ymdhis) {
			ymdhis = "" + ymdhis;
			ymdhis = ymdhis.replace(/[-.:]/g,"");
			var year  = ymdhis.substring(0,4);
			var month = ymdhis.substring(4,6);
			var day   = ymdhis.substring(6,8);
			var hour   = ymdhis.substring(8,10);
			var min   = ymdhis.substring(10,12);
			var sec   = ymdhis.substring(12,14);
			
			if(sec!="" && (sec<0 ||sec>59)) {
				return false;	
			} else if(min!="" && (min<0 ||min>59)) {
				return false;	
			} else if(hour!="" && (hour<0 ||hour>23)) {
				return false;	
			}			
			
			if (parseInt(year,10) >= 1900  && _IBCommon.is_valid_month(month) && _IBCommon.is_valid_day(year,month,day) ) {
				return true;
			}
			return false;
		},		
		// 날짜값 유효성 체크(연월일)
		is_valid_ymd : function(ymd) {
			ymd = "" + ymd;
			ymd = ymd.replace(/[-.]/g,"");
			var year  = ymd.substring(0,4);
			var month = ymd.substring(4,6);
			var day   = ymd.substring(6,8);
			if (parseInt(year,10) >= 1900  && _IBCommon.is_valid_month(month) && _IBCommon.is_valid_day(year,month,day) ) {
				return true;
			}
			return false;
		},		
		// 영어만 존재하는지 유효성 체크
		is_valid_only_eng : function(value) {
			var pattern = /^[a-zA-Z]*$/; 
			return pattern.test(value);
		},
		// 한글만 존재하는지 유효성 체크(IE에서만 작동)
		is_valid_only_kor : function(value) {
			var pattern = /^[ㄱ-힣*]*$/; 
			return pattern.test(value);
		},
		// 숫자만 존재하는지 유효성 체크
		is_valid_only_number : function(value) {
			var pattern = /^[\-\.0-9]*$/; 
			return pattern.test(value);
		},
		// 이름 타입이 맞는지 체크(영문, 숫자, 한글, 특수문자)
		is_valid_name_type : function(value) {
			var pattern = /^[_a-z0-9A-Zㄱ-힣\']*$/; 
			return pattern.test(value);
		},
		// 아이디 타입이 맞는지 체크(영문, 숫자, 특수문자)
		is_valid_id_type : function(value) {
			//var pattern = /^[a-z0-9A-Z!@#$%]*$/; // /^[a-z0-9A-Zㄱ-힣!@#$%]*$/;
			var pattern = /^[a-z0-9A-Z]*$/; // /^[a-z0-9A-Zㄱ-힣!@#$%]*$/; 
			return pattern.test(value);
		},
		// 비밀번호 타입이 맞는지 체크(영문, 숫자, 특수문자)
		is_valid_password_type : function(value) {
			var pattern = /^[a-z0-9A-Z!@#$%]*$/; // /^[a-z0-9A-Zㄱ-힣!@#$%]*$/; 
			return pattern.test(value);
		},	
		// 비밀번호 타입이 맞는지 체크(영문, 숫자, 특수문자)
		is_valid_version : function(value) {
			var pattern = /^[a-zA-Z0-9.]*$/; // /^[a-z0-9A-Zㄱ-힣!@#$%]*$/; 
			return pattern.test(value);
		},		
		// 비밀번호와 비밀번호 확인의 값을 비교 체크(-10 : value1의 값이 없음, -11 : value1의 길이가 len보다 짧음, -20 : value2의 값이 없음, -21 : value2의 길이가 len보다 짧음, -30 : value1과 value2의 값이 맞지 않음, 1 : 서로 맞음)
		compare_pwd : function(value1, value2, len) {
			if(len == undefined || len.length == 0) len = 1;
			if(value1 == undefined || value1.length == 0) return -10;
			if(value1.length < len) return -11;
			if(value2 == undefined || value2.length == 0) return -20;
			if(value2.length < len) return -21;
			if(value1 != value2) return -30;
			else return 1;
		},
		// 변수의 타입을 리턴
		check_type : function(value) {
			var ret;

			if(typeof(value) == "object") {
				try
				{
					ret = value.join();	
				}
				catch (e)
				{
					ret = null;
				}
				if(ret != null) return "array";
				return "object";
			}
			else if(typeof(value) == "undefined") return null;
			else return typeof(value);
		},
		remove_special:function(value){
			if(value != undefined && typeof(value) == "string") {
				value = value.replace(/\-/g,''); //특정문자 제거
				value = value.replace(/^\s+/,''); //앞의 공백 제거
				value = value.replace(/\s+$/,''); //뒤의 공백 제거
				value = value.replace(/^\s+|\s+$/g,''); //앞뒤 공백 제거
				value = value.replace(/\s/g,''); //문자열 내의 공백 제거
				value = value.replace(/\n/g,''); //개행 제거
				value = value.replace(/\r/g,''); //엔터 제거
			}
			return value;
		},
		// 문자열에서 tag를 모두 삭제 한다
		remove_tag : function(value) {
			if(value != undefined && typeof(value) == "string") {
				return value.replace(/<[a-z|\/]+[^<>]*>/gi, '');
			}
			else return value;
		},
		// tag의 괄호를 &lt; &gt;로 바꾼다.
		replace_tag : function(value) {
			if(value != undefined && typeof(value) == "string") {
				//value = value.replace(/&lt;/g,'<');
				//value = value.replace(/&gt;/g,'>');
				value = value.replace(/</g,"&lt;");
				value = value.replace(/>/g,"&gt;");
				return value;
			}
			else return value;
		},
		// &lt; &gt; 등을 html tag로 변환
		convert_html : function(value) {
			if(value != undefined && typeof(value) == "string") {
				value = value.replace(/&lt;/gi, "<");
				value = value.replace(/&gt;/gi, ">");
				value = value.replace(/&#39;/gi, "'");
				value = value.replace(/&quot;/gi, "\"");
				return value;
			}
			else return value;
		},
		// url이나 email에 대해서 <a> tag로 감싼다 
		replace_url_text : function(value, target){
			var str = value;
			if(typeof(str)!='string'){return '';}
			if(typeof(target)!='string') target = "_blank";
			// http://, https://, ftp://
			var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
			// www. sans http:// or https://
			var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
			// Email addresses
			var emailAddressPattern = /\w+@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6})+/gim;
			chg_str = str.replace(urlPattern, '<a href="$&" target="'+_blank+'">$&</a>').replace(pseudoUrlPattern, '$1<a href="http://$2" target="'+_blank+'">$2</a>').replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');

			chg_str = chg_str.replace(/\r\n/g, "<br />");
			chg_str = chg_str.replace(/\n/g, "<br />");
			chg_str = chg_str.replace(/\r/g, "<br />");
			return chg_str;
		},
		// 이미지 리사이징(onload 할때부터 이미지를 비율에 맞게 리사이징해서 불러 옴)
		// ex : <img src="image.jpg" onload="_IBCommon.onload_img_resize(this, 100, 100);">
		onload_img_resize : function(obj, maxWidth, maxHeight) { 
			var image = new Image(); 
			image.onload = function(){ 
				var width = image.width; 
				var height = image.height; 
				var scalex = maxWidth / width; 
				var scaley = maxHeight / height; 
				var scale = (scalex < scaley) ? scalex : scaley; 
				if (scale > 1)  
					scale = 1; 
				 
				obj.width = scale * width; 
				obj.height = scale * height; 
				 
				obj.style.display = ""; 
			}; 
			image.src = obj.href; 
		},
		// 이미지의 사이즈를 가져 옴
		// ex : <img src="image.jpg" id="img1">	_IBCommon.get_img_size('img1');
		get_img_size : function(obj){		
			var obj2 = document.getElementById(obj);
			var sizeArr = Array();
			sizeArr[0] = obj2.width;
			sizeArr[1] = obj2.height;
			sizeArr['width'] = sizeArr[0];
			sizeArr['height'] = sizeArr[1];
			return sizeArr;
		},
		// 이미지 리사이징
		// ex : _IBCommon.resize_img('img1',200,300)
		resize_img : function(obj, maxWidth, maxHeight){	
			var img = document.getElementById(obj); 
			var imgSizeArr = this.get_img_size(obj);
			var imgW = imgSizeArr[0];
			var imgH = imgSizeArr[1];
			var newW;
			var newH;

			if(imgW < maxWidth && imgH < maxHeight) { // 가로세로가 축소할 값보다 작을 경우
				newW = imgW;
				newH = imgH;
			} else {
				if( imgW > imgH ) {			// 원크기 가로가 세로보다 크면
					newW = maxWidth;
					newH = Math.ceil( imgH * maxWidth / imgW );
				} else if( imgW <= imgH ) { //원크기의 세로가 가로보다 크면
					newW = Math.ceil(imgW * maxHeight / imgH);
					newH = maxHeight;
				} else {
					newW = maxWidth;
					newH = maxHeight;
				}
				if(newW > maxWidth) {			// 구해진 가로값이 축소 가로보다 크면 
					newW = maxWidth;
					newH = Math.ceil(imgH * maxWidth / imgW);
				}
				if(newH > maxHeight) {			// 구해진 세로값이 축소 세로값가로보다 크면
					newW = Math.ceil(imgW * maxHeight / imgH);
					newH = maxHeight;
				}
			}
			   
			if(imgW > maxWidth || imgH > maxHeight){
				imgW = newW;
				imgH = newH;
			}
			img.width = newW;
			img.height = newH;
			img, imgSizeArr, imgW, imgH, newW, newH = null;
		},
		// 10진 데이터를 2진수로 끊어서 array 형태로 리턴(37 => 1,4,32)
		byte_separate : function(value) {
			var arr_temp = new Array();
			var num=0;
			value = value.toString();

			if(value.length > 0) {
				str = parseInt(value,10).toString(2);

				for(var i=0;i<str.length;i++) {
					bin = str.substring(str.length-(i+1), str.length-i);

					if(bin == "1") {
						arr_temp[num] = Math.pow(2,i);
						num++;
					}
				}
			}
			return arr_temp;
		},
		// byte 데이터를 합친다. `"1,4,128"` or `new Array(1, 4, 128)` or `new Array("1","4","128")`
		byte_combine : function(arr) {
			var arr_temp = new Array();
			var num = 0;
			var sum = 0;

			if(typeof(arr) == "string") {
				arr = arr.split(",");
			}
			else if(typeof(arr) == "number") {
				var temp = arr;
				arr = new Array();
				arr[0] = temp;
			}

			if(typeof(arr) == "object") {
				for(var i=0;i<arr.length;i++) {
					if(arr[i] > 0) arr_temp[num] = arr[i];
					num++;
				}
			}

			for(var i=0;i<arr_temp.length;i++) {
				sum = sum + parseInt(arr_temp[i]);
			}

			return sum;
		},
		// 쿠키 조회(키)
		get_cookie : function(cKey) {
			var allcookies = document.cookie;
			var cookies = allcookies.split("; ");
			for (var i = 0; i < cookies.length; i++) {
			var keyValues = cookies[i].split("=");
				if (keyValues[0] == cKey) {
					return unescape(keyValues[1]);
				}
			}
			return "";
		},
		// 쿠키 설정(키, 값, 날짜(일단위), 경로)
		set_cookie : function(cKey, cValue, cDate, cPath)  // name,pwd
		{
			if(typeof(cPath) == "undefined") cPath = "/";
			if(typeof(cDate) == "undefined") cDate = 365;

			var date = new Date(); // 오늘 날짜
			date.setDate(date.getDate() + cDate);
			// 쿠키 저장
			document.cookie = cKey + '=' + escape(cValue) + ';expires=' + date.toGMTString() + ';path='+cPath;
			
			return true;
		},
		// 숫자 앞에 0을 붙여서 마지막 len 길이만큼 리턴
		format_zero_byte : function(value, len) {
			if(len == undefined || len == "") len = 2;
			for(var i=0;i<len;i++) {
				value = "0" + value;
			}
			return value.substring(value.length,value.length-len);
		},
		format_time_micro : function(sec) {
			var min = sec / 60;
			var tmpSec = sec % 60;
			if(tmpSec == 0) return min + "분";
			else return min + "분" + " " + tmpSec + "초";
		},
		// format datetime
		format_datetime : function(timestamp, ttype, lang, rtype)
		{
			
			var s = new Date(); 
			var arr = new Array();
			var ttype_val = false;
			var ttype_text = "";
			var m_lst = {1:"Jan",2:"Feb",3:"Mar",4:"Apr",5:"May",6:"Jun",7:"Jul",8:"Aug",9:"Sep",10:"Oct",11:"Nov",12:"Dec"};
			var datetime = "";

			if(typeof(ttype) != "number") ttype = 24;
			if(typeof(rtype) != "string") rtype = "datetime";

			if(timestamp.length>1 || typeof(timestamp) == "number"){
				s.setTime(timestamp + "000");	
			}
			arr[0] = (s.getFullYear());
			arr[1] = this.format_zero_byte((s.getMonth() + 1));
			arr[2] = this.format_zero_byte(s.getDate());
			arr[3] = this.format_zero_byte(s.getHours());
			arr[4] = this.format_zero_byte(s.getMinutes());
			arr[5] = this.format_zero_byte(s.getSeconds());

			if(ttype != 24) {
				if(arr[3] > 12) {
					arr[3] -= 12;
					ttype_val = true;
					arr[3] = _ib_2byte(arr[3]);
				}else if(arr[3]==12){
					ttype_val = true;
				}
			}
			
			if(lang == "en") {
				if(ttype_val == true) ttype_text = "PM ";
				else ttype_text = "AM ";
			
				if(rtype == "datetime" || rtype == "datetime2" || rtype == "date") {
					datetime = arr[2] + " " + m_lst[Number(arr[1])] + ", " + arr[0];

					if(rtype == "datetime2") {
						s = new Date();
						if(s.getFullYear() == arr[0] && _ib_2byte((s.getMonth() + 1)) == arr[1] && _ib_2byte(s.getDate()) == arr[2]) {
							datetime = "Today ";
						}
					}
				}
				if(rtype == "datetime" || rtype == "datetime2" || rtype == "time") {
					if(datetime.length > 0) datetime += " ";
					datetime += arr[3] + ":" + arr[4] +  " " + ttype_text;
				}
				return  datetime;
			}
			else {
				if(ttype_val == true) ttype_text = "오후 ";
				else ttype_text = "오전 ";

				if(rtype == "datetime" || rtype == "datetime2" || rtype == "date") {
					datetime = arr[0] + "." + arr[1] + "." + arr[2];

					if(rtype == "datetime2") {
						s = new Date();
						if(s.getFullYear() == arr[0] && _ib_2byte((s.getMonth() + 1)) == arr[1] && _ib_2byte(s.getDate()) == arr[2]) {
							datetime = "오늘 ";
						}
					}
				}
				if(rtype == "datetime" || rtype == "datetime2" || rtype == "time") {
					if(datetime.length > 0) datetime += " ";
					datetime += ttype_text + "" + arr[3] + ":" + arr[4];
				}
				return  datetime;		
			}
		},
		// UTF8 Encode
		UTF8_encode : function(value) {
			value = value.replace(/\r\n/g,"\n");
			var utftext = "";
			for (var n = 0; n < value.length; n++) {
				var c = value.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		},
		// UTF8 Decode
		UTF8_decode : function(value) {
			var utftext = value;
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;
	 
			while ( i < utftext.length ) {
	 
				c = utftext.charCodeAt(i);
	 
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				}
				else if((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i+1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}
				else {
					c2 = utftext.charCodeAt(i+1);
					c3 = utftext.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		},
		// base64 초기화
		initBase64 : function() {
			enc64List = new Array();
			dec64List = new Array();
			var i;
			for (i = 0; i < 26; i++) {
				enc64List[enc64List.length] = String.fromCharCode(65 + i);
			}
			for (i = 0; i < 26; i++) {
				enc64List[enc64List.length] = String.fromCharCode(97 + i);
			}
			for (i = 0; i < 10; i++) {
				enc64List[enc64List.length] = String.fromCharCode(48 + i);
			}
			enc64List[enc64List.length] = "+";
			enc64List[enc64List.length] = "/";
			for (i = 0; i < 128; i++) {
				dec64List[dec64List.length] = -1;
			}
			for (i = 0; i < 64; i++) {
				dec64List[enc64List[i].charCodeAt(0)] = i;
			}
		},
		// base64로 encoding
		base64_encode : function(value) {
			 var str = value;
			 var c, d, e, end = 0;
			 var u, v, w, x;
			 var ptr = -1;
			 var input = str.split("");
			 var output = "";
			 while(end == 0) {
				 c = (typeof input[++ptr] != "undefined") ? input[ptr].charCodeAt(0) :
					 ((end = 1) ? 0 : 0);
				 d = (typeof input[++ptr] != "undefined") ? input[ptr].charCodeAt(0) :
					 ((end += 1) ? 0 : 0);
				 e = (typeof input[++ptr] != "undefined") ? input[ptr].charCodeAt(0) :
					 ((end += 1) ? 0 : 0);
				 u = enc64List[c >> 2];
				 v = enc64List[(0x00000003 & c) << 4 | d >> 4];
				 w = enc64List[(0x0000000F & d) << 2 | e >> 6];
				 x = enc64List[e & 0x0000003F];
				 if (end >= 1) {x = "=";}
				 if (end == 2) {w = "=";}
				 if (end < 3) {output += u + v + w + x;}
			 }
			 var formattedOutput = "";
			 var lineLength = 76;
			 while (output.length > lineLength) {
			  formattedOutput += output.substring(0, lineLength) + "\n";
			  output = output.substring(lineLength);
			 }
			 formattedOutput += output;
			 return formattedOutput;
		},
		// base64로 decoding
		base64_decode : function(value) {
			 var str = value;
			 var c=0, d=0, e=0, f=0, i=0, n=0;
			 var input = str.split("");
			 var output = "";
			 var ptr = 0;
			 do {
				 f = input[ptr++].charCodeAt(0);
				 i = dec64List[f];
				 if ( f >= 0 && f < 128 && i != -1 ) {
					 if ( n % 4 == 0 ) {
						 c = i << 2;
					 } else if ( n % 4 == 1 ) {
						 c = c | ( i >> 4 );
						 d = ( i & 0x0000000F ) << 4;
					 } else if ( n % 4 == 2 ) {
						 d = d | ( i >> 2 );
						 e = ( i & 0x00000003 ) << 6;
					 } else {
						 e = e | i;
					 }
					 n++;
					 if ( n % 4 == 0 ) {
						 output += String.fromCharCode(c) +
								   String.fromCharCode(d) +
								   String.fromCharCode(e);
					 }
				 }
			 }
			 while (typeof input[ptr] != "undefined");
			 output += (n % 4 == 3) ? String.fromCharCode(c) + String.fromCharCode(d) :
					   ((n % 4 == 2) ? String.fromCharCode(c) : "");
			 return output;
		 },
		 // 날짜 계산(더하기, 빼기)
		 strtotime : function(time, now, mid, rtype) {
			// ex) var result = strtotime('+0 month', '2013-01-05', "-");

			if(mid == "" || mid == undefined) mid = "";
			if(rtype == "" || rtype == undefined) rtype = "date";

			now = now.replace(/-/gi,"").replace(/:/gi,"").replace(/ /gi,"");

			var y=0, m=0, d=0, h=0, i=0, s=0;

			y = now.substring(0,4);
			m = parseInt(now.substring(4,6));
			d = now.substring(6,8);
			h = now.substring(8,10);
			i = now.substring(10,12);
			s = now.substring(12,14);
			
			var x = new Date(y, m, d, h, i, s);
			var d = new Date();
			d.setTime(x.getTime());

			var ParsedTime = new RegExp('([+-][0-9]+) (\\w+)', 'i').exec(time);
			if(!ParsedTime) return 0;

			switch(ParsedTime[2]) {
				case 'second':
					d.setSeconds(d.getSeconds() + parseInt(ParsedTime[1], 10));
					break;
				case 'minute':
					d.setMinutes(d.getMinutes() + parseInt(ParsedTime[1], 10));
					break;
				case 'hour':
					d.setHours(d.getHours() + parseInt(ParsedTime[1], 10));
					break;
				case 'day':
					d.setDate(d.getDate() + parseInt(ParsedTime[1], 10));
					break;
				case 'month':
					d.setMonth(d.getMonth() + parseInt(ParsedTime[1], 10));
					break;
				case 'year':
					d.setFullYear(d.getFullYear() + parseInt(ParsedTime[1], 10));
					break;
			}
console.log('_IBTime.timestamp_to_string_full(d) : ' + _IBTime.timestamp_to_string_full(d));

var yyyy = d.getFullYear();
var mm = d.getMonth() + 1;
var dd = d.getDate();
console.log('yyyy mm dd : ' + yyyy + "-" + mm + "-" + dd);
console.log('hh ii ss : ' + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds());
//(y, m, d, h, i, s);
var stringDate = new Date("2018","06","01", "00", "00", "00");
console.log( ":::::" + stringDate.getFullYear() + "/" + (stringDate.getMonth()) + "/" + stringDate.getDate() + " " + stringDate.getHours() + ":"+stringDate.getMinutes()+":"+stringDate.getSeconds());  
stringDate.setMinutes(stringDate.getMinutes() - 10);
console.log( ":::::" + stringDate.getFullYear() + "/" + (stringDate.getMonth()) + "/" + stringDate.getDate() + " " + stringDate.getHours() + ":"+stringDate.getMinutes()+":"+stringDate.getSeconds());
			var result = "";
			if(rtype == "date") {
				result = d.getFullYear()+mid+_IBCommon.format_zero_byte((d.getMonth()),2)+mid+_IBCommon.format_zero_byte(d.getDate(),2);
			}
			else if(rtype == "time") {
				result = d.getFullYear()+mid+_IBCommon.format_zero_byte((d.getMonth()),2)+mid+_IBCommon.format_zero_byte(d.getDate(),2) + ' ' +_IBCommon.format_zero_byte(d.getHours(),2)+":"+_IBCommon.format_zero_byte((d.getMinutes()),2)+":"+_IBCommon.format_zero_byte(d.getSeconds(),2);
			}
			else if(rtype == "datetime") {
			}

			return result;
		}
	};
	
	var enc64List, dec64List;
	_IBCommon.initBase64();


	_IBTime = {
		timestamp_to_string : function(value) {
			var stringDate = new Date(); 
			stringDate.setTime(value + ""); 
			return stringDate.getFullYear() + "/" + (stringDate.getMonth() + 1) + "/" + stringDate.getDate();
		},
		string_to_timestamp : function(value) {
			var ts = new String(); 
			ts = Date.parse(value).toString(); 
			return ts.substr(0, ts.length - 3); 
		},
		string_to_timestamp_full : function(now) {
			var y=0, m=0, d=0, h=0, i=0, s=0;
			now = now.replace(/-/gi,"").replace(/ /gi,"").replace(/:/gi,"");
			y = now.substring(0,4);
			m = parseInt(now.substring(4,6));
			d = now.substring(6,8);
			h = now.substring(8,10);
			i = now.substring(10,12);
			s = now.substring(12,14);
			var x = new Date(y, m, d, h, i, s);
			return x.getTime();
		},
		timestamp_to_string_full : function(time) {
			var d = new Date(time);
			var res = d.getFullYear()+"-"+_IBCommon.format_zero_byte((d.getMonth()+1),2)+"-"+_IBCommon.format_zero_byte(d.getDate(),2);
			res += " "+_IBCommon.format_zero_byte(d.getHours(),2)+":"+_IBCommon.format_zero_byte((d.getMinutes()),2)+":"+_IBCommon.format_zero_byte(d.getSeconds(),2);
			return res;
		},		
		now : function() {
			var ts = new String(); 
			var d = new Date(); 
			ts = d.getTime().toString(); 
			ts = ts.substr(0, ts.length - 3); 
			return ts; 
		},
		addzero : function(n) {
			return n < 10 ? "0" + n : n;
		},
		getdate : function(n) {
			var start = new Date();

			start.setMonth(start.getMonth()+n);
			
			var yyyy = start.getFullYear();
			var mm = start.getMonth() + 1;
			var dd = start.getDate();

			return yyyy+"-"+_IBTime.addzero(mm)+"-"+_IBTime.addzero(dd);
		},		
		getdate_full : function(n) {
			var start = new Date();

			start.setMonth(start.getMonth()+n);
			
			var yyyy = start.getFullYear();
			var mm = start.getMonth() + 1;
			var dd = start.getDate();
			var hh = start.getHours();
			var ii = start.getMinutes();
			var ss = start.getSeconds();

			return yyyy+"-"+_IBTime.addzero(mm)+"-"+_IBTime.addzero(dd)+" "+_IBTime.addzero(hh)+":"+_IBTime.addzero(ii)+":"+_IBTime.addzero(ss);
		},		
		getdatetime : function(n) {
			var start = new Date();

			start.setMonth(start.getMonth()+n);
			
			var yyyy = start.getFullYear();
			var mm = start.getMonth() + 1;
			var dd = start.getDate();
			var h = start.getHours();
			var m = start.getMinutes();
			var s = start.getSeconds();

			return yyyy+"."+_IBTime.addzero(mm)+"."+_IBTime.addzero(dd) + " "+_IBTime.addzero(h) + ":"+_IBTime.addzero(m) + ":"+_IBTime.addzero(s);
		},
		getLastDay : function(time) {
			var y = time.substring(0,4);
			var m = time.substring(5,7);
			return time.substring(0,8)+(new Date(y, m, 0)).getDate();			
		}		
	};

// ************************************************************************************************************************************************************************************
// UUID
// ************************************************************************************************************************************************************************************
/*
###	get_uuid_timestamp : function(uuid)
		* desc
			uuid에서 timestamp 가져오기
		* request
			required string uuid
		* response type
			string
		* ex
		
###	get_msb_lsb : function(uuid)
		* desc
			uuid에서 msb와 lsb 분리하기
		* request
			required string uuid
		* response type
			json
		* ex
		
###	get_msb : function(uuid)
		* desc
			uuid를 msb값 가져오기
		* request
			required string uuid
		* response type
			string
		* ex
		
###	get_lsb : function(uuid)
		* desc
			uuid값을 lsb값 가져오기
		* request
			required string uuid
		* response type
			string
		* ex
		
###	get_uuid : function(msb, lsb)
		* desc
			msb, lsb값을 uuid로 변경
		* request
			required string msb	 (required json {"msb":"","lsb":"")
			required string lsb
		* response type
			string
		* ex
*/

	_IBUUID = {
		// uuid에서 msb와 lsb 분리하기
		get_msb_lsb : function(uuid) {
			return {"msb":this.get_msb(uuid),"lsb":this.get_lsb(uuid)};
		},
		// uuid를 msb값으로 변경
		get_msb : function(uuid) {
			if(typeof(uuid) != "string") return false;
			if(uuid.length < 32) return false;

			uuid = uuid.replace(/-/ig,'');
			var string = '';

			for(var i=0, j=0;i<8;i++,j+=2) {
				val = parseInt(uuid.substring(j, (j+2)), 16);
				if(!(val > 0)) val = 0;

				string += String.fromCharCode(val);
			}
			return _IBCommon.base64_encode(string);
		},
		// uuid값을 lsb값으로 변경
		get_lsb : function(uuid) {
			if(typeof(uuid) != "string") return false;
			if(uuid.length < 32) return false;

			uuid = uuid.replace(/-/ig,'').substring(16,32);
			var string = '';

			for(var i=0, j=0;i<8;i++,j+=2) {
				val = parseInt(uuid.substring(j, (j+2)), 16);
				if(!(val > 0)) val = 0;

				string += String.fromCharCode(val);
			}
			return _IBCommon.base64_encode(string);
		},
		// msb, lsb값을 uuid로 변경
		get_uuid : function(msb, lsb) {
			var uuid = "";

			// json 형태 데이터 분리
			if(typeof(msb) == "object") {
				lsb = msb.lsb;
				msb = msb.msb;
			}

			if(typeof(msb) != "string" || typeof(lsb) != "string") {
				return false;
			}

			if(!(msb.length > 0 && lsb.length > 0)) {
				return false;
			}

			msb = this.base64_decode(msb);
			lsb = this.base64_decode(lsb);

			for(var i=0;i<msb.length;i++) {
				id = "00" + msb.substring(i, i+1).charCodeAt(0).toString(16);
				uuid += id.substr(id.length-2, 2);
			}

			for(var i=0;i<lsb.length;i++) {
				id = "00" + lsb.substring(i, i+1).charCodeAt(0).toString(16);
				uuid += id.substr(id.length-2, 2);
			}
			
			uuid = uuid.substr(0, 8) + "-" + uuid.substr(8, 4) + "-" + uuid.substr(12, 4) + "-" + uuid.substr(16, 4) + "-" + uuid.substr(20, 12);

			return uuid;
		},
		// uuid에서 timestamp 가져오기
		get_uuid_timestamp : function(uuid) {
			uuid = uuid.replace(/-/ig,'');
			var msb = uuid.substr(0,16);
			var msbShift = "0" + msb.substr(13,3) + msb.substr(8,4) + msb.substr(0,8);
			var timeMillis = parseInt(msbShift,16);
			timeMillis -= 0x01B21DD213814000;
			timeMillis /= 10000000;
			return Math.ceil(timeMillis);
		}
	};

// ************************************************************************************************************************************************************************************
// String
// ************************************************************************************************************************************************************************************
/*
###	split_k_word : function(text)
		* desc
			초중종성을 분리 함
		* request
			required string text
		* response type
			string 
		* ex
			var result = _IBString.split_k_word("인포뱅크");	// ㅇㅣㄴㅍㅗㅂㅐㅇㅋㅡ 

###	split_k_initial : function(text)
		* desc
			첫글자의 초성만 분리 함
		* request
			required string text
		* response type
			string 
		* ex
			var result = _IBString.split_k_initial("인포뱅크");	// ㅇ 

###	split_k_medial : function(text)
		* desc
			첫글자의 중성 분리 함
		* request
			required string text
		* response type
			string 
		* ex
			var result = _IBString.split_k_medial("인포뱅크");	// ㅣ 

###	split_k_final : function(text)
		* desc
			첫글자의 종성 분리 함
		* request
			required string text
		* response type
			string 
		* ex
			var result = _IBString.split_k_final("인포뱅크");	// ㄴ 

###	str_to_unicode : function(str)
		* desc
			문자열을 unicode로 변환
		* request
			required string str
		* response type
			string 
		* ex
			var result = _IBString.str_to_unicode("인포뱅크");	// &#51064;&#54252;&#48197;&#53356;

###	check_char_byte_size : function(value)
		* desc
			바이트 단위 사이즈 계산
		* request
			required string value
		* response type
			number
		* ex
		
###	check_byte_size : function(value)
		* desc
			문자열을 UTF-8로 변환했을 경우 차지하게 되는 byte 수를 리턴한다.
		* request
			required string value
		* response type
			number
		* ex

###	ellipsis : function(value, len) 
		* desc
			문자열 길이 조절(문자열을 byte 단위로 계산하여 지정한 길이보다 길 경우 "..."을 표시 함)
		* request
			required string value
			required number len
		* response type
			string
*/

	_IBString = {
		// 초중종성 분리 함수
		split_k_word : function(text) 
		{ 
			var ChoSeong = new Array ( 
				0x3131, 0x3132, 0x3134, 0x3137, 0x3138, 0x3139, 
				0x3141, 0x3142, 0x3143, 0x3145, 0x3146, 0x3147, 
				0x3148, 0x3149, 0x314a, 0x314b, 0x314c, 0x314d, 0x314e 
			); 
			var JungSeong = new Array ( 
				0x314f, 0x3150, 0x3151, 0x3152, 0x3153, 0x3154, 
				0x3155, 0x3156, 0x3157, 0x3158, 0x3159, 0x315a, 
				0x315b,0x315c, 0x315d, 0x315e, 0x315f, 0x3160, 
				0x3161, 0x3162, 0x3163 
			); 
			var JongSeong = new Array ( 
				0x0000, 0x3131, 0x3132, 0x3133, 0x3134,0x3135, 
				0x3136, 0x3137, 0x3139, 0x313a, 0x313b, 0x313c, 
				0x313d, 0x313e, 0x313f, 0x3140, 0x3141, 0x3142, 
				0x3144, 0x3145, 0x3146, 0x3147, 0x3148, 0x314a, 
				0x314b, 0x314c, 0x314d, 0x314e 
			); 
			var chars = new Array();
			var v = new Array(); 
			for (var i = 0; i < text.length; i++) 
			{ 
				chars[i] = text.charCodeAt(i); 
				if (chars[i] >= 0xAC00 && chars[i] <= 0xD7A3) 
				{ 
					var i1, i2, i3; 
					i3 = chars[i] - 0xAC00; 
					i1 = i3 / (21 * 28); 
					i3 = i3 % (21 * 28); 
					i2 = i3 / 28; 
					i3 = i3 % 28; 
					v.push(String.fromCharCode(ChoSeong[parseInt(i1)])); 
					v.push(String.fromCharCode(JungSeong[parseInt(i2)])); 
					if (i3 != 0x0000) 
						v.push(String.fromCharCode(JongSeong[parseInt (i3)])); 
				} 
				else { 
					v.push(String.fromCharCode(chars[i])); 
				} 
			} 

			var str = "";
			for(var i in v) {
				str += v[i];
			}

			return str; 
		},
		// 첫글짜 초성 분리 함수
		split_k_initial : function(text) 
		{ 
			var ChoSeong = new Array ( 
				0x3131, 0x3132, 0x3134, 0x3137, 0x3138, 0x3139, 
				0x3141, 0x3142, 0x3143, 0x3145, 0x3146, 0x3147, 
				0x3148, 0x3149, 0x314a, 0x314b, 0x314c, 0x314d, 0x314e 
			); 

			var chars = new Array();
			var v = new Array(); 

			chars[0] = text.charCodeAt(0); 
			if (chars[0] >= 0xAC00 && chars[0] <= 0xD7A3) 
			{ 
				var i1, i3; 
				i3 = chars[0] - 0xAC00; 
				i1 = i3 / (21 * 28); 
				i3 = i3 % (21 * 28); 
				i2 = i3 / 28; 
				i3 = i3 % 28; 
				v.push(String.fromCharCode(ChoSeong[parseInt(i1)])); 
			} 
			else { 
				v.push(String.fromCharCode(chars[0])); 
			} 


			return v; 
		}, 
		// 첫글짜 중성 분리 함수
		split_k_medial : function	(text) 
		{ 
			var JungSeong = new Array ( 
				0x314f, 0x3150, 0x3151, 0x3152, 0x3153, 0x3154, 
				0x3155, 0x3156, 0x3157, 0x3158, 0x3159, 0x315a, 
				0x315b,0x315c, 0x315d, 0x315e, 0x315f, 0x3160, 
				0x3161, 0x3162, 0x3163 
			); 

			var chars = new Array();
			var v = new Array(); 

			chars[0] = text.charCodeAt(0); 
			if (chars[0] >= 0xAC00 && chars[0] <= 0xD7A3) 
			{ 
				var i2, i3; 
				i3 = chars[0] - 0xAC00; 
				i1 = i3 / (21 * 28); 
				i3 = i3 % (21 * 28); 
				i2 = i3 / 28; 
				i3 = i3 % 28; 
				v.push(String.fromCharCode(JungSeong[parseInt(i2)])); 
			} 
			else { 
				v.push(String.fromCharCode(chars[0])); 
			} 
	
			return v; 
		}, 
		// 첫글짜 종성 분리 함수
		split_k_final : function(text) 
		{ 
			var JongSeong = new Array ( 
				0x0000, 0x3131, 0x3132, 0x3133, 0x3134,0x3135, 
				0x3136, 0x3137, 0x3139, 0x313a, 0x313b, 0x313c, 
				0x313d, 0x313e, 0x313f, 0x3140, 0x3141, 0x3142, 
				0x3144, 0x3145, 0x3146, 0x3147, 0x3148, 0x314a, 
				0x314b, 0x314c, 0x314d, 0x314e 
			); 

			var chars = new Array();
			var v = new Array(); 

			chars[0] = text.charCodeAt(0); 
			if (chars[0] >= 0xAC00 && chars[0] <= 0xD7A3) 
			{ 
				var i3; 
				i3 = chars[0] - 0xAC00; 
				i1 = i3 / (21 * 28); 
				i3 = i3 % (21 * 28); 
				i2 = i3 / 28; 
				i3 = i3 % 28; 
				if (i3 != 0x0000) 
					v.push(String.fromCharCode(JongSeong[parseInt (i3)])); 
			} 
			else { 
				v.push(String.fromCharCode(chars[0])); 
			} 

			return v; 
		},
		// 문자열을 unicode로 변환
		str_to_unicode : function(str) {
			var ret = "";
			for(var i=0;i<str.length;i++) {
				ret += (str.charCodeAt(i) == 32) ? " ":"&#"+str.charCodeAt(i) + ";";
			}
			return ret;
		},
		// json 데이터를 string으로 변환(_IBJson.json_to_string 과 중복 됨)
		json_to_string : function(object) {   
			var results = [];
			for (var property in object) {
				var value = object[property];
				if(typeof(value) == "object") 
					results.push(property.toString() + ': ' + _IBString.json_to_string(value));
				else if (value)
					results.push(property.toString() + ': ' + value);
			}   
					   
			return '{' + results.join(', ') + '}';
		},   
		// 바이트 단위 사이즈 계산
		check_char_byte_size : function(value,type) {
			if (value == null || value.length == 0) {
				return 0;
			}

			var charCode = value.charCodeAt(0);
			if(type === 'MMS'){
				return _IBString.check_char_byte_size_forMMS(charCode);
			}else{
				return _IBString.check_char_byte_size_get(charCode);
			}
		},
		check_char_byte_size_forMMS : function(charCode) {
			if (charCode <= 0x00007F) {
				return 1;
			} else if (charCode <= 0x0007FF) {
				return 2;
			} else if (charCode <= 0x00FFFF) {
				return 2;		// 원래는 3byte
			} else {
				return 4;
			}
		},
		check_char_byte_size_get : function(charCode) {
			if (charCode <= 0x00007F) {
				return 1;
			} else if (charCode <= 0x0007FF) {
				return 2;
			} else if (charCode <= 0x00FFFF) {
				return 2;
			} else {
				return 4;
			}
		},
		// 문자열을 UTF-8로 변환했을 경우 차지하게 되는 byte 수를 리턴한다.
		check_byte_size : function(value, type) {
			if (value == null || value.length == 0) {
				return 0;
			}

			var size = 0;
			for (var i = 0; i < value.length; i++) {
				size += this.check_char_byte_size(value.charAt(i), type);
			}

			return size;
		},
		substring_byte_size : function(value, start, count, type) {
			var str = "";

			if (value == null || value.length == 0) {
				return 0;
			}

			var size = 0;
			for (var i = 0; i < value.length; i++) {
				size += this.check_char_byte_size(value.charAt(i), type);

				if(size > (start+count)) break;
				if(size > start) str += value.charAt(i);				
			}
		
			return str;
		},
		// 문자열 길이 조절(문자열을 byte 단위로 계산하여 지정한 길이보다 길 경우 "..."을 표시 함)
		ellipsis : function(value, len, type) {
			var result = "", size = 0;
			
			for (var i = 0; i < value.length; i++) {
				size += this.check_char_byte_size(value.charAt(i), type);
				if(size <= len) result += value.charAt(i);
				else break;
			}

			if(result.length != value.length) result += "...";

			return result;
		}
	};

// ************************************************************************************************************************************************************************************
// JSON
// ************************************************************************************************************************************************************************************
/*
###	json_to_string : function(o)
		* desc
			json을 string으로 변환
		* request
			required json o
		* response type
			string 
		* ex
			var result = _IBJson.json_to_string({"test":1234});	

###	string_to_json : function(json)
		* desc
			string으로 된 json을 json형태로 변환
		* request
			required string json
		* response type
			json 
		* ex
			var result = _IBJson.string_to_json('{"test":1234}');	
*/

	_IBJson = {
		useHasOwn : ({}.hasOwnProperty ? true : false),
		pad : function(n) {
			return n < 10 ? "0" + n : n;
		},
		m : {
			"\b": '\\b',
			"\t": '\\t',
			"\n": '\\n',
			"\f": '\\f',
			"\r": '\\r',
			'"' : '\\"',
			"\\": '\\\\'
		},
		encodeString : function(s){
			
			if (/["\\\x00-\x1f]/.test(s)) {
				return '"' + s.replace(/([\x00-\x1f\\"])/g, function(a, b) {
					return b;

			var c = m[b];
			if(c){
				return c;
			}

			c = b.charCodeAt();
			return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
		}) + '"';

		}
		return '"' + s + '"';
		},
		encodeArray : function(o){
			var a = ["["], b, i, l = o.length, v;
			for (i = 0; i < l; i += 1) {
				v = o[i];
				switch (typeof v) {
				case "undefined":
				case "function":
				case "unknown":
					break;
				default:
					if (b) {
						a.push(',');
					}
					a.push(v === null ? "null" : this.json_to_string(v));
					b = true;
				}
			}
			a.push("]");
			return a.join("");
		},
		encodeDate : function(o){
			return '"' + o.getFullYear() + "-" +
			pad(o.getMonth() + 1) + "-" +
			pad(o.getDate()) + "T" +
			pad(o.getHours()) + ":" +
			pad(o.getMinutes()) + ":" +
			pad(o.getSeconds()) + '"';
		},
		json_to_string : function(value) {
			var o = value;

			if(typeof o == "undefined" || o === null){
				return "null";
			}else if(o instanceof Array){
				return this.encodeArray(o);
			}else if(o instanceof Date){
				return this.encodeDate(o);
			}else if(typeof o == "string"){
				return this.encodeString(o);
			}else if(typeof o == "number"){
				return isFinite(o) ? String(o) : "null";
			}else if(typeof o == "boolean"){
				return String(o);
			}else {
				var self = this;
				var a = ["{"], b, v;
				for (var i in o) {
					if(!this.useHasOwn || o.hasOwnProperty(i)) {
						v = o[i];
						switch (typeof v) {
						case "undefined":
						case "function":
						case "unknown":
							break;
						default:
							if(b){
								a.push(',');
							}
							a.push(self.json_to_string(i), ":",
							v === null ? "null" : self.json_to_string(v));
							b = true;
						}
					}
				}
				a.push("}");
				return a.join("");
			}
		},
		string_to_json : function(json){
			if(typeof(json) == "object") {
				return eval("(" + json + ')');
			}
			else if(typeof(json) == "string") {
				if(json.length > 0) {
					json = json.replace(/\n/g,"");

					var ret = "";
					try
					{
						ret = eval("(" + json + ')');
					}
					catch (e) {}
					
					return ret;
				}
			}
			else return "";
		},
		encode : function(o){
			if(typeof o == "undefined" || o === null){
				return "null";
			}else if(o instanceof Array){
				return this.encodeArray(o);
			}else if(o instanceof Date){
				return this.encodeDate(o);
			}else if(typeof o == "string"){
				return this.encodeString(o);
			}else if(typeof o == "number"){
				return isFinite(o) ? String(o) : "null";
			}else if(typeof o == "boolean"){
				return String(o);
			}else {
				var self = this;
				var a = ["{"], b, v;
				for (var i in o) {
					if(!this.useHasOwn || o.hasOwnProperty(i)) {
						v = o[i];
						switch (typeof v) {
						case "undefined":
						case "function":
						case "unknown":
							break;
						default:
							if(b){
								a.push(',');
							}
							a.push(self.encode(i), ":",
							v === null ? "null" : self.encode(v));
							b = true;
						}
					}
				}
				a.push("}");
				return a.join("");
			}
		},
		decode : function(json){
			if(typeof(json) == "object") {
				return eval("(" + json + ')');
			}
			else if(typeof(json) == "string") {
				if(json.length > 0) {
					json = json.replace(/\n/g,"");

					var ret = "";
					try
					{
						ret = eval("(" + json + ')');
					}
					catch (e) {
					}
					
					return ret;
				}
			}
			else return "";
		}
	};


// ************************************************************************************************************************************************************************************
// Paging
// ************************************************************************************************************************************************************************************	
/*
###	init : function(data)
		* desc
			페이징 계산
		* request
			required json data
				"total_count":전체갯수
				"current_page":현재 페이지 번호
				"vertical_count":출력물의 세로 갯수
				"horizon_count":화면에 출력 할 페이징 가로 길이	
		* response type
			json 
		* ex
			var data = {"total_count":250,"current_page":1,"vertical_count":10,"horizon_count":10};
			var result = paging(data);

			var str = "";
			if(result.first > 0) str += "<a href='index.html?current_page="+result.first+"'>처음</a>"; else str += "<span class='unlink'>처음</span>";
			if(result.prev > 0) str += "<a href='index.html?current_page="+result.prev+"'>이전</a>"; else str += "<span>이전</span>";
			for(var i = result.page_start ; i < (result.page_start+result.horizon_count) ; i++) {
				if(i > result.last) break;

				if(i > result.page_start) str += "<span>|</span>";
				if(i == result.current_page) 
					str += "<a href='index.html?current_page="+i+"' class='bold'>"+i+"</a>";
				else 
					str += "<a href='index.html?current_page="+i+"'>"+i+"</a>";
			}
			if(result.next > 0) str += "<a href='index.html?current_page="+result.next+"'>다음</a>"; else str += "<span>다음</span>";
			if(result.last > 0) str += "<a href='index.html?current_page="+result.last+"'>맨뒤</a>"; else str += "<span>맨뒤</span>";

			document.write(str);

			<style>
				a {font-size:12px;text-decoration:none;color:#000;padding:0 2px}
				span {font-size:12px;color:#999;padding:0 2px}
				.bold {font-weight:bold}
			</style>
*/
	_IBPaging = {
		init : function(data) {
			var total_count		= parseInt(data.total_count);
			var current_page		= parseInt(data.current_page);
			var vertical_count	= parseInt(data.vertical_count);
			var horizon_count	= parseInt(data.horizon_count);

			if(typeof(total_count)		!= "number") total_count = 0;
			if(typeof(current_page)	!= "number") current_page = 1;
			if(typeof(vertical_count)	!= "number") vertical_count = 10;
			if(typeof(horizon_count)	!= "number") horizon_count = 10;

			// 전체 페이지 갯수 구하기
			var total_page = Math.floor(total_count / vertical_count);
			if(((total_count - (total_page * vertical_count)) % vertical_count) > 0) {
				total_page++;
			}

			var view_start_page = 0;
			var view_first_page = 0;
			var view_last_page = 0;
			var view_prev_page = 0;
			var view_next_page = 0;

			// 페이지 리스트 시작값( 1 | 2 | 3 | 4 | 5 )
			view_start_page = Math.floor((current_page-1) / horizon_count)*horizon_count+1;

			view_first_page = 1;
			//if(view_first_page == current_page) view_first_page = -1;
			view_last_page = total_page;
			//if(view_last_page == current_page) view_last_page = -1;
			
			// 이젠 페이지 목록의 마지막 페이지 번호
			view_prev_page = view_start_page - 1;
			if(view_prev_page <= 1) view_prev_page = -1;

			// 다음 페이지 목록의 첫번째 페이지 번호
			view_next_page = view_start_page + horizon_count;
			if(view_next_page > view_last_page) view_next_page = -1;

			return {"total_count":total_count,"current_page":current_page,"vertical_count":vertical_count,"horizon_count":horizon_count,"total_page":total_page,"first":view_first_page,"last":view_last_page,"prev":view_prev_page,"next":view_next_page,"page_start":view_start_page};
		}
	};