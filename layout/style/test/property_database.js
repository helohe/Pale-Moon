/* -*- Mode: Java; tab-width: 4; indent-tabs-mode: t; c-basic-offset: 4 -*- */
/* vim: set shiftwidth=4 tabstop=4 autoindent cindent noexpandtab: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// True longhand properties.
const CSS_TYPE_LONGHAND = 0;

// True shorthand properties.
const CSS_TYPE_TRUE_SHORTHAND = 1;

// Properties that we handle as shorthands but were longhands either in
// the current spec or earlier versions of the spec.
const CSS_TYPE_SHORTHAND_AND_LONGHAND = 2;

// Each property has the following fields:
//	 domProp: The name of the relevant member of nsIDOM[NS]CSS2Properties
//	 inherited: Whether the property is inherited by default (stated as
//	   yes or no in the property header in all CSS specs)
//	 type: see above
//	 alias_for: optional, indicates that the property is an alias for
//	   some other property that is the preferred serialization.  (Type
//	   must not be CSS_TYPE_LONGHAND.)
//	 get_computed: if present, the property's computed value shows up on
//	   another property, and this is a function used to get it
//	 initial_values: Values whose computed value should be the same as the
//	   computed value for the property's initial value.
//	 other_values: Values whose computed value should be different from the
//	   computed value for the property's initial value.
//	 XXX Should have a third field for values whose computed value may or
//	   may not be the same as for the property's initial value.
//	 invalid_values: Things that are not values for the property and
//	   should be rejected.
//	 quirks_values: Values that should be accepted in quirks mode only,
//	   mapped to the values they are equivalent to.

// Helper functions used to construct gCSSProperties.

function initial_font_family_is_sans_serif()
{
	// The initial value of 'font-family' might be 'serif' or
	// 'sans-serif'.
	var div = document.createElement("div");
	div.setAttribute("style", "font: initial");
	return getComputedStyle(div, "").fontFamily == "sans-serif";
}
var gInitialFontFamilyIsSansSerif = initial_font_family_is_sans_serif();

var gCSSProperties = {
	"animation": {
		domProp: "animation",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "animation-name", "animation-duration", "animation-timing-function", "animation-delay", "animation-direction", "animation-fill-mode", "animation-iteration-count" ],
		initial_values: [ "none none 0s 0s ease normal 1.0", "none", "0s", "ease", "normal", "1.0" ],
		other_values: [ "bounce 1s linear 2s", "bounce 1s 2s linear", "bounce linear 1s 2s", "linear bounce 1s 2s", "linear 1s bounce 2s", "linear 1s 2s bounce", "1s bounce linear 2s", "1s bounce 2s linear", "1s 2s bounce linear", "1s linear bounce 2s", "1s linear 2s bounce", "1s 2s linear bounce", "bounce linear 1s", "bounce 1s linear", "linear bounce 1s", "linear 1s bounce", "1s bounce linear", "1s linear bounce", "1s 2s bounce", "1s bounce 2s", "bounce 1s 2s", "1s 2s linear", "1s linear 2s", "linear 1s 2s", "bounce 1s", "1s bounce", "linear 1s", "1s linear", "1s 2s", "2s 1s", "bounce", "linear", "1s", "height", "2s", "ease-in-out", "2s ease-in", "opacity linear", "ease-out 2s", "2s color, 1s bounce, 500ms height linear, 1s opacity 4s cubic-bezier(0.0, 0.1, 1.0, 1.0)", "1s \\32bounce linear 2s", "1s -bounce linear 2s", "1s -\\32bounce linear 2s", "1s \\32 0bounce linear 2s", "1s -\\32 0bounce linear 2s", "1s \\2bounce linear 2s", "1s -\\2bounce linear 2s", "2s, 1s bounce", "1s bounce, 2s", "2s all, 1s bounce", "1s bounce, 2s all", "1s bounce, 2s none", "2s none, 1s bounce", "2s bounce, 1s all", "2s all, 1s bounce" ],
		invalid_values: [  "2s inherit", "inherit 2s", "2s bounce, 1s inherit", "2s inherit, 1s bounce", "2s initial" ]
	},
	"animation-delay": {
		domProp: "animationDelay",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "0s", "0ms" ],
		other_values: [ "1s", "250ms", "-100ms", "-1s", "1s, 250ms, 2.3s"],
		invalid_values: [ "0", "0px" ]
	},
	"animation-direction": {
		domProp: "animationDirection",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "normal" ],
		other_values: [ "alternate", "normal, alternate", "alternate, normal", "normal, normal", "normal, normal, normal", "reverse", "alternate-reverse", "normal, reverse, alternate-reverse, alternate" ],
		invalid_values: [ "normal normal", "inherit, normal", "reverse-alternate" ]
	},
	"animation-duration": {
		domProp: "animationDuration",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "0s", "0ms" ],
		other_values: [ "1s", "250ms", "1s, 250ms, 2.3s"],
		invalid_values: [ "0", "0px", "-1ms", "-2s" ]
	},
	"animation-fill-mode": {
		domProp: "animationFillMode",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "forwards", "backwards", "both", "none, none", "forwards, backwards", "forwards, none", "none, both" ],
		invalid_values: [ "all"]
	},
	"animation-iteration-count": {
		domProp: "animationIterationCount",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "1" ],
		other_values: [ "infinite", "0", "0.5", "7.75", "-0.0", "1, 2, 3", "infinite, 2", "1, infinite" ],
		// negatives forbidden per
		// http://lists.w3.org/Archives/Public/www-style/2011Mar/0355.html
		invalid_values: [ "none", "-1", "-0.5", "-1, infinite", "infinite, -3" ]
	},
	"animation-name": {
		domProp: "animationName",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "all", "ball", "mall", "color", "bounce, bubble, opacity", "foobar", "auto", "\\32bounce", "-bounce", "-\\32bounce", "\\32 0bounce", "-\\32 0bounce", "\\2bounce", "-\\2bounce" ],
		invalid_values: [ "bounce, initial", "initial, bounce", "bounce, inherit", "inherit, bounce" ]
	},
	"animation-play-state": {
		domProp: "animationPlayState",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "running" ],
		other_values: [ "paused", "running, running", "paused, running", "paused, paused", "running, paused", "paused, running, running, running, paused, running" ],
		invalid_values: [ "0" ]
	},
	"animation-timing-function": {
		domProp: "animationTimingFunction",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "ease", "cubic-bezier(0.25, 0.1, 0.25, 1.0)" ],
		other_values: [ "linear", "ease-in", "ease-out", "ease-in-out", "linear, ease-in, cubic-bezier(0.1, 0.2, 0.8, 0.9)", "cubic-bezier(0.5, 0.5, 0.5, 0.5)", "cubic-bezier(0.25, 1.5, 0.75, -0.5)", "step-start", "step-end", "steps(1)", "steps(2, start)", "steps(386)", "steps(3, end)" ],
		invalid_values: [ "none", "auto", "cubic-bezier(0.25, 0.1, 0.25)", "cubic-bezier(0.25, 0.1, 0.25, 0.25, 1.0)", "cubic-bezier(-0.5, 0.5, 0.5, 0.5)", "cubic-bezier(1.5, 0.5, 0.5, 0.5)", "cubic-bezier(0.5, 0.5, -0.5, 0.5)", "cubic-bezier(0.5, 0.5, 1.5, 0.5)", "steps(2, step-end)", "steps(0)", "steps(-2)", "steps(0, step-end, 1)" ]
	},
	"-moz-appearance": {
		domProp: "MozAppearance",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "radio", "menulist" ],
		invalid_values: []
	},
	"-moz-background-inline-policy": {
		domProp: "MozBackgroundInlinePolicy",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "continuous" ],
		other_values: ["bounding-box", "each-box" ],
		invalid_values: []
	},
	"-moz-binding": {
		domProp: "MozBinding",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "url(foo.xml)" ],
		invalid_values: []
	},
	"-moz-border-bottom-colors": {
		domProp: "MozBorderBottomColors",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "red green", "red #fc3", "#ff00cc", "currentColor", "blue currentColor orange currentColor" ],
		invalid_values: [ "red none", "red inherit", "red, green", "none red", "inherit red", "ff00cc" ]
	},
	"-moz-border-end": {
		domProp: "MozBorderEnd",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "-moz-border-end-color", "-moz-border-end-style", "-moz-border-end-width" ],
		initial_values: [ "none", "medium", "currentColor", "thin", "none medium currentcolor" ],
		other_values: [ "solid", "green", "medium solid", "green solid", "10px solid", "thick solid", "5px green none" ],
		invalid_values: [ "5%", "5", "5 green none" ]
	},
	"-moz-border-end-color": {
		domProp: "MozBorderEndColor",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		get_computed: logical_box_prop_get_computed,
		initial_values: [ "currentColor" ],
		other_values: [ "green", "rgba(255,128,0,0.5)", "transparent" ],
		invalid_values: [ "#0", "#00", "#0000", "#00000", "#0000000", "#00000000", "#000000000", "000000" ]
	},
	"-moz-border-end-style": {
		domProp: "MozBorderEndStyle",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		get_computed: logical_box_prop_get_computed,
		/* XXX hidden is sometimes the same as initial */
		initial_values: [ "none" ],
		other_values: [ "solid", "dashed", "dotted", "double", "outset", "inset", "groove", "ridge" ],
		invalid_values: []
	},
	"-moz-border-end-width": {
		domProp: "MozBorderEndWidth",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		get_computed: logical_box_prop_get_computed,
		prerequisites: { "-moz-border-end-style": "solid" },
		initial_values: [ "medium", "3px", "calc(4px - 1px)" ],
		other_values: [ "thin", "thick", "1px", "2em",
			"calc(2px)",
			"calc(-2px)",
			"calc(0em)",
			"calc(0px)",
			"calc(5em)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 5em)",
		],
		invalid_values: [ "5%", "5" ]
	},
	"border-image": {
		domProp: "borderImage",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "border-image-source", "border-image-slice", "border-image-width", "border-image-outset", "border-image-repeat" ],
		initial_values: [ "none" ],
		other_values: [ "url('border.png') 27 27 27 27",
						"url('border.png') 27",
						"stretch url('border.png')",
						"url('border.png') 27 fill",
						"url('border.png') 27 27 27 27 repeat",
						"repeat url('border.png') 27 27 27 27",
						"url('border.png') repeat 27 27 27 27",
						"url('border.png') fill 27 27 27 27 repeat",
						"url('border.png') 27 27 27 27 / 1em",
						"27 27 27 27 / 1em url('border.png') ",
						"url('border.png') 27 27 27 27 / 10 10 10 / 10 10 repeat",
						"repeat 27 27 27 27 / 10 10 10 / 10 10 url('border.png')",
						"url('border.png') 27 27 27 27 / / 10 10 1em",
						"fill 27 27 27 27 / / 10 10 1em url('border.png')",
						"url('border.png') 27 27 27 27 / 1em 1em 1em 1em repeat",
						"url('border.png') 27 27 27 27 / 1em 1em 1em 1em stretch round" ],
		invalid_values: [ "url('border.png') 27 27 27 27 27",
						  "url('border.png') 27 27 27 27 / 1em 1em 1em 1em 1em",
						  "url('border.png') 27 27 27 27 /",
						  "url('border.png') fill",
						  "url('border.png') fill repeat",
						  "fill repeat",
						  "url('border.png') fill / 1em",
						  "url('border.png') / repeat",
						  "url('border.png') 1 /",
						  "url('border.png') 1 / /",
						  "1 / url('border.png')",
						  "url('border.png') / 1",
						  "url('border.png') / / 1"]
	},
	"border-image-source": {
		domProp: "borderImageSource",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "url('border.png')" ],
		invalid_values: [ "url('border.png') url('border.png')" ]
	},
	"border-image-slice": {
		domProp: "borderImageSlice",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "100%", "100% 100% 100% 100%" ],
		other_values: [ "0%", "10", "10 100% 0 2", "0 0 0 0", "fill 10 10", "10 10 fill" ],
		invalid_values: [ "-10%", "-10", "10 10 10 10 10", "10 10 10 10 -10", "10px", "-10px", "fill", "fill fill 10px", "10px fill fill" ]
	},
	"border-image-width": {
		domProp: "borderImageWidth",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "1", "1 1 1 1" ],
		other_values: [ "0", "0%", "0px", "auto auto auto auto", "10 10% auto 15px", "10px 10px 10px 10px", "10", "10 10", "10 10 10" ],
		invalid_values: [ "-10", "-10px", "-10%", "10 10 10 10 10", "10 10 10 10 auto", "auto auto auto auto auto" ]
	},
	"border-image-outset": {
		domProp: "borderImageOutset",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "0", "0 0 0 0" ],
		other_values: [ "10px", "10", "10 10", "10 10 10", "10 10 10 10", "10px 10 10 10px" ],
		invalid_values: [ "-10", "-10px", "-10%", "10%", "10 10 10 10 10" ]
	},
	"border-image-repeat": {
		domProp: "borderImageRepeat",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "stretch", "stretch stretch" ],
		other_values: [ "round", "repeat", "stretch round", "repeat round", "stretch repeat", "round round", "repeat repeat" ],
		invalid_values: [ "none", "stretch stretch stretch", "0", "10", "0%", "0px" ]
	},
	"-moz-border-left-colors": {
		domProp: "MozBorderLeftColors",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "red green", "red #fc3", "#ff00cc", "currentColor", "blue currentColor orange currentColor" ],
		invalid_values: [ "red none", "red inherit", "red, green", "none red", "inherit red", "ff00cc" ]
	},
	"border-radius": {
		domProp: "borderRadius",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		prerequisites: { "width": "200px", "height": "100px", "display": "inline-block"},
		subproperties: [ "border-bottom-left-radius", "border-bottom-right-radius", "border-top-left-radius", "border-top-right-radius" ],
		initial_values: [ "0", "0px", "0%", "0px 0 0 0px", "calc(-2px)", "calc(-1%)", "calc(0px) calc(0pt) calc(0%) calc(0em)" ],
		other_values: [ "3%", "1px", "2em", "3em 2px", "2pt 3% 4em", "2px 2px 2px 2px", // circular
						"3% / 2%", "1px / 4px", "2em / 1em", "3em 2px / 2px 3em", "2pt 3% 4em / 4pt 1% 5em", "2px 2px 2px 2px / 4px 4px 4px 4px", "1pt / 2pt 3pt", "4pt 5pt / 3pt", // elliptical
			"calc(2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(3*25px) 5px",
			"5px calc(3*25px)",
			"calc(20%) calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
			"2px 2px calc(2px + 1%) 2px",
			"1px 2px 2px 2px / 2px 2px calc(2px + 1%) 2px",
					  ],
		invalid_values: [ "2px -2px", "inherit 2px", "inherit / 2px", "2px inherit", "2px / inherit", "2px 2px 2px 2px 2px", "1px / 2px 2px 2px 2px 2px", "2", "2 2", "2px 2px 2px 2px / 2px 2px 2 2px" ]
	},
	"border-bottom-left-radius": {
		domProp: "borderBottomLeftRadius",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "width": "200px", "height": "100px", "display": "inline-block"},
		initial_values: [ "0", "0px", "0%", "calc(-2px)", "calc(-1%)" ],
		other_values: [ "3%", "1px", "2em", // circular
						"3% 2%", "1px 4px", "2em 2pt", // elliptical
			"calc(2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(3*25px) 5px",
			"5px calc(3*25px)",
			"calc(20%) calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
					  ],
		invalid_values: [ "-1px", "4px -2px", "inherit 2px", "2px inherit", "2", "2px 2", "2 2px" ]
	},
	"border-bottom-right-radius": {
		domProp: "borderBottomRightRadius",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "width": "200px", "height": "100px", "display": "inline-block"},
		initial_values: [ "0", "0px", "0%", "calc(-2px)", "calc(-1%)" ],
		other_values: [ "3%", "1px", "2em", // circular
						"3% 2%", "1px 4px", "2em 2pt", // elliptical
			"calc(2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(3*25px) 5px",
			"5px calc(3*25px)",
			"calc(20%) calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
					  ],
		invalid_values: [ "-1px", "4px -2px", "inherit 2px", "2px inherit", "2", "2px 2", "2 2px" ]
	},
	"border-top-left-radius": {
		domProp: "borderTopLeftRadius",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "width": "200px", "height": "100px", "display": "inline-block"},
		initial_values: [ "0", "0px", "0%", "calc(-2px)", "calc(-1%)" ],
		other_values: [ "3%", "1px", "2em", // circular
						"3% 2%", "1px 4px", "2em 2pt", // elliptical
			"calc(2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(3*25px) 5px",
			"5px calc(3*25px)",
			"calc(20%) calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
					  ],
		invalid_values: [ "-1px", "4px -2px", "inherit 2px", "2px inherit", "2", "2px 2", "2 2px" ]
	},
	"border-top-right-radius": {
		domProp: "borderTopRightRadius",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "width": "200px", "height": "100px", "display": "inline-block"},
		initial_values: [ "0", "0px", "0%", "calc(-2px)", "calc(-1%)" ],
		other_values: [ "3%", "1px", "2em", // circular
						"3% 2%", "1px 4px", "2em 2pt", // elliptical
			"calc(2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(3*25px) 5px",
			"5px calc(3*25px)",
			"calc(20%) calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
					  ],
		invalid_values: [ "-1px", "4px -2px", "inherit 2px", "2px inherit", "2", "2px 2", "2 2px" ]
	},
	"-moz-border-right-colors": {
		domProp: "MozBorderRightColors",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "red green", "red #fc3", "#ff00cc", "currentColor", "blue currentColor orange currentColor" ],
		invalid_values: [ "red none", "red inherit", "red, green", "none red", "inherit red", "ff00cc" ]
	},
	"-moz-border-start": {
		domProp: "MozBorderStart",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "-moz-border-start-color", "-moz-border-start-style", "-moz-border-start-width" ],
		initial_values: [ "none", "medium", "currentColor", "thin", "none medium currentcolor" ],
		other_values: [ "solid", "green", "medium solid", "green solid", "10px solid", "thick solid", "5px green none" ],
		invalid_values: [ "5%", "5", "5 green solid" ]
	},
	"-moz-border-start-color": {
		domProp: "MozBorderStartColor",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		get_computed: logical_box_prop_get_computed,
		initial_values: [ "currentColor" ],
		other_values: [ "green", "rgba(255,128,0,0.5)", "transparent" ],
		invalid_values: [ "#0", "#00", "#0000", "#00000", "#0000000", "#00000000", "#000000000", "000000" ]
	},
	"-moz-border-start-style": {
		domProp: "MozBorderStartStyle",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		get_computed: logical_box_prop_get_computed,
		/* XXX hidden is sometimes the same as initial */
		initial_values: [ "none" ],
		other_values: [ "solid", "dashed", "dotted", "double", "outset", "inset", "groove", "ridge" ],
		invalid_values: []
	},
	"-moz-border-start-width": {
		domProp: "MozBorderStartWidth",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		get_computed: logical_box_prop_get_computed,
		prerequisites: { "-moz-border-start-style": "solid" },
		initial_values: [ "medium", "3px", "calc(4px - 1px)" ],
		other_values: [ "thin", "thick", "1px", "2em",
			"calc(2px)",
			"calc(-2px)",
			"calc(0em)",
			"calc(0px)",
			"calc(5em)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 5em)",
		],
		invalid_values: [ "5%", "5" ]
	},
	"-moz-border-top-colors": {
		domProp: "MozBorderTopColors",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "red green", "red #fc3", "#ff00cc", "currentColor", "blue currentColor orange currentColor" ],
		invalid_values: [ "red none", "red inherit", "red, green", "none red", "inherit red", "ff00cc" ]
	},
	"-moz-box-align": {
		domProp: "MozBoxAlign",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "stretch" ],
		other_values: [ "start", "center", "baseline", "end" ],
		invalid_values: []
	},
	"-moz-box-direction": {
		domProp: "MozBoxDirection",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "normal" ],
		other_values: [ "reverse" ],
		invalid_values: []
	},
	"-moz-box-flex": {
		domProp: "MozBoxFlex",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "0", "0.0", "-0.0" ],
		other_values: [ "1", "100", "0.1" ],
		invalid_values: [ "10px", "-1" ]
	},
	"-moz-box-ordinal-group": {
		domProp: "MozBoxOrdinalGroup",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "1" ],
		other_values: [ "2", "100", "0" ],
		invalid_values: [ "1.0", "-1", "-1000" ]
	},
	"-moz-box-orient": {
		domProp: "MozBoxOrient",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "horizontal", "inline-axis" ],
		other_values: [ "vertical", "block-axis" ],
		invalid_values: []
	},
	"-moz-box-pack": {
		domProp: "MozBoxPack",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "start" ],
		other_values: [ "center", "end", "justify" ],
		invalid_values: []
	},
	"box-sizing": {
		domProp: "boxSizing",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "content-box" ],
		other_values: [ "border-box", "padding-box" ],
		invalid_values: [ "margin-box", "content", "padding", "border", "margin" ]
	},
	"-moz-box-sizing": {
		domProp: "MozBoxSizing",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		alias_for: "box-sizing",
		subproperties: [ "box-sizing" ]
		initial_values: [ "content-box" ],
		other_values: [ "border-box", "padding-box" ],
		invalid_values: [ "margin-box", "content", "padding", "border", "margin" ]
	},
	"-moz-columns": {
		domProp: "MozColumns",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "-moz-column-count", "-moz-column-width" ],
		initial_values: [ "auto", "auto auto" ],
		other_values: [ "3", "20px", "2 10px", "10px 2", "2 auto", "auto 2", "auto 50px", "50px auto" ],
		invalid_values: [ "5%", "-1px", "-1", "3 5", "10px 4px", "10 2px 5in", "30px -1",
		                  "auto 3 5px", "5 auto 20px", "auto auto auto" ]
	},
	"-moz-column-count": {
		domProp: "MozColumnCount",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "1", "17" ],
		// negative and zero invalid per editor's draft
		invalid_values: [ "-1", "0", "3px" ]
	},
        "-moz-column-fill": {
                domProp: "MozColumnFill",
                inherited: false,
                type: CSS_TYPE_LONGHAND,
                initial_values: [ "balance" ],
                other_values: [ "auto" ],
                invalid_values: [ "2px", "dotted", "5em" ]
        },
	"-moz-column-gap": {
		domProp: "MozColumnGap",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "normal", "1em", "calc(-2em + 3em)" ],
		other_values: [ "2px", "4em",
			"calc(2px)",
			"calc(-2px)",
			"calc(0px)",
			"calc(0pt)",
			"calc(5em)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 5em)",
		],
		invalid_values: [ "3%", "-1px", "4" ]
	},
	"-moz-column-rule": {
		domProp: "MozColumnRule",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		prerequisites: { "color": "green" },
		subproperties: [ "-moz-column-rule-width", "-moz-column-rule-style", "-moz-column-rule-color" ],
		initial_values: [ "medium none currentColor", "none", "medium", "currentColor" ],
		other_values: [ "2px blue solid", "red dotted 1px", "ridge 4px orange", "5px solid" ],
		invalid_values: [ "2px 3px 4px red", "dotted dashed", "5px dashed green 3px", "5 solid", "5 green solid" ]
	},
	"-moz-column-rule-width": {
		domProp: "MozColumnRuleWidth",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "-moz-column-rule-style": "solid" },
		initial_values: [
			"medium",
			"3px",
			"-moz-calc(3px)",
			"-moz-calc(5em + 3px - 5em)",
			"calc(3px)",
			"calc(5em + 3px - 5em)",
		],
		other_values: [ "thin", "15px",
			/* valid -moz-calc() values */
			"-moz-calc(-2px)",
			"-moz-calc(2px)",
			"-moz-calc(3em)",
			"-moz-calc(3em + 2px)",
			"-moz-calc( 3em + 2px)",
			"-moz-calc(3em + 2px )",
			"-moz-calc( 3em + 2px )",
			"-moz-calc(3*25px)",
			"-moz-calc(3 *25px)",
			"-moz-calc(3 * 25px)",
			"-moz-calc(3* 25px)",
			"-moz-calc(25px*3)",
			"-moz-calc(25px *3)",
			"-moz-calc(25px* 3)",
			"-moz-calc(25px * 3)",
			"-moz-calc(25px * 3 / 4)",
			"-moz-calc((25px * 3) / 4)",
			"-moz-calc(25px * (3 / 4))",
			"-moz-calc(3 * 25px / 4)",
			"-moz-calc((3 * 25px) / 4)",
			"-moz-calc(3 * (25px / 4))",
			"-moz-calc(3em + 25px * 3 / 4)",
			"-moz-calc(3em + (25px * 3) / 4)",
			"-moz-calc(3em + 25px * (3 / 4))",
			"-moz-calc(25px * 3 / 4 + 3em)",
			"-moz-calc((25px * 3) / 4 + 3em)",
			"-moz-calc(25px * (3 / 4) + 3em)",
			"-moz-calc(3em + (25px * 3 / 4))",
			"-moz-calc(3em + ((25px * 3) / 4))",
			"-moz-calc(3em + (25px * (3 / 4)))",
			"-moz-calc((25px * 3 / 4) + 3em)",
			"-moz-calc(((25px * 3) / 4) + 3em)",
			"-moz-calc((25px * (3 / 4)) + 3em)",
			"-moz-calc(3*25px + 1in)",
			"-moz-calc(1in - 3em + 2px)",
			"-moz-calc(1in - (3em + 2px))",
			"-moz-calc((1in - 3em) + 2px)",
			"-moz-calc(50px/2)",
			"-moz-calc(50px/(2 - 1))",
			"-moz-calc(-3px)",
			/* numeric reduction cases */
			"-moz-calc(5 * 3 * 2em)",
			"-moz-calc(2em * 5 * 3)",
			"-moz-calc((5 * 3) * 2em)",
			"-moz-calc(2em * (5 * 3))",
			"-moz-calc((5 + 3) * 2em)",
			"-moz-calc(2em * (5 + 3))",
			"-moz-calc(2em / (5 + 3))",
			"-moz-calc(2em * (5*2 + 3))",
			"-moz-calc(2em * ((5*2) + 3))",
			"-moz-calc(2em * (5*(2 + 3)))",

			"-moz-calc((5 + 7) * 3em)",
			"-moz-calc((5em + 3em) - 2em)",
			"-moz-calc((5em - 3em) + 2em)",
			"-moz-calc(2em - (5em - 3em))",
			"-moz-calc(2em + (5em - 3em))",
			"-moz-calc(2em - (5em + 3em))",
			"-moz-calc(2em + (5em + 3em))",
			"-moz-calc(2em + 5em - 3em)",
			"-moz-calc(2em - 5em - 3em)",
			"-moz-calc(2em + 5em + 3em)",
			"-moz-calc(2em - 5em + 3em)",

			"-moz-calc(2em / 4 * 3)",
			"-moz-calc(2em * 4 / 3)",
			"-moz-calc(2em * 4 * 3)",
			"-moz-calc(2em / 4 / 3)",
			"-moz-calc(4 * 2em / 3)",
			"-moz-calc(4 / 3 * 2em)",

			"-moz-calc((2em / 4) * 3)",
			"-moz-calc((2em * 4) / 3)",
			"-moz-calc((2em * 4) * 3)",
			"-moz-calc((2em / 4) / 3)",
			"-moz-calc((4 * 2em) / 3)",
			"-moz-calc((4 / 3) * 2em)",

			"-moz-calc(2em / (4 * 3))",
			"-moz-calc(2em * (4 / 3))",
			"-moz-calc(2em * (4 * 3))",
			"-moz-calc(2em / (4 / 3))",
			"-moz-calc(4 * (2em / 3))",

			// Valid cases with unitless zero (which is never
			// a length).
			"-moz-calc(0 * 2em)",
			"-moz-calc(2em * 0)",
			"-moz-calc(3em + 0 * 2em)",
			"-moz-calc(3em + 2em * 0)",
			"-moz-calc((0 + 2) * 2em)",
			"-moz-calc((2 + 0) * 2em)",
			// And test zero lengths while we're here.
			"-moz-calc(2 * 0px)",
			"-moz-calc(0 * 0px)",
			"-moz-calc(2 * 0em)",
			"-moz-calc(0 * 0em)",
			"-moz-calc(0px * 0)",
			"-moz-calc(0px * 2)",

			/* valid calc() values */
			"calc(-2px)",
			"calc(2px)",
			"calc(3em)",
			"calc(3em + 2px)",
			"calc( 3em + 2px)",
			"calc(3em + 2px )",
			"calc( 3em + 2px )",
			"calc(3*25px)",
			"calc(3 *25px)",
			"calc(3 * 25px)",
			"calc(3* 25px)",
			"calc(25px*3)",
			"calc(25px *3)",
			"calc(25px* 3)",
			"calc(25px * 3)",
			"calc(25px * 3 / 4)",
			"calc((25px * 3) / 4)",
			"calc(25px * (3 / 4))",
			"calc(3 * 25px / 4)",
			"calc((3 * 25px) / 4)",
			"calc(3 * (25px / 4))",
			"calc(3em + 25px * 3 / 4)",
			"calc(3em + (25px * 3) / 4)",
			"calc(3em + 25px * (3 / 4))",
			"calc(25px * 3 / 4 + 3em)",
			"calc((25px * 3) / 4 + 3em)",
			"calc(25px * (3 / 4) + 3em)",
			"calc(3em + (25px * 3 / 4))",
			"calc(3em + ((25px * 3) / 4))",
			"calc(3em + (25px * (3 / 4)))",
			"calc((25px * 3 / 4) + 3em)",
			"calc(((25px * 3) / 4) + 3em)",
			"calc((25px * (3 / 4)) + 3em)",
			"calc(3*25px + 1in)",
			"calc(1in - 3em + 2px)",
			"calc(1in - (3em + 2px))",
			"calc((1in - 3em) + 2px)",
			"calc(50px/2)",
			"calc(50px/(2 - 1))",
			"calc(-3px)",
			/* numeric reduction cases */
			"calc(5 * 3 * 2em)",
			"calc(2em * 5 * 3)",
			"calc((5 * 3) * 2em)",
			"calc(2em * (5 * 3))",
			"calc((5 + 3) * 2em)",
			"calc(2em * (5 + 3))",
			"calc(2em / (5 + 3))",
			"calc(2em * (5*2 + 3))",
			"calc(2em * ((5*2) + 3))",
			"calc(2em * (5*(2 + 3)))",

			"calc((5 + 7) * 3em)",
			"calc((5em + 3em) - 2em)",
			"calc((5em - 3em) + 2em)",
			"calc(2em - (5em - 3em))",
			"calc(2em + (5em - 3em))",
			"calc(2em - (5em + 3em))",
			"calc(2em + (5em + 3em))",
			"calc(2em + 5em - 3em)",
			"calc(2em - 5em - 3em)",
			"calc(2em + 5em + 3em)",
			"calc(2em - 5em + 3em)",

			"calc(2em / 4 * 3)",
			"calc(2em * 4 / 3)",
			"calc(2em * 4 * 3)",
			"calc(2em / 4 / 3)",
			"calc(4 * 2em / 3)",
			"calc(4 / 3 * 2em)",

			"calc((2em / 4) * 3)",
			"calc((2em * 4) / 3)",
			"calc((2em * 4) * 3)",
			"calc((2em / 4) / 3)",
			"calc((4 * 2em) / 3)",
			"calc((4 / 3) * 2em)",

			"calc(2em / (4 * 3))",
			"calc(2em * (4 / 3))",
			"calc(2em * (4 * 3))",
			"calc(2em / (4 / 3))",
			"calc(4 * (2em / 3))",

			// Valid cases with unitless zero (which is never
			// a length).
			"calc(0 * 2em)",
			"calc(2em * 0)",
			"calc(3em + 0 * 2em)",
			"calc(3em + 2em * 0)",
			"calc((0 + 2) * 2em)",
			"calc((2 + 0) * 2em)",
			// And test zero lengths while we're here.
			"calc(2 * 0px)",
			"calc(0 * 0px)",
			"calc(2 * 0em)",
			"calc(0 * 0em)",
			"calc(0px * 0)",
			"calc(0px * 2)",

		],
		invalid_values: [ "20", "-1px", "red", "50%",
			/* invalid -moz-calc() values */
			"-moz-calc(2em+ 2px)",
			"-moz-calc(2em +2px)",
			"-moz-calc(2em+2px)",
			"-moz-calc(2em- 2px)",
			"-moz-calc(2em -2px)",
			"-moz-calc(2em-2px)",
			/* invalid calc() values */
			"calc(2em+ 2px)",
			"calc(2em +2px)",
			"calc(2em+2px)",
			"calc(2em- 2px)",
			"calc(2em -2px)",
			"calc(2em-2px)",
			"-moz-min()",
			"calc(min())",
			"-moz-max()",
			"calc(max())",
			"-moz-min(5px)",
			"calc(min(5px))",
			"-moz-max(5px)",
			"calc(max(5px))",
			"-moz-min(5px,2em)",
			"calc(min(5px,2em))",
			"-moz-max(5px,2em)",
			"calc(max(5px,2em))",
			"calc(50px/(2 - 2))",
			"calc(5 + 5)",
			"calc(5 * 5)",
			"calc(5em * 5em)",
			"calc(5em / 5em * 5em)",

			"calc(4 * 3 / 2em)",
			"calc((4 * 3) / 2em)",
			"calc(4 * (3 / 2em))",
			"calc(4 / (3 * 2em))",

			// Tests for handling of unitless zero, which cannot
			// be a length inside calc().
			"calc(0)",
			"calc(0 + 2em)",
			"calc(2em + 0)",
			"calc(0 * 2)",
			"calc(2 * 0)",
			"calc(1 * (2em + 0))",
			"calc((2em + 0))",
			"calc((2em + 0) * 1)",
			"calc(1 * (0 + 2em))",
			"calc((0 + 2em))",
			"calc((0 + 2em) * 1)",
		]
	},
	"-moz-column-rule-style": {
		domProp: "MozColumnRuleStyle",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "solid", "hidden", "ridge", "groove", "inset", "outset", "double", "dotted", "dashed" ],
		invalid_values: [ "20", "foo" ]
	},
	"-moz-column-rule-color": {
		domProp: "MozColumnRuleColor",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "color": "green" },
		initial_values: [ "currentColor", "-moz-use-text-color" ],
		other_values: [ "red", "blue", "#ffff00" ],
		invalid_values: [ "ffff00" ]
	},
	"-moz-column-width": {
		domProp: "MozColumnWidth",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [
			"15px",
			"calc(15px)",
			"calc(30px - 3em)",
			"calc(-15px)",
			"0px",
			"calc(0px)"
		],
		invalid_values: [ "20", "-1px", "50%" ]
	},
	"-moz-float-edge": {
		domProp: "MozFloatEdge",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "content-box" ],
		other_values: [ "margin-box" ],
		invalid_values: [ "content", "padding", "border", "margin" ]
	},
	"-moz-force-broken-image-icon": {
		domProp: "MozForceBrokenImageIcon",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "0" ],
		other_values: [ "1" ],
		invalid_values: []
	},
	"-moz-image-region": {
		domProp: "MozImageRegion",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "rect(3px 20px 15px 4px)", "rect(17px, 21px, 33px, 2px)" ],
		invalid_values: [ "rect(17px, 21px, 33, 2px)" ]
	},
	"-moz-margin-end": {
		domProp: "MozMarginEnd",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		get_computed: logical_box_prop_get_computed,
		/* no subproperties */
		/* auto may or may not be initial */
		initial_values: [ "0", "0px", "0%", "0em", "0ex", "calc(0pt)", "calc(0% + 0px)" ],
		other_values: [ "1px", "3em",
			"calc(2px)",
			"calc(-2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [ "5" ]
	},
	"-moz-margin-start": {
		domProp: "MozMarginStart",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		get_computed: logical_box_prop_get_computed,
		/* no subproperties */
		/* auto may or may not be initial */
		initial_values: [ "0", "0px", "0%", "0em", "0ex", "calc(0pt)", "calc(0% + 0px)" ],
		other_values: [ "1px", "3em",
			"calc(2px)",
			"calc(-2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [ "5" ]
	},
	"-moz-outline-radius": {
		domProp: "MozOutlineRadius",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		prerequisites: { "width": "200px", "height": "100px", "display": "inline-block"},
		subproperties: [ "-moz-outline-radius-bottomleft", "-moz-outline-radius-bottomright", "-moz-outline-radius-topleft", "-moz-outline-radius-topright" ],
		initial_values: [ "0", "0px", "0%", "calc(-2px)", "calc(-1%)", "calc(0px) calc(0pt) calc(0%) calc(0em)" ],
		other_values: [ "3%", "1px", "2em", "3em 2px", "2pt 3% 4em", "2px 2px 2px 2px", // circular
						"3% / 2%", "1px / 4px", "2em / 1em", "3em 2px / 2px 3em", "2pt 3% 4em / 4pt 1% 5em", "2px 2px 2px 2px / 4px 4px 4px 4px", "1pt / 2pt 3pt", "4pt 5pt / 3pt", // elliptical
			"calc(2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(3*25px) 5px",
			"5px calc(3*25px)",
			"calc(20%) calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
			"2px 2px calc(2px + 1%) 2px",
			"1px 2px 2px 2px / 2px 2px calc(2px + 1%) 2px",
					  ],
		invalid_values: [ "2px -2px", "inherit 2px", "inherit / 2px", "2px inherit", "2px / inherit", "2px 2px 2px 2px 2px", "1px / 2px 2px 2px 2px 2px", "2", "2 2", "2px 2px 2px 2px / 2px 2px 2 2px" ]
	},
	"-moz-outline-radius-bottomleft": {
		domProp: "MozOutlineRadiusBottomleft",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "width": "200px", "height": "100px", "display": "inline-block"},
		initial_values: [ "0", "0px", "0%", "calc(-2px)", "calc(-1%)", "calc(0px)" ],
		other_values: [ "3%", "1px", "2em", // circular
						"3% 2%", "1px 4px", "2em 2pt", // elliptical
			"calc(2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(3*25px) 5px",
			"5px calc(3*25px)",
			"calc(20%) calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
					  ],
		invalid_values: [ "-1px", "4px -2px", "inherit 2px", "2px inherit", "2", "2px 2", "2 2px" ]
	},
	"-moz-outline-radius-bottomright": {
		domProp: "MozOutlineRadiusBottomright",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "width": "200px", "height": "100px", "display": "inline-block"},
		initial_values: [ "0", "0px", "0%", "calc(-2px)", "calc(-1%)", "calc(0px)" ],
		other_values: [ "3%", "1px", "2em", // circular
						"3% 2%", "1px 4px", "2em 2pt", // elliptical
			"calc(2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(3*25px) 5px",
			"5px calc(3*25px)",
			"calc(20%) calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
					  ],
		invalid_values: [ "-1px", "4px -2px", "inherit 2px", "2px inherit", "2", "2px 2", "2 2px" ]
	},
	"-moz-outline-radius-topleft": {
		domProp: "MozOutlineRadiusTopleft",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "width": "200px", "height": "100px", "display": "inline-block"},
		initial_values: [ "0", "0px", "0%", "calc(-2px)", "calc(-1%)", "calc(0px)" ],
		other_values: [ "3%", "1px", "2em", // circular
						"3% 2%", "1px 4px", "2em 2pt", // elliptical
			"calc(2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(3*25px) 5px",
			"5px calc(3*25px)",
			"calc(20%) calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
					  ],
		invalid_values: [ "-1px", "4px -2px", "inherit 2px", "2px inherit", "2", "2px 2", "2 2px" ]
	},
	"-moz-outline-radius-topright": {
		domProp: "MozOutlineRadiusTopright",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "width": "200px", "height": "100px", "display": "inline-block"},
		initial_values: [ "0", "0px", "0%", "calc(-2px)", "calc(-1%)", "calc(0px)" ],
		other_values: [ "3%", "1px", "2em", // circular
						"3% 2%", "1px 4px", "2em 2pt", // elliptical
			"calc(2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(3*25px) 5px",
			"5px calc(3*25px)",
			"calc(20%) calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
					  ],
		invalid_values: [ "-1px", "4px -2px", "inherit 2px", "2px inherit", "2", "2px 2", "2 2px" ]
	},
	"-moz-padding-end": {
		domProp: "MozPaddingEnd",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		get_computed: logical_box_prop_get_computed,
		/* no subproperties */
		initial_values: [ "0", "0px", "0%", "0em", "0ex", "calc(0pt)", "calc(0% + 0px)", "calc(-3px)", "calc(-1%)" ],
		other_values: [ "1px", "3em",
			"calc(2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [ "5" ]
	},
	"-moz-padding-start": {
		domProp: "MozPaddingStart",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		get_computed: logical_box_prop_get_computed,
		/* no subproperties */
		initial_values: [ "0", "0px", "0%", "0em", "0ex", "calc(0pt)", "calc(0% + 0px)", "calc(-3px)", "calc(-1%)" ],
		other_values: [ "1px", "3em",
			"calc(2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [ "5" ]
	},
	"resize": {
		domProp: "resize",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "display": "block", "overflow": "auto" },
		initial_values: [ "none" ],
		other_values: [ "both", "horizontal", "vertical" ],
		invalid_values: []
	},
	"-moz-stack-sizing": {
		domProp: "MozStackSizing",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "stretch-to-fit" ],
		other_values: [ "ignore" ],
		invalid_values: []
	},
	"-moz-tab-size": {
		domProp: "MozTabSize",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "8" ],
		other_values: [ "0", "3", "99", "12000" ],
		invalid_values: [ "-1", "-808", "3.0", "17.5" ]
	},
	"-moz-text-size-adjust": {
		domProp: "MozTextSizeAdjust",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "none" ],
		invalid_values: [ "-5%", "0", "100", "0%", "50%", "100%", "220.3%" ]
	},
	"transform": {
		domProp: "transform",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "width": "300px", "height": "50px" },
		initial_values: [ "none" ],
		other_values: [ "translatex(1px)", "translatex(4em)",
			"translatex(-4px)", "translatex(3px)",
			"translatex(0px) translatex(1px) translatex(2px) translatex(3px) translatex(4px)",
			"translatey(4em)", "translate(3px)", "translate(10px, -3px)",
			"rotate(45deg)", "rotate(45grad)", "rotate(45rad)",
			"rotate(0.25turn)", "rotate(0)", "scalex(10)", "scaley(10)",
			"scale(10)", "scale(10, 20)", "skewx(30deg)", "skewx(0)",
			"skewy(0)", "skewx(30grad)", "skewx(30rad)", "skewx(0.08turn)",
			"skewy(30deg)", "skewy(30grad)", "skewy(30rad)", "skewy(0.08turn)",
			"rotate(45deg) scale(2, 1)", "skewx(45deg) skewx(-50grad)",
			"translate(0, 0) scale(1, 1) skewx(0) skewy(0) matrix(1, 0, 0, 1, 0, 0)",
			"translatex(50%)", "translatey(50%)", "translate(50%)",
			"translate(3%, 5px)", "translate(5px, 3%)",
			"matrix(1, 2, 3, 4, 5, 6)",
			/* valid calc() values */
			"translatex(calc(5px + 10%))",
			"translatey(calc(0.25 * 5px + 10% / 3))",
			"translate(calc(5px - 10% * 3))",
			"translate(calc(5px - 3 * 10%), 50px)",
			"translate(-50px, calc(5px - 10% * 3))",
			"translatez(1px)", "translatez(4em)", "translatez(-4px)",
			"translatez(0px)", "translatez(2px) translatez(5px)",
			"translate3d(3px, 4px, 5px)", "translate3d(2em, 3px, 1em)",
			"translatex(2px) translate3d(4px, 5px, 6px) translatey(1px)",
			"scale3d(4, 4, 4)", "scale3d(-2, 3, -7)", "scalez(4)",
			"scalez(-6)", "rotate3d(2, 3, 4, 45deg)",
			"rotate3d(-3, 7, 0, 12rad)", "rotatex(15deg)", "rotatey(-12grad)",
			"rotatez(72rad)", "rotatex(0.125turn)", "perspective(1000px)",
			"matrix3d(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)",
		],
		invalid_values: ["1px", "#0000ff", "red", "auto",
			"translatex(1)", "translatey(1)", "translate(2)",
			"translate(-3, -4)",
			"translatex(1px 1px)", "translatex(translatex(1px))",
			"translatex(#0000ff)", "translatex(red)", "translatey()",
			"matrix(1px, 2px, 3px, 4px, 5px, 6px)", "scale(150%)",
			"skewx(red)", "matrix(1%, 0, 0, 0, 0px, 0px)",
			"matrix(0, 1%, 2, 3, 4px,5px)", "matrix(0, 1, 2%, 3, 4px, 5px)",
			"matrix(0, 1, 2, 3%, 4%, 5%)", "matrix(1, 2, 3, 4, 5px, 6%)",
			"matrix(1, 2, 3, 4, 5%, 6px)", "matrix(1, 2, 3, 4, 5%, 6%)",
			"matrix(1, 2, 3, 4, 5px, 6em)",
			/* invalid calc() values */
			"translatey(-moz-min(5px,10%))",
			"translatex(-moz-max(5px,10%))",
			"translate(10px, calc(min(5px,10%)))",
			"translate(calc(max(5px,10%)), 10%)",
			"matrix(1, 0, 0, 1, max(5px * 3), calc(10% - 3px))",
			"perspective(0px)", "perspective(-10px)", "matrix3d(dinosaur)",
			"matrix3d(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17)",
			"matrix3d(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)",
			"matrix3d(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15%, 16)",
			"matrix3d(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16px)",
			"rotatey(words)", "rotatex(7)", "translate3d(3px, 4px, 1px, 7px)",
			"matrix3d(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13px, 14em, 15px, 16)",
			"matrix3d(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 20%, 10%, 15, 16)"
		],
	},
	"transform-origin": {
		domProp: "transformOrigin",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		/* no subproperties */
		prerequisites: { "width": "10px", "height": "10px", "display": "block"},
		initial_values: [ "50% 50%", "center", "center center" ],
		other_values: [ "25% 25%", "6px 5px", "20% 3em", "0 0", "0in 1in",
						"top", "bottom","top left", "top right",
						"top center", "center left", "center right",
						"bottom left", "bottom right", "bottom center",
						"20% center", "6px center", "13in bottom",
						"left 50px", "right 13%", "center 40px",
			"calc(20px)",
			"calc(20px) 10px",
			"10px calc(20px)",
			"calc(20px) 25%",
			"25% calc(20px)",
			"calc(20px) calc(20px)",
			"calc(20px + 1em) calc(20px / 2)",
			"calc(20px + 50%) calc(50% - 10px)",
			"calc(-20px) calc(-50%)",
			"calc(-20%) calc(-50%)",
			"6px 5px 5px",
			"top center 10px"
		],
		invalid_values: ["red", "auto", "none", "0.5 0.5", "40px #0000ff",
						 "border", "center red", "right diagonal",
						 "#00ffff bottom"]
	},
	"perspective-origin": {
		domProp: "perspectiveOrigin",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		/* no subproperties */
		prerequisites: { "width": "10px", "height": "10px", "display": "block"},
		initial_values: [ "50% 50%", "center", "center center" ],
		other_values: [ "25% 25%", "6px 5px", "20% 3em", "0 0", "0in 1in",
		                "top", "bottom","top left", "top right",
		                "top center", "center left", "center right",
		                "bottom left", "bottom right", "bottom center",
		                "20% center", "6px center", "13in bottom",
		                "left 50px", "right 13%", "center 40px",
		                "calc(20px)",
		                "calc(20px) 10px",
		                "10px calc(20px)",
		                "calc(20px) 25%",
		                "25% calc(20px)",
		                "calc(20px) calc(20px)",
		                "calc(20px + 1em) calc(20px / 2)",
		                "calc(20px + 50%) calc(50% - 10px)",
		                "calc(-20px) calc(-50%)",
		                "calc(-20%) calc(-50%)" ],
		invalid_values: [ "red", "auto", "none", "0.5 0.5", "40px #0000ff",
		                  "border", "center red", "right diagonal",
		                  "#00ffff bottom"]
	},
	"perspective": {
		domProp: "perspective",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "1000px", "500.2px" ],
		invalid_values: [ "pants", "200", "0", "-100px", "-27.2em" ]
	},
	"backface-visibility": {
		domProp: "backfaceVisibility",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "visible" ],
		other_values: [ "hidden" ],
		invalid_values: [ "collapse" ]
	},
	"transform-style": {
		domProp: "transformStyle",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "flat" ],
		other_values: [ "preserve-3d" ],
		invalid_values: []
	},
	"-moz-user-focus": {
		domProp: "MozUserFocus",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "normal", "ignore", "select-all", "select-before", "select-after", "select-same", "select-menu" ],
		invalid_values: []
	},
	"-moz-user-input": {
		domProp: "MozUserInput",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "none", "enabled", "disabled" ],
		invalid_values: []
	},
	"-moz-user-modify": {
		domProp: "MozUserModify",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "read-only" ],
		other_values: [ "read-write", "write-only" ],
		invalid_values: []
	},
	"-moz-user-select": {
		domProp: "MozUserSelect",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "none", "text", "element", "elements", "all", "toggle", "tri-state", "-moz-all", "-moz-none" ],
		invalid_values: []
	},
	"-moz-window-shadow": {
		domProp: "MozWindowShadow",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "default" ],
		other_values: [ "none", "menu", "tooltip", "sheet" ],
		invalid_values: []
	},
	"background": {
		domProp: "background",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "background-attachment", "background-color", "background-image", "background-position", "background-repeat", "background-clip", "background-origin", "background-size" ],
		initial_values: [ "transparent", "none", "repeat", "scroll", "0% 0%", "top left", "left top", "0% 0% / auto", "top left / auto", "left top / auto", "0% 0% / auto auto",
			"transparent none", "top left none", "left top none", "none left top", "none top left", "none 0% 0%", "left top / auto none", "left top / auto auto none",
			"transparent none repeat scroll top left", "left top repeat none scroll transparent", "transparent none repeat scroll top left / auto", "left top / auto repeat none scroll transparent", "none repeat scroll 0% 0% / auto auto transparent" ],
		other_values: [
				/* without multiple backgrounds */
			"green",
			"none green repeat scroll left top",
			"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==)",
			"repeat url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==') transparent left top scroll",
			"repeat-x",
			"repeat-y",
			"no-repeat",
			"none repeat-y transparent scroll 0% 0%",
			"fixed",
			"0% top transparent fixed repeat none",
			"top",
			"left",
			"50% 50%",
			"center",
			"top / 100px",
			"left / contain",
			"left / cover",
			"10px / 10%",
			"10em / calc(20px)",
			"top left / 100px 100px",
			"top left / 100px auto",
			"top left / 100px 10%",
			"top left / 100px calc(20px)",
			"bottom right scroll none transparent repeat",
			"50% transparent",
			"transparent 50%",
			"50%",
			"-moz-radial-gradient(10% bottom, #ffffff, black) scroll no-repeat",
			"-moz-linear-gradient(10px 10px -45deg, red, blue) repeat",
			"-moz-linear-gradient(10px 10px -0.125turn, red, blue) repeat",
			"-moz-repeating-radial-gradient(10% bottom, #ffffff, black) scroll no-repeat",
			"-moz-repeating-linear-gradient(10px 10px -45deg, red, blue) repeat",
			"-moz-element(#test) lime",
				/* multiple backgrounds */
				"url(404.png), url(404.png)",
				"url(404.png), url(404.png) transparent",
				"url(404.png), url(404.png) red",
				"repeat-x, fixed, none",
				"0% top url(404.png), url(404.png) 0% top",
				"fixed repeat-y top left url(404.png), repeat-x green",
				"url(404.png), -moz-linear-gradient(20px 20px -45deg, blue, green), -moz-element(#a) black",
				"top left / contain, bottom right / cover",
				/* test cases with clip+origin in the shorthand */
				"url(404.png) green padding-box",
				"url(404.png) border-box transparent",
				"content-box url(404.png) blue",
				"url(404.png) green padding-box padding-box",
				"url(404.png) green padding-box border-box",
				"content-box border-box url(404.png) blue",
		],
		invalid_values: [
			/* mixes with keywords have to be in correct order */
			"50% left", "top 50%",
			/* no quirks mode colors */
			"-moz-radial-gradient(10% bottom, ffffff, black) scroll no-repeat",
			/* no quirks mode lengths */
			"-moz-linear-gradient(10 10px -45deg, red, blue) repeat",
			"-moz-linear-gradient(10px 10 -45deg, red, blue) repeat",
			"linear-gradient(red -99, yellow, green, blue 120%)",
			/* bug 258080: don't accept background-position separated */
			"left url(404.png) top", "top url(404.png) left",
			/* not allowed to have color in non-bottom layer */
			"url(404.png) transparent, url(404.png)",
			"url(404.png) red, url(404.png)",
			"url(404.png) transparent, url(404.png) transparent",
			"url(404.png) transparent red, url(404.png) transparent red",
			"url(404.png) red, url(404.png) red",
			"url(404.png) rgba(0, 0, 0, 0), url(404.png)",
			"url(404.png) rgb(255, 0, 0), url(404.png)",
			"url(404.png) rgba(0, 0, 0, 0), url(404.png) rgba(0, 0, 0, 0)",
			"url(404.png) rgba(0, 0, 0, 0) rgb(255, 0, 0), url(404.png) rgba(0, 0, 0, 0) rgb(255, 0, 0)",
			"url(404.png) rgb(255, 0, 0), url(404.png) rgb(255, 0, 0)",
			/* bug 513395: old syntax for gradients */
			"-moz-radial-gradient(10% bottom, 30px, 20px 20px, 10px, from(#ffffff), to(black)) scroll no-repeat",
			"-moz-linear-gradient(10px 10px, 20px 20px, from(red), to(blue)) repeat",
			/* clip and origin separated in the shorthand */
			"url(404.png) padding-box green border-box",
			"url(404.png) padding-box green padding-box",
			"transparent padding-box url(404.png) border-box",
			"transparent padding-box url(404.png) padding-box",
		]
	},
	"background-attachment": {
		domProp: "backgroundAttachment",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "scroll" ],
		other_values: [ "fixed", "local", "scroll,scroll", "fixed, scroll", "scroll, fixed, local, scroll", "fixed, fixed" ],
		invalid_values: []
	},
	"background-clip": {
		/*
		 * When we rename this to 'background-clip', we also
		 * need to rename the values to match the spec.
		 */
		domProp: "backgroundClip",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "border-box" ],
		other_values: [ "content-box", "padding-box", "border-box, padding-box", "padding-box, padding-box, padding-box", "border-box, border-box" ],
		invalid_values: [ "margin-box", "border-box border-box" ]
	},
	"background-color": {
		domProp: "backgroundColor",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "transparent", "rgba(255, 127, 15, 0)", "hsla(240, 97%, 50%, 0.0)", "rgba(0, 0, 0, 0)", "rgba(255,255,255,-3.7)" ],
		other_values: [ "green", "rgb(255, 0, 128)", "#fc2", "#96ed2a", "black", "rgba(255,255,0,3)", "hsl(240, 50%, 50%)", "rgb(50%, 50%, 50%)", "-moz-default-background-color" ],
		invalid_values: [ "#0", "#00", "#0000", "#00000", "#0000000", "#00000000", "#000000000", "rgb(100, 100.0, 100)" ],
		quirks_values: { "000000": "#000000", "96ed2a": "#96ed2a" },
	},
	"background-image": {
		domProp: "backgroundImage",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [
		"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==)", "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==')", 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==")',
		"none, none",
		"none, none, none, none, none",
		"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==), none",
		"none, url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==), none",
		"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==), url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==)",
		"-moz-element(#a)",
		"-moz-element(  #a  )",
		"-moz-element(#a-1)",
		"-moz-element(#a\\:1)",
		/* gradient torture test */
		"linear-gradient(red, blue)",
		"linear-gradient(red, yellow, blue)",
		"linear-gradient(red 1px, yellow 20%, blue 24em, green)",
		"linear-gradient(red, yellow, green, blue 50%)",
		"linear-gradient(red -50%, yellow -25%, green, blue)",
		"linear-gradient(red -99px, yellow, green, blue 120%)",
		"linear-gradient(#ffff00, #ef3, rgba(10, 20, 30, 0.4))",
		"linear-gradient(rgba(10, 20, 30, 0.4), #ffff00, #ef3)",

		"linear-gradient(to top, red, blue)",
		"linear-gradient(to bottom, red, blue)",
		"linear-gradient(to left, red, blue)",
		"linear-gradient(to right, red, blue)",
		"linear-gradient(to top left, red, blue)",
		"linear-gradient(to top right, red, blue)",
		"linear-gradient(to bottom left, red, blue)",
		"linear-gradient(to bottom right, red, blue)",
		"linear-gradient(to left top, red, blue)",
		"linear-gradient(to left bottom, red, blue)",
		"linear-gradient(to right top, red, blue)",
		"linear-gradient(to right bottom, red, blue)",

		"linear-gradient(-33deg, red, blue)",
		"linear-gradient(30grad, red, blue)",
		"linear-gradient(10deg, red, blue)",
		"linear-gradient(1turn, red, blue)",
		"linear-gradient(.414rad, red, blue)",

		"-moz-linear-gradient(red, blue)",
		"-moz-linear-gradient(red, yellow, blue)",
		"-moz-linear-gradient(red 1px, yellow 20%, blue 24em, green)",
		"-moz-linear-gradient(red, yellow, green, blue 50%)",
		"-moz-linear-gradient(red -50%, yellow -25%, green, blue)",
		"-moz-linear-gradient(red -99px, yellow, green, blue 120%)",
		"-moz-linear-gradient(#ffff00, #ef3, rgba(10, 20, 30, 0.4))",
		"-moz-linear-gradient(rgba(10, 20, 30, 0.4), #ffff00, #ef3)",

		"-moz-linear-gradient(to top, red, blue)",
		"-moz-linear-gradient(to bottom, red, blue)",
		"-moz-linear-gradient(to left, red, blue)",
		"-moz-linear-gradient(to right, red, blue)",
		"-moz-linear-gradient(to top left, red, blue)",
		"-moz-linear-gradient(to top right, red, blue)",
		"-moz-linear-gradient(to bottom left, red, blue)",
		"-moz-linear-gradient(to bottom right, red, blue)",
		"-moz-linear-gradient(to left top, red, blue)",
		"-moz-linear-gradient(to left bottom, red, blue)",
		"-moz-linear-gradient(to right top, red, blue)",
		"-moz-linear-gradient(to right bottom, red, blue)",

		"-moz-linear-gradient(top left, red, blue)",
		"-moz-linear-gradient(0 0, red, blue)",
		"-moz-linear-gradient(20% bottom, red, blue)",
		"-moz-linear-gradient(center 20%, red, blue)",
		"-moz-linear-gradient(left 35px, red, blue)",
		"-moz-linear-gradient(10% 10em, red, blue)",
		"-moz-linear-gradient(44px top, red, blue)",

		"-moz-linear-gradient(top left 45deg, red, blue)",
		"-moz-linear-gradient(20% bottom -300deg, red, blue)",
		"-moz-linear-gradient(center 20% 1.95929rad, red, blue)",
		"-moz-linear-gradient(left 35px 30grad, red, blue)",
		"-moz-linear-gradient(left 35px 0.1turn, red, blue)",
		"-moz-linear-gradient(10% 10em 99999deg, red, blue)",
		"-moz-linear-gradient(44px top -33deg, red, blue)",

		"-moz-linear-gradient(-33deg, red, blue)",
		"-moz-linear-gradient(30grad left 35px, red, blue)",
		"-moz-linear-gradient(10deg 20px, red, blue)",
		"-moz-linear-gradient(1turn 20px, red, blue)",
		"-moz-linear-gradient(.414rad bottom, red, blue)",

		"-moz-linear-gradient(blue calc(0px) ,green calc(25%) ,red calc(40px) ,blue calc(60px) , yellow  calc(100px))",
		"-moz-linear-gradient(-33deg, blue calc(-25%) ,red 40px)",
		"-moz-linear-gradient(10deg, blue calc(100px + -25%),red calc(40px))",
		"-moz-linear-gradient(10deg, blue calc(-25px),red calc(100%))",
		"-moz-linear-gradient(.414rad, blue calc(100px + -25px) ,green calc(100px + -25px) ,red calc(100px + -25%) ,blue calc(-25px) , yellow  calc(-25px))",
		"-moz-linear-gradient(1turn, blue calc(-25%) ,green calc(25px) ,red calc(25%),blue calc(0px),white 50px, yellow  calc(-25px))",

		"radial-gradient(red, blue)",
		"radial-gradient(red, yellow, blue)",
		"radial-gradient(red 1px, yellow 20%, blue 24em, green)",
		"radial-gradient(red, yellow, green, blue 50%)",
		"radial-gradient(red -50%, yellow -25%, green, blue)",
		"radial-gradient(red -99px, yellow, green, blue 120%)",
		"radial-gradient(#ffff00, #ef3, rgba(10, 20, 30, 0.4))",

		"radial-gradient(0 0, red, blue)",
		"radial-gradient(rgba(10, 20, 30, 0.4), #ffff00, #ef3)",

		"radial-gradient(at top left, red, blue)",
		"radial-gradient(at 20% bottom, red, blue)",
		"radial-gradient(at center 20%, red, blue)",
		"radial-gradient(at left 35px, red, blue)",
		"radial-gradient(at 10% 10em, red, blue)",
		"radial-gradient(at 44px top, red, blue)",
		"radial-gradient(at 0 0, red, blue)",

		"radial-gradient(farthest-corner, red, blue)",
		"radial-gradient(circle, red, blue)",
		"radial-gradient(ellipse closest-corner, red, blue)",
		"radial-gradient(closest-corner ellipse, red, blue)",

		"radial-gradient(43px, red, blue)",
		"radial-gradient(43px 43px, red, blue)",
		"radial-gradient(50% 50%, red, blue)",
		"radial-gradient(43px 50%, red, blue)",
		"radial-gradient(50% 43px, red, blue)",
		"radial-gradient(circle 43px, red, blue)",
		"radial-gradient(ellipse 43px 43px, red, blue)",
		"radial-gradient(ellipse 50% 50%, red, blue)",
		"radial-gradient(ellipse 43px 50%, red, blue)",
		"radial-gradient(ellipse 50% 43px, red, blue)",

		"radial-gradient(farthest-corner at top left, red, blue)",
		"radial-gradient(ellipse closest-corner at 45px, red, blue)",
		"radial-gradient(circle farthest-side at 45px, red, blue)",
		"radial-gradient(closest-side ellipse at 50%, red, blue)",
		"radial-gradient(farthest-corner circle at 4em, red, blue)",

		"radial-gradient(30% 40% at top left, red, blue)",
		"radial-gradient(50px 60px at 15% 20%, red, blue)",
		"radial-gradient(7em 8em at 45px, red, blue)",

		"-moz-radial-gradient(red, blue)",
		"-moz-radial-gradient(red, yellow, blue)",
		"-moz-radial-gradient(red 1px, yellow 20%, blue 24em, green)",
		"-moz-radial-gradient(red, yellow, green, blue 50%)",
		"-moz-radial-gradient(red -50%, yellow -25%, green, blue)",
		"-moz-radial-gradient(red -99px, yellow, green, blue 120%)",
		"-moz-radial-gradient(#ffff00, #ef3, rgba(10, 20, 30, 0.4))",

		"-moz-radial-gradient(top left, red, blue)",
		"-moz-radial-gradient(20% bottom, red, blue)",
		"-moz-radial-gradient(center 20%, red, blue)",
		"-moz-radial-gradient(left 35px, red, blue)",
		"-moz-radial-gradient(10% 10em, red, blue)",
		"-moz-radial-gradient(44px top, red, blue)",

		"-moz-radial-gradient(top left 45deg, red, blue)",
		"-moz-radial-gradient(0 0, red, blue)",
		"-moz-radial-gradient(20% bottom -300deg, red, blue)",
		"-moz-radial-gradient(center 20% 1.95929rad, red, blue)",
		"-moz-radial-gradient(left 35px 30grad, red, blue)",
		"-moz-radial-gradient(10% 10em 99999deg, red, blue)",
		"-moz-radial-gradient(44px top -33deg, red, blue)",
		"-moz-radial-gradient(rgba(10, 20, 30, 0.4), #ffff00, #ef3)",

		"-moz-radial-gradient(-33deg, red, blue)",
		"-moz-radial-gradient(30grad left 35px, red, blue)",
		"-moz-radial-gradient(10deg 20px, red, blue)",
		"-moz-radial-gradient(.414rad bottom, red, blue)",

		"-moz-radial-gradient(cover, red, blue)",
		"-moz-radial-gradient(circle, red, blue)",
		"-moz-radial-gradient(ellipse closest-corner, red, blue)",
		"-moz-radial-gradient(farthest-side circle, red, blue)",

		"-moz-radial-gradient(top left, cover, red, blue)",
		"-moz-radial-gradient(15% 20%, circle, red, blue)",
		"-moz-radial-gradient(45px, ellipse closest-corner, red, blue)",
		"-moz-radial-gradient(45px, farthest-side circle, red, blue)",

		"-moz-radial-gradient(99deg, cover, red, blue)",
		"-moz-radial-gradient(-1.2345rad, circle, red, blue)",
		"-moz-radial-gradient(399grad, ellipse closest-corner, red, blue)",
		"-moz-radial-gradient(399grad, farthest-side circle, red, blue)",

		"-moz-radial-gradient(top left 99deg, cover, red, blue)",
		"-moz-radial-gradient(15% 20% -1.2345rad, circle, red, blue)",
		"-moz-radial-gradient(45px 399grad, ellipse closest-corner, red, blue)",
		"-moz-radial-gradient(45px 399grad, farthest-side circle, red, blue)",

		"-moz-repeating-linear-gradient(red, blue)",
		"-moz-repeating-linear-gradient(red, yellow, blue)",
		"-moz-repeating-linear-gradient(red 1px, yellow 20%, blue 24em, green)",
		"-moz-repeating-linear-gradient(red, yellow, green, blue 50%)",
		"-moz-repeating-linear-gradient(red -50%, yellow -25%, green, blue)",
		"-moz-repeating-linear-gradient(red -99px, yellow, green, blue 120%)",
		"-moz-repeating-linear-gradient(#ffff00, #ef3, rgba(10, 20, 30, 0.4))",
		"-moz-repeating-linear-gradient(rgba(10, 20, 30, 0.4), #ffff00, #ef3)",

		"-moz-repeating-linear-gradient(to top, red, blue)",
		"-moz-repeating-linear-gradient(to bottom, red, blue)",
		"-moz-repeating-linear-gradient(to left, red, blue)",
		"-moz-repeating-linear-gradient(to right, red, blue)",
		"-moz-repeating-linear-gradient(to top left, red, blue)",
		"-moz-repeating-linear-gradient(to top right, red, blue)",
		"-moz-repeating-linear-gradient(to bottom left, red, blue)",
		"-moz-repeating-linear-gradient(to bottom right, red, blue)",
		"-moz-repeating-linear-gradient(to left top, red, blue)",
		"-moz-repeating-linear-gradient(to left bottom, red, blue)",
		"-moz-repeating-linear-gradient(to right top, red, blue)",
		"-moz-repeating-linear-gradient(to right bottom, red, blue)",

		"-moz-repeating-linear-gradient(top left, red, blue)",
		"-moz-repeating-linear-gradient(0 0, red, blue)",
		"-moz-repeating-linear-gradient(20% bottom, red, blue)",
		"-moz-repeating-linear-gradient(center 20%, red, blue)",
		"-moz-repeating-linear-gradient(left 35px, red, blue)",
		"-moz-repeating-linear-gradient(10% 10em, red, blue)",
		"-moz-repeating-linear-gradient(44px top, red, blue)",

		"-moz-repeating-linear-gradient(top left 45deg, red, blue)",
		"-moz-repeating-linear-gradient(20% bottom -300deg, red, blue)",
		"-moz-repeating-linear-gradient(center 20% 1.95929rad, red, blue)",
		"-moz-repeating-linear-gradient(left 35px 30grad, red, blue)",
		"-moz-repeating-linear-gradient(10% 10em 99999deg, red, blue)",
		"-moz-repeating-linear-gradient(44px top -33deg, red, blue)",

		"-moz-repeating-linear-gradient(-33deg, red, blue)",
		"-moz-repeating-linear-gradient(30grad left 35px, red, blue)",
		"-moz-repeating-linear-gradient(10deg 20px, red, blue)",
		"-moz-repeating-linear-gradient(.414rad bottom, red, blue)",

		"-moz-repeating-radial-gradient(red, blue)",
		"-moz-repeating-radial-gradient(red, yellow, blue)",
		"-moz-repeating-radial-gradient(red 1px, yellow 20%, blue 24em, green)",
		"-moz-repeating-radial-gradient(red, yellow, green, blue 50%)",
		"-moz-repeating-radial-gradient(red -50%, yellow -25%, green, blue)",
		"-moz-repeating-radial-gradient(red -99px, yellow, green, blue 120%)",
		"-moz-repeating-radial-gradient(#ffff00, #ef3, rgba(10, 20, 30, 0.4))",
		"-moz-repeating-radial-gradient(rgba(10, 20, 30, 0.4), #ffff00, #ef3)",

		"repeating-radial-gradient(at top left, red, blue)",
		"repeating-radial-gradient(at 0 0, red, blue)",
		"repeating-radial-gradient(at 20% bottom, red, blue)",
		"repeating-radial-gradient(at center 20%, red, blue)",
		"repeating-radial-gradient(at left 35px, red, blue)",
		"repeating-radial-gradient(at 10% 10em, red, blue)",
		"repeating-radial-gradient(at 44px top, red, blue)",

		"-moz-repeating-radial-gradient(farthest-corner, red, blue)",
		"-moz-repeating-radial-gradient(circle, red, blue)",
		"-moz-repeating-radial-gradient(ellipse closest-corner, red, blue)",

		"repeating-radial-gradient(farthest-corner at top left, red, blue)",
		"repeating-radial-gradient(closest-corner ellipse at 45px, red, blue)",
		"repeating-radial-gradient(farthest-side circle at 45px, red, blue)",
		"repeating-radial-gradient(ellipse closest-side at 50%, red, blue)",
		"repeating-radial-gradient(circle farthest-corner at 4em, red, blue)",

		"repeating-radial-gradient(30% 40% at top left, red, blue)",
		"repeating-radial-gradient(50px 60px at 15% 20%, red, blue)",
		"repeating-radial-gradient(7em 8em at 45px, red, blue)",

		"-moz-image-rect(url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==), 2, 10, 10, 2)",
		"-moz-image-rect(url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==), 10%, 50%, 30%, 0%)",
		"-moz-image-rect(url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==), 10, 50%, 30%, 0)",

		"-moz-radial-gradient(calc(25%) top, red, blue)",
		"-moz-radial-gradient(left calc(25%), red, blue)",
		"-moz-radial-gradient(calc(25px) top, red, blue)",
		"-moz-radial-gradient(left calc(25px), red, blue)",
		"-moz-radial-gradient(calc(-25%) top, red, blue)",
		"-moz-radial-gradient(left calc(-25%), red, blue)",
		"-moz-radial-gradient(calc(-25px) top, red, blue)",
		"-moz-radial-gradient(left calc(-25px), red, blue)",
		"-moz-radial-gradient(calc(100px + -25%) top, red, blue)",
		"-moz-radial-gradient(left calc(100px + -25%), red, blue)",
		"-moz-radial-gradient(calc(100px + -25px) top, red, blue)",
		"-moz-radial-gradient(left calc(100px + -25px), red, blue)",
		],
		invalid_values: [
			"-moz-element(#a:1)",
			"-moz-element(a#a)",
			"-moz-element(#a a)",
			"-moz-element(#a+a)",
			"-moz-element(#a()",
			/* no quirks mode colors */
			"linear-gradient(red, ff00ff)",
			/* no quirks mode colors */
			"-moz-radial-gradient(10% bottom, ffffff, black) scroll no-repeat",
			/* no quirks mode lengths */
			"-moz-linear-gradient(10 10px -45deg, red, blue) repeat",
			"-moz-linear-gradient(10px 10 -45deg, red, blue) repeat",
			"linear-gradient(red -99, yellow, green, blue 120%)",
			/* Old syntax */
			"-moz-linear-gradient(10px 10px, 20px, 30px 30px, 40px, from(blue), to(red))",
			"-moz-radial-gradient(20px 20px, 10px 10px, from(green), to(#ff00ff))",
			"-moz-radial-gradient(10px 10px, 20%, 40px 40px, 10px, from(green), to(#ff00ff))",
			"-moz-linear-gradient(10px, 20px, 30px, 40px, color-stop(0.5, #00ccff))",
			"-moz-linear-gradient(20px 20px, from(blue), to(red))",
			"-moz-linear-gradient(40px 40px, 10px 10px, from(blue) to(red) color-stop(10%, fuchsia))",
			"-moz-linear-gradient(20px 20px 30px, 10px 10px, from(red), to(#ff0000))",
			"-moz-radial-gradient(left top, center, 20px 20px, 10px, from(blue), to(red))",
			"-moz-linear-gradient(left left, top top, from(blue))",
			"-moz-linear-gradient(inherit, 10px 10px, from(blue))",
			/* New syntax */
			"-moz-linear-gradient(10px 10px, 20px, 30px 30px, 40px, blue 0, red 100%)",
			"-moz-radial-gradient(20px 20px, 10px 10px, from(green), to(#ff00ff))",
			"-moz-radial-gradient(10px 10px, 20%, 40px 40px, 10px, from(green), to(#ff00ff))",
			"-moz-linear-gradient(10px, 20px, 30px, 40px, #00ccff 50%)",
			"-moz-linear-gradient(40px 40px, 10px 10px, blue 0 fuchsia 10% red 100%)",
			"-moz-linear-gradient(20px 20px 30px, 10px 10px, red 0, #ff0000 100%)",
			"-moz-radial-gradient(left top, center, 20px 20px, 10px, from(blue), to(red))",
			"-moz-linear-gradient(left left, top top, blue 0)",
			"-moz-linear-gradient(inherit, 10px 10px, blue 0)",
			"-moz-linear-gradient(left left blue red)",
			"-moz-linear-gradient(left left blue, red)",
			"-moz-linear-gradient()",
			"-moz-linear-gradient(cover, red, blue)",
			"-moz-linear-gradient(auto, red, blue)",
			"-moz-linear-gradient(22 top, red, blue)",
			"-moz-linear-gradient(10% red blue)",
			"-moz-linear-gradient(10%, red blue)",
			"-moz-linear-gradient(10%,, red, blue)",
			"-moz-linear-gradient(45px, center, red, blue)",
			"-moz-linear-gradient(45px, center red, blue)",
			"-moz-radial-gradient(contain, ellipse, red, blue)",
			"-moz-radial-gradient(10deg contain, red, blue)",
			"-moz-radial-gradient(10deg, contain,, red, blue)",
			"-moz-radial-gradient(contain contain, red, blue)",
			"-moz-radial-gradient(ellipse circle, red, blue)",
			"-moz-radial-gradient(to top left, red, blue)",
			"-moz-radial-gradient(center, 10%, red, blue)",
			"-moz-radial-gradient(5rad, 20px, red, blue)",
			"-moz-radial-gradient(40%, -100px -10%, red, blue)",

			"-moz-radial-gradient(at top left to cover, red, blue)",
			"-moz-radial-gradient(at 15% 20% circle, red, blue)",

			"-moz-radial-gradient(to cover, red, blue)",
			"-moz-radial-gradient(to contain, red, blue)",
			"-moz-radial-gradient(to closest-side circle, red, blue)",
			"-moz-radial-gradient(to farthest-corner ellipse, red, blue)",

			"-moz-radial-gradient(ellipse at 45px closest-corner, red, blue)",
			"-moz-radial-gradient(circle at 45px farthest-side, red, blue)",
			"-moz-radial-gradient(ellipse 45px, closest-side, red, blue)",
			"-moz-radial-gradient(circle 45px, farthest-corner, red, blue)",
			"-moz-radial-gradient(ellipse, ellipse closest-side, red, blue)",
			"-moz-radial-gradient(circle, circle farthest-corner, red, blue)",

			"-moz-radial-gradient(99deg to farthest-corner, red, blue)",
			"-moz-radial-gradient(-1.2345rad circle, red, blue)",
			"-moz-radial-gradient(ellipse 399grad to closest-corner, red, blue)",
			"-moz-radial-gradient(circle 399grad to farthest-side, red, blue)",

			"-moz-radial-gradient(at top left 99deg, to farthest-corner, red, blue)",
			"-moz-radial-gradient(circle at 15% 20% -1.2345rad, red, blue)",
			"-moz-radial-gradient(to top left at 30% 40%, red, blue)",
			"-moz-radial-gradient(ellipse at 45px 399grad, to closest-corner, red, blue)",
			"-moz-radial-gradient(at 45px 399grad to farthest-side circle, red, blue)",

			"-moz-radial-gradient(to 50%, red, blue)",
			"-moz-radial-gradient(circle to 50%, red, blue)",
			"-moz-radial-gradient(circle to 43px 43px, red, blue)",
			"-moz-radial-gradient(circle to 50% 50%, red, blue)",
			"-moz-radial-gradient(circle to 43px 50%, red, blue)",
			"-moz-radial-gradient(circle to 50% 43px, red, blue)",
			"-moz-radial-gradient(ellipse to 43px, red, blue)",
			"-moz-radial-gradient(ellipse to 50%, red, blue)",

			"-moz-linear-gradient(to 0 0, red, blue)",
			"-moz-linear-gradient(to 20% bottom, red, blue)",
			"-moz-linear-gradient(to center 20%, red, blue)",
			"-moz-linear-gradient(to left 35px, red, blue)",
			"-moz-linear-gradient(to 10% 10em, red, blue)",
			"-moz-linear-gradient(to 44px top, red, blue)",
			"-moz-linear-gradient(to top left 45deg, red, blue)",
			"-moz-linear-gradient(to 20% bottom -300deg, red, blue)",
			"-moz-linear-gradient(to center 20% 1.95929rad, red, blue)",
			"-moz-linear-gradient(to left 35px 30grad, red, blue)",
			"-moz-linear-gradient(to 10% 10em 99999deg, red, blue)",
			"-moz-linear-gradient(to 44px top -33deg, red, blue)",
			"-moz-linear-gradient(to -33deg, red, blue)",
			"-moz-linear-gradient(to 30grad left 35px, red, blue)",
			"-moz-linear-gradient(to 10deg 20px, red, blue)",
			"-moz-linear-gradient(to .414rad bottom, red, blue)",

			"-moz-linear-gradient(to top top, red, blue)",
			"-moz-linear-gradient(to bottom bottom, red, blue)",
			"-moz-linear-gradient(to left left, red, blue)",
			"-moz-linear-gradient(to right right, red, blue)",

			"-moz-repeating-linear-gradient(10px 10px, 20px, 30px 30px, 40px, blue 0, red 100%)",
			"-moz-repeating-radial-gradient(20px 20px, 10px 10px, from(green), to(#ff00ff))",
			"-moz-repeating-radial-gradient(10px 10px, 20%, 40px 40px, 10px, from(green), to(#ff00ff))",
			"-moz-repeating-linear-gradient(10px, 20px, 30px, 40px, #00ccff 50%)",
			"-moz-repeating-linear-gradient(40px 40px, 10px 10px, blue 0 fuchsia 10% red 100%)",
			"-moz-repeating-linear-gradient(20px 20px 30px, 10px 10px, red 0, #ff0000 100%)",
			"-moz-repeating-radial-gradient(left top, center, 20px 20px, 10px, from(blue), to(red))",
			"-moz-repeating-linear-gradient(left left, top top, blue 0)",
			"-moz-repeating-linear-gradient(inherit, 10px 10px, blue 0)",
			"-moz-repeating-linear-gradient(left left blue red)",
			"-moz-repeating-linear-gradient()",

			"-moz-repeating-linear-gradient(to 0 0, red, blue)",
			"-moz-repeating-linear-gradient(to 20% bottom, red, blue)",
			"-moz-repeating-linear-gradient(to center 20%, red, blue)",
			"-moz-repeating-linear-gradient(to left 35px, red, blue)",
			"-moz-repeating-linear-gradient(to 10% 10em, red, blue)",
			"-moz-repeating-linear-gradient(to 44px top, red, blue)",
			"-moz-repeating-linear-gradient(to top left 45deg, red, blue)",
			"-moz-repeating-linear-gradient(to 20% bottom -300deg, red, blue)",
			"-moz-repeating-linear-gradient(to center 20% 1.95929rad, red, blue)",
			"-moz-repeating-linear-gradient(to left 35px 30grad, red, blue)",
			"-moz-repeating-linear-gradient(to 10% 10em 99999deg, red, blue)",
			"-moz-repeating-linear-gradient(to 44px top -33deg, red, blue)",
			"-moz-repeating-linear-gradient(to -33deg, red, blue)",
			"-moz-repeating-linear-gradient(to 30grad left 35px, red, blue)",
			"-moz-repeating-linear-gradient(to 10deg 20px, red, blue)",
			"-moz-repeating-linear-gradient(to .414rad bottom, red, blue)",

			"-moz-repeating-linear-gradient(to top top, red, blue)",
			"-moz-repeating-linear-gradient(to bottom bottom, red, blue)",
			"-moz-repeating-linear-gradient(to left left, red, blue)",
			"-moz-repeating-linear-gradient(to right right, red, blue)",

			"-moz-repeating-radial-gradient(to top left at 30% 40%, red, blue)",
			"-moz-repeating-radial-gradient(ellipse at 45px closest-corner, red, blue)",
			"-moz-repeating-radial-gradient(circle at 45px farthest-side, red, blue)",

			/* Valid only when prefixed */
			"linear-gradient(top left, red, blue)",
			"linear-gradient(0 0, red, blue)",
			"linear-gradient(20% bottom, red, blue)",
			"linear-gradient(center 20%, red, blue)",
			"linear-gradient(left 35px, red, blue)",
			"linear-gradient(10% 10em, red, blue)",
			"linear-gradient(44px top, red, blue)",

			"linear-gradient(top left 45deg, red, blue)",
			"linear-gradient(20% bottom -300deg, red, blue)",
			"linear-gradient(center 20% 1.95929rad, red, blue)",
			"linear-gradient(left 35px 30grad, red, blue)",
			"linear-gradient(left 35px 0.1turn, red, blue)",
			"linear-gradient(10% 10em 99999deg, red, blue)",
			"linear-gradient(44px top -33deg, red, blue)",

			"linear-gradient(30grad left 35px, red, blue)",
			"linear-gradient(10deg 20px, red, blue)",
			"linear-gradient(1turn 20px, red, blue)",
			"linear-gradient(.414rad bottom, red, blue)",

			"radial-gradient(top left 45deg, red, blue)",
			"radial-gradient(20% bottom -300deg, red, blue)",
			"radial-gradient(center 20% 1.95929rad, red, blue)",
			"radial-gradient(left 35px 30grad, red, blue)",
			"radial-gradient(10% 10em 99999deg, red, blue)",
			"radial-gradient(44px top -33deg, red, blue)",

			"radial-gradient(-33deg, red, blue)",
			"radial-gradient(30grad left 35px, red, blue)",
			"radial-gradient(10deg 20px, red, blue)",
			"radial-gradient(.414rad bottom, red, blue)",

			"radial-gradient(cover, red, blue)",
			"radial-gradient(ellipse contain, red, blue)",
			"radial-gradient(cover circle, red, blue)",

			"radial-gradient(top left, cover, red, blue)",
			"radial-gradient(15% 20%, circle, red, blue)",
			"radial-gradient(45px, ellipse closest-corner, red, blue)",
			"radial-gradient(45px, farthest-side circle, red, blue)",

			"radial-gradient(99deg, cover, red, blue)",
			"radial-gradient(-1.2345rad, circle, red, blue)",
			"radial-gradient(399grad, ellipse closest-corner, red, blue)",
			"radial-gradient(399grad, farthest-side circle, red, blue)",

			"radial-gradient(top left 99deg, cover, red, blue)",
			"radial-gradient(15% 20% -1.2345rad, circle, red, blue)",
			"radial-gradient(45px 399grad, ellipse closest-corner, red, blue)",
			"radial-gradient(45px 399grad, farthest-side circle, red, blue)",

			/* Valid only when unprefixed */
			"-moz-radial-gradient(at top left, red, blue)",
			"-moz-radial-gradient(at 20% bottom, red, blue)",
			"-moz-radial-gradient(at center 20%, red, blue)",
			"-moz-radial-gradient(at left 35px, red, blue)",
			"-moz-radial-gradient(at 10% 10em, red, blue)",
			"-moz-radial-gradient(at 44px top, red, blue)",
			"-moz-radial-gradient(at 0 0, red, blue)",

			"-moz-radial-gradient(circle 43px, red, blue)",
			"-moz-radial-gradient(ellipse 43px 43px, red, blue)",
			"-moz-radial-gradient(ellipse 50% 50%, red, blue)",
			"-moz-radial-gradient(ellipse 43px 50%, red, blue)",
			"-moz-radial-gradient(ellipse 50% 43px, red, blue)",

			"-moz-radial-gradient(farthest-corner at top left, red, blue)",
			"-moz-radial-gradient(ellipse closest-corner at 45px, red, blue)",
			"-moz-radial-gradient(circle farthest-side at 45px, red, blue)",
			"-moz-radial-gradient(closest-side ellipse at 50%, red, blue)",
			"-moz-radial-gradient(farthest-corner circle at 4em, red, blue)",

			"-moz-radial-gradient(30% 40% at top left, red, blue)",
			"-moz-radial-gradient(50px 60px at 15% 20%, red, blue)",
			"-moz-radial-gradient(7em 8em at 45px, red, blue)" ]
	},
	"background-origin": {
		domProp: "backgroundOrigin",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "padding-box" ],
		other_values: [ "border-box", "content-box", "border-box, padding-box", "padding-box, padding-box, padding-box", "border-box, border-box" ],
		invalid_values: [ "margin-box", "padding-box padding-box" ]
	},
	"background-position": {
		domProp: "backgroundPosition",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "top 0% left 0%", "top 0% left", "top left", "left top", "0% 0%", "0% top", "left 0%" ],
		other_values: [ "top", "left", "right", "bottom", "center", "center bottom", "bottom center", "center right", "right center", "center top", "top center", "center left", "left center", "right bottom", "bottom right", "50%", "top left, top left", "top left, top right", "top right, top left", "left top, 0% 0%", "10% 20%, 30%, 40%", "top left, bottom right", "right bottom, left top", "0%", "0px", "30px", "0%, 10%, 20%, 30%", "top, top, top, top, top",
			"calc(20px)",
			"calc(20px) 10px",
			"10px calc(20px)",
			"calc(20px) 25%",
			"25% calc(20px)",
			"calc(20px) calc(20px)",
			"calc(20px + 1em) calc(20px / 2)",
			"calc(20px + 50%) calc(50% - 10px)",
			"calc(-20px) calc(-50%)",
			"calc(-20%) calc(-50%)",
			"0px 0px",
			"right 20px top 60px",
			"right 20px bottom 60px",
			"left 20px top 60px",
			"left 20px bottom 60px",
			"right -50px top -50px",
			"left -50px bottom -50px",
			"right 20px top -50px",
			"right -20px top 50px",
			"right 3em bottom 10px",
			"bottom 3em right 10px",
			"top 3em right 10px",
			"left 15px",
			"10px top",
			"left top 15px",
			"left 10px top",
			"left 20%",
			"right 20%"
		],
		invalid_values: [ "center 10px center 4px", "center 10px center",
		                  "top 20%", "bottom 20%", "50% left", "top 50%",
		                  "50% bottom 10%", "right 10% 50%", "left right",
		                  "top bottom", "left 10% right",
		                  "top 20px bottom 20px", "left left", "20 20" ]
	},
	"background-repeat": {
		domProp: "backgroundRepeat",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "repeat", "repeat repeat" ],
		other_values: [ "repeat-x", "repeat-y", "no-repeat",
			"repeat-x, repeat-x",
			"repeat, no-repeat",
			"repeat-y, no-repeat, repeat-y",
			"repeat, repeat, repeat",
			"repeat no-repeat",
			"no-repeat repeat",
			"no-repeat no-repeat",
			"repeat repeat, repeat repeat",
		],
		invalid_values: [ "repeat repeat repeat",
		                  "repeat-x repeat-y",
		                  "repeat repeat-x",
		                  "repeat repeat-y",
		                  "repeat-x repeat",
		                  "repeat-y repeat" ]
	},
	"background-size": {
		domProp: "backgroundSize",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto", "auto auto" ],
		other_values: [ "contain", "cover", "100px auto", "auto 100px", "100% auto", "auto 100%", "25% 50px", "3em 40%",
			"calc(20px)",
			"calc(20px) 10px",
			"10px calc(20px)",
			"calc(20px) 25%",
			"25% calc(20px)",
			"calc(20px) calc(20px)",
			"calc(20px + 1em) calc(20px / 2)",
			"calc(20px + 50%) calc(50% - 10px)",
			"calc(-20px) calc(-50%)",
			"calc(-20%) calc(-50%)"
		],
		invalid_values: [ "contain contain", "cover cover", "cover auto", "auto cover", "contain cover", "cover contain", "-5px 3px", "3px -5px", "auto -5px", "-5px auto", "5 3" ]
	},
	"border": {
		domProp: "border",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "border-bottom-color", "border-bottom-style", "border-bottom-width", "border-left-color", "border-left-style", "border-left-width", "border-right-color", "border-right-style", "border-right-width", "border-top-color", "border-top-style", "border-top-width", "-moz-border-top-colors", "-moz-border-right-colors", "-moz-border-bottom-colors", "-moz-border-left-colors", "border-image-source", "border-image-slice", "border-image-width", "border-image-outset", "border-image-repeat" ],
		initial_values: [ "none", "medium", "currentColor", "thin", "none medium currentcolor", "calc(4px - 1px) none" ],
		other_values: [ "solid", "medium solid", "green solid", "10px solid", "thick solid", "calc(2px) solid blue" ],
		invalid_values: [ "5%", "medium solid ff00ff", "5 solid green" ]
	},
	"border-bottom": {
		domProp: "borderBottom",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "border-bottom-color", "border-bottom-style", "border-bottom-width" ],
		initial_values: [ "none", "medium", "currentColor", "thin", "none medium currentcolor" ],
		other_values: [ "solid", "green", "medium solid", "green solid", "10px solid", "thick solid", "5px green none" ],
		invalid_values: [ "5%", "5", "5 solid green" ]
	},
	"border-bottom-color": {
		domProp: "borderBottomColor",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "color": "black" },
		initial_values: [ "currentColor", "-moz-use-text-color" ],
		other_values: [ "green", "rgba(255,128,0,0.5)", "transparent" ],
		invalid_values: [ "#0", "#00", "#0000", "#00000", "#0000000", "#00000000", "#000000000" ],
		quirks_values: { "000000": "#000000", "96ed2a": "#96ed2a" },
	},
	"border-bottom-style": {
		domProp: "borderBottomStyle",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		/* XXX hidden is sometimes the same as initial */
		initial_values: [ "none" ],
		other_values: [ "solid", "dashed", "dotted", "double", "outset", "inset", "groove", "ridge" ],
		invalid_values: []
	},
	"border-bottom-width": {
		domProp: "borderBottomWidth",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "border-bottom-style": "solid" },
		initial_values: [ "medium", "3px", "calc(4px - 1px)" ],
		other_values: [ "thin", "thick", "1px", "2em",
			"calc(2px)",
			"calc(-2px)",
			"calc(0em)",
			"calc(0px)",
			"calc(5em)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 5em)",
		],
		invalid_values: [ "5%" ],
		quirks_values: { "5": "5px" },
	},
	"border-collapse": {
		domProp: "borderCollapse",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "separate" ],
		other_values: [ "collapse" ],
		invalid_values: []
	},
	"border-color": {
		domProp: "borderColor",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "border-top-color", "border-right-color", "border-bottom-color", "border-left-color" ],
		initial_values: [ "currentColor", "currentColor currentColor", "currentColor currentColor currentColor", "currentColor currentColor currentcolor CURRENTcolor" ],
		other_values: [ "green", "currentColor green", "currentColor currentColor green", "currentColor currentColor currentColor green", "rgba(255,128,0,0.5)", "transparent" ],
		invalid_values: [ "#0", "#00", "#0000", "#00000", "#0000000", "#00000000", "#000000000" ],
		quirks_values: { "000000": "#000000", "96ed2a": "#96ed2a" },
	},
	"border-left": {
		domProp: "borderLeft",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "border-left-color", "border-left-style", "border-left-width" ],
		initial_values: [ "none", "medium", "currentColor", "thin", "none medium currentcolor" ],
		other_values: [ "solid", "green", "medium solid", "green solid", "10px solid", "thick solid", "5px green none" ],
		invalid_values: [ "5%", "5", "5 solid green" ]
	},
	"border-left-color": {
		domProp: "borderLeftColor",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		prerequisites: { "color": "black" },
		initial_values: [ "currentColor", "-moz-use-text-color" ],
		other_values: [ "green", "rgba(255,128,0,0.5)", "transparent" ],
		invalid_values: [ "#0", "#00", "#0000", "#00000", "#0000000", "#00000000", "#000000000" ],
		quirks_values: { "000000": "#000000", "96ed2a": "#96ed2a" },
	},
	"border-left-style": {
		domProp: "borderLeftStyle",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		/* XXX hidden is sometimes the same as initial */
		initial_values: [ "none" ],
		other_values: [ "solid", "dashed", "dotted", "double", "outset", "inset", "groove", "ridge" ],
		invalid_values: []
	},
	"border-left-width": {
		domProp: "borderLeftWidth",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		prerequisites: { "border-left-style": "solid" },
		initial_values: [ "medium", "3px", "calc(4px - 1px)" ],
		other_values: [ "thin", "thick", "1px", "2em",
			"calc(2px)",
			"calc(-2px)",
			"calc(0em)",
			"calc(0px)",
			"calc(5em)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 5em)",
		],
		invalid_values: [ "5%" ],
		quirks_values: { "5": "5px" },
	},
	"border-right": {
		domProp: "borderRight",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "border-right-color", "border-right-style", "border-right-width" ],
		initial_values: [ "none", "medium", "currentColor", "thin", "none medium currentcolor" ],
		other_values: [ "solid", "green", "medium solid", "green solid", "10px solid", "thick solid", "5px green none" ],
		invalid_values: [ "5%", "5", "5 solid green" ]
	},
	"border-right-color": {
		domProp: "borderRightColor",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		prerequisites: { "color": "black" },
		initial_values: [ "currentColor", "-moz-use-text-color" ],
		other_values: [ "green", "rgba(255,128,0,0.5)", "transparent" ],
		invalid_values: [ "#0", "#00", "#0000", "#00000", "#0000000", "#00000000", "#000000000" ],
		quirks_values: { "000000": "#000000", "96ed2a": "#96ed2a" },
	},
	"border-right-style": {
		domProp: "borderRightStyle",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		/* XXX hidden is sometimes the same as initial */
		initial_values: [ "none" ],
		other_values: [ "solid", "dashed", "dotted", "double", "outset", "inset", "groove", "ridge" ],
		invalid_values: []
	},
	"border-right-width": {
		domProp: "borderRightWidth",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		prerequisites: { "border-right-style": "solid" },
		initial_values: [ "medium", "3px", "calc(4px - 1px)" ],
		other_values: [ "thin", "thick", "1px", "2em",
			"calc(2px)",
			"calc(-2px)",
			"calc(0em)",
			"calc(0px)",
			"calc(5em)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 5em)",
		],
		invalid_values: [ "5%" ],
		quirks_values: { "5": "5px" },
	},
	"border-spacing": {
		domProp: "borderSpacing",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "0", "0 0", "0px", "0 0px", "calc(0px)", "calc(0px) calc(0em)", "calc(2em - 2em) calc(3px + 7px - 10px)", "calc(-5px)", "calc(-5px) calc(-5px)" ],
		other_values: [ "3px", "4em 2px", "4em 0", "0px 2px", "calc(7px)", "0 calc(7px)", "calc(7px) 0", "calc(0px) calc(7px)", "calc(7px) calc(0px)", "7px calc(0px)", "calc(0px) 7px", "7px calc(0px)", "3px calc(2em)" ],
		invalid_values: [ "0%", "0 0%", "-5px", "-5px -5px", "0 -5px", "-5px 0" ]
	},
	"border-style": {
		domProp: "borderStyle",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "border-top-style", "border-right-style", "border-bottom-style", "border-left-style" ],
		/* XXX hidden is sometimes the same as initial */
		initial_values: [ "none", "none none", "none none none", "none none none none" ],
		other_values: [ "solid", "dashed", "dotted", "double", "outset", "inset", "groove", "ridge", "none solid", "none none solid", "none none none solid", "groove none none none", "none ridge none none", "none none double none", "none none none dotted" ],
		invalid_values: []
	},
	"border-top": {
		domProp: "borderTop",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "border-top-color", "border-top-style", "border-top-width" ],
		initial_values: [ "none", "medium", "currentColor", "thin", "none medium currentcolor" ],
		other_values: [ "solid", "green", "medium solid", "green solid", "10px solid", "thick solid", "5px green none" ],
		invalid_values: [ "5%", "5", "5 solid green" ]
	},
	"border-top-color": {
		domProp: "borderTopColor",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "color": "black" },
		initial_values: [ "currentColor", "-moz-use-text-color" ],
		other_values: [ "green", "rgba(255,128,0,0.5)", "transparent" ],
		invalid_values: [ "#0", "#00", "#0000", "#00000", "#0000000", "#00000000", "#000000000" ],
		quirks_values: { "000000": "#000000", "96ed2a": "#96ed2a" },
	},
	"border-top-style": {
		domProp: "borderTopStyle",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		/* XXX hidden is sometimes the same as initial */
		initial_values: [ "none" ],
		other_values: [ "solid", "dashed", "dotted", "double", "outset", "inset", "groove", "ridge" ],
		invalid_values: []
	},
	"border-top-width": {
		domProp: "borderTopWidth",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "border-top-style": "solid" },
		initial_values: [ "medium", "3px", "calc(4px - 1px)" ],
		other_values: [ "thin", "thick", "1px", "2em",
			"calc(2px)",
			"calc(-2px)",
			"calc(0em)",
			"calc(0px)",
			"calc(5em)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 5em)",
		],
		invalid_values: [ "5%" ],
		quirks_values: { "5": "5px" },
	},
	"border-width": {
		domProp: "borderWidth",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "border-top-width", "border-right-width", "border-bottom-width", "border-left-width" ],
		prerequisites: { "border-style": "solid" },
		initial_values: [ "medium", "3px", "medium medium", "3px medium medium", "medium 3px medium medium", "calc(3px) 3px calc(5px - 2px) calc(2px - -1px)" ],
		other_values: [ "thin", "thick", "1px", "2em", "2px 0 0px 1em", "calc(2em)" ],
		invalid_values: [ "5%" ],
		quirks_values: { "5": "5px" },
	},
	"bottom": {
		domProp: "bottom",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		/* FIXME: run tests with multiple prerequisites */
		prerequisites: { "position": "relative" },
		/* XXX 0 may or may not be equal to auto */
		initial_values: [ "auto" ],
		other_values: [ "32px", "-3em", "12%",
			"calc(2px)",
			"calc(-2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [],
		quirks_values: { "5": "5px" },
	},
	"box-shadow": {
		domProp: "boxShadow",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		prerequisites: { "color": "blue" },
		other_values: [ "2px 2px", "2px 2px 1px", "2px 2px 2px 2px", "blue 3px 2px", "2px 2px 1px 5px green", "2px 2px red", "green 2px 2px 1px", "green 2px 2px, blue 1px 3px 4px", "currentColor 3px 3px", "blue 2px 2px, currentColor 1px 2px, 1px 2px 3px 2px orange", "3px 0 0 0", "inset 2px 2px 3px 4px black", "2px -2px green inset, 4px 4px 3px blue, inset 2px 2px",
			/* calc() values */
			"2px 2px calc(-5px)", /* clamped */
			"calc(3em - 2px) 2px green",
			"green calc(3em - 2px) 2px",
			"2px calc(2px + 0.2em)",
			"blue 2px calc(2px + 0.2em)",
			"2px calc(2px + 0.2em) blue",
			"calc(-2px) calc(-2px)",
			"-2px -2px",
			"calc(2px) calc(2px)",
			"calc(2px) calc(2px) calc(2px)",
			"calc(2px) calc(2px) calc(2px) calc(2px)"
		],
		invalid_values: [ "3% 3%", "1px 1px 1px 1px 1px", "2px 2px, none", "red 2px 2px blue", "inherit, 2px 2px", "2px 2px, inherit", "2px 2px -5px", "inset 4px 4px black inset", "inset inherit", "inset none", "3 3", "3px 3", "3 3px", "3px 3px 3", "3px 3px 3px 3" ]
	},
	"caption-side": {
		domProp: "captionSide",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "top" ],
		other_values: [ "right", "left", "bottom", "top-outside", "bottom-outside" ],
		invalid_values: []
	},
	"clear": {
		domProp: "clear",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "left", "right", "both" ],
		invalid_values: []
	},
	"clip": {
		domProp: "clip",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "rect(0 0 0 0)", "rect(auto,auto,auto,auto)", "rect(3px, 4px, 4em, 0)", "rect(auto, 3em, 4pt, 2px)", "rect(2px 3px 4px 5px)" ],
		invalid_values: [ "rect(auto, 3em, 2%, 5px)" ],
		quirks_values: { "rect(1, 2, 3, 4)": "rect(1px, 2px, 3px, 4px)" },
	},
	"color": {
		domProp: "color",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		/* XXX should test currentColor, but may or may not be initial */
		initial_values: [ "black", "#000", "-moz-default-color" ],
		other_values: [ "green", "#f3c", "#fed292", "rgba(45,300,12,2)", "transparent", "-moz-nativehyperlinktext", "rgba(255,128,0,0.5)" ],
		invalid_values: [ "#f", "#ff", "#ffff", "#fffff", "#fffffff", "#ffffffff", "#fffffffff" ],
		quirks_values: { "000000": "#000000", "96ed2a": "#96ed2a", "fff": "#ffffff", "ffffff": "#ffffff", },
	},
	"content": {
		domProp: "content",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		/* XXX needs to be on pseudo-elements */
		initial_values: [ "normal", "none" ],
		other_values: [ '""', "''", '"hello"', "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==)", "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==')", 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==")', 'counter(foo)', 'counter(bar, upper-roman)', 'counters(foo, ".")', "counters(bar, '-', lower-greek)", "'-' counter(foo) '.'", "attr(title)", "open-quote", "close-quote", "no-open-quote", "no-close-quote", "close-quote attr(title) counters(foo, '.', upper-alpha)", "counter(foo, none)", "counters(bar, '.', none)", "attr(\\32)", "attr(\\2)", "attr(-\\2)", "attr(-\\32)", "counter(\\2)", "counters(\\32, '.')", "counter(-\\32, upper-roman)", "counters(-\\2, '-', lower-greek)", "counter(\\()", "counters(a\\+b, '.')", "counter(\\}, upper-alpha)", "-moz-alt-content" ],
		invalid_values: [ 'counters(foo)', 'counter(foo, ".")', 'attr("title")', "attr('title')", "attr(2)", "attr(-2)", "counter(2)", "counters(-2, '.')", "-moz-alt-content 'foo'", "'foo' -moz-alt-content" ]
	},
	"counter-increment": {
		domProp: "counterIncrement",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "foo 1", "bar", "foo 3 bar baz 2", "\\32  1", "-\\32  1", "-c 1", "\\32 1", "-\\32 1", "\\2  1", "-\\2  1", "-c 1", "\\2 1", "-\\2 1", "-\\7f \\9e 1" ],
		invalid_values: []
	},
	"counter-reset": {
		domProp: "counterReset",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "foo 1", "bar", "foo 3 bar baz 2", "\\32  1", "-\\32  1", "-c 1", "\\32 1", "-\\32 1", "\\2  1", "-\\2  1", "-c 1", "\\2 1", "-\\2 1", "-\\7f \\9e 1" ],
		invalid_values: []
	},
	"cursor": {
		domProp: "cursor",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "crosshair", "default", "pointer", "move", "e-resize", "ne-resize", "nw-resize", "n-resize", "se-resize", "sw-resize", "s-resize", "w-resize", "text", "wait", "help", "progress", "copy", "alias", "context-menu", "cell", "not-allowed", "col-resize", "row-resize", "no-drop", "vertical-text", "all-scroll", "nesw-resize", "nwse-resize", "ns-resize", "ew-resize", "none", "zoom-in", "zoom-out", "-moz-grab", "-moz-grabbing", "-moz-zoom-in", "-moz-zoom-out", "url(foo.png), move", "url(foo.png) 5 7, move", "url(foo.png) 12 3, url(bar.png), no-drop", "url(foo.png), url(bar.png) 7 2, wait", "url(foo.png) 3 2, url(bar.png) 7 9, pointer" ],
		invalid_values: [ "url(foo.png)", "url(foo.png) 5 5" ]
	},
	"direction": {
		domProp: "direction",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "ltr" ],
		other_values: [ "rtl" ],
		invalid_values: []
	},
	"display": {
		domProp: "display",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "inline" ],
		/* XXX none will really mess with other properties */
		prerequisites: { "float": "none", "position": "static" },
		other_values: [
			"block",
			"list-item",
			"inline-block",
			"table",
			"inline-table",
			"table-row-group",
			"table-header-group",
			"table-footer-group",
			"table-row",
			"table-column-group",
			"table-column",
			"table-cell",
			"table-caption",
			"none"
		],
		invalid_values: []
	},
	"empty-cells": {
		domProp: "emptyCells",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "show" ],
		other_values: [ "hide", "-moz-show-background" ],
		invalid_values: []
	},
	"float": {
		domProp: "cssFloat",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "left", "right" ],
		invalid_values: []
	},
	"font": {
		domProp: "font",
		inherited: true,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "font-style", "font-variant", "font-weight", "font-size", "line-height", "font-family", "font-stretch", "font-size-adjust", "-moz-font-feature-settings", "-moz-font-language-override" ],
		initial_values: [ (gInitialFontFamilyIsSansSerif ? "medium sans-serif" : "medium serif") ],
		other_values: [ "large serif", "9px fantasy", "bold italic small-caps 24px/1.4 Times New Roman, serif",
		  // system fonts
		  "caption", "icon", "menu", "message-box", "small-caption", "status-bar",
		  // Gecko-specific system fonts
		  "-moz-window", "-moz-document", "-moz-desktop", "-moz-info", "-moz-dialog", "-moz-button", "-moz-pull-down-menu", "-moz-list", "-moz-field", "-moz-workspace",
		],
		invalid_values: [ "9 fantasy", "-2px fantasy" ]
	},
	"font-family": {
		domProp: "fontFamily",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ (gInitialFontFamilyIsSansSerif ? "sans-serif" : "serif") ],
		other_values: [ (gInitialFontFamilyIsSansSerif ? "serif" : "sans-serif"), "Times New Roman, serif", "'Times New Roman', serif", "cursive", "fantasy", "\\\"Times New Roman", "\"Times New Roman\"", "Times, \\\"Times New Roman", "Times, \"Times New Roman\"", "-no-such-font-installed" ],
		invalid_values: [ "\"Times New\" Roman", "\"Times New Roman\n", "Times, \"Times New Roman\n" ]
	},
	"-moz-font-feature-settings": {
		domProp: "MozFontFeatureSettings",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "normal" ],
		other_values: [
			"'liga' on", "'liga'", "\"liga\" 1", "'liga', 'clig' 1",
			"\"liga\" off", "\"liga\" 0", '"cv01" 3, "cv02" 4',
			'"cswh", "smcp" off, "salt" 4', '"cswh" 1, "smcp" off, "salt" 4',
			'"cswh" 0, \'blah\', "liga", "smcp" off, "salt" 4',
			'"liga"        ,"smcp" 0         , "blah"'
		],
		invalid_values: [
			'liga', 'liga 1', 'liga normal', '"liga" normal', 'normal liga',
			'normal "liga"', 'normal, "liga"', '"liga=1"', "'foobar' on",
			'"blahblah" 0', '"liga" 3.14', '"liga" 1 3.14', '"liga" 1 normal',
			'"liga" 1 off', '"liga" on off', '"liga" , 0 "smcp"', '"liga" "smcp"'
		]
	},
	"-moz-font-language-override": {
		domProp: "MozFontLanguageOverride",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "normal" ],
		other_values: [ "'ENG'", "'TRK'", "\"TRK\"", "'N\\'Ko'" ],
		invalid_values: [ "TRK", "ja" ]
	},
	"font-size": {
		domProp: "fontSize",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "medium",
			"1rem",
			"calc(1rem)",
			"calc(0.75rem + 200% - 125% + 0.25rem - 75%)"
		],
		other_values: [ "large", "2em", "50%", "xx-small", "36pt", "8px", "larger", "smaller",
			"0px",
			"0%",
			"calc(2em)",
			"calc(36pt + 75% + (30% + 2em + 2px))",
			"calc(-2em)",
			"calc(-50%)",
			"calc(-1px)"
		],
		invalid_values: [ "-2em", "-50%", "-1px" ],
		quirks_values: { "5": "5px" },
	},
	"font-size-adjust": {
		domProp: "fontSizeAdjust",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "0.3", "0.5", "0.7" ],
		invalid_values: []
	},
	"font-stretch": {
		domProp: "fontStretch",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "normal" ],
		other_values: [ "ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded" ],
		invalid_values: [ "narrower", "wider" ]
	},
	"font-style": {
		domProp: "fontStyle",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "normal" ],
		other_values: [ "italic", "oblique" ],
		invalid_values: []
	},
	"font-variant": {
		domProp: "fontVariant",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "normal" ],
		other_values: [ "small-caps" ],
		invalid_values: [ "small-caps normal" ]
	},
	"font-weight": {
		domProp: "fontWeight",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "normal", "400" ],
		other_values: [ "bold", "100", "200", "300", "500", "600", "700", "800", "900", "bolder", "lighter" ],
		invalid_values: [ "0", "100.0", "107", "399", "401", "699", "710", "1000" ]
	},
	"height": {
		domProp: "height",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		/* FIXME: test zero, and test calc clamping */
		initial_values: [ " auto" ],
		/* computed value tests for height test more with display:block */
		prerequisites: { "display": "block" },
		other_values: [ "15px", "3em", "15%",
			"calc(2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [ "none", "-moz-max-content", "-moz-min-content", "-moz-fit-content", "-moz-available" ],
		quirks_values: { "5": "5px" },
	},
	"ime-mode": {
		domProp: "imeMode",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "normal", "disabled", "active", "inactive" ],
		invalid_values: [ "none", "enabled", "1px" ]
	},
	"left": {
		domProp: "left",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		/* FIXME: run tests with multiple prerequisites */
		prerequisites: { "position": "relative" },
		/* XXX 0 may or may not be equal to auto */
		initial_values: [ "auto" ],
		other_values: [ "32px", "-3em", "12%",
			"calc(2px)",
			"calc(-2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [],
		quirks_values: { "5": "5px" },
	},
	"letter-spacing": {
		domProp: "letterSpacing",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "normal" ],
		other_values: [ "0", "0px", "1em", "2px", "-3px",
			"calc(0px)", "calc(1em)", "calc(1em + 3px)",
			"calc(15px / 2)", "calc(15px/2)", "calc(-3px)"
		],
		invalid_values: [],
		quirks_values: { "5": "5px" },
	},
	"line-height": {
		domProp: "lineHeight",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		/*
		 * Inheritance tests require consistent font size, since
		 * getComputedStyle (which uses the CSS2 computed value, or
		 * CSS2.1 used value) doesn't match what the CSS2.1 computed
		 * value is.  And they even require consistent font metrics for
		 * computation of 'normal'.	 -moz-block-height requires height
		 * on a block.
		 */
		prerequisites: { "font-size": "19px", "font-size-adjust": "none", "font-family": "serif", "font-weight": "normal", "font-style": "normal", "height": "18px", "display": "block"},
		initial_values: [ "normal" ],
		other_values: [ "1.0", "1", "1em", "47px", "-moz-block-height" ],
		invalid_values: []
	},
	"list-style": {
		domProp: "listStyle",
		inherited: true,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "list-style-type", "list-style-position", "list-style-image" ],
		initial_values: [ "outside", "disc", "disc outside", "outside disc", "disc none", "none disc", "none disc outside", "none outside disc", "disc none outside", "disc outside none", "outside none disc", "outside disc none" ],
		other_values: [ "inside none", "none inside", "none none inside", "square", "none", "none none", "outside none none", "none outside none", "none none outside", "none outside", "outside none",
			'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==")',
			'none url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==")',
			'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==") none',
			'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==") outside',
			'outside url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==")',
			'outside none url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==")',
			'outside url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==") none',
			'none url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==") outside',
			'none outside url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==")',
			'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==") outside none',
			'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==") none outside'
		],
		invalid_values: [ "outside outside", "disc disc", "unknown value", "none none none", "none disc url(404.png)", "none url(404.png) disc", "disc none url(404.png)", "disc url(404.png) none", "url(404.png) none disc", "url(404.png) disc none", "none disc outside url(404.png)" ]
	},
	"list-style-image": {
		domProp: "listStyleImage",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAKElEQVR42u3NQQ0AAAgEoNP+nTWFDzcoQE1udQQCgUAgEAgEAsGTYAGjxAE/G/Q2tQAAAABJRU5ErkJggg==")',
			// Add some tests for interesting url() values here to test serialization, etc.
			"url(\'data:text/plain,\"\')",
			"url(\"data:text/plain,\'\")",
			"url(\'data:text/plain,\\\'\')",
			"url(\"data:text/plain,\\\"\")",
			"url(\'data:text/plain,\\\"\')",
			"url(\"data:text/plain,\\\'\")",
			"url(data:text/plain,\\\\)",
		],
		invalid_values: []
	},
	"list-style-position": {
		domProp: "listStylePosition",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "outside" ],
		other_values: [ "inside" ],
		invalid_values: []
	},
	"list-style-type": {
		domProp: "listStyleType",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "disc" ],
		other_values: [ "circle", "decimal-leading-zero", "upper-alpha" ],
		invalid_values: []
	},
	"margin": {
		domProp: "margin",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "margin-top", "margin-right", "margin-bottom", "margin-left" ],
		initial_values: [ "0", "0px 0 0em", "0% 0px 0em 0pt" ],
		other_values: [ "3px 0", "2em 4px 2pt", "1em 2em 3px 4px" ],
		invalid_values: [],
		quirks_values: { "5": "5px", "3px 6px 2 5px": "3px 6px 2px 5px" },
	},
	"margin-bottom": {
		domProp: "marginBottom",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		/* XXX testing auto has prerequisites */
		initial_values: [ "0", "0px", "0%", "calc(0pt)", "calc(0% + 0px)" ],
		other_values: [ "1px", "2em", "5%",
			"calc(2px)",
			"calc(-2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [ ],
		quirks_values: { "5": "5px" },
	},
	"margin-left": {
		domProp: "marginLeft",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		/* no subproperties */
		/* XXX testing auto has prerequisites */
		initial_values: [ "0", "0px", "0%", "calc(0pt)", "calc(0% + 0px)" ],
		other_values: [ "1px", "2em", "5%", ".5px", "+32px", "+.789px", "-.328px", "+0.56px", "-0.974px", "237px", "-289px", "-056px", "1987.45px", "-84.32px",
			"calc(2px)",
			"calc(-2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [ "..25px", ".+5px", ".px", "-.px", "++5px", "-+4px", "+-3px", "--7px", "+-.6px", "-+.5px", "++.7px", "--.4px" ],
		quirks_values: { "5": "5px" },
	},
	"margin-right": {
		domProp: "marginRight",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		/* no subproperties */
		/* XXX testing auto has prerequisites */
		initial_values: [ "0", "0px", "0%", "calc(0pt)", "calc(0% + 0px)" ],
		other_values: [ "1px", "2em", "5%",
			"calc(2px)",
			"calc(-2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [ ],
		quirks_values: { "5": "5px" },
	},
	"margin-top": {
		domProp: "marginTop",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		/* XXX testing auto has prerequisites */
		initial_values: [ "0", "0px", "0%", "calc(0pt)", "calc(0% + 0px)" ],
		other_values: [ "1px", "2em", "5%",
			"calc(2px)",
			"calc(-2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [ ],
		quirks_values: { "5": "5px" },
	},
	"marker-offset": {
		domProp: "markerOffset",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "6em", "-1px", "calc(0px)", "calc(3em + 2px - 4px)", "calc(-2em)" ],
		invalid_values: []
	},
	"marks": {
		/* XXX not a real property; applies only to page context */
		domProp: "marks",
		inherited: false,
		backend_only: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "crop", "cross", "crop cross", "cross crop" ],
		invalid_values: [ "none none", "crop none", "none crop", "cross none", "none cross" ]
	},
	"max-height": {
		domProp: "maxHeight",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "display": "block" },
		initial_values: [ "none" ],
		other_values: [ "30px", "50%", "0",
			"calc(2px)",
			"calc(-2px)",
			"calc(0px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [ "auto", "-moz-max-content", "-moz-min-content", "-moz-fit-content", "-moz-available", "5" ]
	},
	"max-width": {
		domProp: "maxWidth",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "display": "block" },
		initial_values: [ "none" ],
		other_values: [ "30px", "50%", "0", "-moz-max-content", "-moz-min-content", "-moz-fit-content", "-moz-available",
			"calc(2px)",
			"calc(-2px)",
			"calc(0px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [ "auto", "5" ]
	},
	"min-height": {
		domProp: "minHeight",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "display": "block" },
		initial_values: [ "0", "calc(0em)", "calc(-2px)", "calc(-1%)" ],
		other_values: [ "30px", "50%",
			"calc(2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [ "auto", "none", "-moz-max-content", "-moz-min-content", "-moz-fit-content", "-moz-available", "5" ]
	},
	"min-width": {
		domProp: "minWidth",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "display": "block" },
		initial_values: [ "0", "calc(0em)", "calc(-2px)", "calc(-1%)" ],
		other_values: [ "30px", "50%", "-moz-max-content", "-moz-min-content", "-moz-fit-content", "-moz-available",
			"calc(2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [ "auto", "none", "5" ]
	},
	"opacity": {
		domProp: "opacity",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "1", "17", "397.376" ],
		other_values: [ "0", "0.4", "0.0000", "-3" ],
		invalid_values: [ "0px", "1px" ]
	},
	"-moz-orient": {
		domProp: "MozOrient",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "horizontal", "vertical" ],
		invalid_values: [ "none" ]
	},
	"orphans": {
		domProp: "orphans",
		inherited: true,
		backend_only: true,
		type: CSS_TYPE_LONGHAND,
		// XXX requires display:block
		initial_values: [ "2" ],
		other_values: [ "1", "7" ],
		invalid_values: [ "0", "-1", "0px", "3px" ]
	},
	"outline": {
		domProp: "outline",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "outline-color", "outline-style", "outline-width" ],
		initial_values: [
			"none", "medium", "thin",
			// XXX Should be invert, but currently currentcolor.
			//"invert", "none medium invert"
			"currentColor", "none medium currentcolor"
		],
		other_values: [ "solid", "medium solid", "green solid", "10px solid", "thick solid" ],
		invalid_values: [ "5%", "5", "5 solid green" ]
	},
	"outline-color": {
		domProp: "outlineColor",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "color": "black" },
		initial_values: [ "currentColor", "-moz-use-text-color" ], // XXX should be invert
		other_values: [ "green", "rgba(255,128,0,0.5)", "transparent" ],
		invalid_values: [ "#0", "#00", "#0000", "#00000", "#0000000", "#00000000", "#000000000", "000000", "cc00ff" ]
	},
	"outline-offset": {
		domProp: "outlineOffset",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "0", "0px", "-0", "calc(0px)", "calc(3em + 2px - 2px - 3em)", "calc(-0em)" ],
		other_values: [ "-3px", "1em", "calc(3em)", "calc(7pt + 3 * 2em)", "calc(-3px)" ],
		invalid_values: [ "5%" ]
	},
	"outline-style": {
		domProp: "outlineStyle",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		// XXX Should 'hidden' be the same as initial?
		initial_values: [ "none" ],
		other_values: [ "solid", "dashed", "dotted", "double", "outset", "inset", "groove", "ridge" ],
		invalid_values: []
	},
	"outline-width": {
		domProp: "outlineWidth",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "outline-style": "solid" },
		initial_values: [ "medium", "3px", "calc(4px - 1px)" ],
		other_values: [ "thin", "thick", "1px", "2em",
			"calc(2px)",
			"calc(-2px)",
			"calc(0px)",
			"calc(0px)",
			"calc(5em)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 5em)",
		],
		invalid_values: [ "5%", "5" ]
	},
	"overflow": {
		domProp: "overflow",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		prerequisites: { "display": "block" },
		subproperties: [ "overflow-x", "overflow-y" ],
		initial_values: [ "visible" ],
		other_values: [ "auto", "scroll", "hidden", "-moz-hidden-unscrollable", "-moz-scrollbars-none" ],
		invalid_values: []
	},
	"overflow-x": {
		domProp: "overflowX",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "display": "block", "overflow-y": "visible" },
		initial_values: [ "visible" ],
		other_values: [ "auto", "scroll", "hidden", "-moz-hidden-unscrollable" ],
		invalid_values: []
	},
	"overflow-y": {
		domProp: "overflowY",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "display": "block", "overflow-x": "visible" },
		initial_values: [ "visible" ],
		other_values: [ "auto", "scroll", "hidden", "-moz-hidden-unscrollable" ],
		invalid_values: []
	},
	"padding": {
		domProp: "padding",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "padding-top", "padding-right", "padding-bottom", "padding-left" ],
		initial_values: [ "0", "0px 0 0em", "0% 0px 0em 0pt", "calc(0px) calc(0em) calc(-2px) calc(-1%)" ],
		other_values: [ "3px 0", "2em 4px 2pt", "1em 2em 3px 4px" ],
		invalid_values: [],
		quirks_values: { "5": "5px", "3px 6px 2 5px": "3px 6px 2px 5px" },
	},
	"padding-bottom": {
		domProp: "paddingBottom",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "0", "0px", "0%", "calc(0pt)", "calc(0% + 0px)", "calc(-3px)", "calc(-1%)" ],
		other_values: [ "1px", "2em", "5%",
			"calc(2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [ ],
		quirks_values: { "5": "5px" },
	},
	"padding-left": {
		domProp: "paddingLeft",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		/* no subproperties */
		initial_values: [ "0", "0px", "0%", "calc(0pt)", "calc(0% + 0px)", "calc(-3px)", "calc(-1%)" ],
		other_values: [ "1px", "2em", "5%",
			"calc(2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [ ],
		quirks_values: { "5": "5px" },
	},
	"padding-right": {
		domProp: "paddingRight",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		/* no subproperties */
		initial_values: [ "0", "0px", "0%", "calc(0pt)", "calc(0% + 0px)", "calc(-3px)", "calc(-1%)" ],
		other_values: [ "1px", "2em", "5%",
			"calc(2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [ ],
		quirks_values: { "5": "5px" },
	},
	"padding-top": {
		domProp: "paddingTop",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "0", "0px", "0%", "calc(0pt)", "calc(0% + 0px)", "calc(-3px)", "calc(-1%)" ],
		other_values: [ "1px", "2em", "5%",
			"calc(2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [ ],
		quirks_values: { "5": "5px" },
	},
	"page": {
		domProp: "page",
		inherited: true,
		backend_only: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "foo", "bar" ],
		invalid_values: [ "3px" ]
	},
	"page-break-after": {
		domProp: "pageBreakAfter",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "always", "avoid", "left", "right" ],
		invalid_values: []
	},
	"page-break-before": {
		domProp: "pageBreakBefore",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "always", "avoid", "left", "right" ],
		invalid_values: []
	},
	"page-break-inside": {
		domProp: "pageBreakInside",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "avoid" ],
		invalid_values: [ "left", "right" ]
	},
	"pointer-events": {
		domProp: "pointerEvents",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "visiblePainted", "visibleFill", "visibleStroke", "visible",
						"painted", "fill", "stroke", "all", "none" ],
		invalid_values: []
	},
	"position": {
		domProp: "position",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "static" ],
		other_values: [ "relative", "absolute", "fixed" ],
		invalid_values: []
	},
	"quotes": {
		domProp: "quotes",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ '"\u201C" "\u201D" "\u2018" "\u2019"',
						  '"\\201C" "\\201D" "\\2018" "\\2019"' ],
		other_values: [ "none", "'\"' '\"'" ],
		invalid_values: []
	},
	"right": {
		domProp: "right",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		/* FIXME: run tests with multiple prerequisites */
		prerequisites: { "position": "relative" },
		/* XXX 0 may or may not be equal to auto */
		initial_values: [ "auto" ],
		other_values: [ "32px", "-3em", "12%",
			"calc(2px)",
			"calc(-2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [],
		quirks_values: { "5": "5px" },
	},
	"size": {
		/* XXX not a real property; applies only to page context */
		domProp: "size",
		inherited: false,
		backend_only: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "landscape", "portrait", "8.5in 11in", "14in 11in", "297mm 210mm", "21cm 29.7cm", "100mm" ],
		invalid_values: [
			// XXX spec unclear on 0s and negatives
			"100mm 100mm 100mm"
		]
	},
	"table-layout": {
		domProp: "tableLayout",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "fixed" ],
		invalid_values: []
	},
	"text-align": {
		domProp: "textAlign",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		// don't know whether left and right are same as start
		initial_values: [ "start" ],
		other_values: [ "center", "justify", "end" ],
		invalid_values: []
	},
	"-moz-text-align-last": {
		domProp: "MozTextAlignLast",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "center", "justify", "start", "end", "left", "right" ],
		invalid_values: []
	},
	"-moz-text-blink": {
		domProp: "MozTextBlink",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "blink" ],
		invalid_values: [ "underline", "overline", "line-through", "none underline", "underline blink", "blink underline" ]
	},
	"text-decoration": {
		domProp: "textDecoration",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		subproperties: [ "-moz-text-blink", "-moz-text-decoration-color", "-moz-text-decoration-line", "-moz-text-decoration-style" ],
		initial_values: [ "none" ],
		other_values: [ "underline", "overline", "line-through", "blink", "blink line-through underline", "underline overline line-through blink", "-moz-anchor-decoration", "blink -moz-anchor-decoration" ],
		invalid_values: [ "none none", "underline none", "none underline", "blink none", "none blink", "line-through blink line-through", "underline overline line-through blink none", "underline overline line-throuh blink blink",
		                  "underline red solid", "underline #ff0000", "solid underline", "red underline", "#ff0000 underline" ]
	},
	"-moz-text-decoration-color": {
		domProp: "MozTextDecorationColor",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "color": "black" },
		initial_values: [ "currentColor", "-moz-use-text-color" ],
		other_values: [ "green", "rgba(255,128,0,0.5)", "transparent" ],
		invalid_values: [ "#0", "#00", "#0000", "#00000", "#0000000", "#00000000", "#000000000", "000000", "ff00ff" ]
	},
	"-moz-text-decoration-line": {
		domProp: "MozTextDecorationLine",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "underline", "overline", "line-through", "line-through underline", "underline overline line-through", "-moz-anchor-decoration", "-moz-anchor-decoration" ],
		invalid_values: [ "none none", "underline none", "none underline", "line-through blink line-through", "underline overline line-through blink none", "underline overline line-throuh blink blink" ]
	},
	"-moz-text-decoration-style": {
		domProp: "MozTextDecorationStyle",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "solid" ],
		other_values: [ "double", "dotted", "dashed", "wavy", "-moz-none" ],
		invalid_values: [ "none", "groove", "ridge", "inset", "outset", "solid dashed", "wave" ]
	},
	"text-indent": {
		domProp: "textIndent",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "0", "calc(3em - 5em + 2px + 2em - 2px)" ],
		other_values: [ "2em", "5%", "-10px",
			"calc(2px)",
			"calc(-2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [ "5" ]
	},
	"text-overflow": {
		domProp: "textOverflow",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "clip" ],
		other_values: [ "ellipsis", '""', "''", '"hello"', 'clip clip', 'ellipsis ellipsis', 'clip ellipsis', 'clip ""', '"hello" ""', '"" ellipsis' ],
		invalid_values: [ "none", "auto", '"hello" inherit', 'inherit "hello"', 'clip initial', 'initial clip', 'initial inherit', 'inherit initial', 'inherit none']
	},
	"text-shadow": {
		domProp: "textShadow",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "color": "blue" },
		initial_values: [ "none" ],
		other_values: [ "2px 2px", "2px 2px 1px", "2px 2px green", "2px 2px 1px green", "green 2px 2px", "green 2px 2px 1px", "green 2px 2px, blue 1px 3px 4px", "currentColor 3px 3px", "blue 2px 2px, currentColor 1px 2px",
			/* calc() values */
			"2px 2px calc(-5px)", /* clamped */
			"calc(3em - 2px) 2px green",
			"green calc(3em - 2px) 2px",
			"2px calc(2px + 0.2em)",
			"blue 2px calc(2px + 0.2em)",
			"2px calc(2px + 0.2em) blue",
			"calc(-2px) calc(-2px)",
			"-2px -2px",
			"calc(2px) calc(2px)",
			"calc(2px) calc(2px) calc(2px)",
		],
		invalid_values: [ "3% 3%", "2px 2px -5px", "2px 2px 2px 2px", "2px 2px, none", "none, 2px 2px", "inherit, 2px 2px", "2px 2px, inherit", "2 2px", "2px 2", "2px 2px 2", "2px 2px 2px 2",
			"calc(2px) calc(2px) calc(2px) calc(2px)"
		]
	},
	"text-transform": {
		domProp: "textTransform",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "capitalize", "uppercase", "lowercase", "full-width" ],
		invalid_values: []
	},
	"top": {
		domProp: "top",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		/* FIXME: run tests with multiple prerequisites */
		prerequisites: { "position": "relative" },
		/* XXX 0 may or may not be equal to auto */
		initial_values: [ "auto" ],
		other_values: [ "32px", "-3em", "12%",
			"calc(2px)",
			"calc(-2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [],
		quirks_values: { "5": "5px" },
	},
	"transition": {
		domProp: "transition",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "transition-property", "transition-duration", "transition-timing-function", "transition-delay" ],
		initial_values: [ "all 0s ease 0s", "all", "0s", "0s 0s", "ease" ],
		other_values: [ "width 1s linear 2s", "width 1s 2s linear", "width linear 1s 2s", "linear width 1s 2s", "linear 1s width 2s", "linear 1s 2s width", "1s width linear 2s", "1s width 2s linear", "1s 2s width linear", "1s linear width 2s", "1s linear 2s width", "1s 2s linear width", "width linear 1s", "width 1s linear", "linear width 1s", "linear 1s width", "1s width linear", "1s linear width", "1s 2s width", "1s width 2s", "width 1s 2s", "1s 2s linear", "1s linear 2s", "linear 1s 2s", "width 1s", "1s width", "linear 1s", "1s linear", "1s 2s", "2s 1s", "width", "linear", "1s", "height", "2s", "ease-in-out", "2s ease-in", "opacity linear", "ease-out 2s", "2s color, 1s width, 500ms height linear, 1s opacity 4s cubic-bezier(0.0, 0.1, 1.0, 1.0)", "1s \\32width linear 2s", "1s -width linear 2s", "1s -\\32width linear 2s", "1s \\32 0width linear 2s", "1s -\\32 0width linear 2s", "1s \\2width linear 2s", "1s -\\2width linear 2s", "2s, 1s width", "1s width, 2s", "2s all, 1s width", "1s width, 2s all", "2s all, 1s width", "2s width, 1s all" ],
		invalid_values: [ "1s width, 2s none", "2s none, 1s width", "2s inherit", "inherit 2s", "2s width, 1s inherit", "2s inherit, 1s width", "2s initial" ]
	},
	"transition-delay": {
		domProp: "transitionDelay",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "0s", "0ms" ],
		other_values: [ "1s", "250ms", "-100ms", "-1s", "1s, 250ms, 2.3s"],
		invalid_values: [ "0", "0px" ]
	},
	"transition-duration": {
		domProp: "transitionDuration",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "0s", "0ms" ],
		other_values: [ "1s", "250ms", "1s, 250ms, 2.3s"],
		invalid_values: [ "0", "0px", "-1ms", "-2s" ]
	},
	"transition-property": {
		domProp: "transitionProperty",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "all" ],
		other_values: [ "none", "left", "top", "color", "width, height, opacity", "foobar", "auto", "\\32width", "-width", "-\\32width", "\\32 0width", "-\\32 0width", "\\2width", "-\\2width", "all, all", "all, color", "color, all" ],
		invalid_values: [ "none, none", "color, none", "none, color", "inherit, color", "color, inherit", "initial, color", "color, initial", "none, color", "color, none" ]
	},
	"transition-timing-function": {
		domProp: "transitionTimingFunction",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "ease", "cubic-bezier(0.25, 0.1, 0.25, 1.0)" ],
		other_values: [ "linear", "ease-in", "ease-out", "ease-in-out", "linear, ease-in, cubic-bezier(0.1, 0.2, 0.8, 0.9)", "cubic-bezier(0.5, 0.5, 0.5, 0.5)", "cubic-bezier(0.25, 1.5, 0.75, -0.5)", "step-start", "step-end", "steps(1)", "steps(2, start)", "steps(386)", "steps(3, end)" ],
		invalid_values: [ "none", "auto", "cubic-bezier(0.25, 0.1, 0.25)", "cubic-bezier(0.25, 0.1, 0.25, 0.25, 1.0)", "cubic-bezier(-0.5, 0.5, 0.5, 0.5)", "cubic-bezier(1.5, 0.5, 0.5, 0.5)", "cubic-bezier(0.5, 0.5, -0.5, 0.5)", "cubic-bezier(0.5, 0.5, 1.5, 0.5)", "steps(2, step-end)", "steps(0)", "steps(-2)", "steps(0, step-end, 1)" ]
	},
	"unicode-bidi": {
		domProp: "unicodeBidi",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "normal" ],
		other_values: [ "embed", "bidi-override", "-moz-isolate", "-moz-plaintext", "-moz-isolate-override" ],
		invalid_values: [ "auto", "none" ]
	},
	"vertical-align": {
		domProp: "verticalAlign",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "baseline" ],
		other_values: [ "sub", "super", "top", "text-top", "middle", "bottom", "text-bottom", "-moz-middle-with-baseline", "15%", "3px", "0.2em", "-5px", "-3%",
			"calc(2px)",
			"calc(-2px)",
			"calc(50%)",
			"calc(3*25px)",
			"calc(25px*3)",
			"calc(3*25px + 50%)",
		],
		invalid_values: [ "5" ]
	},
	"visibility": {
		domProp: "visibility",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "visible" ],
		other_values: [ "hidden", "collapse" ],
		invalid_values: []
	},
	"white-space": {
		domProp: "whiteSpace",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "normal" ],
		other_values: [ "pre", "nowrap", "pre-wrap", "pre-line", "-moz-pre-discard-newlines" ],
		invalid_values: []
	},
	"widows": {
		domProp: "widows",
		inherited: true,
		backend_only: true,
		type: CSS_TYPE_LONGHAND,
		// XXX requires display:block
		initial_values: [ "2" ],
		other_values: [ "1", "7" ],
		invalid_values: [ "0", "-1", "0px", "3px" ]
	},
	"width": {
		domProp: "width",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		/* computed value tests for width test more with display:block */
		prerequisites: { "display": "block" },
		initial_values: [ " auto" ],
		/* XXX these have prerequisites */
		other_values: [ "15px", "3em", "15%", "-moz-max-content", "-moz-min-content", "-moz-fit-content", "-moz-available",
			/* valid -moz-calc() values */
			"-moz-calc(-2px)",
			"-moz-calc(2px)",
			"-moz-calc(50%)",
			"-moz-calc(50% + 2px)",
			"-moz-calc( 50% + 2px)",
			"-moz-calc(50% + 2px )",
			"-moz-calc( 50% + 2px )",
			"-moz-calc(50% - -2px)",
			"-moz-calc(2px - -50%)",
			"-moz-calc(3*25px)",
			"-moz-calc(3 *25px)",
			"-moz-calc(3 * 25px)",
			"-moz-calc(3* 25px)",
			"-moz-calc(25px*3)",
			"-moz-calc(25px *3)",
			"-moz-calc(25px* 3)",
			"-moz-calc(25px * 3)",
			"-moz-calc(3*25px + 50%)",
			"-moz-calc(50% - 3em + 2px)",
			"-moz-calc(50% - (3em + 2px))",
			"-moz-calc((50% - 3em) + 2px)",
			"-moz-calc(2em)",
			"-moz-calc(50%)",
			"-moz-calc(50px/2)",
			"-moz-calc(50px/(2 - 1))",
			/* valid calc() values */
			"calc(-2px)",
			"calc(2px)",
			"calc(50%)",
			"calc(50% + 2px)",
			"calc( 50% + 2px)",
			"calc(50% + 2px )",
			"calc( 50% + 2px )",
			"calc(50% - -2px)",
			"calc(2px - -50%)",
			"calc(3*25px)",
			"calc(3 *25px)",
			"calc(3 * 25px)",
			"calc(3* 25px)",
			"calc(25px*3)",
			"calc(25px *3)",
			"calc(25px* 3)",
			"calc(25px * 3)",
			"calc(3*25px + 50%)",
			"calc(50% - 3em + 2px)",
			"calc(50% - (3em + 2px))",
			"calc((50% - 3em) + 2px)",
			"calc(2em)",
			"calc(50%)",
			"calc(50px/2)",
			"calc(50px/(2 - 1))",
		],
		invalid_values: [ "none", "-2px",
			/* invalid -moz-calc() values */
			"-moz-calc(50%+ 2px)",
			"-moz-calc(50% +2px)",
			"-moz-calc(50%+2px)",
			/* invalid calc() values */
			"calc(50%+ 2px)",
			"calc(50% +2px)",
			"calc(50%+2px)",
			"-moz-min()",
			"calc(min())",
			"-moz-max()",
			"calc(max())",
			"-moz-min(5px)",
			"calc(min(5px))",
			"-moz-max(5px)",
			"calc(max(5px))",
			"-moz-min(5px,2em)",
			"calc(min(5px,2em))",
			"-moz-max(5px,2em)",
			"calc(max(5px,2em))",
			"calc(50px/(2 - 2))",
			/* If we ever support division by values, which is
			 * complicated for the reasons described in
			 * http://lists.w3.org/Archives/Public/www-style/2010Jan/0007.html
			 * , we should support all 4 of these as described in
			 * http://lists.w3.org/Archives/Public/www-style/2009Dec/0296.html
			 */
			"calc((3em / 100%) * 3em)",
			"calc(3em / 100% * 3em)",
			"calc(3em * (3em / 100%))",
			"calc(3em * 3em / 100%)",
		],
		quirks_values: { "5": "5px" },
	},
	"word-break": {
		domProp: "wordBreak",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "normal" ],
		other_values: [ "break-all", "keep-all" ],
		invalid_values: []
	},
	"word-spacing": {
		domProp: "wordSpacing",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "normal", "0", "0px", "-0em",
			"calc(-0px)", "calc(0em)"
		],
		other_values: [ "1em", "2px", "-3px",
			"calc(1em)", "calc(1em + 3px)",
			"calc(15px / 2)", "calc(15px/2)",
			"calc(-2em)"
		],
		invalid_values: [],
		quirks_values: { "5": "5px" },
	},
	"word-wrap": {
		domProp: "wordWrap",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "normal" ],
		other_values: [ "break-word" ],
		invalid_values: []
	},
	"-moz-hyphens": {
		domProp: "MozHyphens",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "manual" ],
		other_values: [ "none", "auto" ],
		invalid_values: []
	},
	"z-index": {
		domProp: "zIndex",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		/* XXX requires position */
		initial_values: [ "auto" ],
		other_values: [ "0", "3", "-7000", "12000" ],
		invalid_values: [ "3.0", "17.5" ]
	}
	,
	"clip-path": {
		domProp: "clipPath",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "url(#mypath)", "url('404.svg#mypath')" ],
		invalid_values: []
	},
	"clip-rule": {
		domProp: "clipRule",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "nonzero" ],
		other_values: [ "evenodd" ],
		invalid_values: []
	},
	"color-interpolation": {
		domProp: "colorInterpolation",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "sRGB" ],
		other_values: [ "auto", "linearRGB" ],
		invalid_values: []
	},
	"color-interpolation-filters": {
		domProp: "colorInterpolationFilters",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "linearRGB" ],
		other_values: [ "sRGB", "auto" ],
		invalid_values: []
	},
	"dominant-baseline": {
		domProp: "dominantBaseline",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "use-script", "no-change", "reset-size", "ideographic", "alphabetic", "hanging", "mathematical", "central", "middle", "text-after-edge", "text-before-edge" ],
		invalid_values: []
	},
	"fill": {
		domProp: "fill",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "color": "blue" },
		initial_values: [ "black", "#000", "#000000", "rgb(0,0,0)", "rgba(0,0,0,1)" ],
		other_values: [ "green", "#fc3", "url('#myserver')", "url(foo.svg#myserver)", 'url("#myserver") green', "none", "currentColor", "-moz-objectFill", "-moz-objectStroke" ],
		invalid_values: [ "000000", "ff00ff" ]
	},
	"fill-opacity": {
		domProp: "fillOpacity",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "1", "2.8", "1.000", "-moz-objectFillOpacity", "-moz-objectStrokeOpacity" ],
		other_values: [ "0", "0.3", "-7.3" ],
		invalid_values: []
	},
	"fill-rule": {
		domProp: "fillRule",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "nonzero" ],
		other_values: [ "evenodd" ],
		invalid_values: []
	},
	"filter": {
		domProp: "filter",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "url(#myfilt)" ],
		invalid_values: [ "url(#myfilt) none" ]
	},
	"flood-color": {
		domProp: "floodColor",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "color": "blue" },
		initial_values: [ "black", "#000", "#000000", "rgb(0,0,0)", "rgba(0,0,0,1)" ],
		other_values: [ "green", "#fc3", "currentColor" ],
		invalid_values: [ "url('#myserver')", "url(foo.svg#myserver)", 'url("#myserver") green', "000000", "ff00ff" ]
	},
	"flood-opacity": {
		domProp: "floodOpacity",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "1", "2.8", "1.000" ],
		other_values: [ "0", "0.3", "-7.3" ],
		invalid_values: []
	},
	"image-rendering": {
		domProp: "imageRendering",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "optimizeSpeed", "optimizeQuality", "-moz-crisp-edges" ],
		invalid_values: []
	},
	"lighting-color": {
		domProp: "lightingColor",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "color": "blue" },
		initial_values: [ "white", "#fff", "#ffffff", "rgb(255,255,255)", "rgba(255,255,255,1.0)", "rgba(255,255,255,42.0)" ],
		other_values: [ "green", "#fc3", "currentColor" ],
		invalid_values: [ "url('#myserver')", "url(foo.svg#myserver)", 'url("#myserver") green', "000000", "ff00ff" ]
	},
	"marker": {
		domProp: "marker",
		inherited: true,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [ "marker-start", "marker-mid", "marker-end" ],
		initial_values: [ "none" ],
		other_values: [ "url(#mysym)" ],
		invalid_values: [ "none none", "url(#mysym) url(#mysym)", "none url(#mysym)", "url(#mysym) none" ]
	},
	"marker-end": {
		domProp: "markerEnd",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "url(#mysym)" ],
		invalid_values: []
	},
	"marker-mid": {
		domProp: "markerMid",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "url(#mysym)" ],
		invalid_values: []
	},
	"marker-start": {
		domProp: "markerStart",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "url(#mysym)" ],
		invalid_values: []
	},
	"mask": {
		domProp: "mask",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "url(#mymask)" ],
		invalid_values: []
	},
	"shape-rendering": {
		domProp: "shapeRendering",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "optimizeSpeed", "crispEdges", "geometricPrecision" ],
		invalid_values: []
	},
	"stop-color": {
		domProp: "stopColor",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		prerequisites: { "color": "blue" },
		initial_values: [ "black", "#000", "#000000", "rgb(0,0,0)", "rgba(0,0,0,1)" ],
		other_values: [ "green", "#fc3", "currentColor" ],
		invalid_values: [ "url('#myserver')", "url(foo.svg#myserver)", 'url("#myserver") green', "000000", "ff00ff" ]
	},
	"stop-opacity": {
		domProp: "stopOpacity",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "1", "2.8", "1.000" ],
		other_values: [ "0", "0.3", "-7.3" ],
		invalid_values: []
	},
	"stroke": {
		domProp: "stroke",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "black", "#000", "#000000", "rgb(0,0,0)", "rgba(0,0,0,1)", "green", "#fc3", "url('#myserver')", "url(foo.svg#myserver)", 'url("#myserver") green', "currentColor", "-moz-objectFill", "-moz-objectStroke" ],
		invalid_values: [ "000000", "ff00ff" ]
	},
	"stroke-dasharray": {
		domProp: "strokeDasharray",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none", "-moz-objectValue" ],
		other_values: [ "5px,3px,2px", "5px 3px 2px", "  5px ,3px	, 2px ", "1px", "5%", "3em" ],
		invalid_values: [ "-5px,3px,2px", "5px,3px,-2px" ]
	},
	"stroke-dashoffset": {
		domProp: "strokeDashoffset",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "0", "-0px", "0em", "-moz-objectValue" ],
		other_values: [ "3px", "3%", "1em" ],
		invalid_values: []
	},
	"stroke-linecap": {
		domProp: "strokeLinecap",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "butt" ],
		other_values: [ "round", "square" ],
		invalid_values: []
	},
	"stroke-linejoin": {
		domProp: "strokeLinejoin",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "miter" ],
		other_values: [ "round", "bevel" ],
		invalid_values: []
	},
	"stroke-miterlimit": {
		domProp: "strokeMiterlimit",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "4" ],
		other_values: [ "1", "7", "5000", "1.1" ],
		invalid_values: [ "0.9", "0", "-1", "3px", "-0.3" ]
	},
	"stroke-opacity": {
		domProp: "strokeOpacity",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "1", "2.8", "1.000", "-moz-objectFillOpacity", "-moz-objectStrokeOpacity" ],
		other_values: [ "0", "0.3", "-7.3" ],
		invalid_values: []
	},
	"stroke-width": {
		domProp: "strokeWidth",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "1px", "-moz-objectValue" ],
		other_values: [ "0", "0px", "-0em", "17px", "0.2em" ],
		invalid_values: [ "-0.1px", "-3px" ]
	},
	"text-anchor": {
		domProp: "textAnchor",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "start" ],
		other_values: [ "middle", "end" ],
		invalid_values: []
	},
	"text-rendering": {
		domProp: "textRendering",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "auto" ],
		other_values: [ "optimizeSpeed", "optimizeLegibility", "geometricPrecision" ],
		invalid_values: []
	},
	"vector-effect": {
		domProp: "vectorEffect",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [ "non-scaling-stroke" ],
		invalid_values: []
	},

	// Aliases
	"-moz-transform": {
		domProp: "MozTransform",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		alias_for: "transform",
		subproperties: [ "transform" ],
		prerequisites: { "width": "300px", "height": "50px" },
		initial_values: [ "none" ],
		other_values: [ "translatex(1px)", "translatex(4em)",
			"translatex(-4px)", "translatex(3px)",
			"translatex(0px) translatex(1px) translatex(2px) translatex(3px) translatex(4px)",
			"translatey(4em)", "translate(3px)", "translate(10px, -3px)",
			"rotate(45deg)", "rotate(45grad)", "rotate(45rad)",
			"rotate(0.25turn)", "rotate(0)", "scalex(10)", "scaley(10)",
			"scale(10)", "scale(10, 20)", "skewx(30deg)", "skewx(0)",
			"skewy(0)", "skewx(30grad)", "skewx(30rad)", "skewx(0.08turn)",
			"skewy(30deg)", "skewy(30grad)", "skewy(30rad)", "skewy(0.08turn)",
			"rotate(45deg) scale(2, 1)", "skewx(45deg) skewx(-50grad)",
			"translate(0, 0) scale(1, 1) skewx(0) skewy(0) matrix(1, 0, 0, 1, 0, 0)",
			"translatex(50%)", "translatey(50%)", "translate(50%)",
			"translate(3%, 5px)", "translate(5px, 3%)",
			"matrix(1, 2, 3, 4, 5, 6)",
			/* valid calc() values */
			"translatex(calc(5px + 10%))",
			"translatey(calc(0.25 * 5px + 10% / 3))",
			"translate(calc(5px - 10% * 3))",
			"translate(calc(5px - 3 * 10%), 50px)",
			"translate(-50px, calc(5px - 10% * 3))",
			/* valid only when prefixed */
			"matrix(1, 2, 3, 4, 5px, 6%)",
			"matrix(1, 2, 3, 4, 5%, 6px)",
			"matrix(1, 2, 3, 4, 5%, 6%)",
			"matrix(1, 2, 3, 4, 5px, 6em)",
			"matrix(1, 0, 0, 1, calc(5px * 3), calc(10% - 3px))",
			"translatez(1px)", "translatez(4em)", "translatez(-4px)",
			"translatez(0px)", "translatez(2px) translatez(5px)",
			"translate3d(3px, 4px, 5px)", "translate3d(2em, 3px, 1em)",
			"translatex(2px) translate3d(4px, 5px, 6px) translatey(1px)",
			"scale3d(4, 4, 4)", "scale3d(-2, 3, -7)", "scalez(4)",
			"scalez(-6)", "rotate3d(2, 3, 4, 45deg)",
			"rotate3d(-3, 7, 0, 12rad)", "rotatex(15deg)", "rotatey(-12grad)",
			"rotatez(72rad)", "rotatex(0.125turn)", "perspective(1000px)",
			"matrix3d(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)",
			/* valid only when prefixed */
			"matrix3d(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13px, 14em, 15px, 16)",
			"matrix3d(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 20%, 10%, 15, 16)",
		],
		invalid_values: ["1px", "#0000ff", "red", "auto",
			"translatex(1)", "translatey(1)", "translate(2)",
			"translate(-3, -4)",
			"translatex(1px 1px)", "translatex(translatex(1px))",
			"translatex(#0000ff)", "translatex(red)", "translatey()",
			"matrix(1px, 2px, 3px, 4px, 5px, 6px)", "scale(150%)",
			"skewx(red)", "matrix(1%, 0, 0, 0, 0px, 0px)",
			"matrix(0, 1%, 2, 3, 4px,5px)", "matrix(0, 1, 2%, 3, 4px, 5px)",
			"matrix(0, 1, 2, 3%, 4%, 5%)",
			/* invalid calc() values */
			"translatey(-moz-min(5px,10%))",
			"translatex(-moz-max(5px,10%))",
			"translate(10px, calc(min(5px,10%)))",
			"translate(calc(max(5px,10%)), 10%)",
			"matrix(1, 0, 0, 1, max(5px * 3), calc(10% - 3px))",
			"perspective(0px)", "perspective(-10px)", "matrix3d(dinosaur)",
			"matrix3d(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17)",
			"matrix3d(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)",
			"matrix3d(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15%, 16)",
			"matrix3d(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16px)",
			"rotatey(words)", "rotatex(7)", "translate3d(3px, 4px, 1px, 7px)",
		],
	},
	"-moz-transform-origin": {
		domProp: "MozTransformOrigin",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		alias_for: "transform-origin",
		subproperties: [ "transform-origin" ],
		prerequisites: { "width": "10px", "height": "10px", "display": "block"},
		initial_values: [ "50% 50%", "center", "center center" ],
		other_values: [ "25% 25%", "6px 5px", "20% 3em", "0 0", "0in 1in",
						"top", "bottom","top left", "top right",
						"top center", "center left", "center right",
						"bottom left", "bottom right", "bottom center",
						"20% center", "6px center", "13in bottom",
						"left 50px", "right 13%", "center 40px",
			"calc(20px)",
			"calc(20px) 10px",
			"10px calc(20px)",
			"calc(20px) 25%",
			"25% calc(20px)",
			"calc(20px) calc(20px)",
			"calc(20px + 1em) calc(20px / 2)",
			"calc(20px + 50%) calc(50% - 10px)",
			"calc(-20px) calc(-50%)",
			"calc(-20%) calc(-50%)",
			"6px 5px 5px",
			"top center 10px"
		],
		invalid_values: ["red", "auto", "none", "0.5 0.5", "40px #0000ff",
						 "border", "center red", "right diagonal",
						 "#00ffff bottom"]
	},
	"-moz-perspective-origin": {
		domProp: "MozPerspectiveOrigin",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		alias_for: "perspective-origin",
		subproperties: [ "perspective-origin" ],
		prerequisites: { "width": "10px", "height": "10px", "display": "block"},
		initial_values: [ "50% 50%", "center", "center center" ],
		other_values: [ "25% 25%", "6px 5px", "20% 3em", "0 0", "0in 1in",
		                "top", "bottom","top left", "top right",
		                "top center", "center left", "center right",
		                "bottom left", "bottom right", "bottom center",
		                "20% center", "6px center", "13in bottom",
		                "left 50px", "right 13%", "center 40px",
		                "calc(20px)",
		                "calc(20px) 10px",
		                "10px calc(20px)",
		                "calc(20px) 25%",
		                "25% calc(20px)",
		                "calc(20px) calc(20px)",
		                "calc(20px + 1em) calc(20px / 2)",
		                "calc(20px + 50%) calc(50% - 10px)",
		                "calc(-20px) calc(-50%)",
		                "calc(-20%) calc(-50%)" ],
		invalid_values: [ "red", "auto", "none", "0.5 0.5", "40px #0000ff",
		                  "border", "center red", "right diagonal",
		                  "#00ffff bottom"]
	},
	"-moz-perspective": {
		domProp: "MozPerspective",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		alias_for: "perspective",
		subproperties: [ "perspective" ],
		initial_values: [ "none" ],
		other_values: [ "1000px", "500.2px" ],
		invalid_values: [ "pants", "200", "0", "-100px", "-27.2em" ]
	},
	"-moz-backface-visibility": {
		domProp: "MozBackfaceVisibility",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		alias_for: "backface-visibility",
		subproperties: [ "backface-visibility" ],
		initial_values: [ "visible" ],
		other_values: [ "hidden" ],
		invalid_values: [ "collapse" ]
	},
	"-moz-transform-style": {
		domProp: "MozTransformStyle",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		alias_for: "transform-style",
		subproperties: [ "transform-style" ],
		initial_values: [ "flat" ],
		other_values: [ "preserve-3d" ],
		invalid_values: []
	},
	"-moz-border-image": {
		domProp: "MozBorderImage",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		alias_for: "border-image",
		subproperties: [ "border-image-source", "border-image-slice", "border-image-width", "border-image-outset", "border-image-repeat" ],
		initial_values: [ "none" ],
		other_values: [ "url('border.png') 27 27 27 27",
						"url('border.png') 27",
						"stretch url('border.png')",
						"url('border.png') 27 fill",
						"url('border.png') 27 27 27 27 repeat",
						"repeat url('border.png') 27 27 27 27",
						"url('border.png') repeat 27 27 27 27",
						"url('border.png') fill 27 27 27 27 repeat",
						"url('border.png') 27 27 27 27 / 1em",
						"27 27 27 27 / 1em url('border.png') ",
						"url('border.png') 27 27 27 27 / 10 10 10 / 10 10 repeat",
						"repeat 27 27 27 27 / 10 10 10 / 10 10 url('border.png')",
						"url('border.png') 27 27 27 27 / / 10 10 1em",
						"fill 27 27 27 27 / / 10 10 1em url('border.png')",
						"url('border.png') 27 27 27 27 / 1em 1em 1em 1em repeat",
						"url('border.png') 27 27 27 27 / 1em 1em 1em 1em stretch round" ],
		invalid_values: [ "url('border.png') 27 27 27 27 27",
						  "url('border.png') 27 27 27 27 / 1em 1em 1em 1em 1em",
						  "url('border.png') 27 27 27 27 /",
						  "url('border.png') fill",
						  "url('border.png') fill repeat",
						  "fill repeat",
						  "url('border.png') fill / 1em",
						  "url('border.png') / repeat",
						  "url('border.png') 1 /",
						  "url('border.png') 1 / /",
						  "1 / url('border.png')",
						  "url('border.png') / 1",
						  "url('border.png') / / 1"]
	},
	"-moz-transition": {
		domProp: "MozTransition",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		alias_for: "transition",
		subproperties: [ "transition-property", "transition-duration", "transition-timing-function", "transition-delay" ],
		initial_values: [ "all 0s ease 0s", "all", "0s", "0s 0s", "ease" ],
		other_values: [ "width 1s linear 2s", "width 1s 2s linear", "width linear 1s 2s", "linear width 1s 2s", "linear 1s width 2s", "linear 1s 2s width", "1s width linear 2s", "1s width 2s linear", "1s 2s width linear", "1s linear width 2s", "1s linear 2s width", "1s 2s linear width", "width linear 1s", "width 1s linear", "linear width 1s", "linear 1s width", "1s width linear", "1s linear width", "1s 2s width", "1s width 2s", "width 1s 2s", "1s 2s linear", "1s linear 2s", "linear 1s 2s", "width 1s", "1s width", "linear 1s", "1s linear", "1s 2s", "2s 1s", "width", "linear", "1s", "height", "2s", "ease-in-out", "2s ease-in", "opacity linear", "ease-out 2s", "2s color, 1s width, 500ms height linear, 1s opacity 4s cubic-bezier(0.0, 0.1, 1.0, 1.0)", "1s \\32width linear 2s", "1s -width linear 2s", "1s -\\32width linear 2s", "1s \\32 0width linear 2s", "1s -\\32 0width linear 2s", "1s \\2width linear 2s", "1s -\\2width linear 2s", "2s, 1s width", "1s width, 2s", "2s all, 1s width", "1s width, 2s all", "2s all, 1s width", "2s width, 1s all" ],
		invalid_values: [ "1s width, 2s none", "2s none, 1s width", "2s inherit", "inherit 2s", "2s width, 1s inherit", "2s inherit, 1s width", "2s initial" ]
	},
	"-moz-transition-delay": {
		domProp: "MozTransitionDelay",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		alias_for: "transition-delay",
		subproperties: [ "transition-delay" ],
		initial_values: [ "0s", "0ms" ],
		other_values: [ "1s", "250ms", "-100ms", "-1s", "1s, 250ms, 2.3s"],
		invalid_values: [ "0", "0px" ]
	},
	"-moz-transition-duration": {
		domProp: "MozTransitionDuration",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		alias_for: "transition-duration",
		subproperties: [ "transition-duration" ],
		initial_values: [ "0s", "0ms" ],
		other_values: [ "1s", "250ms", "1s, 250ms, 2.3s"],
		invalid_values: [ "0", "0px", "-1ms", "-2s" ]
	},
	"-moz-transition-property": {
		domProp: "MozTransitionProperty",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		alias_for: "transition-property",
		subproperties: [ "transition-property" ],
		initial_values: [ "all" ],
		other_values: [ "none", "left", "top", "color", "width, height, opacity", "foobar", "auto", "\\32width", "-width", "-\\32width", "\\32 0width", "-\\32 0width", "\\2width", "-\\2width", "all, all", "all, color", "color, all" ],
		invalid_values: [ "none, none", "color, none", "none, color", "inherit, color", "color, inherit", "initial, color", "color, initial", "none, color", "color, none" ]
	},
	"-moz-transition-timing-function": {
		domProp: "MozTransitionTimingFunction",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		alias_for: "transition-timing-function",
		subproperties: [ "transition-timing-function" ],
		initial_values: [ "ease", "cubic-bezier(0.25, 0.1, 0.25, 1.0)" ],
		other_values: [ "linear", "ease-in", "ease-out", "ease-in-out", "linear, ease-in, cubic-bezier(0.1, 0.2, 0.8, 0.9)", "cubic-bezier(0.5, 0.5, 0.5, 0.5)", "cubic-bezier(0.25, 1.5, 0.75, -0.5)", "step-start", "step-end", "steps(1)", "steps(2, start)", "steps(386)", "steps(3, end)" ],
		invalid_values: [ "none", "auto", "cubic-bezier(0.25, 0.1, 0.25)", "cubic-bezier(0.25, 0.1, 0.25, 0.25, 1.0)", "cubic-bezier(-0.5, 0.5, 0.5, 0.5)", "cubic-bezier(1.5, 0.5, 0.5, 0.5)", "cubic-bezier(0.5, 0.5, -0.5, 0.5)", "cubic-bezier(0.5, 0.5, 1.5, 0.5)", "steps(2, step-end)", "steps(0)", "steps(-2)", "steps(0, step-end, 1)" ]
	},
	"-moz-animation": {
		domProp: "MozAnimation",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		alias_for: "animation",
		subproperties: [ "animation-name", "animation-duration", "animation-timing-function", "animation-delay", "animation-direction", "animation-fill-mode", "animation-iteration-count" ],
		initial_values: [ "none none 0s 0s ease normal 1.0", "none", "0s", "ease", "normal", "1.0" ],
		other_values: [ "bounce 1s linear 2s", "bounce 1s 2s linear", "bounce linear 1s 2s", "linear bounce 1s 2s", "linear 1s bounce 2s", "linear 1s 2s bounce", "1s bounce linear 2s", "1s bounce 2s linear", "1s 2s bounce linear", "1s linear bounce 2s", "1s linear 2s bounce", "1s 2s linear bounce", "bounce linear 1s", "bounce 1s linear", "linear bounce 1s", "linear 1s bounce", "1s bounce linear", "1s linear bounce", "1s 2s bounce", "1s bounce 2s", "bounce 1s 2s", "1s 2s linear", "1s linear 2s", "linear 1s 2s", "bounce 1s", "1s bounce", "linear 1s", "1s linear", "1s 2s", "2s 1s", "bounce", "linear", "1s", "height", "2s", "ease-in-out", "2s ease-in", "opacity linear", "ease-out 2s", "2s color, 1s bounce, 500ms height linear, 1s opacity 4s cubic-bezier(0.0, 0.1, 1.0, 1.0)", "1s \\32bounce linear 2s", "1s -bounce linear 2s", "1s -\\32bounce linear 2s", "1s \\32 0bounce linear 2s", "1s -\\32 0bounce linear 2s", "1s \\2bounce linear 2s", "1s -\\2bounce linear 2s", "2s, 1s bounce", "1s bounce, 2s", "2s all, 1s bounce", "1s bounce, 2s all", "1s bounce, 2s none", "2s none, 1s bounce", "2s bounce, 1s all", "2s all, 1s bounce" ],
		invalid_values: [  "2s inherit", "inherit 2s", "2s bounce, 1s inherit", "2s inherit, 1s bounce", "2s initial" ]
	},
	"-moz-animation-delay": {
		domProp: "MozAnimationDelay",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		alias_for: "animation-delay",
		subproperties: [ "animation-delay" ],
		initial_values: [ "0s", "0ms" ],
		other_values: [ "1s", "250ms", "-100ms", "-1s", "1s, 250ms, 2.3s"],
		invalid_values: [ "0", "0px" ]
	},
	"-moz-animation-direction": {
		domProp: "MozAnimationDirection",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		alias_for: "animation-direction",
		subproperties: [ "animation-direction" ],
		initial_values: [ "normal" ],
		other_values: [ "alternate", "normal, alternate", "alternate, normal", "normal, normal", "normal, normal, normal", "reverse", "alternate-reverse", "normal, reverse, alternate-reverse, alternate" ],
		invalid_values: [ "normal normal", "inherit, normal", "reverse-alternate" ]
	},
	"-moz-animation-duration": {
		domProp: "MozAnimationDuration",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		alias_for: "animation-duration",
		subproperties: [ "animation-duration" ],
		initial_values: [ "0s", "0ms" ],
		other_values: [ "1s", "250ms", "1s, 250ms, 2.3s"],
		invalid_values: [ "0", "0px", "-1ms", "-2s" ]
	},
	"-moz-animation-fill-mode": {
		domProp: "MozAnimationFillMode",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		alias_for: "animation-fill-mode",
		subproperties: [ "animation-fill-mode" ],
		initial_values: [ "none" ],
		other_values: [ "forwards", "backwards", "both", "none, none", "forwards, backwards", "forwards, none", "none, both" ],
		invalid_values: [ "all"]
	},
	"-moz-animation-iteration-count": {
		domProp: "MozAnimationIterationCount",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		alias_for: "animation-iteration-count",
		subproperties: [ "animation-iteration-count" ],
		initial_values: [ "1" ],
		other_values: [ "infinite", "0", "0.5", "7.75", "-0.0", "1, 2, 3", "infinite, 2", "1, infinite" ],
		// negatives forbidden per
		// http://lists.w3.org/Archives/Public/www-style/2011Mar/0355.html
		invalid_values: [ "none", "-1", "-0.5", "-1, infinite", "infinite, -3" ]
	},
	"-moz-animation-name": {
		domProp: "MozAnimationName",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		alias_for: "animation-name",
		subproperties: [ "animation-name" ],
		initial_values: [ "none" ],
		other_values: [ "all", "ball", "mall", "color", "bounce, bubble, opacity", "foobar", "auto", "\\32bounce", "-bounce", "-\\32bounce", "\\32 0bounce", "-\\32 0bounce", "\\2bounce", "-\\2bounce" ],
		invalid_values: [ "bounce, initial", "initial, bounce", "bounce, inherit", "inherit, bounce" ]
	},
	"-moz-animation-play-state": {
		domProp: "MozAnimationPlayState",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		alias_for: "animation-play-state",
		subproperties: [ "animation-play-state" ],
		initial_values: [ "running" ],
		other_values: [ "paused", "running, running", "paused, running", "paused, paused", "running, paused", "paused, running, running, running, paused, running" ],
		invalid_values: [ "0" ]
	},
	"-moz-animation-timing-function": {
		domProp: "MozAnimationTimingFunction",
		inherited: false,
		type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
		alias_for: "animation-timing-function",
		subproperties: [ "animation-timing-function" ],
		initial_values: [ "ease", "cubic-bezier(0.25, 0.1, 0.25, 1.0)" ],
		other_values: [ "linear", "ease-in", "ease-out", "ease-in-out", "linear, ease-in, cubic-bezier(0.1, 0.2, 0.8, 0.9)", "cubic-bezier(0.5, 0.5, 0.5, 0.5)", "cubic-bezier(0.25, 1.5, 0.75, -0.5)", "step-start", "step-end", "steps(1)", "steps(2, start)", "steps(386)", "steps(3, end)" ],
		invalid_values: [ "none", "auto", "cubic-bezier(0.25, 0.1, 0.25)", "cubic-bezier(0.25, 0.1, 0.25, 0.25, 1.0)", "cubic-bezier(-0.5, 0.5, 0.5, 0.5)", "cubic-bezier(1.5, 0.5, 0.5, 0.5)", "cubic-bezier(0.5, 0.5, -0.5, 0.5)", "cubic-bezier(0.5, 0.5, 1.5, 0.5)", "steps(2, step-end)", "steps(0)", "steps(-2)", "steps(0, step-end, 1)" ]
	}
}

