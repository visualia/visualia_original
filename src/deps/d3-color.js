function t(t,n,e){t.prototype=n.prototype=e,e.constructor=t}function n(t,n){var e=Object.create(t.prototype);for(var i in n)e[i]=n[i];return e}function e(){}var i="\\s*([+-]?\\d+)\\s*",r="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",a="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",s=/^#([0-9a-f]{3,8})$/,h=new RegExp("^rgb\\("+[i,i,i]+"\\)$"),o=new RegExp("^rgb\\("+[a,a,a]+"\\)$"),l=new RegExp("^rgba\\("+[i,i,i,r]+"\\)$"),u=new RegExp("^rgba\\("+[a,a,a,r]+"\\)$"),c=new RegExp("^hsl\\("+[r,a,a]+"\\)$"),g=new RegExp("^hsla\\("+[r,a,a,r]+"\\)$"),f={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function p(){return this.rgb().formatHex()}function d(){return this.rgb().formatRgb()}function b(t){var n,e;return t=(t+"").trim().toLowerCase(),(n=s.exec(t))?(e=n[1].length,n=parseInt(n[1],16),6===e?w(n):3===e?new k(n>>8&15|n>>4&240,n>>4&15|240&n,(15&n)<<4|15&n,1):8===e?y(n>>24&255,n>>16&255,n>>8&255,(255&n)/255):4===e?y(n>>12&15|n>>8&240,n>>8&15|n>>4&240,n>>4&15|240&n,((15&n)<<4|15&n)/255):null):(n=h.exec(t))?new k(n[1],n[2],n[3],1):(n=o.exec(t))?new k(255*n[1]/100,255*n[2]/100,255*n[3]/100,1):(n=l.exec(t))?y(n[1],n[2],n[3],n[4]):(n=u.exec(t))?y(255*n[1]/100,255*n[2]/100,255*n[3]/100,n[4]):(n=c.exec(t))?q(n[1],n[2]/100,n[3]/100,1):(n=g.exec(t))?q(n[1],n[2]/100,n[3]/100,n[4]):f.hasOwnProperty(t)?w(f[t]):"transparent"===t?new k(NaN,NaN,NaN,0):null}function w(t){return new k(t>>16&255,t>>8&255,255&t,1)}function y(t,n,e,i){return i<=0&&(t=n=e=NaN),new k(t,n,e,i)}function m(t){return t instanceof e||(t=b(t)),t?new k((t=t.rgb()).r,t.g,t.b,t.opacity):new k}function N(t,n,e,i){return 1===arguments.length?m(t):new k(t,n,e,null==i?1:i)}function k(t,n,e,i){this.r=+t,this.g=+n,this.b=+e,this.opacity=+i}function M(){return"#"+x(this.r)+x(this.g)+x(this.b)}function v(){var t=this.opacity;return(1===(t=isNaN(t)?1:Math.max(0,Math.min(1,t)))?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===t?")":", "+t+")")}function x(t){return((t=Math.max(0,Math.min(255,Math.round(t)||0)))<16?"0":"")+t.toString(16)}function q(t,n,e,i){return i<=0?t=n=e=NaN:e<=0||e>=1?t=n=NaN:n<=0&&(t=NaN),new $(t,n,e,i)}function R(t){if(t instanceof $)return new $(t.h,t.s,t.l,t.opacity);if(t instanceof e||(t=b(t)),!t)return new $;if(t instanceof $)return t;var n=(t=t.rgb()).r/255,i=t.g/255,r=t.b/255,a=Math.min(n,i,r),s=Math.max(n,i,r),h=NaN,o=s-a,l=(s+a)/2;return o?(h=n===s?(i-r)/o+6*(i<r):i===s?(r-n)/o+2:(n-i)/o+4,o/=l<.5?s+a:2-s-a,h*=60):o=l>0&&l<1?0:h,new $(h,o,l,t.opacity)}function E(t,n,e,i){return 1===arguments.length?R(t):new $(t,n,e,null==i?1:i)}function $(t,n,e,i){this.h=+t,this.s=+n,this.l=+e,this.opacity=+i}function H(t,n,e){return 255*(t<60?n+(e-n)*t/60:t<180?e:t<240?n+(e-n)*(240-t)/60:n)}t(e,b,{copy:function(t){return Object.assign(new this.constructor,this,t)},displayable:function(){return this.rgb().displayable()},hex:p,formatHex:p,formatHsl:function(){return R(this).formatHsl()},formatRgb:d,toString:d}),t(k,N,n(e,{brighter:function(t){return t=null==t?1/.7:Math.pow(1/.7,t),new k(this.r*t,this.g*t,this.b*t,this.opacity)},darker:function(t){return t=null==t?.7:Math.pow(.7,t),new k(this.r*t,this.g*t,this.b*t,this.opacity)},rgb:function(){return this},displayable:function(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:M,formatHex:M,formatRgb:v,toString:v})),t($,E,n(e,{brighter:function(t){return t=null==t?1/.7:Math.pow(1/.7,t),new $(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?.7:Math.pow(.7,t),new $(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=this.h%360+360*(this.h<0),n=isNaN(t)||isNaN(this.s)?0:this.s,e=this.l,i=e+(e<.5?e:1-e)*n,r=2*e-i;return new k(H(t>=240?t-240:t+120,r,i),H(t,r,i),H(t<120?t+240:t-120,r,i),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl:function(){var t=this.opacity;return(1===(t=isNaN(t)?1:Math.max(0,Math.min(1,t)))?"hsl(":"hsla(")+(this.h||0)+", "+100*(this.s||0)+"%, "+100*(this.l||0)+"%"+(1===t?")":", "+t+")")}}));var j=Math.PI/180,I=180/Math.PI,O=6/29,P=3*O*O;function S(t){if(t instanceof L)return new L(t.l,t.a,t.b,t.opacity);if(t instanceof Q)return T(t);t instanceof k||(t=m(t));var n,e,i=F(t.r),r=F(t.g),a=F(t.b),s=A((.2225045*i+.7168786*r+.0606169*a)/1);return i===r&&r===a?n=e=s:(n=A((.4360747*i+.3850649*r+.1430804*a)/.96422),e=A((.0139322*i+.0971045*r+.7141733*a)/.82521)),new L(116*s-16,500*(n-s),200*(s-e),t.opacity)}function z(t,n){return new L(t,0,0,null==n?1:n)}function C(t,n,e,i){return 1===arguments.length?S(t):new L(t,n,e,null==i?1:i)}function L(t,n,e,i){this.l=+t,this.a=+n,this.b=+e,this.opacity=+i}function A(t){return t>.008856451679035631?Math.pow(t,1/3):t/P+4/29}function B(t){return t>O?t*t*t:P*(t-4/29)}function D(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function F(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function G(t){if(t instanceof Q)return new Q(t.h,t.c,t.l,t.opacity);if(t instanceof L||(t=S(t)),0===t.a&&0===t.b)return new Q(NaN,0<t.l&&t.l<100?0:NaN,t.l,t.opacity);var n=Math.atan2(t.b,t.a)*I;return new Q(n<0?n+360:n,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}function J(t,n,e,i){return 1===arguments.length?G(t):new Q(e,n,t,null==i?1:i)}function K(t,n,e,i){return 1===arguments.length?G(t):new Q(t,n,e,null==i?1:i)}function Q(t,n,e,i){this.h=+t,this.c=+n,this.l=+e,this.opacity=+i}function T(t){if(isNaN(t.h))return new L(t.l,0,0,t.opacity);var n=t.h*j;return new L(t.l,Math.cos(n)*t.c,Math.sin(n)*t.c,t.opacity)}t(L,C,n(e,{brighter:function(t){return new L(this.l+18*(null==t?1:t),this.a,this.b,this.opacity)},darker:function(t){return new L(this.l-18*(null==t?1:t),this.a,this.b,this.opacity)},rgb:function(){var t=(this.l+16)/116,n=isNaN(this.a)?t:t+this.a/500,e=isNaN(this.b)?t:t-this.b/200;return new k(D(3.1338561*(n=.96422*B(n))-1.6168667*(t=1*B(t))-.4906146*(e=.82521*B(e))),D(-.9787684*n+1.9161415*t+.033454*e),D(.0719453*n-.2289914*t+1.4052427*e),this.opacity)}})),t(Q,K,n(e,{brighter:function(t){return new Q(this.h,this.c,this.l+18*(null==t?1:t),this.opacity)},darker:function(t){return new Q(this.h,this.c,this.l-18*(null==t?1:t),this.opacity)},rgb:function(){return T(this).rgb()}}));var U=-.14861,V=1.78277,W=-.29227,X=-.90649,Y=1.97294,Z=Y*X,_=Y*V,tt=V*W-X*U;function nt(t){if(t instanceof it)return new it(t.h,t.s,t.l,t.opacity);t instanceof k||(t=m(t));var n=t.r/255,e=t.g/255,i=t.b/255,r=(tt*i+Z*n-_*e)/(tt+Z-_),a=i-r,s=(Y*(e-r)-W*a)/X,h=Math.sqrt(s*s+a*a)/(Y*r*(1-r)),o=h?Math.atan2(s,a)*I-120:NaN;return new it(o<0?o+360:o,h,r,t.opacity)}function et(t,n,e,i){return 1===arguments.length?nt(t):new it(t,n,e,null==i?1:i)}function it(t,n,e,i){this.h=+t,this.s=+n,this.l=+e,this.opacity=+i}t(it,et,n(e,{brighter:function(t){return t=null==t?1/.7:Math.pow(1/.7,t),new it(this.h,this.s,this.l*t,this.opacity)},darker:function(t){return t=null==t?.7:Math.pow(.7,t),new it(this.h,this.s,this.l*t,this.opacity)},rgb:function(){var t=isNaN(this.h)?0:(this.h+120)*j,n=+this.l,e=isNaN(this.s)?0:this.s*n*(1-n),i=Math.cos(t),r=Math.sin(t);return new k(255*(n+e*(U*i+V*r)),255*(n+e*(W*i+X*r)),255*(n+e*(Y*i)),this.opacity)}}));export{b as color,et as cubehelix,z as gray,K as hcl,E as hsl,C as lab,J as lch,N as rgb};
