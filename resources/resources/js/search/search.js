	$("document").ready(function() {
		_main.init();
	});
	
	var _main = {
			top : function() {
				return _main;
			}, 
			val : {
				tr : "",		
				web_send_purpose_name : {},	
				template_list : {},
				mtExcelData : [],
				notiExcelData : []
			},
			init : function() {
				var _this = this.top();

				_this.mt.list.id = $("#"+_this.mt.list.id_name);
				_this.mt.list.tr = $("tbody tr:first",_this.mt.list.id).clone();
				_this.noti.list.id = $("#"+_this.noti.list.id_name);
				_this.noti.list.tr = $("tbody tr:first",_this.noti.list.id).clone();
				_this.web_send_purpose();
				_this.template_list();
				_this.search.getDate();
				_this.search.btn();
				_this.mt.list.init();
				_this.noti.list.init();
			},
			template_list : function(){
				var _this = this.top();
				var param = {procType:"getTemplateList"};
				var purpose_name = "";
				$.ajax({url : Common.DEFAULT_PATH+"notitalk.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
					var json = _IBJson.decode(_data);
					if(json) {
						if(json.data) {
							var data = json.data;
							var result_code = data.resultCode;
							if(result_code == "1000") {
								console.log(data);
								if(data.listData.length>0){
									for(var i=0;i<data.listData.length;i++) {
										var obj = data.listData[i];
										template_code = obj.template_code;
										//purpose_code = obj.PURPOSE_CODE;
										_this.val.template_list[template_code] = obj;
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
			},
			web_send_purpose : function(){
				var _this = this.top();
				var param = {procType:"getSendPurpose"};
				var purpose_name = "";
				$.ajax({url : Common.DEFAULT_PATH+"address.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
					var json = _IBJson.decode(_data);
					if(json) {
						if(json.data) {
							var data = json.data;
							var result_code = data.resultCode;
							if(result_code == "1000") {
								console.log(data);
								if(data.listData.length>0){
									for(var i=0;i<data.listData.length;i++) {
										var obj = data.listData[i];
										purpose_name = Common.XSSfilter(obj.PURPOSE_NAME);
										purpose_code = obj.PURPOSE_CODE;
										_this.val.web_send_purpose_name[purpose_code] = purpose_name;
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
			},
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
					_this.search.get();	
				},
				downExcel : function(){
					var _this = this.top();
						console.log('mtExcelData');
						var fileName = "send_search";
						var title1 = ['발송일시','수신일시','중계사','종류','결과','통신사','휴대폰번호','고객번호','계좌번호','발송','내용'];
						var title2 = ['발송일시','수신일시','종류','결과','휴대폰번호','고객번호','계좌번호','발송','플러스친구ID','템플릿제목'];
						var param = {"downType":"search_excel",fileName:fileName, title1:title1, title2:title2, excelData1:_this.val.mtExcelData, excelData2:_this.val.notiExcelData};
						$("#mt_form_div").remove();			
						$("body").append('<div id="mt_form_div"><form name="mt_form" id="mt_form" method="post" action="/download.do"><input type="hidden" name="jsonBody" id="jsonBody" value="" /></form></div>');
						$("#jsonBody").val(_IBJson.encode(param));
						$('#mt_form').submit();
				},
				btn : function(){
					var _this = this.top();	
					$("#searchArea input[name='searchBtn']").unbind("click").click(function(){	
						_this.search.check();
					});
					$("#searchArea input[name='excelDownBtn']").unbind("click").click(function(){
						if(_this.val.mtExcelData.length == 0 && _this.val.notiExcelData.length == 0){
							alert('검색된 결과가 없어 다운로드 할 수 없습니다.');
						}else{
							_this.search.downExcel();
						}
					});
				},
				get : function() 
				{
					var _this = this.top();
					//search field set
					var json = "";
					json = Common.getInputTagToJson($("#searchArea"));
					_this.mt.list.pJson = json;
					var mtParam = $.extend( {procType:"getMtList"}, json);
					_this.noti.list.pJson = json;
					var kkoParam = $.extend( {procType:"getKkoList"}, json);
					_this.mt.list.get(mtParam);
					_this.noti.list.get(kkoParam);
				},
				getDate : function(){

					$("#datepicker1, #datepicker2").datepicker({
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
					    minDate: "-3m",
						maxDate: "0",
						onSelect : function(selectedDate){
							if(this.id == "datepicker1")
								$("#datepicker2").datepicker("option","minDate",selectedDate);
							else if(this.id == "datepicker2")
								$("#datepicker1").datepicker("option","maxDate",selectedDate);
						}
					});
					
					$("#datepicker1").val(Common.currentDate(-7));
					$("#datepicker2").val(Common.currentDate());
				}
			},
			mt : {
				list : {
					json : "",
					pJson : "",
					top : function() {
						return _main;
					},
					id : "",
					id_name : "mtListArea",
					tr : "",
					total_count : 0,
					//current_page : 1,
					//vertical_count : 10,
					//horizon_count : 10,
					init : function() {
						//init
						var _this = this.top();
						$("tbody tr",_this.mt.list.id).remove();
						var	json = Common.getInputTagToJson($("#searchArea",_this.mt.list.id));
						_this.mt.list.pJson = json;
					},
					btn : function(){
						var _this = this.top();
						
						$("td[name=subject] a",_this.mt.list.id).unbind("click").click(function(){

							var date_client_req = $(this).attr("date_client_req");
							var date_gw_sent = $(this).attr("date_gw_sent");
							var date_gw_sent_ack = $(this).attr("date_gw_sent_ack");
							var callback =$(this).attr("callback");
							var service_type = $(this).attr("service_type");
							var web_schd_id = $(this).attr("web_schd_id");
							var gw_type = $(this).attr("gw_type");
							var date_rslt_device = $(this).attr("date_rslt_device");
							var date_report_recv = $(this).attr("date_report_recv");
							var recipient_num = $(this).attr("recipient_num");
							var change_words = $(this).attr("change_words");
							var cs_no = $(this).attr("cs_no");
							var acno = $(this).attr("acno");
							var carrier = $(this).attr("carrier");
							var result_detail_msg = $(this).attr("result_detail_msg");
							var subject = $(this).html();
							var content = $("textarea",$(this).parent().parent()).html();
							$("#modal1 td[name='date_client_req']").html(date_client_req);
							$("#modal1 td[name='date_gw_sent']").html(date_gw_sent);
							$("#modal1 td[name='date_gw_sent_ack']").html(date_gw_sent_ack);
							$("#modal1 td[name='callback']").html(callback);
							$("#modal1 td[name='service_type']").html(service_type);
							$("#modal1 td[name='web_schd_id']").html(web_schd_id);
							$("#modal1 td[name='gw_type']").html(gw_type);
							$("#modal1 td[name='date_rslt_device']").html(date_rslt_device);
							$("#modal1 td[name='date_report_recv']").html(date_report_recv);
							$("#modal1 td[name='recipient_num']").html(recipient_num);
							$("#modal1 td[name='change_words']").html(change_words);
							$("#modal1 td[name='cs_no']").html(cs_no);
							$("#modal1 td[name='acno']").html(acno);
							$("#modal1 td[name='carrier']").html(carrier);
							$("#modal1 td[name='result_detail_msg']").html(result_detail_msg);
							$("#modal1 textarea").html(content);
							
						});
					},
					get : function(param) {
						$("#loadingLayer").show();
						var _this = this.top();
						_this.mt.list.json = param;
						_this.mt.list.total_count = 0;
						$.ajax({url : Common.DEFAULT_PATH+"mtsend.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
							var json = _IBJson.decode(_data);
							$("tbody tr",_this.mt.list.id).remove();							
							if(json) {
								if(json.data) {
									var data = json.data;
									var result_code = data.resultCode;
									console.log(data);
									if(result_code == "1000") {
										_this.val.mtExcelData = [];
										_this.mt.list.total_count = data.totalCnt;					
										if(data.mtList.length > 0){
											for(var i=0;i<data.mtList.length;i++) {
												var record = [];
												var obj = data.mtList[i];
												$("tbody",_this.mt.list.id).append(_this.mt.list.tr.clone());
												var tr = $("tbody tr:last",_this.mt.list.id);
												var web_schd_id = obj.web_schd_id;	
												var send_path = web_schd_id.length>0 ? "WEB" : "SYS";
												var date_client_req = obj.date_client_req.substring(0,19);
												var date_gw_sent = obj.date_gw_sent.substring(0,19);
												var date_gw_sent_ack = obj.date_gw_sent_ack.substring(0,19);
												var date_report_recv = obj.date_report_recv.substring(0,19);
												var date_rslt_device = obj.date_rslt_device.substring(0,19);
												var callback = _IBCommon.format_phone(obj.callback);
												var acno = obj.acno;	//계좌번호
												var cs_no = obj.cs_no;	//고객번호
												var change_words = Common.XSSfilter(obj.change_words);
												var carrier = obj.carrier == "10001" ? "SKT" : (obj.carrier == "10002" ? "KT" : (obj.carrier == "10003" ? "LGU+" : (obj.carrier == "" ? "" : "ETC")));
												var gw_type = obj.gw_type;
												var mt_refkey = obj.mt_refkey;
												var result_code = obj.result_code;
												var result_detail_msg = obj.result_msg;
												var result_msg = result_code == "1000" ? "성공" : (result_code=="" ? "대기" : "<div class=\"tooltip\">실패<span class=\"tooltiptext\">"+result_detail_msg+"</span></div>");
												var result_send_msg = result_code == "1000" ? "성공" : (result_code=="" ? "대기" : "실패");
												var web_send_purpose = obj.web_send_purpose;
												var recipient_num = _IBCommon.format_phone(obj.recipient_num);
												var service_type = obj.service_type.trim() == '0' ? "SMS" : (obj.service_type.trim() == "3" ? "LMS" : "MMS");
												var subject = Common.XSSfilter(obj.subject);
												var content = obj.content;
												subject = subject.length == 0 ? "[제목없음]" : subject;
												
												//_IBCommon.format_number()
												$("td[name='content'] textarea",tr).html(content);
												$("td[name='date_client_req']",tr).html(date_client_req.substring(5));
												$("td[name='date_rslt_device']",tr).html(date_rslt_device.substring(5));
												$("td[name='gw_type']",tr).html(gw_type);
												$("td[name='service_type']",tr).html(service_type);
												$("td[name='result_msg']",tr).html(result_msg);
												$("td[name='carrier']",tr).html(carrier);
												$("td[name='recipient_num']",tr).html(recipient_num);
												$("td[name='cs_no']",tr).html(cs_no);
												$("td[name='acno']",tr).html(acno);
												$("td[name='web_schd_id']",tr).html(send_path);
												$("td[name='subject'] a",tr).attr("date_client_req", date_client_req);
												$("td[name='subject'] a",tr).attr("date_gw_sent", date_gw_sent);
												$("td[name='subject'] a",tr).attr("date_gw_sent_ack", date_gw_sent_ack);
												$("td[name='subject'] a",tr).attr("callback", callback);
												$("td[name='subject'] a",tr).attr("service_type", service_type);
												$("td[name='subject'] a",tr).attr("web_schd_id", send_path);
												$("td[name='subject'] a",tr).attr("gw_type", gw_type);
												$("td[name='subject'] a",tr).attr("date_rslt_device", date_rslt_device);
												$("td[name='subject'] a",tr).attr("date_report_recv", date_report_recv);
												$("td[name='subject'] a",tr).attr("recipient_num", recipient_num);
												$("td[name='subject'] a",tr).attr("change_words", change_words);
												$("td[name='subject'] a",tr).attr("cs_no", cs_no);
												$("td[name='subject'] a",tr).attr("acno", acno);
												$("td[name='subject'] a",tr).attr("carrier", carrier);
												$("td[name='subject'] a",tr).attr("result_detail_msg", result_detail_msg);
												$("td[name='subject'] a",tr).html(subject);
												record.push(date_client_req);
												record.push(date_rslt_device);
												record.push(gw_type);
												record.push(service_type);
												record.push(result_send_msg);
												record.push(carrier);
												record.push(recipient_num);
												record.push(cs_no);
												record.push(acno);
												record.push(send_path);
												record.push(subject);
												_this.val.mtExcelData.push(record);
											}
											
										}else{		
											var tr = '<tr name="ptr"><td colspan="10" style="text-align:center;">데이터가 없습니다.</td></tr>';
											$("tbody",_this.mt.list.id).append(tr);
										}
										_this.mt.list.btn();
										$("font span[name='mt_cnt']").html(_IBCommon.format_number(_this.mt.list.total_count));
										console.log("_this.mt.list.total_count :" + _this.mt.list.total_count);
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
							_this.mt.list.btn();
							$("#loadingLayer").hide();
						}});
					}
				}
			},
			noti : {
				list : {
					json : "",
					pJson : "",
					top : function() {
						return _main;
					},
					id : "",
					id_name : "notiListArea",
					tr : "",
					total_count : 0,
					kko_btn_info : {},
					//current_page : 1,
					//vertical_count : 10,
					//horizon_count : 10,
					init : function() {
						var _this = this.top();
						
						$("tbody tr",_this.noti.list.id).remove();
						var	json = Common.getInputTagToJson($("#searchArea",_this.noti.list.id));
						_this.noti.list.pJson = json;
					},
					btn : function(){
						var _this = this.top();
						
						$("td[name=subject] a",_this.noti.list.id).unbind("click").click(function(){
							
							var date_client_req = $(this).attr("date_client_req");
							var date_gw_sent = $(this).attr("date_gw_sent");
							var date_gw_sent_ack = $(this).attr("date_gw_sent_ack");
							var callback =$(this).attr("callback");
							var web_schd_id = $(this).attr("web_schd_id");
							var date_rslt_device = $(this).attr("date_rslt_device");
							var date_report_recv = $(this).attr("date_report_recv");
							var recipient_num = $(this).attr("recipient_num");
							var change_words = $(this).attr("change_words");
							var cs_no = $(this).attr("cs_no");
							var acno = $(this).attr("acno");
							var result_detail_msg = $(this).attr("result_detail_msg");
							if(result_detail_msg.length==0) result_detail_msg = "대기";
							var uuid = $(this).attr("uuid");
							var template_code = $(this).attr("template_code");
							var variable_use = $(this).attr("variable_use");
							var web_send_purpose = $(this).attr("web_send_purpose");
							var subject = $(this).html();
							var content = $("textarea",$(this).parent().parent()).html();
							var web_send_purpose_name = _this.val.web_send_purpose_name[web_send_purpose];
							var objChatButtonInfo = _this.val.template_list[template_code].chat_button_info;
							if(objChatButtonInfo.length>0){
								$("#modal2 #tabsP .tabmenu li[rel='tab2']").show();
								$("#modal2 #tab1 .kakaoBoxP .btn").remove();
								for(var i=0;i<objChatButtonInfo.length;i++) {
									var btn_name = Common.XSSfilter(objChatButtonInfo[i].name);
									var btn_type = objChatButtonInfo[i].type;
									if(btn_type == "WL"){
										var btn_type_name = "웹링크";
										var link_name_1 = "모바일";
										var link_name_2 = "웹";
										var link_url_1 = Common.XSSfilter(objChatButtonInfo[i].url_mobile);
										var link_url_2 = Common.XSSfilter(objChatButtonInfo[i].url_pc);
									}else{
										var btn_type_name = "앱링크";
										var link_name_1 = "Android";
										var link_name_2 = "iOS";
										var link_url_1 = Common.XSSfilter(objChatButtonInfo[i].scheme_android);
										var link_url_2 = Common.XSSfilter(objChatButtonInfo[i].scheme_ios);
									}
									var strBtn = '<li class="btn"><a href="">'+ btn_name +'</a></li>';
									var strBtnDetail = '<tr><th rowspan="4" name="no">버튼'+i+'</th><th>타입</th><td class="left" name="btn_type_name">'+btn_type_name+'</td></tr>';
									strBtnDetail = strBtnDetail + '<tr><th>제목</th><td class="left" name="btn_name">'+btn_name+'</td></tr>';
									strBtnDetail = strBtnDetail + '<tr><th name="link_name_1">'+link_name_1+'</th><td class="left" name="link_url_1">'+link_url_1+'</td></tr>';
									strBtnDetail = strBtnDetail + '<tr><th  name="link_name_2">'+link_name_2+'</th><td class="left" name="link_url_2">'+link_url_2+'</td></tr>';
									$("#modal2 #tab1 .kakaoBoxP").append(strBtn);
									$("#modal2 #tab2 tbody").append(strBtnDetail);
								}
							}else{
								$("#modal2 #tabsP .tabmenu li[rel='tab2']").hide();
							}
							$("#modal2 td[name='date_client_req']").html(date_client_req);
							$("#modal2 td[name='date_gw_sent']").html(date_gw_sent);
							$("#modal2 td[name='date_gw_sent_ack']").html(date_gw_sent_ack);
							$("#modal2 td[name='uuid']").html(uuid);
							$("#modal2 td[name='web_send_purpose']").html(web_send_purpose_name);
							$("#modal2 td[name='template_name']").html(subject);
							$("#modal2 td[name='template_code']").html(template_code);
							//$("#modal2 td[name='callback']").html(callback);
							$("#modal2 td[name='web_schd_id']").html(web_schd_id);
							$("#modal2 td[name='date_rslt_device']").html(date_rslt_device);
							$("#modal2 td[name='date_report_recv']").html(date_report_recv);
							$("#modal2 td[name='recipient_num']").html(recipient_num);
							$("#modal2 td[name='change_words']").html(change_words);
							$("#modal2 td[name='cs_no']").html(cs_no);
							$("#modal2 td[name='acno']").html(acno);
							$("#modal2 td[name='result_msg']").html(result_detail_msg);
							$("#modal2 textarea").html(content);
						});
					},
					get : function(param) {
						$("#loadingLayer").show();
						var _this = this.top();
						_this.noti.list.json = param;
						_this.noti.list.total_count = 0;
						_this.noti.list.kko_btn_info = {};	//버튼 정보 초기화
						$.ajax({url : Common.DEFAULT_PATH+"notitalk.do",type:"POST",dataType:"text",timeout:Common.DEFAULT_AJX_TIME,data:{jsonBody:_IBJson.encode(param)},success:function(_data) {
							var json = _IBJson.decode(_data);
							$("tbody tr",_this.noti.list.id).remove();							
							if(json) {
								if(json.data) {
									var data = json.data;
									var result_code = data.resultCode;
									if(result_code == "1000") {
										_this.val.notiExcelData = [];
										_this.noti.list.total_count = data.totalCnt;					
										if(data.kkoList.length > 0){
											for(var i=0;i<data.kkoList.length;i++) {
												var record = [];
												var obj = data.kkoList[i];
												$("tbody",_this.noti.list.id).append(_this.noti.list.tr.clone());
												var tr = $("tbody tr:last",_this.noti.list.id);
												var web_schd_id = obj.web_schd_id;	
												var send_path = web_schd_id.length>0 ? "WEB" : "SYS";
												var date_client_req = obj.date_client_req.substring(0,19);
												var date_gw_sent = obj.date_gw_sent.substring(0,19);
												var date_gw_sent_ack = obj.date_gw_sent_ack.substring(0,19);
												var date_report_recv = obj.date_report_recv.substring(0,19);
												var date_rslt_device = obj.date_rslt_device.substring(0,19);
												var callback = _IBCommon.format_phone(obj.callback);
												var acno = obj.acno;	//계좌번호
												var cs_no = obj.cs_no;	//고객번호
												var change_words = Common.XSSfilter(obj.change_words);
												var mt_refkey = obj.mt_refkey;
												var result_code = obj.result_code;
												var result_detail_msg = obj.result_msg;
												var result_msg = result_code == "1000" ? "성공" : (result_code=="" ? "대기" : "<div class=\"tooltip\">실패<span class=\"tooltiptext\">"+result_detail_msg+"</span></div>");
												var result_send_msg = result_code == "1000" ? "성공" : (result_code=="" ? "대기" : "실패");
												var web_send_purpose = obj.web_send_purpose;
												var recipient_num = _IBCommon.format_phone(obj.recipient_num);
												var template_code = obj.letr_msg_cd + obj.letr_msg_srno;
												var subject = Common.XSSfilter(_this.val.template_list[template_code].template_name);
												var uuid = _this.val.template_list[template_code].uuid;
												var variable_use = _this.val.template_list[template_code].variable_use;
												var content = obj.content;
												_this.noti.list.kko_btn_info[template_code] = obj.kko_btn_info;
												subject = subject.length == 0 ? "[제목없음]" : subject;
												data.kkoList[i].subject = subject;
												data.kkoList[i].uuid = uuid;
												//_IBCommon.format_number()
												$("td[name='content'] textarea",tr).html(content);
												$("td[name='date_client_req']",tr).html(date_client_req.substring(5));
												$("td[name='date_rslt_device']",tr).html(date_rslt_device.substring(5));
												$("td[name='result_msg']",tr).html(result_msg);
												$("td[name='recipient_num']",tr).html(recipient_num);
												$("td[name='cs_no']",tr).html(cs_no);
												$("td[name='acno']",tr).html(acno);
												$("td[name='web_schd_id']",tr).html(send_path);
												$("td[name='uuid']",tr).html(uuid);
												$("td[name='subject'] a",tr).attr("date_client_req", date_client_req);
												$("td[name='subject'] a",tr).attr("date_gw_sent", date_gw_sent);
												$("td[name='subject'] a",tr).attr("date_gw_sent_ack", date_gw_sent_ack);
												$("td[name='subject'] a",tr).attr("callback", callback);
												$("td[name='subject'] a",tr).attr("web_schd_id", send_path);
												$("td[name='subject'] a",tr).attr("date_rslt_device", date_rslt_device);
												$("td[name='subject'] a",tr).attr("date_report_recv", date_report_recv);
												$("td[name='subject'] a",tr).attr("recipient_num", recipient_num);
												$("td[name='subject'] a",tr).attr("change_words", change_words);
												$("td[name='subject'] a",tr).attr("cs_no", cs_no);
												$("td[name='subject'] a",tr).attr("acno", acno);
												$("td[name='subject'] a",tr).attr("result_detail_msg", result_detail_msg);
												$("td[name='subject'] a",tr).attr("uuid", uuid);
												$("td[name='subject'] a",tr).attr("template_code", template_code);
												$("td[name='subject'] a",tr).attr("variable_use", variable_use);
												$("td[name='subject'] a",tr).attr("web_send_purpose", web_send_purpose);
												$("td[name='subject'] a",tr).html(subject);
												record.push(date_client_req);
												record.push(date_rslt_device);
												record.push('Alim');
												record.push(result_send_msg);
												record.push(recipient_num);
												record.push(cs_no);
												record.push(acno);
												record.push(send_path);
												record.push(uuid);
												record.push(subject);
												_this.val.notiExcelData.push(record);
											}
										}else{		
											var tr = '<tr name="ptr"><td colspan="10" style="text-align:center;">데이터가 없습니다.</td></tr>';
											$("tbody",_this.noti.list.id).append(tr);
										}
										_this.noti.list.btn();
										$("font span[name='mt_cnt']").html(_IBCommon.format_number(_this.noti.list.total_count));
										console.log("_this.noti.list.total_count :" + _this.noti.list.total_count);
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
							$("#loadingLayer").hide();
							_this.noti.list.btn();
						}});
					}
				}
			}
		}
	