function logical_box_prop_get_computed(cs, property)
{
	if (! /^-moz-/.test(property))
		throw "Unexpected property";
	property = property.substring(5);
	if (cs.getPropertyValue("direction") == "ltr")
		property = property.replace("-start", "-left").replace("-end", "-right");
	else
		property = property.replace("-start", "-right").replace("-end", "-left");
	return cs.getPropertyValue(property);
}

// Get the computed value for a property.  For shorthands, return the
// computed values of all the subproperties, delimited by " ; ".
function get_computed_value(cs, property)
{
	var info = gCSSProperties[property];
	if (info.type == CSS_TYPE_TRUE_SHORTHAND ||
	    (info.type == CSS_TYPE_SHORTHAND_AND_LONGHAND &&
	     property == "text-decoration")) {
		var results = [];
		for (var idx in info.subproperties) {
			var subprop = info.subproperties[idx];
			results.push(get_computed_value(cs, subprop));
		}
		return results.join(" ; ");
	}
	if (info.get_computed)
		return info.get_computed(cs, property);
	return cs.getPropertyValue(property);
}

// Automatically add pref-controlled CSS properties & keywords
// to gCSSProperties, if the flexbox pref is enabled.
if (SpecialPowers.getBoolPref("layout.css.flexbox.enabled")) {
	var flexProperties = {
	"align-content": {
		domProp: "alignContent",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "stretch" ],
		other_values: [
			"flex-start",
			"flex-end",
			"center",
			"space-between",
			"space-around"
		],
		invalid_values: [ "abc", "30px", "0", "auto" ]
	},
	"align-items": {
		domProp: "alignItems",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "stretch" ],
		other_values: [ "flex-start", "flex-end", "center", "baseline" ],
		invalid_values: [ "space-between", "abc", "30px" ]
	},
	"align-self": {
		domProp: "alignSelf",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		// (Assuming defaults on the parent, 'auto' will compute to 'stretch'.)
		initial_values: [ "auto", "stretch" ],
		other_values: [ "flex-start", "flex-end", "center", "baseline" ],
		invalid_values: [ "space-between", "abc", "30px" ]
	},
	"flex": {
		domProp: "flex",
		inherited: false,
		type: CSS_TYPE_TRUE_SHORTHAND,
		subproperties: [
			"flex-grow",
			"flex-shrink",
			"flex-basis"
		],
		initial_values: [ "0 1 auto", "auto 0 1", "0 auto", "auto 0" ],
		other_values: [
			"none",
			"1",
			"0",
			"0 1",
			"0.5",
			"1.2 3.4",
			"0 0 0",
			"0 0 0px",
			"0px 0 0",
			"5px 0 0",
			"2 auto",
			"auto 4",
			"auto 5.6 7.8",
			"-moz-max-content",
			"1 -moz-max-content",
			"1 2 -moz-max-content",
			"-moz-max-content 1",
			"-moz-max-content 1 2",
			"-0"
		],
		invalid_values: [
			"1 2px 3",
			"1 auto 3",
			"1px 2 3px",
			"1px 2 3 4px",
			"-1",
			"1 -1"
		]
	},
	"flex-basis": {
		domProp: "flexBasis",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ " auto" ],
        // NOTE: This is cribbed directly from the "width" chunk, since this
        // property takes the exact same values as width (albeit with
        // different semantics on 'auto').
        // XXXdholbert (Maybe these should get separated out into
        // a reusable array defined at the top of this file?)
		other_values: [ "15px", "3em", "15%", "-moz-max-content", "-moz-min-content", "-moz-fit-content", "-moz-available",
			// valid calc() values
			"calc(-2px)",
			"calc(2px)",
			"calc(50%)",
			"calc(50% + 2px)",
			"calc( 50% + 2px)",
			"calc(50% + 2px )",
			"calc( 50% + 2px )",
			"calc(50% - -2px)",
			"calc(2px - -50%)",
			"calc(3*25px)",
			"calc(3 *25px)",
			"calc(3 * 25px)",
			"calc(3* 25px)",
			"calc(25px*3)",
			"calc(25px *3)",
			"calc(25px* 3)",
			"calc(25px * 3)",
			"calc(3*25px + 50%)",
			"calc(50% - 3em + 2px)",
			"calc(50% - (3em + 2px))",
			"calc((50% - 3em) + 2px)",
			"calc(2em)",
			"calc(50%)",
			"calc(50px/2)",
			"calc(50px/(2 - 1))"
		],
		invalid_values: [ "none", "-2px",
			// invalid calc() values
			"calc(50%+ 2px)",
			"calc(50% +2px)",
			"calc(50%+2px)",
			"-moz-min()",
			"calc(min())",
			"-moz-max()",
			"calc(max())",
			"-moz-min(5px)",
			"calc(min(5px))",
			"-moz-max(5px)",
			"calc(max(5px))",
			"-moz-min(5px,2em)",
			"calc(min(5px,2em))",
			"-moz-max(5px,2em)",
			"calc(max(5px,2em))",
			"calc(50px/(2 - 2))",
			// If we ever support division by values, which is
			// complicated for the reasons described in
			// http://lists.w3.org/Archives/Public/www-style/2010Jan/0007.html
			// , we should support all 4 of these as described in
			// http://lists.w3.org/Archives/Public/www-style/2009Dec/0296.html
			"calc((3em / 100%) * 3em)",
			"calc(3em / 100% * 3em)",
			"calc(3em * (3em / 100%))",
			"calc(3em * 3em / 100%)"
		]
	},
	"flex-direction": {
		domProp: "flexDirection",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "row" ],
		other_values: [ "row-reverse", "column", "column-reverse" ],
		invalid_values: [ "10px", "30%", "justify", "column wrap" ]
	},
	"flex-grow": {
		domProp: "flexGrow",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "0" ],
		other_values: [ "3", "1", "1.0", "2.5", "123" ],
		invalid_values: [ "0px", "-5", "1%", "3em", "stretch", "auto" ]
	},
	"flex-shrink": {
		domProp: "flexShrink",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "1" ],
		other_values: [ "3", "0", "0.0", "2.5", "123" ],
		invalid_values: [ "0px", "-5", "1%", "3em", "stretch", "auto" ]
	},
	"flex-wrap": {
		domProp: "flexWrap",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "nowrap" ],
		other_values: [ "wrap", "wrap-reverse" ],
		invalid_values: [ "10px", "30%", "justify", "column wrap", "auto" ]
	},
	"order": {
		domProp: "order",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "0" ],
		other_values: [ "1", "99999", "-1", "-50" ],
		invalid_values: [ "0px", "1.0", "1.", "1%", "0.2", "3em", "stretch" ]
	},
	"justify-content": {
		domProp: "justifyContent",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "flex-start" ],
		other_values: [ "flex-end", "center", "space-between", "space-around" ],
		invalid_values: [ "baseline", "stretch", "30px", "5%" ]
	}
	};
	for (var prop in flexProperties) {
		gCSSProperties[prop] = flexProperties[prop];
	}
	gCSSProperties["display"].other_values.push("flex");
	gCSSProperties["display"].other_values.push("inline-flex");
}

