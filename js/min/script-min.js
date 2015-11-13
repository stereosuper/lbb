function scrollTo(e,t){if(!(0>t)){var n=document.body.scrollTop+document.documentElement.scrollTop,s=e-n,o=s/t*10;setTimeout(function(){n+=o,document.body.scrollTop=n,document.documentElement.scrollTop=n,n!==e&&scrollTo(e,t-10)},10)}}function addEventListener(e,t,n){e.addEventListener?e.addEventListener(t,n):e.attachEvent?e.attachEvent("on"+t,function(){n.call(e)}):e["on"+t]=n}function hasClass(e,t){return e.classList?e.classList.contains(t):new RegExp("(^| )"+t+"( |$)","gi").test(e.className)}function shuffle(e){for(var t=e.length,n,s;t>1;)s=Math.floor(Math.random()*t--),s!==t&&(n=e[t],e[t]=e[s],e[s]=n);return e}function getStyle(e,t){var n="";return document.defaultView&&document.defaultView.getComputedStyle?n=document.defaultView.getComputedStyle(e,"").getPropertyValue(t):e.currentStyle&&(t=t.replace(/\-(\w)/g,function(e,t){return t.toUpperCase()}),n=e.currentStyle[t]),n}function getIndex(e){var t=e.parentNode.childNodes,n=t.length,s=0;for(s;n>s&&e!==t[s];s++);return s}function detectScrollDir(){scrollDir=myScroll>lastScrollTop?-1:myScroll<lastScrollTop?1:0,lastScrollTop=myScroll}function isVisible(e){for(var t=e.offsetTop,n=e.offsetHeight;e.offsetParent;)e=e.offsetParent,t+=e.offsetTop;return t<window.pageYOffset+window.innerHeight&&t+n>window.pageYOffset}function setSlider(e){function t(){TweenLite.to(s[currentSlide],u,{left:c,opacity:0,onComplete:function(){o-1>currentSlide?currentSlide++:currentSlide=0,TweenLite.fromTo(s[currentSlide],u,{left:"-"+c},{left:0,opacity:1,ease:Power2.easeInOut}),d.staggerFromTo(s[currentSlide].querySelectorAll(".anim-slide"),u,{x:"-200px",opacity:0},{x:0,opacity:1,ease:Power2.easeInOut},.2)}})}function n(){TweenLite.to(s[currentSlide],u,{left:"-"+c,opacity:0,onComplete:function(){currentSlide>0?currentSlide--:currentSlide=o-1,TweenLite.fromTo(s[currentSlide],u,{left:c},{left:0,opacity:1,ease:Power2.easeInOut}),d.staggerFromTo(s[currentSlide].querySelectorAll(".anim-slide"),u,{x:"200px",opacity:0},{x:0,opacity:1,ease:Power2.easeInOut},.2)}})}var s=e.querySelectorAll(".slide"),o=s.length,a=0,i=document.createElement("button"),l=document.createElement("button"),r=0,c="25%",u=.3,d=new TimelineLite;for(hasClass(htmlTag,"lt-ie9")&&(c="150%"),a;o>a;a++)a>0&&TweenLite.set(s[a],{left:c,opacity:0}),s[a].offsetHeight>r&&(r=s[a].offsetHeight);TweenLite.set(e.querySelector("ul"),{height:r+"px"}),TweenLite.set(s[0].querySelectorAll(".anim-slide"),{opacity:1}),l.setAttribute("id","prev"),l.innerHTML="Prev",e.appendChild(l),addEventListener(l,"click",n),i.setAttribute("id","next"),i.innerHTML="Next",e.appendChild(i),addEventListener(i,"click",t)}function animFirstSlide(e){if(null!==document.getElementById("confiance")){var e=document.getElementById("confiance"),t=e.querySelectorAll(".slide"),n="25%",s=.3,o=new TimelineLite;TweenLite.set(t[0].querySelectorAll(".anim-slide"),{opacity:0}),myScroll>=e.offsetTop-windowHeight/3&&(firstAnimSlider=!0,TweenLite.to(t[0],s,{left:n,opacity:0,onComplete:function(){TweenLite.fromTo(t[1],s,{left:"-"+n},{left:0,opacity:1,ease:Power2.easeInOut}),o.staggerFromTo(t[1].querySelectorAll(".anim-slide"),s,{x:"-200px",opacity:0},{x:0,opacity:1,ease:Power2.easeInOut},.2)}}),currentSlide=1)}else firstAnimSlider=!0}function animBackground(e){animBgOn?e?(liveBgPos1+=100,liveBgPosFinal1+=100,liveBgPos2-=100,liveBgPosFinal2-=100,tweenBg=TweenLite.fromTo(masques,25,{backgroundPosition:liveBgPos1+"% "+liveBgPos2+"%"},{backgroundPosition:liveBgPosFinal1+"% "+liveBgPosFinal2+"%",ease:Linear.easeNone,onComplete:animBackground,onCompleteParams:["complete"]})):tweenBg.play():tweenBg.pause()}function animBackgroundScroll(){myScroll>masquesTop-windowHeight/2?myScroll>masquesTop+masques.offsetHeight-windowHeight/2?(TweenLite.set(masques,{css:{className:"-=on"}}),animBgOn=!1,animBackground()):(TweenLite.set(masques,{css:{className:"+=on"}}),animBgOn=!0,animBackground()):(TweenLite.set(masques,{css:{className:"-=on"}}),animBgOn=!1,animBackground())}function linksHoverYou(e){var t=e.querySelectorAll("a.animTxt"),n=t.length,s=0;for(s;n>s;s++)!function(n){addEventListener(t[n],"mouseover",function(){TweenLite.set(this,{css:{className:"+=on"}}),TweenLite.set(e,{css:{className:"+=fade fade"+parseInt(n+1)}})}),addEventListener(t[n],"mouseout",function(){TweenLite.set(this,{css:{className:"-=on"}}),TweenLite.set(e,{css:{className:"-=fade"}}),TweenLite.set(e,{css:{className:"-=fade"+parseInt(n+1)}})})}(s)}function bullshitGenerator(){function e(e,t,n){var s=e.querySelector("#"+n);s?(TweenLite.set(s,{css:{className:"-=full"}}),TweenLite.set(s,{css:{className:"-=big"}}),setTimeout(function(){s.parentNode.removeChild(s)},f)):(e.appendChild(t),TweenLite.set(t,{css:{className:"+=big"},delay:.01,onComplete:function(){TweenLite.set(t,{css:{className:"+=full"},delay:p})}}))}var t=[purpleShits,yellowShits,blueShits],n=[document.querySelector(".bg-purple"),document.querySelector(".bg-yellow"),document.querySelector(".bg-blue")],s=["top-left","top-right","top-center","bottom-left","bottom-right","bottom-center"],o=0,a,i=[],l=[],r=[],c=[],u=[],d=3,m=0,p=.8,f=400,T=t.length;for(o;T>o;o++)for(a=0,i[o]=[],l[o]=[],r[o]=[],u=[],c[o]=[],shuffle(t[o]),m=t[o].length<d?t[o].length:d,a;m>a;a++)!function(o,a){if(u[a]=Math.floor(Math.random()*s.length),void 0!==u[a-1]&&u[a]===u[a-1])for(;u[a]===u[a-1];)u[a]=Math.floor(Math.random()*s.length);l[o][a]=document.createElement("img"),l[o][a].setAttribute("src",t[o][a][0]),i[o][a]=document.createElement("button"),i[o][a].appendChild(l[o][a]),TweenLite.set(i[o][a],{css:{className:"+=bullshitBtn "+s[u[a]]}}),n[o].appendChild(i[o][a]),t[o][a][1]?(c[o][a]=document.createElement("div"),c[o][a].setAttribute("id","pop-"+o+"-"+a),TweenLite.set(c[o][a],{css:{className:"+=bullshit"}}),r[o][a]=document.createElement("img"),r[o][a].setAttribute("src",t[o][a][2]),c[o][a].appendChild(r[o][a]),addEventListener(i[o][a],t[o][a][1],function(){e(n[o],c[o][a],"pop-"+o+"-"+a)}),addEventListener(c[o][a],t[o][a][1],function(){var e=this;TweenLite.set(e,{css:{className:"-=full"}}),TweenLite.set(e,{css:{className:"-=big"}}),setTimeout(function(){e.parentNode.removeChild(e)},f)})):TweenLite.set(i[o][a],{css:{className:"+=not-a-btn"}})}(o,a)}function setSentences(e){function t(){TweenLite.set(l,{css:{className:"-=open"}}),TweenLite.set(l,{css:{className:"+=close"}}),f>c&&T>r&&!h?(TweenLite.to(l,.3,{left:c+"px"}),c+=15):c>=f&&T>r?(c=w,TweenLite.set(l,{left:c+"px"}),TweenLite.to(l,.3,{top:r+"px"}),TweenLite.set(l,{css:{className:"+=on-right"}}),r+=15):c>=f&&r>=T&&!h?(c=w-4,r=g,TweenLite.set(l,{top:r+"px"}),TweenLite.to(l,.3,{left:c+"px"}),TweenLite.set(l,{css:{className:"-=on-right"}}),TweenLite.set(l,{css:{className:"+=on-bottom"}}),c-=15,h=!0):c>p&&r>=T&&h?(TweenLite.to(l,.3,{left:c+"px"}),c-=15):p>=c&&r>25&&h?(c=p-55,TweenLite.set(l,{left:c+"px"}),TweenLite.to(l,.3,{top:r+"px"}),TweenLite.set(l,{css:{className:"-=on-bottom"}}),TweenLite.set(l,{css:{className:"+=on-left"}}),r-=15):p>=c&&25>=r&&(h=!1,r=m,c=-20,TweenLite.set(l,{top:r+"px"}),TweenLite.set(l,{left:c+"px"}),TweenLite.set(l,{css:{className:"-=on-left"}}),c+=15)}function n(){TweenLite.set(a,{width:a.offsetWidth+"px",height:a.offsetHeight+"px"}),t();var e=Math.floor(Math.random()*s);if(e===i)for(;e===i;)e=Math.floor(Math.random()*s);i=e,TweenLite.fromTo(a,.2,{opacity:1},{opacity:0,onComplete:function(){o.blur(),a.querySelector("span").innerHTML=sentences[e],TweenLite.fromTo(a,.2,{opacity:0},{opacity:1}),TweenLite.set(l,{css:{className:"-=close"}}),TweenLite.set(l,{css:{className:"+=open"}})}})}var s=sentences.length,o=e.querySelector("button"),a=e.querySelector("p"),i=0,l=document.getElementById("cisors"),r=parseInt(getStyle(l,"top")),c=parseInt(getStyle(l,"left")),u=e.offsetHeight,d=e.offsetWidth,m=r,p=c,f=d-25,T=u-28,w=d+24,g=u+23,h=!1;addEventListener(o,"click",n),addEventListener(e,"mouseout",function(){TweenLite.set(l,{css:{className:"-=open"}})})}function animTxtScroll(){function e(e){hasClass(e,"on")||TweenLite.set(e,{css:{className:"+=on"},delay:.2})}function t(e){hasClass(e,"on")&&TweenLite.set(e,{css:{className:"-=on"},delay:.2})}var n=splitTlAnimTxt.length,s=0,o=[],a=[];for(s;n>s;s++)o[s]=animsTxt[s].closest(".section"),a[s]=o[s].querySelector(".container"),myScroll>=o[s].offsetTop+windowHeight/3?(decalTxt="+=100",splitTlAnimTxt[s].reverse(),hasClass(body,"page-template-presta")||e(a[s])):myScroll>=o[s].offsetTop-windowHeight/2?(hasClass(body,"page-template-presta")||t(a[s]),splitTlAnimTxt[s].play()):(splitTlAnimTxt[s].reverse(),hasClass(body,"page-template-presta")||e(a[s]))}function animTxt(e){var t=0,n=splitTlAnimTxt.length;for(t;n>t;t++){e[t].split({type:"words"});var s=0,o=e[t].words,a=o.length;for(s;a>s;s++)splitTlAnimTxt[t].from(o[s],.4,{ease:Expo.easeInOut,css:{opacity:0,scaleX:.5,scaleY:.5,y:decalTxt}},.03*s)}}function animMenuScroll(){myScroll>=pageContent.offsetTop-100?(TweenLite.set(header,{css:{className:"+=purple"}}),TweenLite.set(menu,{css:{className:"+=purple"}})):(TweenLite.set(header,{css:{className:"-=purple"}}),TweenLite.set(menu,{css:{className:"-=purple"}}))}function animFixedMenu(){if(myScroll>200&&myScroll+windowHeight<htmlTag.offsetHeight){var e=fixedMenu.querySelectorAll("li");TweenLite.to(fixedMenu,.3,{bottom:0}),myScroll>=prestaSectionAteliers.offsetTop?myScroll>=prestaSectionInterventions.offsetTop?hasClass(fixedMenu,"step3")||(TweenLite.set(e[0],{css:{className:"up"}}),TweenLite.set(e[1],{css:{className:"right up"}}),TweenLite.set(fixedMenu,{css:{className:"second-menu step3"}})):hasClass(fixedMenu,"step2")||(TweenLite.set(e[0],{css:{className:"up"}}),TweenLite.set(e[1],{css:{className:"right down"}}),TweenLite.set(fixedMenu,{css:{className:"second-menu step2"}})):hasClass(fixedMenu,"step1")||(TweenLite.set(e[0],{css:{className:"down"}}),TweenLite.set(e[1],{css:{className:"right down"}}),TweenLite.set(fixedMenu,{css:{className:"second-menu step1"}}))}else TweenLite.to(fixedMenu,.3,{bottom:"-70px"})}function setPrestaSlider(e){function t(t){TweenLite.to(e.querySelector(".presta-slide.actif"),r,{left:l,opacity:0,onComplete:function(){TweenLite.set(e.querySelector(".presta-slide.actif"),{css:{className:"-=actif"}}),TweenLite.set(s[t],{css:{className:"+=actif"}}),TweenLite.fromTo(s[t],r,{left:"-"+l},{left:0,opacity:1,ease:Power2.easeInOut}),TweenLite.set(c,{css:{className:""}}),TweenLite.set(c[t],{css:{className:"actif"}})}})}function n(t){TweenLite.to(e.querySelector(".presta-slide.actif"),r,{left:"-"+l,opacity:0,onComplete:function(){TweenLite.set(e.querySelector(".presta-slide.actif"),{css:{className:"-=actif"}}),TweenLite.set(s[t],{css:{className:"+=actif"}}),TweenLite.fromTo(s[t],r,{left:l},{left:0,opacity:1,ease:Power2.easeInOut}),TweenLite.set(c,{css:{className:""}}),TweenLite.set(c[t],{css:{className:"actif"}})}})}var s=e.querySelectorAll(".presta-slide"),o=s.length,a=0,i=0,l="25%",r=.3,c=[],u=[],d=document.createElement("ul"),m=0,p=[],f=0;for(hasClass(htmlTag,"lt-ie9")&&(l="150%"),o>1&&(d.setAttribute("class","presta-nav"),e.appendChild(d)),a;o>a;a++)for(o>1&&(u[a]=document.createElement("li"),c[a]=document.createElement("button"),c[a].innerHTML=a,u[a].appendChild(c[a]),d.appendChild(u[a]),addEventListener(c[a],"click",function(){var s=getIndex(this.parentNode);getIndex(e.querySelector(".presta-slide.actif"))<s?t(s):n(s)}),a>0&&TweenLite.set(s[a],{left:l,opacity:0})),s[a].offsetHeight>i&&(i=s[a].offsetHeight),p[a]=s[a].querySelectorAll(".btnPrestaSlide"),f;f<p[a].length;f++)addEventListener(p[a][f],"click",function(s){s.preventDefault();var o=this.getAttribute("href").replace("#",""),a=document.getElementById(o),i=getIndex(a);getIndex(e.querySelector(".presta-slide.actif"))<i?t(i):n(i)});TweenLite.set(e.querySelector("ul"),{height:i+"px"}),o>1&&(TweenLite.set(s[0],{css:{className:"+=actif"}}),TweenLite.set(c[0],{css:{className:"actif"}}))}function parallaxPresta(e){var t=e[0].parentNode.parentNode;isVisible(t)&&(0>scrollDir?(TweenLite.to(e[0],.1,{bottom:"+=1px",rotation:"-=.2deg",ease:Linear.easeNone}),TweenLite.to(e[1],.1,{top:"+=1.5px",ease:Linear.easeNone})):(TweenLite.to(e[0],.1,{bottom:"-=1px",rotation:"+=.2deg",ease:Linear.easeNone}),TweenLite.to(e[1],.1,{top:"-=1.5px",ease:Linear.easeNone})))}function init(){if(isMobile.any)TweenLite.set(body,{css:{className:"+=isMobile"}});else{var e=document.querySelectorAll(".logo"),t=["mouche","banane","moustache","bisou"],n=Math.floor(Math.random()*t.length),s=[],o=0;for(o;o<e.length;o++)!function(o){s[o]=TweenMax.spriteSheet(e[o],{width:720,stepX:180,stepY:180,count:24},1,{delay:.1,paused:!0}),TweenLite.set(e[o],{css:{className:"+=sprite "+t[n]}}),addEventListener(e[o],"mouseover",function(){hasClass(header,"purple")||s[o].play()}),addEventListener(e[o],"mouseout",function(){hasClass(header,"purple")||s[o].reverse()})}(o)}var a=document.getElementById("burger");if(addEventListener(a,"click",function(){hasClass(htmlTag,"menuOpen")?(TweenLite.set(htmlTag,{css:{className:"-=menuOpen"}}),TweenLite.set(htmlTag,{css:{className:"+=menuClose"}}),TweenLite.to(menu.querySelector("div"),.4,{left:"100%",onComplete:function(){TweenLite.set(menu.querySelector("div"),{rotationY:90})}})):(TweenLite.set(htmlTag,{css:{className:"+=menuOpen"}}),TweenLite.set(htmlTag,{css:{className:"-=menuClose"}}),TweenLite.to(menu.querySelector("div"),1,{rotationY:0,left:0,ease:Bounce.easeOut}))}),hasClass(body,"home")&&bullshitGenerator(),!hasClass(htmlTag,"lt-ie9")&&(animsTxt=document.querySelectorAll(".animTxt"),animsTxt.length)){var o=0,i=animsTxt.length,l=[];for(o;i>o;o++)l[o]=new SplitText(animsTxt[o],{type:"words"}),splitTlAnimTxt[o]=new TimelineLite;animTxt(l)}var r=document.getElementById("phrase-creuse");null!==r&&setSentences(r);var c=document.getElementById("vous");null!==c&&linksHoverYou(c);var u=document.querySelectorAll(".slider");if(u.length){var o=0,d=u.length;for(o;d>o;o++)setSlider(u[o])}var m=document.getElementById("prestaSlider");if(null!==m&&setPrestaSlider(m),!isMobile.any){masques=document.getElementById("bgMasques"),null!==masques&&(animBgOn=!1,liveBgPos1=-100,liveBgPosFinal1=0,liveBgPos2=200,liveBgPosFinal2=100,masquesTop=document.getElementById("live").offsetTop,tweenBg=TweenLite.fromTo(masques,25,{backgroundPosition:liveBgPos1+"% "+liveBgPos2+"%"},{backgroundPosition:liveBgPosFinal1+"% "+liveBgPosFinal2+"%",ease:Linear.easeNone,onComplete:animBackground,onCompleteParams:["complete"],paused:!0}),animBackground());var p=document.querySelector(".blog-list");if(null!==p){var f=p.querySelectorAll(".black-hover-link"),o=0,T=f.length,w=[],g=[],h=[],y=[],L=[];for(o;T>o;o++)!function(e){g[e]=new TweenMax.to(f[e].querySelector(".hover"),.15,{padding:"10px",top:"12px",overflow:"visible",ease:Linear.easeNone}),h[e]=new TweenMax.to(f[e].querySelector(".sup-title"),.2,{opacity:"1",marginTop:"0",ease:Linear.easeNone}),y[e]=new TweenMax.to(f[e].querySelector(".content"),.25,{opacity:"1",marginTop:"0",ease:Linear.easeNone}),w[e]=new TimelineMax({paused:!0}).add(g[e]).add(h[e]).add(y[e]),L[e]=w[e].tweenFromTo(0,.6,{ease:Power2.easeInOut,paused:!0}),addEventListener(f[e],"mouseover",function(){L[e].play()}),addEventListener(f[e],"mouseout",function(){L[e].reverse()})}(o)}var v=document.getElementById("instagram");if(null!==v){var S=v.querySelector(".black-hover-link"),x=new TweenMax.to(S.querySelector(".hover"),.15,{padding:"10px",top:"0",height:"250px",overflow:"visible",ease:Power2.easeOut}),N=new TweenMax.to(S.querySelector(".sup-title"),.2,{opacity:"1",marginTop:"0",ease:Power2.easeOut}),b=new TweenMax.to(S.querySelector(".content"),.25,{opacity:"1",marginTop:"0",ease:Power2.easeOut}),q=new TimelineMax({paused:!0}).add(x).add(N).add(b),E=q.tweenFromTo(0,.6,{ease:Power2.easeInOut,paused:!0});addEventListener(S,"mouseover",function(){E.play()}),addEventListener(S,"mouseout",function(){E.reverse()})}var M=document.querySelectorAll(".presta-list");if(null!==M){var B=0,C=M.length,P=[],A=[],I=[],k=[],O=[],H=[],F=[],o=0;for(B;C>B;B++)for(o=0,H[B]=M[B].querySelectorAll(".orange-link"),F[B]=H[B].length,P[B]=[],A[B]=[],I[B]=[],k[B]=[],O[B]=[],o;o<F[B];o++)!function(e,t){A[e][t]=new TweenMax.to(H[e][t].querySelector(".hover"),.15,{top:"12px",overflow:"visible",ease:Linear.easeNone}),I[e][t]=new TweenMax.to(H[e][t].querySelector(".cat"),.25,{opacity:"1",marginTop:"10px",ease:Linear.easeNone}),k[e][t]=new TweenMax.to(H[e][t].querySelector(".link"),.25,{opacity:"1",marginTop:"0",ease:Linear.easeNone}),P[e][t]=new TimelineMax({paused:!0}).add(A[e][t]).add(I[e][t]).add(k[e][t]),O[e][t]=P[e][t].tweenFromTo(0,.65,{ease:Power2.easeInOut,paused:!0}),addEventListener(H[e][t],"mouseover",function(){O[e][t].play()}),addEventListener(H[e][t],"mouseout",function(){O[e][t].reverse()})}(B,o)}var W=document.querySelectorAll(".contact-link");if(null!=W){var o=0,Y=W.length,D=[],V=40;for(o;Y>o;o++)!function(e){D[e]=TweenMax.to(W[e],1,{backgroundPosition:"+="+V+"px -="+V+"px",ease:Linear.easeNone,paused:!0,onComplete:function(){V+=40,this.updateTo({backgroundPosition:V+"px "+V+"px"},!0)}}),addEventListener(W[e],"mouseover",function(){TweenMax.to(W[e],.8,{backgroundColor:"#fff",ease:Bounce.easeOut}),D[e].play()}),addEventListener(W[e],"mouseout",function(){TweenMax.to(W[e],.3,{backgroundColor:"#ffe180"}),D[e].pause()})}(o)}}var z=document.querySelector(".presta-filtres");if(null!==z){var G=z.querySelectorAll("button"),o=0,X=G.length,M=z.parentNode.querySelector(".presta-list"),R=M.querySelectorAll(".presta-item"),U=z.closest(".section");for(o;X>o;o++)addEventListener(G[o],"click",function(e){var t=this.getAttribute("data-cat-name"),n=document.querySelectorAll('[data-cat="'+t+'"]');scrollTo(U.offsetTop+60,300),TweenLite.set(G,{css:{className:"-=actif"}}),TweenLite.set(this,{css:{className:"+=actif"}}),"all"!==t?(TweenLite.set(R,{css:{className:"+=hidden"}}),TweenLite.set(n,{css:{className:"-=hidden"}})):TweenLite.set(R,{css:{className:"-=hidden"}})})}var j=document.querySelectorAll(".scrollTo");if(j.length&&!isMobile.windows.phone){var o=0,J=j.length;for(o;J>o;o++)addEventListener(j[o],"click",function(e){e.preventDefault();var t=document.getElementById(this.getAttribute("href").replace("#",""));scrollTo(t.offsetTop,300),this.blur()})}}function ready(e){"loading"!==document.readyState?e():document.addEventListener?document.addEventListener("DOMContentLoaded",e):document.attachEvent("onreadystatechange",function(){"loading"!==document.readyState&&e()})}!function(e){e.matches=e.matches||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector||e.webkitMatchesSelector,e.closest=e.closest||function t(e){for(var t=this;t&&!t.matches(e);)t=t.parentElement;return t}}(Element.prototype);var firstAnimSlider=!1,currentSlide=0,body=document.getElementsByTagName("body")[0],htmlTag=document.getElementsByTagName("html")[0],pageContent=document.getElementById("page-content"),header=document.getElementById("header"),menu=document.getElementById("main-menu"),splitTlAnimTxt=[],decalTxt="+=60",animsTxt,windowHeight=window.innerHeight,windowWidth=window.innerWidth,fixedMenu=document.getElementById("fixedMenu"),prestaSectionAteliers=document.getElementById("ateliers"),prestaSectionInterventions=document.getElementById("interventions"),prestaSectionFormations=document.getElementById("formations"),lastScrollTop=0,scrollDir;window.onscroll=function(e){myScroll=document.documentElement.scrollTop||document.body.scrollTop,isMobile.any||(animTxtScroll(),null!==masques&&animBackgroundScroll(),firstAnimSlider||animFirstSlide(),null!==fixedMenu&&animFixedMenu()),null!==pageContent&&windowWidth>979&&animMenuScroll(),hasClass(body,"page-template-presta")&&(detectScrollDir(),parallaxPresta(document.querySelectorAll(".bg-ateliers")),parallaxPresta(document.querySelectorAll(".bg-interventions")))},window.onresize=function(){windowHeight=window.innerHeight,windowWidth=window.innerWidth,hasClass(htmlTag,"menuOpen")?windowWidth>979?TweenLite.set(document.getElementById("fdMenu"),{css:{className:"+=close"}}):TweenLite.set(document.getElementById("fdMenu"),{css:{className:"-=close"}}):hasClass(htmlTag,"menuClose")&&windowWidth>979&&TweenLite.set(menu.querySelector("div"),{rotationY:0})},ready(init);