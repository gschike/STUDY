	$("document").ready(function() {
		_main.init();
	});

	var _const = {
		template_list_data : null
	};
	//summary.js 참고 2018-04-12 PHI
	var _main = {
			send_val : {},
			val : {
					sms_byte : 90
				,	sendListCnt : 0
				, 	lms_byte : 2000
				,	is_show_exceed_alert : "N"
				//,	gubun : "sms"
				,	send_type : "personal"
				,	address_type : "addrBook"		//addrBook : 주소록, recent : 최근발신번호,  copyNPaste : 붙여넣기
				,	title : ""
				,	template_contents : {}
				, 	template_contents2 : {}
				,	subject : ""
				,	contents_file : ""
				,	change_word1 : ""
				,	change_word2 : ""
				,	change_word3 : ""
				,	change_word4 : ""
				,	change_word5 : ""
				,	attach_file : ""
				,	sendList : {
						group : {}
					,	person : {}
					,	bulk : {}
				}
				,	sendCnt : 0
				,	send_purpose : ""
				,	mmsFileName : ""
				,	changeword : "고객"
				,	date_client_req : ""
				,	groupAddressList : {}
			},
		top : function() {
			return _main;
		}
		,init : function() {
			var _this = this.top();
			//메뉴 active
			fnSetMenu("3", "1");

			_this.personal.list.id = $("#"+_this.personal.list.id_name);
			_this.personal.list.button = $("tbody tr td li[name='button']",_this.personal.list.id).clone();
			$("tbody tr td li[name='button']",_this.personal.list.id).remove();
			_this.personal.list.td = $("tbody tr:first td:first",_this.personal.list.id).clone();
			_this.personal.list.variable = $("tbody tr:last td:first",_this.personal.list.id).clone();
			_this.personal.list.title = $("thead tr th:first",_this.personal.list.id).clone();

			_this.file.list.id = $("#"+_this.file.list.id_name);
			_this.file.list.button = $("tbody tr td li[name='button']",_this.file.list.id).clone();
			$("tbody tr td li[name='button']",_this.file.list.id).remove();
			_this.file.list.td = $("tbody tr:first td:first",_this.file.list.id).clone();
			_this.file.list.variable = $("tbody tr:last td:first",_this.file.list.id).clone();
			_this.file.list.title = $("thead tr th:first",_this.file.list.id).clone();
			
			_this.btn();
			_this.notitalk.init();
		},
		btn : function() {
			var _this = this.top();
			$("#kakaoSendBox1 select[name='uuid']").unbind("change").change(function(){	
				_this.personal.search.check();
			});
			$("#kakaoSendBox1 select[name='task_id']").unbind("change").change(function(){	
				_this.personal.search.check();
			});
			$("#kakaoSendBox3 select[name='uuid']").unbind("change").change(function(){	
				_this.file.search.check();
			});
			$("#kakaoSendBox3 select[name='task_id']").unbind("change").change(function(){	
				_this.file.search.check();
			});
			$("#tabs1 li[rel='tab2']").click(function(){
				console.log('tab2');
				_this.val.send_type = 'bulk'
			});
			$("#tabs1 li[rel='tab1']").click(function(){
				console.log('tab1');
				_this.val.send_type = 'personal'
			});
			$("#notiSendBtn").unbind("click").click(function(){
				if(_this.mtValidation()){
					$("#notiSendBtn2").click();						
				}
			});
			$("#modal6 .remodal-confirm").unbind("click").click(function(){
				$("#loadingLayer").show();
				var param = $.extend({procType:"notiSend"}, _this.send_val);
				return $.ajax({url : Common.DEFAULT_PATH+"notitalk.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
					var json = _IBJson.decode(_data);
					if(json) {
						if(json.data) {
							var data = json.data;
							var result_code = data.resultCode;
							console.log(data);
							console.log(result_code);
							if(result_code == "1000"){
								alert('알림톡을 발송하였습니다.');
								window.location.reload();
							}else if(result_code == "2000") {
								alert('잘못된 템플릿 입니다.');
							}else if(result_code == "8000") {
								alert(Common.getAlertMsg(result_code));
								location.href = "/common/loginForm.do";
							}else {
								alert(Common.getAlertMsg("201"));
							}
						}else {
							//json data not exist
							alert(Common.getAlertMsg("202"));
						}
					}
					$("#loadingLayer").hide();
				}});
				$("#modal6 .remodal-cancel").click();
			});
		},
		mtValidation : function(){
			var _this = this.top();
			//문자메시지 체크
			_this.send_val = {};
			if(_this.val.send_type == "personal"){
				//info
				var template_code = $("#panel span[name='code']","#kakaoSendBox2").html();
				//_this.send_val.template_content = $("#panel input[name='sender_key']","#kakaoSendBox2").val();
				//_this.send_val.kko_btn_info = $("#panel input[name='sender_key']","#kakaoSendBox2").val();
			}else{
				var template_code = $("#panel span[name='code']","#kakaoSendBox4").html();
			}
			if(template_code == ""){
				alert('전송할 알림톡 메시지를 선택해 주세요');
				return false;
			}
			
			//분류선택
			_this.send_val.send_purpose = $("#sendPurpose","#kakaoSendBox4").val();
			if(_this.send_val.send_purpose == ""){
				_this.send_val = {};
				alert('분류선택 항목을 선택해 주세요');
				$("#sendPurpose").focus();
				return false;
			}
			
			if(_this.val.send_type=="personal"){	//개별발송
				_this.send_val.send_type = "personal";
				if(_this.val.sendListCnt == 0){
					_this.send_val = {};
					alert('받는사람을 입력해 주세요');
					return false;
				}
				_this.send_val.fail_back = $("input[name='failBack']","#kakaoSendBox2").prop('checked')== true ? "Y" : "N";
				_this.send_val.group = _this.val.sendList.group;
				_this.send_val.person = _this.val.sendList.person;

				//여기에 컨텐츠 setting
				_this.send_val.uuid = _this.val.template_contents[template_code].uuid;
				_this.send_val.sender_key = _this.val.template_contents[template_code].sender_key;
				_this.send_val.sender_key_type = _this.val.template_contents[template_code].sender_key_type;
				_this.send_val.task_id = _this.val.template_contents[template_code].task_id;
				_this.send_val.template_code = _this.val.template_contents[template_code].template_code;
				_this.send_val.template_name = _this.val.template_contents[template_code].template_name;
				_this.send_val.template_content = _this.val.template_contents[template_code].template_content;
				_this.send_val.variable = _this.val.template_contents[template_code].variable;
				_this.send_val.variable_use = _this.val.template_contents[template_code].variable_use;
				_this.send_val.chat_button_info = _this.val.template_contents[template_code].chat_button_info;
				_this.send_val.date_client_req = _this.val.date_client_req;	
				_this.send_val.changeword = _this.val.changeword;
				console.log(_this.send_val);
			}else{									//대량파일 발송
				if(_IBJson.encode(_this.val.sendList.bulk) == "{}"){  //bulk 전송 체크 변경해야함 _this.val.sendlist.bulk
					_this.send_val = {};
					alert('받는사람을 입력해 주세요');
					return false;
				}
				console.log('_this.val.sendList.bulk.length : ' + _this.val.sendList.bulk.length);
				console.log('typeof(_this.val.sendList.bulk) : ' + typeof(_this.val.sendList.bulk));
				console.log('_this.val.sendList.bulk : ' + _this.val.sendList.bulk);
				console.log('_IBJson.encode(_this.val.sendList.bulk) : ' + _IBJson.encode(_this.val.sendList.bulk));
				
				_this.send_val.fail_back = $("input[name='failBack']","#kakaoSendBox4").prop('checked')== true ? "Y" : "N";
				_this.send_val.person = _this.val.sendList.bulk;
				_this.send_val.group = {};

				//여기에 컨텐츠 setting
				_this.send_val.uuid = _this.val.template_contents2[template_code].uuid;
				_this.send_val.sender_key = _this.val.template_contents2[template_code].sender_key;
				_this.send_val.sender_key_type = _this.val.template_contents2[template_code].sender_key_type;
				_this.send_val.task_id = _this.val.template_contents2[template_code].task_id;
				_this.send_val.template_code = _this.val.template_contents2[template_code].template_code;
				_this.send_val.template_name = _this.val.template_contents2[template_code].template_name;
				_this.send_val.template_content = _this.val.template_contents2[template_code].template_content;
				_this.send_val.variable = _this.val.template_contents2[template_code].variable;
				_this.send_val.variable_use = _this.val.template_contents2[template_code].variable_use;
				_this.send_val.chat_button_info = _this.val.template_contents2[template_code].chat_button_info;
				_this.send_val.date_client_req = _this.val.date_client_req;	
				_this.send_val.changeword = _this.val.changeword;
				console.log(_this.send_val);
			}
			if(_this.val.date_client_req.length>0){//전송시간 체크...나중에
				
			}
			return true;
		},
		notitalk : {
			top : function() {
				return _main;
			},
			init : function(){
				var _this = this.top();
				console.log('notitalk.init');
				_this.notitalk.getUUID();
			},
			getUUID : function(){
				var _this = this.top();
				var param = {procType:"getUuidList" , async : false , element : "normal" };
				return $.ajax({url : Common.DEFAULT_PATH+"notitalk.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
					var json = _IBJson.decode(_data);
					console.log(json);
					if(json) {
						if(json.data) {
							var data = json.data;
							var result_code = data.resultCode;
							if(result_code == "1000"){
								if(data.listData.length > 0){
									for(var i=0;i<data.listData.length;i++) {
										var obj = data.listData[i];
										$("#uuid_list","#tab1").append("<option value='"+obj.uuid+"'>"+Common.XSSfilter(obj.uuid)+"</option>");
										$("#uuid_list","#tab2").append("<option value='"+obj.uuid+"'>"+Common.XSSfilter(obj.uuid)+"</option>");
									}
									//_this.btn.preview_template();
									var init_id = $("select[name='uuid']:eq(0)","#tab1").val();
									_this.notitalk.getTaskCategoryList(init_id);
								}else{
									alert(Common.getAlertMsg("1001"));
								}
							}else if(result_code == "8000") {
								alert(Common.getAlertMsg(result_code));
								location.href = "/common/loginForm.do";
							}else {
								alert(Common.getAlertMsg("201"));
							}
						}else {
							//json data not exist
							alert(Common.getAlertMsg("202"));
						}
					}
				}});
			},
			getTaskCategoryList : function(uuid){
				var _this = this.top();
				var param = {procType:"getTaskCategoryList", uuid:uuid};
				return $.ajax({url : Common.DEFAULT_PATH+"notitalk.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
					var json = _IBJson.decode(_data);
					console.log(json);
					if(json) {
						if(json.data) {
							var data = json.data;
							var result_code = data.resultCode;
							if(result_code == "1000"){
								if(data.listData.length > 0){
									console.log(data);
									for(var i=0;i<data.listData.length;i++) {
										var obj = data.listData[i];
										$("#task_category","#tab1").append("<option value='"+obj.task_id+"'>"+Common.XSSfilter(obj.task_name)+"</option>");
										$("#task_category","#tab2").append("<option value='"+obj.task_id+"'>"+Common.XSSfilter(obj.task_name)+"</option>");
									}
									//var task_id = $("select[name='task_category']:eq(0)","#tab1").val();
									//task_id = "BC";	//임시조치
									//console.log('task_id : ' + task_id);
									_this.notitalk.getTemplateList();
								}else{
									alert(Common.getAlertMsg("1001"));
								}
							}else if(result_code == "8000") {
								alert(Common.getAlertMsg(result_code));
								location.href = "/common/loginForm.do";
							}else {
								alert(Common.getAlertMsg("201"));
							}
						}else {
							//json data not exist
							alert(Common.getAlertMsg("202"));
						}
					}
				}});
			},
			getTemplateList : function(){
				var _this = this.top();
				_this.personal.search.check();
				_this.file.search.check();
				
			}
			//selectTaskCategoryList, selectTaskCategoryList
		},
		personal : {
			search : {
				top : function() {
					return _main;
				},
				valueCheck : function(obj){
					var placeholder = $(obj).attr("placeholder");
					var value = $(obj).val();
					
					if(placeholder == value){
						$(obj).val("");
					}
				},
				check : function() {
					var _this = this.top();
					_this.personal.search.get(0,"search");	
				},
				btn : function(){
					var _this = this.top();	
					$("#kakaoSendBox1 input[type='button']","#tranInfoArea").unbind("click").click(function(){	
						//console.log('search');
						//_this.search.check();
					});
				},
				get : function(START, type) 
				{
					var _this = this.top();
					//search field set
					var json = "";
					json = Common.getInputTagToJson($("#kakaoSendBox1"));
					//임시조치
					_this.personal.list.pJson = json;
					console.log("====================");
					console.log(_IBJson.encode(json));
					console.log("====================");
					var param = $.extend({procType:"getTemplateList"}, json);
					console.log("_this.personal.list.pJson : " + _this.personal.list.pJson);
					var param = $.extend({procType:"getTemplateList", START:START,COUNT:_this.personal.list.vertical_count}, json);
					if(START == 0) _this.personal.list.current_page = 1;
					_this.personal.list.get(param);
				}
			},
			list : {
	
				json : "",
				pJson : "",
				top : function() {
					return _main;
				},
				id : "",
				id_name : "template_list1",
				td : "",
				title : "",
				button : "",
				variable : "",
				total_count : 0,
				current_page : 1,
				vertical_count : 3,
				horizon_count : 5,
				user_count : 0,
				get : function(param) {
					$("#loadingLayer").show();
					var _this = this.top();
					_this.personal.list.json = param;
					_this.personal.list.total_count = 0;
					$.ajax({url : Common.DEFAULT_PATH+"notitalk.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						$("tbody tr td",_this.personal.list.id).remove();
						$("thead tr th",_this.personal.list.id).remove();
						_this.val.template_contents = {};
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								console.log(data);
								if(result_code == "1000") {			
									_this.personal.list.total_count = data.totalCnt;					
									if(data.listData.length > 0){
										for(var i=0;i<data.listData.length;i++) {
											var obj = data.listData[i];
											$("thead tr",_this.personal.list.id).append(_this.personal.list.title.clone());
											$("tbody tr:first",_this.personal.list.id).append(_this.personal.list.td.clone());
											$("tbody tr:last",_this.personal.list.id).append(_this.personal.list.variable.clone());
											var title = $("thead tr th:last",_this.personal.list.id);
											var td = $("tbody tr:first td:last",_this.personal.list.id);
											var variable = $("tbody tr:last td:last",_this.personal.list.id);
											var template_name = Common.XSSfilter(obj.template_name);
											var template_content = _IBCommon.convert_html(obj.template_contents);
											var template_code = obj.template_code;
											var sender_key = obj.sender_key;
											var patten =  /\#\{.+?\}/gm;
											var arr_variable = template_content.match(patten);
											var arr_button_info = obj.chat_button_info;
											
											if(!_IBCommon.is_null(arr_button_info)){
												for(var j=0;j<arr_button_info.length;j++){
													$("div .kakaoBox",td).append(_this.personal.list.button.clone());
													$("div .kakaoBox li[name='button']:last a",td).html(Common.XSSfilter(arr_button_info[j].name));	
												}
											}
											if(!_IBCommon.is_null(arr_variable)){
												arr_variable = arr_variable.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
												console.log("arr_variable uniq : " + arr_variable);
												var variable_txt = "내용변수 : ";
												for(var j=0;j<arr_variable.length;j++){
													if(j!=0){
														variable_txt = variable_txt + " ,";
													}
													variable_txt = variable_txt + arr_variable[j];
												}
												variable.html("내용변수 : 없음");
											}else{
												variable.html("내용변수 : 없음");
											}
											title.html(template_name);
											$(".kakaoBox li[name='content']",td).html(template_content);
											$("#template_list1 .talk_box:last").attr("code",template_code);
											$("#template_list1 .talk_box:last").attr("uuid",obj.uuid);
											$("#template_list1 .talk_box:last").attr("task_id",obj.task_id);
											$("#template_list1 .talk_box:last").attr("template_name",obj.template_name);
											$("#template_list1 .talk_box:last").attr("sender_key",obj.sender_key);
											$("#template_list1 .talk_box:last").attr("sender_key_type",obj.sender_key_type);
											$("#template_list1 .talk_box:last").attr("task_name",$("#kakaoSendBox1 select[name='task_id'] option:selected").text());
											//_main.val.template_contents setting
											_this.val.template_contents[template_code] = {};
											_this.val.template_contents[template_code].uuid = obj.uuid;
											_this.val.template_contents[template_code].task_id = obj.task_id;
											_this.val.template_contents[template_code].template_code = template_code;
											_this.val.template_contents[template_code].template_name = template_name;
											_this.val.template_contents[template_code].template_content = template_content;
											_this.val.template_contents[template_code].sender_key = sender_key;
											_this.val.template_contents[template_code].sender_key_type = obj.sender_key_type;
											_this.val.template_contents[template_code].variable_use = "N";
											_this.val.template_contents[template_code].variable = arr_variable;
											_this.val.template_contents[template_code].chat_button_info = obj.chat_button_info;
										}
										for(var empty=i;empty<3;empty++){
											$("thead tr",_this.personal.list.id).append('<th style="width:323px"></th>');
											$("tbody tr:first",_this.personal.list.id).append("<td></td>");
											$("tbody tr:last",_this.personal.list.id).append("<td></td>");
										}
									}else{
										$("tbody tr:first",_this.personal.list.id).append("<td><br/><br/><br/>템플릿 없음<br/><br/></td>");
									}
									
									//$("#tranInfoArea .board_info span .txtP").html("총 " + _IBCommon.format_number(_this.list.total_count) +"개");
									//console.log("_this.list.total_count :" + _this.list.total_count);
									if(_this.personal.list.total_count > 0) {
										Common.pagingDraw(_this.personal,"pagingDiv");
										$("#kakaoSendBox1 #pagingDiv").show();
									}else {
										$("#kakaoSendBox1 #pagingDiv").hide();
									}
								}else if(result_code == "8000") {
									alert(Common.getAlertMsg(result_code));
									location.href = "/common/login_form.do";
								}else {
									alert(Common.getAlertMsg("201"));
								}
							}else {
								//json data not exist
								alert(Common.getAlertMsg("202"));
							}
						}					
						_this.personal.list.btn();
						$("#loadingLayer").hide();
					}});
				},
				btn : function(){
					var _this = this.top();
					$("#template_list1 tbody .talk_box").unbind("click").click(function(){
						var code = $(this).attr("code");
						var uuid = Common.XSSfilter($(this).attr("uuid"));
						var task_id = $(this).attr("task_id");
						var task_name = Common.XSSfilter($(this).attr("task_name"));
						var template_name =  $(this).attr("template_name");
						var template_content = Common.XSSfilter($("div[name='template_content']",$(this).parent()).html());
						var sender_key = $("#template_list1 .talk_box").attr("sender_key");
						var sender_key_type = $("#template_list1 .talk_box").attr("sender_key_type");
						var param = {code:code,uuid:uuid,task_id:task_id,task_name:task_name,template_name:template_name,template_content:template_content,sender_key:sender_key,sender_key_type:sender_key_type}; 
						_this.personal.send.init(param);
						$("#kakaoSendBox1").hide();
						$("#kakaoSendBox2").show();
					});
				}
			},
			send : {
				id_name : "kakaoSendBox2",
				id : "",
				top : function() {
					return _main;
				},
				init : function(param){
					var _this = this.top();
					_this.personal.send.id = $("#"+_this.personal.send.id_name);
					this.init_content(param);
					// 개별전송 init
					this.sendList.init();
					this.address.init();
					// 분류선택 init
					this.sendPurposeInit();
					// 내저장 메시지, 템플릿 init
					this.btn();
				},
				init_content : function(param){
					console.log(param);
					var _this = this.top();
					var code = param.code;
					var uuid = param.uuid;
					var task_id = param.task_id;
					var task_name = param.task_name;
					var sender_key = param.sender_key;
					var sender_key_type = param.sender_key_type;
					var template_name = param.template_name;
					var template_content = _IBCommon.convert_html(param.template_content);
					$("#flip span[name='uuid']",_this.personal.send.id).html(uuid);
					$("#panel span[name='task_name']",_this.personal.send.id).html(task_name);
					$("#panel span[name='template_name']",_this.personal.send.id).html(template_name);
					$("#panel span[name='code']",_this.personal.send.id).html(code);
					$("#template_content",_this.personal.send.id).html(template_content);
					$("#panel input[name='sender_key']",_this.personal.send.id).html(sender_key);
					$("#panel input[name='sender_key_type']",_this.personal.send.id).html(sender_key_type);
				},
				btn : function(){
					var _this = this.top();
					$("#flip span[name='detail_open']",_this.personal.send.id).unbind("click").click(function(){
						$("#flip span[name='detail_close']",_this.personal.send.id).show();
						$("#flip span[name='detail_open']",_this.personal.send.id).hide();
						$("#panel",_this.personal.send.id).show();
					});
					$("#flip span[name='detail_close']",_this.personal.send.id).unbind("click").click(function(){
						$("#flip span[name='detail_open']",_this.personal.send.id).show();
						$("#flip span[name='detail_close']",_this.personal.send.id).hide();
						$("#panel",_this.personal.send.id).hide();
					});
					$("#backBtn",_this.personal.send.id).unbind("click").click(function(){
						$("#flip span[name='uuid']",_this.personal.send.id).html("");
						$("#panel span[name='task_name']",_this.personal.send.id).html("");
						$("#panel span[name='template_name']",_this.personal.send.id).html("");
						$("#panel span[name='code']",_this.personal.send.id).html("");
						$("#template_content",_this.personal.send.id).html("");
						$("#panel input[name='sender_key']",_this.personal.send.id).html("");
						$("#panel input[name='sender_key_type']",_this.personal.send.id).html("");
						_this.send_val = {};
						$("#kakaoSendBox1").show();
						$("#kakaoSendBox2").hide();
					});
					$("#selectAddress input[name='addrTap']").unbind("click").click(function(e) {
						console.log($(this).val());
						$("#sendAdd1").hide();
						$("#sendAdd2").hide();
						$("#sendAdd3").hide();
						var selectedTab = $(this).val();
						$("#" + selectedTab).show();
						_this.personal.send.address.addrTab(selectedTab);
					});
					$("#addBtn").unbind("click").click(function(e) {
						if(_this.val.address_type == "recent"){
							console.log("최근발신번호");
							_this.personal.send.sendList.addRecent();
						}else if(_this.val.address_type == "copyNPaste"){
							console.log("붙여넣기");
							_this.personal.send.sendList.addCopyNPaste();
						}else{
							console.log("주소록");
							_this.personal.send.sendList.addAddrBook();
						}
					});								
					$("#reservCheck").unbind("click").click(function(e) {
						console.log("checkbox");
						_this.personal.send.getDate();
					});										
					$("#reservBtn").unbind("click").click(function(e) {
						_this.personal.send.getDate();
					});
					$("#apDivCalendar .CalendarCancel").unbind("click").click(function(e){
						console.log('닫기');
						$("#apDivCalendar").hide();
						$("#reservCheck").prop('checked',false);
						$(".GrayBoxArea label[name='reservTime']").html("");
						_this.val.date_client_req = "";
						$("#modal6 span[name='reservType']").html("즉시 발송");
						$("#modal6 span[name='reservTxt']").hide();
						$(".GrayBoxArea label[name='reservTime']").hide();
					});
					$("#apDivCalendar .CalendarConfirm").unbind("click").click(function(e){
						var reservDate = $("#reserveDate").val();
						var hours = $("#apDivCalendar select[name='hours']").val();
						var minutes = $("#apDivCalendar select[name='minutes']").val();
						$("#reservCheck").prop('checked',true);
						if(reservDate == ""){
							var Now = new Date();
							var yyyy = Now.getFullYear();
							var mm = "0" + (parseInt(Now.getMonth()) + 1);
							var dd = "0" + Now.getDate();
							mm = mm.substr(mm.length-2,2);
							dd = dd.substr(dd.length-2,2);
							reservDate = yyyy + "." + mm + "." + dd;
						}
						$(".GrayBoxArea label[name='reservTime']").html(reservDate + " " + hours + ":" + minutes);
						_this.val.date_client_req = reservDate + " " + hours + ":" + minutes;
						$("#modal6 span[name='reservType']").html("예약 발송");
						$("#modal6 span[name='reservTxt']").html("예약시간 : "+_this.val.date_client_req + "</br>");
						$("#modal6 span[name='reservTxt']").show();
						$(".GrayBoxArea label[name='reservTime']").show();
						$("#apDivCalendar").hide();
					});
				},
				getDate : function(){
					$("#apDivCalendar").show();
					var curDate = new Date();
					var selDate = "";
					$("#reserveCalendar").datepicker({
					    dateFormat: 'yy.mm.dd',
					    prevText: '이전 달',
					    nextText: '다음 달',
					    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
					    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
					    dayNames: ['일','월','화','수','목','금','토'],
					    dayNamesShort: ['일','월','화','수','목','금','토'],
					    dayNamesMin: ['일','월','화','수','목','금','토'],
					    showMonthAfterYear: true,
					    yearSuffix: '년',
					    minDate: curDate,
						maxDate: "6m",
						onSelect : function(selectedDate){
							var date = selectedDate.split(".");
							var year = date[0]; 
							var month = date[1]; 
							var day = date[2];
							$("#reserveDate").val(selectedDate);
						}
					});
				},
				sendPurposeInit : function(){
					var _this = this.top();
					var param = {procType:"getSendPurpose"};
					$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								if(result_code == "1000") {
									console.log(data);
									for(var i=0;i<data.listData.length;i++) {
										$("#sendPurpose").append("<option value=''></option>");
										var obj = data.listData[i];
										var option_obj = $("#sendPurpose option:last");
										purpose_name = Common.XSSfilter(obj.PURPOSE_NAME);
										purpose_code = obj.PURPOSE_CODE;
										option_obj.val(purpose_code)
										option_obj.text(purpose_name)
									}
								}else if(result_code == "8000") {
									alert(Common.getAlertMsg(result_code));
									location.href = "/common/loginForm.do";
								}else {
									alert(Common.getAlertMsg("201"));
								}
							}else {
								//json data not exist
								alert(Common.getAlertMsg("202"));
							}
						}
					}});
				},
				sendList : {
					send_list_obj : "",
					send_list_empty_obj : "",
					top : function() {
						return _main;
					},
					init : function(){
						var _this = this.top();
						_this.personal.send.sendList.send_list_obj = $("#sendList tbody tr:first").clone();
						_this.personal.send.sendList.send_list_empty_obj = $("#sendList tbody tr:last").clone();
						_this.personal.send.sendList.btn();
					},	
					btn : function(){
						var _this = this.top();
						$("#tabs2 .tabmenu li").unbind("click").click(function(){
							//gubun값 변경
							$(this).attr("rel") == "tab4" ? _main.val.send_type = "bulk" : _main.val.send_type = "personal" ;
							if(_main.val.send_type == "bulk"){
								$("#tab4 #file_input").val("");
								$("input[type='file']","#imageFrm").val("");
							}
							console.log(_main.val.send_type);
						});
						$("#sendList tbody tr span[name='delBtn']").unbind("click").click(function(){
							var del_obj = $(this).parent().parent();
							var kind = del_obj.attr("kind");
							var del_cnt = 1;
							if(kind == "group"){
								del_cnt = del_obj.attr("cnt");
								var group_id = del_obj.attr("group_id");
								delete _this.val.sendList.group[group_id];
								console.log(del_cnt);
							}else if(kind == "copyNPaste"){
								del_cnt = del_obj.attr("cnt");	
								delete _this.val.sendList.person[person_mobile];				
							}else{
								var person_mobile = del_obj.attr("person_mobile");
								delete _this.val.sendList.person[person_mobile];
							}
							del_obj.remove();
							if($("#sendList tbody tr").length < 10){
								$("#sendList tbody").append(_this.personal.send.sendList.send_list_empty_obj.clone());							
							}
							_this.val.sendListCnt--;
							_this.val.sendCnt = _this.val.sendCnt - del_cnt;
							$("#sendArea span[name='sendCnt']").html(_this.val.sendCnt);
						});
						$("#sendArea span[name='delSendListBtn'] a").unbind("click").click(function(){
							_this.personal.send.sendList.sendListClear();
						});
						$("#sendAdd3 span[name='delBtn'] a").unbind("click").click(function(){
							$("#copyNPasteArea").val("");
						});
					},
					sendListClear : function(){
						var _this = this.top();
						$("#sendList tbody tr").remove();
						for(var i=0;i<10;i++){
							$("#sendList tbody").append(_this.personal.send.sendList.send_list_obj.clone());							
						}
						$("#sendArea span[name='sendCnt']").html(0);
						_this.val.sendListCnt = 0;
						_this.val.sendCnt = 0;
						_this.val.sendList.group = {};
						_this.val.sendList.person = {};
					},
					addCopyNPaste : function(){
						var _this = this.top();
						var copy_n_paste_val = $("#copyNPasteArea").val().trim();
						var mobile_arr = [];
						var temp_arr = [];
						if(copy_n_paste_val.trim().length>0){
							if(copy_n_paste_val.indexOf("\n")>0){
								temp_arr = copy_n_paste_val.split("\n");
							}else{
								temp_arr[0] = copy_n_paste_val;
							}
							var mobile_cnt = 0;
							var Now = new Date();

							var NowTime = Now.getFullYear();
							NowTime += '-' + Now.getMonth() + 1 ;
							NowTime += '-' + Now.getDate();
							NowTime += ' ' + Now.getHours();
							NowTime += ':' + Now.getMinutes();
							NowTime += ':' + Now.getSeconds();
							console.log("start");
							console.log(NowTime);
							for(var i=0;i<temp_arr.length;i++){
								if(_IBCommon.is_phone(temp_arr[i])){
									var person_mobile = _IBCommon.format_phone(temp_arr[i]);
									if(typeof(_this.val.sendList.person[person_mobile]) == "undefined"){
										mobile_arr[mobile_cnt] = {person_name:"", person_mobile:person_mobile};
										_this.val.sendList.person[person_mobile] = {person_name:"", person_mobile:person_mobile};
										mobile_cnt++;
									}else{//중복
										alert('이미 추가된 휴대폰 번호 입니다.('+person_mobile+')');
									}
								}
							}
							console.log("end");
							var NowTime = Now.getFullYear();
							NowTime += '-' + Now.getMonth() + 1 ;
							NowTime += '-' + Now.getDate();
							NowTime += ' ' + Now.getHours();
							NowTime += ':' + Now.getMinutes();
							NowTime += ':' + Now.getSeconds();
							console.log(NowTime);
							if(mobile_cnt>0){
								mobile_arr = {name:"번호붙여넣기",cnt:mobile_cnt}
								console.log(mobile_arr);
								_this.val.sendCnt = parseInt(_this.val.sendCnt) + parseInt(mobile_cnt);
								_this.personal.send.sendList.add("copyNPaste",mobile_arr);
								$("#copyNPasteArea").val("");
							}
						}else{
							alert('휴대폰 번호를 입력해 주세요');
						}
					},
					addRecent : function(){
						var _this = this.top();
						if($("#recentList input:checked").length>0){

							var recentJson = []; 
							var json_cnt = 0;
							console.log("json.length : " + recentJson.length);
							console.log( "#recentList input:checked : " + $("#recentList input:checked").length);
							for(var i=0;i<$("#recentList input:checked").length;i++){
								var recent_obj = $("#recentList input:checked").eq(i).parent().parent();
								var person_name = $("span[name='name']",recent_obj).html();
								var person_mobile = $("span[name='mobile']",recent_obj).html();
								if(typeof(_this.val.sendList.person[recent_mobile]) == "undefined"){
									recentJson[json_cnt] = {person_name:person_name, person_mobile:person_mobile};
									_this.val.sendList.person[person_mobile] = {person_name:person_name, person_mobile:person_mobile};
									json_cnt++;
								}else{//중복
									alert('이미 추가된 휴대폰 번호 입니다.('+person_mobile+')');
								}
							}
							if(recentJson.length>0){
								_this.val.sendCnt = parseInt(_this.val.sendCnt) + parseInt(json_cnt);
								_this.personal.send.sendList.add("person",recentJson);							
							}
						}else{
							alert('선택된 최근 발신번호가 없습니다.');
						}
					},
					addAddrBook : function(){ 
						// 그룹 checkbox 체크
						var _this = this.top();
						if($("#groupList input:checked").length>0){
							var groupJson = []; 
							var json_cnt = 0;
							console.log("json.length : " + groupJson.length);
							for(var i=0;i<$("#groupList input:checked").length;i++){
								var group_id = $("#groupList input:checked").eq(i).attr("group_id");
								var group_obj = $("#groupList input:checked").eq(i).parent();
								var group_name = $("span[name='group_name']",group_obj).html();
								var group_cnt = $("span[name='group_cnt']",group_obj).html();
								if(typeof(_this.val.sendList.group[group_id]) == "undefined"){	//그룹 중복 체크
									if(group_id == 0 || group_id == "ALL"){			// 전체 그룹인경우
										var total_group_id = "ALL";
										delete _this.val.sendList.group;
										_this.val.sendList.group = {};
										//_this.val.sendList.group[group_id] = group_id;
										_this.val.sendList.group[total_group_id] = _this.val.groupAddressList[group_id];
										groupJson[group_id] = {group_id:group_id, group_name:group_name,group_cnt:group_cnt};
										//지워지는 그룹 cnt를 차감
										var group_obj = $("#sendList tbody tr[kind='group']");
										var delSendCnt = 0;
										group_obj.each(function(){
											delSendCnt = delSendCnt + parseInt($(this).attr("cnt"));
										});
										_this.val.sendCnt = _this.val.sendCnt-delSendCnt;
										//차감끝
										_this.val.sendCnt = parseInt(_this.val.sendCnt) + parseInt(group_cnt);
										//json_cnt++;
										break;
										//기존 추가된 그룹 삭제
										//전체 그룹 추가
									}else{
										console.log("=================");
										console.log(_this.val.sendList.group[0]);
										console.log("=================");
										if(typeof(_this.val.sendList.group[0])!="undefined" || typeof(_this.val.sendList.group["ALL"])!="undefined"){
											alert('전체 그룹이 추가되어 있습니다.');
											break;
										}else{
											//_this.val.sendList.group[group_id] = group_id;
											_this.val.sendList.group[group_id] = _this.val.groupAddressList[group_id];
											groupJson[json_cnt] = {group_id:group_id, group_name:group_name,group_cnt:group_cnt};
											_this.val.sendCnt = parseInt(_this.val.sendCnt) + parseInt(group_cnt);
											json_cnt++;
											//그룹추가
										}
									}
								}else{//중복
									if(group_id == 0){
										alert('이미 추가된 그룹입니다.('+group_name+')');
										break;
									}else{
										alert('이미 추가된 그룹입니다.('+group_name+')');							
									}
								}
							}
							if(groupJson.length>0){
								_this.personal.send.sendList.add("group",groupJson);							
							}
						}else if($("#personalList input:checked").length>0){

							var personJson = []; 
							var json_cnt = 0;
							console.log("json.length : " + personJson.length);
							for(var i=0;i<$("#personalList input:checked").length;i++){
								var person_obj = $("#personalList input:checked").eq(i).parent().parent();
								var person_name = $("span[name='address_name']",person_obj).html();
								var person_mobile = $("span[name='address_mobile']",person_obj).html();
								if(typeof(_this.val.sendList.person[person_mobile]) == "undefined"){
									personJson[json_cnt] = {person_name:person_name, person_mobile:person_mobile};
									_this.val.sendList.person[person_mobile] = {person_name:person_name, person_mobile:person_mobile};
									json_cnt++;
								}else{//중복
									alert('이미 추가된 휴대폰 번호 입니다.('+person_mobile+')');
								}
							}
							if(personJson.length>0){
								_this.val.sendCnt = _this.val.sendCnt + personJson.length;
								_this.personal.send.sendList.add("person",personJson);							
							}
						}else{
							alert('선택된 개인주소록이 없습니다.');
						}
						// 개인 checkbox 체크
					},
					add : function(sendGubun, json){
						var _this = this.top();
						console.log(sendGubun);
						console.log(json);
						//group, Json[group_id] = {group_id:group_id, group_name:group_name,group_cnt:group_cnt}
						//person, Json[mobile]{mobile:mobile, name:name}
						//그룹
						console.log("json.length : " + json.length);
						var jsonLen = json.length;
						if(sendGubun == "group"){
							if(json["0"].group_id=="0" || json["0"].group_id=="ALL"){	//전체일경우 그룹주소록 모두 삭제
								console.log("전체일경우 그룹주소록 모두 삭제");
								var group_obj = $("#sendList tbody tr[kind='group']");
								var delCnt = group_obj.length;
								group_obj.remove();
								_this.val.sendListCnt=_this.val.sendListCnt-delCnt;							
								for(var i=_this.val.sendListCnt;i<delCnt;i++){
									$("#sendList tbody").append(_this.personal.send.sendList.send_list_empty_obj.clone());								
								}
							}
							for(var i=0;i<jsonLen;i++){
								var group_id = json[i].group_id;
								var group_name = Common.XSSfilter(json[i].group_name);
								var group_cnt = _IBCommon.format_number(json[i].group_cnt);
								if(_this.val.sendListCnt>10){
									$("#sendList tbody").append(_this.personal.send.sendList.send_list_obj.clone());
									var tr_obj = $("#sendList tbody tr:last");
									console.log("#sendList tbody tr:last");
								}else{
									console.log("#sendList tbody tr:eq("+_this.val.sendListCnt+")");
									console.log($("#sendList tbody tr:eq("+_this.val.sendListCnt+")"));
									var tr_obj = $("#sendList tbody tr:eq("+_this.val.sendListCnt+")");
								}
								tr_obj.attr("kind","group");
								tr_obj.attr("group_id",group_id);
								tr_obj.attr("cnt",group_cnt);
								$("td span[name='name']",tr_obj).html(group_name);
								$("td span[name='phone']",tr_obj).html(group_cnt + "건");
								$("td span[name='delBtn']",tr_obj).show();
								_this.val.sendListCnt++;
							}
						}else if(sendGubun == "copyNPaste"){
							console.log(sendGubun);
							//mobile_arr = {name:"번호붙여넣기",cnt:mobile_cnt}
							if(_this.val.sendListCnt>10){
								$("#sendList tbody").append(_this.personal.send.sendList.send_list_obj.clone());
								var tr_obj = $("#sendList tbody tr:last");
							}else{
								var tr_obj = $("#sendList tbody tr:eq("+_this.val.sendListCnt+")");
							}
							tr_obj.attr("kind","copyNPaste");
							tr_obj.attr("cnt",json.cnt);
							//tr_obj.attr("person_mobile",person_mobile);
							$("td span[name='name']",tr_obj).html(json.name);
							$("td span[name='phone']",tr_obj).html(_IBCommon.format_number(json.cnt) + "건");
							$("td span[name='delBtn']",tr_obj).show();
							_this.val.sendListCnt++;
						}else{
							for(var i=0;i<jsonLen;i++){
								var person_name = Common.XSSfilter(json[i].person_name);
								var person_mobile = json[i].person_mobile;
								if(_this.val.sendListCnt>10){
									$("#sendList tbody").append(_this.personal.send.sendList.send_list_obj.clone());
									var tr_obj = $("#sendList tbody tr:last");
								}else{
									var tr_obj = $("#sendList tbody tr:eq("+_this.val.sendListCnt+")");
								}
								tr_obj.attr("kind","person");
								tr_obj.attr("person_mobile",person_mobile);
								$("td span[name='name']",tr_obj).html(person_name);
								$("td span[name='phone']",tr_obj).html(person_mobile);
								$("td span[name='delBtn']",tr_obj).show();
								_this.val.sendListCnt++;
							}
							
						}
						$("#sendArea span[name='sendCnt']").html(_this.val.sendCnt);
						console.log( "#sendArea span[name='sendCnt']" + _this.val.sendCnt);
						
					}	
				},
				address : {
					address_list_cnt : 6,
					top : function() {
						return _main;
					},
					group_list_obj : "",
					group_list_empty_obj : "",
					personal_list_obj : "",
					personal_list_empty_obj : "",
					recent_list_obj : "",
					recent_list_empty_obj : "",
					address_list_obj : "",				
					init : function(){
						var _this = this.top();
						_this.personal.send.address.group.init();
						_this.personal.send.address.personal.init();
						_this.personal.send.address.btn();
						_this.personal.send.address.recent_list_obj = $("#recentList tbody tr:first").clone();
						_this.personal.send.address.recent_list_empty_obj = $("#recentList tbody tr:last").clone();
					},	
					btn : function(){
						
					},
					addrTab : function(addr_tab){
						var _this = this.top();
						if(addr_tab == "sendAdd2"){				//최근발신번호
							$("#loadingLayer").show();
							_this.val.address_type = "recent";
							var param = {procType:"getRecentAddress"};
							$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
								var json = _IBJson.decode(_data);
								if(json) {
									if(json.data) {
										var data = json.data;
										var result_code = data.resultCode;
										if(result_code == "1000") {
											console.log(data);
											$("#recentList tbody tr").remove();
											for(var i=0;i<data.listData.length;i++) {
												$("#recentList tbody").append(_this.personal.send.address.recent_list_obj.clone());
												var obj = data.listData[i];
												var tr = $("#recentList tbody tr:last");
												recent_name = Common.XSSfilter(obj.name);
												recent_name = recent_name == "" ? "고객" : recent_name;
												//console.log();
												recent_mobile = _IBCommon.format_phone(" " + obj.recipient_num);
												$("input",tr).attr("seq", i);
												$("span[name='name']",tr).html(recent_name);
												$("span[name='mobile']",tr).html(recent_mobile);
												//$("span[name='address_name']","#personalList tbody tr:last").html(address_name);
												//$("span[name='address_mobile']","#personalList tbody tr:last").html(address_mobile);
												
											}
											if(data.listData.length < 10){
												for(var i=data.listData.length;i<10;i++) {
													console.log(i);
													$("#recentList tbody").append(_this.personal.send.address.recent_list_empty_obj.clone());
												}											
											}
										}else if(result_code == "8000") {
											alert(Common.getAlertMsg(result_code));
											location.href = "/common/loginForm.do";
										}else {
											alert(Common.getAlertMsg("201"));
										}
									}else {
										//json data not exist
										alert(Common.getAlertMsg("202"));
									}
								}
								$("#loadingLayer").hide();
							}});
							
						}else if(addr_tab == "sendAdd3"){
							_this.val.address_type = "copyNPaste";
							//console.log("번호붙여넣기");
						}else{
							_this.val.address_type = "addrBook";
							//_this.address.group.init();
							//_this.address.personal.init();
						}
					},
					group : {
						top : function() {
							return _main;
						},				
						init : function(){
							var _this = this.top();
							_this.personal.send.address.group_list_obj = $("#groupList tbody tr:first").clone();
							_this.personal.send.address.group_list_empty_obj = $("#groupList tbody tr:last").clone();
							_this.personal.send.address.personal_list_obj = $("#personalList tbody tr:first").clone();
							_this.personal.send.address.personal_list_empty_obj = $("#personalList tbody tr:last").clone();
							$("#groupList tbody tr").remove();
							_this.personal.send.address.group.groupList(0);
						},	
						btn : function(){
							var _this = this.top();
							$("#groupList tbody tr").unbind("click").click(function(){
								$("#groupList tbody tr").removeClass("on");
								$(this).addClass("on");
								var group_id = $("input",$(this)).attr("group_id");
								$("#searchArea input[name='group_id']").val(group_id);
								var json = {group_id:group_id};
								_this.personal.send.address.personal.addressList(json);
							});
						},
						groupList : function(group_id){
							var _this = this.top();

							var param = {procType:"getGroupList", group_id:group_id};
							$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
								var json = _IBJson.decode(_data);
								if(json) {
									if(json.data) {
										var data = json.data;
										var result_code = data.resultCode;
										if(result_code == "1000") {
											var address_cnt = _IBCommon.format_number(data.addressCnt);
											var group_name = "";
											var group_id = "";
											$("#groupList tbody").append(_this.personal.send.address.group_list_obj.clone());
											$("#groupList tbody tr input").attr("group_id", "0");
											$("span[name='group_cnt']","#groupList tbody tr").html(address_cnt);
											$("span[name='group_name']","#groupList tbody tr").attr("title","전체");
											$("#groupList tbody tr").removeClass("on");
											$("#groupList tbody tr td input[type='checkbox']").prop("checked", false);
											for(var i=0;i<data.listData.length;i++) {
												var obj = data.listData[i];
												$("#groupList tbody").append(_this.personal.send.address.group_list_obj.clone());
												$("#groupList tbody tr:last").removeClass("on");
												$("#groupList tbody tr:last td input[type='checkbox']").prop("checked", false);
												var tr = $("#groupList tbody tr:last");
												address_cnt = _IBCommon.format_number(obj.cnt);
												group_name = Common.XSSfilter(" " + obj.group_name);
												group_id = obj.group_id;
												$("#groupList tbody tr:last input").attr("group_id", group_id);
												$("span[name='group_name']","#groupList tbody tr:last").html(group_name);
												$("span[name='group_cnt']","#groupList tbody tr:last").html(address_cnt);
												$("span[name='group_name']","#groupList tbody tr:last").attr("title",group_name);
											}
											_this.personal.send.address.group.btn();
											if(data.listData.length < _this.personal.send.address.address_list_cnt){
												for(var i=data.listData.length;i<_this.personal.send.address.address_list_cnt;i++) {
													$("#groupList tbody").append(_this.personal.send.address.group_list_empty_obj.clone());
												}											
											}
											
										}else if(result_code == "8000") {
											alert(Common.getAlertMsg(result_code));
											location.href = "/common/loginForm.do";
										}else {
											alert(Common.getAlertMsg("201"));
										}
									}else {
										//json data not exist
										alert(Common.getAlertMsg("202"));
									}
								}
							}});
							
						}
					},
					personal : {
						top : function() {
							return _main;
						},				
						init : function(){
							var _this = this.top();
							var json = {group_id:"0"};
							//_this.address.personal.addressList(json);	
							$("#personalList tbody tr").remove();
							console.log('personal.init');
							_this.val.send_type = "personal";
							for(var i=0;i<_this.personal.send.address.address_list_cnt + 1;i++) {
								$("#personalList tbody").append(_this.personal.send.address.personal_list_empty_obj.clone());
							}	
							_this.personal.send.address.personal.btn();
						},	
						btn : function(){
							var _this = this.top();
							$("#sendAdd1 #searchArea a.btn_search").unbind("click").click(function(){
								var json = Common.getInputTagToJson($("#sendAdd1 #searchArea"));
								if(json.searchStr!=""){
									_this.personal.send.address.personal.addressList(json);	
								}else{
									alert('입력후 검색하세요');
									$("#sendAdd1 #searchArea input[name='searchStr']").focus();
								}
							});
						},
						addressList : function(json){
							$("#loadingLayer").show();
							//var json = Common.getInputTagToJson($("#searchArea"));
							var _this = this.top();
							$("#personalList tbody tr").remove();
							var param = $.extend({procType:"getAddressList"}, json);
							$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
								var json = _IBJson.decode(_data);
								if(json) {
									if(json.data) {
										var data = json.data;
										var result_code = data.resultCode;
										if(result_code == "1000") {
											$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
												var json = _IBJson.decode(_data);
												if(json) {
													if(json.data) {
														var data = json.data;
														var result_code = data.resultCode;
														if(result_code == "1000") {
															var tmp_group = {};
															for(var i=0;i<data.listData.length;i++) {
																var obj = data.listData[i];
																var seq = obj.seq;
																var address_name = Common.XSSfilter(" " + obj.name);
																var address_mobile = _IBCommon.format_phone(" " + obj.mobile);
																$("#personalList tbody").append(_this.personal.send.address.personal_list_obj.clone());
																var tr = $("#personalList tbody tr:last");
																$("#personalList tbody tr:last input").attr("seq", seq);
																$("span[name='address_name']","#personalList tbody tr:last").html(address_name);
																$("span[name='address_mobile']","#personalList tbody tr:last").html(address_mobile);
																if(typeof(param.searchTarget) == "undefined"){
																	tmp_group[address_mobile] = {person_name:address_name,person_mobile:address_mobile};
																	console.log(tmp_group[address_mobile]);
																	_this.val.groupAddressList[param.group_id] = tmp_group[address_mobile];
																	//_this.val.sendList.group[group_id];
																	//_this.val.sendList.person[person_mobile] = {person_name:person_name, person_mobile:person_mobile};
																}
															}
															if(typeof(param.searchTarget) == "undefined"){
																_this.val.groupAddressList[param.group_id] = tmp_group;
															}
															console.log(_this.val.groupAddressList);
															if(data.listData.length < _this.personal.send.address.address_list_cnt + 1){
																for(var i=data.listData.length;i<_this.personal.send.address.address_list_cnt + 1;i++) {
																	$("#personalList tbody").append(_this.personal.send.address.personal_list_empty_obj.clone());
																}											
															}
														}else if(result_code == "8000") {
															alert(Common.getAlertMsg(result_code));
															location.href = "/common/loginForm.do";
														}else {
															alert(Common.getAlertMsg("201"));
														}
													}else {
														//json data not exist
														alert(Common.getAlertMsg("202"));
													}
												}
											}});
										}else if(result_code == "8000") {
											alert(Common.getAlertMsg(result_code));
											location.href = "/common/loginForm.do";
										}else {
											alert(Common.getAlertMsg("201"));
										}
									}else {
										//json data not exist
										alert(Common.getAlertMsg("202"));
									}
								}
								$("#loadingLayer").hide();
							}});
							
						}
					}
				}
			}
		},
		file : {
			search : {
				top : function() {
					return _main;
				},
				valueCheck : function(obj){
					var placeholder = $(obj).attr("placeholder");
					var value = $(obj).val();
					
					if(placeholder == value){
						$(obj).val("");
					}
				},
				check : function() {
					var _this = this.top();
					_this.file.search.get(0,"search");	
				},
				btn : function(){
					var _this = this.top();	
					$("#kakaoSendBox3 input[type='button']","#tranInfoArea").unbind("click").click(function(){	
						console.log('search');
						//_this.search.check();
					});
				},
				get : function(START, type) 
				{
					var _this = this.top();
					//search field set
					var json = "";
					json = Common.getInputTagToJson($("#kakaoSendBox3"));
					//임시조치
					_this.file.list.pJson = json;
					console.log("====================");
					console.log(_IBJson.encode(json));
					console.log("====================");
					var param = $.extend({procType:"getTemplateList"}, json);
					console.log("_this.file.list.pJson : " + _this.file.list.pJson);
					var param = $.extend({procType:"getTemplateList", START:START,COUNT:_this.file.list.vertical_count}, json);
					if(START == 0) _this.file.list.current_page = 1;
					_this.file.list.get(param);
				}
			},
			list : {
	
				json : "",
				pJson : "",
				top : function() {
					return _main;
				},
				id : "",
				id_name : "template_list2",
				td : "",
				title : "",
				button : "",
				variable : "",
				total_count : 0,
				current_page : 1,
				vertical_count : 3,
				horizon_count : 5,
				user_count : 0,
				get : function(param) {
					$("#loadingLayer").show();
					var _this = this.top();
					_this.file.list.json = param;
					_this.file.list.total_count = 0;
					$.ajax({url : Common.DEFAULT_PATH+"notitalk.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						$("tbody tr td",_this.file.list.id).remove();
						$("thead tr th",_this.file.list.id).remove();
						
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								console.log(data);
								if(result_code == "1000") {			
									_this.file.list.total_count = data.totalCnt;					
									if(data.listData.length > 0){
										for(var i=0;i<data.listData.length;i++) {
											var obj = data.listData[i];
											$("thead tr",_this.file.list.id).append(_this.file.list.title.clone());
											$("tbody tr:first",_this.file.list.id).append(_this.file.list.td.clone());
											$("tbody tr:last",_this.file.list.id).append(_this.file.list.variable.clone());
											var title = $("thead tr th:last",_this.file.list.id);
											var td = $("tbody tr:first td:last",_this.file.list.id);
											var variable = $("tbody tr:last td:last",_this.file.list.id);
											var template_name = Common.XSSfilter(obj.template_name);
											var template_content = _IBCommon.convert_html(obj.template_contents);
											var template_code = obj.template_code;
											var sender_key = obj.sender_key;
											var patten =  /\#\{.+?\}/gm;
											var arr_variable = template_content.match(patten);
											var arr_button_info = obj.chat_button_info;
											if(!_IBCommon.is_null(arr_button_info)){
												for(var j=0;j<arr_button_info.length;j++){
													$("div .kakaoBox",td).append(_this.file.list.button.clone());
													$("div .kakaoBox li[name='button']:last a",td).html(Common.XSSfilter(arr_button_info[j].name));	
												}
											}
											if(!_IBCommon.is_null(arr_variable)){
												arr_variable = arr_variable.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);												
												var variable_txt = "내용변수 : ";
												for(var j=0;j<arr_variable.length;j++){
													if(j!=0){
														variable_txt = variable_txt + " ,";
													}
													variable_txt = variable_txt + arr_variable[j];
													variable.html(variable_txt);
												}
											}else{
												variable.html("내용변수 : 없음");
											}
											title.html(template_name);
											$(".kakaoBox li[name='content']",td).html(template_content);
											$("#template_list2 .talk_box:last").attr("code",template_code);
											$("#template_list2 .talk_box:last").attr("uuid",obj.uuid);
											$("#template_list2 .talk_box:last").attr("task_id",obj.task_id);
											$("#template_list2 .talk_box:last").attr("template_name",obj.template_name);
											$("#template_list2 .talk_box:last").attr("sender_key",obj.sender_key);
											$("#template_list2 .talk_box:last").attr("sender_key_type",obj.sender_key_type);
											$("#template_list2 .talk_box:last").attr("task_name",$("#kakaoSendBox3 select[name='task_id'] option:selected").text());
											
											$("#template_list2 .talk_box:last").attr("task_name",$("#kakaoSendBox3 select[name='task_id'] option:selected").text());
											_this.val.template_contents2[template_code] = {};
											_this.val.template_contents2[template_code].uuid = obj.uuid;
											_this.val.template_contents2[template_code].task_id = obj.task_id;
											_this.val.template_contents2[template_code].template_code = template_code;
											_this.val.template_contents2[template_code].template_name = template_name;
											_this.val.template_contents2[template_code].template_content = template_content;
											_this.val.template_contents2[template_code].sender_key = sender_key;
											_this.val.template_contents2[template_code].sender_key_type = obj.sender_key_type;
											if(!_IBCommon.is_null(arr_variable)){
												_this.val.template_contents2[template_code].variable_use = "Y";
											}else{
												_this.val.template_contents2[template_code].variable_use = "N";
											}
											_this.val.template_contents2[template_code].variable = arr_variable;
											_this.val.template_contents2[template_code].chat_button_info = obj.chat_button_info;
										}
										for(var empty=i;empty<3;empty++){
											$("thead tr",_this.file.list.id).append('<th style="width:323px"></th>');
											$("tbody tr:first",_this.file.list.id).append("<td></td>");
											$("tbody tr:last",_this.file.list.id).append("<td></td>");
										}
									}else{
										$("tbody tr:first",_this.file.list.id).append("<td><br/><br/><br/>템플릿 없음<br/><br/></td>");
									}
									
									//$("#tranInfoArea .board_info span .txtP").html("총 " + _IBCommon.format_number(_this.list.total_count) +"개");
									//console.log("_this.list.total_count :" + _this.list.total_count);
									if(_this.file.list.total_count > 0) {
										Common.pagingLayerDraw(_this.file.list,"pagingLayerDiv");
										$("#kakaoSendBox3 #pagingLayerDiv").show();
										console.log('show');
									}else {
										$("#kakaoSendBox3 #pagingLayerDiv").hide();
										console.log('hide');
									}
								}else if(result_code == "8000") {
									alert(Common.getAlertMsg(result_code));
									location.href = "/common/login_form.do";
								}else {
									alert(Common.getAlertMsg("201"));
								}
							}else {
								//json data not exist
								alert(Common.getAlertMsg("202"));
							}
						}					
						_this.file.list.btn();
						$("#loadingLayer").hide();
					}});
				},
				btn : function(){
					var _this = this.top();
					$("#template_list2 tbody .talk_box").unbind("click").click(function(){
						var code = $(this).attr("code");
						var uuid = Common.XSSfilter($(this).attr("uuid"));
						var task_id = $(this).attr("task_id");
						var task_name = Common.XSSfilter($(this).attr("task_name"));
						var template_name =  $(this).attr("template_name");
						var template_content = Common.XSSfilter($("div[name='template_content']",$(this).parent()).html());
						var sender_key = $("#template_list1 .talk_box").attr("sender_key");
						var sender_key_type = $("#template_list1 .talk_box").attr("sender_key_type");
						var param = {code:code,uuid:uuid,task_id:task_id,task_name:task_name,template_name:template_name,template_content:template_content,sender_key:sender_key,sender_key_type:sender_key_type}; 
						_this.file.send.init(param);
						$("#kakaoSendBox3").hide();
						$("#kakaoSendBox4").show();
					});
				},
				search : {
					top : function() {
						return _main;
					},
					get : function(START, type) 
					{
						var _this = this.top();
						//search field set
						var json = "";
						json = Common.getInputTagToJson($("#kakaoSendBox3"));
						//임시조치
						_this.file.list.pJson = json;
						console.log("====================");
						console.log(_IBJson.encode(json));
						console.log("====================");
						var param = $.extend({procType:"getTemplateList"}, json);
						console.log("_this.file.list.pJson : " + _this.file.list.pJson);
						var param = $.extend({procType:"getTemplateList", START:START,COUNT:_this.file.list.vertical_count}, json);
						if(START == 0) _this.file.list.current_page = 1;
						_this.file.list.get(param);
					}
				}
			},
			send : {
				id_name : "kakaoSendBox4",
				id : "",
				top : function() {
					return _main;
				},
				init : function(param){
					var _this = this.top();
					_this.file.send.id = $("#"+_this.file.send.id_name);
					this.init_content(param);
					// 분류선택 init
					this.sendPurposeInit();
					// 그룹 init
					this.groupInit();
					// 내저장 메시지, 템플릿 init
					this.btn();
				},
				init_content : function(param){
					console.log(param);
					var _this = this.top();
					var code = param.code;
					var uuid = param.uuid;
					var task_id = param.task_id;
					var task_name = param.task_name;
					var sender_key = param.sender_key;
					var sender_key_type = param.sender_key_type;
					var template_name = param.template_name;
					var template_content = _IBCommon.convert_html(param.template_content);
					$("#flip span[name='uuid']",_this.file.send.id).html(uuid);
					$("#panel span[name='task_name']",_this.file.send.id).html(task_name);
					$("#panel span[name='template_name']",_this.file.send.id).html(template_name);
					$("#panel span[name='code']",_this.file.send.id).html(code);
					$("#template_content",_this.file.send.id).html(template_content);
					$("#panel input[name='sender_key']",_this.file.send.id).html(sender_key);
					$("#panel input[name='sender_key_type']",_this.file.send.id).html(sender_key_type);
				},
				upload : function(){
					console.log('upload');
					var _this = this.top();
					var formOptions = {
							url : "/file/excelFile.do",
							dataType :  "text",
							iframe:true,
							beforeSubmit : function(){
								var file = $("#excelFrm [type='file']").val();
								console.log("file : " + file);
								var fileExt = file.slice(file.lastIndexOf(".") + 1).toLowerCase();
								if(file == ""){
									alert("파일을 선택 하세요.");
									//_this.loadingHide();
									return false;
								}
								
								if(fileExt != "xls" && fileExt != "xlsx"){
									alert("excel 파일만 가능합니다.");
									//_this.loadingHide();
									return false;
								}
							},
							success : function(_data) {
								var json = JSON.parse(_data);
								var data = json.data;
								$("#file_input","#kakaoSendBox4").val("");
								$("input[type='file']","#excelFrm").val("");
								console.log(data);
								for(var i=0;i<data.length;i++) {
									var obj = data[i];
									if(obj.status == "100"){
										console.log("excel upload");
										//getFileData
										var filePath = Common.XSSfilter(obj.filePath+obj.fileName);
										var param = {procType:"getFileData", filePath:filePath};
										$.ajax({url : Common.DEFAULT_PATH+"notitalk.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
											var json = _IBJson.decode(_data);
											if(json) {
												if(json.data) {
													var data = json.data;
													var result_code = data.resultCode;
													if(result_code == "1000") {
														if(data.listData.length > 0){
															var file_cnt = data.listData.length;
															_this.val.sendList.bulk = {};	// 전송정보 초기화
															var template_code = $("#panel span[name='code']","#kakaoSendBox4").html();
															var variable = _this.val.template_contents2[template_code].variable;
															console.log('template_code : ' + template_code);
															var title = ['No','휴대폰 번호','이름'];
															if(!_IBCommon.is_null(variable)){
																//title = $.merge(title, variable);
																for(var j=0;j<variable.length;j++){
																	console.log(variable[j]);
																	$("thead tr","#modal2").append("<th>"+variable[j]+"</th>");
																}
															}
															$("tbody tr","#modal2").remove();
															$("#modal2 span[name='file_cnt']").html(_IBCommon.format_number(file_cnt));
															var maxLength = 10;
															if(data.listData.length<10 ){
																maxLength = data.listData.length;
															}
															for(var i=0;i<data.listData.length;i++) {
																var obj = data.listData[i];
																
																var name =  Common.XSSfilter(obj.name);
																var mobile =  _IBCommon.format_phone(obj.mobile);
																var val1 =  Common.XSSfilter(obj.val1);
																var val2 =  Common.XSSfilter(obj.val2);
																var val3 =  Common.XSSfilter(obj.val3);
																var val4 =  Common.XSSfilter(obj.val4);
																var val5 =  Common.XSSfilter(obj.val5);
																_this.val.sendList.bulk[mobile] = {person_name:name, person_mobile:mobile, val1:val1, val2:val2, val3:val3, val4:val4, val5:val5};
																if(i<maxLength){
																	$("#modal2 tbody").append('<tr><td name="no"></td><td name="mobile"></td><td name="name"></td></tr>');
																	var tr = $("#modal2 tbody tr:last");

																	$("#modal2 tbody tr:last td[name='no']").html(i+1);
																	$("#modal2 tbody tr:last td[name='name']").html(name);
																	$("#modal2 tbody tr:last td[name='mobile']").html(mobile);
																	if(!_IBCommon.is_null(variable)){
																		//title = $.merge(title, variable);
																		for(var j=0;j<variable.length;j++){
																			if(j==0)	$("#modal2 tbody tr:last").append("<td>"+val1+"</td>");
																			if(j==1)	$("#modal2 tbody tr:last").append("<td>"+val2+"</td>");
																			if(j==2)	$("#modal2 tbody tr:last").append("<td>"+val3+"</td>");
																			if(j==3)	$("#modal2 tbody tr:last").append("<td>"+val4+"</td>");
																			if(j==4)	$("#modal2 tbody tr:last").append("<td>"+val5+"</td>");
																		}
																	}																
																}
															}
															$("#excelView").click();	
														}else{
															alert('유효한 휴대폰 번호가 없습니다.');
														}
													}
												}else if(result_code == "8000") {
													alert(Common.getAlertMsg(result_code));
													location.href = "/common/loginForm.do";
												}else {
													alert(Common.getAlertMsg("201"));
												}
											}else {
												//json data not exist
												alert(Common.getAlertMsg("202"));
											}
										}});
									}else if(obj.status == "200"){
										alert("파일 크기를 확인해 주세요");
										return false;																		
									}else if(obj.status == "300"){
										alert("파일 속성을 확인해 주세요");
										return false;													
									}
								}									
							},
							complete:function(){
								//_this.loadingHide();
							},
							error: function (request, status, error) {
			                }
						};
					
					$("#excelFrm").ajaxForm(formOptions).submit();
				},
				btn : function(){
					var _this = this.top();
					$("#flip span[name='detail_open']",_this.file.send.id).unbind("click").click(function(){
						$("#flip span[name='detail_close']",_this.file.send.id).show();
						$("#flip span[name='detail_open']",_this.file.send.id).hide();
						$("#panel",_this.file.send.id).show();
						console.log();
					});
					$("#flip span[name='detail_close']",_this.file.send.id).unbind("click").click(function(){
						$("#flip span[name='detail_open']",_this.file.send.id).show();
						$("#flip span[name='detail_close']",_this.file.send.id).hide();
						$("#panel",_this.file.send.id).hide();
					});
					$("#backBtn",_this.file.send.id).unbind("click").click(function(){
						$("#flip span[name='uuid']",_this.file.send.id).html("");
						$("#panel span[name='task_name']",_this.file.send.id).html("");
						$("#panel span[name='template_name']",_this.file.send.id).html("");
						$("#panel span[name='code']",_this.file.send.id).html("");
						$("#template_content",_this.file.send.id).html("");
						$("#panel input[name='sender_key']",_this.file.send.id).html("");
						$("#panel input[name='sender_key_type']",_this.file.send.id).html("");
						_this.send_val = {};
						$("#kakaoSendBox3").show();
						$("#kakaoSendBox4").hide();
					});
					$("#reservCheck",_this.file.send.id).unbind("click").click(function(e) {
						console.log("checkbox");
						_this.file.send.getDate();
					});										
					$("#reservBtn",_this.file.send.id).unbind("click").click(function(e) {
						_this.file.send.getDate();
					});
					$("#apDivCalendar .CalendarCancel").unbind("click").click(function(e){
						console.log('닫기');
						$("#apDivCalendar").hide();
						$("#reservCheck").prop('checked',false);
						$(".GrayBoxArea label[name='reservTime']").html("");
						_this.val.date_client_req = "";
						$("#modal6 span[name='reservType']").html("즉시 발송");
						$("#modal6 span[name='reservTxt']").hide();
						$(".GrayBoxArea label[name='reservTime']").hide();
					});
					$("#apDivCalendar .CalendarConfirm").unbind("click").click(function(e){
						var reservDate = $("#reserveDate").val();
						var hours = $("#apDivCalendar select[name='hours']").val();
						var minutes = $("#apDivCalendar select[name='minutes']").val();
						$("#reservCheck").prop('checked',true);
						if(reservDate == ""){
							var Now = new Date();
							var yyyy = Now.getFullYear();
							var mm = "0" + (parseInt(Now.getMonth()) + 1);
							var dd = "0" + Now.getDate();
							mm = mm.substr(mm.length-2,2);
							dd = dd.substr(dd.length-2,2);
							reservDate = yyyy + "." + mm + "." + dd;
						}
						$(".GrayBoxArea label[name='reservTime']").html(reservDate + " " + hours + ":" + minutes);
						_this.val.date_client_req = reservDate + " " + hours + ":" + minutes;
						$("#modal6 span[name='reservType']").html("예약 발송");
						$("#modal6 span[name='reservTxt']").html("예약시간 : "+_this.val.date_client_req + "</br>");
						$("#modal6 span[name='reservTxt']").show();
						$(".GrayBoxArea label[name='reservTime']").show();
						$("#apDivCalendar").hide();
					});
					$("#excelFrm input[name='file']").unbind("change").change(function(e) {
						console.log("file");
						$("#excelFrm input[name='mmsfile']").val($(this).val());
					});

					$("#excelBtn").unbind("click").click(function(e) {
						_this.file.send.upload();
					});
					$("#kakaoSendBox4 #downBtn").unbind("click").click(function(){
						var group_id = $("#kakaoSendBox4 select[name='groupList']").val();
						var template_code = $("#panel span[name='code']","#kakaoSendBox4").html();
						var variable = _this.val.template_contents2[template_code].variable;
						console.log('group_id : ' + group_id);
						console.log('template_code : ' + template_code);

						var fileName = 'notiTalkList';
						var title = ['No','휴대폰 번호','이름'];
						if(!_IBCommon.is_null(variable)){
							title = $.merge(title, variable);
						}
						var param = {"downType":"notitalk_excel",fileName:fileName, title:title, group_id:group_id};

						console.log('variable : ' + _IBJson.encode(variable));
						console.log('title : ' + _IBJson.encode(title));
						console.log('title : ' + _IBJson.encode(param));
						$("#send_form_div").remove();
						$("body").append('<div id="send_form_div"><form name="send_form" id="send_form" method="post" action="/download.do"><input type="hidden" name="jsonBody" id="jsonBody" value="" /></form></div>');
						$("#jsonBody").val(_IBJson.encode(param));
						document.send_form.action="/download.do";
						document.send_form.submit();
					});
				},
				getDate : function(){
					$("#apDivCalendar").show();
					var curDate = new Date();
					var selDate = "";
					$("#reserveCalendar").datepicker({
					    dateFormat: 'yy.mm.dd',
					    prevText: '이전 달',
					    nextText: '다음 달',
					    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
					    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
					    dayNames: ['일','월','화','수','목','금','토'],
					    dayNamesShort: ['일','월','화','수','목','금','토'],
					    dayNamesMin: ['일','월','화','수','목','금','토'],
					    showMonthAfterYear: true,
					    yearSuffix: '년',
					    minDate: curDate,
						maxDate: "6m",
						onSelect : function(selectedDate){
							var date = selectedDate.split(".");
							var year = date[0]; 
							var month = date[1]; 
							var day = date[2];
							$("#reserveDate").val(selectedDate);
						}
					});
				},
				groupInit : function(){
					var _this = this.top();

					var param = {procType:"getGroupList"};
					$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								if(result_code == "1000") {
									console.log(data);
									var address_cnt = _IBCommon.format_number(data.addressCnt);
									var group_name = "";
									var group_id = "";
									$("select[name='groupList']","#kakaoSendBox4").append("<option value='0'>전체("+address_cnt+")</option>");
									for(var i=0;i<data.listData.length;i++) {
										var obj = data.listData[i];
										$("select[name='groupList']","#kakaoSendBox4").append("<option value='"+obj.group_id+"'>"+Common.XSSfilter(obj.group_name)+"("+ _IBCommon.format_number(obj.cnt) +")</option>");
									}
								}else if(result_code == "8000") {
									alert(Common.getAlertMsg(result_code));
									location.href = "/common/loginForm.do";
								}else {
									alert(Common.getAlertMsg("201"));
								}
							}else {
								//json data not exist
								alert(Common.getAlertMsg("202"));
							}
						}
					}});					
				},
				sendPurposeInit : function(){
					var _this = this.top();
					var param = {procType:"getSendPurpose"};
					$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								if(result_code == "1000") {
									console.log(data);
									for(var i=0;i<data.listData.length;i++) {
										$("#sendPurpose",_this.file.send.id).append("<option value=''></option>");
										var obj = data.listData[i];
										var option_obj = $("#kakaoSendBox4 #sendPurpose option:last");
										purpose_name = Common.XSSfilter(obj.PURPOSE_NAME);
										purpose_code = obj.PURPOSE_CODE;
										option_obj.val(purpose_code)
										option_obj.text(purpose_name)
									}
								}else if(result_code == "8000") {
									alert(Common.getAlertMsg(result_code));
									location.href = "/common/loginForm.do";
								}else {
									alert(Common.getAlertMsg("201"));
								}
							}else {
								//json data not exist
								alert(Common.getAlertMsg("202"));
							}
						}
					}});
				}
			}
			
		}
	};
	