if (SpecialPowers.getBoolPref("layout.css.vertical-text.enabled")) {
	var verticalTextProperties = {
		"writing-mode": {
			domProp: "writingMode",
			inherited: true,
			type: CSS_TYPE_LONGHAND,
			initial_values: [ "horizontal-tb" ],
			other_values: [ "vertical-lr", "vertical-rl" ],
			invalid_values: [ "10px", "30%", "justify", "auto", "1em" ]
		}
	};
	for (var prop in verticalTextProperties) {
		gCSSProperties[prop] = verticalTextProperties[prop];
	}
}

if (SpecialPowers.getBoolPref("layout.css.font-features.enabled")) {
	var fontFeatureProperties = {
		"font-kerning": {
			domProp: "fontKerning",
			inherited: true,
			type: CSS_TYPE_LONGHAND,
			initial_values: [ "auto" ],
			other_values: [ "normal", "none" ],
			invalid_values: [ "on" ]
		},
		"font-variant-alternates": {
			domProp: "fontVariantAlternates",
			inherited: true,
			type: CSS_TYPE_LONGHAND,
			initial_values: [ "normal" ],
			other_values: [ "historical-forms",
	                        "styleset(alt-a, alt-b)", "character-variant(a, b, c)", "annotation(circled)",
	                        "swash(squishy)", "styleset(complex\\ blob, a)", "annotation(\\62 lah)" ],
			invalid_values: [ "historical-forms normal", "historical-forms historical-forms",
	                          "swash", "swash(3)", "annotation(a, b)", "ornaments(a,b)",
	                          "styleset(1234blah)", "annotation(a), annotation(b)", "annotation(a) normal" ]
		},
	 	"font-variant-caps": {
			domProp: "fontVariantCaps",
			inherited: true,
			type: CSS_TYPE_LONGHAND,
			initial_values: [ "normal" ],
			other_values: [ "small-caps", "all-small-caps", "petite-caps", "all-petite-caps", "titling-caps", "unicase" ],
			invalid_values: [ "normal small-caps", "petite-caps normal", "unicase unicase" ]
		},
		"font-variant-east-asian": {
			domProp: "fontVariantEastAsian",
			inherited: true,
			type: CSS_TYPE_LONGHAND,
			initial_values: [ "normal" ],
			other_values: [ "jis78", "jis83", "jis90", "jis04", "simplified", "traditional", "full-width", "proportional-width", "ruby",
			                "jis78 full-width", "jis78 full-width ruby", "simplified proportional-width", "ruby simplified" ],
			invalid_values: [ "jis78 normal", "jis90 jis04", "simplified traditional", "full-width proportional-width",
	                          "ruby simplified ruby", "jis78 ruby simplified" ]
		},
		"font-variant-ligatures": {
			domProp: "fontVariantLigatures",
			inherited: true,
			type: CSS_TYPE_LONGHAND,
			initial_values: [ "normal" ],
			other_values: [ "common-ligatures", "no-common-ligatures", "discretionary-ligatures", "no-discretionary-ligatures",
			                "historical-ligatures", "no-historical-ligatures", "contextual", "no-contextual",
			                "common-ligatures no-discretionary-ligatures", "contextual no-discretionary-ligatures",
			                "historical-ligatures no-common-ligatures", "no-historical-ligatures discretionary-ligatures",
			                "common-ligatures no-discretionary-ligatures historical-ligatures no-contextual" ],
			invalid_values: [ "common-ligatures normal", "common-ligatures no-common-ligatures", "common-ligatures common-ligatures",
			                  "no-historical-ligatures historical-ligatures", "no-discretionary-ligatures discretionary-ligatures",
			                  "no-contextual contextual", "common-ligatures no-discretionary-ligatures no-common-ligatures" ]
		},
		"font-variant-numeric": {
			domProp: "fontVariantNumeric",
			inherited: true,
			type: CSS_TYPE_LONGHAND,
			initial_values: [ "normal" ],
			other_values: [ "lining-nums", "oldstyle-nums", "proportional-nums", "tabular-nums", "diagonal-fractions",
			                "stacked-fractions", "slashed-zero", "ordinal", "lining-nums diagonal-fractions",
			                "tabular-nums stacked-fractions", "tabular-nums slashed-zero stacked-fractions",
			                "proportional-nums slashed-zero diagonal-fractions oldstyle-nums ordinal" ],
			invalid_values: [ "lining-nums normal", "lining-nums oldstyle-nums", "lining-nums normal slashed-zero ordinal",
			                  "proportional-nums tabular-nums", "diagonal-fractions stacked-fractions", "slashed-zero diagonal-fractions slashed-zero",
			                  "lining-nums slashed-zero diagonal-fractions oldstyle-nums", "diagonal-fractions diagonal-fractions" ]
		},
		"font-variant-position": {
			domProp: "fontVariantPosition",
			inherited: true,
			type: CSS_TYPE_LONGHAND,
			initial_values: [ "normal" ],
			other_values: [ "super", "sub" ],
			invalid_values: [ "normal sub", "super sub" ]
		},
		"font-synthesis": {
			domProp: "fontSynthesis",
			inherited: true,
			type: CSS_TYPE_LONGHAND,
			initial_values: [ "weight style" ],
			other_values: [ "none", "weight", "style" ],
			invalid_values: [ "weight none", "style none", "none style", "weight 10px", "weight weight", "style style" ]
		},
		// aliases for prefixed properties
		"font-feature-settings": {
			domProp: "fontFeatureSettings",
			inherited: true,
			type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
			alias_for: "-moz-font-feature-settings",
			subproperties: [ "-moz-font-feature-settings" ],
			initial_values: [ "normal" ],
			other_values: [
				"'liga' on", "'liga'", "\"liga\" 1", "'liga', 'clig' 1",
				"\"liga\" off", "\"liga\" 0", '"cv01" 3, "cv02" 4',
				'"cswh", "smcp" off, "salt" 4', '"cswh" 1, "smcp" off, "salt" 4',
				'"cswh" 0, \'blah\', "liga", "smcp" off, "salt" 4',
				'"liga"        ,"smcp" 0         , "blah"'
			],
			invalid_values: [
				'liga', 'liga 1', 'liga normal', '"liga" normal', 'normal liga',
				'normal "liga"', 'normal, "liga"', '"liga=1"', "'foobar' on",
				'"blahblah" 0', '"liga" 3.14', '"liga" 1 3.14', '"liga" 1 normal',
				'"liga" 1 off', '"liga" on off', '"liga" , 0 "smcp"', '"liga" "smcp"'
			]
		},
		"font-language-override": {
			domProp: "fontLanguageOverride",
			inherited: true,
			type: CSS_TYPE_SHORTHAND_AND_LONGHAND,
			alias_for: "-moz-font-language-override",
			subproperties: [ "-moz-font-language-override" ],
			initial_values: [ "normal" ],
			other_values: [ "'ENG'", "'TRK'", "\"TRK\"", "'N\\'Ko'" ],
			invalid_values: [ "TRK", "ja" ]
		}
	};
	for (var prop in fontFeatureProperties) {
		gCSSProperties[prop] = fontFeatureProperties[prop];
	}
	var fontAdditions = [ "font-kerning", "font-synthesis", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position" ];
	gCSSProperties["font"].subproperties = gCSSProperties["font"].subproperties.concat(fontAdditions);
}

if (SpecialPowers.getBoolPref("layout.css.masking.enabled")) {
	gCSSProperties["mask-type"] = {
		domProp: "maskType",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "luminance" ],
		other_values: [ "alpha" ],
		invalid_values: []
	};
}

