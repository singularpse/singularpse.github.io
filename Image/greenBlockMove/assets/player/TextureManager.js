var KNStaticAssets={};KNStaticAssets["KNTransitionSwoosh_Shadow.png"]=new Image();KNStaticAssets["KNTransitionSwoosh_Shadow.png"].src=static_url("KNTransitionSwoosh_Shadow.png");KNStaticAssets["KNTransitionSlide_Black.png"]=new Image();KNStaticAssets["KNTransitionSlide_Black.png"].src=static_url("KNTransitionSlide_Black.png");var TextureManager=Class.create({initialize:function(a){this.script=null;this.showUrl=a;this.sceneCache={};this.slideCache={};this.sceneDidLoadCallbackHandler=null;this.viewScale=1;document.observe(kScriptDidDownloadEvent,(function(b){this.handleScriptDidDownloadEvent(b)}).bind(this),false)},setSceneDidLoadCallbackHandler:function(a,b){this.sceneDidLoadCallbackHandler={handler:a,sceneIndex:b}},processTextureDidLoadCallback:function(d,b){if(this.sceneDidLoadCallbackHandler==null){return}var c=this.sceneDidLoadCallbackHandler.sceneIndex;var a=this.script.slideIndexFromSceneIndexLookup[c];if(a!=b){return}if(this.isSlidePreloaded(b)){this.callSceneDidLoadCallback()}},processSlideDidLoadCallback:function(b){if(this.sceneDidLoadCallbackHandler==null){return}var c=this.sceneDidLoadCallbackHandler.sceneIndex;var a=this.script.slideIndexFromSceneIndexLookup[c];if(a!=b){return}this.callSceneDidLoadCallback()},processSceneDidLoadCallback:function(a){if(this.sceneDidLoadCallbackHandler&&a===this.sceneDidLoadCallbackHandler.sceneIndex&&this.isScenePreloaded(a)){this.callSceneDidLoadCallback()}},callSceneDidLoadCallback:function(){this.sceneDidLoadCallbackHandler.handler();this.sceneDidLoadCallbackHandler=null},loadScene:function(c,a){if(c<0||c>this.script.numScenes){return}if(a){this.setSceneDidLoadCallbackHandler(a,c)}var b=this.script.slideIndexFromSceneIndexLookup[c];if(this.delegate.loadTextureBySlideIndex){this.assetForSlide(b)}else{this.requestSlideSvgmap(b)}},preloadScenes:function(a){for(var c in a){var b=this.script.slideIndexFromSceneIndexLookup[c];if(b==null){continue}if(this.slideCache.hasOwnProperty(b)===false){this.loadScene(c)}}},isSlidePreloaded:function(b){var a=false;if(this.slideCache[b]){a=true;for(var c in this.slideCache[b].textureRequests){if(this.slideCache[b].textureRequests[c]===false){a=false;break}}}return a},isScenePreloaded:function(c){var b=this.script.slideIndexFromSceneIndexLookup[c];var a=this.isSlidePreloaded(b);return a},handleScriptDidDownloadEvent:function(a){this.script=a.memo.script;this.delegate=a.memo.delegate},assetForSlide:function(f){var d=this.slideCache[f];var c=this.script.slideList[f];var b=this.script.slides[c];var a=b.assets;if(d==null){this.slideCache[f]={};this.slideCache[f].textureAssets={};this.slideCache[f].textureRequests={};for(var g in a){var e=a[g];if(e.type==="texture"){this.slideCache[f].textureRequests[g]=false;this.requestAsset(g,e,c,f)}}}else{if(this.isSlidePreloaded(f)){this.processSlideDidLoadCallback(f)}else{for(var g in a){var e=a[g];if(this.slideCache[f].textureRequests[g]===false&&e.type==="texture"){this.requestAsset(g,e,c,f)}}}}},requestAsset:function(d,b,a,c){requestedSlideIndex=c;if(b.assetRequest.type==="slide"){if(b.assetRequest.state==="incoming"||b.assetRequest.state==="incoming-reflection"){if(b.assetRequest.slide){requestedSlideIndex=this.script.slideList.indexOf(b.assetRequest.slide);if(requestedSlideIndex===-1){if(this.script.loopSlideshow){requestedSlideIndex=0}else{requestedSlideIndex=c;b.assetRequest.state="KNTransitionSlide_Black.png"}}}else{if(c</0||c>