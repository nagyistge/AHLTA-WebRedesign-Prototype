/*
	UIZE JAVASCRIPT FRAMEWORK 2010-01-24

	http://www.uize.com/reference/Uize.Widget.Tree.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.Tree',required:'Uize.Node',builder:function(c_a){var c_b,c_c=false,c_d=Uize.Node;var c_e=c_a.subclass(),c_f=c_e.prototype;c_e.itemHasChildren=function(c_g){return!!(c_g&&c_g.items&&c_g.items.length);};c_e.itemIsDivider=function(c_g){return!!c_g&&c_g.title=='-'&& !c_e.itemHasChildren(c_g);};c_f.getTreeFromList=c_e.getTreeFromList=function(c_h){function c_i(c_h){var c_j='';if(c_h){if(c_h.nodeType==3)c_j=c_h.data;if(c_h.childNodes){var c_k=c_h.childNodes;for(var c_l= -1;++c_l<c_k.length;){var c_m=c_k[c_l];if(c_m.tagName=='UL'||c_m.tagName=='OL'){break;}else{c_j+=c_i(c_m);}}}}return c_j.replace(/^\s*/,'').replace(/\s*$/,'');}function c_n(c_h){var c_g=null;if(c_h){c_g={title:c_i(c_h),link:'',items:[]};var c_k=c_h.childNodes;for(var c_o= -1;++c_o<c_k.length;){c_h=c_k[c_o];if(c_h.tagName=='UL'||c_h.tagName=='OL'){c_g.expanded=c_h.style.display!='none';var c_k=c_h.childNodes;for(var c_l= -1;++c_l<c_k.length;){var c_m=c_k[c_l];c_m.tagName=='LI'&&c_g.items.push(c_n(c_m));}
}else if(c_h.tagName=='A'){c_g.link=c_h.getAttribute('href');var c_p=c_h.title;if(c_p)c_g.description=c_p;}}}return c_g;}var c_g=c_n(c_d.getById(c_h));return c_g?(/\S/.test(c_g.title)?[c_g]:c_g.items):[];};c_f.getTreeFromPage=c_e.getTreeFromPage=function(c_q,c_r){var c_s=document.all||document.getElementsByTagName('*'),c_t=c_s.length,c_u={},c_v,c_w=[],c_x={title:'Contents',link:''},c_y=0,c_z=[c_x],c_A=[],c_B=c_x,c_C='Uize_Widget_Tree',c_D,c_E=location.href,c_F=c_E.lastIndexOf('#');if(c_F> -1)c_E=c_E.slice(0,c_F);if(typeof c_r!='number')c_r=1;for(var c_G= -1;++c_G<c_q.length;){var c_H=c_q[c_G];c_u[c_H]=c_G;c_w.push('\\b'+c_H+'\\b');}c_v=new RegExp(c_w.join('|'));for(var c_o= -1;++c_o<c_t;){var c_h=c_s[c_o],c_I=c_h.className;if(c_I){var c_J=c_I.match(c_v);if(c_J){var c_K=c_u[c_J[0]];if(c_K>c_y){c_z[c_K]=c_B.items[c_B.items.length-1];c_y=c_K;c_B=c_z[c_y];}else if(c_K<c_y){c_y=c_K;c_B=c_z[c_y];}c_A.length=c_y;if(!c_B.items){c_B.items=[];c_B.expanded=c_y<c_r;}c_A.push(c_B.items.length);c_D=c_C+'_'+c_A.join('_');
c_B.items.push({title:c_d.getText(c_h),link:c_E+'#'+c_D});c_d.injectHtml(c_h,'<a name="'+c_D+'"></a>','outer top');c_t++;c_o++;}}}return[c_x];};c_f.c_L=function(c_A){return(typeof c_A=='string'?c_A:this.c_M(c_A).c_A);};c_f.c_M=function(c_A){var c_N=this,c_g,c_O=c_N.c_O,c_P=[],c_Q=c_e.isArray(c_A),c_R=c_N.c_R,c_S=c_Q?c_A:c_A.split(c_R),c_T=c_S.length;for(var c_U= -1;++c_U<c_T;){var c_V=c_S[c_U];if(c_Q&&typeof c_V=='string')c_V=c_e.findRecordNo(c_O,{title:c_V});c_g=c_O[c_V];if(c_g){c_O=c_g.items;c_P.push(c_V);}else{break;}}return{c_g:c_g,c_A:c_g?c_P.join(c_R):''};};c_f.getItemFromSpecifier=function(c_A){return this.c_M(c_A).c_g;};c_f.setExpandedDepth=function(c_W,c_A){var c_N=this;c_N.traverseTree({itemHandler:function(c_g,c_A,c_X){c_N.setItemExpanded(c_A,c_X<c_W);},itemSpecifier:c_A});};c_f.setItemExpanded=function(c_A,c_Y){var c_g=this.getItemFromSpecifier(c_A);c_g.expanded=typeof c_Y=='boolean'?c_Y:c_g.expanded===c_c;};c_f.collapseAllBut=function(c_Z){var c_N=this,c_R=c_N.c_R;c_Z=c_N.c_L(c_Z);
c_N.traverseTree({itemHandler:function(c_g,c_A){c_N.setItemExpanded(c_A,!(c_Z+c_R).indexOf(c_A+c_R));}});};c_f.traverseTree=function(c_0){var c_N=this,c_A=c_0.itemSpecifier,c_R=c_N.c_R,c_1=function(){},c_2=c_0.itemHandler||c_1,c_3=c_0.beforeSubItemsHandler||c_1,c_4=c_0.afterSubItemsHandler||c_1;function c_5(c_g,c_A,c_X){c_2(c_g,c_A,c_X);var c_6=c_g.items;if(c_6&&c_6.length){c_3(c_g,c_A,c_X);c_7(c_6,c_A+c_R,c_X+1);c_4(c_g,c_A,c_X);}}function c_7(c_O,c_8,c_X){for(var c_9= -1,c_ba=c_O.length;++c_9<c_ba;)c_5(c_O[c_9],c_8+c_9,c_X);}if(c_A){c_A=c_N.c_L(c_A);c_5(c_N.getItemFromSpecifier(c_A),c_A,0);}else{c_7(c_N.c_O,'',0);}};c_e.registerProperties({c_R:{name:'itemDelimiter',value:'x'},c_O:{name:'items',value:[],onChange:function(){var c_N=this;if(c_N.isWired){c_N.removeUi();c_N.insertUi();}}},c_bb:{name:'value',value:[]}});c_e.set({built:c_c});return c_e;}});