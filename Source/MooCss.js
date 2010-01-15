/*
---
description: With MooCss you can write Css as Javascript objects (just like Element.Style) to a style tag in the document head

authors:
  - Arian Stolwijk

license:
  - MIT-style license

requires:
  core/1.2.4:
  - Class.Extras
  - Element.Style

provides:
  - [MooCss,MooCssStyle]
...
*/

var MooCss = new Class({
	
	Implements: [Options,Events],
	
	options: {
		autoWrite: false,
		pretty: false/*,
		onWrite: $empty */
	},
		
	initialize: function(options){
		this.setOptions(options);
		this.style = new Element('style',{'type':'text/css'}).inject(document.getElement('head'));
		this.styles = new Hash();
	},
	
	setStyle: function(style,selector){
		// If style isn't an instance of MooCssStyle yet
		if($type(style.toCss) != 'function' && $type(style) == 'object' && selector){
			style = new MooCssStyle(selector,style);
		}
		// Add the style
		this.styles.set(style.getSelector(),style);
		// Autowrite
		if(this.options.autoWrite) this.write();
		
		return this;
	},
	
	getStyle: function(selector){
		return this.styles.get(selector);
	},
	
	write: function(){
		var css = '';
		this.styles.each(function(style,selector){
			css += selector+'{'+style.toCss()+'} ';
		});
		if(this.options.pretty){
			css = css.replace(/\}/g,"\n}\n\n")
				.replace(/\{/g," {\n\t")
				.replace(/; /g,';')
				.replace(/;/g,";\n\t");
		}
		try {
			if (Browser.Engine.trident) this.style.styleSheet.cssText = css;
			else this.style.set('text', css);
			this.fireEvent('write',[this.style,css]);
		}catch(e){}
		return this;
	},
	
	getCss: function(){
		try {
			if (Browser.Engine.trident) return this.style.styleSheet.cssText;
			else this.style.get('text');
		}catch(e){}		
	},
	
	toElement: function(){
		return this.style;
	}
	
});

var MooCssStyle = new Class({
	
	initialize: function(selector,styles){
		this.selector = selector;
		// Use Element.Style
		this.el = new Element('div',{styles:styles});
	},
		
	setSelector: function(selector){
		this.selector = selector;
		return this;
	},

	getSelector: function(){
		return this.selector;
	},
	
	set: function(property,value){
		switch($type(property)){
			case 'string': this.el.setStyle(property,value); break;
			case 'object': this.el.setStyles(property); break;
		}
		return this;
	},
	
	get: function(property){
		switch($type(property)){
			case 'string': return this.el.getStyle(property); break;
			case 'array': return this.el.getStyles(property); break;
		}		
	},
	
	toCss: function(){
		return this.el.get('style');
	}
	
});