if (SpecialPowers.getBoolPref("svg.paint-order.enabled")) {
  gCSSProperties["paint-order"] = {
    domProp: "paintOrder",
    inherited: true,
    type: CSS_TYPE_LONGHAND,
    initial_values: [ "normal" ],
    other_values: [ "fill", "fill stroke", "fill stroke markers", "stroke markers fill" ],
    invalid_values: [ "fill stroke markers fill", "fill normal" ]
  };
}

if (SpecialPowers.getBoolPref("layout.css.filters.enabled")) {
  	gCSSProperties["filter"] = {
		domProp: "filter",
		inherited: false,
		type: CSS_TYPE_LONGHAND,
		initial_values: [ "none" ],
		other_values: [
			// SVG reference filters
			"url(#my-filter)",
			"url(#my-filter-1) url(#my-filter-2)",

			// Filter functions
			"opacity(50%) saturate(1.0)",
			"invert(50%) sepia(0.1) brightness(90%)",

			// Mixed SVG reference filters and filter functions
			"grayscale(1) url(#my-filter-1)",
			"url(#my-filter-1) brightness(50%) contrast(0.9)",

			"blur(0)",
			"blur(0px)",
			"blur(0.5px)",
			"blur(3px)",
			"blur(100px)",
			"blur(0.1em)",
			"blur(calc(-1px))", // Parses and becomes blur(0px).
			"blur(calc(0px))",
			"blur(calc(5px))",
			"blur(calc(2 * 5px))",

			"brightness(0)",
			"brightness(50%)",
			"brightness(1)",
			"brightness(1.0)",
			"brightness(2)",
			"brightness(350%)",
			"brightness(4.567)",

			"contrast(0)",
			"contrast(50%)",
			"contrast(1)",
			"contrast(1.0)",
			"contrast(2)",
			"contrast(350%)",
			"contrast(4.567)",

			"drop-shadow(2px 2px)",
			"drop-shadow(2px 2px 1px)",
			"drop-shadow(2px 2px green))",
			"drop-shadow(2px 2px 1px green)",
			"drop-shadow(green 2px 2px)",
			"drop-shadow(green 2px 2px 1px)",
			"drop-shadow(currentColor 3px 3px)",
			"drop-shadow(2px 2px calc(-5px))", /* clamped */
			"drop-shadow(calc(3em - 2px) 2px green)",
			"drop-shadow(green calc(3em - 2px) 2px)",
			"drop-shadow(2px calc(2px + 0.2em))",
			"drop-shadow(blue 2px calc(2px + 0.2em))",
			"drop-shadow(2px calc(2px + 0.2em) blue)",
			"drop-shadow(calc(-2px) calc(-2px))",
			"drop-shadow(-2px -2px)",
			"drop-shadow(calc(2px) calc(2px))",
			"drop-shadow(calc(2px) calc(2px) calc(2px))",

			"grayscale(0)",
			"grayscale(50%)",
			"grayscale(1)",
			"grayscale(1.0)",
			"grayscale(2)",
			"grayscale(350%)",
			"grayscale(4.567)",

			"hue-rotate(0deg)",
			"hue-rotate(90deg)",
			"hue-rotate(540deg)",
			"hue-rotate(-90deg)",
			"hue-rotate(10grad)",
			"hue-rotate(1.6rad)",
			"hue-rotate(-1.6rad)",
			"hue-rotate(0.5turn)",
			"hue-rotate(-2turn)",

			"invert(0)",
			"invert(50%)",
			"invert(1)",
			"invert(1.0)",
			"invert(2)",
			"invert(350%)",
			"invert(4.567)",

			"opacity(0)",
			"opacity(50%)",
			"opacity(1)",
			"opacity(1.0)",
			"opacity(2)",
			"opacity(350%)",
			"opacity(4.567)",

			"saturate(0)",
			"saturate(50%)",
			"saturate(1)",
			"saturate(1.0)",
			"saturate(2)",
			"saturate(350%)",
			"saturate(4.567)",

			"sepia(0)",
			"sepia(50%)",
			"sepia(1)",
			"sepia(1.0)",
			"sepia(2)",
			"sepia(350%)",
			"sepia(4.567)",
		],
		invalid_values: [
			// none
			"none none",
			"url(#my-filter) none",
			"none url(#my-filter)",
			"blur(2px) none url(#my-filter)",

			// Nested filters
			"grayscale(invert(1.0))",

			// Comma delimited filters
			"url(#my-filter),",
			"invert(50%), url(#my-filter), brightness(90%)",

			// Test the following situations for each filter function:
			// - Invalid number of arguments
			// - Comma delimited arguments
			// - Wrong argument type
			// - Argument value out of range
			"blur()",
			"blur(3px 5px)",
			"blur(3px,)",
			"blur(3px, 5px)",
			"blur(#my-filter)",
			"blur(0.5)",
			"blur(50%)",
			"blur(calc(0))", // Unitless zero in calc is not a valid length.
			"blur(calc(0.1))",
			"blur(calc(10%))",
			"blur(calc(20px - 5%))",
			"blur(-3px)",

			"brightness()",
			"brightness(0.5 0.5)",
			"brightness(0.5,)",
			"brightness(0.5, 0.5)",
			"brightness(#my-filter)",
			"brightness(10px)",
			"brightness(-1)",

			"contrast()",
			"contrast(0.5 0.5)",
			"contrast(0.5,)",
			"contrast(0.5, 0.5)",
			"contrast(#my-filter)",
			"contrast(10px)",
			"contrast(-1)",

			"drop-shadow()",
			"drop-shadow(3% 3%)",
			"drop-shadow(2px 2px -5px)",
			"drop-shadow(2px 2px 2px 2px)",
			"drop-shadow(2px 2px, none)",
			"drop-shadow(none, 2px 2px)",
			"drop-shadow(inherit, 2px 2px)",
			"drop-shadow(2px 2px, inherit)",
			"drop-shadow(2 2px)",
			"drop-shadow(2px 2)",
			"drop-shadow(2px 2px 2)",
			"drop-shadow(2px 2px 2px 2)",
			"drop-shadow(calc(2px) calc(2px) calc(2px) calc(2px))",
			"drop-shadow(green 2px 2px, blue 1px 3px 4px)",
			"drop-shadow(blue 2px 2px, currentColor 1px 2px)",

			"grayscale()",
			"grayscale(0.5 0.5)",
			"grayscale(0.5,)",
			"grayscale(0.5, 0.5)",
			"grayscale(#my-filter)",
			"grayscale(10px)",
			"grayscale(-1)",

			"hue-rotate()",
			"hue-rotate(0)",
			"hue-rotate(0.5 0.5)",
			"hue-rotate(0.5,)",
			"hue-rotate(0.5, 0.5)",
			"hue-rotate(#my-filter)",
			"hue-rotate(10px)",
			"hue-rotate(-1)",
			"hue-rotate(45deg,)",

			"invert()",
			"invert(0.5 0.5)",
			"invert(0.5,)",
			"invert(0.5, 0.5)",
			"invert(#my-filter)",
			"invert(10px)",
			"invert(-1)",

			"opacity()",
			"opacity(0.5 0.5)",
			"opacity(0.5,)",
			"opacity(0.5, 0.5)",
			"opacity(#my-filter)",
			"opacity(10px)",
			"opacity(-1)",

			"saturate()",
			"saturate(0.5 0.5)",
			"saturate(0.5,)",
			"saturate(0.5, 0.5)",
			"saturate(#my-filter)",
			"saturate(10px)",
			"saturate(-1)",

			"sepia()",
			"sepia(0.5 0.5)",
			"sepia(0.5,)",
			"sepia(0.5, 0.5)",
			"sepia(#my-filter)",
			"sepia(10px)",
			"sepia(-1)",
		]
	};
}

