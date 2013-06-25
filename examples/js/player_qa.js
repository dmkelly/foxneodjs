/* Generated by Player Template 1.0 */

FDM_Player_vars = {
	flash:		11,
	host:		((window.location.protocol == 'https:')?'https':'http') + '://player.foxfdm.com',
	events:		[],
	isFlash:	0,
	isIOS:		0
};

var aamtt = {
	isAd:false
	,form:''
	,twentyfive:false
	,fifty:false
	,seventyfive:false
	,complete:false
};
var FDMtpHead		= document.getElementsByTagName('head')[0],
	FDMtpBaseUrl	= document.createElement('meta'),
	FDMtpPreferredFormat	= document.createElement('meta'),
	FDMtpPreferredRuntime	= document.createElement('meta');

FDMtpBaseUrl.name		= 'tp:baseUrl';
FDMtpBaseUrl.content	= FDM_Player_vars.host + '/shared/1.4.526/pdk';

FDMtpPreferredFormat.name		= 'tp:preferredFormats';
FDMtpPreferredFormat.content	= 'mpeg4,webm,ogg,flv';

FDMtpPreferredRuntime.name		= 'tp:PreferredRuntimes';
FDMtpPreferredRuntime.content	= 'flash,html5';


FDMtpHead.appendChild(FDMtpBaseUrl);
FDMtpHead.appendChild(FDMtpPreferredFormat);
FDMtpHead.appendChild(FDMtpPreferredRuntime);

FDM_Player_vars.layouts = {
	swfSkinURL:'/fox/swf/skinFox.swf',
	jsSkinURL:'/fox/config/fox.json',
	defaultLayoutUrl:'/fox/config/foxLayout.xml',
	html5LayoutUrl:'',
	liveLayoutUrl: '/fox/config/liveLayout.xml',
	dvrLayoutUrl: '/fox/config/dvrLayout.xml',
	dvrLiveLayoutUrl: '/fox/config/dvrLiveLayout.xml',
	play_overlay_x_offset:'50',
	play_overlay_y_offset:'50'
};

FDM_Player_vars.colors = {
	backgroundColor:'0x000000',
	controlBackgroundColor:'0x000000',
	controlColor:'0xFFFFFF',
	controlHoverColor:'0x00b4ff',
	controlSelectedColor:'0x000000',
	disabledColor:'0x000000',
	fp_bgcolor:'0x000000',
	frameColor:'0x000000',
	playProgressColor:'0x00b4ff',
	textColor:'0xBEBEBE',
	loadProgressColor:'0xBEBEBE',
	controlHighlightColor:'0x00b4ff'
};

function FDM_Player_kill() {
	p = null;
}

function FDM_Player(i,w,h,pst,pre) {
    this.id = i;
    this.wd = w;
    this.hd = h;
 
    var self = this;
    var b = document.getElementsByTagName('body')[0],
        j = document.createElement('script'),
        lf = function() {
            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                self.init(pst,pre);
            }
        };
 
    j.type='text/javascript';
    j.src=FDM_Player_vars.host+'/shared/1.4.526/pdk/tpPdk.js';
 
    j.onreadystatechange = lf;
    j.onload = function() {
        self.init(pst,pre);
    };
    b.appendChild(j);
}

function FDM_Player(i,w,h,pst,pre) {
    if(!this instanceof FDM_Player) {
        return new FDM_Player(i, w, h, pst, pre);
    }
 
    this.id = i;
    this.wd = w;
    this.hd = h;
 
    var self = this;
    var b = document.getElementsByTagName('body')[0],
        j = document.createElement('script'),
        lf = function() {
            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                self.init(pst,pre);
            }
        };
 
    j.type='text/javascript';
    j.src=FDM_Player_vars.host+'/shared/1.4.526/pdk/tpPdk.js';
 
    j.onreadystatechange = lf;
    j.onload = function() {
        self.init(pst,pre);
    };
    b.appendChild(j);
}

FDM_Player.prototype.addEventListener = function(evt,han) {
	if(evt && han) {
		var t = {
			e: evt,
			h: han
		};
		FDM_Player_vars.events[FDM_Player_vars.events.length] = t;
	}
}

