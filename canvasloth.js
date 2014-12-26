/*
	Canvasloth - beta
	https://github.com/Mr21/Canvasloth
*/

'use strict';

function Canvasloth(p) {
	var	that = this,
		ctx,
		el_ctn,
		el_ast,
		el_cnv,
		el_hud,
		el_evt,
		nl_img,
		keys = [],
		isFocused = false,
		fn_events = [],
		fps = p.fps
			? 1000 / p.fps
			: 1000 / 60;

	this.refreshViewportSize = function() {
		el_cnv.width  = el_cnv.clientWidth;
		el_cnv.height = el_cnv.clientHeight;
		return that;
	};

	this.image = function(name) {
		for (var i = 0, e; e = nl_img[i]; ++i)
			if (e.src.lastIndexOf(name) === e.src.length - name.length)
				return e;
		console.error('Canvasloth: image "'+name+'" not found.');
	};

	this.events = function(ev, fn) {
		ev = ev.toLowerCase();
		if (ev === 'click')
			return console.error('Canvasloth: use the event "mouseup" instead of "click".');
		else if (ev === 'keypress')
			return console.error('Canvasloth: use the event "keyup" instead of "keypress".');
		fn_events[ev] = fn;
		return that;
	};

	createDom();
	this.refreshViewportSize();
	setEvents();
	loadAssetsAndGo();

	function attachEvent(el, ev, fn) {
		if (el.addEventListener)
		  el.addEventListener(ev, fn, false);
		else
		  el.attachEvent('on'+ev, fn);
	}

	function createDom() {
		el_ctn = p.container.nodeType === Node.ELEMENT_NODE
			? p.container : p.container[0];
		el_ast = el_ctn.querySelector('.canvasloth-assets');
		if (el_ast)
			nl_img = el_ast.getElementsByTagName('img');
		el_hud = el_ctn.querySelector('.canvasloth-hud');
		el_cnv = document.createElement('canvas');
		el_evt = document.createElement('div');
		if (el_ctn.className.indexOf('canvasloth') === -1)
			el_ctn.className += ' canvasloth';
		el_evt.tabIndex = 0;
		el_evt.className = 'canvasloth-events';
		el_ctn.appendChild(el_cnv);
		el_ctn.appendChild(el_evt);
		ctx = p.context === '2d'
			? el_cnv.getContext('2d')
			: (
				el_cnv.getContext('webgl') ||
				el_cnv.getContext('experimental-webgl')
			);
	}

	function setEvents() {
		var	mouseButtonsStatus = [];

		el_ctn.oncontextmenu = function() { return false; };

		that.events('focus',     function() {});
		that.events('blur',      function() {});
		that.events('keydown',   function() {});
		that.events('keyup',     function() {});
		that.events('mousedown', function() {});
		that.events('mouseup',   function() {});
		that.events('mousemove', function() {});

		for (var ev in p.events)
			that.events(ev, p.events[ev]);

		attachEvent(window, 'mouseup', function(e) {
			if (mouseButtonsStatus[e.button] === 1) {
				mouseButtonsStatus[e.button] = 0;
				fn_events.mouseup.call(p.thisApp, 0, 0, e.button);
			}
		});

		attachEvent(el_evt, 'focus', function() {
			isFocused = true;
			fn_events.focus.call(p.thisApp);
		});
		
		attachEvent(el_evt, 'blur', function() {
			if (isFocused) {
				isFocused = false;
				for (var i in keys)
					if (keys[i = parseInt(i)]) {
						fn_events.keyup.call(p.thisApp, i);
						keys[i] = false;
					}
				if (!p.autoFocus)
					el_evt.blur();
				fn_events.blur.call(p.thisApp);
			}
		});

		attachEvent(el_evt, 'keydown', function(e) {
			if (!keys[e.keyCode]) {
				fn_events.keydown.call(p.thisApp, e.keyCode);
				keys[e.keyCode] = true;
			}
			e.preventDefault();
		});

		attachEvent(el_evt, 'keyup', function(e) {
			if (keys[e.keyCode]) {
				fn_events.keyup.call(p.thisApp, e.keyCode);
				keys[e.keyCode] = false;
			}
		});

		attachEvent(el_evt, 'mousedown', function(e) {
			mouseButtonsStatus[e.button] = 1;
			if (!isFocused)
				el_evt.focus();
			fn_events.mousedown.call(p.thisApp, e.layerX, e.layerY, e.button);
		});

		attachEvent(el_evt, 'mouseup', function(e) {
			if (isFocused) {
				mouseButtonsStatus[e.button] = 2;
				fn_events.mouseup.call(p.thisApp, e.layerX, e.layerY, e.button);
			}
		});

		attachEvent(el_evt, 'mousemove', function(e) {
			if (isFocused)
				fn_events.mousemove.call(p.thisApp, e.layerX, e.layerY);
		});
	}

	function startLooping() {
		setInterval(function() {
			if (isFocused)
				p.loop.call(p.thisApp);
		}, fps);
	}

	function loadAssetsAndGo() {
		var	nbElementsToLoad = 1;
		function loaded() {
			if (!--nbElementsToLoad) {
				p.ready.call(p.thisApp, that, ctx);
				if (p.autoFocus)
					el_evt.focus();
				startLooping();
			}
		}
		if (p.ready)
			for (var i = 0, img; img = nl_img[i]; ++i)
				if (!img.complete) {
					++nbElementsToLoad;
					img.onload = function() {
						loaded();
					};
				}
		loaded();
	}
}
