	$("document").ready(function() {
		_main.init();
	});
	
	var _main = {
			top : function() {
				return _main;
			}, 
			send_val : {},
			val : {
					sms_byte : 90
				,	sendListCnt : 0
				, 	lms_byte : 2000
				,	is_show_exceed_alert : "N"
				,	gubun : "sms"
				,	send_type : "personal"
				,	address_type : "addrBook"		//addrBook : 주소록, recent : 최근발신번호,  copyNPaste : 붙여넣기
				,	title : ""
				,	sms_contents : ""
				,	lms_contents : ""
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
			loadingShow : function(){
				//$("#loadingLayer .cont_mask").css("height",document.body.scrollHeight);
				//$("#loadingLayer").show();
			},
			loadingHide : function(){
				//$("#loadingLayer").hide();
			},
			show_exceed_alert : function(limit){
				var _this = this.top();
				if(_this.val.is_show_exceed_alert == "N"){
					alert("최대 "+limit+"까지 입력 가능합니다.");
					_this.val.is_show_exceed_alert = "Y";
				}
				setTimeout("_main.init_show_exceed_alert()",300);
			},
			init_show_exceed_alert : function(){
				var _this = this.top();
				_this.val.is_show_exceed_alert = "N";
			},			
			init : function() {
				var _this = this.top();
				 //beta.fix.js (key event 처리 )
				var keyFix = new beta.fix('sms_content');
				//var keyFix2 = new beta.fix('noti_title_all');
				//var keyFix3 = new beta.fix('fb_contents');
				// SMS LMS/MMS init
				_this.message.init();
				// 개별전송 init
				_this.sendList.init();
				_this.address.init();
				// 보내는사람선택 init
				_this.callbackInit();
				// 분류선택 init
				_this.sendPurposeInit();
				// 내저장 메시지, 템플릿 init
				_this.mybox.init();
				// 템플릿 메시지, 템플릿 init
				_this.template.init();
				
				_this.file_send.init();
				_this.btn();
			},
			btn : function(){
				var _this = this.top();										
				$("#reservCheck").unbind("click").click(function(e) {
					_this.getDate();
				});										
				$("#reservBtn").unbind("click").click(function(e) {
					_this.getDate();
				});
				$("#apDivCalendar .CalendarCancel").unbind("click").click(function(e){
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
				$("#modal4 li").unbind("click").click(function(){
					if(_this.val.gubun=="sms"){
						$('textarea[name="sms_content"]').insertAtCaret($(this).text(), "").change();
					}else{
						$('textarea[name="lms_content"]').insertAtCaret($(this).text(), "").change();						
					}
				});
				$("#modal5 input[name='chgBtn']").unbind("click").click(function(){
					if(_this.val.gubun=="sms"){
						$('textarea[name="sms_content"]').insertAtCaret("%CHANGEWORD%", "").change();
					}else{
						$('textarea[name="lms_content"]').insertAtCaret("%CHANGEWORD%", "").change();						
					}
					$("#modal5 .remodal-close").click();
				});
				$("#modal5 input[name='chgWord']").unbind("change").change(function(){
					_this.val.changeword = $(this).val();
				});
				$("#mtSendBtn").unbind("click").click(function(){
					if(_this.mtValidation()){
						$("#mtSendBtn2").click();						
					}
				});
				$("#modal6 .remodal-confirm").unbind("click").click(function(){
					$("#loadingLayer").show();
					var param = $.extend({procType:"mtsend"}, _this.send_val);
					return $.ajax({url : Common.DEFAULT_PATH+"mtsend.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								if(result_code == "1000"){
									alert('문자를 발송하였습니다.');
									window.location.reload();
									
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
				if(_this.val.gubun == "sms"){
					if(DoCheckLang(_this.val.sms_contents)){
						_this.send_val.gubun = _this.val.gubun;
						_this.send_val.contents = encodeURIComponent(_this.val.sms_contents);
						_this.send_val.subject = encodeURIComponent(_IBString.substring_byte_size(_this.val.sms_contents, 0, 20));
						_this.send_val.contents_file = "";						
					}else{
						return false;
					}
				}else{
					if(DoCheckLang(_this.val.lms_contents)){
						_this.send_val.gubun = _this.val.gubun;
						_this.send_val.contents = encodeURIComponent(_this.val.lms_contents);
						var subject = $("#lms_subject").val();
						//제목
						if(subject == ""){
							subject = _IBString.substring_byte_size(_this.val.lms_contents, 0, 20);
						}
						_this.send_val.subject = encodeURIComponent(subject);
						//첨부파일
						if(_IBCommon.check_type($("#mms_image img").attr("src")) == null){
							_this.send_val.gubun = "lms";
							_this.send_val.contents_file = "";
						}else{
							_this.send_val.gubun = "mms";
							_this.send_val.contents_file = encodeURIComponent($("#mms_image img").attr("src"));
						}					
					}else{
						return false;
					}
				}
				if(_this.send_val.subject == "0"){
					_this.send_val.subject = encodeURIComponent("제목없음");
				}
				if(_this.send_val.contents.length == 0 && _this.send_val.contents_file==""){
					_this.send_val = {};
					alert('내용을 입력해 주세요');
					return false;
				}
				//보내는 사람 체크
				_this.send_val.callback = $("#callbackList").val();
				if(_this.send_val.callback == ""){
					_this.send_val = {};
					alert('보내는 사람 번호를 선택해 주세요');
					$("#callbackList").focus();
					return false;
				}
				//분류선택
				_this.send_val.send_purpose = $("#sendPurpose").val();
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
					_this.send_val.group = _this.val.sendList.group;
					_this.send_val.person = _this.val.sendList.person;
				}else{									//대량파일 발송
					_this.send_val.send_type = "bulk";
					if(_IBJson.encode(_this.val.sendList.bulk) == "{}"){  //bulk 전송 체크 변경해야함 _this.val.sendlist.bulk
						_this.send_val = {};
						alert('받는사람을 입력해 주세요');
						return false;
					}
					_this.send_val.person = _this.val.sendList.bulk;
					_this.send_val.group = {};
					//첨부파일 확인
				}
				if(_this.val.date_client_req.length>0){//전송시간 체크...나중에
					
				}
				_this.send_val.date_client_req = _this.val.date_client_req;	
				_this.send_val.changeword = _this.val.changeword;	//전송시간
				return true;
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
			callbackInit : function(){
				var _this = this.top();
				var param = {procType:"getCallbackList"};
				$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
					var json = _IBJson.decode(_data);
					if(json) {
						if(json.data) {
							var data = json.data;
							var result_code = data.resultCode;
							if(result_code == "1000") {
								for(var i=0;i<data.listData.length;i++) {
									$("#callbackList").append("<option value=''></option>");
									var obj = data.listData[i];
									var option_obj = $("#callbackList option:last");
									callback = Common.XSSfilter(obj.CALLBACK);
									memo = obj.MEMO;
									option_obj.val(callback)
									option_obj.text(callback)
								}
								$("#callbackList").append("<option value=''></option>");
								option_obj = $("#callbackList option:last");
								callback = Common.XSSfilter($("#mobileNo").val());
								memo = "";
								option_obj.val(callback)
								option_obj.text(callback)
								$("#callbackList").append("<option value=''></option>");
								option_obj = $("#callbackList option:last");
								telNo = Common.XSSfilter($("#telNo").val());
								memo = "";
								option_obj.val(telNo)
								option_obj.text(telNo)
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
			file_send : {
				top : function() {
					return _main;
				},
				id : "",
				id_name : "modal2",
				tr : "",
				init : function() {
					var _this = this.top();
					_this.file_send.btn();
					_this.file_send.id = "#"+_this.file_send.id_name;
					_this.file_send.tr = $("tr:last",_this.file_send.id).clone();
					$("tbody tr:last",_this.file_send.id).remove();
				},
				btn : function(){
					var _this = this.top();
					$("#addressFile").unbind("change").change(function(e) {
						$("#file_input").val($(this).val());
					});
					$("#excelBtn").unbind("click").click(function(e) {
						_this.file_send.upload();
					});
					$("#excelSearchBtn").unbind("click").click(function(e){
						$("#imageFrm [type='file']").click();
					});
				},
				upload : function(){
					var _this = this.top();
					var formOptions = {
							url : "/file/excelFile.do",
							dataType :  "text",
							iframe:true,
							beforeSubmit : function(){
								var file = $("#imageFrm [type='file']").val();
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
								$("#file_input","#tab4").val("");
								$("input[type='file']","#imageFrm").val("");
								$("input[name='mmsfile']","#imageFrm").val("");
								for(var i=0;i<data.length;i++) {
									var obj = data[i];
									if(obj.status == "100"){
										//getFileData
										var filePath = Common.XSSfilter(obj.filePath+obj.fileName);
										var param = {procType:"getFileData", filePath:filePath};
										$("#loadingLayer").show();
										$.ajax({url : Common.DEFAULT_PATH+"mtsend.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
											var json = _IBJson.decode(_data);
											if(json) {
												if(json.data) {
													var data = json.data;
													var result_code = data.resultCode;
													if(result_code == "1000") {
														if(data.listData.length > 0){
															var file_cnt = data.listData.length;
															_this.val.sendList.bulk = {};	// 전송정보 초기화
															
															$("tbody tr",_this.file_send.id).remove();
															$("#modal2 span[name='file_cnt']").html(_IBCommon.format_number(file_cnt));
															var maxLength = 10;
															if(data.listData.length<10 ){
																maxLength = data.listData.length;
															}
															for(var i=0;i<data.listData.length;i++) {
																var obj = data.listData[i];
																
																var name =  Common.XSSfilter(obj.name);
																var mobile =  _IBCommon.format_phone(obj.mobile);
																var ac_no =  Common.XSSfilter(obj.ac_no);
																_this.val.sendList.bulk[mobile] = {person_name:name, person_mobile:mobile, ac_no:ac_no};
																if(i<maxLength){
																	$(_this.file_send.id+" tbody").append(_this.file_send.tr.clone());
																	var tr = $("tr:last",_this.file_send.id);

																	$("tr:last td[name='no']",_this.file_send.id).html(i+1);
																	$("tr:last td[name='name']",_this.file_send.id).html(name);
																	$("tr:last td[name='mobile']",_this.file_send.id).html(mobile);
																	$("tr:last td[name='ac_no']",_this.file_send.id).html(ac_no);																	
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
											$("#loadingLayer").hide();
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
					
					$("#imageFrm").ajaxForm(formOptions).submit();
				}
			},
			mybox : {
				top : function() {
					return _main;
				},
				init : function() {
					var _this = this.top();
					//_this.message.btn();
					_this.mybox.list.init();
					_this.mybox.search.btn();
					
				},
				search : {
					top : function() {
						return _main;
					},
					check : function() {
						var _this = this.top();
							
					},
					btn : function(){
						var _this = this.top();
						$("#tab5 input[name='service_type']").unbind("change").change(function(){
							_this.mybox.search.get(0);
						});
						$("#tab5 input[name='allCheck']").unbind("click").click(function(){
							if($("#tab5 input[name='allCheck']").prop('checked')== true){
								$("#myboxMsgList input[type='checkbox']").prop('checked',true);	
							}else{
								$("#myboxMsgList input[type='checkbox']").prop('checked',false);
							}
						});
						$("#tab5 #delBtn").unbind("click").click(function(){
							if($("#myboxMsgList input[type='checkbox']:checked").length>0){
								var check_id = "";
								for(var i=0;i<$("#myboxMsgList input[type='checkbox']:checked").length;i++){
									if(i!=0){
										check_id = check_id + ",";
									}
									check_id = check_id + $("#myboxMsgList input[type='checkbox']:checked").eq(i).attr("seq");
								}
								var param = {procType:"delMybox", seq:check_id};
								$.ajax({url : Common.DEFAULT_PATH+"mybox.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
									var json = _IBJson.decode(_data);
									if(json) {
										if(json.data) {
											var data = json.data;
											var result_code = data.resultCode;
											if(result_code == "1000") {
												alert('삭제 하였습니다.');
												_this.mybox.init();
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
							}else{
								alert('선택된 메시지가 없습니다.');
							}
						});
					},
					get : function(START) 
					{
						var _this = this.top();
						var _obj = this.top().mybox;
						//search field set
						var json = Common.getInputTagToJson($("#tab5 #service_type_area"));
						
						var param = $.extend({procType:"getMyboxList", START:START,COUNT:_obj.list.vertical_count}, json);
						if(START == 0) _this.mybox.list.current_page = 1;
						_this.mybox.list.get(param);
					}		
				},
				list : {
					top : function() {
						return _main;
					},
					id : "",
					id_name : "myboxMsgList",
					li : "",
					total_count : 0,
					current_page : 1,
					vertical_count : 4,
					horizon_count : 5,
					init : function() {
						var _this = this.top();
						var _obj = this.top().mybox;
						_obj.list.id = "#"+_obj.list.id_name;
						_obj.list.li = $("li:first",_obj.list.id).clone();
						$("li",_obj.list.id).remove();
						//parameter set
						var param = {procType:"getMyboxList",service_type:"ALL",category_id:"ALL", START:"0", COUNT:_obj.list.vertical_count};
						//list view 
						_obj.list.get(param);
					},
					get : function(param) {
						$("#loadingLayer").show();
						var _this = this.top();
						var _obj = this.top().mybox;
						_obj.list.json = param;
						_obj.list.total_count = 0;
						return $.ajax({url : Common.DEFAULT_PATH+"mybox.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
							var json = _IBJson.decode(_data);
							$("li",_obj.list.id).remove();
							if(json) {
								if(json.data) {
									var data = json.data;
									var result_code = data.resultCode;
									if(result_code == "1000") {		
										_obj.list.total_count = data.totalCnt;					
										if(data.listData.length > 0){	
											for(var i=0;i<data.listData.length;i++) {
												var obj = data.listData[i];
												
												$(_obj.list.id).append(_obj.list.li.clone());
												var li = $("li:last",_obj.list.id);
												
												var seq =  obj.seq;
												var msg_subject = " "+Common.XSSfilter(obj.subject);
												var msg_contents = obj.contents;
												var service_type = obj.service_type == "0" ? "SMS" : (obj.service_type == "2" ? "MMS" : "LMS");
												if(service_type == "SMS"){
													var msg_length = obj.length+"/90 byte";
												}else{
													var msg_length = obj.length+"/2000 byte";													
												}
												var file_path = obj.file_path1;
												$("li:last input[type='checkbox']",_obj.list.id).attr("seq", seq);
												$("li:last label",_obj.list.id).html(msg_subject);
												$("li:last textarea",_obj.list.id).html(msg_contents);
												$("li:last textarea",_obj.list.id).attr("service_type", service_type);
												$("li:last textarea",_obj.list.id).attr("subject", msg_subject);
												$("li:last p[name='msg_info']",_obj.list.id).html(service_type + "<span>"+msg_length+"</span>");
												if(file_path.length>0){
													$("li:last textarea",_obj.list.id).height("113px");
													$("li:last div img",_obj.list.id).attr("src",file_path);
													$("li:last div img",_obj.list.id).css({"width":"100%","padding-top":"16px"});
												}
											}
										}else{
											$(_obj.list.id).append("<li style='width:100%;height:50px;text-align:center;'>저장된 메시지가 없습니다.</li>");
										}
										_obj.list.total_count = data.totalCnt;
										
									}else if(result_code == "8000") {
										//alert(Common.getAlertMsg(result_code));
										//location.href = "/common/loginForm.do";
									}else {
										alert(Common.getAlertMsg("201"));
									}
								}else {
									//json data not exist
									alert(Common.getAlertMsg("202"));
								}
							}
							//paging
							if(_obj.list.total_count > 0) {
								Common.pagingDraw(_obj,"msgBoxPagingDiv");
								$("#msgBoxPagingDiv").show();
							}else {
								//$("tbody ",_obj.list.id).html("<tr><td colspan='3' style='text-align:center;'>데이터가 없습니다.</td></tr>");
								$("#msgBoxPagingDiv").hide();
							}
							_obj.list.btn();
							$("#loadingLayer").hide();
						}});
					},
					btn : function(){
						var _this = this.top();
						$("#myboxMsgList textarea").unbind("click").click(function(){
							var contents = $(this).html();
							var service_type = $(this).attr("service_type");
							var subject = $(this).attr("subject");
							var img_url = $("img",$(this).parent()).attr("src");
							if(service_type=="SMS"){
								//$('textarea[name="sms_content"]').insertAtCaret("%CHANGEWORD%", "").change();
								_main.val.gubun = "sms" ;
								$("#msgGubun li[rel='tab1']").click();
								$('textarea[name="sms_content"]').html(contents).change();
							}else if(service_type=="MMS"){
								//$('textarea[name="lms_content"]').insertAtCaret("%CHANGEWORD%", "").change();
								$('#lms_subject').val(subject);
								
								$("img","#mms_image").remove();
								$("#mms_image").append("<img>");
								$("img","#mms_image").attr("src",img_url);
								$("img","#mms_image").css("width","100%");
								//$("#fbImageLayer").hide();
								_this.message.editor.textAreaResize();
								//_this.val.fb_image = obj.fileInfo+""+obj.fileName;
								//_this.setting.failbackMt.setMtMsgType();
								$("#mms_image img").unbind("click").click(function(){
									if(confirm("이미지를 삭제 하시겠습니까?")){
										$(this).remove();
										$("#tab2 textarea[name='lms_content']").height('288px');
										//_this.val.fb_image = "";
										//$("#fb_fileName").val("");
										//_this.setting.failbackMt.setMtMsgType();
									}
								});
								$('textarea[name="lms_content"]').html(contents).change();
								$("#msgGubun li[rel='tab2']").click();
								_main.val.gubun = "mms"; 
							}else{
								$("img","#mms_image").remove();
								_main.val.gubun = "lms";
								$('#lms_subject').val(subject);
								$("#tab2 textarea[name='lms_content']").height('288px');
								$('textarea[name="lms_content"]').html(contents).change();
								$("#msgGubun li[rel='tab2']").click();
							}
						});
					}
				}
			},
			template : {
				top : function() {
					return _main;
				},
				init : function() {
					var _this = this.top();
					//_this.message.btn();
					_this.template.list.init();
					_this.template.search.btn();
					_this.template.getTaskCategoryList();
					
				},
				search : {
					top : function() {
						return _main;
					},
					check : function() {
						var _this = this.top();
							
					},
					btn : function(){
						var _this = this.top();
						$("#templet1 select[name='task_id']").unbind('change').change(function(){
							_this.template.list.search.get(0);
						});
					},
					get : function(START) 
					{
						var _this = this.top();
						var _obj = this.top().template;
						//search field set
						var json = Common.getInputTagToJson($("#tab6 #template_search_area"));
						
						var param = $.extend({procType:"getTemplateList", START:START,COUNT:_obj.list.vertical_count}, json);
						if(START == 0) _this.mybox.list.current_page = 1;
						_this.template.list.get(param);
					}		
				},
				getTaskCategoryList : function(uuid){
					var _this = this.top();
					var param = {procType:"getTaskCategoryList"};
					return $.ajax({url : Common.DEFAULT_PATH+"notitalk.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
						var json = _IBJson.decode(_data);
						if(json) {
							if(json.data) {
								var data = json.data;
								var result_code = data.resultCode;
								if(result_code == "1000"){
									if(data.listData.length > 0){
										for(var i=0;i<data.listData.length;i++) {
											var obj = data.listData[i];
											$("#templet1 select[name='task_id']").append("<option value='"+obj.task_id+"'>"+Common.XSSfilter(obj.task_name)+"</option>");
										}
									}else{
										//alert(Common.getAlertMsg("1001"));
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
				list : {
					top : function() {
						return _main;
					},
					search : {
						top : function() {
							return _main;
						},
						get : function(START) 
						{
							var _this = this.top();
							var _obj = _this.template.list;
							//search field set
							var json = Common.getInputTagToJson($("#tab6 #template_search_area"));
							var param = $.extend({procType:"getTemplateList", START:START,COUNT:_this.template.list.vertical_count}, json);
							if(START == 0) _this.template.list.current_page = 1;
							_this.template.list.get(param);
						}						
					},
					id : "",
					id_name : "templateList",
					li : "",
					total_count : 0,
					current_page : 1,
					vertical_count : 4,
					horizon_count : 5,
					init : function() {
						var _this = this.top();
						var _obj = this.top().template;
						_obj.list.id = "#"+_obj.list.id_name;
						_obj.list.li = $("li:first",_obj.list.id).clone();
						$("li",_obj.list.id).remove();
						//parameter set
						var param = {procType:"getTemplateList",service_type:"ALL",category_id:"ALL", START:"0", COUNT:_obj.list.vertical_count};
						//list view 
						_obj.list.get(param);
					},
					get : function(param) {
						$("#loadingLayer").show();
						var _this = this.top();
						var _obj = this.top().template;
						_obj.list.json = param;
						_obj.list.total_count = 0;
						return $.ajax({url : Common.DEFAULT_PATH+"notitalk.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
							var json = _IBJson.decode(_data);
							$("li",_obj.list.id).remove();
							if(json) {
								if(json.data) {
									var data = json.data;
									var result_code = data.resultCode;
									if(result_code == "1000") {		
										_obj.list.total_count = data.totalCnt;	
										if(data.listData.length > 0){	
											for(var i=0;i<data.listData.length;i++) {
												var obj = data.listData[i];
												$(_obj.list.id).append(_obj.list.li.clone());
												var li = $("li:last",_obj.list.id);
												
												var seq =  obj.seq;
												var msg_subject = " "+Common.XSSfilter(obj.template_name);
												var msg_contents = obj.template_contents;
												//var service_type = obj.service_type == "0" ? "SMS" : (obj.service_type == "2" ? "MMS" : "LMS");
												var msg_length = _IBString.check_byte_size(msg_contents);
												if(msg_length <=90){
													var service_type = "SMS";
												}else{
													var service_type = "LMS";
												}
												var file_path = obj.file_path1;
												$("li:last label",_obj.list.id).html(msg_subject);
												$("li:last textarea",_obj.list.id).html(msg_contents);
												$("li:last textarea",_obj.list.id).attr("service_type", service_type);
												$("li:last textarea",_obj.list.id).attr("subject", msg_subject);
												$("li:last p[name='msg_info']",_obj.list.id).html(service_type + "<span>"+msg_length+"</span>");
											}
										}else{
											$(_obj.list.id).append("<li style='width:100%;height:50px;text-align:center;'>저장된 메시지가 없습니다.</li>");
										}
										_obj.list.total_count = data.totalCnt;
										
									}else if(result_code == "8000") {
									}else {
										alert(Common.getAlertMsg("201"));
									}
								}else {
									//json data not exist
									alert(Common.getAlertMsg("202"));
								}
							}
							//paging
							if(_obj.list.total_count > 0) {
								Common.pagingLayerDraw(_this.template.list,"templatePagingDiv");
								//Common.pagingLayerDraw(_this.file.list,"pagingLayerDiv");
								$("#templatePagingDiv").show();
							}else {
								//$("tbody ",_obj.list.id).html("<tr><td colspan='3' style='text-align:center;'>데이터가 없습니다.</td></tr>");
								$("#templatePagingDiv").hide();
							}
							_obj.list.btn();
							$("#loadingLayer").hide();
						}});
					},
					btn : function(){
						var _this = this.top();
						$("#templateList textarea").unbind("click").click(function(){
							var contents = $(this).html();
							var service_type = $(this).attr("service_type");
							var subject = $(this).attr("subject");
							var img_url = $("img",$(this).parent()).attr("src");
							if(service_type=="SMS"){
								//$('textarea[name="sms_content"]').insertAtCaret("%CHANGEWORD%", "").change();
								_main.val.gubun = "sms" ;
								$("#msgGubun li[rel='tab1']").click();
								$('textarea[name="sms_content"]').html(contents).change();
							}else if(service_type=="MMS"){
								//$('textarea[name="lms_content"]').insertAtCaret("%CHANGEWORD%", "").change();
								$('#lms_subject').val(subject);
								
								$("img","#mms_image").remove();
								$("#mms_image").append("<img>");
								$("img","#mms_image").attr("src",img_url);
								$("img","#mms_image").css("width","100%");
								//$("#fbImageLayer").hide();
								_this.message.editor.textAreaResize();
								//_this.val.fb_image = obj.fileInfo+""+obj.fileName;
								//_this.setting.failbackMt.setMtMsgType();
								$("#mms_image img").unbind("click").click(function(){
									if(confirm("이미지를 삭제 하시겠습니까?")){
										$(this).remove();
										$("#tab2 textarea[name='lms_content']").height('288px');
										//_this.val.fb_image = "";
										//$("#fb_fileName").val("");
										//_this.setting.failbackMt.setMtMsgType();
									}
								});
								$('textarea[name="lms_content"]').html(contents).change();
								$("#msgGubun li[rel='tab2']").click();
								_main.val.gubun = "mms"; 
							}else{
								$("img","#mms_image").remove();
								_main.val.gubun = "lms";
								$('#lms_subject').val(subject);
								$("#tab2 textarea[name='lms_content']").height('288px');
								$('textarea[name="lms_content"]').html(contents).change();
								$("#msgGubun li[rel='tab2']").click();
							}
						});
					}
				}
			},
			message : {
				top : function() {
					return _main;
				},				
				init : function(){
					var _this = this.top();
					_this.message.btn();
					_this.message.editor.init();
				},
				btn : function(){
					var _this = this.top();	
					$("#selectAddress input[name='addrTap']").unbind("click").click(function(e) {
						$("#sendAdd1").hide();
						$("#sendAdd2").hide();
						$("#sendAdd3").hide();
						var selectedTab = $(this).val();
						$("#" + selectedTab).show();
						_this.address.addrTab(selectedTab);
					});
					$("#addBtn").unbind("click").click(function(e) {
						if(_this.val.address_type == "recent"){
							_this.sendList.addRecent();
						}else if(_this.val.address_type == "copyNPaste"){
							_this.sendList.addCopyNPaste();
						}else{
							_this.sendList.addAddrBook();
						}
					});
				},
				editor : {
					top : function() {
						return _main;
					},				
					init : function(){
						var _this = this.top();
						_this.message.editor.btn();
					},	
					resetVal : function(){
						
						if(confirm("입력된 메시지가 모두 지워집니다.")){
							if(_main.val.gubun == "sms"){
								//$("input[name='contents_title']").val("").change();	//제목	
								$('textarea[name="sms_content"]').val("").change();		//내용
							}else{	
								$('textarea[name="lms_content"]').val("").change();
								$('#lms_subject').val("");
								$("#mms_image img").remove();
								$("#tab2 textarea[name='lms_content']").height('288px');
							}
						}							
					},
					textAreaResize : function(){
						//work
						var _this = this.top();
						//SMS 전송창 이라면 LMS/MMS 전송창으로 조정
						if(_this.val.gubun == "sms"){
							$("#msgGubun li[rel='tab2']").click();
							var sms_content = $("#tab1 textarea[name='sms_content']").val();
							$("#tab2 textarea[name='lms_content']").val(sms_content);
							_main.message.editor.calcContLen();
						}
						_this.val.gubun == "mms";
						$("#tab2 textarea[name='lms_content']").height('35%');
						$("#tab2 textarea[name='lms_content']").scrollTop($("#tab2 textarea[name='lms_content']").scrollHeight);
					},
					upload : function(){
						var _this = this.top();
						var formOptions = {
								url : "/file/mmsImage.do",
								dataType :  "text",
								iframe:true,
								beforeSubmit : function(){
									var file = $("input[type='file']","#imageFrm").val();
									var fileExt = file.slice(file.lastIndexOf(".") + 1).toLowerCase();
									
									if(file == ""){
										alert("파일을 선택 하세요.");
										//_this.loadingHide();
										return false;
									}									
									if(fileExt != "jpg" && fileExt != "jpeg"){
										alert("파일은 jpg, jpeg만 가능합니다.");
										//_this.loadingHide();
										//return false;
									}
								},
								success : function(_data) {
									var json = JSON.parse(_data);
									var data = json.data;
									$("input[type='file']","#imageFrm").val("");
									$("input[name='mmsfile']","#imageFrm").val("");
									
									for(var i=0;i<data.length;i++) {
										var obj = data[i];
										if(obj.status == "100"){
											var imgSrc = "/resources/upload/mms/send"+obj.fileInfo+""+obj.fileName;
											//var imgSrc = "/resources/upload/mms/send/"+obj.fileInfo+""+"1526276855332.jpg";	//임시
											$("img","#mms_image").remove();
											$("#mms_image").append("<img>");
											$("img","#mms_image").attr("src",imgSrc);
											$("img","#mms_image").css("width","100%");
											//$("#fbImageLayer").hide();
											_this.message.editor.textAreaResize();
											//_this.val.fb_image = obj.fileInfo+""+obj.fileName;
											//_this.setting.failbackMt.setMtMsgType();
											$("#mms_image img").unbind("click").click(function(){
												if(confirm("이미지를 삭제 하시겠습니까?")){
													$(this).remove();
													$("#tab2 textarea[name='lms_content']").height('288px');
													//_this.val.fb_image = "";
													//$("#fb_fileName").val("");
													//_this.setting.failbackMt.setMtMsgType();
												}
											});
											
										}else if(obj.status == "200"){
											alert("이미지 파일 크기를 확인해 주세요");
											return false;																		
										}else if(obj.status == "300"){
											alert("이미지 파일 속성을 확인해 주세요");
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
						
						$("#imageFrm").ajaxForm(formOptions).submit();	
					},
					calcContLen : function(){
						var _this = this.top();
						if(_main.val.gubun == "lms"){
							var cont_obj = $('textarea[name="lms_content"]');
							var byte_obj = $("#tab2 .smsArea li span");
						}else{
							var cont_obj = $('textarea[name="sms_content"]');
							var byte_obj = $("#tab1 .smsArea li span");
						}
						
						//noti byte 계산
						var byte = _IBString.check_byte_size(cont_obj.val());
						var limit = _main.val.gubun == "lms" ? _main.val.lms_byte : _main.val.sms_byte;
						
						if(limit < byte){								
							_this.val.temp = _IBString.substring_byte_size(cont_obj.val(), 0, limit); 
								
							var result = Common.byteCheck(cont_obj, limit);	
							
							if(result == false){
								cont_obj.val(_this.val.temp).change();
								$(this).focus();
							}
						}
						//if(cont_title_obj.attr('placeholder') === cont_title_obj.val()){
						//	cont_title_obj.val('');
						//}
						if(cont_obj.attr('placeholder') === cont_obj.val()){
							cont_obj.val('');
						}
						byte = _IBString.check_byte_size(cont_obj.val());
						
						byte_obj.html(_.template('<%=byte%>/<%=limit%>byte')({byte:byte,limit:limit}));
					},
					saveMsgBox : function(gubun){
						var _this = this.top();
						if(gubun == "sms"){
							var cont_obj = $('textarea[name="sms_content"]');
							var service_type = "0";
							var subject = _IBString.substring_byte_size(cont_obj.val(), 0, 20); 
							var contents = cont_obj.val();
							var length = _IBString.check_byte_size(cont_obj.val());
							var category_id = "0";
							var file_path1 = "";
						}else{
							//이미지가 있으면 service_type = "2" 없으면 "3"
							var cont_obj = $('textarea[name="lms_content"]');
							if(_IBCommon.check_type($("#mms_image img").attr("src")) == null){
								//LMS
								var service_type = "3";
								var file_path1 = "";
							}else{
								var service_type = "2";
								var file_path1 = encodeURIComponent($("#mms_image img").attr("src"));
							}
							var subject = $("#lms_subject").val();
							if(subject == ""){
								subject = _IBString.substring_byte_size(cont_obj.val(), 0, 20); 
							}
							var contents = cont_obj.val();
							var length = _IBString.check_byte_size(cont_obj.val());
							var category_id = "0";
						}
						if(subject.length==0){
							subject = "제목없음";
						}
						subject = encodeURIComponent(subject);
						contents = encodeURIComponent(contents);
						
						if(length==0 && file_path1==""){
							alert("메시지를 입력해 주세요");
						}else{
							//저장
							/*
							 * 
						String service_type = JsonUtil.getJsonObjectValue(reqJson, "service_type");
						String subject = JsonUtil.getJsonObjectValue(reqJson, "subject");
						String contents = JsonUtil.getJsonObjectValue(reqJson, "contents");
						String length = JsonUtil.getJsonObjectValue(reqJson, "length");
						String category_id = JsonUtil.getJsonObjectValue(reqJson, "category_id");
						String file_path1 = JsonUtil.getJsonObjectValue(reqJson, "file_path1");
							 * */
							var param = {procType:"insertMybox", service_type:service_type, subject:subject, contents:contents, length:length, category_id:category_id, file_path1:file_path1};
							$.ajax({url : Common.DEFAULT_PATH+"mybox.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
								var json = _IBJson.decode(_data);
								if(json) {
									if(json.data) {
										var data = json.data;
										var result_code = data.resultCode;
										if(result_code == "1000") {
											alert('저장 되었습니다.');
											_this.mybox.init();
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
						}
					},
					btn : function(){
						var _this = this.top();
						$(document).on("click","#msgGubun li", function(e)	{
							//gubun값 변경
							$(this).attr("rel") == "tab2" ? _main.val.gubun = "lms" : _main.val.gubun = "sms" ;
							//_main.val.gubun 값 설정
						});
						$(document).on("click","#tab1 #imgBtn", function(e) {
							e.preventDefault();
							$("input[type='file']","#imageFrm").val("");
							$("input[name='mmsfile']","#imageFrm").val("");
							
							//$('textarea[name="contents"]').insertAtCaret('%CHANGEWORD%','').change();
						});
						//LMS 버튼
						$(document).on("click","#tab2 #imgBtn", function(e) {
							e.preventDefault();
							$("input[type='file']","#imageFrm").val("");
							$("input[name='mmsfile']","#imageFrm").val("");
							
							//$('textarea[name="contents"]').insertAtCaret('%CHANGEWORD%','').change();
						});
						//SMS 버튼
						$(document).on("click","#tab1 #spclBtn", function(e) {
							e.preventDefault();
							//$('textarea[name="contents"]').insertAtCaret('%CHANGEWORD%','').change();
						});
						$(document).on("click","#tab1 #chgBtn", function(e) {
							e.preventDefault();
							//$('textarea[name="contents"]').insertAtCaret('%CHANGEWORD%','').change();
						});
						$(document).on("click","#tab1 #msgSavBtn", function(e) {
							e.preventDefault();
							_this.message.editor.saveMsgBox("sms");
						});
						$(document).on("click","#tab1 #resetBtn", function(e) {
							e.preventDefault();
							_this.message.editor.resetVal();
						});
						//연결정보 컨텐츠에 change이벤트 발생시, 모델에 텍스트를 보고함
						$('textarea[name="sms_content"]').on('change', function(){
							_main.val.sms_contents = $(this).val();
							_main.message.editor.calcContLen();
						}).on('blur', function(){
							_main.message.editor.calcContLen();
						}).on('keyup', function(){
							_main.message.editor.calcContLen();
						});
						$(document).on("click","#tab2 #spclBtn", function(e) {
							e.preventDefault();
							//$('textarea[name="contents"]').insertAtCaret('%CHANGEWORD%','').change();
						});
						$(document).on("click","#tab2 #chgBtn", function(e) {
							e.preventDefault();
							//$('textarea[name="contents"]').insertAtCaret('%CHANGEWORD%','').change();
						});
						$(document).on("click","#tab2 #msgSavBtn", function(e) {
							e.preventDefault();
							_this.message.editor.saveMsgBox("lms");
						});
						$(document).on("click","#tab2 #resetBtn", function(e) {
							e.preventDefault();
							_this.message.editor.resetVal();
						});
						$('textarea[name="lms_content"]').on('change', function(){
							_main.val.lms_contents = $(this).val();
							_main.message.editor.calcContLen();
						}).on('blur', function(){
							_main.message.editor.calcContLen();
						}).on('keyup', function(){
							_main.message.editor.calcContLen();
						});
						$("#imageFrm input[name='file']").on('change', function(){
							var mmsFileName = $("#imageFrm input[name='file']").val();
							$("#imageFrm input[name='mmsfile']").val(mmsFileName);
							$("#file_input").val(mmsFileName);
						});
						$("#imageInsertBtn").unbind("click").click(function(){
							_this.message.editor.upload();
							$("#imageCancelBtn").click();
						});
					}
				}
			},
			sendList : {
				send_list_obj : "",
				send_list_empty_obj : "",
				top : function() {
					return _main;
				},
				init : function(){
					var _this = this.top();
					_this.sendList.send_list_obj = $("#sendList tbody tr:first").clone();
					_this.sendList.send_list_empty_obj = $("#sendList tbody tr:last").clone();
					_this.sendList.btn();
				},	
				btn : function(){
					var _this = this.top();
					$(document).on("click","#tabs2 .tabmenu li", function(e)	{
						//gubun값 변경
						$(this).attr("rel") == "tab4" ? _main.val.send_type = "bulk" : _main.val.send_type = "personal" ;
						if(_main.val.send_type == "bulk"){
							$("#tab4 #file_input").val("");
							$("input[type='file']","#imageFrm").val("");
						}
					});
					$(document).on("click","#sendList tbody tr span[name='delBtn']", function(e)	{
						var del_obj = $(this).parent().parent();
						var kind = del_obj.attr("kind");
						var del_cnt = 1;
						if(kind == "group"){
							del_cnt = del_obj.attr("cnt");
							var group_id = del_obj.attr("group_id");
							delete _this.val.sendList.group[group_id];
						}else if(kind == "copyNPaste"){
							del_cnt = del_obj.attr("cnt");	
							delete _this.val.sendList.person[person_mobile];				
						}else{
							var person_mobile = del_obj.attr("person_mobile");
							delete _this.val.sendList.person[person_mobile];
						}
						del_obj.remove();
						if($("#sendList tbody tr").length < 10){
							$("#sendList tbody").append(_this.sendList.send_list_empty_obj.clone());							
						}
						_this.val.sendListCnt--;
						_this.val.sendCnt = _this.val.sendCnt - del_cnt;
						$("#sendArea span[name='sendCnt']").html(_this.val.sendCnt);
					});
					$(document).on("click","#sendArea span[name='delSendListBtn'] a", function(e){
						_this.sendList.sendListClear();
					});
					$(document).on("click","#sendAdd3 span[name='delBtn'] a", function(e){
						$("#copyNPasteArea").val("");
					});
				},
				sendListClear : function(){
					var _this = this.top();
					$("#sendList tbody tr").remove();
					for(var i=0;i<10;i++){
						$("#sendList tbody").append(_this.sendList.send_list_obj.clone());							
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
						var NowTime = Now.getFullYear();
						NowTime += '-' + Now.getMonth() + 1 ;
						NowTime += '-' + Now.getDate();
						NowTime += ' ' + Now.getHours();
						NowTime += ':' + Now.getMinutes();
						NowTime += ':' + Now.getSeconds();
						if(mobile_cnt>0){
							mobile_arr = {name:"번호붙여넣기",cnt:mobile_cnt}
							_this.val.sendCnt = parseInt(_this.val.sendCnt) + parseInt(mobile_cnt);
							_this.sendList.add("copyNPaste",mobile_arr);
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
							_this.sendList.add("person",recentJson);							
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
						for(var i=0;i<$("#groupList input:checked").length;i++){
							var group_id = $("#groupList input:checked").eq(i).attr("group_id");
							var group_obj = $("#groupList input:checked").eq(i).parent();
							var group_name = $("span[name='group_name']",group_obj).html();
							var group_cnt = $("span[name='group_cnt']",group_obj).html();
							if(typeof(_this.val.sendList.group[group_id]) == "undefined"){	//그룹 중복 체크
								if(group_id == 0){			// 전체 그룹인경우
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
									if(typeof(_this.val.sendList.group[0])!="undefined"){
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
							_this.sendList.add("group",groupJson);							
						}
					}else if($("#personalList input:checked").length>0){

						var personJson = []; 
						var json_cnt = 0;
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
							_this.sendList.add("person",personJson);							
						}
					}else{
						alert('선택된 개인주소록이 없습니다.');
					}
					// 개인 checkbox 체크
				},
				add : function(sendGubun, json){
					var _this = this.top();
					//group, Json[group_id] = {group_id:group_id, group_name:group_name,group_cnt:group_cnt}
					//person, Json[mobile]{mobile:mobile, name:name}
					//그룹
					var jsonLen = json.length;
					if(sendGubun == "group"){
						if(json["0"].group_id=="0"){	//전체일경우 그룹주소록 모두 삭제
							var group_obj = $("#sendList tbody tr[kind='group']");
							var delCnt = group_obj.length;
							group_obj.remove();
							_this.val.sendListCnt=_this.val.sendListCnt-delCnt;	
							for(var i=_this.val.sendListCnt;i<delCnt;i++){
								$("#sendList tbody").append(_this.sendList.send_list_empty_obj.clone());								
							}
						}
						for(var i=0;i<jsonLen;i++){
							var group_id = json[i].group_id;
							var group_name = Common.XSSfilter(json[i].group_name);
							var group_cnt = _IBCommon.format_number(json[i].group_cnt);
							if(_this.val.sendListCnt>10){
								$("#sendList tbody").append(_this.sendList.send_list_obj.clone());
								var tr_obj = $("#sendList tbody tr:last");
							}else{
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
						//mobile_arr = {name:"번호붙여넣기",cnt:mobile_cnt}
						if(_this.val.sendListCnt>10){
							$("#sendList tbody").append(_this.sendList.send_list_obj.clone());
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
								$("#sendList tbody").append(_this.sendList.send_list_obj.clone());
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
					_this.address.group.init();
					_this.address.personal.init();
					_this.address.btn();
					_this.address.recent_list_obj = $("#recentList tbody tr:first").clone();
					_this.address.recent_list_empty_obj = $("#recentList tbody tr:last").clone();
					$("#recentList tbody tr").remove();
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
										for(var i=0;i<data.listData.length;i++) {
											$("#recentList tbody").append(_this.address.recent_list_obj.clone());
											var obj = data.listData[i];
											var tr = $("#recentList tbody tr:last");
											recent_name = Common.XSSfilter(obj.name);
											recent_name = recent_name == "" ? "고객" : recent_name;
											recent_mobile = _IBCommon.format_phone(" " + obj.recipient_num);
											$("input",tr).attr("seq", i);
											$("span[name='name']",tr).html(recent_name);
											$("span[name='mobile']",tr).html(recent_mobile);
											//$("span[name='address_name']","#personalList tbody tr:last").html(address_name);
											//$("span[name='address_mobile']","#personalList tbody tr:last").html(address_mobile);
											
										}
										if(data.listData.length < 10){
											for(var i=data.listData.length;i<10;i++) {
												$("#recentList tbody").append(_this.address.recent_list_empty_obj.clone());
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
						_this.address.group_list_obj = $("#groupList tbody tr:first").clone();
						_this.address.group_list_empty_obj = $("#groupList tbody tr:last").clone();
						_this.address.personal_list_obj = $("#personalList tbody tr:first").clone();
						_this.address.personal_list_empty_obj = $("#personalList tbody tr:last").clone();
						$("#groupList tbody tr").remove();
						_this.address.group.groupList(0);
					},	
					btn : function(){
						var _this = this.top();
						$(document).on("click","#groupList tbody tr", function(e)	{
							$("#groupList tbody tr").removeClass("on");
							$(this).addClass("on");
							var group_id = $("input",$(this)).attr("group_id");
							$("#searchArea input[name='group_id']").val(group_id);
							var json = {group_id:group_id};
							console.log("#loadingLayer");
							_this.address.personal.addressList(json);
						});
					},
					groupList : function(group_id){
						var _this = this.top();
						$("#loadingLayer").show();
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
										$("#groupList tbody").append(_this.address.group_list_obj.clone());
										$("#groupList tbody tr input").attr("group_id", "0");
										$("span[name='group_cnt']","#groupList tbody tr").html(address_cnt);
										$("span[name='group_name']","#groupList tbody tr").attr("title","전체");
										for(var i=0;i<data.listData.length;i++) {
											var obj = data.listData[i];
											$("#groupList tbody").append(_this.address.group_list_obj.clone());
											var tr = $("#groupList tbody tr:last");
											address_cnt = _IBCommon.format_number(obj.cnt);
											group_name = Common.XSSfilter(" " + obj.group_name);
											group_id = obj.group_id;
											$("#groupList tbody tr:last input").attr("group_id", group_id);
											$("span[name='group_name']","#groupList tbody tr:last").html(group_name);
											$("span[name='group_cnt']","#groupList tbody tr:last").html(address_cnt);
											$("span[name='group_name']","#groupList tbody tr:last").attr("title",group_name);
										}
										_this.address.group.btn();
										if(data.listData.length < _this.address.address_list_cnt){
											for(var i=data.listData.length;i<_this.address.address_list_cnt;i++) {
												$("#groupList tbody").append(_this.address.group_list_empty_obj.clone());
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
						for(var i=0;i<_this.address.address_list_cnt + 1;i++) {
							$("#personalList tbody").append(_this.address.personal_list_empty_obj.clone());
						}	
						_this.address.personal.btn();
					},	
					btn : function(){
						var _this = this.top();
						$(document).on("click","#sendAdd1 #searchArea a.btn_search", function(e){
							var json = Common.getInputTagToJson($("#sendAdd1 #searchArea"));
							if(json.searchStr!=""){
								_this.address.personal.addressList(json);	
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
															$("#personalList tbody").append(_this.address.personal_list_obj.clone());
															var tr = $("#personalList tbody tr:last");
															$("#personalList tbody tr:last input").attr("seq", seq);
															$("span[name='address_name']","#personalList tbody tr:last").html(address_name);
															$("span[name='address_mobile']","#personalList tbody tr:last").html(address_mobile);
															if(typeof(param.searchTarget) == "undefined"){
																tmp_group[address_mobile] = {person_name:address_name,person_mobile:address_mobile};
																_this.val.groupAddressList[param.group_id] = tmp_group[address_mobile];
																//_this.val.sendList.group[group_id];
																//_this.val.sendList.person[person_mobile] = {person_name:person_name, person_mobile:person_mobile};
															}
														}
														if(typeof(param.searchTarget) == "undefined"){
															_this.val.groupAddressList[param.group_id] = tmp_group;
														}
														if(data.listData.length < _this.address.address_list_cnt + 1){
															for(var i=data.listData.length;i<_this.address.address_list_cnt + 1;i++) {
																$("#personalList tbody").append(_this.address.personal_list_empty_obj.clone());
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
	};

	if (!Object.keys) {
		Object.keys = (function () {
			'use strict';
			var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
			dontEnums = ['toString','toLocaleString','valueOf','hasOwnProperty','isPrototypeOf','propertyIsEnumerable','constructor'],
			dontEnumsLength = dontEnums.length;

			return function (obj) {
				if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
					throw new TypeError('Object.keys called on non-object');
				}

				var result = [], prop, i;

				for (prop in obj) {
					if (hasOwnProperty.call(obj, prop)) {
						result.push(prop);
					}
				}

				if (hasDontEnumBug) {
					for (i = 0; i < dontEnumsLength; i++) {
						if (hasOwnProperty.call(obj, dontEnums[i])) {
							result.push(dontEnums[i]);
						}
					}
				}
				return result;
			};
		}());
	}
	jQuery.fn.extend({
		insertAtCaret: function(myValue, myValueE){
			return this.each(function(i) {
				if (document.selection) {
					//For browsers like Internet Explorer
					this.focus();
					sel = document.selection.createRange();
					sel.text = myValue + myValueE;
					this.focus();
				}
				else if (this.selectionStart || this.selectionStart == '0') {
					//For browsers like Firefox and Webkit based
					var startPos = this.selectionStart;
					var endPos = this.selectionEnd;
					var scrollTop = this.scrollTop;
					this.value = this.value.substring(0, startPos)+myValue+this.value.substring(startPos,endPos)+myValueE+this.value.substring(endPos,this.value.length);
					this.focus();
					this.selectionStart = startPos + myValue.length;
					this.selectionEnd = ((startPos + myValue.length) + this.value.substring(startPos,endPos).length);
					this.scrollTop = scrollTop;
				} else {
					this.value += myValue;
					this.focus();
				}
			});
		}
	});

	jQuery.fn.center = function (val) {
	    this.css("position","absolute");
	    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop() + val) + "px");
	    //this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
	    return this;
	};	
	
	jQuery.fn.mcursor = function (e, x, y) {

		var divTop = 0; //상단 좌표
		var divLeft = 0; //좌측 좌표

		if(jQuery.browser.browser == 'MSIE'){
			divTop = Common.ietruebody().scrollTop+e.clientY  + y; //상단 좌표
			divLeft = Common.ietruebody().scrollLeft+e.clientX + x; //좌측 좌표			
		}else{
			divTop = document.body.scrollTop+e.clientY  + y; //상단 좌표
			divLeft = document.body.scrollLeft+e.clientX + x; //좌측 좌표			
		}

		this.css({
			"top": divTop
			,"left": divLeft
		});
	};	
	
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