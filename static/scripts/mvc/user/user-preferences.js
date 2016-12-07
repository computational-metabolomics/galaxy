define(["mvc/form/form-view","mvc/ui/ui-misc"],function(a,b){var c=Backbone.View.extend({initialize:function(){this.defs={information:{title:"Manage information",description:"Edit your email, addresses and custom parameters or change your username.",url:"api/users/"+Galaxy.user.id+"/information/inputs",icon:"fa-user"},password:{title:"Change password",description:"Allows you to change your login credentials.",icon:"fa-unlock-alt",url:"api/users/"+Galaxy.user.id+"/password/inputs",submit_title:"Save password"},communication:{title:"Change communication settings",description:"Enable or disable the communication feature to chat with other users.",url:"api/users/"+Galaxy.user.id+"/communication/inputs",icon:"fa-comments-o"},permissions:{title:"Set dataset permissions for new histories",description:"Grant others default access to newly created histories. Changes made here will only affect histories created after these settings have been stored.",url:"api/users/"+Galaxy.user.id+"/permissions/inputs",icon:"fa-users",submit_title:"Save permissions"},api_key:{title:"Manage API key",description:"Access your current API key or create a new one.",url:"api/users/"+Galaxy.user.id+"/api_key/inputs",icon:"fa-key",submit_title:"Create a new key",submit_icon:"fa-check"},toolbox_filters:{title:"Manage Toolbox filters",description:"Customize your Toolbox by displaying or omitting sets of Tools.",url:"api/users/"+Galaxy.user.id+"/toolbox_filters/inputs",icon:"fa-filter",submit_title:"Save filters"},openids:{title:"Manage OpenIDs",description:"Associate OpenIDs with your account.",icon:"fa-openid",onclick:function(){window.location.href=Galaxy.root+"user/openid_manage?cntrller=user&use_panels=True"}},logout:{title:"Sign out",description:"Click here to sign out of all sessions.",icon:"fa-sign-out",onclick:function(){Galaxy.modal.show({title:"Sign out",body:"Do you want to continue and sign out of all active sessions?",buttons:{Cancel:function(){Galaxy.modal.hide()},"Sign out":function(){window.location.href=Galaxy.root+"user/logout"}}})}}},this.message=new b.Message,this.setElement("<div/>"),this.render()},render:function(){var a=this,b=Galaxy.config;$.getJSON(Galaxy.root+"api/users/"+Galaxy.user.id,function(c){a.$preferences=$("<div/>").addClass("ui-panel").append(a.message.$el).append($("<h2/>").append("User preferences")).append($("<p/>").append("You are logged in as <strong>"+_.escape(c.email)+"</strong>.")).append(a.$table=$("<table/>").addClass("ui-panel-table")),b.use_remote_user||(a._link(a.defs.information),a._link(a.defs.password)),b.enable_communication_server&&a._link(a.defs.communication),a._link(a.defs.permissions),a._link(a.defs.api_key),b.has_user_tool_filters&&a._link(a.defs.toolbox_filters),b.enable_openid&&!b.use_remote_user&&a._link(a.defs.openids),a._link(a.defs.logout),a.$preferences.append(a._templateFooter(c)),a.$el.empty().append(a.$preferences)})},_link:function(c){var d=this,e=$(this._templateRow(c));this.$table.append(e),e.find("a").on("click",function(){c.url?$.ajax({url:Galaxy.root+c.url,type:"GET"}).done(function(e){var f=$.extend({},c,e),g=new a({title:f.title,icon:f.icon,inputs:f.inputs,operations:{submit:new b.ButtonIcon({tooltip:f.submit_tooltip,title:f.submit_title||"Save settings",icon:f.submit_icon||"fa-save",onclick:function(){d._submit(g,f)}}),back:new b.ButtonIcon({icon:"fa-caret-left",tooltip:"Return to user preferences",title:"Preferences",onclick:function(){g.remove(),d.$preferences.show()}})}});d.$preferences.hide(),d.$el.append(g.$el)}).fail(function(){d.message.update({message:"Failed to load resource "+c.url+".",status:"danger"})}):c.onclick()})},_submit:function(a,b){var c=this;$.ajax({url:b.url,data:JSON.stringify(a.data.create()),type:"PUT",contentType:"application/json"}).done(function(b){var d=!1;a.data.matchModel(b,function(b,c){a.field_list[c].value(b.value),d=!0}),d?a.message.update({message:b.message,status:"success"}):(a.remove(),c.$preferences.show(),c.message.update({message:b.message,status:"success"}))}).fail(function(b){a.message.update({message:b.responseJSON.err_msg,status:"danger"})})},_templateRow:function(a){return'<tr><td><div class="ui-panel-icon fa '+a.icon+'"></td><td><a class="ui-panel-anchor" href="javascript:void(0)">'+a.title+'</a><div class="ui-form-info">'+a.description+"</div></td></tr>"},_templateFooter:function(a){return'<p class="ui-panel-footer">You are using <strong>'+a.nice_total_disk_usage+"</strong> of disk space in this Galaxy instance. "+(Galaxy.config.enable_quotas?"Your disk quota is: <strong>"+a.quota+"</strong>. ":"")+'Is your usage more than expected? See the <a href="https://wiki.galaxyproject.org/Learn/ManagingDatasets" target="_blank">documentation</a> for tips on how to find all of the data in your account.</p>'}});return{View:c}});
//# sourceMappingURL=../../../maps/mvc/user/user-preferences.js.map