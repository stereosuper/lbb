function scrollTo(e,t){if(!(0>t)){var n=document.body.scrollTop+document.documentElement.scrollTop,s=e-n,o=s/t*10;setTimeout(function(){n+=o,document.body.scrollTop=n,document.documentElement.scrollTop=n,n!==e&&scrollTo(e,t-10)},10)}}function addEventListener(e,t,n){e.addEventListener?e.addEventListener(t,n):e.attachEvent?e.attachEvent("on"+t,function(){n.call(e)}):e["on"+t]=n}function hasClass(e,t){return e.classList?e.classList.contains(t):new RegExp("(^| )"+t+"( |$)","gi").test(e.className)}function shuffle(e){for(var t=e.length,n,s;t>1;)s=Math.floor(Math.random()*t--),s!==t&&(n=e[t],e[t]=e[s],e[s]=n);return e}function getStyle(e,t){var n="";return document.defaultView&&document.defaultView.getComputedStyle?n=document.defaultView.getComputedStyle(e,"").getPropertyValue(t):e.currentStyle&&(t=t.replace(/\-(\w)/g,function(e,t){return t.toUpperCase()}),n=e.currentStyle[t]),n}function getIndex(e){var t=e.parentNode.childNodes,n=t.length,s=0;for(s;n>s&&e!==t[s];s++);return s}function setSlider(e){function t(){TweenLite.to(s[currentSlide],u,{left:c,opacity:0,onComplete:function(){o-1>currentSlide?currentSlide++:currentSlide=0,TweenLite.fromTo(s[currentSlide],u,{left:"-"+c},{left:0,opacity:1,ease:Power2.easeInOut}),m.staggerFromTo(s[currentSlide].querySelectorAll(".anim-slide"),u,{x:"-200px",opacity:0},{x:0,opacity:1,ease:Power2.easeInOut},.2)}})}function n(){TweenLite.to(s[currentSlide],u,{left:"-"+c,opacity:0,onComplete:function(){currentSlide>0?currentSlide--:currentSlide=o-1,TweenLite.fromTo(s[currentSlide],u,{left:c},{left:0,opacity:1,ease:Power2.easeInOut}),m.staggerFromTo(s[currentSlide].querySelectorAll(".anim-slide"),u,{x:"200px",opacity:0},{x:0,opacity:1,ease:Power2.easeInOut},.2)}})}var s=e.querySelectorAll(".slide"),o=s.length,a=0,i=document.createElement("button"),l=document.createElement("button"),r=0,c="25%",u=.3,m=new TimelineLite;for(hasClass(htmlTag,"lt-ie9")&&(c="150%"),a;o>a;a++)a>0&&TweenLite.set(s[a],{left:c,opacity:0}),s[a].offsetHeight>r&&(r=s[a].offsetHeight);TweenLite.set(e.querySelector("ul"),{height:r+"px"}),TweenLite.set(s[0].querySelectorAll(".anim-slide"),{opacity:1}),l.setAttribute("id","prev"),l.innerHTML="Prev",e.appendChild(l),addEventListener(l,"click",n),i.setAttribute("id","next"),i.innerHTML="Next",e.appendChild(i),addEventListener(i,"click",t)}function animFirstSlide(e){if(null!==document.getElementById("confiance")){var e=document.getElementById("confiance"),t=e.querySelectorAll(".slide");if(TweenLite.set(t[0].querySelectorAll(".anim-slide"),{opacity:0}),myScroll>=e.offsetTop-windowHeight/3){firstAnimSlider=!0;var n="25%",s=.3,o=new TimelineLite;TweenLite.to(t[0],s,{left:n,opacity:0,onComplete:function(){TweenLite.fromTo(t[1],s,{left:"-"+n},{left:0,opacity:1,ease:Power2.easeInOut}),o.staggerFromTo(t[1].querySelectorAll(".anim-slide"),s,{x:"-200px",opacity:0},{x:0,opacity:1,ease:Power2.easeInOut},.2)}}),currentSlide=1}}else firstAnimSlider=!0}function animBackground(e){animBgOn?e?(liveBgPos1+=100,liveBgPosFinal1+=100,liveBgPos2-=100,liveBgPosFinal2-=100,tweenBg=TweenLite.fromTo(masques,25,{backgroundPosition:liveBgPos1+"% "+liveBgPos2+"%"},{backgroundPosition:liveBgPosFinal1+"% "+liveBgPosFinal2+"%",ease:Linear.easeNone,onComplete:animBackground,onCompleteParams:["complete"]})):tweenBg.play():tweenBg.pause()}function animBackgroundScroll(){myScroll>masquesTop-windowHeight/2?myScroll>masquesTop+masques.offsetHeight-windowHeight/2?(TweenLite.set(masques,{css:{className:"-=on"}}),animBgOn=!1,animBackground()):(TweenLite.set(masques,{css:{className:"+=on"}}),animBgOn=!0,animBackground()):(TweenLite.set(masques,{css:{className:"-=on"}}),animBgOn=!1,animBackground())}function linksHoverYou(e){var t=e.querySelectorAll("a.animTxt"),n=t.length,s=0;for(s;n>s;s++)!function(n){addEventListener(t[n],"mouseover",function(){TweenLite.set(this,{css:{className:"+=on"}}),TweenLite.set(e,{css:{className:"+=fade fade"+parseInt(n+1)}})}),addEventListener(t[n],"mouseout",function(){TweenLite.set(this,{css:{className:"-=on"}}),TweenLite.set(e,{css:{className:"-=fade"}}),TweenLite.set(e,{css:{className:"-=fade"+parseInt(n+1)}})})}(s)}function bullshitGenerator(){function e(e,t,n){var s=e.querySelector("#"+n);s?(TweenLite.set(s,{css:{className:"-=full"}}),TweenLite.set(s,{css:{className:"-=big"}}),setTimeout(function(){s.parentNode.removeChild(s)},T)):(e.appendChild(t),TweenLite.set(t,{css:{className:"+=big"},delay:.01,onComplete:function(){TweenLite.set(t,{css:{className:"+=full"},delay:w})}}))}var t=[["img/bullshit/profond-purple.png",!1,!1],["img/bullshit/entreprise-purple.png",!1,!1]],n=[["img/bullshit/no-clic-yellow.png","click","img/bullshit/licorne.gif"],["img/bullshit/fuck-yellow.png",!1,!1]],s=[["img/bullshit/no-clic-blue.png","click","img/bullshit/lama.jpg"],["img/bullshit/profond-blue.png",!1,!1]],o=[t,n,s],a=[document.querySelector(".bg-purple"),document.querySelector(".bg-yellow"),document.querySelector(".bg-blue")],i=["top-left","top-right","top-center","bottom-left","bottom-right","bottom-center"],l=0,r,c=[],u=[],m=[],d=[],p=[],f=3,g=0,w=.8,T=400,h=o.length;for(l;h>l;l++)for(r=0,c[l]=[],u[l]=[],m[l]=[],p=[],d[l]=[],shuffle(o[l]),g=o[l].length<f?o[l].length:f,r;g>r;r++)!function(t,n){if(p[n]=Math.floor(Math.random()*i.length),void 0!==p[n-1]&&p[n]===p[n-1])for(;p[n]===p[n-1];)p[n]=Math.floor(Math.random()*i.length);u[t][n]=document.createElement("img"),u[t][n].setAttribute("src",o[t][n][0]),c[t][n]=document.createElement("button"),c[t][n].appendChild(u[t][n]),TweenLite.set(c[t][n],{css:{className:"+=bullshitBtn "+i[p[n]]}}),a[t].appendChild(c[t][n]),o[t][n][1]?(d[t][n]=document.createElement("div"),d[t][n].setAttribute("id","pop-"+t+"-"+n),TweenLite.set(d[t][n],{css:{className:"+=bullshit"}}),m[t][n]=document.createElement("img"),m[t][n].setAttribute("src",o[t][n][2]),d[t][n].appendChild(m[t][n]),addEventListener(c[t][n],o[t][n][1],function(){e(a[t],d[t][n],"pop-"+t+"-"+n)}),addEventListener(d[t][n],o[t][n][1],function(){var e=this;TweenLite.set(e,{css:{className:"-=full"}}),TweenLite.set(e,{css:{className:"-=big"}}),setTimeout(function(){e.parentNode.removeChild(e)},T)})):TweenLite.set(c[t][n],{css:{className:"+=not-a-btn"}})}(l,r)}function setSentences(e){function t(){TweenLite.set(r,{css:{className:"-=open"}}),TweenLite.set(r,{css:{className:"+=close"}}),g>u&&w>c&&!y?(TweenLite.to(r,.3,{left:u+"px"}),u+=15):u>=g&&w>c?(u=T,TweenLite.set(r,{left:u+"px"}),TweenLite.to(r,.3,{top:c+"px"}),TweenLite.set(r,{css:{className:"+=on-right"}}),c+=15):u>=g&&c>=w&&!y?(u=T-4,c=h,TweenLite.set(r,{top:c+"px"}),TweenLite.to(r,.3,{left:u+"px"}),TweenLite.set(r,{css:{className:"-=on-right"}}),TweenLite.set(r,{css:{className:"+=on-bottom"}}),u-=15,y=!0):u>f&&c>=w&&y?(TweenLite.to(r,.3,{left:u+"px"}),u-=15):f>=u&&c>25&&y?(u=f-55,TweenLite.set(r,{left:u+"px"}),TweenLite.to(r,.3,{top:c+"px"}),TweenLite.set(r,{css:{className:"-=on-bottom"}}),TweenLite.set(r,{css:{className:"+=on-left"}}),c-=15):f>=u&&25>=c&&(y=!1,c=p,u=-20,TweenLite.set(r,{top:c+"px"}),TweenLite.set(r,{left:u+"px"}),TweenLite.set(r,{css:{className:"-=on-left"}}),u+=15)}function n(){t();var e=Math.floor(Math.random()*o);if(e===l)for(;e===l;)e=Math.floor(Math.random()*o);l=e,TweenLite.fromTo(i,.2,{opacity:1},{opacity:0,onComplete:function(){a.blur(),i.querySelector("span").innerHTML=s[e],TweenLite.fromTo(i,.2,{opacity:0},{opacity:1}),TweenLite.set(r,{css:{className:"-=close"}}),TweenLite.set(r,{css:{className:"+=open"}})}})}var s=["Stop aux acronymes, travaillons l'U.M.1","Une autre phrase creuse","Des trucs et des machins"],o=s.length,a=e.querySelector("button"),i=e.querySelector("p"),l=0,r=document.getElementById("cisors"),c=parseInt(getStyle(r,"top")),u=parseInt(getStyle(r,"left")),m=e.offsetHeight,d=e.offsetWidth,p=c,f=u,g=d-25,w=m-28,T=d+24,h=m+23,y=!1;TweenLite.set(i,{width:i.offsetWidth+"px",height:i.offsetHeight+"px"}),addEventListener(a,"click",n),addEventListener(e,"mouseout",function(){TweenLite.set(r,{css:{className:"-=open"}})})}function animTxtScroll(){function e(e){hasClass(e,"on")||TweenLite.set(e,{css:{className:"+=on"},delay:.2})}function t(e){hasClass(e,"on")&&TweenLite.set(e,{css:{className:"-=on"},delay:.2})}var n=splitTlAnimTxt.length,s=0,o=[],a=[];for(s;n>s;s++)o[s]=animsTxt[s].closest(".section"),a[s]=o[s].querySelector(".container"),myScroll>=o[s].offsetTop+windowHeight/3?(decalTxt="+=100",splitTlAnimTxt[s].reverse(),hasClass(body,"presta")||e(a[s])):myScroll>=o[s].offsetTop-windowHeight/2?(hasClass(body,"presta")||t(a[s]),splitTlAnimTxt[s].play()):(splitTlAnimTxt[s].reverse(),hasClass(body,"presta")||e(a[s]))}function animTxt(e){var t=0,n=splitTlAnimTxt.length;for(t;n>t;t++){e[t].split({type:"words"});var s=0,o=e[t].words,a=o.length;for(s;a>s;s++)splitTlAnimTxt[t].from(o[s],.4,{ease:Expo.easeInOut,css:{opacity:0,scaleX:.5,scaleY:.5,y:decalTxt}},.03*s)}}function animMenuScroll(){myScroll>=pageContent.offsetTop-100?(TweenLite.set(header,{css:{className:"+=purple"}}),TweenLite.set(menu,{css:{className:"+=purple"}})):(TweenLite.set(header,{css:{className:"-=purple"}}),TweenLite.set(menu,{css:{className:"-=purple"}}))}function animFixedMenu(){if(myScroll>200){TweenLite.to(fixedMenu,.3,{top:0});var e=fixedMenu.querySelectorAll("li");myScroll>=prestaSectionAteliers.offsetTop+prestaSectionAteliers.offsetHeight?myScroll>=prestaSectionInterventions.offsetTop+prestaSectionInterventions.offsetHeight?hasClass(fixedMenu,"step3")||(TweenLite.set(e[0],{css:{className:"-=hide"}}),TweenLite.set(e[1],{css:{className:"up"}}),TweenLite.set(e[1],{css:{className:"+=right"}}),TweenLite.set(e[2],{css:{className:"+=hide"}}),TweenLite.set(fixedMenu,{css:{className:"second-menu step3"}})):hasClass(fixedMenu,"step2")||(TweenLite.set(e[0],{css:{className:"-=hide"}}),hasClass(fixedMenu,"step3")?TweenLite.set(e[1],{css:{className:"down hide right"}}):TweenLite.set(e[1],{css:{className:"down hide"}}),TweenLite.set(e[2],{css:{className:"-=hide"}}),TweenLite.set(fixedMenu,{css:{className:"second-menu step2"}})):hasClass(fixedMenu,"step1")||(TweenLite.set(e[0],{css:{className:"+=hide"}}),TweenLite.set(e[1],{css:{className:"down"}}),TweenLite.set(e[2],{css:{className:"-=hide"}}),TweenLite.set(fixedMenu,{css:{className:"second-menu step1"}}))}else TweenLite.to(fixedMenu,.3,{top:"-70px"})}function setPrestaSlider(e){function t(t){TweenLite.to(e.querySelector(".presta-slide.actif"),l,{left:i,opacity:0,onComplete:function(){TweenLite.set(e.querySelector(".presta-slide.actif"),{css:{className:"-=actif"}}),TweenLite.set(n[t],{css:{className:"+=actif"}}),TweenLite.fromTo(n[t],l,{left:"-"+i},{left:0,opacity:1,ease:Power2.easeInOut}),TweenLite.set(r,{css:{className:""}}),TweenLite.set(r[t],{css:{className:"actif"}})}})}var n=e.querySelectorAll(".presta-slide"),s=n.length,o=0,a=0,i="25%",l=.3,r=[],c=[],u=document.createElement("ul"),m=0;for(hasClass(htmlTag,"lt-ie9")&&(i="150%"),u.setAttribute("class","presta-nav"),e.appendChild(u),o;s>o;o++)c[o]=document.createElement("li"),r[o]=document.createElement("button"),r[o].innerHTML=o,c[o].appendChild(r[o]),u.appendChild(c[o]),addEventListener(r[o],"click",function(){t(getIndex(this.parentNode))}),o>0&&TweenLite.set(n[o],{left:i,opacity:0}),n[o].offsetHeight>a&&(a=n[o].offsetHeight);TweenLite.set(e.querySelector("ul"),{height:a+"px"}),TweenLite.set(n[0],{opacity:1}),TweenLite.set(n[0],{css:{className:"+=actif"}}),TweenLite.set(r[0],{css:{className:"actif"}})}function init(){if(isMobile.any)TweenLite.set(body,{css:{className:"+=isMobile"}});else{var e=document.querySelectorAll(".logo"),t=["mouche","banane","moustache","bisou"],n=Math.floor(Math.random()*t.length),s=[],o=0;for(o;o<e.length;o++)!function(o){s[o]=TweenMax.spriteSheet(e[o],{width:720,stepX:180,stepY:180,count:24},1,{delay:.1,paused:!0}),TweenLite.set(e[o],{css:{className:"+=sprite "+t[n]}}),addEventListener(e[o],"mouseover",function(){hasClass(header,"purple")||s[o].play()}),addEventListener(e[o],"mouseout",function(){hasClass(header,"purple")||s[o].reverse()})}(o)}var a=document.getElementById("burger");if(addEventListener(a,"click",function(){hasClass(htmlTag,"menuOpen")?(TweenLite.set(htmlTag,{css:{className:"-=menuOpen"}}),TweenLite.to(menu.querySelector("div"),.4,{left:"100%",onComplete:function(){TweenLite.set(menu.querySelector("div"),{rotationY:90})}})):(TweenLite.set(htmlTag,{css:{className:"+=menuOpen"}}),TweenLite.to(menu.querySelector("div"),1,{rotationY:0,left:0,ease:Bounce.easeOut}))}),hasClass(body,"home")&&bullshitGenerator(),!hasClass(htmlTag,"lt-ie9")&&(animsTxt=document.querySelectorAll(".animTxt"),animsTxt.length)){var o=0,i=animsTxt.length,l=[];for(o;i>o;o++)l[o]=new SplitText(animsTxt[o],{type:"words"}),splitTlAnimTxt[o]=new TimelineLite;animTxt(l)}var r=document.getElementById("phrase-creuse");null!==r&&setSentences(r);var c=document.getElementById("vous");null!==c&&linksHoverYou(c);var u=document.querySelectorAll(".slider");if(u.length){var o=0,m=u.length;for(o;m>o;o++)setSlider(u[o])}var d=document.getElementById("prestaSlider");if(null!==d&&setPrestaSlider(d),!isMobile.any){masques=document.getElementById("bgMasques"),null!==masques&&(animBgOn=!1,liveBgPos1=-100,liveBgPosFinal1=0,liveBgPos2=200,liveBgPosFinal2=100,masquesTop=document.getElementById("live").offsetTop,tweenBg=TweenLite.fromTo(masques,25,{backgroundPosition:liveBgPos1+"% "+liveBgPos2+"%"},{backgroundPosition:liveBgPosFinal1+"% "+liveBgPosFinal2+"%",ease:Linear.easeNone,onComplete:animBackground,onCompleteParams:["complete"],paused:!0}),animBackground());var p=document.querySelector(".blog-list");if(null!==p){var f=p.querySelectorAll(".black-hover-link"),o=0,g=f.length,w=[],T=[],h=[],y=[],L=[];for(o;g>o;o++)!function(e){T[e]=new TweenMax.to(f[e].querySelector(".hover"),.15,{padding:"10px",top:"12px",overflow:"visible",ease:Linear.easeNone}),h[e]=new TweenMax.to(f[e].querySelector(".sup-title"),.2,{opacity:"1",marginTop:"0",ease:Linear.easeNone}),y[e]=new TweenMax.to(f[e].querySelector(".content"),.25,{opacity:"1",marginTop:"0",ease:Linear.easeNone}),w[e]=new TimelineMax({paused:!0}).add(T[e]).add(h[e]).add(y[e]),L[e]=w[e].tweenFromTo(0,.6,{ease:Power2.easeInOut,paused:!0}),addEventListener(f[e],"mouseover",function(){L[e].play()}),addEventListener(f[e],"mouseout",function(){L[e].reverse()})}(o)}var v=document.getElementById("instagram");if(null!==v){var S=v.querySelector(".black-hover-link"),x=new TweenMax.to(S.querySelector(".hover"),.15,{padding:"10px",top:"0",height:"250px",overflow:"visible",ease:Power2.easeOut}),b=new TweenMax.to(S.querySelector(".sup-title"),.2,{opacity:"1",marginTop:"0",ease:Power2.easeOut}),N=new TweenMax.to(S.querySelector(".content"),.25,{opacity:"1",marginTop:"0",ease:Power2.easeOut}),I=new TimelineMax({paused:!0}).add(x).add(b).add(N),E=I.tweenFromTo(0,.6,{ease:Power2.easeInOut,paused:!0});addEventListener(S,"mouseover",function(){E.play()}),addEventListener(S,"mouseout",function(){E.reverse()})}var M=document.querySelectorAll(".presta-list");if(null!==M){var q=0,B=M.length,C=[],P=[],A=[],k=[],O=[],H=[],F=[];for(q;B>q;q++){var o=0;for(H[q]=M[q].querySelectorAll(".orange-link"),F[q]=H[q].length,C[q]=[],P[q]=[],A[q]=[],k[q]=[],O[q]=[],o;o<F[q];o++)!function(e,t){P[e][t]=new TweenMax.to(H[e][t].querySelector(".hover"),.15,{top:"12px",overflow:"visible",ease:Linear.easeNone}),A[e][t]=new TweenMax.to(H[e][t].querySelector(".cat"),.2,{opacity:"1",marginTop:"10px",ease:Linear.easeNone}),k[e][t]=new TweenMax.to(H[e][t].querySelector(".link"),.25,{opacity:"1",marginTop:"0",ease:Linear.easeNone}),C[e][t]=new TimelineMax({paused:!0}).add(P[e][t]).add(A[e][t]).add(k[e][t]),O[e][t]=C[e][t].tweenFromTo(0,.6,{ease:Power2.easeInOut,paused:!0}),addEventListener(H[e][t],"mouseover",function(){O[e][t].play()}),addEventListener(H[e][t],"mouseout",function(){O[e][t].reverse()})}(q,o)}}var _=document.querySelectorAll(".contact-link");if(null!=_){var o=0,Y=_.length,W=[],V=40;for(o;Y>o;o++)!function(e){W[e]=TweenMax.to(_[e],1,{backgroundPosition:"+="+V+"px -="+V+"px",ease:Linear.easeNone,paused:!0,onComplete:function(){V+=40,this.updateTo({backgroundPosition:V+"px "+V+"px"},!0)}}),addEventListener(_[e],"mouseover",function(){W[e].play()}),addEventListener(_[e],"mouseout",function(){W[e].pause()})}(o)}}var D=document.querySelectorAll(".scrollTo");if(D.length&&!isMobile.windows.phone){var o=0,U=D.length;for(o;U>o;o++)addEventListener(D[o],"click",function(e){e.preventDefault();var t=document.getElementById(this.getAttribute("href").replace("#",""));scrollTo(t.offsetTop,300)})}}function ready(e){"loading"!==document.readyState?e():document.addEventListener?document.addEventListener("DOMContentLoaded",e):document.attachEvent("onreadystatechange",function(){"loading"!==document.readyState&&e()})}function preloader(){if(document.images){var e=new Image,t=new Image,n=new Image,s=new Image,o=new Image,a=new Image,i=new Image,l=new Image;if(e.src="layoutImg/_logo-banane@2x.png",t.src="layoutImg/_logo-banane.png",n.src="layoutImg/_logo-bisou@2x.png",s.src="layoutImg/_logo-bisou.png",o.src="layoutImg/_logo-mouche@2x.png",a.src="layoutImg/_logo-mouche.png",i.src="layoutImg/_logo-moustache@2x.png",l.src="layoutImg/_logo-moustache.png",hasClass(body,"home")){var r=new Image,c=new Image,u=new Image,m=new Image,d=new Image,p=new Image;r.src="layoutImg/vous/fouet.png",c.src="layoutImg/vous/noise.png",u.src="layoutImg/vous/teletubies.png",m.src="layoutImg/vous/tronconneuse.png",d.src="img/bullshit/licorne.gif",p.src="img/bullshit/lama.jpg"}if(hasClass(body,"page")){var f=new Image,g=new Image;f.src="layoutImg/logo-rose.png",g.src="layoutImg/logo-rose-small.png"}}}function onLoadEvt(e){var t=window.onload;"function"!=typeof window.onload?window.onload=e:window.onload=function(){t&&t(),e()}}!function(e){e.matches=e.matches||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector||e.webkitMatchesSelector,e.closest=e.closest||function t(e){for(var t=this;t&&!t.matches(e);)t=t.parentElement;return t}}(Element.prototype);var firstAnimSlider=!1,currentSlide=0,body=document.getElementsByTagName("body")[0],htmlTag=document.getElementsByTagName("html")[0],pageContent=document.getElementById("page-content"),header=document.getElementById("header"),menu=document.getElementById("main-menu"),splitTlAnimTxt=[],decalTxt="+=60",animsTxt,windowHeight=window.innerHeight,windowWidth=window.innerWidth,fixedMenu=document.getElementById("fixedMenu"),prestaSectionAteliers=document.getElementById("ateliers"),prestaSectionInterventions=document.getElementById("interventions");window.onscroll=function(e){myScroll=document.documentElement.scrollTop||document.body.scrollTop,isMobile.any||(animTxtScroll(),null!==masques&&animBackgroundScroll(),firstAnimSlider||animFirstSlide(),null!=fixedMenu&&animFixedMenu()),null!==pageContent&&windowWidth>979&&animMenuScroll()},ready(init),onLoadEvt(preloader);