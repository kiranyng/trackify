(this.webpackJsonptrackify=this.webpackJsonptrackify||[]).push([[0],{101:function(e,t,a){},102:function(e,t,a){},103:function(e,t,a){},104:function(e,t,a){},110:function(e,t,a){},111:function(e,t,a){},112:function(e,t,a){},113:function(e,t,a){},114:function(e,t,a){},115:function(e,t,a){},116:function(e,t,a){},117:function(e,t,a){},118:function(e,t,a){},119:function(e,t,a){},120:function(e,t,a){},122:function(e,t,a){},134:function(e,t){},148:function(e,t){},184:function(e,t){},186:function(e,t,a){},196:function(e,t,a){},197:function(e,t,a){},198:function(e,t,a){},199:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(19),o=a.n(l),i=(a(101),a(89)),c=a.n(i),d=(a(102),a(8)),s=a(5);a(103),a(104);var m=function(e){return r.a.createElement("div",{className:"App-branding"},r.a.createElement("img",{className:"App-logo",src:e.appIcon,alt:"logo"}),r.a.createElement("span",{className:"App-title"},e.appTitle))},u=a(2),f=a(3),p=a(1);a(57);var E=function(e,t){var a=e.item&&e.item.children&&e.item.children.length>0;return a?r.a.createElement("li",null,r.a.createElement("span",{className:"menu-caret menu-caret-down"}," ",r.a.createElement(d.b,{to:"/explore/".concat(e.item.id)},e.item.name," ")),a&&r.a.createElement(b,{items:e.item.children,isNested:!0})):r.a.createElement("li",null,r.a.createElement(d.b,{to:"/explore/".concat(e.item.id)},e.item.name," "))};var v=Object(p.b)((function(e,t){var a=t.folder_id?t.folder_id:"$",n=e.content[a],r=n.name,l=n.fldr,o=[];if(l)for(var i=0,c=Object.entries(l);i<c.length;i++){var d=Object(f.a)(c[i],2),s=d[0];d[1];o.push(e.content[s])}return Object(u.a)(Object(u.a)({},t),{},{id:a,name:r,subfolders:o})}))((function(e){var t,a=e.subfolders.length?"menu-nested":"";return t=e.subfolders.map((function(e){var t=Object.keys(e.fldr);return t&&t.length>0?r.a.createElement(v,{key:e.id,folder_id:e.id}):r.a.createElement(E,{key:e.id,item:e})})),"$"===e.id?r.a.createElement("nav",{className:"Project-structure-nav","aria-label":"folder structure"},r.a.createElement("span",{className:"menu-caret"}," ",r.a.createElement(d.b,{to:"/explore"}," Home ")," "),r.a.createElement("ul",{className:"tree-menu ".concat(a)},t)):r.a.createElement("li",null,r.a.createElement("span",{className:"menu-caret"}," ",r.a.createElement(d.b,{to:"/explore/".concat(e.id)},e.name," ")," "),r.a.createElement("ul",{className:"tree-menu ".concat(a)},t))})),b=v;a(110);var y=function(e){return r.a.createElement("div",{className:"Page-content"},r.a.createElement("h1",null,e.title),e.children)};a(111);var h=function(e){return r.a.createElement("div",{className:"Grid-view Grid-view-".concat(e.cols&&e.cols<=6&&e.cols>0?e.cols:3,"-cols")},e.children)},k=(a(112),a(113),Object(n.forwardRef)((function(e,t){var a=r.a.useState(!1),l=Object(f.a)(a,2),i=l[0],c=l[1];return Object(n.useImperativeHandle)(t,(function(){return{openModal:function(){c(!0)},closeModal:function(){c(!1)}}})),i?o.a.createPortal(r.a.createElement("div",{className:"Modal-dialog",role:"dialog"},r.a.createElement("div",{onClick:t.current.closeModal,className:"Modal-overlay"}),r.a.createElement("div",{className:"Modal-box"},e.title?r.a.createElement("div",{className:"Modal-title"}," ",e.title," "):"",r.a.createElement("div",{className:"Modal-content"},e.children))),document.getElementById("modal-root")):null}))),g=a(95),N=a(24),j="project/init",O="project/load",w="project/folder/create-note",C="project/folder/edit-note",T="project/folder/delete-note",S="project/folder/create-task",M="project/folder/edit-task",x="project/folder/delete-task",F="project/folder/start-task",D="project/folder/resolve-task",_="project/folder/reject-task",J="project/folder/reopen-task",R=function(e,t){return{type:w,payload:Object(u.a)({folder:e},t)}},I=function(e,t){return{type:C,payload:Object(u.a)({folder:e},t)}},B=function(e,t){return{type:D,payload:{folder:e,id:t}}},L=function(e,t){return{type:_,payload:{folder:e,id:t}}},A=function(e,t){return{type:J,payload:{folder:e,id:t}}},$=function(e,t){return{type:"project/timer/stop-task",payload:{folder:e,id:t}}};a(114);var H=function(e){return r.a.createElement("div",{className:"Simple-list"},e.children)};a(115);var q=Object(p.b)((function(e,t){var a={},n="";if("create"!==t.mode&&t.item_id){if(!e.content[t.item_id])throw Error("Folder with id ".concat(t.item_id," not found!"));n=(a=e.content[t.item_id]).folder}else{if(!t.folder||!e.content[t.folder])throw Error("folder attribute must be a valid one for 'create' mode");n=t.folder}return Object(u.a)(Object(u.a)({},t),{},{item:a,folder:n})}),(function(e){return{updateFolder:function(t){return e({type:"project/edit-folder",payload:{id:t.id,data:t}})},createFolder:function(t,a){return e(function(e,t){return{type:"project/create-folder",payload:{name:e,folder:t}}}(t,a))}}}))((function(e){return r.a.createElement("div",{className:"Edit-folder"},r.a.createElement("form",{onSubmit:function(t){var a;t.preventDefault();var n,r=new FormData(t.target),l={},o=Object(N.a)(r.entries());try{for(o.s();!(n=o.n()).done;){var i=Object(f.a)(n.value,2),c=i[0],d=i[1];l[c]=d}}catch(s){o.e(s)}finally{o.f()}if((a=console).log.apply(a,["Form data:"].concat(Object(g.a)(r))),"create"===e.mode?e.createFolder(l.name,e.folder):e.updateFolder(l),e.onFinish)try{e.onFinish()}catch(m){console.error(m.message)}},"aria-label":"Folder details"},r.a.createElement(H,null,r.a.createElement("label",{htmlFor:"name"},"Folder name"),e.item.id?r.a.createElement("input",{type:"hidden",name:"id",value:e.item.id}):"",r.a.createElement("input",{type:"text",name:"name",defaultValue:e.item.name})),r.a.createElement("div",{className:"Modal-buttons"},r.a.createElement("input",{type:"submit",value:"Save"}))))}));var G=function(e){var t=r.a.useRef();return r.a.createElement("li",null,r.a.createElement("div",{tabIndex:"0",role:"button",arialabel:"create folder",className:"Folder-name",onClick:function(e){t.current.openModal()}},r.a.createElement("span",{className:"Create-folder-item-icon"},"NEW Folder")),r.a.createElement(k,{ref:t,title:"Create new folder"},r.a.createElement(q,{mode:"create",folder:e.folder,onFinish:function(e){t.current.closeModal()}})))},P=(a(116),function(e){return r.a.createElement("span",{className:"icon icon-".concat(e.type)}," ",e.text," ")}),V=(a(117),function(e){return r.a.createElement("button",{className:"Action-icon","aria-label":e.arialabel?e.arialabel:e.type,onClick:e.onClick},r.a.createElement(P,{type:e.type,text:e.text}))});var W=Object(p.b)(null,(function(e,t){return{deleteFolder:function(){return e({type:"project/delete-folder",payload:{id:t.item.id}})}}}))((function(e){var t=r.a.useRef();return r.a.createElement("li",null,r.a.createElement("div",{onContextMenu:function(e){e.preventDefault(),alert("folder right clicked")}},r.a.createElement(d.b,{to:"/explore/".concat(e.item.id)}," ",e.item.name," "),r.a.createElement(V,{type:"edit",arialabel:"edit",onClick:function(){t.current.openModal()}}),r.a.createElement(V,{type:"bin",arialabel:"delete",onClick:function(){window.confirm("Really want to delete folder '".concat(e.item.name,"'?"))&&e.deleteFolder()}})),r.a.createElement(k,{ref:t,title:"Rename folder from '".concat(e.item.name,"'")},r.a.createElement(q,{item_id:e.item.id,onFinish:function(e){console.log("Editing finished!"),t.current.closeModal()}})))}));var U=Object(p.b)((function(e,t){var a=e.content[t.folder]&&e.content[t.folder].fldr,n=[],r=t.folder;if(a)for(var l=0,o=Object.entries(a);l<o.length;l++){var i=Object(f.a)(o[l],2),c=i[0];i[1];n.push(e.content[c])}return{list:n,folder:r}}))((function(e){return r.a.createElement("div",{className:"Folder-grid-view",role:"region","aria-label":"Folders list"},r.a.createElement("ul",{className:"Folders-list"},r.a.createElement(G,{folder:e.folder}),0===e.list.length?r.a.createElement("li",null,r.a.createElement("div",{className:"Folder-no-subfolders"},"No subfolders!")):"",e.list.map((function(e,t){return r.a.createElement(W,{key:e.id,item:e})}))))}));a(118),a(119);var z=Object(p.b)((function(e,t){if(t.item_id){var a=e.content[t.folder].tasks[t.item_id];return Object(u.a)(Object(u.a)({},t),{},{item:a})}return Object(u.a)({},t)}),(function(e,t){return{createTask:function(t,a){return e(function(e,t){return{type:S,payload:Object(u.a)({folder:e},t)}}(t,a))},editTask:function(t,a){return e(function(e,t){return{type:M,payload:Object(u.a)({folder:e},t)}}(t,a))}}}))((function(e){return r.a.createElement("div",{className:"Edit-task"},r.a.createElement("form",{onSubmit:function(t){if(t.preventDefault(),1==e.preview)return!1;var a,n=new FormData(t.target),r={},l=Object(N.a)(n.entries());try{for(l.s();!(a=l.n()).done;){var o=Object(f.a)(a.value,2),i=o[0],c=o[1];console.log(i,c),r[i]=c}}catch(d){l.e(d)}finally{l.f()}if(e.item?e.editTask(e.folder,r):(r.progress=0,r.status="open",e.createTask(e.folder,r)),e.onFinish)try{e.onFinish()}catch(s){console.error(s.message)}},"aria-label":"Task details"},e.item?r.a.createElement("input",{type:"hidden",name:"id",value:e.item.id}):"",e.item?r.a.createElement("input",{type:"hidden",name:"folder",value:e.item.folder}):"",r.a.createElement(H,null,r.a.createElement("label",{htmlFor:"title"},"Title"),r.a.createElement("input",{readOnly:e.preview,type:"text",name:"title",defaultValue:e.item?e.item.title:""})),r.a.createElement(H,null,r.a.createElement("label",{htmlFor:"description"},"Description"),r.a.createElement("textarea",{readOnly:e.preview,name:"description",defaultValue:e.item?e.item.description:""})),r.a.createElement(H,null,r.a.createElement("label",{htmlFor:"tasknotes"},"Task notes"),r.a.createElement("textarea",{readOnly:e.preview,name:"tasknotes",defaultValue:e.item?e.item.tasknotes:""})),r.a.createElement(H,null,r.a.createElement("label",{htmlFor:"priority"},"Priority"),r.a.createElement("select",{disabled:e.preview,name:"priority",defaultValue:e.item?e.item.priority:"45"},r.a.createElement("option",{value:"100"},"Critical"),r.a.createElement("option",{value:"85"},"Very High"),r.a.createElement("option",{value:"65"},"High"),r.a.createElement("option",{value:"45"},"Medium"),r.a.createElement("option",{value:"15"},"Low"))),r.a.createElement(H,null,r.a.createElement("label",{htmlFor:"estimate"},"Estimate (in mins)"),r.a.createElement("input",{readOnly:e.preview,type:"number",name:"estimate",defaultValue:e.item?e.item.estimate:"60"})),r.a.createElement(H,null,r.a.createElement("label",{htmlFor:"datetime-local"},"Deadline"),r.a.createElement("input",{readOnly:e.preview,type:"date",name:"deadline",defaultValue:e.item?e.item.deadline:""})),e.preview?"":r.a.createElement("div",{className:"Modal-buttons"},r.a.createElement("input",{type:"submit",value:"Save"}))))}));var Y=function(e){var t=r.a.useRef();return r.a.createElement("li",{className:"Task-create"},r.a.createElement("div",{tabIndex:"0",role:"button",arialabel:"create task",onClick:function(){t.current.openModal()}},r.a.createElement("span",{className:"Create-task-icon"},"NEW Task")),r.a.createElement(k,{ref:t,title:"Create new task"},r.a.createElement(z,{folder:e.folder,onFinish:function(){t.current.closeModal()}})))};var K=Object(p.b)(null,(function(e,t){var a=Date.now();return{start:function(){return e(function(e,t,a){return{type:F,payload:{folder:e,id:t,timestamp:a}}}(t.item.folder,t.item.id,a))},resolve:function(){return e(B(t.item.folder,t.item.id))},reject:function(){return e(L(t.item.folder,t.item.id))},reopen:function(){return e(A(t.item.folder,t.item.id))},delete:function(){return e((a=t.item.folder,n=t.item.id,{type:x,payload:{folder:a,id:n}}));var a,n},track:function(){return e((a=t.item.folder,n=t.item.id,{type:"project/timer/track-task",payload:{folder:a,id:n}}));var a,n}}}))((function(e){var t=r.a.useRef(),a=e.item.status?e.item.status:"open",n="";return"resolved"===a?n="task-listitem-resolved":"rejected"===a?n="task-listitem-rejected":"inprogress"===a&&(n="task-listitem-inprogress"),r.a.createElement("li",{className:"task-listitem ".concat(n)},r.a.createElement("div",null,"open"===a||"reopen"===a?r.a.createElement("div",null,r.a.createElement(V,{type:"accept",arialabel:"resolve task",onClick:function(){e.resolve()}}),r.a.createElement(V,{type:"reject",arialabel:"reject task",onClick:function(){e.reject()}})):r.a.createElement("div",null,r.a.createElement(V,{type:"refresh",onClick:function(){window.confirm("Really want to reopen task '".concat(e.item.title,"'?"))&&e.reopen()}}))),r.a.createElement("div",{role:"button",tabIndex:"0","aria-label":e.item.title,className:"task-listitem-title ".concat(n),onClick:function(){t.current.openModal()}}," ",e.item.title," "),r.a.createElement("div",null,"open"===a||"reopen"===a?r.a.createElement(V,{type:"play",arialabel:"add to timer queue",onClick:function(){e.start(),e.track()}}):"",r.a.createElement(V,{type:"bin",arialabel:"delete",onClick:function(){window.confirm("Really want to delete task '".concat(e.item.title?e.item.title:"Empty note","'?"))&&e.delete()}})),r.a.createElement(k,{ref:t,title:"Task details"},r.a.createElement(z,{item_id:e.item.id,folder:e.item.folder,onFinish:function(){t.current.closeModal()}})))}));var Q=Object(p.b)((function(e,t){var a=e.content[t.folder]&&e.content[t.folder].tasks,n=[];if(a)for(var r=0,l=Object.entries(a);r<l.length;r++){var o=Object(f.a)(l[r],2),i=(o[0],o[1]);n.push(i)}return{list:n}}))((function(e){return r.a.createElement("div",{className:"Task-list-region",role:"region","aria-label":"Tasks list"},r.a.createElement("ul",{className:"Tasks-list"},r.a.createElement(Y,{folder:e.folder}),0===e.list.length?r.a.createElement("li",null,"No tasks!!"):"",e.list.map((function(t,a){return r.a.createElement(K,{folder:e.folder,key:t.id,item:t})}))))})),X=(a(120),a(32)),Z=a.n(X);a(122);var ee=Object(p.b)((function(e,t){if(t.item_id){var a=e.content[t.folder].notes[t.item_id];return Object(u.a)(Object(u.a)({},t),{},{item:a})}return Object(u.a)({},t)}),(function(e,t){return{createNote:function(t,a){return e(R(t,a))},editNote:function(t,a){return e(I(t,a))}}}))((function(e){var t=r.a.useState(e.item&&e.item.text?e.item.text:""),a=Object(f.a)(t,2),l=a[0],o=a[1],i=Object(n.useRef)();return e.item_id?r.a.createElement("div",{className:"Note-view"},r.a.createElement(Z.a,{innerRef:i,html:l,disabled:!1,onChange:function(t){var a=e.item.text,n={text:t.target.value};n.text!==a&&(e.item_id?(n.id=e.item_id,e.editNote(e.folder,n),o(t.target.value)):e.createNote(e.folder,n))}})):r.a.createElement("form",{onSubmit:function(t){t.preventDefault();var a,n={},r=new FormData(t.target),l=Object(N.a)(r.entries());try{for(l.s();!(a=l.n()).done;){var o=Object(f.a)(a.value,2),i=o[0],c=o[1];n[i]=c}}catch(d){l.e(d)}finally{l.f()}if(console.log("note update data:",n),e.item_id?e.editNote(e.folder,n):(n.title=n.text.substring(0,30),n.text=n.text,e.createNote(e.folder,n)),!e.item_id&&e.onFinish)try{e.onFinish()}catch(s){console.error(s.message)}},"aria-label":"Take a note"},r.a.createElement("input",{type:"hidden",name:"folder",defaultValue:e.folder}),e.item_id?r.a.createElement("input",{type:"hidden",name:"id",value:e.item_id}):"",r.a.createElement(H,null,r.a.createElement("label",{htmlFor:"text"},"Note"),r.a.createElement("textarea",{className:"Note-textarea",name:"text",defaultValue:e.item?e.item.text:""})),r.a.createElement("div",{className:"Modal-buttons"},r.a.createElement("input",{type:"submit",value:"Save"})))}));var te=function(e){var t=r.a.useRef();return r.a.createElement("li",null,r.a.createElement("div",{tabIndex:"0",role:"button",arialabel:"create note",className:"Note-listitem-title",onClick:function(){t.current.openModal()}},r.a.createElement("span",{className:"Create-note-icon"},"NEW Note")),r.a.createElement(k,{ref:t,title:"Create a new note"},r.a.createElement(ee,{folder:e.folder,onFinish:function(){t.current.closeModal()}})))},ae=a(33),ne=a(35),re=a(34),le=a(56),oe=a.n(le),ie=function(e){Object(ne.a)(a,e);var t=Object(re.a)(a);function a(e){var n;return Object(ae.a)(this,a),(n=t.call(this,e)).handleChange=function(e){var t=document.createElement("div");t.innerHTML=oe()(e.target.value);var a=t.textContent.substring(0,30);n.props.editNote(n.props.folder,Object(u.a)(Object(u.a)({},n.props.item),{},{title:a,text:e.target.value})),n.setState({html:e.target.value})},n.sanitizeConf={allowedTags:["b","i","em","strong","a","p","h1","h3","h5"],allowedAttributes:{a:["href"]}},n.sanitize=function(){n.setState({html:oe()(n.state.html,n.sanitizeConf)})},n.toggleEditable=function(){n.setState({editable:!n.state.editable})},n.render=function(){return r.a.createElement("div",{className:"Note-view"},r.a.createElement("div",{className:"Note-view-controls-left"},r.a.createElement(ce,{cmd:"formatBlock",arg:"h1",name:"H1"}),r.a.createElement(ce,{cmd:"formatBlock",arg:"h2",name:"H2"}),r.a.createElement(ce,{cmd:"formatBlock",arg:"h3",name:"H3"}),r.a.createElement(ce,{cmd:"formatBlock",arg:"h4",name:"H4"}),r.a.createElement(ce,{cmd:"bold",name:"B"}),r.a.createElement(ce,{cmd:"italic",name:"i"}),r.a.createElement("button",{onMouseDown:function(e){e.preventDefault()}}),r.a.createElement(de,{cmd:"ForeColor",color:"black"}),r.a.createElement(de,{cmd:"ForeColor",color:"white"}),r.a.createElement(de,{cmd:"ForeColor",color:"#452977"}),r.a.createElement(de,{cmd:"ForeColor",color:"#2ce82c"}),r.a.createElement(de,{cmd:"ForeColor",color:"#427be6"}),r.a.createElement(de,{cmd:"ForeColor",color:"#d24bd2"}),r.a.createElement(de,{cmd:"ForeColor",color:"#1bca58"}),r.a.createElement(de,{cmd:"ForeColor",color:"orange"}),r.a.createElement(de,{cmd:"ForeColor",color:"red"})),r.a.createElement(Z.a,{className:"editable",tagName:"pre",html:n.state.html,disabled:!n.state.editable,onChange:n.handleChange}),r.a.createElement("div",{className:"Note-view-controls-right"},r.a.createElement(ce,{cmd:"createLink",arg:"https://github.com/lovasoa/react-contenteditable",name:"L"}),r.a.createElement(ce,{cmd:"insertOrderedList",name:"OL"}),r.a.createElement(ce,{cmd:"insertUnorderedList",name:"UL"}),r.a.createElement(ce,{cmd:"indent",name:">"}),r.a.createElement(ce,{cmd:"outdent",name:"<"}),r.a.createElement("button",{onMouseDown:function(e){e.preventDefault()}},"\xa0"),r.a.createElement("button",{onMouseDown:function(e){e.preventDefault()}}),r.a.createElement(de,{cmd:"BackColor",color:"black"}),r.a.createElement(de,{cmd:"BackColor",color:"white"}),r.a.createElement(de,{cmd:"BackColor",color:"rgb(189 153 255)"}),r.a.createElement(de,{cmd:"BackColor",color:"#2ce82c"}),r.a.createElement(de,{cmd:"BackColor",color:"#427be6"}),r.a.createElement(de,{cmd:"BackColor",color:"#d24bd2"}),r.a.createElement(de,{cmd:"BackColor",color:"#1bca58"}),r.a.createElement(de,{cmd:"BackColor",color:"orange"}),r.a.createElement(de,{cmd:"BackColor",color:"red"})))},n.state={html:n.props.item.text,editable:"preview"!==n.props.mode},n}return a}(r.a.Component);function ce(e){return r.a.createElement("button",{key:e.cmd,onMouseDown:function(t){if(t.preventDefault(),"createLink"===e.cmd){var a=prompt("Enter URL","https://"),n=document.getSelection();document.execCommand("insertHTML",!1,'<a href="'+a+'" target="_blank">'+n+"</a>")}else document.execCommand(e.cmd,!1,e.arg)}},e.name||e.cmd)}function de(e){return r.a.createElement("button",{style:{backgroundColor:e.color},key:e.cmd,onMouseDown:function(t){t.preventDefault(),document.execCommand(e.cmd,!1,e.color)}},"\xa0")}var se=Object(p.b)((function(e,t){if(t.item_id)return{item:e.content[t.folder].notes[t.item_id]}}),(function(e){return{createNote:function(t,a){return e(R(t,a))},editNote:function(t,a){return e(I(t,a))}}}))(ie);var me=Object(p.b)(null,(function(e,t){return{deleteNote:function(){var a,n;e((a=t.item.folder,n=t.item.id,{type:T,payload:{folder:a,id:n}}))}}}))((function(e){var t=r.a.useRef(),a=r.a.useRef(),n=e.item.title;return r.a.createElement("li",null,r.a.createElement("div",{role:"button","aria-label":n,tabIndex:"0",className:"Note-listitem-title",onClick:function(){a.current.openModal()}},n," "),r.a.createElement("div",null,r.a.createElement(V,{type:"edit",arialabel:"edit",onClick:function(){t.current.openModal()}}),r.a.createElement(V,{type:"bin",arialabel:"delete",onClick:function(){window.confirm("Really want to delete note '".concat(e.item.title,"'?"))&&e.deleteNote()}})),r.a.createElement(k,{ref:a},r.a.createElement(se,{folder:e.folder,onFinish:function(){a.current.closeModal()},item_id:e.item.id,mode:"preview"})),r.a.createElement(k,{ref:t},r.a.createElement(se,{folder:e.folder,onFinish:function(){t.current.closeModal()},item_id:e.item.id})))}));var ue=Object(p.b)((function(e,t){var a=e.content[t.folder]&&e.content[t.folder].notes,n=[];if(a)for(var r=0,l=Object.entries(a);r<l.length;r++){var o=Object(f.a)(l[r],2),i=(o[0],o[1]);n.push(i)}return Object(u.a)(Object(u.a)({},t),{},{list:n})}))((function(e){return r.a.createElement("div",{className:"Notes-list-region",role:"region","aria-label":"Notes list"},r.a.createElement("ul",{className:"Notes-list"},r.a.createElement(te,{folder:e.folder}),0===e.list.length?r.a.createElement("li",null,"No Notes!"):"",e.list.map((function(t,a){return r.a.createElement(me,{key:t.id,folder:e.folder,item:t})}))))})),fe=a(91),pe=(a(186),function(e){Object(ne.a)(a,e);var t=Object(re.a)(a);function a(){return Object(ae.a)(this,a),t.apply(this,arguments)}return Object(fe.a)(a,[{key:"render",value:function(){return r.a.createElement("ul",{className:"Folder-breadcrumbs-container"},r.a.createElement("li",null,"$"!==this.props.folder?r.a.createElement(d.b,{to:"/explore"}," Home "):"",r.a.createElement("span",null," / ")),this.props.parentFolders.slice(0).reverse().map((function(e,t){return r.a.createElement("li",{key:e.id},r.a.createElement(d.b,{to:"/explore/".concat(e.id)},e.name),r.a.createElement("span",null," / "))})))}}]),a}(r.a.Component)),Ee=Object(p.b)((function(e,t){for(var a=[],n=e.content[e.content[t.folder].folder];n&&"$"!==n.id;)a.push(n),n=e.content[n.folder];return Object(u.a)({parentFolders:a},t)}))(pe),ve=Object(p.b)((function(e,t){var a=t.folder?t.folder:t.match.params.folder?t.match.params.folder:"$";return{folder:a,title:"$"===a?"Explorer":e.content[a].name}}))((function(e){return r.a.createElement(y,{title:e.title},r.a.createElement("div",null,r.a.createElement(Ee,{folder:e.folder})),r.a.createElement(h,{cols:"3"},r.a.createElement(U,{folder:e.folder}),r.a.createElement(Q,{folder:e.folder}),r.a.createElement(ue,{folder:e.folder})))})),be=(a(187),a(188),a(16)),ye=a(92),he=function(e){return r.a.createElement("div",null,r.a.createElement(V,{type:"play"},"Start"),r.a.createElement(V,{type:"accept"},"Accept"),r.a.createElement(V,{type:"reject"},"Reject"))},ke=function(e){return r.a.createElement("progress",{value:e.data.progress,max:"100"}," ",e.data.progress," ")},ge=Object(p.b)((function(e,t){var a=e.content.$&&e.content.$.tasks,n=[];if(a)for(var r=0,l=Object.entries(a);r<l.length;r++){var o=Object(f.a)(l[r],2),i=o[0],c=o[1];console.log("".concat(i,": ").concat(c)),n.push(c)}return{todoList:n}}),(function(e,t){return{}}))((function(e){var t=r.a.useState(e.todoList),a=Object(f.a)(t,2),n=a[0];a[1];return r.a.createElement("div",{className:"ag-theme-alpine"},r.a.createElement("h3",null,"Todays Tasks"),r.a.createElement(ye.AgGridReact,{domLayout:"autoHeight",rowData:n,frameworkComponents:{taskProgress:ke,actionCellRenderer:he},onRowClicked:function(e){console.log("ROW CLICKED!",e.data)}},r.a.createElement(be.AgGridColumn,{field:"priority",sortable:!0}),r.a.createElement(be.AgGridColumn,{field:"title",filter:!0}),r.a.createElement(be.AgGridColumn,{field:"estimate",sortable:!0,filter:!0}),r.a.createElement(be.AgGridColumn,{field:"deadline",sortable:!0,filter:!0}),r.a.createElement(be.AgGridColumn,{field:"status",filter:!0}),r.a.createElement(be.AgGridColumn,{field:"progress",cellRenderer:"taskProgress"}),r.a.createElement(be.AgGridColumn,{field:"actions",cellRenderer:"actionCellRenderer"})))}));var Ne=function(){return r.a.createElement(y,{title:"Dashboard"},r.a.createElement(ge,null))},je=(a(196),function(){return r.a.createElement("nav",{"aria-label":"Main"},r.a.createElement("ul",{className:"main-side-nav"},r.a.createElement("li",null,r.a.createElement(d.b,{to:"/"},"Dashboard")),r.a.createElement("li",null,r.a.createElement(d.b,{to:"/explore"},"Explorer"))))}),Oe=(a(197),a(198),Object(p.b)((function(e,t){if(!t.data)throw new Error("Task details must be wrapped within an object with name `data`");var a=!!t.data.startTimeStamp,n=new Date(a?t.data.startTimeStamp:Date.now()),r=new Date(+n+60*t.data.estimate*1e3);return{id:t.data.id,folder:t.data.folder,title:t.data.title,startDateTime:n,estimatedEndDateTime:r,progress:t.data.progress,isTimer:a}}),(function(e,t){return{rejectTask:function(){e(L(t.data.folder,t.data.id)),e($(t.data.folder,t.data.id))},resolveTask:function(){e(B(t.data.folder,t.data.id)),e($(t.data.folder,t.data.id))},reopenTask:function(){e($(t.data.folder,t.data.id)),e(A(t.data.folder,t.data.id))}}}))((function(e){var t=Object(n.useRef)(),a=Date.now(),l=(+a-+e.startDateTime)/(+e.estimatedEndDateTime-+e.startDateTime)*100,o=e.estimatedEndDateTime-a,i=Math.floor(o/1e3),c=Math.floor(i/3600),d=Math.abs(60*c-Math.floor(i/60)),s=Math.abs(i-(60*c*60+60*d)),m=r.a.useState(c),u=Object(f.a)(m,2),p=u[0],E=u[1],v=r.a.useState(d),b=Object(f.a)(v,2),y=b[0],h=b[1],g=r.a.useState(s),N=Object(f.a)(g,2),j=N[0],O=N[1],w=r.a.useState(l),C=Object(f.a)(w,2),T=C[0],S=C[1],M=r.a.useState(!1),x=Object(f.a)(M,2),F=x[0],D=x[1];r.a.useEffect((function(){var t=setInterval((function(){var a=Date.now(),n=(+a-+e.startDateTime)/(+e.estimatedEndDateTime-+e.startDateTime)*100,r=e.estimatedEndDateTime-a,l=Math.floor(r/1e3),o=Math.floor(l/3600),i=Math.abs(60*o-Math.floor(l/60)),c=Math.abs(l-(60*o*60+60*i));E(o),h(i),O(c),S(n),n>=100&&(clearInterval(t),D(!0))}),1e3);return function(){return clearInterval(t)}}),[]);return r.a.createElement("li",{className:"Timer-taskbaritem"},r.a.createElement("div",{className:"Timer-taskbaritem-summary"},e.isTimer?F?r.a.createElement("div",{className:"task-timer-warning"},r.a.createElement(P,{type:"warning"}),"Timeup!!"):r.a.createElement("div",{className:"task-timer-countdown",role:"timer"},r.a.createElement("span",null,p<10?"0"+p:p),r.a.createElement("span",null,":"),r.a.createElement("span",null,y<10?"0"+y:y),r.a.createElement("span",null,":"),r.a.createElement("span",null,j<10?"0"+j:j),r.a.createElement("progress",{value:T,max:"100"})):r.a.createElement("div",{className:"task-timer-title"}," ",e.title," ")),r.a.createElement("div",{className:"task-timer-detailview"},r.a.createElement("div",{className:"task-timer-title",onClick:function(){t.current.openModal()}}," ",e.title," "),r.a.createElement("div",null,r.a.createElement("div",{className:"task-timer-targettime"},e.estimatedEndDateTime.toLocaleString([],{hour12:!0}))),r.a.createElement("div",{className:"task-timer-actions"},r.a.createElement(V,{type:"accept",onClick:function(){e.resolveTask()}},"Accept"),r.a.createElement(V,{type:"reject",onClick:function(){e.rejectTask()}},"Reject"),r.a.createElement(V,{type:"refresh",onClick:function(){e.reopenTask()}},"Reset and Remove"))),r.a.createElement(k,{ref:t,title:"Preview Task"},r.a.createElement(z,{folder:e.folder,item_id:e.id,onFinish:function(){t.current.closeModal()},preview:!0})))}))),we=Object(p.b)((function(e){return{activeTask:e.task_timers.active,taskList:e.task_timers.queue}}),(function(e){return{startNext:function(t){e({type:"project/timer/start-task",payload:{startTimeStamp:t}})}}}))((function(e){return r.a.useEffect((function(){null==e.activeTask&&e.taskList.length>0&&e.startNext(Date.now())})),r.a.createElement("ul",{className:"Timer-taskbar"},e.activeTask?r.a.createElement(Oe,{data:e.activeTask}):"",e.taskList.map((function(e){return r.a.createElement(Oe,{key:e.id,data:e})})))})),Ce=["\u201c You can have it all. Just not all at once. \u201d","\u201c You may delay, but time will not. \u201d","\u201c Tomorrow is often the busiest day of the week. \u201d","\u201c The bad news is time flies. The good news is you\u2019re the pilot \u201d","\u201c Never look back unless you are planning to go that way. \u201d","\u201c Never begin the day until it is finished on paper. \u201d","\u201c A man who dares to waste one hour of life has not discovered the value of life. \u201d","\u201c If I had six hours to chop down a tree, I would spend the first four hours sharpening the axe. \u201d","\u201c The key is in not spending time, but in investing it. \u201d","\u201c One can find time for everything if one is never in a hurry. \u201d","\u201c To do two things at once is to do neither. \u201d","\u201c The shorter way to do many things is to only do one thing at a time. \u201d","\u201c Be like a postage stamp \u2014 stick to one thing until you get there. \u201d","\u201c One always has time enough, if one will apply it well. \u201d","\u201c Your future is created by what you do today, not tomorrow. \u201d","\u201c The time you `Enjoy` wasting is not wasted time. \u201d","\u201c If you don\u2019t know where you are going, you\u2019ll end up someplace else. \u201d","\u201c Unless commitment is made, there are only promises and hopes; but no plans. \u201d","\u201c Making a plan without the right tools is like making spaghetti without a pot. \u201d","\u201c Before anything else, preparation is the key to success. \u201d","\u201c To achieve great things, two things are needed; a plan, and not quite enough time. \u201d","\u201c I don\u2019t believe in failure. It\u2019s not failure if you enjoyed the process. \u201d"],Te=function(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e)+e)},Se=function(e){var t=Object(n.useState)(Ce[Te(0,22)]),a=Object(f.a)(t,2),l=a[0],o=a[1];return Object(n.useEffect)((function(){var e=setInterval((function(){o(Ce[Te(0,22)])}),1e4);return function(){clearInterval(e)}}),[]),r.a.createElement("div",null,l)};var Me=function(e){return r.a.createElement("div",{className:"c-portal"},r.a.createElement(d.a,null,r.a.createElement("div",{className:"left-sidebar"},r.a.createElement("header",null,r.a.createElement(m,{appTitle:e.appTitle,appIcon:e.appIcon})),r.a.createElement("section",null,r.a.createElement("header",null,"Navigation"),r.a.createElement(je,null)),r.a.createElement("section",null,r.a.createElement("header",null,"Structure"),r.a.createElement(b,null))),r.a.createElement("div",{className:"main-content"},r.a.createElement("header",null,r.a.createElement(Se,null)),r.a.createElement("main",{className:"main-content-area"},r.a.createElement(s.a,{path:"/",exact:!0,component:Ne}),r.a.createElement(s.a,{path:"/explore",exact:!0},r.a.createElement(ve,{folder:"$"})),r.a.createElement(s.a,{path:"/explore/:folder",component:ve})),r.a.createElement(we,null))))};var xe=function(){return r.a.createElement(Me,{appIcon:c.a,appTitle:"Tracker",projectName:"Tracker",pageTitle:"Tracker"})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Fe=a(94),De=a(93),_e=a.n(De),Je={name:"Default project",id:"default",content:{$:{id:"$",folder:"{$}",name:"root",fldr:{},tasks:{},notes:{}}},task_timers:{active:null,queue:[]}};var Re=localStorage.getItem("ProjectData")?JSON.parse(localStorage.getItem("ProjectData")):Je,Ie=Object(Fe.a)({reducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Je,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case j:var a="prjt-"+(new Date).getTime()+"-"+Math.floor(1e5*Math.random());return Object(u.a)(Object(u.a)({},e),{},{id:a,name:t.payload.name});case O:return t.payload;case"project/create-folder":var n=JSON.parse(JSON.stringify(e)),r="fldr-"+(new Date).getTime()+"-"+Math.floor(1e5*Math.random());return t.payload.id=r,t.payload.fldr={},t.payload.notes={},t.payload.tasks={},n.content[r]=t.payload,n.content[t.payload.folder].fldr[r]=1,n;case"project/edit-folder":var l=JSON.parse(JSON.stringify(e));return l.content[t.payload.id].name=t.payload.data.name,l;case"project/delete-folder":var o=JSON.parse(JSON.stringify(e)),i=o.content[t.payload.id].folder;return delete o.content[t.payload.id],delete o.content[i].fldr[t.payload.id],o;case w:var c=JSON.parse(JSON.stringify(e)),d="note-"+(new Date).getTime()+"-"+Math.floor(1e5*Math.random());return t.payload.id=d,c.content[t.payload.folder].notes[d]=t.payload,c;case C:var s=JSON.parse(JSON.stringify(e));return s.content[t.payload.folder].notes[t.payload.id]=Object(u.a)(Object(u.a)({},s.content[t.payload.folder].notes[t.payload.id]),t.payload),s;case T:var m=JSON.parse(JSON.stringify(e)),f=t.payload.folder;return delete m.content[f].notes[t.payload.id],m;case S:var p=JSON.parse(JSON.stringify(e)),E="task-"+(new Date).getTime()+"-"+Math.floor(1e5*Math.random());return t.payload.id=E,p.content[t.payload.folder].tasks[E]=t.payload,p;case M:var v=JSON.parse(JSON.stringify(e));return v.content[t.payload.folder].tasks[t.payload.id]=Object(u.a)(Object(u.a)({},v.content[t.payload.folder].tasks[t.payload.id]),t.payload),v;case F:var b=JSON.parse(JSON.stringify(e)),y=t.payload.folder;return b.content[y].tasks[t.payload.id].status="inprogress",b;case D:var h=JSON.parse(JSON.stringify(e)),k=t.payload.folder;return h.content[k].tasks[t.payload.id].status="resolved",h;case _:var g=JSON.parse(JSON.stringify(e)),N=t.payload.folder;return g.content[N].tasks[t.payload.id].status="rejected",g;case J:var R=JSON.parse(JSON.stringify(e)),I=t.payload.folder;return R.content[I].tasks[t.payload.id].status="reopen",R;case x:var B=JSON.parse(JSON.stringify(e)),L=t.payload.folder;return delete B.content[L].tasks[t.payload.id],B;case"project/timer/track-task":var A=JSON.parse(JSON.stringify(e)),$=t.payload.folder,H=A.content[$].tasks[t.payload.id].id,q=A.content[$].tasks[t.payload.id].title,G=A.content[$].tasks[t.payload.id].estimate;return A.task_timers.queue.length>=4||(!(!A.task_timers.active||A.task_timers.active.id!==H)||!!A.task_timers.queue.find((function(e){return e.id===H})))?e:(A.task_timers.queue.push({id:H,folder:$,title:q,estimate:G}),A);case"project/timer/start-task":var P=JSON.parse(JSON.stringify(e));return P.task_timers.active=P.task_timers.queue.shift(),P.task_timers.active.startTimeStamp=t.payload.startTimeStamp,P;case"project/timer/stop-task":var V=JSON.parse(JSON.stringify(e)),W=t.payload.folder,U=V.content[W].tasks[t.payload.id].id;return V.task_timers.active.id===U?V.task_timers.active=null:V.task_timers.queue=V.task_timers.queue.filter((function(e){return e.id!==U})),V;default:return e}},preloadedState:Re});Ie.subscribe(_e()((function(){localStorage.setItem("ProjectData",JSON.stringify(Ie.getState()))}),1e3)),console.log(Ie.getState());var Be=Ie;o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(p.a,{store:Be},r.a.createElement(xe,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},57:function(e,t,a){},72:function(e,t){},89:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},96:function(e,t,a){e.exports=a(199)}},[[96,1,2]]]);
//# sourceMappingURL=main.106a3ea6.chunk.js.map