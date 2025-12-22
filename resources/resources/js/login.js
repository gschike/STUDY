window.onload = function() {
	(function($) {
	    if (!$.browser && $.fn.jquery != "1.3.2") {
	        $.extend({
	            browser: {}
	        });
	        $.browser.init = function() {
	            var a = {};
	            try {
	                navigator.vendor ?
	                    /Chrome/.test(navigator.userAgent) ?
	                    (a.browser = "Chrome", a.version = parseFloat(navigator.userAgent.split("Chrome/")[1].split("Safari")[0])) : /Safari/.test(navigator.userAgent) ? (a.browser = "Safari", a.version = parseFloat(navigator.userAgent.split("Version/")[1].split("Safari")[0])) : /Opera/.test(navigator.userAgent) && (a.Opera = "Safari", a.version = parseFloat(navigator.userAgent.split("Version/")[1])) : /Firefox/.test(navigator.userAgent) ? (a.browser = "mozilla",
	                        a.version = parseFloat(navigator.userAgent.split("Firefox/")[1])) : (a.browser = "MSIE", /MSIE/.test(navigator.userAgent) ? a.version = parseFloat(navigator.userAgent.split("MSIE")[1]) : a.version = "edge")
	            } catch (e) { a = e; }
	            $.browser[a.browser.toLowerCase()] = a.browser.toLowerCase();
	            $.browser.browser = a.browser;
	            $.browser.version = a.version;
	            $.browser.chrome = $.browser.browser.toLowerCase() == 'chrome';
	            $.browser.safari = $.browser.browser.toLowerCase() == 'safari';
	            $.browser.opera = $.browser.browser.toLowerCase() == 'opera';
	            $.browser.msie = $.browser.browser.toLowerCase() == 'msie';
	            $.browser.mozilla = $.browser.browser.toLowerCase() == 'mozilla';
	        };
	        $.browser.init();
	    }
	})(jQuery);	
	
    if ($.browser.msie && $.browser.version < 9) {         //this is for only ie condition ( microsoft internet explore )
        $('input[type="text"][placeholder], textarea[placeholder]').each(function () {
            var obj = $(this);

            if (obj.attr('placeholder') != '') {
                obj.addClass('IePlaceHolder');

                if ($.trim(obj.val()) == '' && obj.attr('type') != 'password') {
                    obj.val(obj.attr('placeholder'));
                }
            }
        });

        $('.IePlaceHolder').focus(function () {
            var obj = $(this);
            if (obj.val() == obj.attr('placeholder')) {
                obj.val('');
            }
        });

        $('.IePlaceHolder').blur(function () {
            var obj = $(this);
            if ($.trim(obj.val()) == '') {
                obj.val(obj.attr('placeholder'));
                                }
        });
        
        // On DOM ready, hide the real password
        $('.real').hide();

        // Show the fake pass (because JS is enabled)
        $('.fake').show();

        // On focus of the fake password field
        $('.fake').focus(function(){
        	//$(this).hide(); // hide the fake password input text
        	//$('.real').show().focus(); // and show the real password input password
        	$("input[type='text']",$(this).parent()).hide();    	
        	$("input[type='password']",$(this).parent()).show().focus(); 	
        });

        // On blur of the real pass
        $('.real').blur(function(){
        	alert($("input[type='password']",$(this).parent()).val());
        	if($("input[type='password']",$(this).parent()).val() == ""){
            	$("input[type='password']",$(this).parent()).hide();    	
            	$("input[type='text']",$(this).parent()).show();    		
        	}
       
        // otherwise, a password has been entered,
        // so do nothing (leave the real password showing)
        });        
    }else{
    	$('.fake').hide();
    }	
};

$("document").ready(function() {
	_login.init();
});

var _login = {

	init : function() {
		_login.btn();
		var saveId = _login.cookie.get("IPS_ID");
	
		if(saveId != ""){
			$("#userId").val(saveId);
		}
	},
	cookie:{
		top : function(){
			return _login;
		},
		expiry_date : 365,
		set : function(name, value){
			var _this = this.top();
			
			var exdays = _this.cookie.expiry_date;
			var exdate = new Date();
		    exdate.setDate(exdate.getDate() + exdays);
		    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
		    document.cookie = name + "=" + cookieValue;
		},
		get : function(name){
			name = name + '=';
		    var cookieData = document.cookie;
		    var start = cookieData.indexOf(name);
		    var cookieValue = '';
		    if(start != -1){
		        start += name.length;
		        var end = cookieData.indexOf(';', start);
		        if(end == -1)end = cookieData.length;
		        cookieValue = cookieData.substring(start, end);
		    }
		    return unescape(cookieValue);
		},
		reset : function(name){
			var expireDate = new Date();
		    expireDate.setDate(expireDate.getDate() - 1);
		    document.cookie = name + "= " + "; expires=" + expireDate.toGMTString();
		},
	},
	btn : function() {
		
		$('#loginBtn').click(function(){
			if(_login.check()){
				var json = Common.getInputTagToJson($("#loginArea"));
				var param = $.extend({procType:"getLoginStatus"}, json);
				_login.loginProc(param);
			}
		 });

		$("#loginBtn, #userId").keypress(function( event ) {
			$('div.no_register_info').hide();
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if(keycode == '13'){
				$('#loginBtn').trigger('click');
			}
		});
	},
	loginProc : function(param){
		return $.ajax({url : "/login/"+"login.do",type:"POST",dataType:"text",timeout:5000,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
			var json = _IBJson.decode(_data);
			if(json) {
				if(json.data) {
					var data = json.data;
					var result_code = data.resultCode;
				
					if(result_code == "1000") {
						_login.cookie.reset("IPS_ID");
						
						if(data.grade=='U'){
							location.href = "../system/notice.do";
						}else{
							location.href = "../mt/mtsend.do";
						}
						
					}else{
						alert(Common.getAlertMsg(result_code));
						//self.close();
					}
				}else {
					//json data not exist
					alert(Common.getAlertMsg("501"));
				}
			}
		}});
	},
	check : function() {
		Common.searchValueCheck($("#userId"));
		var userId = $("#userId").val();
		if(userId == ""){
			alert("아이디를 입력해주세요.");
			$("input[name='userId']").focus();
			return false;
		}
		return true;
			
	}
};
