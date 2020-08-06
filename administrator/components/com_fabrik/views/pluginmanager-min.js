/*! Fabrik */

define(["jquery","fab/fabrik"],function(e,m){return new Class({pluginTotal:0,topTotal:-1,initialize:function(n,t,e){"string"===typeOf(n)&&(n=[n]),this.id=t,this.plugins=n,this.type=e,window.addEvent("domready",function(){var t;for(this.accordion=new Fx.Accordion([],[],{alwaysHide:!0,display:-1,duration:"short"}),t=0;t<n.length;t++)this.addTop(n[t]);this.periodical=this.iniAccordion.periodical(250,this),this.watchPluginSelect(),this.watchDelete(),this.watchAdd();var e=document.id("plugins");"null"!==typeOf(e)&&(e.addEvent("click:relay(h3.title)",function(t,e){document.id("plugins").getElements("h3.title").each(function(t){t!==e&&t.removeClass("pane-toggler-down")}),e.toggleClass("pane-toggler-down")}),this.watchDescriptions(e))}.bind(this))},watchDescriptions:function(t){t.addEvent("keyup:relay(input[name*=plugin_description])",function(t,e){var n=e.getParent(".actionContainer"),i=n.getElement(".pluginTitle"),a=n.getElement("select[name*=plugin]").getValue(),o=e.getValue();i.set("text",a+": "+o)})},iniAccordion:function(){this.pluginTotal===this.plugins.length&&(1===this.plugins.length?this.accordion.display(0):this.accordion.display(-1),clearInterval(this.periodical))},canSaveForm:function(){return"complete"===document.readyState&&m.requestQueue.empty()},watchDelete:function(){document.id("adminForm").addEvent("click:relay(a.removeButton, a[data-button=removeButton])",function(t,e){t.preventDefault(),this.pluginTotal--,this.topTotal--,this.deletePlugin(t)}.bind(this))},watchAdd:function(){var t=document.id("addPlugin");"null"!==typeOf(t)&&t.addEvent("click",function(t){t.stop(),this.accordion.display(-1),this.addTop()}.bind(this))},addTop:function(e){var t,n,i,a,o,l;"string"===typeOf(e)?(l=!(o=n=!(t=1)),e=e||"",a=i=""):(t=e?e.published:1,n=e?e.show_icon:1,o=e?e.must_validate:0,l=e?e.validate_hidden:1,i=e?e.validate_in:"both",a=e?e.validation_on:"both",e=e?e.plugin:"");var d=new Element("div.actionContainer.panel.accordion-group"),r=new Element("a.accordion-toggle",{href:"#"});r.adopt(new Element("span.pluginTitle").set("text",""!==e?e+" "+Joomla.JText._("COM_FABRIK_LOADING").toLowerCase():Joomla.JText._("COM_FABRIK_LOADING")));var c=new Element("div.title.pane-toggler.accordion-heading").adopt(new Element("strong").adopt(r)),u=new Element("div.accordion-body");d.adopt(c),d.adopt(u),d.inject(document.id("plugins")),this.accordion.addSection(c,u);var s=this.topTotal+1,p={option:"com_fabrik",view:"plugin",task:"top",format:"raw",type:this.type,plugin:e,plugin_published:t,show_icon:n,must_validate:o,validate_hidden:l,validate_in:i,validation_on:a,c:this.topTotal,id:this.id},g=new Request.HTML({url:"index.php",data:p,update:u,onRequest:function(){m.debug&&fconsole("Fabrik pluginmanager: Adding",this.type,"entry",s.toString())}.bind(this),onSuccess:function(t){""!==e?this.addPlugin(e,s):c.getElement("span.pluginTitle").set("text",Joomla.JText._("COM_FABRIK_PLEASE_SELECT")),this.updateBootStrap(),FabrikAdmin.reTip()}.bind(this),onFailure:function(t){fconsole("Fabrik pluginmanager addTop ajax failed:",t)},onException:function(t,e){fconsole("Fabrik pluginmanager addTop ajax exception:",t,e)}});this.topTotal++,m.requestQueue.add(g)},updateBootStrap:function(){document.getElements(".radio.btn-group label").addClass("btn"),document.getElements(".btn-group input[checked=checked]").each(function(t){""===t.get("value")?document.getElement("label[for="+t.get("id")+"]").addClass("active btn-primary"):"0"===t.get("value")?document.getElement("label[for="+t.get("id")+"]").addClass("active btn-danger"):document.getElement("label[for="+t.get("id")+"]").addClass("active btn-success"),void 0!==e&&e("*[rel=tooltip]").tooltip()}),document.getElements(".hasTip").each(function(t){var e=t.get("title");if(e){var n=e.split("::",2);t.store("tip:title",n[0]),t.store("tip:text",n[1])}});new Tips($$(".hasTip"),{maxTitleChars:50,fixed:!1})},watchPluginSelect:function(){document.id("adminForm").addEvent("change:relay(select.elementtype)",function(t,e){t.preventDefault();var n=e.get("value"),i=e.getParent(".pluginContainer"),a=""!==n?n+" "+Joomla.JText._("COM_FABRIK_LOADING").toLowerCase():Joomla.JText._("COM_FABRIK_PLEASE_SELECT");e.getParent(".actionContainer").getElement("span.pluginTitle").set("text",a);var o=i.id.replace("formAction_","").toInt();this.addPlugin(n,o)}.bind(this))},addPlugin:function(a,o){if(o="number"===typeOf(o)?o:this.pluginTotal,""!==a){var t=new Request.HTML({url:"index.php",data:{option:"com_fabrik",view:"plugin",format:"raw",type:this.type,plugin:a,c:o,id:this.id},update:document.id("plugins").getElements(".actionContainer")[o].getElement(".pluginOpts"),onRequest:function(){m.debug&&fconsole("Fabrik pluginmanager: Loading",this.type,"type",a,"for entry",o.toString())}.bind(this),onSuccess:function(){var t=document.id("plugins").getElements(".actionContainer")[o],e=t.getElement("span.pluginTitle"),n=a,i=t.getElement("input[name*=plugin_description]");i&&(n+=": "+i.getValue()),e.set("text",n),this.pluginTotal++,this.updateBootStrap(),FabrikAdmin.reTip()}.bind(this),onFailure:function(t){fconsole("Fabrik pluginmanager addPlugin ajax failed:",t)},onException:function(t,e){fconsole("Fabrik pluginmanager addPlugin ajax exception:",t,e)}});m.requestQueue.add(t)}else document.id("plugins").getElements(".actionContainer")[o].getElement(".pluginOpts").empty()},deletePlugin:function(t){var e=t.target.getParent("fieldset.pluginContainer");if("null"!==typeOf(e)){if(m.debug&&fconsole("Fabrik pluginmanager: Deleting",this.type,"entry",e.id,"and renaming later entries"),e.id.match(/_\d+$/)){var i=e.id.match(/_(\d+)$/)[1].toInt();document.id("plugins").getElements("input, select, textarea, label, fieldset").each(function(t){var e=t.name?t.name.match(/\[(\d+)\]/):null;if(!e&&t.id&&(e=t.id.match(/-(\d+)/)),!e&&"label"===t.get("tag").toLowerCase()&&t.get("for")&&(e=t.get("for").match(/-(\d+)/)),e){var n=e[1].toInt();i<n&&(n--,t.name&&(t.name=t.name.replace(/(\[)(\d+)(\])/,"["+n+"]")),t.id&&(t.id=t.id.replace(/(-)(\d+)/,"-"+n)),"label"===t.get("tag").toLowerCase()&&t.get("for")&&t.set("for",t.get("for").replace(/(-)(\d+)/,"-"+n)))}}),document.id("plugins").getElements("fieldset.pluginContainer").each(function(t){if(t.id.match(/formAction_\d+$/)){var e=t.id.match(/formAction_(\d+)$/)[1].toInt();i<e&&(e-=1,t.id=t.id.replace(/(formAction_)(\d+)$/,"$1"+e))}})}t.stop(),t.target.getParent(".actionContainer").dispose()}}})});