FDM_Player.prototype.init=function(pst,pre){
	var w = (typeof this.wd != 'undefined') ? this.wd : '',
		h = (typeof this.hd != 'undefined') ? this.hd : '',
		i = (this.id) ? this.id : 'player',
		d = false,
		p = new Player(i,w,h);

	p.id = i;

	if(w != "") {
		p.width = w;
	}
	if(h != "") {
		p.height = h;
	}

	window.tpLogLevel	= (typeof player.debug != 'undefined' && player.debug == 'debug') ? 'debug' : 'error'; //javascript
	p.logLevel			= (typeof player.debug != 'undefined' && player.debug == 'debug') ? 'debug' : 'error'; //flash

	//-------------------------- UI
	p.backgroundColor='0x000000';
	p.controlBackgroundColor='0x000000';
	p.controlColor='0xFFFFFF';
	p.controlHoverColor='0x00b4ff';
	p.controlSelectedColor='0x000000';
	p.disabledColor='0x000000';
	p.fp.bgcolor='0x000000';
	p.frameColor='0x000000';
	p.playProgressColor='0x00b4ff';
	p.textColor='0xBEBEBE';
	p.loadProgressColor='0xBEBEBE';
	p.controlHighlightColor='0x00b4ff';

	p.enableDynamicSubtitleFonts=true;
	p.useDefaultPlayOverlay=false;

	flshO=$pdk.env.Detect.getInstance().getFlashVersion();
	flshV=parseFloat(flshO[0] + "." + flshO[1]);

	FDM_Player_vars.isIOS=(($pdk.env.Detect.getInstance().getPlaybackRuntime()=="html5")?true:false) || ((location.search + location.hash).indexOf('isIOS') != -1);
	FDM_Player_vars.isFlash=(flshV>FDM_Player_vars.flash) ? true : false;

	if (FDM_Player_vars.isFlash) {
		p.allowFullScreen='true';
		p.allowScriptAccess='always';
		p.fp.wmode='opaque';
		p.previewScrubbing='true';

		p.pluginLayout='type=overlay|URL='+FDM_Player_vars.host+'/shared/1.4.526/swf/LayoutPlugin.swf';
		p.skinURL=FDM_Player_vars.host+'/fox/swf/skinFox.swf';
		p.layoutUrl=FDM_Player_vars.host+'/fox/config/foxLayout.xml';

		//-------------------------- Go Live
		if(String(player.golive_show) == 'true') {
			p.pluginGoLive='type=control|URL='+FDM_Player_vars.host+'/shared/1.4.526/swf/GoLivePlugIn.swf';
		}

		//-------------------------- Bumper
		if(typeof player.introURL !== 'undefined' || typeof player.outroURL !== 'undefined') {
			p.pluginBumper='type=control|URL='+FDM_Player_vars.host+'/shared/1.4.526/swf/BumperPlugin.swf|introURL='+(typeof player.introURL != 'undefined' ? player.introURL : '')+'|introLink='+(typeof player.introLink != 'undefined' ? player.introLink : '')+'|outroURL='+(typeof player.outroURL != 'undefined' ? player.outroURL : '')+'|outroLink='+(typeof player.outroLink != 'undefined' ? player.outroLink : '')+'|waitTime='+(typeof player.waitTime != 'undefined' ? player.waitTime : '10');
		}

		//-------------------------- Share
		if(((typeof player.share_deeplink != 'undefined' && player.share_deeplink != '') || (typeof player.share_deeplinkfunc != 'undefined' && player.share_deeplinkfunc != '')) && String(player.share) != 'false') {
			
			var emailString = '';
			
			p.pluginShare='type=overlay|URL='+FDM_Player_vars.host+'/shared/1.4.526/swf/SharePlugin.swf'+ emailString +'|deepLink='+player.share_deeplink+'|shortener=www.fox.com/_app/urlhelper.php|embed='+player.share_embed+'|twitterField=title'+((player.share_deeplinkfunc) ? '|deeplinkFunc='+player.share_deeplinkfunc : '')+'|hidepostup='+player.hidePostup+((typeof player.share_iframeurl != 'undefined' && player.share_iframeurl != '') ? '|iframeurl='+player.share_iframeurl : '');	
		}

		//-------------------------- Closed Captioning
		p.pluginClosedCaption='type=overlay|URL='+FDM_Player_vars.host+'/shared/1.4.526/swf/ClosedCaptionPlugin.swf';

		//-------------------------- End Card
		if(String(player.endcard) != 'false') {

			adPolicySuffix = "&params=policy%3D19938";

			if(typeof player.endcard_playlist != "undefined" && player.endcard_playlist != null) {
				player.endcard_playlist = player.endcard_playlist + ((player.endcard_playlist.indexOf('form=json') != -1) ? '' : (player.endcard_playlist.indexOf('?') != -1) ? '&form=json' : '?form=json') +
					((player.endcard_playlist.indexOf('policy') != -1) ? '' : adPolicySuffix);
			}
			if(typeof player.endcard_related != "undefined" && player.endcard_related != null) {
				player.endcard_related = player.endcard_related + ((player.endcard_related.indexOf('form=json') != -1) ? '' : (player.endcard_related.indexOf('?') != -1) ? '&form=json' : '?form=json') +
					((player.endcard_related.indexOf('policy') != -1) ? '' : adPolicySuffix);
			}
			if(typeof player.endcard_editorial != "undefined" && player.endcard_editorial != null) {
				player.endcard_editorial = player.endcard_editorial + ((player.endcard_editorial.indexOf('form=json') != -1) ? '' : (player.endcard_editorial.indexOf('?') != -1) ? '&form=json' : '?form=json') +
					((player.endcard_editorial.indexOf('policy') != -1) ? '' : adPolicySuffix);
			}
			
			p.pluginEndcard='type=overlay|URL='+FDM_Player_vars.host+'/shared/1.4.526/swf/EndCardPlugIn.swf|wait='+(typeof player.waitTime != 'undefined' ? player.waitTime : '10');
			if(player.endcard_playlist)		{ p.pluginEndcard+='|playlist='+player.endcard_playlist; }
			if(player.endcard_related)		{ p.pluginEndcard+='|related='+player.endcard_related; }
			if(player.endcard_editorial)	{ p.pluginEndcard+='|editorial='+player.endcard_editorial; }
		}

		//-------------------------- Custom Plugins
		if(typeof player.plugins != "undefined") {
			i_len = player.plugins.length;
			for(i=0; i<i_len; i++) {
				if(player.plugins[i].name == 'BlueKai') {
					p.pluginBlueKai = 'type=overlay|URL='+FDM_Player_vars.host+'/shared/1.4.526/swf/FoxBlueKaiPlugIn.swf|configFile='+player.plugins[i].vars.url;
				}
			}
		}

		//-------------------------- Watermark
		if(String(player.watermark_show) == 'true') {
			p.pluginWatermark='type=overlay|URL='+FDM_Player_vars.host+'/shared/1.4.526/swf/WatermarkPlugin.swf';
			if(player.watermark_corner)		{ p.pluginWatermark+='|corner='+player.watermark_corner; }
			if(player.watermark_src)		{ p.pluginWatermark+='|src='+player.watermark_src; }
			if(player.watermark_opacity)	{ p.pluginWatermark+='|opacity='+player.watermark_opacity; }
		}

		//-------------------------- Play Overlay
		if(String(player.play_overlay_show) == 'true') {
			p.pluginPlayOverlay='type=overlay|URL='+FDM_Player_vars.host+'/shared/1.4.526/swf/PlayOverlayPlugin.swf';
			p.pluginPlayOverlay+='|offsetX='+FDM_Player_vars.layouts.play_overlay_x_offset;
			p.pluginPlayOverlay+='|offsetY='+FDM_Player_vars.layouts.play_overlay_y_offset;
		}
		p.pluginFoxUrlSigning='type=signature|URL='+FDM_Player_vars.host+'/shared/1.4.526/swf/foxUrlSigningPlugIn.swf';
		p.pluginAuth='type=auth|URL='+FDM_Player_vars.host+'/shared/1.4.526/pdk/swf/authentication.swf|priority=3|cookie=authToken';

		p.pluginAkamai='type=format|URL='+FDM_Player_vars.host+'/shared/1.4.526/pdk/swf/akamaiHD.swf|priority=4|hosts=-f.akamaihd.net|playerId=foxcom-1.4.526|analyticsBeacon=http://ma1-r.analytics.edgesuite.net/config/beacon-4227.xml';

		//-------------------------- Analytics
			p.pluginFoxComscore='type=Tracking|URL='+FDM_Player_vars.host+'/shared/1.4.526/swf/FoxComscorePlugIn.swf|priority=1|c2=3005183|c4=8000000|c6Field={comscoreShowId}%7CS{season}E{episode}|trackEachChapter=true';
//p.pluginComscoreResolver='type=Tracking|URL='+FDM_Player_vars.host+'/shared/1.4.526/swf/foxComscoreResolverPlugIn.swf|priority=1|path=http://www.fox.com/_ui/fox_player/videoXml.php';

			p.pluginOmniture='type=Tracking|URL='+FDM_Player_vars.host+'/shared/1.4.522/pdk/swf/omnitureMedia.swf|priority=2|frequency=60|host=a.fox.com|visitorNamespace=foxentertainment|account=foxcomprod';
			p.pluginOmnitureMonitor='type=Tracking|URL='+FDM_Player_vars.host+'/shared/1.4.522/swf/FoxOmnitureMonitor.swf|priority=1|playerId=foxcom-1.4.526|additionalPropsMethodName=player.extraInfo';

	p.pluginNielsen='type=Tracking|URL='+FDM_Player_vars.host+'/shared/1.4.526/swf/ggtp395.swf|clientid=us-800251|vcid=c01|sfcode=us|category=0|prod=vc,iag|adurlfield=fw:adurl|sid=2500011627|tfid=1362|adcategory=fw:category|adsubcategory=fw:subcategory|displayprefix=Season|displayfieldname=season';



			p.pluginConviva='type=|priority=1|customerId=c3.FOX|serviceUrl='+((window.location.protocol == 'https:')?'https':'http') +'://livepass.conviva.com|URL='+((window.location.protocol == 'https:')?'https://livepassdl.secure':'http://livepassdl')+'.conviva.com/thePlatform/ConvivaThePlatformPlugin_5_0_5.swf?customerId=c3.FOX|cdnName=AKAMAI|deviceType=PC|playerName=foxcom-1.4.526|metadataKeys=episode,fullEpisode,genre,repeat,season,showcode|playerTag.series=|playerTag.playerType=';
	

	p.pluginNewFreewheel = 
		'type=adcomponent|' + 
		'url='+FDM_Player_vars.host+'/shared/1.4.526/pdk/swf/freewheel.swf|' + 
		'pemURLsSeparator=~|' + 
		'siteSectionId=' + player.siteSection + '|' + 
		'isLive=false|' + 
		'customVideoAssetIdField=brightcoveId|' + 
		'pemURLs=' + 
			'http://adm.fwmrm.net/p/fox_live/CountdownTimerExtension.swf?timePositionClasses=preroll,midroll,postroll&textFont=Arial~' + 
			'http://adm.fwmrm.net/p/fox_live/SingleAdExtension.swf~' + 
			'http://adm.fwmrm.net/p/fox_live/PauseAdExtension.swf|' + 
		'networkId=116450|' + 
		'siteSectionNetworkId=116450|' + 
		'keyValues=' + fdmAAMStuff() + '|' + 
		'videoAssetNetworkId=116450|' + 
		'priority=1|' + 
		'externalCustomVisitor=fdmAAMID|' + 
		'autoPlay=true|' + 
		'adManagerUrl=http://adm.fwmrm.net/p/fox_live/AdManager.swf|' + 
		'playerProfile=116450:FDM_Live|' + 

		'callback=FDM_Player_OnFreeWheelEvent|' +
		'extensionName=AnalyticsExtension|' +
		'extensionUrl=http://adm.fwmrm.net/p/fox_live/FoxAnalyticsExtension.swf|' +
		'cb_profile=116450:FDM_Live|' +
		'customIdField=brightcoveId|' +

		'serverUrl=http://1c6e2.v.fwmrm.net/';





		p.autoPlay=(typeof(player.autoplay)=="undefined" || player.autoplay)?true:false;

		if (typeof(player.releaseURL) != "undefined" && player.releaseURL != '') {

			adPolicySuffix = (player.releaseURL.indexOf("?") == -1) ? "?" : "&";
			adPolicySuffix += "policy=19938";
			player.releaseURL += adPolicySuffix;

			p.releaseURL=player.releaseURL;
		}
	}
	else if (FDM_Player_vars.isIOS) {
		var mycss=document.createElement('link');
			mycss.rel='stylesheet';
			mycss.type='text/css';

		mycss.href=FDM_Player_vars.host+'/shared/1.4.526/css/html5_main.css';
		FDMtpHead.appendChild(mycss);

		p.autoPlay=false; // Always set to false, because if true, it causes wildly different experiences and on certain devices, issues.

		//-------------------------- UI
		p.showControlsBeforeVideo='true';
		p.overrideNativeControls='false';
		p.skinURL=FDM_Player_vars.host+'/fox/config/fox.json';
		if (typeof(player.deliveryMode) == "undefined") {
			//no mode specified, load vod layout
			p.layoutUrl=FDM_Player_vars.host+'/fox/config/foxLayout.xml';
		} else {
			switch (player.deliveryMode) {
				case 'live':
					p.layoutUrl=FDM_Player_vars.host+'/fox/config/liveLayout.xml';
					break;
				case 'livedvr':
					p.layoutUrl=FDM_Player_vars.host+'/fox/config/dvrLiveLayout.xml';
					break;
				case 'dvr':
					p.layoutUrl=FDM_Player_vars.host+'/fox/config/dvrLayout.xml';
					break;
				case 'vod':
					p.layoutUrl=FDM_Player_vars.host+'/fox/config/foxLayout.xml';
					break;
			}
		}
		p.pluginLayout = 'type=overlay|URL='+FDM_Player_vars.host+'/shared/1.4.526/js/FoxLayoutPlugIn.js|deliveryMode='+player.deliveryMode+'|offsetX='+FDM_Player_vars.layouts.play_overlay_x_offset+'|offsetY='+FDM_Player_vars.layouts.play_overlay_y_offset;

		//-------------------------- Bumper
		if(typeof player.introURL != 'undefined' || typeof player.outroURL != 'undefined') {
			p.pluginBumper = 'type=ad|URL='+FDM_Player_vars.host+'/shared/1.4.526/js/FoxBumperPlugin.js|introLink='+player.introLink+'|outroLink='+player.outroLink+'|waitTime='+(typeof player.waitTime != 'undefined' ? player.waitTime : '10');
		}

		//-------------------------- Watermark
		if(typeof player.watermark_src != 'undefined' && player.watermark_src != '') {
			p.pluginWatermark = 'type=overlay|URL='+FDM_Player_vars.host+'/shared/1.4.526/js/FoxWatermarkPlugin.js';
			if(typeof player.watermark_corner != 'undefined')		{ p.pluginWatermark+='|corner='+player.watermark_corner; }
			if(typeof player.watermark_src != 'undefined')		{ p.pluginWatermark+='|watermarkSrc='+player.watermark_src; }
			if(typeof player.watermark_opacity != 'undefined')	{ p.pluginWatermark+='|watermarkOpacity='+player.watermark_opacity; }
		}

		//-------------------------- Share
		if((typeof player.share_deeplink != 'undefined' && player.share_deeplink != '') && String(player.share) != 'false') {
				p.pluginShare='type=overlay|URL='+FDM_Player_vars.host+'/shared/1.4.526/js/FoxSharePlugIn.js|deepLink='+player.share_deeplink+'|embed='+player.share_embed+'|fbembed='+player.share_fb+((player.share_deeplinkfunc) ? '|deeplinkFunc='+player.share_deeplinkfunc : '');
		}


		//-------------------------- End Card
		if(String(player.endcard) != 'false') {

			adPolicySuffix = "&params=policy%3D19938";

			if(typeof player.endcard_playlist != "undefined" && player.endcard_playlist != null) {
				player.endcard_playlist = player.endcard_playlist + ((player.endcard_playlist.indexOf('form=json') != -1) ? '' : (player.endcard_playlist.indexOf('?') != -1) ? '&form=json' : '?form=json') +
					((player.endcard_playlist.indexOf('policy') != -1) ? '' : adPolicySuffix);
			}
			if(typeof player.endcard_related != "undefined" && player.endcard_related != null) {
				player.endcard_related = player.endcard_related + ((player.endcard_related.indexOf('form=json') != -1) ? '' : (player.endcard_related.indexOf('?') != -1) ? '&form=json' : '?form=json') +
					((player.endcard_related.indexOf('policy') != -1) ? '' : adPolicySuffix);
			}
			if(typeof player.endcard_editorial != "undefined" && player.endcard_editorial != null) {
				player.endcard_editorial = player.endcard_editorial + ((player.endcard_editorial.indexOf('form=json') != -1) ? '' : (player.endcard_editorial.indexOf('?') != -1) ? '&form=json' : '?form=json') +
					((player.endcard_editorial.indexOf('policy') != -1) ? '' : adPolicySuffix);
			}

			p.pluginEndcard='type=overlay|URL='+FDM_Player_vars.host+'/shared/1.4.526/js/FoxEndCardPlugin.js|wait=' + (typeof player.waitTime != 'undefined' ? player.waitTime : '10') +
				'|upNextDisplay=' + (( player.endcard_playlist && player.endcard_playlist != '' ) ? 'true' : 'false') +
				((player.endcard_playlist && player.endcard_playlist != '') ? '|playlist=' + player.endcard_playlist : '') +
				((player.endcard_related && player.endcard_related != '') ? '|related=' + player.endcard_related : '') +
				((player.endcard_editorial && player.endcard_editorial != '') ? '|editorial=' + player.endcard_editorial : '');
		}

		p.pluginAkamaiHDJS='type=Format|URL='+FDM_Player_vars.host+'/shared/1.4.526/pdk/js/plugins/akamaiHD.js|priority=5|hosts=-f.akamaihd.net';

		//-------------------------- Analytics
				p.pluginOmniture='type=tracking|URL='+FDM_Player_vars.host+'/shared/1.4.526/js/FoxOmnitureTracking.js|omnitureJsUrl=http://player.foxfdm.com/fox/js/omniture.sitecatalyst_short.js|additionalPropsMethodName=player.extraInfo';
		//p.pluginComscore='type=tracking|URL='+FDM_Player_vars.host+'/shared/1.4.526/js/FoxComscorePlugIn.js|priority=1|path=http://www.fox.com/fod/videoXml.php|c2=3005183|c4=8000000|c6Field={comscoreShowId}%7CS{season}E{episode}|trackEachChapter=true';

	p.pluginFreewheel='type=advertising|URL=http://adm.fwmrm.net/p/fox_live/ThePlatformPDKPlugin.js|networkId=116450|serverUrl=http://1c6e2.v.fwmrm.net|siteSectionId='+player.siteSection+'|playerProfile=116450:FDM_HTML5_Live|adManagerUrl=http://adm.fwmrm.net/p/fox_live/AdManager.js|autoPlayType=autoPlay';


		if(typeof(player.releaseURL) != "undefined" && player.releaseURL != '') {
			p.releaseURL=player.releaseURL+((player.releaseURL.indexOf('?') != -1) ? '&' : '?')+'manifest=m3u&format=SMIL';

			if(navigator.userAgent.toLowerCase().indexOf("android") > -1) {
				if(player.releaseURL.toLowerCase().indexOf("switch") === -1) {
					p.releaseURL+='&switch=http';
				}
			}
		}
	}
	else {
			document.getElementById(p.id).innerHTML = "<p class='fdmplayer_no_flash'>We've detected an older version of Flash Player.<br/><br/> In order to view video on this site please download Flash 11. </P> <a href='http://get.adobe.com/flashplayer/' target='_blank'><img src='http://player.foxfdm.com/shared/img/get_flash_player.gif'></a>";
			p = null;
		}

		if (p != null) {
		//pre
		if (typeof(pre) == "function") {
			pre();
		} else if (typeof(pre) == "object") {
			for(var i in pre) {
				pre[i]();
			}
		}

		if (p != null) {
			p.bind();
		}

		//post
		if (typeof(pst) == "function") {
			pst();
		} else if (typeof(pst) == "object") {
			for(var i in pst) {
				pst[i]();
			}
		}

		//events
		if(FDM_Player_vars.events.length && typeof $pdk != "undefined") {
			for(var i in FDM_Player_vars.events) {
				$pdk.controller.addEventListener(FDM_Player_vars.events[i].e,FDM_Player_vars.events[i].h);
			}
		}

		$pdk.controller.addEventListener("OnMediaLoadStart", this.onMediaLoadStart);
		$pdk.controller.addEventListener("OnMediaStart", this.onMediaStart);
		//$pdk.controller.addEventListener("OnPlayerLoaded",this.onPlayerLoaded);

// CFS (3/5/2013): for audience insights
		if(typeof mboxTrack != "undefined") {

			$pdk.controller.addEventListener("OnMediaStart", function (event) {
				if (event)
				{
					aamtt.isAd = event.data.baseClip.isAd;
					if(aamtt.isAd == false && event.data.clipIndex === 0) {
						aamtt.form = (event.data.baseClip.contentCustomData.fullEpisode == "true") ? "lf" : "sf";
						aamtt.twentyfive = aamtt.seventyfive = aamtt.complete = false; // reset quartiles
						mboxTrack(aamtt.form+"_video_start");
					}
				}
			});

			$pdk.controller.addEventListener("OnMediaPlaying", function(e) {
				if(aamtt.isAd == false) {
					_percent = Math.floor(e.data.isAggregate ? e.data.percentCompleteAggregate : e.data.percentComplete);
					if(_percent > "24" && _percent < "26" && !aamtt.twentyfive) {
						mboxTrack(aamtt.form+"_video_25");
						aamtt.twentyfive = true;
					}
					if(_percent > "49" && _percent < "51" && !aamtt.fifty) {
						mboxTrack(aamtt.form+"_video_50");
						aamtt.fifty = true;
					}
					if(_percent > "74" && _percent < "76" && !aamtt.seventyfive) {
						mboxTrack(aamtt.form+"_video_75");
						aamtt.seventyfive = true;
					}
					if(_percent > "97" && _percent < "99" && !aamtt.complete) {
						mboxTrack(aamtt.form+"_video_complete");
						aamtt.complete = true;
					}
				}
			});

		}
	}
	//FoxNEOD communication stuff
	// if (window.$f && window.$f && window.$f.hasOwnProperty('dispatch'))
 //    {
	// 	var debug = new $f.Debug('page');
	// 	debug.log('$f already existed, dispatching playerReady');
 //        window.$f.dispatch('playerReady', {}, true);
 //    }
 //    else
 //    {
 //        window.addEventListener('foxneod:ready', function (event) {
 //            var debug = new $f.Debug('page');
 //            debug.log('Page now knows that the library is ready.');
 //        });
 //    }	
}

