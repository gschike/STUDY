	$("document").ready(function() {
		_header.init();
	});
	
	var _header = {
			top : function() {
				return _header;
			},
			path : "",
			href : "",
			val : {
			},
			init : function() {
				var _this = this.top();
				_this.path =  location.pathname;
				console.log(_this.path);
				_this.header();
				//_this.btn();	
			},
			header : function(){
				var _this = this.top();
				var monitor_menu_obj	= $("#lnb_1");
				var mt_menu_obj			= $("#lnb_2");
				var notitalk_menu_obj	= $("#lnb_3");
				var address_menu_obj	= $("#lnb_4");
				var statistic_menu_obj	= $("#lnb_5");
				var search_menu_obj		= $("#lnb_6");
				var manage_menu_obj		= $("#lnb_7");
				var isAdmin = $("#isAdmin").val();		//사용자권한 (U:일반사용자, D:부서관리자, A:관리자, S:슈퍼관리자)
				if(isAdmin == "U"){
					monitor_menu_obj.hide();
					statistic_menu_obj.hide();
					search_menu_obj.hide();
					manage_menu_obj.hide();
				}else if(isAdmin == "D"){
					monitor_menu_obj.hide();
					search_menu_obj.hide();
					manage_menu_obj.hide();
				}else if(isAdmin == "A"){
					
				}
				if(_this.path.match("/monitor/")){
					monitor_menu_obj.addClass("on");
					$("ul",monitor_menu_obj).show();
				}else if(_this.path.match("/mt/")){
					mt_menu_obj.addClass("on");
					$("ul",mt_menu_obj).show();
				}else if(_this.path.match("/notitalk/")){
					notitalk_menu_obj.addClass("on");
					$("ul",notitalk_menu_obj).show();
				}else if(_this.path.match("/address/")){
					address_menu_obj.addClass("on");
					$("ul",address_menu_obj).show();
				}else if(_this.path.match("/statistic/")){
					statistic_menu_obj.addClass("on");
					$("ul",statistic_menu_obj).show();
				}else if(_this.path.match("/search/")){
					search_menu_obj.addClass("on");
					$("ul",search_menu_obj).show();
				}else if(_this.path.match("/manage/")){
					manage_menu_obj.addClass("on");
					$("ul",manage_menu_obj).show();
				}
				$("#lnb .depth1").show();
			}	
		};
	