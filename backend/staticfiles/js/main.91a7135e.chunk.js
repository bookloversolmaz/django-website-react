(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,a){},,function(e,t,a){e.exports=a.p+"static/media/gummy-macbook.d8f9521a.png"},function(e,t,a){e.exports=a.p+"static/media/todo_list_demo.ab8cb27b.gif"},,function(e,t,a){e.exports=a.p+"static/media/pixeltrue-idea-1.e4b71016.png"},function(e,t,a){e.exports=a(38)},,,,,,function(e,t,a){},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(16),c=a(3),o=(a(27),a(17)),i=a.n(o);var s=function(){return r.a.createElement("div",null," ",r.a.createElement("h1",null,"Solmaz Purser"),r.a.createElement("h2",null,"Software developer and writer"),r.a.createElement("div",{className:"home-container"},r.a.createElement("div",{className:"links-container"},r.a.createElement("a",{href:"/about",className:"link-bubble link1"},"About"),r.a.createElement("a",{href:"/projects",className:"link-bubble link2"},"Projects"),r.a.createElement("a",{href:"/writing",className:"link-bubble link3"},"Writing"),r.a.createElement("a",{href:"/contact",className:"link-bubble link4"},"Contact"),r.a.createElement("a",{href:"/todo",className:"link-bubble link5"},"To do list")),r.a.createElement("div",{className:"home-image-container"},r.a.createElement("img",{src:i.a,alt:"MacBook Illustration",className:"home-image"}))))},m=a(40);let u;u=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).REACT_APP_URL_PRODUCTION;var d=m.a.create({withCredentials:!0,baseURL:u,timeout:1e4,headers:{"Content-Type":"application/json"}});a(32);var E=()=>{const[e,t]=Object(n.useState)(""),[a,l]=Object(n.useState)([]);Object(n.useEffect)(()=>{c()},[]);const c=async()=>{try{const e=await d.get("/todo/");200===e.status?l(e.data):console.error("Error fetching data: Response is undefined or status is not 200")}catch(e){console.error("Error fetching data:",e.message)}};return r.a.createElement("div",null," ",r.a.createElement("h1",{className:"todo-header"},"To do list"),r.a.createElement("div",{className:"ToDo"},r.a.createElement("div",{className:"Top"},r.a.createElement("input",{className:"input",type:"text",value:e,onChange:e=>{t(e.target.value)},placeholder:"Enter a task"}),r.a.createElement("button",{className:"btn",onClick:async()=>{if(""!==e.trim())try{const n=await d.post("/todo/",{id:Math.random(),item:e});l([...a,n.data]),t("")}catch(n){console.error("Error adding task:",n)}}},"Submit")),r.a.createElement("ul",null,a.map(e=>r.a.createElement("li",{className:"task",key:e.id},e.item,r.a.createElement("button",{onClick:()=>(async e=>{try{await d.delete("/todo/".concat(e,"/"));const t=a.filter(t=>t.id!==e);l(t)}catch(t){console.error("Error deleting task:",t)}})(e.id)},"Delete"))))))},p=a(6),g=(a(33),a(18)),b=a.n(g);var h=()=>{const[e,t]=Object(n.useState)([]),[a,l]=Object(n.useState)(!0),[c,o]=Object(n.useState)(null);return Object(n.useEffect)(()=>{(async()=>{try{const e=await d.get("/projects/");t(e.data)}catch(e){console.error("Error fetching projects:",e),o("Failed to load projects. Please try again later.")}finally{l(!1)}})()},[]),a?r.a.createElement("p",null,"Loading..."):c?r.a.createElement("p",null,c):r.a.createElement("div",{className:"projects-page"},r.a.createElement("h1",{className:"project-header"},"Projects"),r.a.createElement("div",{className:"projects-container"},r.a.createElement("div",{className:"project-block"},r.a.createElement("div",{className:"project-image-container"},r.a.createElement("img",{src:b.a,alt:"To Do List",className:"project-image"})),r.a.createElement(p.b,{to:"/todo",className:"project-title","aria-label":"Navigate to To Do List application"},r.a.createElement("p",null,"To Do List")),r.a.createElement("p",{className:"project-description"},"Interactive to do list application. This was the first component that I developed for this website. It was a large learning curve and required learning and using Django, PostGreSQL, React, and axios API.")),e.map((e,t)=>r.a.createElement("div",{key:e.name,className:"project-block","data-priority":t+2},r.a.createElement("div",{className:"project-image-container"},r.a.createElement("img",{src:e.image,alt:e.name,className:"project-image"})),r.a.createElement("a",{href:e.github_url,className:"project-title",target:"_blank",rel:"noopener noreferrer","aria-label":"Visit GitHub page for ".concat(e.name)},r.a.createElement("p",null,e.name)),r.a.createElement("p",{className:"project-description"},e.description)))))};a(15);var f=()=>{const[e,t]=Object(n.useState)([]),a=Object(c.p)();Object(n.useEffect)(()=>{(async()=>{try{const e=await d.get("/writing/");200===e.status?t(e.data):console.error("Error fetching data: Response is undefined or status is not 200")}catch(e){console.error("Error fetching data:",e.message)}})()},[]);const l=[...e].sort((e,t)=>new Date(t.created_on)-new Date(e.created_on));return r.a.createElement("div",null,r.a.createElement("h1",{className:"landing-page-heading"},"Writing"),0===l.length?r.a.createElement("div",null,"Loading..."):r.a.createElement("div",null,l.map(e=>r.a.createElement("div",{className:"writing-block",key:e.id},r.a.createElement("h2",{className:"writing-title",style:{cursor:"pointer"},onClick:()=>{return t=e.id,void a("/writing/".concat(t));var t}},e.title),r.a.createElement("p",null,"Publication date: ",new Date(e.publication_date).toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"})),r.a.createElement("p",null,"Created on: ",new Date(e.created_on).toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"})),r.a.createElement("p",null,e.body.length>100?"".concat(e.body.substring(0,100),"..."):e.body)))))},v=a(19),y=a.n(v);var j=()=>{const{postId:e}=Object(c.r)(),[t,a]=Object(n.useState)(null),l=Object(c.p)();if(Object(n.useEffect)(()=>{(async()=>{try{const t=await d.get("/writing/".concat(e,"/"));a(t.data)}catch(t){console.error("Error fetching post details:",t)}})()},[e]),!t)return r.a.createElement("div",null,"Loading...");const o=t.body.split("\n").filter(e=>""!==e.trim()).map(e=>y.a.sanitize(e,{ADD_ATTR:["target"],FORBID_TAGS:["script"]}).replace(/<a\s+(?!.*target)/g,'<a target="_blank" '));return r.a.createElement("div",null,r.a.createElement("button",{className:"return-button",onClick:()=>{l(-1)}},"Return to Writing Page"),r.a.createElement("h1",null,t.title),r.a.createElement("p",null,"Publication date:"," ",new Date(t.publication_date).toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"})),r.a.createElement("p",null,"Created on:"," ",new Date(t.created_on).toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"})),o.map((e,t)=>r.a.createElement("p",{key:t,dangerouslySetInnerHTML:{__html:e}})))},N=a(5);a(34);var w=function(){const[e,t]=Object(n.useState)({name:"",email:"",subject:"",message:""}),[a,l]=Object(n.useState)(!1),c=a=>{const{name:n,value:r}=a.target;t(Object(N.a)(Object(N.a)({},e),{},{[n]:r}))},o=()=>{t({name:"",email:"",subject:"",message:""}),l(!1)};return a?r.a.createElement("div",{className:"thank-you"},r.a.createElement("h2",null,"Thank you for contacting me"),r.a.createElement("p",null,"I have received your message and will get back to you shortly."),r.a.createElement("button",{onClick:o},"Submit another message")):r.a.createElement("div",{className:"contact-page"},r.a.createElement("h1",null,"Contact me"),r.a.createElement("form",{onSubmit:async a=>{a.preventDefault();try{const a=await d.post("/contact/",e,{headers:{object:"formobject"}});201===a.status?(t({name:"",email:"",subject:"",message:""}),l(!0)):console.error("Failed to send message:",a)}catch(n){console.error("Error:",n)}},className:"contact-form"},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"name"},"Name:"),r.a.createElement("input",{type:"text",id:"name",name:"name",value:e.name,onChange:c,placeholder:"Your Name",required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"email"},"Email:"),r.a.createElement("input",{type:"email",id:"email",name:"email",value:e.email,onChange:c,placeholder:"Your Email",required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"subject"},"Subject:"),r.a.createElement("input",{type:"text",id:"subject",name:"subject",value:e.subject,onChange:c,placeholder:"Subject",required:!0})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"message"},"Message:"),r.a.createElement("textarea",{id:"message",name:"message",value:e.message,onChange:c,placeholder:"Your Message",rows:"5",required:!0})),r.a.createElement("button",{type:"submit"},"Send Message")))},k=(a(35),a(20)),S=a.n(k);var _=function(){return r.a.createElement("div",null,r.a.createElement("h1",{className:"about-heading"},"About"),r.a.createElement("p",{className:"about-me"}," I am a software developer based in London, UK. I recently graduated from Makers software development bootcamp and have been further developing my skills via projects, coding challenges and volunteering with Unify Giving. Before my career change, I was an editor and writer for several years. You can find examples of my work in the ",r.a.createElement(p.b,{to:"/writing"},"writing")," page, where you can also read my musings on tech, books and other topics. You can find out more about me at ",r.a.createElement("a",{href:"https://www.linkedin.com/in/solmaz-purser-853280115/",target:"_blank",rel:"noopener noreferrer"},"LinkedIn")," and ",r.a.createElement("a",{href:"https://github.com/bookloversolmaz",target:"_blank",rel:"noopener noreferrer"},"GitHub"),". You can also contact me ",r.a.createElement(p.b,{to:"/contact"},"here.")),r.a.createElement("div",{className:"about-image-container"},r.a.createElement("img",{src:S.a,alt:"Woman Illustration",className:"about-image"})),r.a.createElement("footer",{className:"attribution"},"Illustrations by ",r.a.createElement("a",{href:"https://icons8.com/illustrations",target:"_blank",rel:"noopener noreferrer"},"Icons8")))},O=a(12);a(36);var C=function(){const[e,t]=Object(n.useState)(!1);return r.a.createElement("header",null,r.a.createElement("nav",{"aria-label":"Main navigation"},r.a.createElement("ul",{className:"nav-list"},r.a.createElement("li",{className:"dropdown"},r.a.createElement("button",{className:"dropdown-button",onClick:()=>{t(!e)},"aria-haspopup":"true","aria-expanded":e},"Menu"),e&&r.a.createElement("ul",{className:"dropdown-menu"},r.a.createElement("li",null,r.a.createElement("a",{href:"/"},"Home")),r.a.createElement("li",null,r.a.createElement("a",{href:"/about"},"About")),r.a.createElement("li",null,r.a.createElement("a",{href:"/projects"},"Projects")),r.a.createElement("li",null,r.a.createElement("a",{href:"/writing"},"Writing")),r.a.createElement("li",null,r.a.createElement("a",{href:"/contact"},"Contact")),r.a.createElement("li",null,r.a.createElement("a",{href:"/todo"},"To do list")))),r.a.createElement("div",{className:"social-links"},r.a.createElement("li",null,r.a.createElement(O.a,{url:"https://github.com/bookloversolmaz",target:"_blank",rel:"noopener noreferrer",style:{height:30,width:30}})),r.a.createElement("li",null,r.a.createElement(O.a,{url:"https://www.linkedin.com/in/solmaz-purser-853280115/",target:"_blank",rel:"noopener noreferrer",style:{height:30,width:30}}))))))};var D=()=>r.a.createElement("div",{className:"App"},r.a.createElement(C,null),r.a.createElement(c.c,null,r.a.createElement(c.a,{path:"/",element:r.a.createElement(s,null)}),r.a.createElement(c.a,{path:"/about",element:r.a.createElement(_,null)}),r.a.createElement(c.a,{path:"/todo",element:r.a.createElement(E,null)}),r.a.createElement(c.a,{path:"/projects",element:r.a.createElement(h,null)}),r.a.createElement(c.a,{path:"/writing",element:r.a.createElement(f,null)}),r.a.createElement(c.a,{path:"/writing/:postId",element:r.a.createElement(j,null)}),r.a.createElement(c.a,{path:"/writing/:postId",element:r.a.createElement(j,null)}),r.a.createElement(c.a,{path:"/contact",element:r.a.createElement(w,null)})));a(37);var T=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,41)).then(t=>{let{getCLS:a,getFID:n,getFCP:r,getLCP:l,getTTFB:c}=t;a(e),n(e),r(e),l(e),c(e)})};Object(l.createRoot)(document.getElementById("root")).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(p.a,null,r.a.createElement(D,null)))),T()}],[[21,1,2]]]);
//# sourceMappingURL=main.91a7135e.chunk.js.map