FDM_Player.prototype.fdmOmnitureUniqueId = function() {
	if(typeof(s_analytics) != "undefined") {
		return s_analytics.c_r('s_vi');
	} else {
		return 0;
	}
}

/* =====================================
 *  Handlers
 * ================================== */
// FDM_Player.prototype.onPlayerLoaded=function(e){
// 
//     var b = document.getElementsByTagName('body')[0],
//         j = document.createElement('script');
// 
//     j.type='text/javascript';
//     j.src=FDM_Player_vars.host+'/shared/1.4.526/js/OmniturePlugin.js';
// 
//     b.appendChild(j);
// 
//     /**Omniture specific configuration for both Flash/JS**/
//     FDM_Player_vars.omniConfig  = {
//         playerId        :"foxcom-1.4.526",
//         visitorNamespace:"foxentertainment",
//         host            :"a.fox.com",
//         frequency       :"60",
//         entitled        :"public",  //values: public or entitled
//         auth            :"true",
//         mvpd            :"mvpd value", //value of prop/eVar is the MVDP name of the user.
//         network         :"fox",
//         additionalProps : {//list additional props/vars here
//             'prop99'    :'propsicles',
//             'evar99'    :'propsicles'
//         }   
//     }
// }

FDM_Player.prototype.onMediaLoadStart = function(event) {
	try {
		if (event)
		{
			if (event.data.baseClip.isAd === true) return;

			if (event.data.baseClip.contentCustomData) {
				if(event.data.baseClip.contentCustomData.exception == "GeoLocationBlocked") {
					$pdk.controller.resetPlayer();
					$pdk.controller.setPlayerMessage("The video you are attempting to watch is only available to viewers within the US, US territories, and military bases.", 35000);
				} else if(event.data.baseClip.contentCustomData.exception == "AdobePassTokenExpired") {
					$pdk.controller.resetPlayer();
					$pdk.controller.setPlayerMessage("Your token/session has expired. Please refresh the page to continue watching.", 35000);
				} else if(event.data.baseClip.contentCustomData.licensedMusic == "true"){
	                if(navigator.userAgent.toLowerCase().indexOf("android") > -1) {
	                	$f.player.setPlayerMessage({
	                		message:'Sorry, the video you selected is not available for viewing on this device.',
	                		resetPlayer: true
	                	});
	            	}
	            }  	
			}
		}
	} catch(err) {
		console.log(err);
	}
}

