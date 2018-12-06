(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{187:function(e,t){},190:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),r=a(79),i=a.n(r),o=(a(89),a(1)),c=a(2),l=a(4),m=a(3),u=a(5),p=(a(91),a(51)),d=a.n(p),g=a(80),h=a(33),v=a(22),f=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement("div",null,n.a.createElement("form",{onSubmit:function(t){return e.props.addComment(t,e.props.repoID,e.props.commitURL)}},n.a.createElement("input",{type:"text",placeholder:"Add a comment",value:this.props.commentText||"",onChange:function(t){return e.props.commentTextChanged(t,e.props.repoID)}})))}}]),t}(s.Component),b=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return n.a.createElement("div",null,this.props.messages.map(function(e,t){return n.a.createElement("div",{className:"conversation-message",key:t},e.sender,": ",e.message)}),this.props.canMakeComments?n.a.createElement(f,{addComment:this.props.addComment,commentText:this.props.commentText,commentTextChanged:this.props.commentTextChanged,repoID:this.props.repoID,commitURL:this.props.commitURL}):null)}}]),t}(s.Component),L=a(21),U=a.n(L),w=function(e){function t(){var e,a;Object(o.a)(this,t);for(var s=arguments.length,n=new Array(s),r=0;r<s;r++)n[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(n)))).componentDidMount=function(){U()({targets:".user-view",translateY:250,duration:1200})},a.prettifyRepoName=function(e){return e=(e=e.split("/")[1]).replace(/-/g," "),e=a.capitalize(e),e=a.separateCamelCase(e)},a.capitalize=function(e){return e.split(" ").map(function(e){return e[0].toUpperCase()+e.slice(1)}).join(" ")},a.separateCamelCase=function(e){var t=e.split("");return t=t.map(function(e,t){return 0!==t&&e.toUpperCase()===e&&e.toLowerCase()!==e?" "+e:e})},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.user,t=e.name,a=e.date,s=e.repo,r=e.repoID,i=e.commitMessage,o=e.commitURL,c="user-commit-info";return this.props.ownedByUser&&(c+=" owned-by-user"),n.a.createElement("div",{className:"user-view"},n.a.createElement("a",{href:o},n.a.createElement("div",{className:c},n.a.createElement("h1",null,this.prettifyRepoName(s)),n.a.createElement("p",null,t," (",a.toLocaleString(),")"),n.a.createElement("p",null,'"',i,'"'))),n.a.createElement(b,{repoID:r,commitURL:o,messages:this.props.messages,commentTextChanged:this.props.commentTextChanged,commentText:this.props.commentBeingWritten,addComment:this.props.addComment,canMakeComments:this.props.canMakeComments}))}}]),t}(s.Component),C=function(e){function t(){var e,a;Object(o.a)(this,t);for(var s=arguments.length,n=new Array(s),r=0;r<s;r++)n[r]=arguments[r];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(n)))).componentDidUpdate=function(e){console.log(a.props.addUserErrorMessage,e.addUserErrorMessage),a.props.addUserErrorMessage!==e.addUserErrorMessage&&""!==a.props.addUserErrorMessage&&(a.animation&&a.animation.restart(),a.animation=U()({targets:".error-message",color:"#8B0000",easing:"linear",duration:350,"font-size":"12px"}))},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"user-view"},n.a.createElement("div",{className:"user-commit-info new"},n.a.createElement("h2",null,"Add a new user to this list!"),n.a.createElement("form",{onSubmit:this.props.addUserToList},n.a.createElement("input",{type:"text",placeholder:"Github Username",value:this.props.newUserName,onChange:this.props.newUserNameChanged})),n.a.createElement("div",{className:"error-message"},this.props.addUserErrorMessage)))}}]),t}(s.Component),D=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"user-list"},this.props.users.map(function(t){var a=e.props.activeConversations.find(function(e){return parseInt(e.repoID)===t.repoID});return n.a.createElement("div",{key:t.name+e.props.listDisplayedAt},n.a.createElement(w,{user:t,messages:a?a.messages:[],commentTextChanged:e.props.commentTextChanged,commentBeingWritten:e.props.commentsBeingWritten[t.repoID],addComment:e.props.addComment,ownedByUser:t.name===e.props.loggedInUser,canMakeComments:null!==e.props.loggedInUser}))}),n.a.createElement(C,{newUserName:this.props.newUserName,newUserNameChanged:this.props.newUserNameChanged,addUserToList:this.props.addUserToList,addUserErrorMessage:this.props.addUserErrorMessage}))}}]),t}(s.Component),j=a(81),E=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props.list.users;t.sort(function(e,t){return e.localeCompare(t)});var a="userlist-box";return this.props.selected&&(a+=" selected-userlist-box"),this.props.loading&&(a+=" loading-userlist-box"),n.a.createElement("div",{className:a,onClick:function(){return e.props.requestDataForList(e.props.listID)}},n.a.createElement("div",null,n.a.createElement("div",{className:"userlist-title"},this.props.list.title),t.map(function(e){return n.a.createElement("div",{className:"userlist-member"},e)})),n.a.createElement("div",{className:"loader-container"},n.a.createElement(j.PropagateLoader,{style:{display:"block",margin:"0 auto","border-color":"red"},sizeUnit:"px",size:8,color:"#C6F8FF",loading:this.props.loading})))}}]),t}(s.Component),O=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"userlist-box"},n.a.createElement("div",null,n.a.createElement("div",null,n.a.createElement("input",{type:"text",placeholder:"List Name",value:this.props.newListName,onChange:this.props.newListNameChanged})),n.a.createElement("button",{onClick:this.props.createNewList},"Create New Userlist")))}}]),t}(s.Component),N=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"sidebar"},n.a.createElement("span",{className:"username"},this.props.loggingIn?"Logging in...":"Logged in as ".concat(this.props.loggedInUser)),n.a.createElement("div",null,this.props.visibleUserLists?this.props.visibleUserLists.map(function(t){return n.a.createElement(E,{list:t,key:t.id,listID:t.id,requestDataForList:e.props.requestDataForList,selected:e.props.displayedList===t.id,loading:e.props.loadingList===t.id})}):null,n.a.createElement(O,{newListName:this.props.newListName,newListNameChanged:this.props.newListNameChanged,createNewList:this.props.createNewList})))}}]),t}(s.Component),y=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"login-button"},n.a.createElement("a",{href:"https://github.com/login/oauth/authorize?scope=read:user%20repo&client_id=".concat("37ec24a03b485597e01b")},"Login with Github!"))}}]),t}(s.Component),k=function(e){function t(){var e,s;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(s=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={loggingIn:!1,newListName:"",displayedList:null,commentsBeingWritten:{},activeConversations:[],newUserName:"",loadingUserList:!1},s.componentDidMount=function(){s.setupSocket(),s.authenticateWithAccessToken()},s.authenticateWithAccessToken=function(){var e=localStorage.getItem("githubAccessToken");null!==e&&(s.setState({loggingIn:!0}),s.socket.emit("authWithGithub",{token:e}))},s.authenticateWithAccessCode=function(){if(!s.state.loggingIn){var e=window.location.href.split("/?code=");if(e.length>1){s.setState({loggingIn:!0});var t=e[1];s.socket.emit("authWithGithub",{code:t})}}},s.setupSocket=function(){var e=a(160)();e.on("commentAdded",s.receiveComment),e.on("authenticationSuccess",s.loginSuccess),e.on("authenticationFailure",s.loginFailure),e.on("userDataForDisplay",s.displayUserList),e.on("userAddedToList",s.userAddedToList),e.on("addUserToListResponse",s.addUserToListResponse),e.on("dataForUserlistResponse",s.addVisibleUserList),e.on("createdNewList",s.createdNewList),s.socket=e,e.on("connect",s.authenticateWithAccessCode)},s.loginSuccess=function(e){s.setState({loggingIn:!1}),console.log("Logged in and got token back!",e.loginData.accessToken),localStorage.setItem("githubAccessToken",e.loginData.accessToken),s.setState({loginData:e.loginData}),s.setInitialListsState(e.userlistsData)},s.loginFailure=function(){s.setState({loggingIn:!1}),console.log("Failed to login"),localStorage.removeItem("githubAccessToken")},s.setInitialReposState=function(e){s.setState({activeConversations:e.conversations,users:e.users.map(s.shapeDataForUser).sort(function(e,t){return t.date.getTime()-e.date.getTime()})})},s.setInitialListsState=function(e){s.setState({visibleUserLists:e})},s.shapeDataForUser=function(e){return{name:e.name,repo:e.data.repo.name,repoID:e.data.repo.id,commitID:e.data.payload.push_id,commitMessage:e.data.payload.commits[0].message,commitURL:e.data.payload.commits[0].url.replace("api.","").replace("/repos","").replace("commits","commit"),date:new Date(e.data.created_at)}},s.requestDataForList=function(e){s.setState({displayedList:e,loadingUserList:!0}),s.socket.emit("requestReposForList",{listID:e,accessToken:s.state.loginData.accessToken});U()({targets:".user-view",translateY:-200,duration:1200})},s.displayUserList=function(e){var t=e.userData,a=e.conversations;console.log(t),s.setState({users:t.map(s.shapeDataForUser).sort(function(e,t){return t.date.getTime()-e.date.getTime()}),newUserName:"",addUserErrorMessage:"",loadingUserList:!1,activeConversations:a,listDisplayedAt:(new Date).getTime()})},s.receiveComment=function(e){var t=Object(v.a)(s.state.activeConversations),a=t.find(function(t){return parseInt(t.repoID)===e.repoID});void 0!==a?a=Object(h.a)({},a):(a={messages:[],repoID:String(e.repoID)},t.push(a)),a.messages.push({message:e.commentContent,sender:e.username}),s.setState({activeConversations:t})},s.userAddedToList=function(e){var t=e.listID,a=e.username;a===s.state.loginData.basicUserData.login&&s.socket.emit("requestDataForUserlist",{listID:t});var n=s.state.visibleUserLists.find(function(e){return e.id===t});if(void 0!==n){var r=Object(v.a)(n.users).concat([a]),i=Object(v.a)(s.state.visibleUserLists);i[i.indexOf(n)].users=r,s.setState({visibleUserLists:i}),t===s.state.displayedList&&s.requestDataForList(t)}},s.addUserToListResponse=function(e){var t=e.message;s.setState({addUserErrorMessage:t})},s.addVisibleUserList=function(e){var t=e.listData;s.setState({visibleUserLists:Object(v.a)(s.state.visibleUserLists).concat([t])})},s.createdNewList=function(e){var t=e.listData;s.setState({visibleUserLists:Object(v.a)(s.state.visibleUserLists).concat([t])})},s.createNewList=function(){s.socket.emit("createNewList",{name:s.state.newListName,username:s.state.loginData.basicUserData.login}),console.log("Making new list with name "+s.state.newListName),s.setState({newListName:""})},s.newListNameChanged=function(e){s.setState({newListName:e.target.value})},s.getLoggedInUser=function(){return void 0!==s.state.loginData?s.state.loginData.basicUserData.login:null},s.commentTextChanged=function(e,t){var a=Object(h.a)({},s.state.commentsBeingWritten);a[t]=e.target.value,s.setState({commentsBeingWritten:a})},s.addComment=function(){var e=Object(g.a)(d.a.mark(function e(t,a,n){var r;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),s.socket.emit("addComment",{repoID:a,commitURL:n,commentContent:s.state.commentsBeingWritten[a],topic:s.state.users.find(function(e){return e.repoID===a}).repo,username:s.state.loginData.basicUserData.login,accessToken:s.state.loginData.accessToken}),delete(r=Object(h.a)({},s.state.commentsBeingWritten))[a],s.setState({commentsBeingWritten:r});case 5:case"end":return e.stop()}},e,this)}));return function(t,a,s){return e.apply(this,arguments)}}(),s.newUserNameChanged=function(e){s.setState({newUserName:e.target.value})},s.addUserToList=function(e){e.preventDefault(),s.setState({newUserName:"",addUserErrorMessage:""}),s.socket.emit("addUserToList",{listID:s.state.displayedList,username:s.state.newUserName,accessToken:s.state.loginData.accessToken})},s}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return null!==this.getLoggedInUser()?n.a.createElement("div",{className:"main-view"},n.a.createElement(N,{loggingIn:this.state.loggingIn,loggedInUser:this.getLoggedInUser(),createNewList:this.createNewList,newListName:this.state.newListName,newListNameChanged:this.newListNameChanged,visibleUserLists:this.state.visibleUserLists,requestDataForList:this.requestDataForList,displayedList:this.state.displayedList,loadingList:this.state.loadingUserList?this.state.displayedList:null}),this.state.loginData?this.state&&this.state.users?n.a.createElement(D,{users:this.state.users,activeConversations:this.state.activeConversations,commentsBeingWritten:this.state.commentsBeingWritten,commentTextChanged:this.commentTextChanged,addComment:this.addComment,loggedInUser:this.state.loginData?this.state.loginData.basicUserData.login:null,newUserName:this.state.newUserName,newUserNameChanged:this.newUserNameChanged,addUserToList:this.addUserToList,addUserErrorMessage:this.state.addUserErrorMessage,listDisplayedAt:this.state.listDisplayedAt}):n.a.createElement("h2",null,"Select a list of users to display!"):null):n.a.createElement("div",{className:"splash-screen"},n.a.createElement("center",null,n.a.createElement("h1",null,"Gitfriendship"),n.a.createElement(y,null)))}}]),t}(s.Component),I=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return n.a.createElement(k,null)}}]),t}(s.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},84:function(e,t,a){e.exports=a(190)},89:function(e,t,a){},91:function(e,t,a){}},[[84,2,1]]]);
//# sourceMappingURL=main.eb0446de.chunk.js.map