if (SpecialPowers.getBoolPref("layout.css.image-orientation.enabled")) {
	gCSSProperties["image-orientation"] = {
		domProp: "imageOrientation",
		inherited: true,
		type: CSS_TYPE_LONGHAND,
		initial_values: [
			"0deg",
			"0grad",
			"0rad",
			"0turn",

			// Rounded initial values.
			"-90deg",
			"15deg",
			"360deg",
		],
		other_values: [
			"0deg flip",
			"90deg",
			"90deg flip",
			"180deg",
			"180deg flip",
			"270deg",
			"270deg flip",
			"flip",
			"from-image",

			// Grad units.
			"0grad flip",
			"100grad",
			"100grad flip",
			"200grad",
			"200grad flip",
			"300grad",
			"300grad flip",

			// Radian units.
			"0rad flip",
			"1.57079633rad",
			"1.57079633rad flip",
			"3.14159265rad",
			"3.14159265rad flip",
			"4.71238898rad",
			"4.71238898rad flip",

			// Turn units.
			"0turn flip",
			"0.25turn",
			"0.25turn flip",
			"0.5turn",
			"0.5turn flip",
			"0.75turn",
			"0.75turn flip",

			// Rounded values.
			"-45deg flip",
			"65deg flip",
			"400deg flip",
		],
		invalid_values: [
			"none",
			"0deg none",
			"flip 0deg",
			"flip 0deg",
			"0",
			"0 flip",
			"flip 0",
			"0deg from-image",
			"from-image 0deg",
			"flip from-image",
			"from-image flip",
		]
	};
}