FDM_Player.prototype.onMediaStart = function(event) {
	try {
		if (event)
		{
			var clipObj = event.data,
				title;

			if (typeof(clipObj.chapter) != "undefined" && typeof(clipObj.baseClip) != "undefined") 
			{
				title = (clipObj.baseClip.title) ? clipObj.baseClip.title : clipObj.chapter.title;
			} 
			else if (typeof(clipObj.baseClip) != "undefined") 
			{
				title = clipObj.baseClip.title;
			} 
			else 
			{
				title = 'Not Available';
			}

			// Standard PDK events are fired for ads too!
			if (clipObj.baseClip.isAd) 
			{
				//wipeBrandedCanvas();
			} 
			else 
			{
				if (clipObj.baseClip.contentCustomData) 
				{
					if (clipObj.baseClip.contentCustomData.fullEpisode && FDM_Player_vars.isIOS) 
					{
						$pdk.controller.resetPlayer();
					}
				}
			}

			// Remove native HTML5 controls
			if(FDM_Player_vars.isIOS)
			{
				$pdk.jQuery("video").attr("controls", false);
			}
		}

	} catch(err) {
		console.log(err);
	}
}

// Called to pause playback
FDM_Player.prototype.pause = function() {
	if (typeof($pdk) != "undefined") {
		$pdk.controller.pause(true);
	}
}

