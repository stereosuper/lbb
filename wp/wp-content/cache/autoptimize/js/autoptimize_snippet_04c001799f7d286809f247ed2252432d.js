var _TweenSpriteCounters=[];TweenMax.sequence=function(e,t,n,s){s||(s={});var o=_TweenSpriteCounters.length;return _TweenSpriteCounters.push({counter:0}),s.counter=t.length,s.onUpdateParams=[o,t,e],s.ease=SteppedEase.config(t.length+1),s.onUpdate=function(e,t,n){_TweenSpriteCounters[e].counter<t.length&&t[Math.ceil(_TweenSpriteCounters[e].counter)]&&(n.src=t[Math.ceil(_TweenSpriteCounters[e].counter)])},TweenMax.to(_TweenSpriteCounters[o],n,s)},TweenMax.spriteSheet=function(e,t,n,s){s||(s={});var o=_TweenSpriteCounters.length;return _TweenSpriteCounters.push({counter:0}),t.data?(t.original&&(e.style.position="relative"),t.count=t.data.length,s.onUpdate=function(e,t,n){var s=Math.ceil(_TweenSpriteCounters[e].counter);s<t.count&&(n.style.backgroundPositionX="-"+t.data[s][0],n.style.backgroundPositionY="-"+t.data[s][1],n.style.width=t.data[s][2],n.style.height=t.data[s][3],t.original&&(n.style.left=-(parseInt(t.data[s][2])-parseInt(t.original[0]))/2+"px",n.style.top=-(parseInt(t.data[s][3])-parseInt(t.original[1]))/2+"px"))}):("string"==typeof t.stepX?(t._stepXunits=t.stepX.replace(parseFloat(t.stepX),""),t.stepX=parseFloat(t.stepX)):t._stepXunits="px","string"==typeof t.stepY?(t._stepYunits=s.stepY.replace(parseFloat(t.stepY),""),t.stepY=parseFloat(s.stepY)):t._stepYunits="px",t._spritesInRow=Math.floor("%"==t._stepXunits?100/t.stepX:t.width/t.stepX),t.offsetX||(t.offsetX=0),t.offsetY||(t.offsetY=0),s.onUpdate=function(e,t,n){if(_TweenSpriteCounters[e].counter<t.count-1){var s=Math.ceil(_TweenSpriteCounters[e].counter);n.style.backgroundPositionX="-"+(t.offsetX+t.stepX*(s%t._spritesInRow))+t._stepXunits,n.style.backgroundPositionY="-"+(t.offsetY+t.stepY*Math.floor(s/t._spritesInRow))+t._stepYunits}}),s.counter=t.count,s.onUpdateParams=[o,t,e],s.ease=SteppedEase.config(t.count+1),TweenMax.to(_TweenSpriteCounters[o],n,s)};