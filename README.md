MooCss
===============

With MooCss you can write Css as Javascript objects (just like Element.Style) to a style tag in the document head

![Screenshot](http://github.com/arian/MooCss/raw/master/screenshot.png)

How to use
----------

First you have to include the javascript files and css file in the head of your html document

	#HTML
	<script src="../Source/MooCss.js" type="text/javascript"></script>

There are two classes, MooCss and MooCssStyle. First you create a style for a selector, for example '.foo' and apply the 
styles. Secondly you add this MooCssStyle instance to the MooCss instance and call the MooCss.write method to actually write
the CSS to your document head.

### Example ###

	#JS
	var style = new MooCss()
		.setStyle(new MooCssStyle('.foo',{
			background: '#FF9900',
			color: 'white',
			padding: 20
		}))
		.setStyle(new MooCssStyle('pre',{
			border: '1px solid black'
		}))
		.setStyle({
			'background': '#EEE'
		},'body')
		.write();
		
	document.addEvent('click',function(){
		style.setStyle(style.getStyle('body').set('font-weight','bold')).write();
	});


## Class: MooCss ##

### MooCss method: constructor ###

	#JS
	new MooCss(options);

#### Arguments ####
1. options - (*object*,optional) The MooCss Options. See below

#### Options ####
1. autoWrite - (*boolean*: defaults to false) If you set this to true, the *write* method will called automatically after you set a style with the *setStyle* method  
2. pretty - (*boolean*: defaults to false) If you want to make the css look pretty , you can set this to true (also try the *getCss* method to see how it looks)

#### Events ####
1. write - (*function*) The function to execute when the css is written


### MooCss Method: setStyle ###

The function to set a style

#### Syntax ####
	
	#JS
	css.setStyle(style[,selector]);
	
#### Arguments ####

1. style - (*MooCssStyle instance*,*object*) - A MooCssStyle instance or an object
2. selector - (*string*,optional) - If the first argument was an object, you should set the selector here

#### Returns ####

- (*MooCssStyle*) - MooCssStyle instance

### MooCss Method: getStyle ###

The function to get a style

#### Syntax ####
	
	#JS
	css.getStyle(selector);
	
#### Arguments ####

1. selector - (*string*) - The selector of the style block

#### Returns ####

- (*MooCssStyle*) - MooCssStyle instance


### MooCss Method: write ###

The function to write the css to the stylesheet

#### Syntax ####
	
	#JS
	css.write();

#### Returns ####

- (*MooCssStyle*) - MooCssStyle instance

### MooCss Method: getCss ###

If the styles are written to the stylesheet, you can fetch
the css with this method

#### Syntax ####
	
	#JS
	css.getCss();

#### Returns ####

- (*string*) - The css of the stylesheet

### MooCss Method: toElement ###

#### Syntax ####
	
	#JS
	document.id(css);

#### Returns ####

- (*element*) - The style element


### MooCss Method: getCss ###

If the styles are written to the stylesheet, you can fetch
the css with this method

#### Syntax ####
	
	#JS
	css.getCss();

#### Returns ####

- (*string*) - The css of the stylesheet


## Class: MooCssStyle ##

### MooCssStyle method: constructor ###

	#JS
	var style new MooCssStyle(selector[,styles]);

#### Arguments ####
1. selector - (*string*) The CSS Selector
2. styles - (*object*,optional) The properties and their values as object

### MooCssStyle Method: setSelector ###

The function to set another selector

#### Syntax ####
	
	#JS
	style.setSelector(selector);
	
#### Arguments ####

2. selector - (*string*,optional) The CSS selector

#### Returns ####

- (*MooCssStyle*) - MooCssStyle instance


### MooCssStyle Method: getSelector ###

The function to set another selector

#### Syntax ####
	
	#JS
	style.getSelector();
	
#### Returns ####

- (*string*) - The CSS selector

### MooCssStyle Method: set ###

The function to set styles

#### Syntax ####
	
	#JS
	style.set(property,value);
	
#### Arguments ####

1. property (*string*,*object*) The property. You can also use an object to set more properties
2. value (*string*) The property value

#### Returns ####

- (*MooCssStyle*) - MooCssStyle instance

### MooCssStyle Method: get ###

The function to get styles

#### Syntax ####
	
	#JS
	style.get(property);
	
#### Arguments ####

1. property (*string*,*array*) The property. You can also use an array to get more properties

#### Returns ####

- (*string*,*array*) - The property value or values

### MooCssStyle Method: toCss ###

Return the CSS string 

#### Syntax ####
	
	#JS
	style.toCss();

#### Returns ####

- (*string*) - The CSS


Requirements
------------

* [MooTools Core 1.2.4](http://mootools.net/core)