// Called to change the media in the player via releaseUrl.
FDM_Player.prototype.setReleaseCall = function(releaseUrl) {
	$pdk.controller.resetPlayer();
	$pdk.controller.dispatchEvent('FoxPlayer:setReleaseURL', {}, []);
	if(FDM_Player_vars.isIOS) 
	{
		releaseUrl += ((releaseUrl.indexOf('?') != -1) ? '&' : '?')+'manifest=m3u';

		if(navigator.userAgent.toLowerCase().indexOf("android") > -1) 
		{
			if(player.releaseURL.toLowerCase().indexOf("switch") === -1) 
			{
					p.releaseURL+='&switch=http';
			}
		}
	}
			
			releaseUrl += ((releaseUrl.indexOf('?') != -1) ? '&' : '?')+'policy=19938';	
		$pdk.controller.setReleaseURL(releaseUrl, true);
}

// Resets Branded Canvas DIV inner HTML
function wipeBrandedCanvas(e) {
	if(typeof(jQuery) != "undefined") {
		var HTML = '<span id="brandedCanvas" class="_fwph"><form id="_fw_form_brandedCanvas" style="display:none"><input type="hidden" name="_fw_input_brandedCanvas" id="_fw_input_brandedCanvas" value="w=1500&amp;h=350&amp;envp=FOX_display&amp;ssct=text/fdm-canvas&amp;sflg=-nrpl;"/></form><span id="_fw_container_brandedCanvas" class="_fwac"></span></span>';
		jQuery('#playerAdBgSkin').html(HTML);
	}
}

// Callback method for all FreeWheel events. This method name is passed to the FreeWheel plugin as the 'callback' param
function FDM_Player_OnFreeWheelEvent(e){
	if(typeof e != "undefined") {
		if(typeof e.info != "undefined") {
			if(e.info.type == "interactive") { $pdk.controller.showFullScreen(false); }
		}
		if(typeof e.type != "undefined") {
			switch(e.type) {
				case 'podStart':
					// pods contains ads at an ad break
					break;
				case 'adStart':
					// all ad types fire this event
					if((e.info.type == "preroll")||(e.info.type == "midroll")||(e.info.type == "postroll")) {
						wipeBrandedCanvas();
					}
					if(typeof AUTH != "undefined") {
						AUTH.activateLogin();
					}
					break;
				case 'adComplete':
					// all ad types fire this event
					break;
			}
		}
	}
}

if(typeof(setOmnitureProps) == "undefined") {
	var setOmnitureProps = function(){};
}

// Added for AAM
function fdmAAMID() {
	var one = readCookie('aam_uuid');
	var two = (typeof s_analytics != "undefined") ? s_analytics.c_r('s_vi') : 'noIdAvailable';
	if(one && two) { return one + '~' + two; }
		else if(two) { return two; }
		else { return ''; }
}
// Added for FW/AAM
function fdmAAMStuff() {
	var fwKeyVal = readCookie('aam_freewheel');
	if(fwKeyVal) {
		var fwKeyValStr=fwKeyVal.replace(/%3B/g,"%26");
		if(typeof player.freewheel_keyvalue != "undefined") {
			return player.freewheel_keyvalue + "%26" + fwKeyValStr;
		}
		else {
			return fwKeyValStr;
		}
	}
	else {
		return '';
	}
}

//METHOD TO SET COOKIE TO PERSIST VOLUME SETTINGS
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	} else {
		var expires = "";
	}
	document.cookie = name+"="+value+expires+"; path=/";
}

//METHOD RETRIEVE COOKIE TO PERSIST VOLUME SETTINGS
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');

	for(var i=0;i < ca.length;i++) {
		var c = ca[i];

		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}


//---------------------------------------------------------------------------------------------------------- FoxNEOD

//-------------------------------------------------------------------------------------------------------------- /FoxNEOD

