/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 54);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** @module B BaseObject*/

/**
 * Web Apps Javascript Distribution Library
 * Base implementation for the User Object
 *
 */
class BaseObject {

    constructor() {
        /**
         * Set of getProperty functions
         * the object key is the property name to be set/get
         *
         */
        this.getProperty = {
            width: (objName) => {
                return this.getElemFromName(objName).width();
            },
            height: (objName) => {
                return this.getElemFromName(objName).height();
            },
            x: (objName) => {
                var elem = this.getElemFromName(objName);
               // return Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[0], 10));  // elem.css('transform').split(',')[4])
                return elem.position().left;
            },
            y: (objName) => {
                var elem = this.getElemFromName(objName);
                //return Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[1], 10));  // elem.css('transform').split(',')[5])
                return elem.position().top;
            },
            Alpha: (objName) => {
                return this.getElemFromName(objName).css('opacity');
            },
            'Background color': (objName) => {
                return this.getElemFromName(objName).css('background-color');
            },
            'Horizontal scroll': (objName) => {
                return this.getElemFromName(objName).css('overflow-x');
            },
            'Vertical scroll': (objName) => {
                return this.getElemFromName(objName).css('overflow-y');
            },
            'Constraints': (objName) => {
                return [
                    this.getElemFromName(objName).css('top'),
                    this.getElemFromName(objName).css('right'),
                    this.getElemFromName(objName).css('bottom'),
                    this.getElemFromName(objName).css('left')
                ];
            },
        };

        /**
         * Set of setProperty functions
         * the object key is the property name to be set/get
         *
         */
        this.setProperty = {
            width: (objName, value) => {
                this.getElemFromName(objName).css('width', value + 'px');
            },
            height: (objName, value) => {
                this.getElemFromName(objName).css('height', value + 'px');
            },
            x: (objName, value) => {
                var elem = this.getElemFromName(objName);
                //var yPos = Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[1], 10)); // elem.css('transform').split(',')[5])
                var yPos = elem.position().top;
                // remove constraints
                this.removeConstraints(elem, 'x');
                elem.css('transform', 'translate(' + value + 'px,' + yPos + 'px)');
            },
            y: (objName, value) => {
                var elem = this.getElemFromName(objName);
                //var xPos = Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[0], 10)); // elem.css('transform').split(',')[4])
                var xPos = elem.position().left;
                // remove constraints if applied
                this.removeConstraints(elem, 'y');
                elem.css('transform', 'translate(' + xPos + 'px,' + value + 'px)');
            },
            Alpha: (objName, value) => {
                this.getElemFromName(objName).css('opacity', value/100 );
            },
            'Background color': (objName, value) => {
                this.getElemFromName(objName).css('background-color', value);
            },
            'Horizontal scroll': (objName, value) => {
                this.getElemFromName(objName).css('overflow-x', 'hidden');
                if (value) this.getElemFromName(objName).css('overflow-x', 'scroll');
            },
            'Vertical scroll': (objName, value) => {
                this.getElemFromName(objName).css('overflow-y', 'hidden');
                if (value) this.getElemFromName(objName).css('overflow-y', 'scroll');
            },
            'Constraints': (objName, value) => {
              try {
                var elem = this.getElemFromName(objName);
                if ((value[0] == "top") || (value[0] == "bottom") ) {
                    var xPos = elem.position().left;
                    elem.css('transform', 'translate(' + xPos + 'px,0px)');
                } else {
                    var yPos = elem.position().top;
                    elem.css('transform', 'translate(0px,' + yPos + 'px)');
                }
                // reset older values
                elem.css({'top':'initial','right':'initial','bottom':'initial','left':'initial'});
                
                elem.css(value[0],value[1]+'px');
              } catch (e) {
                console.log (e);
              } 
                
            },
        };
    }

    /**
     * Remove all constraints if we move the object
     * @param objName
     * @param axis
     */
    removeConstraints (elem, axis) {
        if (elem.css('top') && axis == 'y') elem.css('top', '');
        if (elem.css('left') && axis == 'x') elem.css('left', '');
        if (elem.css('bottom') && axis == 'y') elem.css('bottom', '');
        if (elem.css('right') && axis == 'x') elem.css('right', '');
        // here restore the height and width params
        if (axis == 'y') elem.css('height', elem.attr('original-height') + 'px');
        else elem.css('width', elem.attr('original-width') + 'px');
    }

    /**
     * Retrieves the element with a given object-name attribute
     * @param objName
     * @returns {*|jQuery|HTMLElement}
     */
    getElemFromName (objName) {
        return $('[obj-name= "' + objName + '"]');
    }

    /**
     * Generic removeGesture block implementation
     * @param objName
     * @param gesture
     */
    removeGesture (objName, gesture) {
        try {
            var elem = this.getElemFromName(objName);
            var gestureStr = this.gestureStr(gesture);
            return elem.unbind(gestureStr);
        } catch (e) {
            throw(e);
        }
    }
    
    animationStart(objName, animation, onCompleteCallback) {
        var elem = this.getElemFromName(objName);
        let duration = animation.duration*1000;
        let options = {duration: duration, complete: onCompleteCallback, queue: animation.id};

        switch(animation.type) {
            case "move":
                elem.animate({left: '+=' + animation.dX + 'px', top: '+=' + animation.dY + 'px'}, options);
                elem.dequeue(animation.id);
                break;
            case "scale":
                let newWidth = elem.width() * animation.dX;
                let newHeight = elem.height() * animation.dY;
                let leftDelta = (newWidth - elem.width()) / 2;
                let topDelta = (newHeight - elem.height()) / 2;
                elem.animate({width:newWidth+'px', height:newHeight+'px', left: '-='+leftDelta+'px', top: '-='+topDelta+'px'}, options);
                elem.dequeue(animation.id);
                break;
            case "rotate":
                 let angle = animation.angle;
                 let currAngle = 0;
                 if( elem.attr('data-angle') ) {
                    currAngle = elem.attr('data-angle');
                 }
                 let finalAngle = parseInt(currAngle) + parseInt(angle);
                 elem.attr('data-angle', finalAngle);
                 var left = elem.position().left;
                 var top = elem.position().top;
                 
                 let stepFunc = function(now) {
                    elem.css({
                        'transform':'rotate('+now+'deg)',
                        'left': left+'px',
                        'top': top+'px'
                    });
                 };
                 
                 let completeFunc = function() {
                    //hs:traaping before calling scrip's callback incase you want to do any post processing on the data
                    onCompleteCallback();
                 }
                 options.step = stepFunc;
                 options.complete = completeFunc;
                 elem.animate({deg: finalAngle}, options);
                 elem.dequeue(animation.id);
                break;
            case "fade":
                let alpha = (animation.alpha / 100);
                elem.animate({opacity:alpha}, options);
                elem.dequeue(animation.id);
                break;
        }
    }

    animationCancel(objName, animation) {
        var elem = this.getElemFromName(objName);
        elem.stop(animation.id, false, false);
    }

    animationStop(objName, animation) {
        var elem = this.getElemFromName(objName);
        elem.stop(animation.id, true, true);
    }

    animationStopAll(objName) {
        var elem = this.getElemFromName(objName);
        elem.stop();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (BaseObject);




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
// ES6 imports


class TextObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor(elemSelectorRef) {
        super();

        // Element selector
        this.elemSelectorRef = elemSelectorRef || '';

        var self = this;

        // Getting Text properties values

        this.getProperty = Object.assign(this.getProperty, {
            'Font size': (objName) => {
                return this.getTextElemFromName(objName).css('font-size');
            },
            Alpha: (objName) => {
                return this.getTextElemFromName(objName).css('opacity') * 100;
            },
            'Text Alignment': (objName) => {
                return this.getTextElemFromName(objName).css('text-align');
            },
            'Vertical Alignment': (objName) => {
                return this.getTextElemFromName(objName).css('vertical-align');
            },
            'Font style': (objName) => {
                return this.getTextElemFromName(objName).attr('fontStyle');
            },
            'Font family': (objName) => {
                return this.getTextElemFromName(objName).css('font-family');
            },
            'Background color': (objName) => {
                return this.getTextElemFromName(objName).css('background-color');
            },
            'Text color': (objName) => {
                return this.getTextElemFromName(objName).css('color');
            },
            Text: (objName) => {
                return this.getTextElemFromName(objName).html();
            }
        });

        this.setProperty = Object.assign(this.setProperty, {
            Text: (objName, value) => {
                this.getTextElemFromName(objName).html(value);
            },
            'Font size': (objName, value) => {
                this.getTextElemFromName(objName).css('font-size',value+'px');
            },
            Alpha: (objName, value) => {
                this.getTextElemFromName(objName).css('opacity',value/100);
            },
            'Text Alignment': (objName, value) => {
                this.getTextElemFromName(objName).css('text-align',value.toLowerCase());
            },
            'Vertical Alignment': (objName, value) => {
                this.getTextElemFromName(objName).css('vertical-align',value.toLowerCase());
            },
            'Font style': (objName, value) => {
                let property = 'font-style';
                if (value.toLowerCase() == 'bold') {
                    property = 'font-weight';
                }
                this.getTextElemFromName(objName).css(property,value.toLowerCase());
                this.getTextElemFromName(objName).attr('fontStyle',value.toLowerCase());
            },
            'Font family': (objName, value) => {
                this.getTextElemFromName(objName).css('font-family',value.toLowerCase());
            },
            'Background color': (objName, value) => {
                this.getTextElemFromName(objName).css('background-color',value);
            },
            'Text color': (objName, value) => {
                this.getTextElemFromName(objName).css('color',value);
            }
        });
    };

    /**
     * Retrieves the text element with a given object-name attribute
     * @param objName
     * @returns {*|jQuery|HTMLElement}
     */
    getTextElemFromName (objName) {
        return $('[obj-name= "' + objName + '"]' + this.elemSelectorRef);
    }

    init ( elemSelectorRefValue) {
        this.elemSelectorRef = elemSelectorRefValue;
    };

}

/* harmony default export */ __webpack_exports__["a"] = (TextObject);





/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
/**
 * 
 */
/*global $ */

// ES6 imports


class ListGridObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {
  constructor() {

    super();
    this.objectNameMap = {};
    this.templateCell = {};
    this.configCallbacks = {};
    this.clickCallbacks = {};

    this.getProperty = Object.assign(this.getProperty, {
      "Show scrollbar": (obj) => {
        return obj.css("overflow-y");
      },
      "Horizontal separator thick": (obj) => {
        return obj.css("border-bottom-width");
      },
      "separator color": (obj) => {
        return obj.css("border-bottom-color");
      },
      "Highlight cell color": (obj) => {
        return obj.attr("cell-highlight-color");
      },
      "Highlight cell": (obj) => {
        // let ele = "[obj-name= \"" + objName + "\"]";
        return obj.attr("cell-highlight");
      },
      width: (obj) => {
        return obj.width();
      },
      height: (obj) => {
        return obj.height();
      },
      x: (obj) => {
        return obj.position().left;
      },
      y: (obj) => {
        return obj.position().top;
      },
      Alpha: (obj) => {
        return obj.css("opacity");
      },
      "Background color": (obj) => {
        return obj.css("background-color");
      },
      "Horizontal scroll": (obj) => {
        return obj.css("overflow-x");
      },
      "Vertical scroll": (obj) => {
        return obj.css("overflow-y");
      },
    });

    this.setProperty = Object.assign(this.setProperty, {
      "Show scrollbar": (obj, value) => {
        let overflow = "auto";
        if (value.toLowerCase() == "never") {
          document.styleSheets[0].addRule(".hide-scrolllbar::-webkit-scrollbar", "width: 0;");
          obj.addClass("hide-scrolllbar");
        } else {
          obj.removeClass("hide-scrolllbar");
          obj.css("overflow-y",overflow);
        }
      },
      "separator color": (obj, value) => {
        obj.find(".border-sep").css("background-color",value);
      },
      "Highlight cell color": (obj, value) => {
        obj.attr("cell-highlight-color",value);
        if (obj.attr("cell-highlight") == "YES") {
          obj.mouseenter(function() {
            $(this).css("background-color",value);
          }).mouseleave(function() {
            obj.css("background-color",obj.attr("cell-bg-color"));
          });
        } else {
          obj.unbind("mouseenter");
        }
      },
      "Highlight cell": (obj, value) => {
        if (value) {
          obj.attr("cell-highlight","YES");
          obj.mouseenter(function() {
            $(this).css("background-color",obj.attr("cell-highlight-color"));
          }).mouseleave(function() {
            $(this).css("background-color",obj.attr("cell-bg-color"));
          });
        } else {
          obj.attr("cell-highlight","NO");
          obj.unbind("mouseenter");
        }
      },
      width: (obj, value) => {
        var elem = $('[obj-name= "' + obj + '"]');
        $(elem).css("width", value + "px");
      },
      x: (obj, value) => {
        var elem = $('[obj-name= "' + obj + '"]');
        //var yPos = Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[1], 10)); // elem.css('transform').split(',')[5])
        var yPos = elem.position().top;
        // remove constraints
        this.removeConstraints(elem, "x");
        elem.css("transform", "translate(" + value + "px," + yPos + "px)");
      },
      y: (obj, value) => {
        var elem = $('[obj-name= "' + obj + '"]');
        //var xPos = Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[0], 10)); // elem.css('transform').split(',')[4])
        var xPos = elem.position().left;
        // remove constraints if applied
        this.removeConstraints(elem, "y");
        elem.css("transform", "translate(" + xPos + "px," + value + "px)");
      },

      "Horizontal scroll": (obj, value) => {
        obj.css("overflow-x", "hidden");
        if (value) obj.css("overflow-x", "scroll");
      },
      "Vertical scroll": (obj, value) => {
        obj.css("overflow-y", "hidden");
        if (value) obj.css("overflow-y", "scroll");
      }
    });
  }

  configureCells (objName, cellLength) {
    var parent = this;
    var index = 0;
    var ele = "[obj-name=\"" + objName + "\"]";
    
    this.saveTemplateCell(objName);

        
    for (let i=0;i<cellLength;i++) {
      let cellView = this.templateCell[objName].clone();
      //The elements are absolutely positioned. Change their 'top' attr
      //$(cellView).css("top",firstElement.height()*(i+1));
      //Change ID for these elements
      let firstCellId = parseInt(this.templateCell[objName].attr("id").replace("j_",""));
      $(cellView).attr("id","j_"+parseInt(firstCellId+i));
            
      //Now rename the children
      $(cellView).children().each(function () {
        index++;
        let currName = $(this).attr("obj-name");
        if( currName != undefined ) {
          let newId = currName + "_lceid_" + index;
          let newName = currName + "_lcename_" + index;
          $(this).attr("id", newId);
          $(this).attr("obj-name", newName);
          parent.objectNameMap[newId] = newName;
        }
      });

      $(cellView).attr("listindex", i);
      $(cellView).click( function() {
        // console.log("clicked ", $(this).attr("listindex"));
        parent.setContext($(this));
        //callback here
        let callback = parent.clickCallbacks[$(this).attr("obj-name")];
        if( callback != null ) {
          callback($(this), $(this).attr("listindex"));
        }
        parent.resetContext($(this));
      });

      $(ele).append(cellView);
    }
    
    $(ele).find(".ListViewCell").each(function () {
      let elem = $(this);
      if ($(elem).attr("cell-highlight") == "YES") {
        $(elem).mouseenter(function() {
          $(elem).attr("cell-bg-color",$(elem).css("background-color"));
          $(elem).css("background-color",$(elem).attr("cell-highlight-color"));
        }).mouseleave(function() {
          $(elem).css("background-color",$(elem).attr("cell-bg-color"));
        });
      }
    });

    $(ele).find(".GridViewCell").each(function () {
      let elem = $(this);
      if ($(elem).attr("cell-highlight") == "YES") {
        $(elem).mouseenter(function() {
          $(elem).attr("cell-bg-color",$(elem).css("background-color"));
          $(elem).css("background-color",$(elem).attr("cell-highlight-color"));
        }).mouseleave(function() {
          $(elem).css("background-color",$(elem).attr("cell-bg-color"));
        });
      }
    });

    //check scroll
    $(ele).removeClass("hide-scrolllbar");
    switch ($(ele).attr("show-scroll")) {
    case "always":
      $(ele).css("overflow-y","scroll");
      break;
    case "when scroll":
      $(ele).css("overflow-y","auto");
      break;
    case "never":
      document.styleSheets[0].addRule(".hide-scrolllbar::-webkit-scrollbar", "width: 0;");
      $(ele).addClass("hide-scrolllbar");

      break;
    }
        
  }

  //hs: returns true if saved, false if exists
  saveTemplateCell(objName) {
    var ele = "[obj-name=\"" + objName + "\"]";
    var firstElement = $(ele).children().eq(1);

    if( this.templateCell[objName] == null ) {
      this.templateCell[objName] = firstElement.clone();
      return true;
    }
    return false;
  }

  removeCell(cell) {
    cell.remove();
  }

  setContext(objName) {
    // console.log(objName);
    objName.children().each(function () {
      let currName = $(this).attr("obj-name");
      if( currName != undefined ) {
        let charIndex = currName.indexOf("_lcename_");
        if( charIndex != -1 ) {
          var newName = currName.substr(0, charIndex);
          $(this).attr("obj-name", newName);
        }
                
      }
    });
  }

  setClickCallback(objName, callback) {
    this.clickCallbacks[objName] = callback;
  }

  setConfigCallback(objName, callback) {
    this.configCallbacks[objName] = callback;
  }

  executeConfigCallback(objName, cell, position) {
    var ele = "[obj-name=\"" + objName + "\"]";
    var cellName = cell.attr("obj-name");
    //console.log("Cellname = " + cellName);
    let callback = this.configCallbacks[cellName];
    // console.log("callback = " + callback);
    callback(cell, position);
  }

  resetContext(objName) {
    var parent = this;
    objName.children().each(function () {
      let currName = $(this).attr("obj-name");
      let currId = $(this).attr("id");

      if( currName != undefined ) {
        $(this).attr("obj-name", parent.objectNameMap[currId]);
      }
    });
  }

  removeAllCells(objName) {
    var parent = this;
    let ele = "[obj-name=\"" + objName + "\"]";
    $(ele).children().each(function (i) {
      $(this).remove();
    });
    parent.objectNameMap = {};
  }

  scrollTo (objName,cellNum,animated,selector) {
    let ele = "[obj-name=\"" + objName + "\"]";
    let scrollSpeed = 500;
    if (!animated) {
      scrollSpeed = 0;
    }
    $(ele).animate({
      scrollTop: $(ele).find("."+selector+":nth-child("+cellNum+")" ).offset().top}
      ,scrollSpeed);
  }

  isCellVisible (objName,cellNum,selector) {
    let ele = "[obj-name=\"" + objName + "\"]";
    let cell = $(ele).find("."+selector+":nth-child("+cellNum+")" );
    let contHeight = $(ele).height();
    //let contTop = $(ele).scrollTop();
    //let contBottom = contTop + contHeight;
    let elemTop = cell.offset().top - $(ele).offset().top;
    let elemBottom = elemTop + cell.height();

    return elemTop >= 0 && elemBottom <=contHeight;
  }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ListGridObject);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("snapClinical", [], factory);
	else if(typeof exports === 'object')
		exports["snapClinical"] = factory();
	else
		root["snapClinical"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return client; });
/**
 * Client is the base class that is used for setting system wide information about
 * connection, device, and general SDK settings.
 */
class Client {

    /**
     * Constructor
     *
     */
    constructor() {
        this._config = {
            apiBaseUrl: undefined,
            basicCredentials: undefined,
            personalId: undefined,
            frontEndKey: undefined
        };
    }

    /**
     * Gets the apiBaseUrl
     *
     * @type {string} - Current apiBaseUrl - the base url for api client requests
     */
    get apiBaseUrl() {
        return this._config.apiBaseUrl;
    }

    /**
     * Sets the apiBaseUrl
     *
     * @param {string} url
     */
    set apiBaseUrl(url) {
        let data = url;
        if (typeof data !== 'string') {
            throw new Error('Error : apiBaseUrl must be a string');
        }
        if (data[data.length - 1] === '/') {
            data = data.slice(0, -1);
        }
        this._config.apiBaseUrl = data;
    }

    /**
     * Gets the basicCredentials - the credential string for Basic Authentication
     *
     * @type {string} - Current apiBaseUrl
     */
    get basicCredentials() {
        return this._config.basicCredentials;
    }

    /**
     * Sets the basicCredentials
     *
     * @param {string} credentials
     */
    set basicCredentials(credentials) {
        this._config.basicCredentials = credentials;
    }

    /**
    * Gets the configuration information
    *
    * @type {Object} - the information in a key value object
    * @property {String} config.apiBaseUrl - url
    * @property {String} config.basicCredentials - the credential string for Basic Authentication
    */
    get config() {
        return this._config;
    }

    /**
     * Sets the configuration for Clinical6
     *
     * @param {Object} data - the information in a key value object
     * @property {String} config.apiBaseUrl - url
     * @property {String} config.basicAuthentication - the credential string for Basic Authentication
     */
    set config(data) {
        Object.assign(this._config, data);
    }

    /**
     * Gets the personalId
     *
     * @type {Object} - Current personalId
     */
    get personalId() {
      return this._config.personalId;
    }

    /**
     * Sets the personalId
     *
     * @param {Object} personalId
     */
    set personalId(personalId) {
      this._config.personalId = personalId;
    }

    /**
     * Gets the frontEndKey
     *
     * @type {Object} - Current frontEndKey
     */
    get frontEndKey() {
      return this._config.frontEndKey;
    }

    /**
     * Sets the frontEndKey
     *
     * @param {Object} frontEndKey
     */
    set frontEndKey(frontEndKey) {
      this._config.frontEndKey = frontEndKey;
    }

  /**
     * Send HTTP request to API
     *
     * @param {!String} url       - Path to the endpoint starting with '/'
     * @param {?String} [method]  - HTTP Method (DELETE|GET|POST|PUT)
     * @param {?Object} [params]  - Key/Value list of url parameters
     * @param {?Object} [body]    - a Blob, BufferSource, FormData, URLSearchParams, or USVString object
     *                              In case of a json body, this can be created with something like:
     *                              new Blob(body, {type : 'application/json'});
     * @param {?Object} [headers] - Key/Value list of headers. If not present it default to `{
     *                                'Accept' : 'application/json',
     *                              }`
     * @return {Promise}          - Resolves on HTTP 200. Rejects on all else.
     */
    async fetch(url, method = 'GET', params = {}, body = undefined, headers) {

        // Determine if method is valid
        if ((['POST', 'PUT', 'PATCH'].indexOf(method.toUpperCase()) !== -1) && !body) {
            throw new Error('fetch error: invalid PUT/POST/PATCH request, no data given');
        }

        // Initialize parameters
        let fetchParams = new URLSearchParams();
        for (let key in params) {
            fetchParams.append(key, params[key]);
        }
        const fetchParamsString = fetchParams.toString();

        // Initialize headers

        // Default headers
        let fetchHeaders = headers;
        if (!fetchHeaders)
            fetchHeaders = {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            };
        // Add the Basic Authentication header
        if (this._config.basicCredentials)
            fetchHeaders['Authorization'] = 'Basic '+ this._config.basicCredentials;

        let requestData = {
            method: method,
            headers: new Headers(fetchHeaders),
            mode: 'cors',
            cache: 'default',
            body: body
        };

        const fetchUrl = this._config.apiBaseUrl + url +
            (fetchParamsString.length > 0 ? '?' + fetchParamsString : '');

        let fetchRequest = new Request(fetchUrl, requestData);

        return fetch(fetchRequest);
            // .then( response => response);
            // .then( response => {
            //     // if (response.body) console.log(response.body)
            //     return response.json();
            // })
            // .then(json => {
            //     console.log('fetch reply', json);
            //     return json;
            // } );
    }

}

const client = new Client();

// export default Client;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "user", function() { return user; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processService", function() { return processService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "taskService", function() { return taskService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formService", function() { return formService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flowService", function() { return flowService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "snapClinicalApiService", function() { return snapClinicalApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_User__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_ProcessService__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_TaskService__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_FormService__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_FlowService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_SnapClinicalApiService__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utility_Version__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "client", function() { return __WEBPACK_IMPORTED_MODULE_0__Client__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return __WEBPACK_IMPORTED_MODULE_1__helpers_User__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ProcessService", function() { return __WEBPACK_IMPORTED_MODULE_2__services_ProcessService__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TaskService", function() { return __WEBPACK_IMPORTED_MODULE_3__services_TaskService__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FormService", function() { return __WEBPACK_IMPORTED_MODULE_4__services_FormService__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FlowService", function() { return __WEBPACK_IMPORTED_MODULE_5__services_FlowService__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SnapClinicalApiService", function() { return __WEBPACK_IMPORTED_MODULE_6__services_SnapClinicalApiService__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Version", function() { return __WEBPACK_IMPORTED_MODULE_7__utility_Version__["a"]; });









/** @type {User} */
const user = new __WEBPACK_IMPORTED_MODULE_1__helpers_User__["a" /* default */]();

/** @type {ProcessService} */
const processService = new __WEBPACK_IMPORTED_MODULE_2__services_ProcessService__["a" /* default */]();

/** @type {TaskService} */
const taskService = new __WEBPACK_IMPORTED_MODULE_3__services_TaskService__["a" /* default */]();

/** @type {FormService} */
const formService = new __WEBPACK_IMPORTED_MODULE_4__services_FormService__["a" /* default */]();

/** @type {FlowService} */
const flowService = new __WEBPACK_IMPORTED_MODULE_5__services_FlowService__["a" /* default */]();

/** @type {SnapClinicalApiService} */
const snapClinicalApiService = new __WEBPACK_IMPORTED_MODULE_6__services_SnapClinicalApiService__["a" /* default */]();



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Model representing a user profile.
 */
class BaseModel {
    /**
     * @param {Object}          response            - JSON formatted response of base object.
     * @param {String|Number}   response.id         - The base ID value
     */
    constructor(response = {}) {
        const _response = response['data'] || response;

        /** @type {String} */
        this._id = _response.id;
        this._response = _response;

        // Add any other fields in the response
        // for (let prop in _response) {
        //     this['_' + prop] = _response[prop];
        // }
    }

    /**
     * Gets the id
     *
     * @type {String}
     */
    get id() {
        return this._id;
    }

    /**
     * Sets the id
     *
     * @param {String} id
     */
    set id(id) {
        this._id = id;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (BaseModel);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hasAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hasCredentials; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isA; });
/* unused harmony export isDate */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isRequired; });
/* unused harmony export isValid */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return validate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hasPersonalId; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(0);


/**
 * If there is no token, a message is returned.
 * @param  {String}  msg - Message to return if validation fails
 * @return {String}      - A message if the validation fails and is blank if it passes
 */
function hasCredentials(msg = 'requires Basic Authentication credentials') { return (__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].basicCredentials) ? '' : msg; }

/**
 * If the value is not a date, a message is returned.
 * @param  {Object}  date - The target value to see if it is a date.
 * @param  {String}  msg  - Message to return if validation fails
 * @return {String}       - A message if the validation fails and is blank if it passes
 */
function isDate(date, msg = 'requires valid date') { return (Date.parse(date)) ? '' : msg; }

/**
 * If the required item does not exist, a message is returned.
 * @param  {Object}  p   - The target value to see if it exists, to be
 *                         Must contain a { key: value } to be the target of validation
 * @param  {String}  msg - Message to return if validation fails
 * @return {String}      - A message if the validation fails and is blank if it passes
 */
function isRequired(p, msg = 'is not defined') {
    return Object.keys(p)
        .map(key => ({ key, value: p[key] }))
        .filter(obj => (obj.value === null || obj.value === undefined))
        .map(value => `${value.key} ${msg}`)
        .join(' and ');
}

/**
 * If the parameter is not of primitive type 'type', a message is returned.
 * @param  {Object}  p    - The target value to see if the type exists.
 *                          Must contain a { key: value } to be the target of validation
 * @param  {Object}  type - The type is the class the target is an instance of (example Array, String, etc.).
 * @param  {String}  msg  - Message to return if validation fails
 * @return {String}       - A message if the validation fails and is blank if it passes
 */
function isA(p, type, msg = 'is not a') {
    if (isRequired(p).length > 0) { return ''; }
    return Object.keys(p)
        .map(key => ({ key, value: p[key] }))
        .filter(obj => ((typeof type !== 'function' && typeof obj.value !== type)
            || (typeof obj.value === 'object' && !(obj.value instanceof type))))
        .map(value => `${value.key} ${msg} ${type}`).join(' and ');
}

/**
 * If the parameter does not have the attribute, a message is returned
 * @param  {Object}  p             - The target value to see if it has attributes
 *                                   Must contain a { key: value } to be the target of validation
 * @param  {String}  attributeName - Must be a string to validate p
 * @param  {String}  msg           - Message to return if validation fails
 * @return {String}                - A message if the validation fails and blank if it passes
 */
function hasAttribute(p, attributeName, msg = 'does not have') {
    if (isRequired(p).length > 0) { return ''; }
    return Object.keys(p)
        .map(key => ({ key, value: p[key] }))
        .filter(obj => !{}.hasOwnProperty.call(obj.value, attributeName))
        .map(value => `${value.key} ${msg} ${attributeName}`)
        .join(' and ');
}

/**
 * If the boolean statement is false, return a message, otherwise return an empty string
 * @param  {Boolean} booleanStatement - Any boolean statement that should be true
 * @param  {String}  msg              - Message to return if validation fails
 * @return {String}                   - A message if the validation fails and blank if it passes
 */
function isValid(booleanStatement, msg = 'is not true') { return (booleanStatement) ? '' : msg; }

/**
 * Checks if the client has stored personalId information
 * @param  {String}  msg           - Message to return if validation fails
 * @return {String}                - A message if the validation fails and blank if it passes
 */
function hasPersonalId(msg = 'requires personalId') { return (__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId) ? '' : msg; }

/**
 * Loops through each validation item and throws an error if something fails (a message exists)
 * @param  {String}    module  - The location that calls this method.
 * @param  {...Object} results - An array of functions to test.
 */
function validate(module, ...results) {
    const uniqueResults = results.filter(result => result);
    if (uniqueResults.length > 0) {
        const messages = uniqueResults.join(' and ');
        throw new Error(`${module} error: ${messages}`, module);
    }
}

// Original, substitued methods, TODO: remove

/**
 * If the required item does not exist, a message is returned.
 * @param  {Object}  p    - The target value to see if it exists.
 * @param  {String}  msg - Message to return if validation fails
 * @return {String}      - A message if the validation fails and is blank if it passes
 */
function isRequiredOrig(p, msg = 'is not defined') {
    return Object.keys(p)
        .map(key => ({ key, value: p[key] }))
        .filter(obj => !obj.value)
        .map(value => `${value.key} ${msg}`)
        .join(' and ');
}







/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(2);


/**
 * Model representing a process definition.
 */
class Form extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */]{
    /**
     * @param {Object}  response                        - JSON formatted response of process definition.
     * @param {String}  response.id                     - The process definition ID value
     */
    constructor(response = {}) {
        super(response);
    }

    /**
     * Gets the formKey
     *
     * @type {String}
     */
    get formKey() {
        return this._response.formKey;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Form);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Form__ = __webpack_require__(4);


/**
 * Model representing a process definition.
 */
class FormModel extends __WEBPACK_IMPORTED_MODULE_0__Form__["a" /* default */] {
    /**
     * @param {Object}  response            - JSON formatted response of a form model.
     *                  response.id         - The form model ID value
     */
    constructor(response) {
        super(response);
    }

    /**
     * Gets the fields
     *
     * @type {Array}
     */
    get fields() {
        return this._response.fields;
    }

    /**
     * Gets the outcomes
     *
     * @type {Array}
     */
    get outcomes() {
        return this._response.outcomes;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (FormModel);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_User__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Client__ = __webpack_require__(0);



/**
 * Helper class representing a user MobileUser.
 */
// class User extends aggregate(UserModel, Helper) {
class User extends __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */] {

    /**
     * Constructor for helper class representing a MobileUser
     *
     * @param {Object} json - response from server
     */
    constructor(json = {}) {
        super(json);

        this.updateCredentials();
    }

    /**
     * Sets the accountName
     *
     * @param {string} name
     */
    set accountName(name) {
        super.accountName = name;

        this.updateCredentials();
    }

    /**
     * Sets the password
     *
     * @param {string} pwd
     */
    set password(pwd) {
        super.password = pwd;

        this.updateCredentials();
    }

    updateCredentials() {
        if (this._accountName && this._password) {
            __WEBPACK_IMPORTED_MODULE_1__Client__["a" /* client */].basicCredentials = window.btoa(this._accountName + ':' + this._password);
        }
    }

    /**
     * Sets the personalId
     *
     * @param {string} personalId
     */
    set personalId(personalId) {
        super.personalId = personalId;

        __WEBPACK_IMPORTED_MODULE_1__Client__["a" /* client */].personalId = personalId;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (User);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(2);


/**
 * Model representing a user profile.
 */
class UserModel extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */]{

    /**
     * @param {Object}  response                        - JSON formatted response of a user profile.
     *                  response.account_name           - Account name (usually a number)
     *                  response.password               - Account password
     *                  response.email                  - The email address
     *                  response.personal_id            - The email address
     */
    constructor(response) {
        super(response);

        /** @type {String} */
        this._accountName = this._response['account_name'];

        /** @type {String} */
        this._password = this._response['password'];

        /** @type {String} */
        this._email = this._response['email'];

        /** @type {String} */
        this._email = this._response['personal_id'];
    }

    /**
     * Gets the accountName
     *
     * @type {string}
     */
    get accountName() {
        return this._accountName;
    }

    /**
     * Sets the accountName
     *
     * @param {string} name
     */
    set accountName(name) {
        this._accountName = name;
    }

    /**
     * Gets the email
     *
     * @type {string}
     */
    get personalId() {
        return this._personalId;
    }

    /**
     * Sets the personalId
     *
     * @param {string} personalId
     */
    set personalId(personalId) {
        this._personalId = personalId;
    }

    /**
     * Sets the password
     *
     * @param {string} pwd
     */
    set password(pwd) {
        this._password = pwd;
    }

    /**
     * Gets the email
     *
     * @type {string}
     */
    get email() {
        return this._email;
    }

    /**
     * Sets the password
     *
     * @param {string} email
     */
    set email(email) {
        this._email = email;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (UserModel);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_ProcessDefinition__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_ProcessInstance__ = __webpack_require__(11);






/**
 * Service handling Process specific endpoints.
 *
 */
class ProcessService {

    constructor() {}

    /**
     * Gets the Latest Process Definition with the give Process Definition key
     *
     * @param  {String} processDefKey           - Process Definition key
     * @throws {Error}                          - If missing credential or missing required parameters
     * @return {Promise<ProcessDefinition>}     - Promise returning a ProcessDefinition object
     *
     * @example
     * import { processService } from 'snapClinical';
     * processService.getLastProcessDefinition('SnapClinicalDemo3')
     *
     */
    async getLastProcessDefinition(processDefKey) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getLastProcessDefinition',
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["e" /* isRequired */])({processDefKey}),
            // isA(processDefKey, 'string')
        );

        const params = {
            key : processDefKey,
            size : 5,
            sort : 'version',
            order : 'desc'
        };

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch('/flowable-task/process-api/repository/process-definitions', 'GET', params)
            .then( resp => resp.json() )
            .then( response => {
                // Return the top most project definition process definition
                // console.log('getLastProcessDefinition - response:', response);
                if (response.data && Array.isArray(response.data))
                    if ( response.data.length > 0 )
                        return new __WEBPACK_IMPORTED_MODULE_3__models_ProcessDefinition__["a" /* default */](response.data[0]);
                    else
                        return null;
                else throw new Error ( 'getLastProcessDefinition failed', response );
            });
    }

    /**
     * Gets the Last Process Instance with the given Process Definition Id
     *
     * @param  {String} procDefID               - Process Definition Id
     * @throws {Error}                          - If missing credential or missing required parameters
     * @return {Promise<ProcessInstance>}       - Promise returning a ProcessInstance object
     *
     */
    async queryLastProcessInstance(procDefID) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.queryLastProcessInstance',
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["e" /* isRequired */])({procDefID}),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["c" /* hasPersonalId */])()
        );

        const body = JSON.stringify({
            'processDefinitionId': procDefID,
            'includeProcessVariables': 'true',
            'variables':
                [
                    {
                        'name': 'initiator',
                        'value': __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId,
                        'operation': 'equals'
                    }
                ]
        });

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch('/flowable-task/process-api/query/process-instances', 'POST', null, body)
            .then( resp => resp.json() )
            .then( response => {
                // console.log('queryLastProcessInstances - response:', response);
                if (response.data && Array.isArray(response.data))
                    if ( response.data.length > 0 )
                        return new __WEBPACK_IMPORTED_MODULE_4__models_ProcessInstance__["a" /* default */](response.data[0]);
                    else
                        return null;
                else throw new Error ( 'queryLastProcessInstance returned empty data', response );
            });
    }

    /**
     * Starts a New Process Instance with the given Process Definition Id
     *
     * @param  {String} procDefID               - Process Definition Id
     * @throws {Error}                          - If missing credential or missing required parameters
     * @return {Promise<ProcessInstance>}       - Promise returning a ProcessInstance object
     *
     */
    async startNewProcessInstance(procDefID) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.startNewProcessInstance',
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["e" /* isRequired */])({procDefID}),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["c" /* hasPersonalId */])()
        );

        const body = JSON.stringify({
            'processDefinitionId':procDefID,
            'businessKey':'myBusinessKey',
            'returnVariables': 'true',
            'variables': [
                {
                    'name': 'initiator',
                    'type': 'string',
                    'value': __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId,
                    'scope': 'local'
                },
                {
                    'name': 'frontEndKey',
                    'type': 'string',
                    'value': __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].frontEndKey,
                    'scope': 'local'
                }
            ]
        });

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch('/flowable-task/process-api/runtime/process-instances', 'POST', null, body)
            .then( resp => resp.json() )
            .then( response => {
                console.log('startNewProcessInstance - response:', response);
                if (response.id) {
                    return new __WEBPACK_IMPORTED_MODULE_4__models_ProcessInstance__["a" /* default */](response);
                } else if (response.errorCode) {
                    throw new Error(response.errorCode.toString());
                } else {
                    return null;
                }
            });
    }

    /**
     * Queries Historic Process Instances with the given Process Definition Id and returns the most recent one
     *
     * @param  {String} procDefID               - Process Definition Id
     * @param  {Object} query                   - Query data
     * @throws {Error}                          - If missing credential or missing required parameters
     * @return {Promise<ProcessInstance>}       - Promise returning a ProcessInstance object
     *
     */
    async queryHistoricProcessInstances(procDefID, query) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.queryHistoricProcessInstances',
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["e" /* isRequired */])({procDefID}),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["c" /* hasPersonalId */])(),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["d" /* isA */])({query}, Array)
        );
        for (let queryElement of query) {
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.queryHistoricProcessInstances',
                Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["a" /* hasAttribute */])({queryElement}, 'name'),
                Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["a" /* hasAttribute */])({queryElement}, 'value'),
                Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["a" /* hasAttribute */])({queryElement}, 'operation')
            );
        }

        const params = {
            size : 50,
            order : 'asc'
        };

        let variables = [
            {
                'name': 'initiator',
                'value': __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId,
                'operation': 'equals'
            }
        ];
        // add query to variables
        if (query) variables = variables.concat(query);

        const body = JSON.stringify({
            'processDefinitionId': procDefID,
            'includeProcessVariables': 'true',
            'variables': variables
        });

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch('/flowable-task/process-api/query/historic-process-instances', 'POST', params, body)
            .then( resp => resp.json() )
            .then( response => {
                // console.log('queryHistoricProcessInstances - response:', response);
                if (response.data && Array.isArray(response.data) && response.data.length > 0){

                    // here return the list of variables
                    let historicProcessInstances = [];
                    for (let instance of response.data) {
                        historicProcessInstances.push(new __WEBPACK_IMPORTED_MODULE_4__models_ProcessInstance__["a" /* default */](instance));
                    }
                    return historicProcessInstances;
                }
                else throw new Error ( 'queryHistoricProcessInstances returned empty data', response );
            });
    }

    /**
     * Save Process variables for a given Process Instance
     *
     * @param  {String} procInstID          - Process Instance Id
     * @param  {Array} variables            - Array of variables
     * @throws {Error}                      - If missing credential or missing required parameters
     * @return {Promise<Boolean>}           - Promise returning a Boolean
     *
     * @example
     * The array of Variables needs to be in the following format:
     * [
     *  {
     *    'name': 'variablename',
     *    'type': 'variabletype',
     *    'value': 'variablevalue',
     *    'scope': 'local'
     *  }
     * ]
     *
     */
    async saveProcessVariables(procInstID, variables) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.startNewProcessInstance',
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["e" /* isRequired */])({procInstID}),
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["d" /* isA */])({variables}, Array)
        );
        for (let variable of variables) {
            Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.saveFormProperties',
                Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["a" /* hasAttribute */])({variable}, 'name'),
                Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["a" /* hasAttribute */])({variable}, 'type'),
                Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["a" /* hasAttribute */])({variable}, 'value'),
                Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["a" /* hasAttribute */])({variable}, 'scope')
            );
        }
        const body = JSON.stringify(variables);

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/flowable-task/process-api/runtime/process-instances/${procInstID}/variables`, 'PUT', null, body)
            .then( response => {
                // console.log('saveProcessVariable:', response);
                if (response.status === 201) { // 201 Created
                    return response.json();
                }
                else throw new Error ('Save Process Variable failed', response );
            });
    }

    async getAllFormFieldsValues(procInstID) {
      Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.startNewProcessInstance',
        Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["b" /* hasCredentials */])(),
        Object(__WEBPACK_IMPORTED_MODULE_2__utility_ValidationUtility__["e" /* isRequired */])({procInstID}),
      );
      const formInstances = await __WEBPACK_IMPORTED_MODULE_1__index__["formService"].getFormInstances(procInstID);
      let formFields = [];

      for (let form of formInstances) {
        let instanceFields = await __WEBPACK_IMPORTED_MODULE_1__index__["formService"].getFormInstanceFieldsByInstanceId(form.id);
        if (form !== null) formFields = formFields.concat(instanceFields.fields);
      }

      return formFields;

    }
}

/* harmony default export */ __webpack_exports__["a"] = (ProcessService);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(2);


/**
 * Model representing a process definition.
 */
class ProcessDefinition extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */]{
    /**
     * @param {Object}  response                        - JSON formatted response of process definition.
     * @param {String}  response.id                     - The process definition ID value
     */
    constructor(response = {}) {
        super(response);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ProcessDefinition);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(2);


/**
 * Model representing a process definition.
 */
class ProcessInstanceModel extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */] {
    /**
     * @param {Object}  response                        - JSON formatted response of process definition.
     * @param {String}  response.id                     - The process definition ID value
     */
    constructor(response = {}) {
        super(response);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ProcessInstanceModel);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_Task__ = __webpack_require__(13);




/**
 * Service handling Task specific endpoints.
 *
 */
class TaskService {

    constructor() {
    }

    /**
     * Gets the Taskf from the given Process Definition Id
     *
     * @param  {Number} procInstID          - Process Definition Id
     * @throws {Error}                      - If missing credential or missing required parameters
     * @return {Promise<Task>}              - Promise returning a Task object
     *
     */
    async getTask(procInstID) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getTask', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({procInstID}));

        const params = {
            processInstanceId : procInstID,
            includeProcessVariables : true
        };

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch('/flowable-task/process-api/runtime/tasks', 'GET', params)
            .then( resp => resp.json() )
            .then( response => {
                // console.log('getTask - response:', response);
                if (response.data && Array.isArray(response.data))
                    if (response.data.length > 0 )
                        return new __WEBPACK_IMPORTED_MODULE_2__models_Task__["a" /* default */](response.data[0]);
                    else
                        return null;
                else throw new Error ( 'getTask returned empty data', response );
            });
    }

    /**
     * Performs a specific action on a Task
     *
     * @param  {Number} taskId          - Task Id
     * @param  {String} action          - action identifier to be perfomed on the task, like 'claim'
     * @throws {Error}                  - If missing credential or missing required parameters
     * @return {Promise<Boolean>}       - Promise returning true when action completes successfully
     *
     */
    async action(taskId, action) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.action', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["c" /* hasPersonalId */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({taskId, action}));

        const body = JSON.stringify({
            'action' : action,
            'assignee' : __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId
        });


        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch('/flowable-task/process-api/runtime/tasks/' + taskId.toString(), 'POST', null, body)
            .then( response => {

                // console.log('Task action - response:', response);
                if (response.status === 200) {
                    return true;
                }
                else throw new Error ('Task action failed', response );
            });
    }

}

/* harmony default export */ __webpack_exports__["a"] = (TaskService);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(2);



/**
 * Model representing a task.
 */
class TaskModel extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */] {
    /**
     * @param {Object} response                   - JSON formatted response of a task instance.
     * @param {Number} response.id                - The profile ID value

     */
    constructor(response = {}) {
        super(response);
    }

    /**
     * Gets the name
     *
     * @type {String}
     */
    get name() {
        return this._response['name'];
    }

    /**
     * Gets the taskDefinitionKey
     *
     * @type {String}
     */
    get taskDefinitionKey() {
        return this._response['taskDefinitionKey'];
    }

    /**
     * Gets the formKey
     *
     * @type {String}
     */
    get formKey() {
        return this._response['formKey'];
    }

    /**
     * Gets the process Instance Variables
     *
     * @type {Array}
     */
    get procInstVars() {
        return this._response['variables'];
    }
}

/* harmony default export */ __webpack_exports__["a"] = (TaskModel);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_Form__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_FormModel__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_Base__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__index__ = __webpack_require__(1);







/**
 * Service handling the Form endpoints
 */
class FormService {

    constructor() {
    }

    /**
     * Gets the Form data, including the variables, from the given Task Id
     *
     * @param  {Number} taskId          - Task Id
     * @throws {Error}                  - If missing credential or missing required parameters
     * @return {Promise<Form>}          - Promise returning a Form object
     *
     */
    getFormProperties(taskId) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getFormProperties',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({taskId})
        );

        const params = {
            taskId : taskId
        };

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch('/flowable-task/process-api/form/form-data', 'GET', params)
            .then( resp => resp.json() )
            .then( response => {
                // Return the top most project definition process definition
                // console.log('getFormProperties - response:', response);
                return new __WEBPACK_IMPORTED_MODULE_2__models_Form__["a" /* default */](response);
            });
    }

    /**
     * Gets the Form data, including the fields, from the given Deployment Id and Form Key
     *
     * @param  {String} deploymentId    - Deployment Id
     * @param  {String} formKey         - Form Key
     * @throws {Error}                  - If missing credential or missing required parameters
     * @return {Promise<FormModel>}     - Promise returning a Form object
     *
     */
    getFormFields(deploymentId, formKey) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getFormFields',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({deploymentId, formKey})
        );

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/flowable-task/process-api/repository/deployments/${deploymentId}/resourcedata/form-${formKey}.form`, 'GET')
            .then( resp => resp.json() )
            .then( response => {
                // Return the top most project definition process definition
                // console.log('getFormProperties - response:', response);
                return new __WEBPACK_IMPORTED_MODULE_3__models_FormModel__["a" /* default */](response);
            });
    }


    /**
    * Gets the Form Instance data, including the fields, from the given Task Id, Process Instance Id and Form Key
    *
    * @param  {Number|String} taskId               - Task Id
    * @param  {Number|String} processInstanceId    - Process Instance Id
    * @param  {String} formKey                     - Form Definition Key
    * @throws {Error}                              - If missing credential or missing required parameters
    * @return {Promise<FormModel>}                 - Promise returning a Form object
    *
    */
    getFormInstanceFields(taskId, processInstanceId, formKey) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getFormInstanceFields',
          Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
          Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({taskId, processInstanceId, formKey})
        );

        const body = JSON.stringify({
          'taskId': taskId,
          'processInstanceId': processInstanceId,
          'formDefinitionKey': formKey
        });

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/flowable-task/form-api/form/form-instance-model`, 'POST', null, body)
        .then( resp => resp.json() )
        .then( response => {
          // Return the form model
          // console.log('getFormProperties - response:', response);
          return new __WEBPACK_IMPORTED_MODULE_3__models_FormModel__["a" /* default */](response);
        });
    }


    /**
     * Gets the Form Instance data, including the fields, from the given Form Instance Id
     *
     * @param  {Number|String} formInstanceId       - Form Instance Id
     * @throws {Error}                              - If missing credential or missing required parameters
     * @return {Promise<FormModel>}                 - Promise returning a Form object
     *
     */
    getFormInstanceFieldsByInstanceId(formInstanceId) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getFormInstanceFieldsByInstanceId',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({formInstanceId})
        );

        const body = JSON.stringify({
            'formInstanceId': formInstanceId
        });

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/flowable-task/form-api/form/form-instance-model`, 'POST', null, body)
            .then( resp => resp.json() )
            .then( response => {
                // Return the form model
                // console.log('getFormProperties - response:', response);
                return new __WEBPACK_IMPORTED_MODULE_3__models_FormModel__["a" /* default */](response);
            });
    }


    /**
    * Gets all Form Instances from the given Process Instance Id
    *
    * @param  {Number|String} processInstanceId    - Process Instance Id
    * @throws {Error}                              - If missing credential or missing required parameters
    * @return {Promise<Array<any>>}                 - Array of instances
    *
    */
    getFormInstances(processInstanceId) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getFormInstancesForProcessInstanceId',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({processInstanceId})
        );

        const body = JSON.stringify({
            'processInstanceId': processInstanceId
        });

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/flowable-task/form-api/query/form-instances?size=9999`, 'POST', null, body)
        .then( resp => resp.json() )
        .then( response => {
            // Return an array of form instances
            console.log('getFormInstancesForProcessInstanceId - response:', response);


            // filter out the list to remove duplicates
            var cleaned = new Array ();
            var formIdAdded = {};

            for (var i=0, c=0; i<response.data.length; i++) {
                let el = response.data[i];
                let formId = el['formDefinitionId'];
                if (formIdAdded[formId] == undefined) {
                    cleaned[c] = el;
                    formIdAdded[formId] = {
                        ts: el['submittedDate'],
                        c: c
                    };
                    c++;
                } else if (formIdAdded[formId]['ts'] < el['submittedDate']){
                    cleaned[formIdAdded[formId]['c']] = el;
                    formIdAdded[formId]['ts'] = el['submittedDate'];
                }
            };

            return cleaned.slice(0);
        });
    }


  /**
     * Creates a Form Instance data for a given Task Id, Process Instance Id, Form Key and fields
     *
     * @param  {Number|String} taskId               - Task Id
     * @param  {String} formKey                     - Form Definition Key
     * @param  {Number|String} processInstanceId    - Process Instance Id (optional)
     * @param  {Array} fields                       - fields, an array of objects each with id and value fields, for example
     *                                                [ { id: 'someid', value: 'somevalue' } ]
     * @throws {Error}                              - If missing credential or missing required parameters
     * @return {Promise<Boolean>}                   - Promise returning true if
     *
     */
    createFormInstance(taskId, formKey, processInstanceId, fields) { // , parentDeploymentId) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.createFormInstance',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({taskId, formKey, fields}),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({fields}, Array)
        );
        for (let field of fields) {
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.createFormInstance',
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({field}, 'id'),
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({field}, 'value')
            );
        }

        //remap the fields into an hashmap variables object
        const variables = {};
        fields.forEach(field => (variables[field.id] = field.value));

        let bodyObj = {
            'taskId': taskId,
            'formDefinitionKey': formKey,
            'variables': variables
        };
        if (processInstanceId) bodyObj['processInstanceId'] = processInstanceId;
        const body = JSON.stringify(bodyObj);


        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch('/flowable-task/form-api/form/form-instances', 'POST', null, body)
            .then( response => {
                if (response.status === 201 || response.status === 200) { // 201 Created
                    return true;
                }
                else throw new Error ('Create Instance Fields failed', response );
            });
    }

    /**
     * Updates a Form Instance data for a given Task Id, Process Instance Id, Form Key and fields
     *
     * @param  {Number|String} taskId               - Task Id
     * @param  {String} formKey                     - Form Definition Key
     * @param  {Number|String} processInstanceId    - Process Instance Id (optional)
     * @param  {Array} fields                       - fields, an array of objects each with id and value fields, for example
     *                                                [ { id: 'someid', value: 'somevalue' } ]
     * @throws {Error}                              - If missing credential or missing required parameters
     * @return {Promise<Boolean>}                   - Promise returning true if
     *
     */
    updateFormInstance(taskId, formKey, processInstanceId, fields) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.updateFormInstance',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({taskId, formKey, fields}),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({fields}, Array)
        );
        for (let field of fields) {
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.updateFormInstance',
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({field}, 'id'),
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({field}, 'value')
            );
        }

        //remap the fields into an hashmap variables object
        const variables = {};
        fields.forEach(field => (variables[field.id] = field.value));

        let bodyObj = {
            'taskId': taskId,
            'formDefinitionKey': formKey,
            'variables': variables
        };
        if (processInstanceId) bodyObj['processInstanceId'] = processInstanceId;
        const body = JSON.stringify(bodyObj);

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch('/flowable-task/form-api/form/form-instances', 'PUT', null, body)
            .then( response => {
                if (response.status === 200 || response.status === 204) { // 204 No Content
                    return true;
                }
                else throw new Error ('Update Instance Fields failed', response );
            });
    }

    /**
     * Save Form Outcome for a given Process Instance and formKey
     *
     * @param  {String} procInstID          - Process Instance Id
     * @param  {String} outcome             - Value of the outcome variable
     *                                        a name selected among the form outcome array
     * @param  {String} formKey             - Form Definition Key
     * @throws {Error}                      - If missing credential or missing required parameters
     * @return {Promise<Boolean>}           - Promise returning a Boolean
     *
     * @example
     * A new Variable will be created:
     * [
     *  {
     *    'name': 'form_formKey_outcome',
     *    'type': 'string',
     *    'value': 'outcome',
     *    'scope': 'local'
     *  }
     * ]
     *
     */
    async saveFormOutcome(procInstID, outcome, formKey) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.saveFormOutcome',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({outcome}, {formKey}),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({outcome}, String),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({formKey}, String)
        );

        const variables = [
            {
            'name': `form_${formKey}_outcome`,
            'type': 'string',
            'value': outcome,
            'scope': 'local'
        }];

        return __WEBPACK_IMPORTED_MODULE_5__index__["processService"].saveProcessVariables(procInstID, variables);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (FormService);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utility_ArrayUtility__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_FormModel__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__index__ = __webpack_require__(1);









/**
 * Service handling the overal Flow Service
 *
 */
class FlowService {

    constructor() {
        this._lastProcessDef = undefined;
        this._lastProcessInst = undefined;
        this._task = undefined;
        this._processDefKey = undefined;
    }
    /**
     * Gets the current process Definition Key
     *
     * @type {String}
     */
    get processDefKey() {
      return this._processDefKey;
    }

    /**
     * Sets the current process Definition Key
     *
     * @param {String} defKey
     */
    set processDefKey(defKey) {
      this._processDefKey = defKey;
    }

    /**
     * Gets the current task
     *
     * @type {String|Number}
     */
    get task() {
        return this._task;
    }

    /**
     * Sets the current task
     *
     * @param {String|Number} task
     */
    set task(task) {
        this._task = task;
    }


    /**
     * Gets the next Task for a given Process Definition Key
     *
     * @param  {String} processDefKey       - Process Definition Key
     * @param  {Object} qualifier           - Object used to check if the current user is qualified for the flow
     *                                        This input needs to be in the following format:
     *
     *     {
     *       'name': 'somename',
     *       'value': 'somevalue,
     *       'operation': 'equals'|'notEquals'|'equalsIgnoreCase'|'notEqualsIgnoreCase'|
     *                    'lessThan'|'greaterThan'|'lessThanOrEquals'|'greaterThanOrEquals'|'like'
     *     }
     *
     * @throws {Error}                      - If missing credential or missing required parameters
     * @return {Promise<Object>}            - Promise returning an object with the variables, form fields and outcomes
     *                                        specified for the current task. The output object is as follows:
     *
     *     {
     *       variables: [
     *           {
     *               'id': 'someid',
     *               'name': 'somename',
     *               'type': 'string'|'short'|'integer'|'long'|'double'|'boolean'|'date',
     *               'value': somevalue,
     *               'readable': true|false,
     *               'writable': true|false,
     *               'required': true|false,
     *               'datePattern': 'somedatepattern',
     *               'enumValues': [ some array of enum Values like
     *                    {
     *                       'id': 'someid',
     *                       'name': 'somename'
     *                    },
     *                    ...
     *                ]
     *           },
     *           ...
     *       ],
     *       fields: [
     *           {
     *               'fieldType': 'FormField'|'ExpressionFormField'|'OptionFormField',
     *               'id': 'someid',
     *               'name': 'somename',
     *               'type': 'text'|'multi-line-text'|'integer'|'decimal'|'date'|'boolean'|'hyperlink'|
     *                       'expression'|'radio-buttons'|'dropdown',
     *               'value': 'somevalue',
     *               'required': true|false,
     *               'readOnly': true|false,
     *               'overrideId': true|false,
     *               'placeholder': 'someplaceholder',
     *               'params': {
     *                      'minLength': 'somevalue',
     *                      'maxLength': 'somevalue',
     *                      'regexPattern': 'someregex',
     *                      'mask': 'somemask'
     *                   },
     *               'layout': 'somelayout'
     *           },
     *           ...
     *       ],
     *       outcomes: [
     *           {
     *               'id': 'someid',       can be null
     *               'name': 'somename',   outcome value
     *           },
     *           ...
     *       ]
     *     }
     *
     *
     */
    async getNextTask(processDefKey, qualifier) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getNextTask', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["c" /* hasPersonalId */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({processDefKey}));
        const lastProcessDef = await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].getLastProcessDefinition(processDefKey);
        if (!lastProcessDef)
            throw new Error('Could not find the Process Definition Key');
        this._lastProcessDef = lastProcessDef;
        this.processDefKey = processDefKey;
        // console.log('FlowService, getNextTask latestProcessDef:', latestProcessDef);

        // Check if the user has already started the flow
        let lastProcessInst = await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].queryLastProcessInstance(lastProcessDef.id);
        // console.log('FlowService, getNextTask lastProcessInst:', lastProcessInst);

        if (!lastProcessInst) {
            /* Deprecated
            // Check if the user is qualified for the process
            const qualified = this.checkQualification(qualifier);
            if (qualified) {
                try {
                    lastProcessInst = await processService.startNewProcessInstance(lastProcessDef.id);
                    console.log('FlowService getNextTask BE SURE THAT WE TEST THIS');
                } catch(error) {
                    throw error;
                };
            }
            else
                throw Error ('User not qualified for the flow process');
             **/
            lastProcessInst = await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].startNewProcessInstance(lastProcessDef.id);
        }
        this._lastProcessInst = lastProcessInst;

        return this.getNextTaskAndFormData();
    }

  /**
   * Same as getNextTask, but it doesn't reuse an old session
   * @param processDefKey
   * @param qualifier
   * @return {Promise.<Object>}
   */
  async createNewInstanceAndGetFirstTask(processDefKey, qualifier) {
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.createNewInstanceAndGetFirstTask', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["c" /* hasPersonalId */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({processDefKey}));

      const lastProcessDef = await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].getLastProcessDefinition(processDefKey);
      if (!lastProcessDef)
        throw new Error('Could not find the Process Definition Key');
      this._lastProcessDef = lastProcessDef;
      this.processDefKey = processDefKey;

      /* Deprecated
      // Check if the user is qualified for the process
      const qualified = this.checkQualification(qualifier);

      if (qualified) {
        lastProcessInst = await processService.startNewProcessInstance(lastProcessDef.id);
        console.log('FlowService createNewInstanceAndGetFirstTask BE SURE THAT WE TEST THIS');
      }
      else
        throw Error ('User not qualified for the flow process');
      */

      let lastProcessInst = await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].startNewProcessInstance(lastProcessDef.id);

      this._lastProcessInst = lastProcessInst;

      return this.getNextTaskAndFormData();
    }


    /**
     * Gets the next Task using the stored last Process Instance
     *
     * @throws {Error}                      - If missing credential or missing required parameters
     * @return {Promise<Object>}            - Promise returning an object with three arrays of objects:
     *                                        variables (form properties),
     *                                        fields (form fields)
     *                                        outcomes (form buttons)
     *                                        See getNextTask method for more information on the object format.
     *
     */
    async getNextTaskAndFormData() {
        const lastProcessInst = this._lastProcessInst;
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getTaskAndFormData', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({lastProcessInst}) );

        const task = await __WEBPACK_IMPORTED_MODULE_4__index__["taskService"].getTask(lastProcessInst.id);
        if (!task) {
            // This process instance has no active tasks, returning null
            console.log('FlowService ' + __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId + ' get last process instance:  returning null values');
            return null;
        }
        this._task = task;

        const procVariables = task.procInstVars;

        await __WEBPACK_IMPORTED_MODULE_4__index__["taskService"].action(task.id, 'claim');
        // console.log('FlowService, getTaskAndFormData action claim');
        console.log('FlowService ' + __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId + ' claims task ' + task.name);

        const formVariables = await __WEBPACK_IMPORTED_MODULE_4__index__["formService"].getFormProperties(task.id);

        let formData = new __WEBPACK_IMPORTED_MODULE_3__models_FormModel__["a" /* default */]({ fields:[], outcomes:[] });

        if (task.formKey) {
            formData = await __WEBPACK_IMPORTED_MODULE_4__index__["formService"].getFormInstanceFields(task.id, lastProcessInst.id, task.formKey);
            // console.log('FlowService  formkey: '+ task.formKey + ' - fields: ' + JSON.stringify(formData.fields) + ' - variables: ' + JSON.stringify(procVariables));

           if ( formData.fields && formData.fields.length > 0 && procVariables && procVariables.length > 0) {

                // getting the list of Fields with null value that potentially can be setted by a process variable
                let listOfFieldsIds = formData.fields
                    .filter(el => (!el.value && el.type !== 'expression' && el.type !== 'hyperlink'))
                    .map( el => ({id: el.id}) );

                // console.log('FlowService list of fields to be setted:  ' + JSON.stringify(listOfFieldsIds))

                // getting the list of ProcVariables with valid value and matching ids
                let sublistOfProcVariables = procVariables
                    .filter( el1 => listOfFieldsIds.find( el2 => el1.name === el2.id ))
                    .map(el => FlowService.mapVariablesToFields(el));

                // console.log('FlowService list of variables with matching ids:  ' + JSON.stringify(sublistOfProcVariables))

                // updating the null values of the Fields matchimg with valid variables
                formData.fields.forEach( el => {
                    let i = sublistOfProcVariables.findIndex(el2 => el.id === el2.id);
                    if (i > -1)
                        el.value = sublistOfProcVariables[i].value;
                });

                // console.log('FlowService list of Fields updated:  ' + JSON.stringify(formData.fields))

            }

        }

        return {
            id: task.id,
            name: task.name,
            processInstanceId: lastProcessInst.id,
            definitionKey: task.taskDefinitionKey,
            formKey: task.formKey,
            variables: formVariables._response['formProperties'],
            fields: formData.fields,
            outcomes: formData.outcomes
        };
    }

    /**
     * *** Deprecated ***
     * Checks if the current user is qualified for executing the process identified by the current Process Definition
     *
     * @param  {Object} qualifier           - Object used to check if the current user is qualified for the flow
     *                                        This input needs to be in the following format:
     *
     *     {
     *       'name': 'somename',
     *       'value': 'somevalue,
     *       'operation': 'equals'|'notEquals'|'equalsIgnoreCase'|'notEqualsIgnoreCase'|
     *                    'lessThan'|'greaterThan'|'lessThanOrEquals'|'greaterThanOrEquals'|'like'
     *     }
     *
     * @return {Promise<Boolean>}            - Promise returning an Boolean indicating if the user is qualified
     *
     */
    async checkQualification (qualifier) {
        const lastProcessDef = this._lastProcessDef;
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getTaskAndFormData', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({lastProcessDef, qualifier}) );

        const processInstances = await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].queryHistoricProcessInstances(lastProcessDef.id, qualifier);
        // logic to check if the user is qualified
        let qualified = false;
        if (processInstances.length > 0) qualified = true;
        console.log('FlowService, getNextTask qualified:', qualified);
        return qualified;
    }

    /**
     * Save variables, fields and outcome (single string value) for the current TaskId
     *
     * @param  {Array} variables            - Array of variables (formProperties)
     * @param  {Array} fields               - Array of fields (fields in the Form)
     * @param  {String} outcome             - outcome name selected among the form outcome array
     * @throws {Error}                      - If missing credential or missing required parameters
     *
     * @example
     * The array of Variables needs to be in the following format:
     *
     *   [
     *        {
     *            id: 'variablename',
     *            name: 'something', (optional)
     *            type: 'string',
     *            value: null,
     *            readable: true,
     *            writable: true,
     *            required: false,
     *            datePattern: null,
     *            enumValues: []
     *       },
     *       ...
     *   ]
     */
    async saveVariables(variables, fields, outcome) {
        const lastProcessInst = this._lastProcessInst;
        const task = this._task;
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.saveVariables',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({variables, fields, lastProcessInst, task}),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({variables}, Array),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({fields}, Array)
        );

        // SAVE fields
        // Note: the /form/form-instance-model does not properly handle the readOnly property, which is always true
        // const filteredFields = fields.filter(el => (el.readOnly !== undefined) ? !el.readOnly && el.value : el.value);
        // const filteredFields = fields.filter(el => el.value && (el.type !== 'expression') && (el.type !== 'hyperlink'));

        // handle also 'false' on booleans
        const filteredFields = fields.filter(el => (el.type == 'boolean') || (el.value && (el.type !== 'expression') && (el.type !== 'hyperlink')));

        if (filteredFields.length > 0)
            await __WEBPACK_IMPORTED_MODULE_4__index__["formService"].updateFormInstance(task.id, task.formKey, lastProcessInst.id,  filteredFields);

        // SAVE variables
        // map input variables and fields in a format like
        // [
        //     {
        //         'name': 'variablename',
        //         'type': 'variabletype',
        //         'value': 'variablevalue',
        //         'scope': 'local'
        //     },
        //     ...
        // ]
        let mappedVariables = variables
            .filter( el => (el.writable !== undefined) ? el.writable && el.value : el.value )
            .map( el => ({name: el.id, type: el.type, value: el.value, scope: 'local'}) );

        if (outcome && task.formKey) {
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.saveVariables',
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({outcome}, String)
            );

            mappedVariables.push(
                {
                    'name': `form_${task.formKey}_outcome`,
                    'type': 'string',
                    'value': outcome,
                    'scope': 'local'
                });

        }

        const mappedFields = filteredFields
            .map( el => FlowService.mapFieldsToVariables(el));
        // Remove the common elements, taking the fields elements as
        // Join the two arrays and remove duplicates, the fields elements take the precedence
        const processVariables = Object(__WEBPACK_IMPORTED_MODULE_2__utility_ArrayUtility__["a" /* union */])(mappedVariables, mappedFields, (x, y) => x.name === y.name );

        if (processVariables.length > 0)
            await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].saveProcessVariables(lastProcessInst.id, processVariables);
    }

    /**
     * Moves to the next Task using the stored last Process Instance
     *
     * @throws {Error}                      - If missing credential or missing required parameters
     * @return {Promise<Object>}            - Promise returning an object with three arrays of objects:
     *                                        variables (form properties),
     *                                        fields (form fields)
     *                                        outcomes (form buttons)
     *                                        See getNextTask method for more information on the object format.
     *
     */
    async moveToNextTask() {
        const lastProcessInst = this._lastProcessInst;
        const task = this._task;
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getTaskAndFormData', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({lastProcessInst, task}) );

        await __WEBPACK_IMPORTED_MODULE_4__index__["taskService"].action(task.id, 'complete');
        // console.log('FlowService, moveToNextTask action complete');
        console.log('FlowService   ' + __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId + ' completes task ' + task.name);

        return this.getNextTaskAndFormData();
    }

    /**
     * Helper method used to map a field object into an object that can be stored as a variable
     *
     * @param  {Object} el          - Field object
     * @return {Object}             - Variable object
     *
     */
    static mapFieldsToVariables(el) {
        let type = el.type;
        if (type === 'text') type = 'string';
        if (type === 'multi-line-text') type = 'string';
        if (type === 'integer') type = 'long';
        if (type === 'decimal') type = 'double';
        let value = el.value;
        if (type === 'boolean') {
            if (value === 'true') value = true;
            if (value === 'false') value = false;
        }
        return {
            name: el.id,
            type: type,
            value: value,
            scope: 'local'
        }
    }

    /**
     * Helper method used to map a variable object into an object that can be stored as a field value
     *
     * @param  {Object} el          - Variable object
     * @return {Object}             - Field object
     *
     */
    static mapVariablesToFields(el) {
        let value = el.value;
        let type = el.type;
        if (type === 'boolean') {
            if (value === 'true') value = true;
            if (value === 'false') value = false;
        }
        return {
            id: el.name,
            value: value,
        }
    }


}

/* harmony default export */ __webpack_exports__["a"] = (FlowService);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return union; });
/* unused harmony export unique */
/* unused harmony export arrayToObject */
/**
 * http://stackoverflow.com/a/13319168
 * arr1 and arr2 are arrays of any length; eqFn is a function which
 * can compare two items and return true if they're equal and false otherwise
 * @param {Array} arr1 - Array of any length
 * @param {Array} arr2 - Array of any length
 * @param {Function<Boolean>} eqFn - Function which returns a Boolean
 */
function union(arr1, arr2, eqFn) {
    return unique(arr1.concat(arr2), eqFn);
}

/* // Note, original from http://stackoverflow.com/a/13319168
function union(arr1, arr2, equalityFunc) {
    let union = arr1.concat(arr2);

    for (let i = 0; i < union.length; i++) {
        for (let j = i+1; j < union.length; j++) {
            if (equalityFunc(union[i], union[j])) {
                union.splice(j, 1);
                j--;
            }
        }
    }
    return union;
}
*/

/**
 * Returns an array with unique values given the Eq Function
 * @param {Array} arr - Array that may contain duplicates
 * @param {Function<Boolean>} eqFn - A function that returns a Boolean
 */
function unique(arr, eqFn) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (eqFn(arr[i], arr[j])) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

/**
 * Convert the Array to an object
 *
 * @param  {Array}  _array    - The array to convert to an object
 * @param  {Object} [options] - Options on how to conver the array
 * @return {Object}           - The resulting object from the array
 */
function arrayToObject(_array, options = undefined) {
    const _obj = {};
    let i = 0;
    _array.forEach((obj) => {
        const key = (options && options.key) ? obj[options.key] : obj.id || ++i;
        if (key !== undefined && key !== null) {
            _obj[key] = obj;
        }
    });
    return _obj;
}




/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__ = __webpack_require__(3);



/**
 * Service handling Process specific endpoints.
 *
 */

class SnapClinicalApiService {

  constructor() {
  }

  /**
   * Start a new process or resume my existing tasks (no task claim)
   *
   * @param {Object} processData          - Object containing lookup criteria and initializations
   * @throws {Error}                      - If missing credential or missing required parameters
   * @return {Promise<Object>}            - List of tasks extended with all related information such as form, etc...
   *
   * @example
   * snapClinicalApiService.startNewOrResumeProcess(
   *          {
   *            "forceNewProcessInstance": true | false,
   *            "processDefinitionKey": "processKeyValue",
   *            "processDefinitionId": "processKeyValue:NNN:MMM",
   *            "message": "someMessage",
   *            "businessKey": "someBusinessKeyValue",
   *            "tenantId": "someTenantIdValue",
   *            "processVariables": [
   *                {
   *                "name" : "variableName",
   *                "value" : "variableValue",
   *                "valueUrl" : "http://...",
   *                "type" : "string"
   *                }
   *             ],
   *             "queryVariables": [
   *               {
   *                  "name": "variableName",
   *                  "value": "variableValue",
   *                  "operation": "equals",
   *                  "type" : "string"
   *               }
   *             ]
   *          }
   *        );
   */
  async startNewOrResumeProcess(processData) {
    Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])(this.constructor.name + ".startNewOrResumeProcess",
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({processData}),
      ( !processData.hasOwnProperty("processDefinitionKey") &&
        !processData.hasOwnProperty("processDefinitionId") &&
        !processData.hasOwnProperty("message")) ? "key value missing" : "");

    if (!processData.processVariables) processData.processVariables = [];
    
    if (! processData.processVariables.find( v => (v.name == "frontEndKey"))) {
      processData.processVariables.push({
        "name" : "frontEndKey",
        "value" : __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].frontEndKey,
        "type" : "string"
      });
    }

    const body = JSON.stringify(processData);

    return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch("/flowable-task/snap-api/get-new-or-resume-process", "POST", null, body)
      .then(response => {
        if (response.status === 200) { // 200 OK
          return response.json();
        }
        else throw new Error("startNewOrResumeProcess failed", response);
      });
  }

  /**
   * Claim & complete task and get next tasks within the same process instance.
   * This method is to be used to progress within a given process from one user task to the next.
   *
   * @param {Object} taskData           - Object containing all required info to complete task
   * @return {Promise<*|Promise<*>|PromiseLike<T>|Promise<T>>}
   *
   * @example
   * snapClinicalApiService.completeAndGetNext(
   *        {
   *          "taskId": "someId",
   *          "formDefinitionId": "form id",
   *          "processVariables" : [
   *                {
   *                "name" : "variableName",
   *                "value" : "variableValue",
   *                "valueUrl" : "http://...",
   *                "type" : "string"
   *                }
   *            ],
   *          "fields" : [
   *                {
   *                "id" : "fieldId",
   *                "value" : "fieldValue"
   *                }
   *            ],
   *          "outcome" : {
   *                "id":null,
   *                "name":"Next"
   *            }
   *        }
   * );
   */
  async completeAndGetNext(taskData) {
    Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])(this.constructor.name + ".completeAndGetNext",
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({taskData}),
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({taskData},"taskId"),
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({taskData},"formDefinitionId"),
    );

    const body = JSON.stringify(taskData);

    return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch("/flowable-task/snap-api/complete-and-get-next", "POST", null, body)
      .then(response => {
        if (response.status === 200) { // 200 OK
          return response.json();
        }
        else throw new Error("completeAndGetNext failed", response);
      });
  }


  /**
   * Executes an action on a given task.
   * @param {Object} actionData         - object defining the action to be performed.
   *                                    The object can have the following structure: <code>
   *                                    {
   *                                      "taskId": "someId",
   *                                      "action": "complete" | "claim" | "delegate" | "resolve",
   *                                      "variables": [ {
   *                                          "name" : "variableName",
   *                                          "value" : "variableValue",
   *                                          "valueUrl" : "http://...",
   *                                          "type" : "string"
   *                                          }
   *                                      ],
   *                                      "assignee": "userWhoClaimsOrToDelegateTo"
   *                                    }
   *                                    </code>
   *                                    property taskId and action are mandatory.
   *
   * @return {Promise<any>}
   *
   * @example
   *    import {client} from "snapClinical";
   *
   *    client.apiBaseUrl = "http://test.com";
   *    client.basicCredentials = "basic authentication string";
   *
   *    const actionData = {
   *        "taskId": "someId",
   *        "action":"complete",
   *        "variables": [
   *          {
   *              "name": "VariableName",
   *              "value": "VariableValue",
   *              "type": "string"
   *          }
   *        ]
   *      };
   *
   *    try {
   *      await snapClinicalApiService.taskAction(taskData);
   *    }
   *    catch(e) {
   *      console.error("task Action thown an error:", e);
   *    }
   *
   *
   */
  async taskAction(actionData) {
    Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])(this.constructor.name + ".taskAction",
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({actionData}),
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({actionData},"action")
    );

    const body = JSON.stringify(actionData);

    return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch("/flowable-task/snap-api/task-action", "POST", null, body)
      .then(response => {
        if (response.status === 200) { // 200 OK
          return response.json();
        }
        else throw new Error("taskAction failed", response);
      });
  }

  /**
   * Get my active tasks. Tasks can be filtered using various lookup criteria.
   * @param {Object} lookupData           - object defining lookup criteria in the form:
   *```
   *          {
   *            "processDefinitionKey": "processKeyValue",
   *            "processDefinitionId": "processKeyValue:NNN:MMM",
   *            "processDefinitionKeyLike": "processKeyLikeValue"
   *            "processVariables": [
   *               {
   *                  "name": "variableName",
   *                  "value": "variableValue",
   *                  "operation": "equals",
   *                  "type" : "string"
   *               }
   *             ]
   *          }
   *          ```
   * @return {Promise<any>}             - list of task items
   * @example
   *    import {client} from "snapClinical";
   *
   *    client.apiBaseUrl = "http://test.com";
   *    client.basicCredentials = "basic authentication string";
   *
   *    const lookupData = {
   *        "processDefinitionKey": "someKey",
   *        "processVariables": [
   *          {
   *              "name": "VariableName",
   *              "value": "VariableValue",
   *              "operation": "equals",
   *              "type": "string"
   *          }
   *        ]
   *      };
   *
   *    try {
   *      var result = await snapClinicalApiService.getActiveTasks(lookupData);
   *    }
   *    catch(e) {
   *      console.error("getActiveTasks thown an error:", e);
   *    }
   *
   *
   */
  async getActiveTasks(lookupData) {
    Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])(this.constructor.name + ".completeAndGetNext",
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({lookupData})
    );

    const body = JSON.stringify(lookupData);

    return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch("/flowable-task/snap-api/get-tasks", "POST", null, body)
      .then(response => {
        if (response.status === 200) { // 200 OK
          return response.json();
        }
        else throw new Error("getActiveTasks failed", response);
      });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (SnapClinicalApiService);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Print current lib version on the console log
 */
class Version {
    /**
     * Prints the current lib version on the console log
     */
    static print() {
        console.log("snapClinical JS SDK Version: " + "1.1.0" );
    }

    /**
     * Return the current lib version
     * @return (String)     - the current js sdk library version
     */
    static get() {
        return ("snapClinical JS SDK Version: " + "1.1.0" );
    }

}


/* harmony default export */ __webpack_exports__["a"] = (Version);

/***/ })
/******/ ]);
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Core {

    constructor() {}

    /**
     * With the new ES6 Dist Lib this file is referenced as external script
     * here the default 'production style' exception handling is defined
     */
    handleExceptionNative (e) {
        console.warn('Exception: ', e);

        if (window.parent) {
            window.parent.com.fc.JavaScriptGenerator.handleExceptionNative(e);
        }
    }

    reset () {
        let thisObject = this;
        Object.keys(thisObject).forEach( function(key) {
            if ((typeof thisObject[key].reset) === 'function') thisObject[key].reset();
            //console.log('type of:',typeof obj.reset);
        });
    }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (Core);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class AnimationObject {

  constructor() {}

  animationMove(id, dX, dY, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "move";
    anim.dX = dX;
    anim.dY = dY;
    anim.duration = duration;
    return anim;
  }

  animationRotate(id, angle, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "rotate";
    anim.angle = angle;
    anim.duration = duration;
    return anim;
  }

  animationScale(id, dX, dY, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "scale";
    anim.dX = dX;
    anim.dY = dY;
    anim.duration = duration;
    return anim;
  }

  animationFade(id, alpha, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "fade";
    anim.alpha = alpha;
    anim.duration = duration;
    return anim;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AnimationObject);



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ApplicationObject {

  constructor() {
    this.permissionResponseCallback = null;
  }

  configure(permissionResponseCallback) {
    this.permissionResponseCallback = permissionResponseCallback;
  }

  bringToForeground() {
    /*hs: not implementing this for now
    window.blur();
    setTimeout(window.focus, 0);
    */
  }

  sendToBackground() {
    /* hs: not implementing this for now.
    window.blur();
    */
  }

  getAppName() {
    return window.document.title;
  }

  quitApp() {
    window.close();
  }

  registerEvent(event, callback) {
  	switch(event) {
  		case 'start':
         console.log("Registering Started Event");
         $(window).ready(function() {
          if( callback != undefined ) {
            console.log("Application Started Event");
            callback();
          }
        });
  			break;
  		case 'in_background':
  			console.log("Registering background event");
        $(window).blur(function() {
           console.log("Application is in background");
           if( callback != undefined ) {
              callback();
           }
        });
        break;
  		case 'in_foreground':
        console.log("Registering foreground event");
        $(window).focus(function() {
           console.log("Application is in foreground");
           if( callback != undefined ) {
              callback();
           }
        });
  			break;
  		case 'back_button_press':
  			console.log("Registering back button press event");
        if (window.history && window.history.pushState) {
            window.history.pushState('forward', null, './#forward');
            $(window).on('popstate', function() {
              window.history.back();
              console.log("Back button event triggered");
              callback();
            });

        }
  			break;
  	}
  }

  requestPermissions() {
    //hs: in simulation we always return true for now.
    if(this.permissionResponseCallback!=null) {
      this.permissionResponseCallback(true);
    }
  }

  hasPermissionsBeenGranted() {
    return true;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ApplicationObject);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Audio Library Module
*/

class AudioLibraryObject {

    constructor() {
        this.currAudio = null;
    }

    createAudioFromResource (url) {
        console.log (url);
        let audio = document.createElement("AUDIO");
        let source = document.createElement("source");
        audio.appendChild(source);
        audio.crossOrigin = 'anonymous';
        source.src = url;
        return audio;
    }

    createAudioFromUrl (url, successCallBack, failureCallBack) {

        let audio = document.createElement("AUDIO");
        let source = document.createElement("source");
        audio.appendChild(source);
        audio.crossOrigin = 'anonymous';
        source.src = url;
        audio.onloadstart = (e) => {
            successCallBack (audio);
        };

        audio.onerror = (e) => {
          console.log('createAudioFromUrl, load error', e);
          failureCallBack(e);
        }
    }

    getDuration (audio) {
        return audio.duration;
    }

    playAudio (audio, successCallBack) {
        audio.play();
        this.currAudio = audio;
        audio.onended = function(e) {
            successCallBack(e);
        };
    }

    playAudioFrom (audio,position,successCallBack) {
        audio.currentTime = position;
        audio.play();
        this.currAudio = audio;
        audio.onended = function(e) {
            successCallBack(e);
        };
    }

    play (audio) {
        try {
            this.currAudio.play();
        } catch (e) {
            console.log (e);
        } 
    }

    pause (audio) {
        try {
            this.currAudio.pause();
        } catch (e) {
            console.log (e);
        } 
    }

    stop (audio) {
         try {
            this.currAudio.pause();
            this.currAudio.currentTime = 0;
        } catch (e) {
            console.log (e);
        } 
        
    }


}

/* harmony default export */ __webpack_exports__["a"] = (AudioLibraryObject);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ES6 imports

class BluetoothObject {

  constructor() {
    this.devices = {};
  }

  configure(scansuccesscallback, scanfailcallback, 
      devicedisconnectcallback, characteristicchangecallback) {

    this.scansuccesscallback = scansuccesscallback;
    this.scanfailcallback = scanfailcallback;
    this.devicedisconnectcallback = devicedisconnectcallback;
    this.characteristicchangecallback = characteristicchangecallback;
  }

  scanStart(timeout) {
    let parent = this;
    return navigator.bluetooth.requestDevice({filters:[{services:[ 'heart_rate' ]}]})
    .then(device => {
      parent.devices[device.id] = {};
      parent.devices[device.id].type = 'heart_rate';
      parent.devices[device.id].bledevice = device;
      parent.devices[device.id].services = new Map();
      parent.devices[device.id].characteristics = new Map();
      parent.devices[device.id].formatMap = new Map();
      parent.scansuccesscallback(device.id);
    });
  }

  scanStop() {
  
  }

  getDeviceNameForAddress(deviceAddress) {
    if( this.devices[deviceAddress] != undefined ) {
      return this.devices[deviceAddress].bledevice.name;
    }
    else {
      return "";
    }
  }

  connectToDevice(deviceAddress, successcallback) {
    let device = this.devices[deviceAddress].bledevice;
    let parent = this;
    if( !device ) {
      failurecallback("Device not found!");
      return;
    }
    
    device.addEventListener('gattserverdisconnected', event => {
      parent.devicedisconnectcallback(deviceAddress);
    });

    device.gatt.connect()
      .then(server => {
        parent.devices[deviceAddress].server = server;
        successcallback();
      })
  }

  disconnectFromDevice(deviceAddress) {
    let device = this.devices[deviceAddress].bledevice;
    if (!device) {
      return;
    }
    console.log('Disconnecting from BLE Device...' + deviceAddress);
    if (device.gatt.connected) {
      device.gatt.disconnect();
    } else {
      console.log('BLE Device ' + deviceAddress + " already disconnected");
    }
  }

  async getServicesForDevice(deviceAddress, successcallback) {
    let parent = this;
    let device = this.devices[deviceAddress];
    let server = device.server;
    let servicesUUID = [];
    
    server.getPrimaryServices()
      .then(async services => {
          for(var i=0; i<services.length; i++ ) {
              var service = services[i];
              servicesUUID.push(service.uuid);
              device.services.set(service.uuid, service);
              let characteristics = await service.getCharacteristics();
              device.characteristics.set(service.uuid, characteristics);
          }
          console.log(servicesUUID);
          successcallback(servicesUUID);
      });
  }

  getCharacteristicsForService(deviceAddress, serviceUUID) {
    let parent = this;
    let device = this.devices[deviceAddress];
    let service = device.services.get(serviceUUID);
    let charUUID = [];

    let characteristics = device.characteristics.get(serviceUUID);
    for(var i=0; i<characteristics.length; i++ ) {
          var characteristic = characteristics[i];
          charUUID.push(characteristic.uuid);
    }
    console.log(charUUID);
    console.log(characteristics);
    return charUUID;
  }

  _getCharacteristic(deviceAddress, serviceUUID, characteristicUUID) {
    let device = this.devices[deviceAddress];
    let characteristics = device.characteristics.get(serviceUUID);
    for(let i=0; i<characteristics.length; i++ ) {
      let characteristic = characteristics[i];
      if( characteristic.uuid == characteristicUUID ) {
        return characteristic;
      }
    }
    return undefined;
  }

  _getFinalValue(format, value) {
    let finalValue = value;
    switch(format) {
      case "UINT8":
        finalValue = value.getUint8(0);
        break;
      case "INT8":
        finalValue = value.getInt8(0);
        break;
      case "UINT16":
        finalValue = value.getUint16(0);
        break;
      case "INT16":
        finalValue = value.getInt16(0);
        break;
      case "UINT32":
        finalValue = value.getUint32(0);
        break;
      case "INT32":
        finalValue = value.getInt32(0);
        break;
      case "FLOAT":
        finalValue = value.getFloat32(0);
        break;
    }
    return finalValue;
  }

  readCharacteristic(deviceAddress, serviceUUID, characteristicUUID, format, successcallback) {
    let device = this.devices[deviceAddress];
    device.formatMap.set(characteristicUUID, format);

    let characteristic = this._getCharacteristic(deviceAddress, serviceUUID, characteristicUUID);
    if( characteristic!= undefined ) {
      characteristic.readValue()
      .then(value => {
        let finalValue = _getFinalValue(format, value);
        successcallback(finalValue);
      });
    }
  }

  writeCharacteristic(deviceAddress, serviceUUID, characteristicUUID, format, value, 
    successcallback, failurecallback) {
    let characteristic = this._getCharacteristic(deviceAddress, serviceUUID, characteristicUUID);
    if( characteristic != undefined ) {

    switch(format) {
        case "UINT8":
          finalValue = Uint8Array.of(value);
          break;
        case "INT8":
          finalValue = Int8Array.of(value);
          break;
        case "UINT16":
          finalValue = Uint16Array.of(value);
          break;
        case "INT16":
          finalValue = Int16Array.of(value);
          break;
        case "UINT32":
          finalValue = Uint32Array.of(value);
          break;
        case "INT32":
          finalValue = Iint32Array.of(value);
          break;
        case "FLOAT":
          finalValue = Float32Array.of(value);
          break;
      }
      characteristic.writeValue(finalValue)
      .then(_ => {
        successcallback();
      })
      .catch(error => {
        failurecallback();
      });
    }

  }

  notifyCharacteristicChange(deviceAddress, serviceUUID, characteristicUUID, state) {
    let parent = this;
    let device = this.devices[deviceAddress];
    let characteristic = this._getCharacteristic(deviceAddress, serviceUUID, characteristicUUID);
    let format = device.formatMap.get(characteristicUUID);

    if( characteristic != undefined ) {
      if( state == true ) {
        characteristic.startNotifications()
        .then(characteristic => {
          characteristic.addEventListener('characteristicvaluechanged', event => {
            console.log("Data = " + event.target.value);
            if( parent.characteristicchangecallback != undefined) {
               let finalValue = parent._getFinalValue(format, event.target.value);
               parent.characteristicchangecallback(deviceAddress, serviceUUID, 
                characteristicUUID, finalValue);
            }
          });
        });  
      }
      else {
        characteristic.stopNotifications();
      }  
    }
    
  } 

}

/* harmony default export */ __webpack_exports__["a"] = (BluetoothObject);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(1);
// ES6 imports


class ButtonObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */] {

  constructor() {
    super(" .btn");

    const self = this;

    // Set default behaviours
    $(document).ready(function() {
      let buttonEls = $(".element.fc.Button");
      // console.log('ButtonObject, buttonEls: ', buttonEls);
      buttonEls.each((i, obj) => {
        // console.log('.element.fc.Button: ', obj);
        let elements = obj.getElementsByClassName("foreground");
        let image = (elements.length > 0) ? elements[0] : null;

        elements = obj.getElementsByClassName("highlight");
        let imageHighlight = (elements.length > 0) ? elements[0] : null;
        // if (imageHighlight) console.log('ButtonObject, imageHighlight element', imageHighlight);

        if (imageHighlight) {
          obj.onmousedown = () => {
            // console.log("onmousedown, button", obj.getAttribute("obj-name"));
            imageHighlight.style.display = "";
            image.style.display = "none";
          };
          obj.onmouseup = () => {
            // console.log("onmouseup, button", obj.getAttribute("obj-name"));
            image.style.display = "";
            imageHighlight.style.display = "none";
          };
        }
        else {
          let button = obj.getElementsByClassName("btn")[0];
          let color = button.style.backgroundColor;
          let invertedColor = self.invertColor(color);
          // console.log("Standard case, button color", color);

          obj.onmousedown = () => {
            // console.log("onmousedown, button", obj.getAttribute("obj-name"));
            button.style.backgroundColor = invertedColor;
          };
          obj.onmouseup = () => {
            // console.log("onmouseup or out, button", obj.getAttribute("obj-name"));
            button.style.backgroundColor = color;
          };
        }

      });
    });

    this.getProperty.Text = (objName) => {
      let buttonTextEl = this.getTextElemFromName(objName).find(".text");
      return buttonTextEl.html();
    };

    this.setProperty.Text = (objName, value) => {
      let buttonTextEl = this.getTextElemFromName(objName).find(".text");
      buttonTextEl.html(value);
    };

    this.setProperty["Text Alignment"] = (objName, value) => {
      let buttonEl = this.getTextElemFromName(objName);
      buttonEl.css("text-align", value.toLowerCase());
      buttonEl.css("justify-content", this.toFlex(value.toLowerCase()));
    };

    this.getProperty['Image'] = function(objName) {
      let elemSelector = self.getElemFromName(objName);
      let el = $(elemSelector).find('img');
      return el.get()[0];
    };

    this.setProperty['Image'] = function(objName, image) {

        // let elemSelector = '[obj-name="' + objName + '"]';
        // let elem = $('[obj-name="' + objName + '"]').find('img')
        // elem.attr('src', image.src);

        // getting the native element
        let $oldElem = $('[obj-name="' + objName + '"]').find('img');
        let oldElem = $oldElem.get()[0]; // getting the native element

        // make a copy of the input image
        // this copy will replace the current immage
        let newElem = image.cloneNode();

        // copy all existing img attributes to the new element except src
        for (let i = 0; i < oldElem.attributes.length; i++)
        {
            let attribute = oldElem.attributes[i];
            if (! newElem.getAttribute(attribute.name))
                newElem.setAttribute(attribute.name, attribute.value);
        }
        $oldElem.replaceWith(newElem);
    };
  }

  toFlex(align) {
    if (align === "left")
      return "flex-start";
    else if (align === "right")
      return "flex-end";
    else
      return "center";
  }

  invertColor(color) {
    // console.log('invertColor input:', color);
    let rgbin = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (!rgbin)
      rgbin = color.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (!rgbin) {
      console.error("invertColor: unable to detect color");
      return rgbin;
    }
    if (rgbin.length === 4)
      rgbin.splice(0, 1);
    else
      return color;
    let rgbout = [];
    for (let col of rgbin) {
      let val = parseInt(col);
      rgbout.push( (val >= 128) ? (val - 32 ) : (val + 32) );
    }

    let result = `rgb(${rgbout[0]}, ${rgbout[1]}, ${rgbout[2]})`;
    if (rgbout[3]) {
      result = `rgba(${rgbout[0]}, ${rgbout[1]}, ${rgbout[2]}, ${rgbout[3]})`;
    }
    return result;
  }

  touchmove_x_y(elemSelector, callback){
    $(elemSelector).on("mousedown touchstart", function(event) {
      $(document.body).on("mousemove touchmove", function(touchmove){
        var ose = $(document.body).offset();
        var mousemove = touchmove.type === "mousedown"||touchmove.type === "touchstart",
          pageX = mousemove ? touchmove.targetTouches[0].clientX : touchmove.clientX - ose.left,
          pageY = mousemove ? touchmove.targetTouches[0].clientY : touchmove.clientY - ose.top;
        if(pageX<0 ||pageY<0){
          pageX = 0;
          callback(pageX,pageY);
        }else{
          callback(pageX,pageY);
        }

      });
      $(document.body).on("mouseup touchend", function(release){
        $(document.body).off("mousemove touchmove"),
        $(document.body).off("mousedown touchstart");
      });
    });
  }

  longclick_ev(elemSelector,callback){
    var timeout_id = 0,
      hold_time = 500;
    $(elemSelector).on("mousedown touchstart",function(e) {
      e.stopPropagation();
      timeout_id = setTimeout(function(){
        callback();
      },hold_time);
    }).bind("mouseup mouseleave touchend", function(ev) {
      clearTimeout(timeout_id);
    });
  }

  getElemFromName (objName) {
    return $("[obj-name= \"" + objName + "\"]");
  }
}
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ButtonObject);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Camera Library Module
*/

class CameraLibraryObject {

    constructor() {
        
    }

    showCameraInPictureMode (callback) {
        
    } 

}

/* harmony default export */ __webpack_exports__["a"] = (CameraLibraryObject);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Camera View Module */

class CameraViewObject {

    constructor() {
        
    }

    link (obj,camType) {
      //Ignore camType as HTML5 as only one
      let ele = '[obj-name= "' + obj + '"]';
      $(ele).children().remove(); //remove all children
      let video = document.createElement('video');
      video.width = $(ele).width();
      video.height = $(ele).height();
      $(ele).append(video);
      // Get access to the camera!
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
          window.localStream = stream;
          video.src = window.URL.createObjectURL(stream);
          video.play();
        });
      }

    } 

    unlink (obj) {
      let ele = '[obj-name= "' + obj + '"]';
      try {
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
      } catch (e) {
        let error = new Error("No video playing to stop.");
        error.name = "CameraViewException";
        throw error;
      }
      
    }

}

/* harmony default export */ __webpack_exports__["a"] = (CameraViewObject);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Created on 23/11/2017 */

class ClockObject {

  constructor() {
    this.chronoCounter = 0;
    this.chronoCallback = null;
    this.alarmId = null;
    this.namedAlarmCallback = null;
    this.datePicker = null;
    this.selectedDate = "";
    this.dateSelectedCallback = null;

    this.timePicker = null;
    this.selectedTime = "";
    this.timeSelectedCallback = null;
  }



  createTimer (interval,repeats) {
    let timerVar = setInterval(function(){ 
    },interval);

    return [timerVar,interval,repeats];

  }

  startTimer (timer,callback) {

    let count = 0; // Counter
    let timerVar = timer[0];
    let interval = timer[1] * 1000; //Convert to ms
    let repeats = timer[2];

    //Clear the above created one
    clearInterval(timerVar);

    timerVar = setInterval(function(){ 
      callback(timerVar);

      if (++count === repeats) {
        clearInterval(timerVar);
        $(`#timer-${timer[0]}`).attr('timer-status',false);
      }

    },interval);
    $('body').append(`<input id = "timer-${timer[0]}" value = "${timerVar}" type = "hidden" />`); // keeping the reference of the new ID
    $(`#timer-${timer[0]}`).attr('timer-status',true);
  }

  stopTimer (timer) {
    let timerId = $(`#timer-${timer[0]}`).val();
    clearInterval(timerId);
    $(`#timer-${timer[0]}`).attr('timer-status',false);
  }

  isTimerComplete (timer) {
    let result = $(`#timer-${timer[0]}`).attr('timer-status');
    
    if (result == "true") {
      return false;
    }
    return true;
    
  }

  /* Chrono */
  createChrono () {
    this.timeBegan = null
    this.timeStopped = null
    this.stoppedDuration = 0
    this.chronoId = null;

    return this.chronoId;
  }

  startChrono (callback) {
    var self = this;
    this.chronoCallback = callback;

    if (this.timeBegan === null) {
      this.timeBegan = new Date();
    }

    if (this.timeStopped !== null) {
      this.stoppedDuration += (new Date() - this.timeStopped);
    }

    this.chronoId = setInterval(function() {
      var currentTime = new Date()
      , timeElapsed = new Date(currentTime - self.timeBegan - self.stoppedDuration)
      , hour = timeElapsed.getUTCHours()
      , min = timeElapsed.getUTCMinutes()
      , sec = timeElapsed.getUTCSeconds()
      , ms = timeElapsed.getUTCMilliseconds();
      self.chronoCounter = (min < 1 ? sec : min*60+sec) + "."+ 
      (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);
      callback(this.chronoId);
    },1);
    
  }

  chronoTimeElapsed () {
    return this.chronoCounter;
  }

  stopChrono () {
    clearInterval(this.chronoId);
    this.stoppedDuration = 0;
    this.timeBegan = null;
    this.timeStopped = null;
  }

  pauseChrono () {
    this.timeStopped = new Date();
    clearInterval(this.chronoId);
  }

  resumeChrono () {
    this.startChrono(this.chronoCallback);
  }

  /* Alarms */
  createAlarm (time,repeat) {
    return [time,repeat];
  }

  scheduleAlarm (alarm, callback) {

    let self = this;
    let scheduledTime = alarm[0];
    this.alarmId = setInterval(function(){
        let currTime = new Date();
        if (currTime.toString() == scheduledTime.toString()) {
          clearInterval(self.alarmId);
          callback(self.alarmId);
        }
    },1000);

  }

  removeAlarm (alarm) {
    clearInterval(this.alarmId);
  }

  createAlarmWithName(name, time, callback) {
    let parent = this;

    let alarmId = setInterval(function() {
        let currTime = new Date();
        if (currTime.toString() == time.toString()) {
          clearInterval(alarmId);
          callback(name);
        }
    },1000);
  }

  /* Date and Time Picker */
  pickDate (callback) {
    let parent = this;
    parent.dateSelectedCallback = callback;
    if( parent.datePicker == null ) {
      parent.datePicker = 

      $(`<div id="modal" class="modal fade pickerModal">
          <div class="modal-dialog-sm" style = "position:relative;background:#fff;width:300px; margin:0 auto;padding:25px;padding-left:30px;">
              <div id="datepicker" style = "margin-bottom:20px;"></div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-dismiss="modal">Select</button>
                  <span id = "action-btn-container">
                  </span>
              </div>
          </div>    
      `);
      $(parent.datePicker).find("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        onSelect: function(dateText) {
          parent.selectedDate = $(parent.datePicker).find("#datepicker").datepicker( "getDate" );
        }
      });
      
      $(parent.datePicker).find(".btn").click(function(e) {
          parent.selectedDate = $(parent.datePicker).find("#datepicker").datepicker( "getDate" );
          $(parent.datePicker).modal('hide');
          parent.dateSelectedCallback(parent.selectedDate);
      });
    }

    $(parent.datePicker).modal('show');
    $(parent.datePicker).find("#datePicker").datepicker('setDate', new Date() );
    
  }

  pickTime (callback) {
    parent.timeSelectedCallback = callback;
    if( parent.timePicker == null ) {
      parent.timePicker = 

      $(`<div id="modal" class="modal fade pickerModal">
          <div class="modal-dialog-sm" style = "position:relative;background:#fff;width:300px; margin:0 auto;padding:25px;padding-left:30px;">
              <div id="timepicker" style = "margin-bottom:20px;"></div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-dismiss="modal">Select</button>
                  <span id = "action-btn-container">
                  </span>
              </div>
          </div>    
      `);
      $(parent.timePicker).find("#timepicker").timepicker({
        controlType: 'select',
        showButtonPanel:false,
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        stepMinute: 15,
        oneLine: true,
        timeFormat: 'hh:mm tt',
        onSelect: function(time) {
          parent.selectedTime = $(parent.timePicker).find("#timepicker").datetimepicker( "getDate" );
        }
      });
      $(parent.timePicker).find(".btn").click(function(e) {
          parent.selectedTime = $(parent.timePicker).find("#timepicker").datetimepicker( "getDate" );
          $(parent.timePicker).modal('hide');
          parent.timeSelectedCallback(parent.selectedTime);
      });
    }
    $(parent.timePicker).find("#timepicker").datetimepicker('setDate', new Date() );
    $(parent.timePicker).modal('show');
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ClockObject);



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Created by Ravish on 1/05/2017 */

// ES6 imports

class ColourLibraryObject {

  constructor() {}

  getColourFromText (str) {
    return str;
  }

  getRgbFromColour (colour) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colour);
    let arr = [];
    arr.push(parseInt(result[1], 16));
    arr.push(parseInt(result[2], 16));
    arr.push(parseInt(result[3], 16));
    return arr;
  }

  getColourFromHsv (h,s,v) {
    let rgb = this.hsvToRgb(h,s,v);
    let hex = this.rgbToHex (rgb[0],rgb[1],rgb[2]);
    return hex;
  }

  getHsvFromColour (colour) {
    let rgb = this.getRgbFromColour(colour);
    let hsv = this.rgb2hsv (rgb[0],rgb[1],rgb[2]);
    return hsv;
  }

  isColourDark (colour) {
    let luma = this.getLuma (colour);
    if (luma < this.getLumaTreshold()) {
      return true;
    }
  }

  isColourLight (colour) {
   let luma = this.getLuma (colour);
   if (luma > this.getLumaTreshold()) {
      return true;
    }
  }

  getLuma (colour) {
    let c = colour.substring(1);  // strip #
    let rgb = parseInt(c, 16);   // convert rrggbb to decimal
    let r = (rgb >> 16) & 0xff;  // extract red
    let g = (rgb >>  8) & 0xff;  // extract green
    let b = (rgb >>  0) & 0xff;  // extract blue

    return 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  }

  getLumaTreshold () {
    return 150;
  }

  getReadabilityTreshold () {
    return 120;
  }

  getLuminosity (colour) {
    return this.getLuma(colour);
  }

  rgb2hsv () {
    let rr, gg, bb,
      r = arguments[0] / 255,
      g = arguments[1] / 255,
      b = arguments[2] / 255,
      h, s,
      v = Math.max(r, g, b),
      diff = v - Math.min(r, g, b),
      diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };

    if (diff == 0) {
      h = s = 0;
    } else {
      s = diff / v;
      rr = diffc(r);
      gg = diffc(g);
      bb = diffc(b);

      if (r === v) {
        h = bb - gg;
      }else if (g === v) {
        h = (1 / 3) + rr - bb;
      }else if (b === v) {
        h = (2 / 3) + gg - rr;
      }
      if (h < 0) {
        h += 1;
      }else if (h > 1) {
        h -= 1;
      }
    }
    return [
      Math.round(h * 360),
      Math.round(s * 100),
      Math.round(v * 100)
    ];
  }

  hsvToRgb (h, s, v) {
    let r, g, b;
    let i;
    let f, p, q, t;
     
    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));
     
    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;
     
    if(s == 0) {
      // Achromatic (grey)
      r = g = b = v;
      return [
        Math.round(r * 255), 
        Math.round(g * 255), 
        Math.round(b * 255)
      ];
    }
     
    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));
     
    switch(i) {
      case 0:
        r = v;
        g = t;
        b = p;
      break;
     
      case 1:
        r = q;
        g = v;
        b = p;
      break;
     
      case 2:
        r = p;
        g = v;
        b = t;
      break;
     
      case 3:
        r = p;
        g = q;
        b = v;
      break;
     
      case 4:
        r = t;
        g = p;
        b = v;
      break;
     
      default: // case 5:
        r = v;
        g = p;
        b = q;
    }
     
    return [
      Math.round(r * 255), 
      Math.round(g * 255), 
      Math.round(b * 255)
    ];
  }

  componentToHex(c) {
    let hex = Math.round(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  isColour (colour) {
    let result  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colour);
    return result;
  }

  mixColour (c1,c2,ratio) {
    return this.blendColours(c1,c2,ratio);
  }

  isReadableOn (c1,c2) {
    let luma1 = this.getLuma (c1);
    let luma2 = this.getLuma (c2);
    let diff = Math.abs(luma2 - luma1);
    console.log (luma1,luma2,diff);
    if (diff > this.getReadabilityTreshold()) {
      return true;
    }
  }

  blendColours(c1, c2, percentage) {
    // check input
    c1 = c1 || '#000000';
    c2 = c2 || '#ffffff';
    percentage = percentage || 0.5;

    // 1: validate input, make sure we have provided a valid hex
    if (c1.length != 4 && c1.length != 7)
      throw new error('colours must be provided as hexes');

    if (c2.length != 4 && c2.length != 7)
      throw new error('colours must be provided as hexes');    

    if (percentage > 1 || percentage < 0)
      throw new error('percentage must be between 0 and 1');


    // 2: check to see if we need to convert 3 char hex to 6 char hex, else slice off hash
    //      the three character hex is just a representation of the 6 hex where each character is repeated
    //      ie: #060 => #006600 (green)
    if (c1.length == 4)
      c1 = c1[1] + c1[1] + c1[2] + c1[2] + c1[3] + c1[3];
    else
      c1 = c1.substring(1);
    if (c2.length == 4)
      c2 = c2[1] + c2[1] + c2[2] + c2[2] + c2[3] + c2[3];
    else
      c2 = c2.substring(1);

    console.log('valid: c1 => ' + c1 + ', c2 => ' + c2);

    // 3: we have valid input, convert colors to rgb
    c1 = [parseInt(c1[0] + c1[1], 16), parseInt(c1[2] + c1[3], 16), parseInt(c1[4] + c1[5], 16)];
    c2 = [parseInt(c2[0] + c2[1], 16), parseInt(c2[2] + c2[3], 16), parseInt(c2[4] + c2[5], 16)];

    console.log('hex -> rgba: c1 => [' + c1.join(', ') + '], c2 => [' + c2.join(', ') + ']');

    // 4: blend
    let c3 = [ 
      (1 - percentage) * c1[0] + percentage * c2[0], 
      (1 - percentage) * c1[1] + percentage * c2[1], 
      (1 - percentage) * c1[2] + percentage * c2[2]
    ];

    console.log('c3 => [' + c3.join(', ') + ']');

    // 5: convert to hex
    c3 = '#' + this.componentToHex(c3[0]) + this.componentToHex(c3[1]) + this.componentToHex(c3[2]);

    console.log(c3);

    // return hex
    return c3;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (ColourLibraryObject);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Stub for connio object
** Created by Harish Shanthi Kumar on 16/12/2016
*/

class ConnioObject extends com.fc.JavaScriptDistLib.ConnioCore {

  constructor() {
    super();
    this.MQTTClient = null,
    this.MQTTMessageRecvCallback =  null
  }

  configureMQTT() {
    let parent = this;
    if ( !this.MQTTClient ) {
      try {
        if( this.config.BaseURL === '' || this.config.KEY === '' || this.config.Secret === '' ) {
          console.log("Please go to File -> Connio Properties and set credentials.");
        }

        if( this.config.MQTTHost !== '' && this.config.MQTTPort !== '' && this.config.MQTTCientID !== '' &&
          this.config.MQTTUsername !== '' && this.config.MQTTPassword !== '' && this.config.App !== '' ) {
          this.MQTTClient = new Paho.MQTT.Client(this.config.MQTTHost, this.config.MQTTPort, this.config.MQTTCientID);
          // set callback handlers
          this.MQTTClient.onConnectionLost = function(responseObject) {
            parent.handleMQTTConnectionLost(responseObject);
          };
          this.MQTTClient.onMessageArrived = function(message) {
            parent.handleMQTTMessage(message);
          };
        }
        else {
          console.log("Please go to File -> Connio Properties and set credentials.");
        }
      }
      catch(e) {
        console.log("Some of the properties are missing. Go to File->Connio Properties");
      }
    }

  }
  //HS: Deploy Alert!! All runtime objects needs to be reset here!
  reset() {
    this.MQTTClient = null;
    this.MQTTMessageRecvCallback = null;
  }

  connioStartTrackingPropertyChanges(callback) {
    this.configure();
    this.configureMQTT();
    this.MQTTMessageRecvCallback = callback;
    this.connio_mqtt_connect();
  }

  connioStopTrackingPropertyChanges() {
    this.connio_mqtt_disconnect();
  }


  connioReadData(device, successcallback, failurecallback) {
    let parent = this;
    this.configure();
    let url = this.config.BaseURL + "/data/devices/" + device;
    $.ajax(
      {
        url: url,
        type: 'GET',
        headers: {
          "Authorization": "Basic " + btoa(this.config.KEY + ":" + this.config.Secret)
        },
        success: (response) => {
          successcallback(response);
        },
        error: (xhr, code, msg) => {
          failurecallback(msg);
          console.log("Could not read data.");
        }
      });
  }

  connionGetValue(data, valueType, propertyName) {
    this.configure();
    let properties = data.properties;
    if( (properties !== undefined) && (properties.length>0) ) {
      for(let i=0; i<properties.length; i++) {
        let property = properties[i];
        let qname = property.descriptors.qname;

        if( qname.indexOf(propertyName) !== -1)  {
          let value = property.value[valueType];
          if( value!==undefined ) {
            return value;
          }
        }
      }
    }
    return "";
  }

  connioGetDeviceName(data, id) {
    this.configure();
    let devices = data.results;
    try {
      for(let i=0; i<devices.length; i++) {
        let device = devices[i];
        if( device.id === id ) {
          return device.name;
        }
      }
    }
    catch(e) {

    }

    return "";
  }

  connioGetDeviceLocation(data, id) {
    this.configure();
    let devices = data.results;
    try {
      for(let i=0; i<devices.length; i++) {
        let device = devices[i];
        if( (device.id === id) || (device.name === id) ) {
          let locationObj = {lat: device.location.geo.lat, lng: device.location.geo.lon};
          return locationObj;
        }
      }
    }
    catch(e) {
    }

    return "";
  }

  connioWriteData(device, value, property, successcallback, failurecallback) {
    let parent = this;
    this.configure();
    let url = this.config.BaseURL + "/data/devices/" + device + "/properties/" + property;
    let data = {};
    data.dps = [];
    let val = {};
    val.t = new Date().toISOString();
    val.v = value;
    data.dps.push(val);

    $.ajax(
      {
        url: url,
        type: 'POST',
        headers: {
          "Authorization": "Basic " + btoa(this.config.KEY + ":" + this.config.Secret),
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        dataType: "json",
        data: JSON.stringify(data),
        success: function (response) {
          successcallback(response);
        },
        error: function(xhr, code, msg) {
          failurecallback(msg);
          console.log("Could not write data.");
        }
      });
  }

  connioExecuteMethod(device, method, data, successcallback, failurecallback) {
    this.configure();
  }

  connioReadHistorical(device, property, timeStart, timeEnd, descending, limit, successcallback, failurecallback) {
    let parent = this;
    this.configure();
    let url = this.config.BaseURL + "/data/devices/" + device + "/properties/" + property + "?";

    if( descending ) {
      let sorting = (descending ? "-" : "") + "source.time";
      url += "sort=" + sorting;
    }
    else {
      url += "sort=-source.time";
    }

    if( limit ) {
      url += "&limit=" + limit;
    }

    if (timeStart && timeEnd) {
      url += "&q=source.time:(" + timeStart.toISOString() + "+TO+" + timeEnd.toISOString() + ")";
    }

    $.ajax(
      {
        url: url,
        type: 'GET',
        headers: {
          "Authorization": "Basic " + btoa(this.config.KEY + ":" + this.config.Secret)
        },
        success: (response) => {
          let timeList = jsonPath(response, "$.results[:].t");
          let valueList = jsonPath(response, "$.results[:].v");
          let formattedTimeList = [];
          for (let i=0;i<timeList.length;i++) {
            formattedTimeList.push(com.fc.JavaScriptDistLib.TimeLibrary.dateFormat(new Date (timeList[i]),'MMM-d HH:mm a'));
          }
          timeList.reverse();
          formattedTimeList.reverse();
          successcallback(formattedTimeList, valueList);
        },
        error: (xhr, code, msg) => {
          failurecallback(msg);
          console.log("Could not read historical.");
        }
      });
  }

  connio_mqtt_connect() {
    console.log("Connecting to Connio MQTT...");
    let parent = this;
    try {
      this.MQTTClient.connect( {
        onSuccess: function() {
          console.log("Connected to Connio MQTT...");
          parent.subscribeToTopic();
        },
        userName : this.config.MQTTUsername,
        password : this.config.MQTTPassword,
        keepAliveInterval: 25,
        timeout: 60,
        useSSL: true
      });
    }
    catch(e) {
      console.log("Connio MQTT connection failed.")
    }
  }

  connio_mqtt_disconnect() {
    console.log("Disconnecting Connio MQTT...");
    this.MQTTClient.disconnect();
  }

  subscribeToTopic() {
    console.log("Subscribing to topic...");
    let parent = this;
    let subscribeOptions = {
      qos: 0,  // QoS
      invocationContext: {foo: true},
      onSuccess: (context) => {
        parent.handleMQTTSubscribeSuccess(context);
      },
      onFailure: (context) => {
        parent.handleMQTTSubscribeFailed(context);
        console.log("Could not subscribe to topic");
      },
      timeout: 10
    };

    this.MQTTClient.subscribe(this.config.MQTTTopic, subscribeOptions);
  }

  handleMQTTConnectionLost(responseObject) {
    console.log("Connection Lost: " + responseObject.errorMessage);
  }

  handleMQTTSubscribeSuccess(context) {
    console.log("Subscribe success");
  }

  handleMQTTSubscribeFailed(context) {
    console.log("Subscribe failed");
  }

  handleMQTTMessage(message) {
    //console.log("Connio MQTT Message Arrived: " + message.destinationName + " " + message.payloadString);
    if( this.MQTTMessageRecvCallback ) {
      let messageArray = message.destinationName.split("/");
      this.MQTTMessageRecvCallback(messageArray[4], messageArray[6], message.payloadString);
    }
  }

  ConnioConfigException(snappMessage, msg) {
    this.name = "ConnioConfigException";
    this.snappMessage = snappMessage;
    //custom message from smapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  }

  ConnioNetworkException(snappMessage, msg) {
    this.name = "ConnioNetworkException";
    this.snappMessage = snappMessage;
    //custom message from smapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  }


  ConnioMQTTException(snappMessage, msg) {
    this.name = "ConnioMQTTException";
    this.snappMessage = snappMessage;
    //custom message from smapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ConnioObject);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
/**
 * Created by lorenzo on 05/04/17.
 */



class ContainerObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor() {

        super(' .container');
    }
}

// ES6 exports

/* harmony default export */ __webpack_exports__["a"] = (ContainerObject);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ES6 imports

class DeviceObject {

  constructor() {
    var self = this;
    try {
      navigator.getBattery().then(function(battery) {
        self.batteryInfo = battery;
      });
    } catch (e) {
      this.batteryInfo = {};
    }
  }

  getBatteryPercentage () {
    return this.batteryInfo.level * 100;
  }

  getBatteryStatus () {
    return this.batteryInfo.charging;
  }

  monitorBatterylevel (battery,callback) {
    navigator.getBattery().then(function(b) {
      b.addEventListener('levelchange', function() {
        if ((b.level * 100) < battery) {
          callback(b.level*100);
        }
      });
    });
  }

}

/* harmony default export */ __webpack_exports__["a"] = (DeviceObject);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by Ravish S on 21/11/17.
*/

class DialogObject {
    
    constructor() {
        this.closeText = "Close";
        this.actionText = "Button";
        this.dialog = null;
    }

    create (title,message) {
        this.dialog = 
            $(`<div id="modal" class="modal fade">
                <div class="modal-dialog-sm" style = "position:relative;background:#fff;margin:50px;">
                     
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">${title}</h4>
                    </div>
                    <div class="modal-body">
                        <p>${message}</p>                
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default cancel-btn" data-dismiss="modal">${this.closeText}</button>
                        <span id = "action-btn-container">
                        </span>
                    </div>
                </div>    
            `);
        return this.dialog;
    }

    addCancelBtn (title,dialog) {
       this.closeText = title.replace(/'/g,"");
    } 

    addBtn (title,dialog) {
        title = title.replace(/'/g,"");
        let button = '<button type="button" class="btn btn-primary action-btn">'+title+'</button>';
        $(this.dialog).find("#action-btn-container").append(button);
    }

    show (dialog,success) {
        $(dialog).modal('show');
        $(dialog).find(".cancel-btn").text(this.closeText);
        //$(dialog).find(".action-btn").text(this.actionText);
        $(dialog).find(".action-btn").click(function(e) {
            $(dialog).modal('hide');
            success($(this).html());
        });
    }

}

/* harmony default export */ __webpack_exports__["a"] = (DialogObject);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ES6 imports

class DictionaryObject {

  constructor() {}

  createEmptyDictionary () {
    var dict = {};
    return dict;
  }

  createDictionary(key, value) {
    var dict = {};
    for (var i=0; i < key.length; i++){
      dict[key[i]] = value[i];
    }
    return dict;
  }

  removeAllKeys (dictionary) {
    for( var key in dictionary ) {
      delete dictionary[key];
    }
    return dictionary;
  }

  getKeys (dictionary) {
    var keys = [];
    for( var key in dictionary ) {
      keys.push(key);
    }
    return keys;
  }

  getDictValue (dictionary,key) {
    if( dictionary != undefined ) {
      return dictionary[key];  
    }
    else {
      return "";
    }
    
  }

  setDictValue (dictionary,key,value) {
    if( dictionary != undefined ) {
      dictionary[key] = value;  
    }
  }

  removeDictKey (dictionary,key) {
    if( dictionary != undefined ) {
      delete dictionary[key];  
    }
  }

  conatinedInDict (dictionary,key) {
    if( dictionary != undefined ) {
      return (dictionary[key] != undefined ) ? true : false;  
    }
    else {
      return false;
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (DictionaryObject);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DocuSignObject {

  constructor() {
   this.config = {
        baseUrl: "",
        apiUrl: "",
        userId: "",
        password: "",
        integratorKey: "",
        demo: ""
      };
  }

  configure(config) {
      let properties;
      if (config) {
          properties = JSON.parse(config);
          if (properties) {
              let demo = properties.api.demo;

              if( demo == "true" ) {
                  this.config.baseUrl = "https://demo.docusign.net/restapi/v2"
              } 
              else {
                  this.config.baseUrl =  "https://www.docusign.net/restapi/v2";
              }
              this.config.userId = properties.api.userId;
              this.config.password = properties.api.password;
              this.config.integratorKey = properties.api.integratorKey;
          }
      }
  }

  createRecipent(role, name, email, clientId) {
      var recipent = {};
      recipent.role = role;
      recipent.name = name;
      recipent.email = email;
      recipent.clientId = clientId;
      return recipent;
  }

  addFieldToRecipient(recipent, key, value) {
    recipent[key] = value;
  }

  async createSigningLinkFromTemplate(templateId, recipent, redirectUrl, successcallback, failurecallback) {
    try {
      // #1 get the base url
      let setupResponse = await this.setup();
      if(setupResponse!=undefined) {
        this.config.apiUrl = this._getDefaultLoginAccount(setupResponse.loginAccounts).baseUrl;
        console.log(this.config.apiUrl);
        // #2 create envelope
        let createEnvelopeResponse = await this.createEnvelopeFromTemplate(templateId, recipent);
        if( createEnvelopeResponse!=undefined ) {
          let envelopeId = createEnvelopeResponse.envelopeId;
          console.log(envelopeId);
          // #3 create signing link
          let signingResponse = await this.createSigningLinkFromEnvelope(envelopeId, recipent, redirectUrl);
          if( signingResponse!=undefined ) {
            let signingUrl = signingResponse.url;
            console.log(signingUrl);
            successcallback(signingUrl);
          }
        }
      }
    }
    catch (error) {
      console.log(error.responseText);
      failurecallback(error.responseText);
    } 
  }

  async setup() {
    return await $.ajax({
        url: this.config.baseUrl + "/login_information?api_password=true",
        type: 'GET',
        headers: {
          "X-DocuSign-Authentication": JSON.stringify({"Username":this.config.userId,"Password":this.config.password,"IntegratorKey": this.config.integratorKey}),
          "Content-Type": "application/json"
        }
      });
  }

  async createEnvelopeFromTemplate(templateId, recipent) {
      var data = 
      {
        "status": "sent",
        "templateId": templateId,
        "templateRoles": [
          {
            "clientUserId": recipent.clientId,
            "email": recipent.email,
            "name": recipent.name,
            "roleName": recipent.role,
            "tabs": {
              "textTabs":[]
            }
          }
        ]
      };
      
      for (var key in recipent) {
        if (recipent.hasOwnProperty(key)) {
          var val = recipent[key];
          var textEntry = {
            "tabLabel" : key,
            "value": val
          }
          data.templateRoles[0].tabs.textTabs.push(textEntry);
        }
      }
      
      return await $.ajax({
          url: this.config.apiUrl + "/envelopes",
          type: 'POST',
          headers: {
            "X-DocuSign-Authentication": JSON.stringify({"Username":this.config.userId,"Password":this.config.password,"IntegratorKey": this.config.integratorKey}),
            "Content-Type": "application/json"
          },
          dataType: "json",
          data: JSON.stringify(data)
        });
  }

  async createSigningLinkFromEnvelope(envelopeId, recipent, redirectUrl) {
      let data = 
      {
        "returnUrl": redirectUrl,
        "authenticationMethod": "None",
        "email": recipent.email,
        "userName": recipent.name,
        "clientUserId": recipent.clientId
      };
      return await $.ajax({
            url: this.config.apiUrl + "/envelopes/" + envelopeId + "/views/recipient",
            type: 'POST',
            headers: {
              "X-DocuSign-Authentication": JSON.stringify({"Username":this.config.userId,"Password":this.config.password,"IntegratorKey": this.config.integratorKey}),
              "Content-Type": "application/json"
            },
            dataType: "json",
            data: JSON.stringify(data)
        });
  }

  getSigningEventFromUrl(url) {
      let parseString = "?event=";
      let index = url.indexOf(parseString);
      if( index > 0 ) {
          return url.substring(index+parseString.length);
      }
      return "";
  }

  _getDefaultLoginAccount(accounts) {
    for( var i=0; i<accounts.length; i++) {
      if(accounts[i].isDefault == "true") {
        return accounts[i];
      }
    }
  }
}

// export class to a global variable for use of the JavaScriptDistLib (only)
var com = com || {};
com.fc = com.fc || {};
com.fc.JavaScriptDistLib = com.fc.JavaScriptDistLib || {};
com.fc.JavaScriptDistLib.DocuSign = DocuSignObject;
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (DocuSignObject);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
/**
 * DrawView Module
 */

// ES6 imports


class DrawViewObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor() {
        super();
        const self = this;
        this.drawView = [];
        
        $(document).ready(function() {
            $('.element.fc.DrawViewContainer').each(function (obj) {
                let objName = $(this)[0].getAttribute('obj-name');                
                self.initDrawView(objName);
            });
        });

        this.getProperty = Object.assign(this.getProperty, {
            'Alpha': (objName) => {
                return $(this.getEleByObjName(objName)).css('opacity') * 100;
            },

            'Background color': (objName) => {
                return $(this.getEleByObjName(objName)).css("background-color");
            },

            'Pen Color': (objName) => {
               return this.drawView[objName].penColor;
            },

            'Pen Width': (objName) => {
                return this.drawView[objName].maxWidth;
            }
        });

        this.setProperty = Object.assign(this.setProperty, {
            'Alpha': (objName, value) => {
               $(this.getEleByObjName(objName)).css({"opacity": value / 100});
            },

            'Background color': (objName, value) => {
                $(this.getEleByObjName(objName)).css({"background": value});
                this.drawView[objName].backgroundColor = value;
            },

            'Pen Color': (objName, value) => {
                this.drawView[objName].penColor = value;
            },

            'Pen Width': (objName, value) => {
                this.drawView[objName].maxWidth = value;
            }
        });
    }

   
    initDrawView (objName) {
        const self = this;

        let ele = this.getEleByObjName(objName);
        let width = $(ele).parent().width();
        let height = $(ele).parent().height();
        //let ratio = width / height;

        $(ele).attr('width',width);
        $(ele).attr('height',height);
        ele.getContext("2d").scale(1, 1);
       
        this.drawView[objName] = new SignaturePad(ele, {
            maxWidth: $(ele).attr("max-width"),
            penColor: $(ele).attr("pen-color"),
            backgroundColor:$(ele).attr("bg-color")
        });
    }

    onStrokeStart (obj,callback) {
        this.drawView[obj].onBegin = function() {
            callback();
        }
    }

    onStrokeEnd (obj,callback) {
        this.drawView[obj].onEnd = function() {
            callback();
        }
    }

    getSvg(obj) {
        let dataURI =  this.drawView[obj].toDataURL("image/svg+xml");
        let svg = atob(dataURI.replace(/data:image\/svg\+xml;base64,/, ''));
        return svg;
    }

    getImage(obj) {
        let canvas = this.getEleByObjName(obj);
        var imageUrl= canvas.toDataURL();
        let img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = imageUrl;
        return img;
    }

    clear(obj) {
        this.drawView[obj].clear();
    }

    getEleByObjName (obj) {
        let parentEle = '[obj-name="' + obj + '"]';
        let canvas = $(parentEle).find("canvas")[0];
        return canvas;
    }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (DrawViewObject);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class FireBaseObject {

    constructor() {
        this.regToken = null;
        this.tokenRefreshCallback = null;
        this.messageReceivedCallback = null;
    }

    configure(properties) {
        if ( !('serviceWorker' in window.parent.navigator) ) {
            console.log("Firebase push messaging is not supported by this browser.");
            return;
        }
        console.log("firebase init script");

        const self = this;
        const prop = JSON.parse(properties);

        const config = {
            apiKey: prop['api-key'].text,
            projectId: prop['project-id'].text,
            messagingSenderId: prop['project-number'].text
        };
        const usePublicVapidKey = prop["public-vapid-key"].text;

        const firebase = this.getFirebase();
        let initialized = true;
        try {
            firebase.app();
        }
        catch (e) {
            initialized = false;
        }
        if (!initialized) {
            console.log('Initializing firebase app.');
            firebase.initializeApp(config);
            const messaging = firebase.messaging();

            console.log('Registering service worker ...');
            window.parent.navigator.serviceWorker
                .register('firebase-messaging-sw.js?messagingSenderId=' + config.messagingSenderId, {scope: "firebase-cloud-messaging-push-scope"})
                .then(
                    registration => {
                        messaging.useServiceWorker(registration);
                        console.log('Service worker registered');
                        self.onServiceWorkerRegistered();
                    },
                    err => console.log('firebase-messaging registration failed: ', err)
                );
            messaging.usePublicVapidKey(usePublicVapidKey);
        }
        else {
            // firebase initialized, registering the callbacks
            self.onServiceWorkerRegistered();
        }

        // messaging.requestPermission()
        //     .then(() => messaging.getToken())
        //     .then(token => {
        //         console.log('registration token: ', token);
        //         self.regToken = token;
        //     });
    }

    getFirebase() {
        let fb;
        if (typeof firebase === 'undefined')
            fb = window.parent.firebase;
        else
            fb = firebase;
        return fb;
    }

    onServiceWorkerRegistered() {
        console.log('Firebase, registering snap callbacks.');
        const self = this;
        const firebase = this.getFirebase();
        const messaging = firebase.messaging();

        messaging.requestPermission()
            .then(() => messaging.getToken())
            .then(token => {
                console.log('registration token: ', token);
                self.regToken = token;
            });

        messaging.onTokenRefresh( () => {
            console.log('TokenRefresh received. ', payload);
            messaging.getToken()
                .then( refreshedToken => {
                    console.log('Refreshed registration token: ', refreshedToken);
                    self.regToken = refreshedToken;
                    self.tokenRefreshCallback(refreshedToken);
                })
                .catch(
                    err => console.log('Unable to retrieve refreshed token ', err)
                );
        });

        messaging.onMessage( payload => {
            console.log('Message received. ', payload);
            self.messageReceivedCallback(payload.from, payload);
        });

        window.parent.navigator.serviceWorker.addEventListener('message', event => {
            const payload = event.data;
            console.log('Received a message from service worker: ', payload);
            if (payload.type && payload.type === 'web-push-message') {
                self.messageReceivedCallback('', payload);
            }
        });
    }

    onRegTokenRefresh(callback) {
        this.tokenRefreshCallback = callback;
    }

    onMessageReceived(callback) {
        this.messageReceivedCallback = callback;
    }


    onRegTokenRefreshLegacy(callback) {
        const messaging = firebase.messaging();
        const self = this;

        messaging.onTokenRefresh(() => {
            messaging.getToken()
                .then(refreshedToken => {
                        self.regToken = refreshedToken;
                        callback(refreshedToken);
                    },
                    err => console.log('Unable to retrieve refreshed token ', err)
                );
        });
    }

    onMessageReceivedLegacy(callback) {
        const messaging = fb.messaging();

        messaging.onMessage( payload => {
            console.log('Message received. ', payload);
            callback(payload.from, payload);
        });
    }

    getRefreshedToken() {
        return this.regToken;
    }

  getUniqueDeviceId () {
    //hs: cardcoding for now.
    var deviceId = localStorage.getItem("firebase_unique_device_id");
    if( deviceId == undefined ) {
      deviceId = this.uuidv4();
      localStorage.setItem("firebase_unique_device_id", deviceId);
    }
    return deviceId;
  }

  uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

}

/* harmony default export */ __webpack_exports__["a"] = (FireBaseObject);



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
/**
 * Created by Luca Latini on 24/04/17.
 */

// ES6 imports


class GaugeObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {


    constructor() {
        super();

        const self = this;
        this.gauge = [];

        $(document).ready(function() {
            //setTimeout( function() {
            $('.element.fc.Gauge').each(function (obj) {
                let objName = $(this)[0].getAttribute('obj-name');
                self.gauge[objName] = self.init(objName);
                //    self.graph[objName].unload();    this is used to hide the Graph when the preview has been loaded
            });
            //   }, 1000);
        });

        this.getProperty = Object.assign(this.getProperty, {
            'Alpha': (objName) => {
                return $(this.getGaugeElemFromName(objName)).css('opacity') * 100;
            },

            'Background color': (objName) => {
                return $(this.getGaugeElemFromName(objName)[0]).css("background-color");
            },

            'Current Value': (objName) => {
               return this.gauge[objName].data()[0].values[0].value;
            },

            'Maximum Value': (objName) => {
                return this.gauge[objName].internal.config.gauge_max;
            },

            'Minimum Value': (objName) => {
                return this.gauge[objName].internal.config.gauge_min;
            },

            'track color': (objName) => {
                var elemSelector = '[obj-name="' + objName + '"]';
                return d3.selectAll(elemSelector + ' path.c3-chart-arcs-background').style('fill');

            },

            'pointer color': (objName) => {
                return d3.selectAll(this.getGaugeElemFromName(objName)).select('path.c3-arc-data').style('fill');

            },

            'track width': (objName) => {
                return this.gauge[objName].internal.config.gauge_width;

            }

        });

        this.setProperty = Object.assign(this.setProperty, {
            'Alpha': (objName, value) => {
                d3.selectAll(this.getGaugeElemFromName(objName)).style('opacity', value/100)


            },

            'Background color': (objName, value) => {
                var elemSelector = '[obj-name="' + objName + '"]';
                $(elemSelector + ' svg').css("background-color",value);


            },

            'Current Value': (objName, value) => {
                this.gauge[objName].load({columns: [['data', value]]});
                var el = this.gauge[objName];
               // this.gauge[objName] = this.gaugeRender(objName)


            },

            'Maximum Value': (objName, value) => {
                this.gauge[objName].internal.config.gauge_max = value;
                var gaugeData = this.gauge[objName].data();
                var gaugeCurrVal = gaugeData[0].values[0].value;
                this.gauge[objName].load({columns: [['data', gaugeCurrVal]]});

            },

            'Minimum Value': (objName, value) => {

                this.gauge[objName].internal.config.gauge_min = value;
                var gaugeData = this.gauge[objName].data();
                var gaugeCurrVal = gaugeData[0].values[0].value;
                this.gauge[objName].load({columns: [['data', gaugeCurrVal]]});
            },

            'track color': (objName, value) => {
                var elemSelector = '[obj-name="' + objName + '"]';
                d3.selectAll(elemSelector + ' path.c3-chart-arcs-background').style('fill', value)


            },

            'pointer color': (objName, value) => {
                d3.selectAll(this.getGaugeElemFromName(objName)).select('path.c3-arc-data').style('fill', value);


            },

            'track width': (objName, value) => {
                this.gauge[objName].internal.config.gauge_width = value;
                var gaugeData = this.gauge[objName].data();
                var gaugeCurrVal = gaugeData[0].values[0].value;
                this.gauge[objName].load({columns: [['data', gaugeCurrVal]]});

            }
        });

    }

    getGaugeElemFromName (objName) {
        return this.getElemFromName(objName).find('#fcGauge');
    }

    init(objName) {

        var $is = this.getGaugeElemFromName(objName)[0];
        var ele = $is;

        //    this.$el.css({
        //      "opacity": this.getGaugeElemFromName(objName)[0].getAttribute('opacity')
        //});


        var bg = this.getProperty["Background color"](objName);
        var gaugeMin = this.getGaugeElemFromName(objName)[0].getAttribute('gaugeMin');
        var gaugeMax = this.getGaugeElemFromName(objName)[0].getAttribute('gaugeMax');
        var gaugeVal = this.getGaugeElemFromName(objName)[0].getAttribute('gaugeVal');
        var gaugeTrackWidth = this.getGaugeElemFromName(objName)[0].getAttribute('gaugeTrackWidth');
        var gaugeTrackColor = this.getProperty["track color"](objName);
        var gaugePointerColor = this.getProperty["pointer color"](objName);

        const self = this;

        // let gaugeRender2 = function(objName) {
        //
        //     if (self.gauge[objName]) {
        //         bg = self.getProperty["Background color"](objName);
        //         gaugeMin = self.getProperty["Minimum Value"](objName);
        //         gaugeMax = self.getProperty["Maximum Value"](objName);
        //         gaugeVal = self.getProperty["Current Value"](objName);
        //         gaugeTrackColor = self.getProperty["track color"](objName);
        //         gaugePointerColor = self.getProperty["pointer color"](objName );
        //         self.setProperty["pointer color"](objName, gaugePointerColor);
        //         self.setProperty["track color"](objName, gaugeTrackColor);
        //     }
        // };

        this.getGaugeElemFromName(objName).css({
            "background-color": bg
        });


        var gauge = c3.generate({
            bindto:$is,
            data: {
                columns: [
                    ['data', gaugeVal]
                ],
                type: 'gauge',
                color: function (color, d) {
                        return self.getProperty["pointer color"](objName) == 'none' ? color : self.getProperty["pointer color"](objName);
            }
            },
            oninit: function() {
                d3.select(ele).selectAll('path.c3-chart-arcs-background').style("fill", self.getProperty["track color"](objName));
            },
            gauge: {
                min: gaugeMin,
                max: gaugeMax,
                width: gaugeTrackWidth, // for adjusting arc thickness,
                expand: true,
                startingAngle:0,
                label: {
                    format: function(value, ratio) {
                        return "";
                    },
                    show: false
                },

            },
            color: {
                pattern: [gaugePointerColor]
            },
            size: {
                height: self.getProperty["height"](objName) / 2,
                width: self.getProperty["width"](objName)
            },
            tooltip: {
                show: false
            }
        });

        return gauge;


    }

    // animationStart(objName, animation, onCompleteCallback) {
    //     if (animation.type === 'scale') {
    //         let duration = animation.duration*1000;
    //         let options = {duration: duration, complete: onCompleteCallback, queue: animation.id};
    //         let elemDiv = this.getElemFromName(objName);
    //         let elemSvg = $('[obj-name="'+objName+'"] svg');
    //         let newWidth = elemDiv.width() * animation.dX;
    //         let newHeight = elemDiv.height() * animation.dY;
    //         let leftDelta = (newWidth - elemDiv.width()) / 2;
    //         let topDelta = (newHeight - elemDiv.height()) / 2;
    //         var zoom = elemDiv[0].style.transform +' scaleX('+animation.dX+') scaleY('+animation.dY+')';
    //         elemDiv.animate({'transform': zoom}, options);
    //         //
    //         //  newWidth = elemSvg.width() * animation.dX;
    //         //  newHeight = elemSvg.height() * animation.dY;
    //         //  leftDelta = (newWidth - elemSvg.width()) / 2;
    //         //  topDelta = (newHeight - elemSvg.height()) / 2;
    //         // elemSvg.animate({width:newWidth+'px', height:newHeight+'px', left: '-='+leftDelta+'px', top: '-='+topDelta+'px'}, options);
    //         // elemDiv.dequeue(animation.id);
    //         elemDiv.dequeue(animation.id);
    //     }
    //     else  super.animationStart(objName, animation, onCompleteCallback)
    // };
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (GaugeObject);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Google Fit implementation
** Created by Harish Shanthi Kumar on 06/08/2018
*/

class GoogleFitObject {
  //Supported devices are heart_rate, blood_pressure, glucometer, spo2
  constructor() {
    this.authToken = null;
    this.dataSourceIdMap = {};
    this.scopeMap = {};
    this.dataSourceIdMap["com.google.step_count.delta"] = "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps";
    this.dataSourceIdMap["com.google.calories.expended"] = "derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended";
    this.dataSourceIdMap["com.google.distance.delta"] = "derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta";
    this.dataSourceIdMap["com.google.heart_rate.bpm"] = "derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm";
    this.dataSourceIdMap["com.google.weight"] = "derived:com.google.weight:com.google.android.gms:merge_weight";
    this.dataSourceIdMap["com.google.blood_pressure"] = "derived:com.google.blood_pressure:com.google.android.gms:merged";

    this.scopeMap["com.google.heart_rate.bpm"] = "https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.body.write";
    this.scopeMap["com.google.weight"] = "https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.body.write";
    this.scopeMap["com.google.blood_pressure"] = "https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.blood_pressure.write";

  }

  configure(config) {
  }

  configureAuth(authLostCallback) {
    this.authLostCallback = authLostCallback;
  }

  authorize(dataTypes, clientId, redirectURL, successcallback, failurecallback) {
    let self = this;
    
    let url = "https://accounts.google.com/o/oauth2/v2/auth?client_id="+clientId+"&redirect_uri="+redirectURL+"&scope=https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.body.write https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.blood_pressure.write&response_type=token";
    let authWindow = window.open(url, 'authWindow', 'height=600,width=450');
    
    if (window.focus) {
      authWindow.focus();
    }
    try {
      let timer = setInterval(function(){
        if(authWindow.location.hash.indexOf("access_token") > -1) {
          let hashArr = authWindow.location.hash.split("=");
          self.authToken = hashArr[1].substring(0, hashArr[1].indexOf('&'));
          self._setToken(self.authToken);
          successcallback();
          authWindow.close();
          clearInterval(timer);
        }
      },100);
    } catch (e) {
      failurecallback();
    }
  }

  deAuthorize() {
    self._resetToken();
  }

  isAuthorized() {
    return (this._getToken() != undefined) ? true : false;
  }

  readHistoricalData(startDate, endDate, dataTypes, successcallback, failurecallback) {

    let parent = this;
    let reqDataTypes = [];
    
    if( dataTypes.lenth <= 0 )
      return;
    
    if( startDate == null ) {
      startDate = new Date();
    }
    startDate.setHours(0,0,0,0);

    if( endDate == null ) {
      endDate = new Date();
    }
    endDate.setHours(24, 0, 0, 0);

    for( let i=0; i<dataTypes.length; i++) {
      reqDataTypes.push({
        "dataSourceId":parent.dataSourceIdMap[dataTypes[i]]
      });
    }

    let reqBody = {
      "aggregateBy": reqDataTypes,
      "bucketByTime": { "durationMillis": 86400000 },
      "startTimeMillis": startDate.getTime(),
      "endTimeMillis": endDate.getTime()
    };

    let reqHeaders = {"Authorization": "Bearer "+this._getToken(), "Content-Type" : "application/json"};

    $.ajax(
    {
      url: "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
      type: "POST",
      headers: reqHeaders,
      data: JSON.stringify(reqBody),
      success: function (response) {
        try {
          let data = parent._parseHistoricalData(response);
          successcallback(data);
          console.log(data);
        }
        catch(e) {
          failurecallback(e);
        }
      },
      error: function(xhr, code, msg) {
        failurecallback(code + ': '+ msg);
      }
    }); 

  }

  readTodayData(dataType, successcallback, failurecallback) {

    let parent = this;
    let startDate = new Date();
    startDate.setHours(0,0,0,0);
    let endDate = new Date();
    endDate.setHours(24,0,0,0);

    let reqBody = {
      "aggregateBy": [{
        "dataSourceId":parent.dataSourceIdMap[dataType]
      }],
      "bucketByTime": { "durationMillis": 86400000 },
      "startTimeMillis": startDate.getTime(),
      "endTimeMillis": endDate.getTime()
    };

    let reqHeaders = {"Authorization": "Bearer "+this._getToken(), "Content-Type" : "application/json"};

    $.ajax(
    {
      url: "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
      type: "POST",
      headers: reqHeaders,
      data: JSON.stringify(reqBody),
      success: function (response) {
        try {
          let bucket = response.bucket[0]; 
          let point = bucket.dataset[0].point[0];
          let todayData = {};
          todayData["startdate"] = bucket.startTimeMillis;
          todayData["enddate"] = bucket.endTimeMillis;
          parent._populateFields(todayData, point);
          successcallback(todayData);
        }
        catch(e) {
          failurecallback(e);
        }
      },
      error: function(xhr, code, msg) {
        failurecallback(code + ': '+ msg);
      }
    }); 
  }

  async recordSample(dataType, data, successcallback, failurecallback) {
    let self = this;
    let scope = this.scopeMap[dataType];
    
    //writing is currently only supported for hr, weight and bp
    if( scope == undefined ) {
      failurecallback("Unsupported recording type. Currently only HR, Weight and BP supported");
      return;
    }

    try {
      var dataSource = await this._getDataSource(dataType);
      if( dataSource == undefined) {
        dataSource = await this._createDataSource(dataType);
      }
      console.log(dataSource);
      if( dataSource != undefined ) {
        let response = await this._recordSample(dataSource, data);
        successcallback();
      }
      else {
        failurecallback("Could not record sample");
      }
      
    }
    catch(e) {
      console.log(e);
      failurecallback(e);
    }
  }
  
  async _getDataSource(dataType) {
    let reqHeaders = {"Authorization": "Bearer "+this._getToken(), "Content-Type" : "application/json"};    
    
    try {
      let dataSource = await $.ajax({
        url: "https://www.googleapis.com/fitness/v1/users/me/dataSources/raw:"+dataType+":SnapClinical",
        type: 'GET',
        headers: reqHeaders
      });
      return dataSource;
    }
    catch(e) {
      return undefined;
    }
    
  }

  async _createDataSource(dataType) {
    let fields = this._getFields(dataType);

    let reqHeaders = {"Authorization": "Bearer "+this._getToken(), "Content-Type" : "application/json"};

    let reqBody = {
      "dataStreamName": "SnapClinical",
      "type": "raw",
      "application": {
        "detailsUrl": "http://snapclinical.com",
        "name": "SnapClinical",
        "version": "1"
      },
      "dataType": {
        "name": dataType,
        "field": fields
       }
    };
    try {
      let dataSource = await $.ajax({
        url: "https://www.googleapis.com/fitness/v1/users/me/dataSources",
        type: 'POST',
        headers: reqHeaders,
        data: JSON.stringify(reqBody)
      });
      return dataSource;
    }
    catch(e) {
      return undefined;
    }
  }

  async _recordSample(dataSource, sample) {
    var currDate = new Date();
    var timeStampMillis = currDate.getTime();
    var timeStampNanosStart = timeStampMillis * 1000000;
    var timeStampNanosEnd = timeStampNanosStart+1;

    let reqHeaders = {"Authorization": "Bearer "+this._getToken(), "Content-Type" : "application/json"};
    let values = this._getSampleValues(dataSource.dataType.name, sample);
    let reqBody = {
      
     "minStartTimeNs": timeStampNanosStart,
     "maxEndTimeNs": timeStampNanosEnd,
     "dataSourceId": dataSource.dataStreamId,
     "point": [
      {
       "startTimeNanos": timeStampNanosStart,
       "endTimeNanos": timeStampNanosEnd,
       "dataTypeName": dataSource.dataType.name,
       "value": values
      }
     ]
    };
    let dataType = dataSource.dataType.name;
  
    let response = await $.ajax({
        url: "https://www.googleapis.com/fitness/v1/users/me/dataSources/raw:"+dataType+":SnapClinical/datasets/" +timeStampNanosStart + "-" + timeStampNanosEnd,
        type: 'PATCH',
        headers: reqHeaders,
        data: JSON.stringify(reqBody)
    });
    return response;
  }

  _getFields(dataType) {
    let fields = [];

    if( dataType == "com.google.heart_rate.bpm") {
      let fieldHr = {
        "name": "bpm",
        "format": "floatPoint",
        "optional": false
      };
      fields.push(fieldHr);
    }
    else if( dataType == "com.google.weight") {
      let fieldWeight = {
        "name": "weight",
        "format": "floatPoint",
        "optional": false
      };
      fields.push(fieldWeight);
    }
    else if( dataType == "com.google.blood_pressure") {
      let fieldSystolic = {
        "name": "systolic",
        "format": "floatPoint",
        "optional": false
      };
      let fieldDiastolic = {
        "name": "diastolic",
        "format": "floatPoint",
        "optional": false
      };
      fields.push(fieldSystolic);
      fields.push(fieldDiastolic);
    }
    return fields;
  }

  _getSampleValues(dataType, sample) {
    let values = [];

    if( dataType == "com.google.heart_rate.bpm") {
      let hr = sample["hr"];

      let value = {
        "fpVal": hr
      };
      values.push(value);
    }
    else if( dataType == "com.google.weight") {
      let weight = sample["weight"];

      let value = {
        "fpVal": weight
      };
      values.push(value);
    }
    else if( dataType == "com.google.blood_pressure") {
      let systolic = sample["systolic"];
      let diastolic = sample["diastolic"];

      let value1 = {
        "fpVal": systolic
      };
      let value2 = {
        "fpVal": diastolic
      }

      values.push(value1);
      values.push(value2);
    }
    return values;
  }
  
  _populateFields(data, point) {
   
    if( point != undefined ) {
      //fields["startdate"] = point.startTimeNanos / 1000;
      //fields["enddate"] = point.endTimeNanos / 1000;
      if( point.dataTypeName == "com.google.step_count.delta") {
        let value = point.value[0].intVal;
        data["steps"] = value;
      }
      else if( point.dataTypeName == "com.google.calories.expended") {
        let value = point.value[0].fpVal;
        data["calories"] = Math.round(value);
      }
      else if( point.dataTypeName == "com.google.distance.delta") {
        let value = point.value[0].fpVal / 1000; //meters to kms
        data["distance"] = value.toFixed(2);
      }
      else if( point.dataTypeName == "com.google.heart_rate.summary") {
        this._setStatsData(data, "hr", point, 0, true);
      }
      else if( point.dataTypeName == "com.google.weight.summary") {
        this._setStatsData(data, "weight", point, 0, false);
      }
      else if( point.dataTypeName == "com.google.blood_pressure.summary") {
        this._setStatsData(data, "bp_systolic", point, 0, true);
        this._setStatsData(data, "bp_diastolic", point, 3, true);
      }
    } 
  }

  _parseHistoricalData(data) {
    let historicalCapsule = [];
    try {
      for(let i=0; i<data.bucket.length; i++) {
        let bucket = data.bucket[i];
        let dailyCapsule = {};
        dailyCapsule["startdate"] = bucket.startTimeMillis;
        dailyCapsule["enddate"] = bucket.endTimeMillis;
        for(let j=0; j<bucket.dataset.length; j++) {
            let dataset = bucket.dataset[j];
            let point = dataset.point[0];
            this._populateFields(dailyCapsule, point);
        }
        historicalCapsule.push(dailyCapsule);
      }
    }
    catch(e) {
    }
    return historicalCapsule;
  }

  _setStatsData(data, field, point, offset, roundOff) {
      let average = point.value[offset].fpVal;
      let max = point.value[offset+1].fpVal;
      let min = point.value[offset+2].fpVal;

      data[field + "_average"] = (roundOff == true) ? Math.round(average) : average.toFixed(2);
      data[field + "_max"] = (roundOff == true) ? Math.round(max) : max.toFixed(2);
      data[field + "_min"] = (roundOff == true) ? Math.round(min) : min.toFixed(2);
  }

  _setToken(token) {
    sessionStorage.setItem("token", token);
  }

  _getToken() {
    return sessionStorage.getItem("token");
  }

  _resetToken() {
    sessionStorage.removeItem('token');
  }
}
// export class to a global variable for use of the JavaScriptDistLib (only)
var com = com || {};
com.fc = com.fc || {};
com.fc.JavaScriptDistLib = com.fc.JavaScriptDistLib || {};
com.fc.JavaScriptDistLib.GoogleFit = GoogleFitObject;
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (GoogleFitObject);


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
/**
 * Created by Luca Latini on 19/04/17.
 */

// ES6 imports


class GraphContainerObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {


    constructor() {
        super();
        // this.this.getGraphElemFromName(objName)Ref = this.getGraphElemFromName(objName)Ref || '';
        const self = this;
        this.graph = [];
        this.graphDataCallback = null;
        $(document).ready(function() {
            //setTimeout( function() {
                $('.element.fc.GraphContainer').each(function (obj) {
                    let objName = $(this)[0].getAttribute('obj-name');
                    let chartData = {};
                    chartData.columns = [['x', 10, 20, 30, 40, 50],['data1', 10, 20, 30, 40, 50]]
                    chartData.unload = true;
                    self.graph[objName] = self.init(chartData, objName);
                //    self.graph[objName].unload();    this is used to hide the Graph when the preview has been loaded
                });
         //   }, 1000);
        });

        this.getProperty = Object.assign(this.getProperty, {
            'BG Color': (objName) => {
                return this.getGraphElemFromName(objName).css('background-color');
            },

            'Type': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('graphType');
            },
            'Legends': (objName) => {
               // let val = d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-legend-item').style("visibility") == 'visible'? true : false ;
               // return val;
                return this.getGraphElemFromName(objName)[0].getAttribute('legendShow') === 'true'
            },

            'Grid': (objName) => {
               // let val = d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-grid').style('visibility') == 'visible'? true : false ;
              //  return val;
                return this.getGraphElemFromName(objName)[0].getAttribute('gridShow') === 'true'
            },

            'X Axis Text': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').html();
            },

            'Y Axis Text': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('text').html();
            },

            'X Axis Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('path').style("stroke");
            },

            'Y Axis Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('path').style("stroke");
            },

            'X Axis Text Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style("fill");
            },

            'Y Axis Text Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style("fill");
            },

            'X Axis Line Width': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('path').style("stroke-width");
            },

            'Y Axis Line Width': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('path').style("stroke-width");
            },

            'Legend Text': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('text.c3-axis-x-label').style("stroke");
            },

            'Fill Alpha': (objName) => {
                let type = this.getProperty["Type"](objName);
                if (type == 'line')
                    return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('.c3-area ').style('opacity') * 100;
                else return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-bars ').selectAll('path').style('opacity') * 100;
            },

            'Fill Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('.c3-area ').style('fill');
            },

            'Bar Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-bar').selectAll('path').style('fill');
            },

            'Line Width': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-lines').selectAll('path').style("stroke-width");
            },

            'Line Circle Color': (objName) => {
                    return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').style("fill");
            },

            'Line Filled': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('linePlotDrawfilled') === 'true';
            },

            'Smooth Line': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('linePlotSmoothline') === 'true';
            },

            'Circle Radius': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').attr('r');
            },

            'Draw Line Values': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('drawLineValues') === 'true';
            },

            'Draw Values': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('drawBarValues') === 'true';
            },

            'Axis Font Size': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style('font-size');
            }
        });

        this.setProperty = Object.assign(this.setProperty, {

            'BG Color': (objName, value) => {
                this.getGraphElemFromName(objName).css('background-color',value);
            },

            'Type': (objName, value) => {
                this.getGraphElemFromName(objName).attr('graphType', value);
                this.graph[objName].transform(value);
            },

            'Legends': (objName, value) => {
                let show = 'visible';
                if (!value)
                    show = 'hidden';
                this.getGraphElemFromName(objName).attr('legendShow', value)
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-legend-item').style("visibility", show);
            },

            'Grid': (objName, value) => {
                let show = 'visible';
                if (!value)
                    show = 'hidden';
                this.getGraphElemFromName(objName).attr('gridShow', value)
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-grid').style('visibility',show);
            },

            'X Axis Text': (objName, value) => {
                this.graph[objName].axis.labels({x: value});
            },

            'Y Axis Text': (objName, value) => {
                this.graph[objName].axis.labels({y: value});
            },

            'X Axis Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('path').style("stroke", value);
            },

            'Y Axis Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('path').style("stroke", value);
            },

            'X Axis Text Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style("fill", value);
            },

            'Y Axis Text Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style("fill", value);
            },

            'X Axis Line Width': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('path').style("stroke-width", value);
            },

            'Y Axis Line Width': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('path').style("stroke-width", value);
            },

            'Legend Text': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('text.c3-axis-x-label').style("stroke", value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('text.c3-axis-y-label').style("stroke", value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-legend-item').selectAll('text').style("stroke", value);
            },

            'Fill Alpha': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('.c3-area ').style('opacity',value/100);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-bars ').selectAll('path').style('opacity',value/100);
            },

            'Fill Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('.c3-area ').style('fill',value);
            },

            'Bar Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-bar').selectAll('path').style('fill',value)
            },

            'Line Width': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-lines').selectAll('path').style("stroke-width", value);
            },

            'Line Circle Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').style("stroke", value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').style("fill", value);
            },

            'Circle Radius': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').attr('r',value);
            },

            'Draw Line Values': (objName, value) => {
                let show = 'visible';
                if (!value)
                    show = 'hidden';
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-text').selectAll('text').style("visibility", show);
            },

            'Draw Values': (objName, value) => {
                this.setProperty["Draw Line Values"](objName, value);
            },

            'Axis Font Size': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style('font-size',value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style('font-size',value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('text.c3-text').style('font-size',value);
            },

            'Line Filled': (objName, value) => {
                if (value)
                    this.graph[objName].transform('area');
                else
                    this.graph[objName].transform('line');
                this.getGraphElemFromName(objName).attr('linePlotDrawfilled', value)
            },

            'Smooth Line': (objName, value) => {
                if (value)
                    this.graph[objName].transform('area-spline');
                else
                    this.graph[objName].transform('area');
                this.getGraphElemFromName(objName).attr('linePlotSmoothline', value)
            }
        });
    }

    getGraphElemFromName (objName) {
        return this.getElemFromName(objName).find('#fcLine');
    }
    
    createChartWithList(objName,xArr,yArr,name) {

        let graph = this.graph[objName];
        let xAxisData = ['x'];
        let yAxisData = [name];

        if( yArr!=null ) {

            let populateXAxis = false;

            if( xArr!=null ) {
                for(let xIndex=0; xIndex<xArr.length; xIndex++) {
                    xAxisData.push(xArr[xIndex]);
                }
            }
            else {
                populateXAxis = true;
            }


            for(let i=0; i<yArr.length; i++) {
                yAxisData.push(yArr[i]);
                if( populateXAxis )
                    xAxisData.push(i);
            }

            let chartData = {};
            chartData.columns = [xAxisData,yAxisData]
            chartData.unload = true;

            return graph.load(chartData);

        } else { throw this.graphException(e); }
    }

    addChartTransition(objName,x,y) {

        let graph = this.graph[objName];
        
        let updatedGraph = setTimeout(function () {
            graph.flush();
        }, x);

        return updatedGraph;
    }

    addValuesToChart(objName,xVal,yVal,name) {

        let graph = this.graph[objName];

        let xAxisArr = graph.categories();
        xAxisArr.push(xVal);
        let yAxisArr = [];
        
        let chartData = {};
        chartData.columns = [];

        console.log (graph.data());

        for (let i=0;i<graph.data().length;i++) {
            let data = [graph.data()[i].id];
            for (let j=0;j<graph.data()[i].values.length;j++) {
                data.push(graph.data()[i].values[j].value);
            }
            if (graph.data()[i].id == name) {
                data.push(yVal);
            }
            yAxisArr.push(data);
        }
        for (let i=0;i<graph.data().length;i++) {
            if (graph.data()[i].id != name) {
                let newArr = [name];
                newArr.push(yVal);
                yAxisArr.push(newArr);    
            }
        }
        console.log (graph.data());
        chartData.columns = yAxisArr;
        chartData.categories = xAxisArr;
        chartData.unload = true;
    
        return graph.load(chartData);
    }

    onDataSelected (objName,callback) {
        this.graphDataCallback = callback;
    }

    graphException(snappMessage, msg) {
        this.name = "GraphException";
        this.snappMessage = snappMessage;
        //custom message from snapp.
        this.message = msg || snappMessage;
        this.stack = (new Error()).stack;
    }

    init(chartData, objName) {

        let ele = this.getGraphElemFromName(objName)[0];
        let graphType  = ele.getAttribute('graphType');
        let circleColor = '';
        if (graphType !== 'bar') {
            circleColor = this.getProperty["Line Circle Color"](objName);
        }
        let fillAlpha;
        let fillColor = graphType == 'bar' ? this.getProperty["Bar Color"](objName) : this.getProperty["Fill Color"](objName);
        let linePlotWidth = graphType == 'line' ? this.getProperty["Line Width"](objName) : '';
        let axisFontSize = this.getProperty["Axis Font Size"](objName);
        let xAxisLabelText = this.getProperty["X Axis Text"](objName);
        let yAxisLabelText = this.getProperty["Y Axis Text"](objName);
        let xAxisColor = this.getProperty["X Axis Color"](objName);
        let yAxisColor = this.getProperty["Y Axis Color"](objName);
        let xAxisTextColor = this.getProperty["X Axis Text Color"](objName);
        let yAxisTextColor = this.getProperty["Y Axis Text Color"](objName);
        let xAxisLineWidth = this.getProperty["X Axis Line Width"](objName);
        let yAxisLineWidth = this.getProperty["Y Axis Line Width"](objName);
        let legendTextColor = this.getProperty["Legend Text"](objName);
        let drawLineValues = this.getProperty["Draw Line Values"](objName);
        let drawBarValues = this.getProperty["Draw Values"](objName);
        let legendShow = this.getProperty["Legends"](objName);
        let gridShow = this.getProperty["Grid"](objName);
        let circleRadius = graphType == 'line' ? this.getProperty["Circle Radius"](objName) : '';
        let fillBarAlpha;
        let chartType;
        if (graphType == 'line') {
            if (ele.getAttribute('linePlotSmoothline') == 'true') {
                if (ele.getAttribute('linePlotDrawfilled') == 'true')
                    chartType = "area-spline";
                else
                    chartType = "spline";
            } else {
                if (ele.getAttribute('linePlotDrawfilled') == 'true')
                    chartType = "area";
                else
                    chartType = "line";
            }
        } else {
            //BAR
            chartType = "bar";
        }

        const self = this;

        let lineInit = function(objName) {

            if (self.graph[objName]) {
                ele = self.getGraphElemFromName(objName)[0];
                graphType  = self.getProperty["Type"](objName);
                circleColor = '';
                if (graphType !== 'bar') {
                    circleColor = ele.getAttribute('circleColor');
                }
                fillAlpha = ele.getAttribute('fillLineAlpha');
                fillColor = graphType == 'bar' ? self.getProperty["Bar Color"](objName) : self.getProperty["Fill Color"](objName);
                linePlotWidth = graphType == 'line' ? self.getProperty["Line Width"](objName): '';
                axisFontSize = self.getProperty["Axis Font Size"](objName);
                xAxisLabelText = self.getProperty["X Axis Text"](objName);
                yAxisLabelText = self.getProperty["Y Axis Text"](objName);
                xAxisColor = self.getProperty["X Axis Color"](objName);
                yAxisColor = self.getProperty["Y Axis Color"](objName);
                xAxisTextColor = self.getProperty["X Axis Text Color"](objName);
                yAxisTextColor = self.getProperty["Y Axis Text Color"](objName);
                xAxisLineWidth = self.getProperty["X Axis Line Width"](objName);
                yAxisLineWidth = self.getProperty["Y Axis Line Width"](objName);
                legendTextColor = self.getProperty["Legend Text"](objName);
                drawLineValues = self.getProperty["Draw Line Values"](objName);
                drawBarValues = self.getProperty["Draw Values"](objName);
                legendShow = self.getProperty["Legends"](objName);
                gridShow = self.getProperty["Grid"](objName);
                circleRadius = graphType == 'line' ? self.getProperty["Circle Radius"](objName) : '';
                fillBarAlpha = ele.getAttribute('fillBarAlpha');

            }

            d3.select(ele).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style("fill", xAxisTextColor);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style("fill", yAxisTextColor);
            d3.select(ele).selectAll('text.c3-axis-x-label').style("stroke", legendTextColor);
            d3.select(ele).selectAll('text.c3-axis-y-label').style("stroke", legendTextColor);
            d3.select(ele).selectAll('g.c3-legend-item').selectAll('text').style("stroke", legendTextColor);
            d3.select(ele).selectAll('g.c3-texts').selectAll('text').style("fill", legendTextColor);
            d3.select(ele).selectAll('g.c3-axis-x').selectAll('path').style("stroke", xAxisColor);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('path').style("stroke", yAxisColor);
            d3.select(ele).selectAll('g.c3-axis-x').selectAll('g.tick').selectAll('line').style("stroke", xAxisColor);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('g.tick').selectAll('line').style("stroke", yAxisColor);
            d3.select(ele).selectAll('g.c3-axis-x').selectAll('path').style("stroke-width", xAxisLineWidth);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('path').style("stroke-width", yAxisLineWidth);

            if (legendShow) {
                d3.select(ele).selectAll('text.c3-axis-x-label').style("visibility", 'visible');
                d3.select(ele).selectAll('text.c3-axis-y-label').style("visibility", 'visible');
                d3.select(ele).selectAll('g.c3-legend-item').style("visibility", 'visible');
            } else {
                d3.select(ele).selectAll('g.c3-legend-item').style("visibility", 'hidden');
            }

            if (gridShow)
                d3.select(ele).selectAll('g.c3-grid').style('visibility', 'visible');
            else
                d3.select(ele).selectAll('g.c3-grid').style('visibility', 'hidden');

            //Draw Values
            if (graphType != 'bar') {
                if (drawLineValues)
                    d3.select(ele).selectAll('g.c3-chart-text').selectAll('text').style("visibility", 'visible');
                else
                    d3.select(ele).selectAll('g.c3-chart-text').selectAll('text').style("visibility", 'hidden');
            }

            if (graphType == 'bar') {
                if (drawBarValues)
                    d3.select(ele).selectAll('g.c3-chart-text').selectAll('text').style("visibility", 'visible');
                else
                    d3.select(ele).selectAll('g.c3-chart-text').selectAll('text').style("visibility", 'hidden');
            }
            setTimeout( function() {
                d3.select(ele).selectAll('circle').style("stroke", circleColor);
                d3.select(ele).selectAll('circle').style("fill", circleColor);
            },100);
            d3.select(ele).selectAll('g.c3-chart-lines ').selectAll('path').style('opacity', fillAlpha);
            d3.select(ele).selectAll('.c3-area ').style('fill', fillColor);
            d3.select(ele).selectAll('.c3-shape ').style('stroke', fillColor);
            d3.select(ele).selectAll('path.c3-line').style('stroke-width', linePlotWidth);
            //Bar
            d3.select(ele).selectAll('g.c3-chart-bars ').selectAll('path').style('opacity', fillBarAlpha);
            d3.select(ele).selectAll('g.c3-chart-bar').selectAll('path').style('fill', fillColor);
            //Font Size
            d3.select(ele).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style('font-size', axisFontSize);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style('font-size', axisFontSize);
            d3.select(ele).selectAll('text.c3-text').style('font-size', axisFontSize);
        };

        this.getGraphElemFromName(objName).css({
            "background-color": this.getProperty["BG Color"](objName)
        });

        let graph = c3.generate({
            bindto: ele,
            data: {
                columns: chartData.columns,
                labels: true,
                type: chartType,
                colors: {
                    Data : fillColor
                },
                x: 'x',
                onclick: function(e) { 
                    self.graphDataCallback(e.id,e.x,e.value);
                }
            },
            size: {
                width: parseInt(this.getElemFromName(objName)[0].style['width'], 10),
                height: parseInt(this.getElemFromName(objName)[0].style['height'], 10)
            },
            color: {
                pattern: [fillColor]
            },
            onrendered: function () {
                try {
                    lineInit(objName);
                }  catch (e) {
                    console.log (e);
                }
            },
            point: {r:circleRadius},
            transition: {
                duration: 0
            },
            grid: {
                x : {
                    show:true
                },
                y: {
                    show:true
                }
            },
            axis: {
                x: {
                    type: 'category',
                    // categories: ['1', '2','3','4','5'],
                    // min:0,
                    label: {
                        text: xAxisLabelText
                    }
                },
                y: {
                    label: {
                        text: yAxisLabelText
                    },
                    tick: {
                        format: d3.format('.0f')
                    }
                }
            }
        });

        return graph;
    }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (GraphContainerObject);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_grid_common_list_grid_common_module_js__ = __webpack_require__(2);
/**
 */
/*global $ */

// ES6 imports


class GridViewObject extends __WEBPACK_IMPORTED_MODULE_0__list_grid_common_list_grid_common_module_js__["a" /* default */] {
  constructor() {

    super();
    

    this.setProperty = Object.assign(this.setProperty, {

      "height": (obj, value) => {
        try {
          if (obj.hasClass("GridViewCell")) {
            obj.each(function(i) {
              $(this).css("height",value+"px");
              $(this).css("top",value*(i));
            });  
          }
        } catch (e) {
          //GridView
          var elem = $('[obj-name= "' + obj + '"]');
          $(elem).css("height",value+"px");
        }

      },

      Alpha: (obj, value) => {
        try {
          if (obj.hasClass("GridViewCell")) {
            obj.each(function(i) {
              $(this).css("opacity", value/100 );
            });  
          }
        } catch (e) {
          //Gridview
          var elem = $('[obj-name= "' + obj + '"]');
          $(elem).css("opacity", value/100 );
        }
      },
      "Background color" : (obj, value) => {
        try {
          if (obj.hasClass("GridViewCell")) {
            obj.each(function(i) {
              $(this).attr("cell-bg-color",value);
              $(this).css("background-color", value);
            });  
          }
        } catch (e) {
          //Gridview
          var elem = $('[obj-name= "' + obj + '"]');
          $(elem).css("background-color", value);
        }

      },
    });
  }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (GridViewObject);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
// ES6 imports


class ImageObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor() {
        super(' image');

        var self = this;

        // this.getProperty['Image'] = function(objName) {
        //   return this.getElemFromName(objName).attr('src');
        // };

        this.getProperty['Image'] = function(objName) {
            let elemSelector = self.getElemFromName(objName);
            let el = $(elemSelector).find('img');
            return el.get()[0];
        };

        this.getProperty['Scaling'] = function(objName) {
            return self.getElemFromName(objName).attr('scale-type');
        };

        // this.setProperty['Image'] = function(objName, value) {
        //     let elemSelector = '[obj-name="' + objName + '"]';
        //     let elem = $(elemSelector);
        //     elem.find('img').attr('src',value);
        // };

        this.setProperty['Image'] = function(objName, image) {

            // let elemSelector = '[obj-name="' + objName + '"]';
            // let elem = $('[obj-name="' + objName + '"]').find('img')
            // elem.attr('src', image.src);

            // getting the native element
            let $oldElem = $('[obj-name="' + objName + '"]').find('img');
            let oldElem = $oldElem.get()[0]; // getting the native element

            // make a copy of the input image
            // this copy will replace the current immage
            let newElem = image.cloneNode();

            // copy all existing img attributes to the new element except src
            for (let i = 0; i < oldElem.attributes.length; i++)
            {
              let attribute = oldElem.attributes[i];
              if (! newElem.getAttribute(attribute.name))
                newElem.setAttribute(attribute.name, attribute.value);
            }
            $oldElem.replaceWith(newElem);
        };

        this.setProperty['Scaling'] = function(objName, value) {
            let elemSelector = '[obj-name="' + objName + '"]';
            let elem = $(elemSelector);
            
            switch (value) {
              case "stretch":
                $(elemSelector + ' img').css('width','inherit');
                $(elemSelector + ' img').css('height','inherit');
                $(elemSelector + ' img').attr('scale-type','stretch');
                break;
              case "fit":
                $(elemSelector + ' img').css('width','inherit');
                $(elemSelector + ' img').css('height','initial');
                $(elemSelector + ' img').attr('scale-type','fit');
                break;
              case "crop":
                $(elemSelector + ' img').css('width','initial');
                $(elemSelector + ' img').css('height','initial');
                $(elemSelector + ' img').attr('scale-type','crop');
                break;
          }
        };
    }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ImageObject);



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
// ES6 imports


class ImageLibrary {

    constructor() {}

    // static createImageFromUrl(url, successCallBack) {
    //     successCallBack (url);
    // }

    createImageFromUrl(url, successCallBack, failureCallBack) {
        let img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = url;

        img.onload = (e) => {
            successCallBack (e.srcElement);
            // successCallBack (img);
        };

        img.onerror = (e) => {
          console.log('createImageFromUrl, losd error', e);
          failureCallBack(e);
        }
    }

    createImageFromResource(resourceUrl) {
        let img = new Image();
        img.crossOrigin = "anonymous";
        img.src = resourceUrl;
        return img;
    }

    /* async getWidth (image) {

        let img = new Image();
        // img.onload = this.getWidthAndHeight;

        img.src = image;
        let load = () => {
          return new Promise( (resolve,reject) => {
            img.onload = resolve;
          });
        };
        let event = await load();
        console.log('async getWidth, check:', event);

        let width = event.srcElement.width;
        console.log('async getWidth, width:', width);
        return width;

        // let img = document.createElement('img');
        // img.setAttribute('src', image);
        // let width = img.getAttribute('width');
        // return width;
    } */


    // getWidth (image) {
    //   let img = new Image();
    //   img.src = image;
    //   let width = img.width;
    //   return width;
    // }

    getWidth (image) {
        return image.width;
    }

    // getHeight (image) {
    //   let img = new Image();
    //   img.src = image;
    //   let height = img.height;
    //   return height;
    // }

    getHeight (image) {
        return image.height;
    }

    // isImage (image) {
    //     let img = new Image();
    //     img.src = image;
    //     let width = img.width;
    //     if (width > 0) {
    //         return true;
    //     }
    //     return false;
    // }

    isImage (image) {
        let name = image.constructor.name;
        if ( name === 'HTMLImageElement')
            return true;
        else
            return false;
    }

    // applyFilter (image, effect, obj) {
    //   let elemSelector = '[obj-name="'+obj+'"]';
    //   let elem = $(elemSelector + ' img');
    //   switch (effect) {
    //     case "B&W":
    //       $(elem).css('filter','grayscale(1)');
    //       break;
    //     case "SEPIA":
    //       $(elem).css('filter','sepia(1)');
    //       break;
    //   }
    //   return image;
    // }

    applyFilter (image, effect) {
        let clonedImage = image.cloneNode();
        // let clonedImage = image;
        switch (effect) {
            case "B&W":
                $(clonedImage).css('filter','grayscale(1)');
            break;
            case "SEPIA":
                $(clonedImage).css('filter','sepia(1)');
            break;
        }
        return clonedImage;
    }

    // resize (image,width,height,obj) {
    //     let elemSelector = '[obj-name="'+obj+'"]';
    //     let elem = $(elemSelector + ' img');
    //     $(elem).width(width);
    //     $(elem).height(height);
    //     return image;
    // }

    // resize (image, width, height) {
    //   // let elemSelector = '[obj-name="'+obj+'"]';
    //   // let elem = $(elemSelector + ' img');
    //   let elem = image;
    //   $(elem).width(width);
    //   $(elem).height(height);
    //   return image;
    // }

    resize (image, width, height) {

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        let newImage = new Image();
        newImage.crossOrigin = "anonymous";


        if (image.width > 0) {
          ctx.drawImage(image, 0, 0, width, height);
          let imageData = canvas.toDataURL("image/png");
          newImage.src = imageData;
        }
        else {
          image.onload = () => {
            ctx.drawImage(image, 0, 0, width, height);
            let imageData = canvas.toDataURL("image/png");
            newImage.src = imageData;
          }
        }
        return newImage;
    }

    isImageEqual (image1,image2) {
        // let firstImage = new Image();
        // let secondImage = new Image();
        // firstImage.src = image1;
        // secondImage.src = image2;
        let firstImage = image1;
        let secondImage = image2;
        if (this.getBase64Image(firstImage) === (this.getBase64Image(secondImage))) {
            return true;
        }
    }

    clone (image) {
        let clonedImage = image.cloneNode();
        return clonedImage;
    }


    getBase64Image(img) {
        // img.crossOrigin = "Anonymous";
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        let dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    getAverageColourFromImage (image, success) {
        // let img = new Image ();
        // img.src = image;
        let img = image;
        let colour = this.getAverageRGB (img, 5);
        success (colour);
    }

    getAverageRGB(imgEl, size) {

        // imgEl.crossOrigin = "Anonymous";

        let blockSize = size, // only visit every <size> pixels
            defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = {r:0,g:0,b:0},
            count = 0;
        
        if (!context) {
            return defaultRGB;
        }
        
        height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
        width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
        
        context.drawImage(imgEl, 0, 0);
    
        try {
            data = context.getImageData(0, 0, width, height);
        } catch(e) {
            /* security error, img on diff domain */
            return defaultRGB;
        }
        
        length = data.data.length;
        
        while ( (i += blockSize * 4) < length ) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i+1];
            rgb.b += data.data[i+2];
        }
        
        // ~~ used to floor values
        rgb.r = ~~(rgb.r/count);
        rgb.g = ~~(rgb.g/count);
        rgb.b = ~~(rgb.b/count);
        
        return 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
    }

    getPrimaryColour (image, success) {
        // let img = new Image ();
        // img.src = image;
        let img = image;
        // img.crossOrigin = "Anonymous";
        let ele = $(img);
        var colorThief = new ColorThief();
        let palette = colorThief.getPalette(img, 2);
        let primaryColour = 'rgb('+palette[0][0]+','+palette[0][1]+','+palette[0][2]+')';
        success (primaryColour);
    }

    getSecondaryColour (image, success) {
        // let img = new Image ();
        // img.src = image;
        let img = image;
        // img.crossOrigin = "Anonymous";
        let ele = $(img);
        var colorThief = new ColorThief();
        let palette = colorThief.getPalette(img, 2);
        let secondaryColour = 'rgb('+palette[1][0]+','+palette[1][1]+','+palette[1][2]+')';
        success (secondaryColour);
    }

    ImageException(msg) {
        let error = new Error(msg);
        error.name = "ImageException";
        throw error;
    }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ImageLibrary);



/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class JsonObject {

    constructor() {
    }

    parseJSONDataForPath(data, path) {
        let jsonObject = {};
        if (typeof(data) == 'string') {
            try {
                jsonObject = JSON.parse(data);
            }
            catch (e) {
            }
        }
        else if (typeof(data) == 'object') {
            jsonObject = data;
        }
        let jsonPathObject = jsonPath(jsonObject, path);
        //=== is very important. Otherwise 0 will be treated as false as well.
        if (jsonPathObject === false) {
            jsonObject = {};
            return jsonObject;
        }
        else {
            return jsonPathObject;
        }
    }

    parseJSONDataWithCallback(data, successcallback, failurecallback) {
        let jsonObject = {};
        if (typeof(data) == 'string') {
            try {
                jsonObject = JSON.parse(data);
                successcallback(jsonObject);
            }
            catch (e) {
                failurecallback(e);
            }
        }
        else if (typeof(data) == 'object') {
            successcallback(data);
        }
        else {
            failurecallback("Not a valid JSON");
        }
    }

    parseJSONData(data) {
        let jsonObject = {};
        if (typeof(data) == 'string') {
            try {
                jsonObject = JSON.parse(data);
            }
            catch (e) {
                //e['snappMessage'] = 'The input data does not seem a JSON object';
                //throw (e);
            }
            return jsonObject;
        }
        else if (typeof(data) == 'object') {
            return data;
        }
        else {
            return jsonObject;
        }
    }

    isValidJSON(data) {
        let jsonObject = {};
        if (typeof(data) == 'string') {
            try {
                jsonObject = JSON.parse(data);
                return true;
            }
            catch (e) {
                return false;
            }
        }
        else if (typeof(data) == 'object') {
            return true;
        }
        else {
            return false;
        }
    }

    covertToJSON(data) {
        // return this.parseJSONData(data);
        return JSON.stringify(data);
    }

    setObject(value, path, object) {

        let paths = jsonPath(object, path, {resultType: 'PATH'});

        if (paths === false) {
            return;
        }
        // now we have an array of the paths in the object matching the given expression,
        // like:
        // [
        //   "$['store']['book'][0]['author']",
        //   "$['store']['book'][1]['author']",
        //   "$['store']['book'][2]['author']",
        //   "$['store']['book'][3]['author']"
        // ]
        for (let path of paths) {

            let obj = object;
            let prop = object;
            let propName;

            // get the property referred by the path
            let re = /\['?(.*?)'?\]/g; // same as: let re = new RegExp('\\[\'?(.*?)\'?\\]', 'g');
            let propArray;
            while (propArray = re.exec(path)) {
                obj = prop;
                propName = propArray[1];
                prop = prop[propName];
            }
            if (propName) {
                obj[propName] = value;
            }
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (JsonObject);



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(1);
// ES6 imports


class LabelObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */] {

    constructor() {
        super(' .label');
        // this.elemSelectorRef = elemSelectorRef || '';
        var self = this;

        this.getProperty = Object.assign(this.getProperty, {
            Text: (objName) => {
                let textFormat = this.getTextElemFromName(objName)[0].getAttribute('textFormat');
                if (textFormat == 'Plain Text') {
                    return this.getTextElemFromName(objName)[0].getAttribute('plain_text');
                } else return this.getTextElemFromName(objName).html();
            },
            'Max lines': (objName) => {
                return this.getElemFromName(objName).css('-webkit-line-clamp');
            }
        });
        this.setProperty = Object.assign(this.setProperty, {
            Text: (objName, value) => {
                let textFormat = this.getTextElemFromName(objName)[0].getAttribute('textFormat');
                if (textFormat == 'Plain Text') {
                    this.getTextElemFromName(objName).attr('plain_text', value)
                    // var data = $('<div>').text(value.replace(RegExp('\\\\n', 'g'), '\n').replace(RegExp('\\\\t', 'g'), '\t')).html().replace(/\n/g,"<br />").replace(/\t/g,"&nbsp;");
                    // this.getTextElemFromName(objName).html(data);
                    var data = $('<div>').html(value);
                    this.getTextElemFromName(objName).html($(data).text());
                } else  {
                    this.getTextElemFromName(objName).html(value.replace(RegExp('\\\\n|\\\\t|\\\\r|\\\\r\\\\n', 'g'), ''));
                }
            },
            'Max lines': (objName, value) => {
                var elemSelector2 = '[obj-name= "' + objName + '"]';
                if (value > 0) {
                    $(elemSelector2 + ' div.label').css({
                        'overflow': 'hidden',
                        'text-overflow': 'ellipsis',
                        'display': '-webkit-box',
                        '-webkit-line-clamp': value.toString(),
                        '-webkit-box-orient': 'vertical',
                        'height': 'auto',
                        'padding': '0'
                    })
                } else {
                    $(elemSelector2 + ' div.label').css({
                        'text-overflow': 'clip',
                        'display': '',
                        '-webkit-line-clamp': '0',
                        '-webkit-box-orient': '',
                        'padding': 'inherit'
                    })
                }
            }
        });

    };

    getTextHeight(source, width, fontFamily, fontSize) {
        var font = fontSize + "px" + " " + fontFamily;
        var fontDraw = document.createElement("canvas");

        var height = 100;
        var width = 100;

        // here we expect that font size will be less canvas geometry
        fontDraw.setAttribute("height", height);
        fontDraw.setAttribute("width", width);

        var ctx = fontDraw.getContext('2d');
        // black is default
        ctx.fillRect(0, 0, width, height);
        ctx.textBaseline = 'top';
        ctx.fillStyle = 'white';
        ctx.font = font;
        ctx.fillText(source/*'Eg'*/, 0, 0);

        var pixels = ctx.getImageData(0, 0, width, height).data;

        // row numbers where we first find letter end where it ends 
        var start = -1;
        var end = -1;

        for (var row = 0; row < height; row++) {
            for (var column = 0; column < width; column++) {

                var index = (row * width + column) * 4;

                // if pixel is not white (background color)
                if (pixels[index] == 0) {
                    // we havent met white (font color) pixel
                    // on the row and the letters was detected
                    if (column == width - 1 && start != -1) {
                        end = row;
                        row = height;
                        break;
                    }
                    continue;
                }
                else {
                    // we find top of letter
                    if (start == -1) {
                        start = row;
                    }
                    // ..letters body
                    break;
                }

            }

        }
       /*
        document.body.appendChild(fontDraw);
        fontDraw.style.pixelLeft = 400;
        fontDraw.style.pixelTop = 400;
        fontDraw.style.position = "absolute";
       */

        return end - start;
    }

    //
    //this.getProperty['Max lines'] = function(objName) {
    //    return this.getElemFromName(objName).css('-webkit-line-clamp');
    //};
    //
    //this.setProperty['Max lines'] = function(objName, value) {
    //    var elemSelector2 = '[obj-name= "' + objName + '"]';
    //    $(elemSelector2 + ' div.label').css({
    //      'overflow': 'hidden',
    //      'text-overflow': 'ellipsis',
    //      'display': '-webkit-box',
    //      '-webkit-line-clamp': value.toString(),
    //      '-webkit-box-orient': 'vertical',
    //      'height': 'auto',
    //      'padding':'0'
    //});
};

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (LabelObject);

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Code generator for list object
** Created by Harish Shanthi Kumar on 09/12/2016
*/

// ES6 imports

class ListsObject {

  constructor() {}

  listAdd (list,item) {
    return list.push(item);
  }

  listContains (list,item) {
    return (list.indexOf(item) > -1) ? true : false;
  }

  listAppend (list1,list2) {
    return list1.concat(list2);
  }

  listCheck (list) {
    return (list instanceof Array) ? true: false;
  }

  listEmpty (list) {
    return list.length = 0;
  }

  listOrder (list,order) {
    list.sort(function(a, b){
      if( order == "ASCENDING" ) {
        return a-b;
      }
      else {
        return b-a;
      }
    });
  }

  //Define custom exceptions pertaining to network module here.
  ListsUnsupportedRequest (msg) {
    let error = new Error(msg);
    error.name = 'ListsUnsupportedRequest';
    //error.snappMessage = "something?";
    throw error;
  }

  //Define custom exceptions pertaining to network module here.
  ListsNetworkException (msg) {
    let error = new Error(msg);
    error.name = 'ListsNetworkException';
    //error.snappMessage = "something?";
    throw error;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ListsObject);

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_grid_common_list_grid_common_module_js__ = __webpack_require__(2);
/**
 * Created by Ravi on 18/07/2017
 */
/*global $ */

// ES6 imports


class ListViewObject extends __WEBPACK_IMPORTED_MODULE_0__list_grid_common_list_grid_common_module_js__["a" /* default */] {
  constructor() {

    super();

    this.setProperty = Object.assign(this.setProperty, {
      "height": (obj, value) => {
        try {
          if (obj.hasClass("ListViewCell")) {
            obj.each(function(i) {
              $(this).css("height",value+"px");
              $(this).css("top",value*(i));
            });  
          }
        } catch (e) {
          //Listview
          var elem = $('[obj-name= "' + obj + '"]');
          $(elem).css("height",value+"px");
        }

      },
      "Horizontal separator thick": (obj, value) => {
        obj.find(".border-sep").css("height",value+"px");
      },
      
      Alpha: (obj, value) => {
        
        try {
          if (obj.hasClass("ListViewCell")) {
            obj.each(function(i) {
              $(this).css("opacity", value/100 );
            });  
          }
        } catch (e) {
          //Listview
          var elem = $('[obj-name= "' + obj + '"]');
          $(elem).css("opacity", value/100 );
        }
      },
      "Background color" : (obj, value) => {
        
        try {
          if (obj.hasClass("ListViewCell")) {
            obj.each(function(i) {
              $(this).attr("cell-bg-color",value);
              $(this).css("background-color", value);
            });  
          }
        } catch (e) {
          //Listview
          var elem = $('[obj-name= "' + obj + '"]');
          $(elem).css("background-color", value);
        }

      }
    });
  }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ListViewObject);

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Location Module
** Created by Harish Shanthi Kumar on 18/14/2017
*/
class LocationObject {
  
  	constructor() {
  		this.watchID = null;
  		this.lastKnownLocation = {lat: 41.9028, lng: 12.4964};
  	}

	locationCreate (lat,lng) {
	  var locationObj = {lat: lat, lng: lng};
	  return locationObj;
	}

	locationCreateFull(lat, lng, altitude, speed) {
	  var locationObj = {lat: lat, lng: lng, altitude: altitude, speed: speed};
	  return locationObj;
	}

	locationCreateHere() {
		var locationObj = {lat: 0.0, lng: 0.0};
		return locationObj;
	}

	locationGetLatitude(loc) {
		return loc.lat;
	}

	locationGetLongitude(loc) {
		return loc.lng;
	}

	locationGetAltitude(loc) {
		return loc.altitude;
	}

	locationGetSpeed(loc) {
		return loc.speed;
	}

	locationGetDistance(loc1, loc2) {
	  var p = 0.017453292519943295;    // Math.PI / 180
	  var c = Math.cos;
	  var a = 0.5 - c((loc2.lat - loc1.lat) * p)/2 + 
	          c(loc1.lat * p) * c(loc2.lat * p) * 
	          (1 - c((loc2.lng - loc1.lng) * p))/2;
	  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
	}

	createLocationFromText(text, successCallback, errorCallback) {
		console.log ("createLocationFromText " + text);
		var locationArr = text.split(",");
		if( locationArr.length == 2 ) {
			console.log (locationArr);
			var latitude = locationArr[0];
			var longitude = locationArr[1];
			var locationObj = {lat: latitude, lng: longitude};
			successCallback (locationObj);
		}
		else {
			errorCallback ("Invalid Location");
		}
	}

	locationStartTrack(precision, successCallback) {
		var self = this;
		var locCallback = function(position) {
			var locationObj = {lat: position.coords.latitude, lng: position.coords.longitude};
			self.lastKnownLocation = locationObj;
			successCallback(locationObj);
		}
		this.watchID = navigator.geolocation.watchPosition(locCallback);
	}

	locationStopTrack() {
		navigator.geolocation.clearWatch(this.watchID);
	}

	locationCheckGPS() {
		return navigator.geolocation;
	}

	createLocationFromHere () {
		return this.lastKnownLocation;
	}
}

/* harmony default export */ __webpack_exports__["a"] = (LocationObject);



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);


class MapViewObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {
  
  constructor() {
    super(' map view');
    const self = this;
    this.maps = [];
    this.markers = [];
    this.getProperty = Object.assign(this.getProperty, {
            'API key': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('google-map-api-key');
            },
            'Show User Location': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('show-user-location');
            }
        });
        this.setProperty = Object.assign(this.setProperty, {
            'API key': (objName, value) => {
                this.getGraphElemFromName(objName).attr('google-map-api-key', value);
            },
            'Show User Location': (objName, value) => {
                this.getGraphElemFromName(objName).attr('show-user-location', value);
            }
        });
  }

  reset() {
   
  }

  onMapReady (obj,callback) {
    let mapContainerChildLen = $("[obj-name= \"" + obj + "\"]").find("#mapContainer").children().length;
    if (mapContainerChildLen > 0) {
      callback();
    }
  }

  mapViewSetZoom(mapName, zoom) {
    return this.maps[mapName].setZoom(zoom);
  }

  toggleMapUserInteraction(mapName, interaction) {
    var options = {
      draggable: false,
      scrollwheel: false,
      panControl: false,
      zoom: this.maps[mapName].getZoom(),
    };
    if (interaction) {
      var options = {
        draggable: true,
        scrollwheel: true,
        panControl: true,
        zoom: this.maps[mapName].getZoom(),
      };
    }
    var newOptions = this.maps[mapName].setOptions(options);
    return newOptions;
  }

  createMarkerWithImage(image, label) {
    var marker = {};
    var ref = new google.maps.Marker({ title: label, icon: image });
    marker.ref = ref;
    this.markers.push(marker);
    return marker;
  }

  setLocationForMarker(marker, location) {
    var latlng = new google.maps.LatLng(location.lat, location.lng);
    marker.ref.setPosition(latlng);
  }

  addMarkerToMap(mapName, marker) {
    marker.mapName = mapName;
    marker.ref.setMap(this.maps[mapName]);
    this.centerMarkers(mapName);
  }

  setMarkerLabel(text, marker) {
    return marker.ref.setTitle(text);
  }

  setMarkerImage(image, marker) {
    return marker.ref.setIcon(image);
  }

  removeMarker(marker) {
    marker.ref.setMap(null);
    var index = this.markers.indexOf(marker);
    if (index >= 0) {
      this.markers.splice( index, 1 );
    }
    this.centerMarkers(marker.mapName);
  }

  mapViewSetLocation(mapName, location, animation) {
    var latlng = new google.maps.LatLng(location.lat, location.lng);
    this.maps[mapName].setCenter(latlng);
  }

  centerMarkers(mapName) {
    var bounds = new google.maps.LatLngBounds();
    for(var i=0; i<this.markers.length; i++) {
      bounds.extend(this.markers[i].ref.getPosition());
    }

    this.maps[mapName].setCenter(bounds.getCenter());
    this.maps[mapName].fitBounds(bounds);
    this.maps[mapName].setZoom(this.maps[mapName].getZoom()-1);
  }

  MapException(snappMessage, msg) {
    this.name = "MapException";
    this.snappMessage = snappMessage;
    //custom message from snapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MapViewObject);




/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Code generator for the Math Library object
 ** Created by Oscar Rangel on 7/12/2016
 */

 // ES6 imports

class MathLibraryObject {

  constructor() {}

  toNumber (num) {
    if (this.isNumber(num)) {
        return Number(num);
    }
    return null;
  }

  isNumber (o) {
    return ! isNaN(o-0) && o !== null && o !== "" && o !== false && o !== true;
  }

  mathCompare (num1, comp, num2) {
    switch (comp) {
      case "EQ":
        return this.toNumber(num1) == this.toNumber(num2);
      case "NEQ":
        return this.toNumber(num1) != this.toNumber(num2);
      case "LT":
        return this.toNumber(num1) < this.toNumber(num2);
      case "LTE":
        return this.toNumber(num1) <= this.toNumber(num2);
      case "GT":
        return this.toNumber(num1) > this.toNumber(num2);
      case "GTE":
        return this.toNumber(num1) >= this.toNumber(num2);
      default:
        return false;
    }
  }

  mathMinMax (num1, comp, num2) {
    switch (comp) {
      case "MIN":
        return Math.min(this.toNumber(num1), this.toNumber(num2));
      case "MAX":
        return Math.max(this.toNumber(num1), this.toNumber(num2));
      default:
        return 0;
    }
  }

  mathModulo (num1, comp, num2) {
    switch (comp) {
      case "MODULO":
        return this.toNumber(num1)%this.toNumber(num2);
      case "QUOTIENT":
        return Math.floor(this.toNumber(num1)/this.toNumber(num2));
      default:
        return 0;
    }
  }

  mathConversionRadDeg (comp, num) {
    switch (comp) {
      case "DEGTORAD":
        return this.toNumber(num) * (Math.PI/180);
      case "RADTODEG":
        return this.toNumber(num) * (180/Math.PI);
      default:
        return 0;
    }
  }

  mathRoundPrecision (num,percision) {
    return Math.round(this.toNumber(num) * Math.pow(10, this.toNumber(percision))) / Math.pow(10, this.toNumber(percision))
  }

  //Define custom exceptions
}

/* harmony default export */ __webpack_exports__["a"] = (MathLibraryObject);

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Motion Module
*/

class MotionObject {

    constructor() {
        this.interval = null;
    }

    start (interval,callback) {
        
        this.interval = setInterval(function(){ 
            window.addEventListener('deviceorientation', function(event) {
                console.log ("event fired");
                callback(event);
            });
        }, interval*1000); //MS
        
    }

    stop () {
        try {
            clearInterval(this.interval);
        } catch (e) {
            console.error ("Not capturing Orientation event");
        }
    }

    getX (motion) {
        return motion.beta;
    }

    getY (motion) {
        return motion.gamma;
    }

    getZ (motion) {
        return motion.alpha;
    }

    onPhoneShaken (callback) {
        window.addEventListener('deviceorientation', function(event) {
            console.log ("event fired - shake");
            callback();
        });
    }


}

/* harmony default export */ __webpack_exports__["a"] = (MotionObject);

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ES6 imports

class NetworkObject {

  constructor() {}

  createHTTPRequest (url, method) {
    let request = {};
    let protocol = url.split(':')[0];
    if( (method === 'GET' || method === 'POST' || method === 'PUT' || method === 'DELETE') &&
        (protocol === 'http' || protocol === 'https') ) {
      request.url = url;
      request.method = method;
      request.headers = {};
      request.data = {};
      return request;
    }
    else {
      this.HTTPUnsupportedRequest("We support basic http/https operations.<br>Request type can be one of GET/POST/PUT or DELETE");
      return request;
    }
  }

  addHTTPHeader (request, key , value) {
    request.headers[key] = value;
  }

  addHTTPParams (request, key, value) {
    request.data[key] = value;
  }

  setHTTPBody (request, body) {
    if( typeof body == 'object' ) {
      request.data = JSON.stringify(body);
    }
    else if (typeof body == 'string') {
      request.data = body;
    }
    else {
      request.data = "";
      throw new IllegalArgumentException("Body can be currently only of type string or json");
    }
  }

  setDataType (request, type) {
    request.dataType = type;
  }

  setProxyState (request, state) {
    request.proxy = state;
  }

  sendHTTPRequest (request, successcallback, failurecallback) {
    // let url = this.getSanitizedURL(request); // use to use the proxy
    let url = request.url;
    let method = request.method;
    let data = request.data;
    let dataType = request.dataType;
    let headers = request.headers;
    let parent = this;

    $.ajax(
      {
        url: url,
        type: method,
        headers: headers,
        dataType: dataType,
        data: data,
        success: function (response) {
          successcallback(response);
        },
        error: function(xhr, code, msg) {
          failurecallback(code + ': '+ msg);
        }
      });
  }

  getSanitizedURL (request) {
    let proxyUrl = "https://iot.snapp.click:8443/"; // backup 1337
    let isProxyRequired = true; //default is proxy required
    let url = request.url;

    if( (request.proxy != undefined) && (request.proxy === false) ) {
      isProxyRequired = false;
    }

    let sanitizedUrl = url;
    if (isProxyRequired) {
      // url = url.replace(/^.+:\/\//, ""); //Removes all possible protocols - NOTE: not needed with the latest proxy implementation
      sanitizedUrl = proxyUrl + url;
      return sanitizedUrl;
    } else {
      return url;
    }
  }

  //Define custom exceptions pertaining to network module here.

  HTTPUnsupportedRequest (msg) {
    let error = new Error(msg);
    error.name = 'HTTPUnsupportedRequest';
    //error.snappMessage = "something?";
    throw error;
  }

  //Define custom exceptions pertaining to network module here.
  HTTPNetworkException (msg) {
    let error = new Error(msg);
    error.name = 'HTTPNetworkException';
    //error.snappMessage = "something?";
    throw error;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (NetworkObject);


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Notification Module
*/

class NotificationObject {

    constructor() {
        this.notificationCallBack = null;
        this.Notification = null;
        this.notId = null;
    }

    configure(callback) {
        this.notificationCallBack = callback;
    }

    create (title,text) {
        let notification = [title,text];
        this.notify(notification);
        return notification;
    }

    getTitle (notification) {
        return notification[0];
    }

    getText (notification) {
        return notification[1];
    }

    schedule (time,notification) {
        let self = this;
        console.log (time);
        let scheduledTime = time;
        this.notId = setInterval(function(){
            let currTime = new Date();
            console.log ("curr time is" + currTime + " scheduled time is " + scheduledTime);
            if (currTime.toString() == scheduledTime.toString()) {
                self.notify(notification);
                clearInterval(this.notId);
            }
        },1000);
    }

    cancel (notification) {
        this.Notification.close();
    }

    cancelAll () {
        this.Notification.close();   
    }

    notify (not) {
        clearInterval(this.notId);
        let notCallback = this.notificationCallBack;
        if (!("Notification" in window)) {
            console.error("Notification not supported");
        }
        else if (Notification.permission === "granted") {
            this.Notification = new Notification(not[0].replace(/'/g,''), { body: not[1].replace(/'/g,'')});
            this.Notification.onshow = function() { 
                notCallback();
            };
        }
        else if (Notification.permission !== "denied") {
            Notification.requestPermission(function (permission) {
              // If the user accepts, let's create a notification
              if (permission === "granted") {
                this.Notification = new Notification(not[0].replace(/'/g,''), { body: not[1].replace(/'/g,'')});
                this.Notification.onshow = function() {
                    notCallback();
                };

              }
            });
        }
    }

}

var com = com || {};
com.fc = com.fc || {};
com.fc.JavaScriptDistLib = com.fc.JavaScriptDistLib || {};
com.fc.JavaScriptDistLib.Notification = NotificationObject;

/* harmony default export */ __webpack_exports__["a"] = (NotificationObject);

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
/**
 * PageView Module Module
 /*global $ 
*/



class PageViewObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {
  constructor() {
    
    super();
    const self = this;
    this.slider = [];
    this.slideChangeCallback = null;
    this.scrollCallback = null;

    $(document).ready(function() {
      $(".element.fc.PageView").each(function () {
        let objName = $(this)[0].getAttribute("obj-name");
        let el = $(this);
        $(this).find(".PageView").remove();
        self.slider[objName] = $(this).bxSlider(self.getSliderOptions(el));
        $(this).children().css("opacity",1);
      });
    });

  }

  getSliderOptions (ele) {
    
    let animation = $(ele)[0].getAttribute("page-transition-animation");
    let circular = $(ele)[0].getAttribute("page-circular");
    let indicators = $(ele)[0].getAttribute("show-indicators");

    //Options
    let circularSlides = false;
    if (circular == "YES") {
      circularSlides = true;
    }

    let transitionType = "horizontal";
    let transitionSpeed = 500;

    if (animation == "scroll") {
      transitionType = "horizontal";
      transitionSpeed = 500;
    }

    if (animation == "fade") {
      transitionType = "fade";
      transitionSpeed = 500;
    }

    if (animation == "none") {
      transitionSpeed = 0;
    }

    let showPager = true;
    if (indicators == "NO") {
      showPager = false;
    }

    return {
      "infiniteLoop": circularSlides,
      "mode": transitionType,
      "speed":transitionSpeed,
      "pager": showPager
    };

  }

  scrollToPage (obj,page,animated) {
    this.slider[obj].goToSlide(page,animated);    
  }

  getCurrentPage (obj) {
    return this.slider[obj].getCurrentSlide();
  }

  getPages (obj) {
    let sliderArr = [];
    sliderArr.push(this.slider[obj][0]);
    return sliderArr;
  }

  setPages (obj,pages) {
    // add new item(s) to the slider
    let ele = "[obj-name= '" + obj + "']";
    for (let i=0;i<pages.length;i++) {
      $(ele).append("<div class='PageViewPage'></div>");
    }

    // get the current slide
    let currentSlide = this.slider[obj].getCurrentSlide();
    // reload the instance
    let options = this.getSliderOptions(ele);
    options.startSlide = currentSlide;
    this.slider[obj].reloadSlider(options);
    $(ele).find(".PageViewPage:eq("+currentSlide+")").css("opacity",1);
  }

  onPageChange (obj,callback) {
    let ele = "[obj-name= '" + obj + "']";
    let options = this.getSliderOptions(ele);
    options.onSlideAfter = function($slideElement, oldIndex, newIndex) {
      callback(newIndex);
    };
    this.slider[obj].reloadSlider(options);
    $(".element.fc.PageView").each(function () {
      $(this).children().css("opacity",1);
    });
  }

  onPageScroll (obj,callback) {
    let ele = "[obj-name= '" + obj + "']";
    let options = this.getSliderOptions(ele);
    options.onSlideAfter = function($slideElement) {
      callback($slideElement[0].offsetLeft);
    };
    this.slider[obj].reloadSlider(options);
    $(".element.fc.PageView").each(function () {
      $(this).children().css("opacity",1);
    });
  }

}

/* harmony default export */ __webpack_exports__["a"] = (PageViewObject);

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Phone Library Module
*/

class PhoneObject {

  constructor() {}

  call (number,successCallback,erorCallback) {
    let link = document.createElement("a");
    link.href = "tel:"+number;
    link.click();
    successCallback(); //Telephony callback?
  }

  composeSms () {
    let link = document.createElement("a");
    link.href = "sms: ";
    link.click();
  }

  sendSms (numbers,body) {
    let link = document.createElement("a");
    link.href = "sms:+"+numbers+"?body="+body;
    link.click(); 
  }

  composeEmail () {
    let link = document.createElement("a");
    link.href = "mailto: ";
    console.log (link);
    link.click();  
  }

  sendEmail (to,cc,bcc,subject,message) {
    let link = document.createElement("a");
    link.href = "mailto:"+to+"?subject="+subject+"&cc="+cc+"&bcc="+bcc+"&body="+message;
    console.log (link);
    link.click();    
  }

}

/* harmony default export */ __webpack_exports__["a"] = (PhoneObject);



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* QR Code Scanner implementation
** Created by Harish Shanthi Kumar on 30/05/2018
*/

class QRCodeScannerObject {
  
  constructor() {
  }

  configure(scanSuccessCallback, scanFailedCallback) {
    //hs: common across all devices. These are events 
    this.scanSuccessCallback = scanSuccessCallback;
    this.scanFailedCallback = scanFailedCallback;
  }

  
  scan() {
    let parent = this;
    let dummyData = {invitecode: "123456789"};
    this.scanSuccessCallback(JSON.stringify(dummyData));
  }

}
// export class to a global variable for use of the JavaScriptDistLib (only)
var com = com || {};
com.fc = com.fc || {};
com.fc.JavaScriptDistLib = com.fc.JavaScriptDistLib || {};
com.fc.JavaScriptDistLib.QRCodeScanner = QRCodeScannerObject;
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (QRCodeScannerObject);

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
/**
 * Created by Luca Latini on 27/03/17.
 */

// ES6 imports


class ScreenObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor(elemSelectorRef) {
        super();
        const self = this;
        $(document).ready(function() {
            setTimeout( function() {
                let firstScreen = $('.element.fc.Screen');
                let object_name = firstScreen[0].getAttribute('obj-name');
                let callbackScreen = 'show' + object_name;
                if (self.screenDict[callbackScreen]) {
                    history.pushState({'view': `${object_name}`}, `${object_name}`, `${object_name}`);
                    self.screenDict[callbackScreen]();
                }
            }, 50);
        });

        // Element selector
        this.elemSelectorRef = elemSelectorRef || '';

        // Getting Text properties values

        this.getProperty = Object.assign(this.getProperty, {
            'Background image': (objName) => {
                let img = new Image();
                // img.src = this.getScreenElemFromName(objName).css('background-image');
                let imgEl = this.getScreenElemFromName(objName).find('img');
                img.src = imgEl.attr("src");
                return img;
            },
            x: (objName) => { return 0; }, // some properties of the base-object has been overwritten because
            y: (objName) => { return 0; }  // html5 must have the same behaviour of the android and ios platforms
        });

        this.setProperty = Object.assign(this.setProperty, {
            'Background color': (objName, value) => {
                this.getScreenElemFromName(objName).css({
                    'background-color': value,
                    'background-image': '',
                    'background-size': '',
                    'background-repeat': ''
                });
            },
            'Background image': (objName, image) => {
                let imgEl = this.getScreenElemFromName(objName).find('img');
                imgEl.attr("src", image.src);
                //  this.getScreenElemFromName(objName).css({
                //     'background-image': "url('" + image.src + "')",
                //     'background-size': 'contain',
                //     'background-color': '',
                //     'background-repeat': 'no-repeat'
                // });
            },
            width: (objName, value) => {},
            height: (objName, value) => {},
            x: (objName, value) => {},
            y: (objName, value) => {},

            'Loader Visible':(objName, value) => {
                var ele = this.getScreenElemFromName(objName);
                if (value) {
                    var overlayColor = $(ele).attr("overlay-color");
                    var spinnerUrl = $(ele).attr("spinner-url");
                    $(ele).append("<div class = 'spinner-overlay' style = 'background:"+overlayColor+";position:absolute;top:0;left:0;width:100%;height:100%;text-align:center;z-index:1;'><img src = '"+spinnerUrl+"' style = 'position: relative;top: 50%;transform: translateY(-50%);'/></div>");
                } else {
                    $(ele).find(".spinner-overlay").remove();
                }
            }
        });

        this.screenDict = {};
    };

    /**
     * Retrieves the screen element with a given object-name attribute
     * @param objName
     * @returns {*|jQuery|HTMLElement}
     */
    getScreenElemFromName (objName) {
        return $('[obj-name= "' + objName + '"]' + this.elemSelectorRef);
    }

    init ( elemSelectorRefValue) {
        this.elemSelectorRef = elemSelectorRefValue;
    };

    screenPopInit () {
        const self = this.screenDict;
        window.addEventListener('popstate', function (e) {
            let currentScreen = $('.HTML5-deploy-wrapper .Screen:visible');
            let currentScreenName = currentScreen[0].getAttribute('obj-name');
            let callbackScreen =  'back' + currentScreenName;
               if (self[callbackScreen]) {
                   history.pushState({'view': currentScreenName}, currentScreenName, currentScreenName);
                   self[callbackScreen]();
              }  else {
                  currentScreen.hide();
                  $('[obj-name="' + e.state.view + '"]').show();
                }
        });
    };

    screenOrientationInit () {
        const self = this.screenDict;
        window.addEventListener( 'orientationchange', function( e ) {
            let currentScreen = $('.HTML5-deploy-wrapper .Screen:visible');
            let currentScreenName = currentScreen[0].getAttribute('obj-name');
            let callbackScreen = 'orientation' + currentScreenName;
            if (self[callbackScreen]) {
                let getOrientation = '';
                switch(window.orientation) {
                    case -90:
                    case 90:
                        getOrientation = 'landscape';
                        break;
                    default:
                        getOrientation = 'portrait';
                        break;
                }
                self[callbackScreen](getOrientation);
            }
        });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ScreenObject);



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(1);
// ES6 imports


class SliderObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */] {

    constructor() {
        super('.Slider');

        var self = this;

        $(document).ready(function() {
            $('.element.fc.Slider').each(function (obj) {
                var ele = $(this).find("#fcSlider")[0];
                $(this).find('.range-bar').remove();
                new Powerange(ele, {
                    'hideRange': true,
                    'min':$(ele).attr("min"),
                    'max':$(ele).attr("max"),
                    'start':$(ele).attr("curpos")
                });
                var sliderpos = ($(ele).attr("curpos")/$(ele).attr("max"))*100;
                $(this).find(".range-bar").find(".range-quantity").css('width',sliderpos+'%');
                $(this).find(".range-bar").find(".range-handle").css('left',sliderpos+'%');
                $(this).find("#fcSlider").attr('value',sliderpos);

                //Track
                $(this).find(".range-bar").css("background-color", $(ele).attr("track-color"));
                $(this).find(".range-quantity").css("background-color", $(ele).attr("selection-color"));

                //Left & right icons
                if ($(ele).attr("left-icon")) {
                    $(this).find(".range-min").css({
                        "background-image": "url(" + $(ele).attr("left-icon") + ")"
                    });
                }
                if ($(ele).attr("right-icon")) {
                    $(this).find(".range-max").css({
                        "background-image": "url(" + $(ele).attr("right-icon") + ")"
                    });
                }
                if ($(ele).attr("thumb-icon")) {
                    $(this).find(".range-handle").addClass("custom");
                    $(this).find(".range-handle").css({
                        "background-image": "url(" + $(ele).attr("thumb-icon") + ")"
                    });
                }

                //BG and selection images
                if ($(ele).attr("bg-image")) {
                    $(this).find(".range-bar").css({
                        "background-image": "url(" + $(ele).attr("bg-image") + ")"
                    });
                }
                if ($(ele).attr("selection-image")) {
                    $(this).find(".range-quantity").css({
                        "background-image": "url(" + $(ele).attr("selection-image") + ")"
                    });   
                }
            });
        });

        this.getProperty = Object.assign(this.getProperty, {
            'Current value': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find("#fcSlider").attr("curpos");
            },
            'Minimum value': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find("#fcSlider").attr("min");
            },
            'Maximum value': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find("#fcSlider").attr("max");
            },
            'Left icon': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find(".range-min").css("background-image");
            },
            'Right icon': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find(".range-max").css("background-image");
            },
            'Thumb icon': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find(".range-handle").css("background-image");
            },
            'Background color': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find(".range-bar").css("background-color");
            },
            'Selection color': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find(".range-quantity").css("background-color");
            },
            'Background image': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find(".range-bar").css("background-image");
            },
            'Selection image': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find(".range-quantity").css("background-image");
            },
        });
        this.setProperty = Object.assign(this.setProperty, {
            'Current value': (objName, value) => {
               var ele = '[obj-name= "' + objName + '"]';
               var max = $(ele).find("#fcSlider").attr("max");
               var currval = (value/max)*100;
               $(ele).find(".range-bar").find(".range-quantity").css('width',currval+'%');
               $(ele).find(".range-bar").find(".range-handle").css('left',currval+'%');
               //$(ele).find("#fcSlider").val(value).trigger('change');
                $(ele).find("#fcSlider").attr('curpos',value);
            },
            'Minimum value': (objName,value) => {
                var ele = '[obj-name= "' + objName + '"]';
                $(ele).find("#fcSlider").attr("min",value);
            },
            'Maximum value': (objName,value) => {
                var ele = '[obj-name= "' + objName + '"]';
                $(ele).find("#fcSlider").attr("max",value);
            },
            'Left icon': (objName,value) => {
                var ele = '[obj-name= "' + objName + '"]';
                $(ele).find(".range-min").css({
                    "background-image": "url(" + $(value).attr('src') + ")"
                });
            },
            'Right icon': (objName,value) => {
                var ele = '[obj-name= "' + objName + '"]';
                $(ele).find(".range-max").css({
                    "background-image": "url(" + $(value).attr('src') + ")"
                });
            },
            'Thumb icon': (objName,value) => {
                var ele = '[obj-name= "' + objName + '"]';
                $(ele).find(".range-handle").addClass("custom");
                $(ele).find(".range-handle").css({
                    "background-image": "url(" + $(value).attr('src') + ")",
                    "background-color":"transparent",
                    "border-radius":0,
                    "background-size":"contain",
                    "background-repeat":"no-repeat",
                    "background-position":"center center",
                    "box-shadow":"none"
                });
            },
            'Background color': (objName,value) => {
                var ele = '[obj-name= "' + objName + '"]';
                $(ele).find(".range-bar").css("background-color", value);
            },
            'Selection color': (objName,value) => {
                var ele = '[obj-name= "' + objName + '"]';
                $(ele).find(".range-quantity").css("background-color", value);
            },
            'Background image': (objName,value) => {
                var ele = '[obj-name= "' + objName + '"]';
                $(ele).find(".range-bar").css({
                    "background-image": "url(" + $(value).attr('src') + ")"
                });
            },
            'Selection image': (objName,value) => {
                var ele = '[obj-name= "' + objName + '"]';
                $(ele).find(".range-quantity").css({
                    "background-image": "url(" + $(value).attr('src') + ")"
                });
            },
        });

    };
};

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (SliderObject);

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Smart Devices implementation
** Created by Harish Shanthi Kumar on 01/13/2017
*/

class SmartDevicesObject {
  //Supported devices are heart_rate, blood_pressure, glucometer, spo2
  constructor() {
    //devices
    this.device_type_hrm = "hrm";
    this.device_type_pulse_oximeter = "spo2";
    this.device_type_glucometer = "bg";
    this.device_type_blood_pressure = "bp";
    this.device_type_pedometer = "pedometer";
    
    //hs: ble characteristics of various supported devices
    this.hrm_service_uuid = "0000180d-0000-1000-8000-00805f9b34fb";
    this.pulse_oximeter_service_uuid = "00001822-0000-1000-8000-00805f9b34fb";
    this.fora_spo2_service_uuid = "00001523-1212-efde-1523-785feabcd123";
    this.fora_spo2_characteristic_uuid = "00001524-1212-efde-1523-785feabcd123";
    this.supported_services = [
      this.hrm_service_uuid,
      this.pulse_oximeter_service_uuid,
      this.fora_spo2_service_uuid
    ];

    //hs: Dummy Pedometer simulation
    this.pedometer_simulation_address = "aa:bb:cc:dd:ee";
    this.pedometer_simulation_name = "Pedometer";
    this.pedometer_simulation_protocol = "protocol_internal_pedometer";
    this.pedometer_simulation_timer = undefined;
    this.pedometer_simulation_daily_step_count = 0;
    this.pedometer_simulation_incremental_step_count = 10;
    this.pedometer_simulation_interval = 10000;
    this.pedometer_simulation_default_recordcount = 7;
    
    //hs: active device map
    this.devices = {};
  }

  configure(config) {
  }

  configureDevices(deviceFoundCallback, deviceDisconnectedCallback, deviceDataChangedCallback) {
    //hs: common across all devices. These are events 
    this.deviceFoundCallback = deviceFoundCallback;
    this.deviceDisconnectedCallback = deviceDisconnectedCallback;
    this.deviceDataChangedCallback = deviceDataChangedCallback;
  }

  
  startDiscovery(timeout) {
    let parent = this;

    //hs: pedeometer simulation
    setTimeout( function() {
        parent.devices[parent.pedometer_simulation_address] = {};
        parent.devices[parent.pedometer_simulation_address].type = parent.device_type_pedometer;
        parent.devices[parent.pedometer_simulation_address].name = parent.pedometer_simulation_name;
        parent.devices[parent.pedometer_simulation_address].address = parent.pedometer_simulation_address;
        if( parent.deviceFoundCallback!=undefined )
          parent.deviceFoundCallback(parent.pedometer_simulation_address, parent.pedometer_simulation_name);
    }, 100);

    let options = {
      filters: [
        {services: ["heart_rate"]},
        {services: [0x1822]},
        {services: [0x1809]},
        {services: ["636f6d2e-6a69-7561-6e2e-504f56313100"]},
        {services: ["00001523-1212-efde-1523-785feabcd123"]}
      ]
    };
    return navigator.bluetooth.requestDevice(options)
      .then(device => {
        parent.devices[device.id] = {};
        parent.devices[device.id].bledevice = device;
        parent.devices[device.id].name = device.name;
        parent.devices[device.id].characteristics = new Map();
        parent.deviceFoundCallback(device.id, device.name);
      });
  }

  stopDiscovery() {
    //hs: web bluetooth is dialog based discovery. Cancel option is there
    //in the dialog itself. Nothing to do here.
  }

  getDeviceNameForAddress(deviceAddress) {
    if( this.devices[deviceAddress] != undefined ) {
      return this.devices[deviceAddress].name;
    }
    else {
      return "";
    }
  }

  getDeviceTypeForAddress(deviceAddress) {
    if( this.devices[deviceAddress] != undefined ) {
      return this.devices[deviceAddress].type;
    }
    else {
      return "";
    }
  }

  connectToDevice(deviceAddress, successcallback, failurecallback) {
    let device = this.devices[deviceAddress].bledevice;
    let parent = this;
    if( !device ) {
      //hs: check if device is non ble
      if( this.devices[deviceAddress].type == this.device_type_pedometer ) {
        successcallback();
        this._startPedometerSimulation();
      }
      else {
        failurecallback("Device not found!");  
      }
      return;
    }
    
    device.addEventListener("gattserverdisconnected", event => {
      parent.deviceDisconnectedCallback(deviceAddress);
    });

    device.gatt.connect()
      .then(server => server.getPrimaryServices())
      .then(services => {
        console.log(services);
        var service = services[0];
        for(var i=0; i<services.length; i++) {
          var service = services[i];
          if (this.supported_services.indexOf(service.uuid)!=-1) {
            service = services[i];
            break;
          }
        }
        var characteristicString = this._getRequiredCharacteristics(service);
        service.getCharacteristic(characteristicString)
          .then(characteristic => { 
            console.log(characteristic);
            parent.devices[deviceAddress].characteristics.set(characteristic.uuid, characteristic);
            parent._startNotifications(deviceAddress, characteristic.uuid);
            successcallback();
          })
          .catch(error => { 
            console.log(error);
            failurecallback(error);
          });
      });  
  }

  _getRequiredCharacteristics(service) {
    //hs: we could also return multiple characteristics for a primary
    //service in future.
    let id = service.device.id;
    switch(service.uuid) {
    case this.hrm_service_uuid:
      this.devices[id].type = this.device_type_hrm;
      return "heart_rate_measurement";
    case this.pulse_oximeter_service_uuid:
      this.devices[id].type = this.device_type_pulse_oximeter;
      return "plx_continuous_measurement";
    case this.fora_spo2_service_uuid:
      this.devices[id].type = this.device_type_pulse_oximeter;
      return this.fora_spo2_characteristic_uuid;
      return; 
    }
  }

  disconnectFromDevice(deviceAddress) {
    let device = this.devices[deviceAddress].bledevice;
    if (!device) {
      if( this.devices[deviceAddress].type == this.device_type_pedometer ) {
        this.deviceDisconnectedCallback(deviceAddress);
        this._stopPedeometerSimulation();
      }
      return;
    }
    console.log("Disconnecting from BLE Device..." + deviceAddress);
    if (device.gatt.connected) {
      device.gatt.disconnect();
    } else {
      console.log("BLE Device " + deviceAddress + " already disconnected");
    }

  }

  readDataFromDevice(deviceAddress) {
    //hs: every device needs a different trigger to spit out different data.
    //we decide this based on characteristic for now.
    let device = this.devices[deviceAddress];
    var characteristic = device.characteristics.get(this.fora_spo2_characteristic_uuid);
    if( characteristic!= undefined ) {
      this._requestForaPulseOximeterData(deviceAddress);  
    }
  }

  readHistoricalData(deviceAddress, recordCount, successcallback, failurecallback) {
    var historicalData = [];
    if((this.devices[deviceAddress] == undefined) && 
      (deviceAddress == this.pedometer_simulation_address)) {
        this._createPedometerDeviceSimulation();
    }
    if( this.devices[deviceAddress].type == this.device_type_pedometer ) {
      historicalData = this._populateDummyPedometerReadings(recordCount);
      successcallback(historicalData);
    }
    else {
      failurecallback("Not supported yet for this device");
    }
  }

  readHistoricalDataSync(deviceAddress, recordCount) {
    var historicalData = [];
    if((this.devices[deviceAddress] == undefined) && 
      (deviceAddress == this.pedometer_simulation_address)) {
        this._createPedometerDeviceSimulation();
    }
    if( this.devices[deviceAddress].type == this.device_type_pedometer ) {
      historicalData = this._populateDummyPedometerReadings(recordCount);
    }
    return historicalData;
  }

  _populateDummyPedometerReadings(recordCount) {
    var historicalData = [];
    if(recordCount < 0 )
        recordCount = this.pedometer_simulation_default_recordcount;
      
    var currDate = new Date();
    for(var i=0; i<recordCount; i++) {
      var data = {};
      var entryDate = new Date();
      entryDate.setDate(currDate.getDate()-i);
      data.timestamp = entryDate.getTime();
      data.daily_step_count = this._getRandomInt(5000, 10000);
      historicalData.push(data);
    }
    return historicalData;
  }

  _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  _createPedometerDeviceSimulation() {
    this.devices[this.pedometer_simulation_address] = {};
    this.devices[this.pedometer_simulation_address].type = this.device_type_pedometer;
    this.devices[this.pedometer_simulation_address].name = this.pedometer_simulation_name;
    this.devices[this.pedometer_simulation_address].address = this.pedometer_simulation_address;
  }

  _parseHeartRate(value) {
    // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
    value = value.buffer ? value : new DataView(value);
    let flags = value.getUint8(0);
    let rate16Bits = flags & 0x1;
    let result = {};
    let index = 1;
    if (rate16Bits) {
      result.heart_rate = value.getUint16(index, /*littleEndian=*/true);
      index += 2;
    } else {
      result.heart_rate = value.getUint8(index);
      index += 1;
    }
    let contactDetected = flags & 0x2;
    let contactSensorPresent = flags & 0x4;
    if (contactSensorPresent) {
      result.contact_detected = !!contactDetected;
    }
    let energyPresent = flags & 0x8;
    if (energyPresent) {
      result.energy_expanded = value.getUint16(index, /*littleEndian=*/true);
      index += 2;
    }
    let rrIntervalPresent = flags & 0x10;
    if (rrIntervalPresent) {
      let rrIntervals = [];
      for (; index + 1 < value.byteLength; index += 2) {
        rrIntervals.push(value.getUint16(index, /*littleEndian=*/true));
      }
      result.rr_interval = rrIntervals;
    }
    return result;
  }

  _parsePulseOximeterData(value) {
    let index = 0;
    value = value.buffer ? value : new DataView(value);
    let flags = value.getUint8(index);
    index++;
    var result = {};
    result.oxygen = value.getUint16(index, /*littleEndian=*/true);
    index += 2;
    result.heart_rate = value.getUint16(index, /*littleEndian=*/true);
    index+=2;
    return result;
  }

  _requestForaPulseOximeterData(deviceAddress) {
    // encode the command.
    var dataBuffer = new ArrayBuffer(8);
    var writeData = new DataView(dataBuffer);
    writeData.setUint8(0, 0x51); //Start sequence
    writeData.setUint8(1, 0x49); //CMD: Read real time data
    writeData.setUint8(2, 0x00); //Payload:0
    writeData.setUint8(3, 0x00); //Payload:1
    writeData.setUint8(4, 0x00); //Payload:2
    writeData.setUint8(5, 0x00); //Payload:3
    writeData.setUint8(6, 0xA3); //End sequence
    var checkSum = 0x00;
    for(var i=0; i<writeData.byteLength-1; i++) {
      checkSum += writeData.getUint8(i);
    }
    writeData.setUint8(7, checkSum);
    
    this._writeCharacteristicValue(deviceAddress, this.fora_spo2_characteristic_uuid, writeData);
  }

  _parseForaPulseOximeterData(value) {
    value = value.buffer ? value : new DataView(value);
    var command = value.getUint8(1);
    var result = {};
    switch(command) {
    case 0x49://real time data
      result.oxygen = value.getUint16(2, /*littleEndian=*/true);
      result.heart_rate = value.getUint8(5);
      return result;
    case 0x24: //device info
      result.device_model = value.getUint16(2, /*littleEndian=*/true);
      return result;
    }
    return null;
  }

  _getCharacteristic(deviceAddress, characteristicUuid){
    let device = this.devices[deviceAddress];
    if (!device) {
      return null;
    }
    let characteristic = device.characteristics.get(characteristicUuid);
    return characteristic;
  }
  
  _readCharacteristicValue(deviceAddress, characteristicUuid) {
    let characteristic = this._getCharacteristic(deviceAddress, characteristicUuid);
    if( characteristic ) {
      return characteristic.readValue();
    }
  }

  _writeCharacteristicValue(deviceAddress, characteristicUuid, value) {
    let characteristic = this._getCharacteristic(deviceAddress, characteristicUuid);
    if( characteristic!=null ) {
      return characteristic.writeValue(value);  
    }
  }
  
  _startNotifications(deviceAddress, characteristicUuid) {
    let characteristic = this._getCharacteristic(deviceAddress, characteristicUuid);
    if( characteristic!=null ) {
      let parent = this;
      console.log("Registering for data change events on " + characteristicUuid);
      characteristic.startNotifications()
        .then(characteristic => {
          characteristic.addEventListener("characteristicvaluechanged", event => {
            var deviceType = this.devices[deviceAddress].type;
            var retData;

            switch(deviceType) {
            case this.device_type_hrm:
              retData = parent._parseHeartRate(event.target.value);
              console.log("Heart Rate = " + retData.heart_rate);
              break;
            case this.device_type_pulse_oximeter:
              if( characteristicUuid == this.fora_spo2_characteristic_uuid ) {
                retData = parent._parseForaPulseOximeterData(event.target.value);
              }
              else {
                retData = parent._parsePulseOximeterData(event.target.value);
                console.log("Oxygen = " + retData.oxygen + " Heart Rate = " + retData.heart_rate);  
              }
              break;
            }
            if( retData!=null ) {
              parent.deviceDataChangedCallback(deviceAddress, retData);
            }
            
          });
        });   
    }
  }

  _stopNotifications(deviceAddress, characteristicUuid) {
    let characteristic = this._getCharacteristic(deviceAddress, characteristicUuid);
    // Returns characteristic to remove characteristicvaluechanged event
    // handlers in the resolved promise.
    if( characteristic!=null ) {
      return characteristic.stopNotifications()
        .then(() => characteristic);  
    }
  }

  _startPedometerSimulation() {
    console.log("Starting pedometer simulation");
    let parent = this;
    this.pedometer_simulation_timer = setInterval(function() {
      parent.pedometer_simulation_daily_step_count += parent.pedometer_simulation_incremental_step_count;
      var pedometerData = {};
      pedometerData.daily_step_count = parent.pedometer_simulation_daily_step_count;
      parent.deviceDataChangedCallback(parent.pedometer_simulation_address, pedometerData);
    },parent.pedometer_simulation_interval);
  }

  _stopPedeometerSimulation() {
     console.log("Stopping pedometer simulation");
    if( this.pedometer_simulation_timer!=undefined ) {
      clearInterval(this.pedometer_simulation_timer);
    }
  }
}
// export class to a global variable for use of the JavaScriptDistLib (only)
var com = com || {};
com.fc = com.fc || {};
com.fc.JavaScriptDistLib = com.fc.JavaScriptDistLib || {};
com.fc.JavaScriptDistLib.SmartDevices = SmartDevicesObject;
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (SmartDevicesObject);


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snapclinical__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snapclinical___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_snapclinical__);



class SnapClinicalObject {
  constructor() {
    this.config = {
      baseUrl: "",
      username: "",
      password: "",
      userid: "",
      frontEndKey: ""
    };
    this.explicitEnvironmentSet = false;
  }

  configure(config) {
    let properties;
    if (config) {
      properties = JSON.parse(config);
    }
    else if (!this.config.BaseURL) {
      let snapClinicalSO = Creator.currentProject.serviceModel.getServiceObject("SnapClinical");
      properties = snapClinicalSO.attributes.attrs;
    }
    if (properties) {
      let baseUrl = properties.api.url;
      if(baseUrl){
        this.config.baseUrl = properties.api.url;
      }else{
        this.config.baseUrl =  "https://staging.snapclinical.net:8443";
      }
      this.config.frontEndKey = properties.api.frontEndKey;
      this.config.username = properties.api.username;
      this.config.password = properties.api.password;
      this.config.userid = properties.api.userid;
    }
  }

  setEnvironmentVariables(baseUrl, frontEndKey){
    if( baseUrl!=undefined && frontEndKey!=undefined ) {
      this.config.baseUrl = baseUrl;
      __WEBPACK_IMPORTED_MODULE_0_snapclinical__["client"].apiBaseUrl = baseUrl;
      __WEBPACK_IMPORTED_MODULE_0_snapclinical__["client"].frontEndKey = frontEndKey;
      this.explicitEnvironmentSet = true;  
    }
  }

  snapClinicalConfigure(username, password, userid, frontEndKey, baseUrl){
    this.config.username = username;
    this.config.password = password;
    this.config.userid = userid;
    //set only if a call to setEnvironmentVariables has not been called
    
    const user = new __WEBPACK_IMPORTED_MODULE_0_snapclinical__["User"]();
    user.accountName = username;
    user.password = password;
    __WEBPACK_IMPORTED_MODULE_0_snapclinical__["client"].personalId = userid;
    //if setEnvironmentVariables is explicitly called earlier; we don't set these values from
    //properties. On other hand if we don't explicitly set; the values from properties
    //get picked up
    if(this.explicitEnvironmentSet == false) {  
      this.config.baseUrl = baseUrl;
      __WEBPACK_IMPORTED_MODULE_0_snapclinical__["client"].frontEndKey = frontEndKey;
      __WEBPACK_IMPORTED_MODULE_0_snapclinical__["client"].apiBaseUrl = baseUrl;
    }
  }

  /**
   * @deprecated
   * @param processDefKey
   * @param qualifier
   * @param successcallback
   * @param failurecallback
   * @return {Promise<void>}
   */
  async snapClinicalcreateNewInstanceAndGetFirstTask(processDefKey, qualifier, successcallback, failurecallback) {
    console.warn("snapClinicalcreateNewInstanceAndGetFirstTask is deprecated");

    let taskData;
    try {
      taskData = await __WEBPACK_IMPORTED_MODULE_0_snapclinical__["flowService"].createNewInstanceAndGetFirstTask(processDefKey, qualifier);
    }
    catch(e) {
      console.error("Error in createNewInstanceAndGetFirstTask");
      console.error(e);
      failurecallback(e);
      return;
    }
    let vars, flds, outcms;
    vars = flds = outcms = [];

    if (taskData) {
      vars = taskData.variables;
      flds = taskData.fields;
      outcms = taskData.outcomes;
    }
    successcallback(vars, flds, outcms);
  }

  /**
   * @deprecated
   * @param processDefKey
   * @param successcallback
   * @param failurecallback
   * @return {Promise<void>}
   */
  async snapClinicalGetNextTaskOnProcess(processDefKey, successcallback, failurecallback) {
    console.warn("snapClinicalGetNextTaskOnProcess is deprecated");
    let taskData;
    try {
      taskData = await __WEBPACK_IMPORTED_MODULE_0_snapclinical__["flowService"].getNextTask(processDefKey, []);
    }
    catch(e) {
      console.error("Error in GetNextTaskOnProces");
      console.error(e.message);
      failurecallback(e.message);
      return;
    }
    let vars, flds, outcms;
    vars = flds = outcms = [];

    if (taskData) {
      vars = taskData.variables;
      flds = taskData.fields;
      outcms = taskData.outcomes;
    }
    successcallback(vars, flds, outcms);
  }

  /**
   * @deprecated
   * @param variables
   * @param fields
   * @param outcomes
   * @param successcallback
   * @param failurecallback
   * @return {Promise<void>}
   */
  async snapClinicalSaveTaskVariables(variables, fields, outcomes, successcallback, failurecallback) {
    console.warn("snapClinicalSaveTaskVariables is deprecated");
    try {
      await __WEBPACK_IMPORTED_MODULE_0_snapclinical__["flowService"].saveVariables(variables, fields || [], outcomes);
    }
    catch(e) {
      console.error("Error in SaveTaskVariables");
      console.error(e);
      failurecallback(e);
      return;
    }
    successcallback();
  }

  /**
   * @deprecated
   * @param successcallback
   * @param failurecallback
   * @return {Promise<void>}
   */
  async snapClinicalMoveToNextTask(successcallback, failurecallback) {
    console.warn("snapClinicalMoveToNextTask is deprecated");
    let taskData;
    try {
      taskData = await __WEBPACK_IMPORTED_MODULE_0_snapclinical__["flowService"].moveToNextTask();
      console.error("snapClinicalMoveToNextTask::got response");
      if( taskData != null ) {
        // console.log("snapClinicalMoveToNextTask variables" ,taskData.variables);
        // console.log("snapClinicalMoveToNextTask fields" ,taskData.fields);
        // console.log("snapClinicalMoveToNextTask outcomes", taskData.outcomes);
      }
      else {
        console.warn("snapClinicalMoveToNextTask NULL, this means the flow process ends.");
      }
    }
    catch(e) {
      console.error("Error in MoveToNextTask");
      console.error(e);
      failurecallback(e);
      return;
    }
    let vars, flds, outcms;
    vars = flds = outcms = [];

    if (taskData) {
      vars = taskData.variables;
      flds = taskData.fields;
      outcms = taskData.outcomes;
    }
    successcallback(vars, flds, outcms);
  }

  /**
   * Start a new process or resume my existing tasks
   *
   * @param {Object} processData      - object containing process definition,  lookup and initial values for the process
   *                                    see more info on SDk related method
   *
   * @param successcallback
   * @param failurecallback
   * @return {Promise<Array<Object>>}  returns an array of task objects in the form:
   *                                    {processInstanceId: NNNNN, variables: [], formProperties: [], fields: [], ...}
   */
  async startProcess(processData, successCallback, failureCallback) {

    let taskData = [];
    try {
      taskData = await __WEBPACK_IMPORTED_MODULE_0_snapclinical__["snapClinicalApiService"].startNewOrResumeProcess(processData);
    }
    catch(e) {
      console.warn("Error in snapClinical.startProcess", e);
      failureCallback(e);
      return;
    }

    successCallback(taskData);
  }

  /**
   * Helper function to set a form outcome (by name) into a task variable.
   * This will add (or override) an outcome property to the task, corresponding to one of the available
   * outcomes defined in the task itself.
   *
   * @param {Object} taskData       - Object representing the target task to update
   * @param {String} outcomeName    - Name of the outcome to set. This has to be one of the names listed in the
   *                                  {taskData}.formData.outcomes array.
   */
  setOutcomeByName(taskData, outcomeName) {
    if (taskData && taskData.formData && taskData.formData.outcomes) {
      let selectedOutcome;
      for (var i=0; i < taskData.formData.outcomes.length; i++) {
        if (taskData.formData.outcomes[i].name === outcomeName) {
          selectedOutcome = taskData.formData.outcomes[i];
          break;
        }
      }
      if (selectedOutcome) {
        taskData = Object.assign(taskData, {outcome: selectedOutcome});
      } else {
        console.warn("setOutcomeByName: Outcome name not found in the formData");
      }
    }
  }

  /**
   * Completes the provided task and get new tasks
   *
   * @param {Object} taskData  object representing the task to be completed. The object is in the form:
   *                           {
   *                             "taskId": 196677,
   *                             "formkey": "myFormKey",
   *                             "processVariables": [
   *                               {
   *                                 "name": "initiator   userStatus   switchToProcess",
   *                                 "type": "integer",
   *                                 "value": "some value for the variable",
   *                                 "valueUrl": "https://staging.snapclinical.net:8443/ ... ",
   *                                 "scope": "local"
   *                               }
   *                             ],
   *                              "formProperties": [
   *                               {
   *                                 "id": "templateType  outcomeAndFieldMapping  infoText  title",
   *                                 "name": "some name",
   *                                 "type": "date",
   *                                 "value": "some value for this property",
   *                                 "enumValues": [
   *                                    {
   *                                     "id": "some id - can be null for the outcomes",
   *                                     "name": "some name or outcome value"
   *                                   }
   *                                 ]
   *                               }
   *                             ],
   *                              "formData": {
   *                               "id": "some id",
   *                               "key": "some key for this Form",
   *                               "fields": [
   *                                 {
   *                                   "id": "some id",
   *                                   "name": "some name",
   *                                   "fieldType": "FormField",
   *                                   "type": "multi-line-text",
   *                                   "value": "some value",
   *                                   "expression": "some expression",
   *                                   "optionType": "some option type",
   *                                   "hasEmptyValue": false,
   *                                   "options": [
   *                                     {
   *                                       "id": "some id - can be null for the outcomes",
   *                                       "name": "some name or outcome value"
   *                                     }
   *                                   ]
   *                                 }
   *                               ],
   *                               "outcomes": [
   *                                 {
   *                                   "id": "some id - can be null for the outcomes",
   *                                   "name": "some name or outcome value"
   *                                 }
   *                               ]
   *                             }
   *
   *                                provided info will update the task information before completing the task
   * @param successcallback
   * @param failurecallback
   * @return {Promise<Array<Object>>}   returns an array containing all active user tasks within the same process instance
   *                                    of the task being completed (and related to the same user completing it)
   *                                    returned items in the array are in the form:
   *                                    {processInstanceId: NNNNN, variables: [], formProperties: [], fields: [], ...}
   */

  async completeTaskAndGetNext(taskData, successCallback, failureCallback) {


    let taskToBeUpdated = {};
    let nextTasksData = [];

    /**   task object to be passed to the SDK call:
     *  {
          "taskId": "some Id",
          "formDefinitionId": "form id",
          "processVariables": [
            {
              "name": "initiator   userStatus   switchToProcess",
              "type": "integer",
              "value": "some value for the variable",
              "valueUrl": "https://staging.snapclinical.net:8443/ ... ",
              "scope": "local"
            }
          ],
          "fields": [
            {
              "id": "some id",
              "value": "some value for the field"
            }
          ],
          "outcome": {
            "id": "some id - can be null for the outcomes",
            "name": "some name or outcome value"
          }
        }
     */
    if (taskData.taskId) taskToBeUpdated.taskId = taskData.taskId;
    if (taskData.formData && taskData.formData.id) taskToBeUpdated.formDefinitionId = taskData.formData.id;
    if (taskData.processVariables) taskToBeUpdated.processVariables = taskData.processVariables;
    if (taskData.formData && taskData.formData.fields) taskToBeUpdated.fields = taskData.formData.fields.map( x => ({"id": x.id, "value": x.value}));
    if (taskData.outcome) taskToBeUpdated.outcome = taskData.outcome;

    try {
      nextTasksData = await __WEBPACK_IMPORTED_MODULE_0_snapclinical__["snapClinicalApiService"].completeAndGetNext(taskToBeUpdated);
    }
    catch(e) {
      console.warn("Error in snapClinical.completeTaskAndGetNext", e);
      failureCallback(e);
      return;
    }

    successCallback(nextTasksData);
  }

  /**
   * Get all Active Tasks for the current user with lookup Criteria
   *
   * @param {Object} lookupData           - object defining lookup criteria in the form:
   *          {
   *            "processDefinitionKey": "processKeyValue",
   *            "processDefinitionId": "processKeyValue:NNN:MMM",
   *            "processDefinitionKeyLike": "processKeyLikeValue"
   *            "queryVariables": [
   *               {
   *                  "name": "variableName",
   *                  "value": "variableValue",
   *                  "operation": "equals",
   *                  "type" : "string"
   *               }
   *             ]
   *          }
   *
   * @param successcallback
   * @param failurecallback
   * @return {Promise<Array<Object>>}  returns an array of task objects in the form:
   *                                    {processInstanceId: NNNNN, variables: [], formProperties: [], fields: [], ...}
   */
  async getActiveTasks(lookupData, successCallback, failureCallback) {

    let resultTaskList = [];
    try {
      resultTaskList = await __WEBPACK_IMPORTED_MODULE_0_snapclinical__["snapClinicalApiService"].getActiveTasks(lookupData);
    }
    catch(e) {
      console.warn("Error in snapClinical.getActiveTasks", e);
      failureCallback(e);
      return;
    }

    successCallback(resultTaskList);
  }

  /**
   * Executes an action on a given task.
   *
   * @param {Object} actionData         - object defining the action to be performed.
   *                                    The object can have the following structure: <code>
   *                                    {
   *                                      "taskId": "someId",
   *                                      "action": "complete" | "claim" | "delegate" | "resolve",
   *                                      "variables": [ {
   *                                          "name" : "variableName",
   *                                          "value" : "variableValue",
   *                                          "valueUrl" : "http://...",
   *                                          "type" : "string"
   *                                          }
   *                                      ],
   *                                      "assignee": "userWhoClaimsOrToDelegateTo"
   *                                    }
   *                                    </code>
   *                                    property taskId and action are mandatory.
   * @param successcallback
   * @param failurecallback
   * @return {Promise<Object>}    returns a result object.
   */
  async taskAction(actionData, successCallback, failureCallback) {

    let result;
    try {
      result = await __WEBPACK_IMPORTED_MODULE_0_snapclinical__["snapClinicalApiService"].taskAction(actionData);
    }
    catch(e) {
      console.warn("Error in snapClinical.taskAction", e);
      failureCallback(e);
      return;
    }

    successCallback(result);
  }

  async fetch(url, method, body, successCallback, failureCallback) {

    let result;

    try {
      let response;
      response = await __WEBPACK_IMPORTED_MODULE_0_snapclinical__["client"].fetch(url, method, null, body, null);
      result = await response.json();
    }
    catch(e) {
      console.warn("Error in snapClinical.fetch", e);
      failureCallback(e);
      return;
    }

    successCallback(result);
  }

}
// export class to a global variable for use of the JavaScriptDistLib (only)
var com = com || {};
com.fc = com.fc || {};
com.fc.JavaScriptDistLib = com.fc.JavaScriptDistLib || {};
com.fc.JavaScriptDistLib.SnapCinical = SnapClinicalObject;
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (SnapClinicalObject);


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ES6 imports

class StorageObject {

  constructor() {}

  add (key,value) {
    return localStorage.setItem(key,JSON.stringify(value));
  }

  remove (key) {
    return localStorage.removeItem(key);
  }

  clear (key) {
    return localStorage.clear();
  }

  getValue (key) {
    let value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  getAllKeys () {
    return Object.keys(localStorage);
  }

  //Define custom exceptions pertaining to storage module here.
}

/* harmony default export */ __webpack_exports__["a"] = (StorageObject);


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * System Module Module
*/


class SystemObject  {

    constructor() {
    }

    getCountry () {
        // $.getJSON('https://ipinfo.io', function(data){
        //     console.log (data.country);
        //     return data.country;
        // });
    }

    showToast (text,durationType) {
        let duration = 5000;
        if (durationType == "LONG") {
            duration = 10000;
        }
        toastr.options.closeButton = true;
        toastr.info(text, {timeOut: duration});
    }

    launchBrowser (url) {
        window.open(url);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (SystemObject);

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(1);
// ES6 imports




class TextLibraryObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */]{

  constructor(){
    super(" TextLibraryObject");
  }

  textComparison (text1, comp, text2) {
    // checking text variables to prevent issues
    if (text1 == null) text1 = "";
    if (text2 == null) text2 = "";
    switch (comp) {
    case "LESS":
      return text1.toString() < text2.toString();
    case "EQUAL":
      return text1.toString() == text2.toString();
    case "GREATER":
      return text1.toString() > text2.toString();
    default:
      return false;
    }
  }

  textTrim(text){
    return text.toString().trim().replace(/&nbsp;/g, "").replace(/\<br\s*[\/]?>/gi, "");
  }

  textChangeCase(text, comp) {
    switch (comp) {
    case "UPPERCASE":
      return text.toString().toUpperCase();
    case "LOWERCASE":
      return text.toString().toLowerCase();
    default:
      return "";
    }
  }

  textSubstring(text, from, length){
    return text.toString().substring(Number(from),Number(from) + Number(length));
  }


  textContains(string, substring) {
    return ((string.toString().indexOf(substring)) !== -1);
  }

  textIndexOf(string, substring) {
    return string.toString().indexOf(substring);
  }

  textSplitAt(text, index) {
    return [text.toString().substring(0, Number(index)), text.toString().substring(Number(index))];
  }

  textSplitWith(string, separator) {
    return string.toString().split(separator.toString());
  }

  textReplace(textFrom, textTo, textSource){
    var returnText = textSource.toString();
    while (returnText.indexOf(textFrom.toString()) !== -1){
      returnText = returnText.toString().replace(textFrom.toString(),textTo.toString());
    }
    return returnText;
  }

  isText(text) {
    return (typeof text === "string" || text instanceof String);
  }

  convertToText(data) {
    if( jQuery.isXMLDoc( data ) ) {
      return  (new XMLSerializer()).serializeToString(data);
    }
    else if( jQuery.isArray( data ) )  {
      return data.toString();
    }
    else if( typeof data == "string" ) {
      return data;
    }
    else {
      return JSON.stringify(data);
    }
  }

}
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (TextLibraryObject);

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(1);
// ES6 imports


class TextboxObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */] {

    constructor() {
        super(' input.textView');
        var self = this;
        this.getProperty = Object.assign(this.getProperty, {
            Text: (objName) => {
               return this.getElemFromName(objName).find('input.textView').val();
            },
            'Max chars': (objName) => {
                return this.getElemFromName(objName).find('input.textView').attr('maxlength');
            },
            'Password chars': (objName) => {
                let type = this.getElemFromName(objName).find('input.textView').attr('type');
                if (type == 'password') {
                    return true;
                }
                return false;
            },
            'Enabled': (objName) => {
                let result = this.getElemFromName(objName).find('input.textView').attr('disabled');
                return !result;
            },
            'Input type': (objName) => {
                return this.getElemFromName(objName).find('input.textView').attr('type');
            },
            'Border color': (objName) => {
                this.getElemFromName(objName).find('input.textView').css('border-color');
            },
            'Border Type': (objName) => {
                this.getElemFromName(objName).find('input.textView').css('box-shadow');
            }
        });
        this.setProperty = Object.assign(this.setProperty, {
            Text: (objName, value) => {
                this.getElemFromName(objName).find('input.textView').val(value);
            },
            'Max chars': (objName,value) => {
                this.getElemFromName(objName).find('input.textView').attr('maxlength',value);
            },
            'Password chars': (objName,value) => {
                let type = "text";
                if (value) {
                    type = "password";
                }
                this.getElemFromName(objName).find('input.textView').attr('type',type);
            },
            'Enabled': (objName,value) => {
                this.getElemFromName(objName).find('input.textView').attr('disabled',!value);
            },
            'Input type': (objName,value) => {
                var inputType = "text";
                switch (value) {
                    case "numeric":
                        inputType = "number";
                    break;
                    case "email":
                        inputType = "email";
                    break;
                }
                this.getElemFromName(objName).find('input.textView').attr('type',inputType);
            },
            'Border color': (objName,value) => {
                this.getElemFromName(objName).find('input.textView').css('border-color',value);
            },

            'Border Type': (objName,value) => {                
                let borderColor = this.getElemFromName(objName).find('input.textView').css("border-color");
                if (value == "raised") {
                    this.getElemFromName(objName).find('input.textView').css({
                        "box-shadow":"2px 5px 20px "+borderColor
                    });
                } else if (value == "sunken") {
                    this.getElemFromName(objName).find('input.textView').css({
                        "box-shadow":"inset 2px 5px 20px "+borderColor
                    });
                } else {
                    this.getElemFromName(objName).find('input.textView').css({
                        "box-shadow":"none"
                    });
                }
            }
            
        });

    };
};

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (TextboxObject);

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by Oscar Rangel on 21/12/16.
*/

class TimeLibraryObject {

  constructor() {}

  createTime (time) {

    return new Date (time);
  }

  createTimeNow () {
    return new Date();
  }

  createTimeFromTimestamp (timestamp) {
    return new Date(Number(timestamp));
  }

  createTimestampFromTime (time) {
    return new Date(time).getTime();
  }


  addPadding (number, digits) {
    let value = number > 0 ? number : -number;
    while (value.toString().length < digits) {
      value = "0" + value;
    }
    return value;
  }

  textFromTime (time, op) {
    var dateTime = new Date(time);
    switch(op) {
    case "ISO_1":
      var H = this.addPadding(dateTime.getHours(), 2);
      var M = this.addPadding(dateTime.getMinutes(), 2);
      var s = this.addPadding(dateTime.getSeconds(), 2);
      var ms = this.addPadding(dateTime.getMilliseconds(), 3);
      var m = this.addPadding(dateTime.getMonth()+1, 2);
      var d = this.addPadding(dateTime.getDate(), 2);
      var y = this.addPadding(dateTime.getFullYear(), 4);

      let offsetSign = (dateTime.getTimezoneOffset() > 0) ? "-" : "+";

      let offsetH = this.addPadding(Math.trunc(dateTime.getTimezoneOffset() / 60), 2);
      let offsetM = this.addPadding(dateTime.getTimezoneOffset() % 60, 2);

      return `${y}-${m}-${d}T${H}:${M}:${s}.${ms}${offsetSign}${offsetH}${offsetM}`;

    case "DATE_TIME_12":
      var H = dateTime.getHours();
      var M = this.addPadding(dateTime.getMinutes(),2);
      var m = this.addPadding(dateTime.getMonth()+1,2);
      var d = this.addPadding(dateTime.getDate(),2);
      var y = this.addPadding(dateTime.getFullYear(),4);
      var a = H >= 12 ? 'PM' : 'AM';
      H = H % 12;
      H = H ? H : 12; // the hour '0' should be '12'
      // if (H.toString().length == 1) {
      //   H = "0" + H;
      // }
      H = this.addPadding(H,2);
      return H + ":" + M + " " + a + " " + d + "/" + m + "/" + y;

    case "DATE_TIME_12_US":
      var H = dateTime.getHours();
      var M = this.addPadding(dateTime.getMinutes(),2);
      var m = this.addPadding(dateTime.getMonth()+1,2);
      var d = this.addPadding(dateTime.getDate(),2);
      var y = this.addPadding(dateTime.getFullYear(),4);
      var a = H >= 12 ? 'PM' : 'AM';
      H = H % 12;
      H = H ? H : 12; // the hour '0' should be '12'
      H = this.addPadding(H,2);

      return H + ":" + M + " " + a + " " + m + "/" + d + "/" + y;

    case "DATE_TIME_24":
      var H = this.addPadding(dateTime.getHours(),2);
      var M = this.addPadding(dateTime.getMinutes(),2);
      var m = this.addPadding(dateTime.getMonth()+1,2);
      var d = this.addPadding(dateTime.getDate(),2);
      var y = this.addPadding(dateTime.getFullYear(),4);
      
      return H + ":" + M + " " + d + "/" + m + "/" + y;

    case "DATE_TIME_24_US":
      var H = this.addPadding(dateTime.getHours(),2);
      var M = this.addPadding(dateTime.getMinutes(),2);
      var m = this.addPadding(dateTime.getMonth()+1,2);
      var d = this.addPadding(dateTime.getDate(),2);
      var y = this.addPadding(dateTime.getFullYear(),4);
      
      return H + ":" + M + " " + m + "/" + d + "/" + y;

    case "TIME_12":
      var H = dateTime.getHours();
      var M = this.addPadding(dateTime.getMinutes(),2);
      var a = H >= 12 ? 'PM' : 'AM';
      H = H % 12;
      H = H ? H : 12; // the hour '0' should be '12'
      H = this.addPadding(H,2);

      return H + ":" + M + " " + a;

    case "TIME_24":
      var H = this.addPadding(dateTime.getHours(),2);
      var M = this.addPadding(dateTime.getMinutes(),2);
      return H + ":" + M;

    case "DATE":
      var m = this.addPadding(dateTime.getMonth()+1,2);
      var d = this.addPadding(dateTime.getDate(),2);
      var y = this.addPadding(dateTime.getFullYear(),4);
      return d + "/" + m + "/" + y;

    case "DATE_US":
      var m = this.addPadding(dateTime.getMonth()+1,2);
      var d = this.addPadding(dateTime.getDate(),2);
      var y = this.addPadding(dateTime.getFullYear(),4);
      return m + "/" + d + "/" + y;

    default:
      return "";
    }
  }

  elapsedComponent (timestamp, num) {
    return Math.floor(timestamp/num);
  }

  elapsedComponentsFromTime (time, components) {
    var dateTime = new Date(time.getTime());
    var dateZeroTime = new Date(0);
    var y = dateTime.getUTCFullYear() - dateZeroTime.getUTCFullYear();
    var m = dateTime.getUTCMonth() - dateZeroTime.getUTCMonth();
    var d = dateTime.getUTCDate() - dateZeroTime.getUTCDate();
    var h = dateTime.getUTCHours() - dateZeroTime.getUTCHours();
    var M = dateTime.getUTCMinutes() - dateZeroTime.getUTCMinutes();
    var s = dateTime.getUTCSeconds() - dateZeroTime.getUTCSeconds();

    switch(components) {
    case "S":
      return [s];
    case "SM":
      return [ M, s ];
    case "SMH":
      return [ h, M, s ];
    case "SMHD":
      return [ d, h, M, s ];
    case "SMHDM":
      return [ m, d, h, M, s ];
    case "SMHDMY":
      return [ y, m, d, h, M, s ];
    default:
      return [];
    }
  }

  componentsFromTime (time, components) {
    var dateTime = new Date(time);
    switch(components) {
    case "S":
      return [dateTime.getSeconds()];
    case "SM":
      return [
        dateTime.getSeconds(),
        dateTime.getMinutes()
      ];
    case "SMH":
      return [
        dateTime.getSeconds(),
        dateTime.getMinutes(),
        dateTime.getHours()
      ];
    case "SMHD":
      return [
        dateTime.getSeconds(),
        dateTime.getMinutes(),
        dateTime.getHours(),
        dateTime.getDate()
      ];
    case "SMHDM":
      return [
        dateTime.getSeconds(),
        dateTime.getMinutes(),
        dateTime.getHours(),
        dateTime.getDate(),
        dateTime.getMonth()+1
      ];
    case "SMHDMY":
      return [
        dateTime.getSeconds(),
        dateTime.getMinutes(),
        dateTime.getHours(),
        dateTime.getDate(),
        dateTime.getMonth()+1,
        dateTime.getFullYear()
      ];
    default:
      return [];
    }
  }

  numberDayOfWeekFromDate (time) {
    var dateTime = new Date(time);
    if (dateTime.getDay() == 0) return 7;
    return dateTime.getDay();

  }

  stringDayOfWeekFromDate (time) {
    var dateTime = new Date(time);
    var ar = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
    return ar[dateTime.getDay()];
  }

  createTimeInterval ( sec, min, hou, day, mon, yea) {
    return [
      sec,
      min,
      hou,
      day,
      mon,
      yea
    ];
  }

  addIntervalFromTime (time, timeInt) {
    // console.log (time + timeInt);
    // if (timeInt.constructor !== Array || timeInt.length != 6){
    //     return new Date(time);
    // }
    // var elap = this.componentsFromTime(time, "SMHDMY");
    // console.log (elap);
    // var year = elap[0] + Number(timeInt[5]);
    // var month = (elap[1] - 1) + Number(timeInt[4]);
    // var day = elap[2] + Number(timeInt[3]);
    // var hours = elap[3] + Number(timeInt[2]);
    // var min =elap[4] + Number(timeInt[1]);
    // var sec = elap[5] + Number(timeInt[0]);
    // return new Date(year, month, day, hours, min, sec);
    var retTime = new Date(time);
    retTime.setSeconds(retTime.getSeconds() + Number(timeInt[0]));
    retTime.setMinutes(retTime.getMinutes() + Number(timeInt[1]));
    retTime.setHours(retTime.getHours() + Number(timeInt[2]));
    retTime.setDate(retTime.getDate() + Number(timeInt[3]));
    retTime.setMonth(retTime.getMonth() + Number(timeInt[4]));
    retTime.setFullYear(retTime.getFullYear() + Number(timeInt[5]));
    return retTime;
  }

  subtractIntervalFromTime (time, timeInt) {
    // if (timeInt.constructor !== Array || timeInt.length != 6){
    //     return time;
    // }
    // var elap = this.componentsFromTime(time, "SMHDMY");
    // var year = elap[0] - Number(timeInt[5]);
    // var month = (elap[1] - 1) - Number(timeInt[4]);
    // var day = elap[2] - Number(timeInt[3]);
    // var hours = elap[3] - Number(timeInt[2]);
    // var min =elap[4] - Number(timeInt[1]);
    // var sec = elap[5] - Number(timeInt[0]);
    // return new Date(year, month, day, hours, min, sec);
    var retTime = new Date(time);
    retTime.setSeconds(retTime.getSeconds() - Number(timeInt[0]));
    retTime.setMinutes(retTime.getMinutes() - Number(timeInt[1]));
    retTime.setHours(retTime.getHours() - Number(timeInt[2]));
    retTime.setDate(retTime.getDate() - Number(timeInt[3]));
    retTime.setMonth(retTime.getMonth() - Number(timeInt[4]));
    retTime.setFullYear(retTime.getFullYear() - Number(timeInt[5]));
    return retTime;
  }

  dateFormat (dateObj,format) {
    var keys = {
      "yyyy": "1",
      "yy":"2",
      "y":"3",
      "MMMM":"4",
      "MMM":"5",
      "MM":"6",
      "M":"7",
      "dd":"8",
      "d":"9",
      "EEEE":"10",
      "EEE":"11",
      "HH":"12",
      "H":"13",
      "hh":"14",
      "h":"15",
      "mm":"16",
      "m":"17",
      "ssss":"18",
      "ss":"19",
      "s":"20",
      "a":"21"
    };

    var result = format;
    var fullyear = dateObj.getFullYear();
    var year2dgt = String(fullyear % 100);
    var month = String(dateObj.getMonth() + 1);
    var monthLit = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ][dateObj.getMonth()];
    var day = String(dateObj.getDate());
    var weekday = String(dateObj.getDay());
    var weekdayLit = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ][dateObj.getDay()];
    var min = String(dateObj.getMinutes());
    var hour24 = String(dateObj.getHours());
    var hour12 = (Number(dateObj.getHours()) % 12).toString();
    var sc= String(dateObj.getSeconds());
    var msec = String(dateObj.getMilliseconds());
    var am_pm = (Number(dateObj.getHours()) >= 12)?"PM":"AM";

    // generate escape code
    var escChar = "%";
    while (format.search(escChar)>=0) escChar += "%";

    if (year2dgt.length==1) year2dgt = "0" + year2dgt;
    if (month.length==1) month = "0" + month;
    if (day.length==1) day = "0" + day;
    if (min.length==1) min = "0" + min;
    if (hour24.length==1) hour24 = "0" + hour24;
    if (hour12.length==1) hour12 = "0" + hour12;
    if (sc.length==1) sc = "0" + sc;
    if (msec.length==1) msec = "00" + msec;
    if (msec.length==2) msec = "0" + msec;

    if (Number(hour12) == 0) hour12 = "12";

    var escapeKey = function(string,key) {
      return string.replace(key, escapedKey(key));
    };
    var escapedKey = function(key) {
      return escChar + keys[key] + escChar;
    };
    var isolateKeys = function(format) {
      var isolated = format;

      isolated = escapeKey(isolated,"yyyy");
      isolated = escapeKey(isolated,"yy");
      isolated = escapeKey(isolated,"y");
      isolated = escapeKey(isolated,"MMMM");
      isolated = escapeKey(isolated,"MMM");
      isolated = escapeKey(isolated,"MM");
      isolated = escapeKey(isolated,"M");
      isolated = escapeKey(isolated,"dd");
      isolated = escapeKey(isolated,"d");
      isolated = escapeKey(isolated,"EEEE");
      isolated = escapeKey(isolated,"EEE");
      isolated = escapeKey(isolated,"HH");
      isolated = escapeKey(isolated,"H");
      isolated = escapeKey(isolated,"hh");
      isolated = escapeKey(isolated,"h");
      isolated = escapeKey(isolated,"mm");
      isolated = escapeKey(isolated,"m");
      isolated = escapeKey(isolated,"ssss");
      isolated = escapeKey(isolated,"ss");
      isolated = escapeKey(isolated,"s");
      isolated = escapeKey(isolated,"a");
      return isolated;
    };

    result = isolateKeys(result);

    result = result.replace(escapedKey("yyyy"),fullyear);
    result = result.replace(escapedKey("yy"),year2dgt);
    result = result.replace(escapedKey("y"),Number(fullyear));

    result = result.replace(escapedKey("MMMM"),monthLit);
    result = result.replace(escapedKey("MMM"),monthLit.substr(0,3));
    result = result.replace(escapedKey("MM"),month);
    result = result.replace(escapedKey("M"),Number(month));

    result = result.replace(escapedKey("dd"),day);
    result = result.replace(escapedKey("d"),Number(day));

    result = result.replace(escapedKey("EEEE"),weekdayLit);
    result = result.replace(escapedKey("EEE"),weekdayLit.substr(0,3));

    result = result.replace(escapedKey("HH"),hour24);
    result = result.replace(escapedKey("H"),Number(hour24));

    result = result.replace(escapedKey("hh"),hour12);
    result = result.replace(escapedKey("h"),Number(hour12));

    result = result.replace(escapedKey("mm"),min);
    result = result.replace(escapedKey("m"),Number(min));

    result = result.replace(escapedKey("ssss"),msec);

    result = result.replace(escapedKey("ss"),sc);
    result = result.replace(escapedKey("s"),Number(sc));

    result = result.replace(escapedKey("a"),am_pm);

    return result;
  }

  getTimeFromTimezone (tz) {
    return new Date().toLocaleString("en-US", {timeZone: tz});
  }


}

/* harmony default export */ __webpack_exports__["a"] = (TimeLibraryObject);

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by Ravish S on 16/10/17.
*/

class VideoLibraryObject {

    constructor() {}

    createVideoFromResource (url) {
        let vid = document.createElement("VIDEO");
        let source = document.createElement("source");
        vid.appendChild(source);
        vid.crossOrigin = 'anonymous';
        source.src = url;
        return vid;
    }

    createVideoFromUrl (url, successCallBack, failureCallBack) {
        let vid = document.createElement("VIDEO");
        let source = document.createElement("source");
        vid.appendChild(source);
        vid.crossOrigin = 'anonymous';
        source.src = url;
        console.log (vid);
        vid.onloadeddata = (e) => {
            successCallBack (vid);
        };

        vid.onerror = (e) => {
          console.log('createVideoFromUrl, load error', e);
          failureCallBack(e);
        }
    }

    getDuration (video) {
        return video.duration;
    }

    playVideo (video, successCallBack) {
        video.play();
        video.onended = function(e) {
            successCallBack(e);
        };
    }

    playVideoFrom (video,position,successCallBack) {
        video.currentTime = position;
        video.play();
        video.onended = function(e) {
            successCallBack(e);
        };
    }


}

/* harmony default export */ __webpack_exports__["a"] = (VideoLibraryObject);

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
// ES6 imports


class VideoObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor() {
        super('');

        var self = this;

        this.setProperty = Object.assign(this.setProperty, {
            'Video': (objName, value) => {
                console.log (value);
                let elemSelector = '[obj-name="' + objName + '"]';
                $(elemSelector).html(value);
            },
        });

    }

    getElemFromObj(objName) {
        let elemSelector = '[obj-name="' + objName + '"]';
        let elem = $(elemSelector).find('video');
        console.log (elem);
        return elem;
    }
    play (objName) {
        let elem = this.getElemFromObj(objName);
        $(elem).get(0).play();
    }

    pause (objName) {
        let elem = this.getElemFromObj(objName);
        $(elem).get(0).pause();  
    }

    stop (objName) {
        let elem = this.getElemFromObj(objName);
        $(elem).get(0).pause();
        $(elem).get(0).currentTime = 0;
    }

    getElapsedTime (objName) {
        let elem = this.getElemFromObj(objName);
        return $(elem).get(0).currentTime;
    }

    getVolume (objName) {
        let elem = this.getElemFromObj(objName);
        return $(elem).get(0).volume;   
    }

    setVolume (objName,vol) {
        let elem = this.getElemFromObj(objName);
        return $(elem).get(0).volume = vol; 
    }

    playFromPosition (objName,pos) {
        let elem = this.getElemFromObj(objName);
        $(elem).get(0).currentTime = pos;
        $(elem).get(0).play();
    }

    skipToPosition (objName,pos) {
        let elem = this.getElemFromObj(objName);
        $(elem).get(0).currentTime = pos;
    }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (VideoObject);



/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
// ES6 imports


class WebViewObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor() {
        super(' web view');

        var self = this;

        this.setProperty['URL'] = function(objName, value) {
            let elem =  $('[obj-name= "' + objName + '"]');
            $(elem).find('iframe').attr('src',value);        
        };

        this.getProperty['URL'] = function(objName) {
            let elem =  $('[obj-name= "' + objName + '"]');
            return $(elem).find('iframe').attr('src');        
        };

        this.setProperty['intercept-domain'] = function(objName, value) {
          let elem =  $('[obj-name= "' + objName + '"]');
          $(elem).find('iframe').attr('intercept-domain',value);
        };

        this.getProperty['intercept-domain'] = function(objName) {
            let elem =  $('[obj-name= "' + objName + '"]');
            return $(elem).find('iframe').attr('intercept-domain');      
        };
    }

    refresh (objName) {
        let elem =  $('[obj-name= "' + objName + '"]');
        let url = $(elem).find('iframe').attr('src');
        $(elem).find('iframe').attr('src',url);
    }

    setDomainInterceptCallback(objName, callback) {
        let elem =  $('[obj-name= "' + objName + '"]');
        let iframe = $(elem).find('iframe').get(0);
        let interceptDomain = this.getProperty['intercept-domain'](objName);
        console.log (interceptDomain);
        // $(elem).find('iframe').on('onunload', function() {
        //     try {
        //         let url = iframe.contentWindow.location.href;
        //         var hostname = $('<a>').prop('href', url).prop('hostname');
        //         console.log (hostname);
        //         if( interceptDomain!=undefined && hostname!=undefined ) {
        //             if( interceptDomain == hostname ) {
        //                 callback(url);  
        //             }
        //         }
        //     }
        //     catch(e) {
        //         console.log (e);
        //     }
            
        // });

        //This function is called for scenarios which are short lived ( oAuth / Web URL Intersept )
        // Since load is the only available event in this case, using a timer for 100ms

        try {
            let timer = setInterval(function(){ 
                let url = iframe.contentWindow.location.href;
                let hostname = $('<a>').prop('href', url).prop('hostname');
                if( interceptDomain!=undefined && hostname!=undefined ) {
                    if( interceptDomain == hostname ) {
                        callback(url);
                        clearInterval(timer);
                    }
                }
            },100);
        } catch (e) {

        }
    }


    WebViewException(msg) {
      let error = new Error(msg);
      error.name = "WebViewException";
      throw error;
    }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (WebViewObject);



/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
/**
 * Widget Canvas Module Module
*/



class WidgetCanvasObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor() {
        super();

        this.getProperty = Object.assign(this.getProperty, {
            'Accept widgets': (objName) => {
            
            } 
        });

        this.setProperty = Object.assign(this.setProperty, {

            'Accept widgets': (objName, value) => {
                
            }
        });

    }

}

/* harmony default export */ __webpack_exports__["a"] = (WidgetCanvasObject);

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__JavascriptDistLib_core_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__objects_label_label_module_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objects_button_button_module_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__objects_network_network_module_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__objects_json_json_module_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__objects_connio_connio_module_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__objects_animation_animation_module_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__objects_screen_screen_module_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__objects_dictionary_dictionary_module_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__objects_textLibrary_textLibrary_module_js__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__objects_image_image_module_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__objects_imageLibrary_imageLibrary_module_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__objects_container_container_module_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__objects_location_location_module_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__objects_mathLibrary_mathLibrary_module_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__objects_lists_lists_module_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__objects_application_application_module_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__objects_graphview_graphview_module_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__objects_storage_storage_module_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__objects_gauge_gauge_module_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__objects_webview_webview_module_js__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__objects_colourLibrary_colourLibrary_module_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__objects_timeLibrary_timeLibrary_module_js__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__objects_mapview_mapview_module_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__objects_textbox_textbox_module_js__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__objects_slider_slider_module_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__objects_videoview_videoview_module_js__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__objects_videoLibrary_videoLibrary_module_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__objects_snapclinical_snapclinical_module_js__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__objects_dialog_dialog_module_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__objects_bluetooth_bluetooth_module_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__objects_gridview_gridview_module_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__objects_clock_clock_module_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__objects_listview_listview_module_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__objects_motion_motion_module_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__objects_notification_notification_module_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__objects_audioLibrary_audioLibrary_module_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__objects_smartdevices_smartdevices_module_js__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__objects_camera_camera_module_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__objects_cameraview_cameraview_module_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__objects_phone_phone_module_js__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__objects_widgetcanvas_widgetcanvas_module_js__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__objects_system_system_module_js__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__objects_pageview_pageview_module_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__objects_firebase_firebase_module_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__objects_qrcodescanner_qrcodescanner_module_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__objects_docusign_docusign_module_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__objects_device_device_module_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__objects_list_grid_common_list_grid_common_module_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__objects_googlefit_googlefit_module_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__objects_drawview_drawview_module_js__ = __webpack_require__(20);
// ES6 imports





















































var distLib = new __WEBPACK_IMPORTED_MODULE_0__JavascriptDistLib_core_js__["a" /* default */]();
distLib.Animation = new __WEBPACK_IMPORTED_MODULE_6__objects_animation_animation_module_js__["a" /* default */]();
distLib.Button = new __WEBPACK_IMPORTED_MODULE_2__objects_button_button_module_js__["a" /* default */]();
distLib.Connio = new __WEBPACK_IMPORTED_MODULE_5__objects_connio_connio_module_js__["a" /* default */]();
distLib.Container = new __WEBPACK_IMPORTED_MODULE_12__objects_container_container_module_js__["a" /* default */]();
distLib.Dictionary = new __WEBPACK_IMPORTED_MODULE_8__objects_dictionary_dictionary_module_js__["a" /* default */]();
distLib.Image = new __WEBPACK_IMPORTED_MODULE_10__objects_image_image_module_js__["a" /* default */]();
distLib.ImageLibrary = new __WEBPACK_IMPORTED_MODULE_11__objects_imageLibrary_imageLibrary_module_js__["a" /* default */]();
distLib.JSON = new __WEBPACK_IMPORTED_MODULE_4__objects_json_json_module_js__["a" /* default */]();
distLib.Label = new __WEBPACK_IMPORTED_MODULE_1__objects_label_label_module_js__["a" /* default */]();
distLib.ListLibrary = new __WEBPACK_IMPORTED_MODULE_15__objects_lists_lists_module_js__["a" /* default */]();
distLib.Location = new __WEBPACK_IMPORTED_MODULE_13__objects_location_location_module_js__["a" /* default */]();
distLib.MathLibrary = new __WEBPACK_IMPORTED_MODULE_14__objects_mathLibrary_mathLibrary_module_js__["a" /* default */]();
distLib.GraphContainer = new __WEBPACK_IMPORTED_MODULE_17__objects_graphview_graphview_module_js__["a" /* default */]();
distLib.Network = new __WEBPACK_IMPORTED_MODULE_3__objects_network_network_module_js__["a" /* default */]();
distLib.Screen = new __WEBPACK_IMPORTED_MODULE_7__objects_screen_screen_module_js__["a" /* default */]();
distLib.TextLib = new __WEBPACK_IMPORTED_MODULE_9__objects_textLibrary_textLibrary_module_js__["a" /* default */]();
distLib.Application = new __WEBPACK_IMPORTED_MODULE_16__objects_application_application_module_js__["a" /* default */]();
distLib.Storage = new __WEBPACK_IMPORTED_MODULE_18__objects_storage_storage_module_js__["a" /* default */]();
distLib.Gauge = new __WEBPACK_IMPORTED_MODULE_19__objects_gauge_gauge_module_js__["a" /* default */]();
distLib.WebContainer = new __WEBPACK_IMPORTED_MODULE_20__objects_webview_webview_module_js__["a" /* default */]();
distLib.ColourLibrary = new __WEBPACK_IMPORTED_MODULE_21__objects_colourLibrary_colourLibrary_module_js__["a" /* default */]();
distLib.TimeLibrary = new __WEBPACK_IMPORTED_MODULE_22__objects_timeLibrary_timeLibrary_module_js__["a" /* default */]();
distLib.MapContainer = new __WEBPACK_IMPORTED_MODULE_23__objects_mapview_mapview_module_js__["a" /* default */]();
distLib.Textbox = new __WEBPACK_IMPORTED_MODULE_24__objects_textbox_textbox_module_js__["a" /* default */]();
distLib.Slider = new __WEBPACK_IMPORTED_MODULE_25__objects_slider_slider_module_js__["a" /* default */]();
distLib.VideoView = new __WEBPACK_IMPORTED_MODULE_26__objects_videoview_videoview_module_js__["a" /* default */]();
distLib.VideoLibrary = new __WEBPACK_IMPORTED_MODULE_27__objects_videoLibrary_videoLibrary_module_js__["a" /* default */]();
distLib.SnapClinical = new __WEBPACK_IMPORTED_MODULE_28__objects_snapclinical_snapclinical_module_js__["a" /* default */]();
distLib.Clock = new __WEBPACK_IMPORTED_MODULE_32__objects_clock_clock_module_js__["a" /* default */]();
distLib.Dialog = new __WEBPACK_IMPORTED_MODULE_29__objects_dialog_dialog_module_js__["a" /* default */]();
distLib.Bluetooth = new __WEBPACK_IMPORTED_MODULE_30__objects_bluetooth_bluetooth_module_js__["a" /* default */]();
distLib.GridView = new __WEBPACK_IMPORTED_MODULE_31__objects_gridview_gridview_module_js__["a" /* default */]();
distLib.ListView = new __WEBPACK_IMPORTED_MODULE_33__objects_listview_listview_module_js__["a" /* default */]();
distLib.AudioLibrary = new __WEBPACK_IMPORTED_MODULE_36__objects_audioLibrary_audioLibrary_module_js__["a" /* default */]();
distLib.Motion = new __WEBPACK_IMPORTED_MODULE_34__objects_motion_motion_module_js__["a" /* default */]();
distLib.SmartDevices = new __WEBPACK_IMPORTED_MODULE_37__objects_smartdevices_smartdevices_module_js__["a" /* default */]();
distLib.Notification = new __WEBPACK_IMPORTED_MODULE_35__objects_notification_notification_module_js__["a" /* default */]();
distLib.CameraLibrary = new __WEBPACK_IMPORTED_MODULE_38__objects_camera_camera_module_js__["a" /* default */]();
distLib.Camera = new __WEBPACK_IMPORTED_MODULE_39__objects_cameraview_cameraview_module_js__["a" /* default */]();
distLib.Phone = new __WEBPACK_IMPORTED_MODULE_40__objects_phone_phone_module_js__["a" /* default */]();
distLib.WidgetCanvas = new __WEBPACK_IMPORTED_MODULE_41__objects_widgetcanvas_widgetcanvas_module_js__["a" /* default */]();
distLib.System = new __WEBPACK_IMPORTED_MODULE_42__objects_system_system_module_js__["a" /* default */]();
distLib.PageView = new __WEBPACK_IMPORTED_MODULE_43__objects_pageview_pageview_module_js__["a" /* default */]();
distLib.FireBase = new __WEBPACK_IMPORTED_MODULE_44__objects_firebase_firebase_module_js__["a" /* default */]();
distLib.QRCodeScanner = new __WEBPACK_IMPORTED_MODULE_45__objects_qrcodescanner_qrcodescanner_module_js__["a" /* default */]();
distLib.DocuSign = new __WEBPACK_IMPORTED_MODULE_46__objects_docusign_docusign_module_js__["a" /* default */]();
distLib.Device = new __WEBPACK_IMPORTED_MODULE_47__objects_device_device_module_js__["a" /* default */]();
distLib.ListGridCommon = new __WEBPACK_IMPORTED_MODULE_48__objects_list_grid_common_list_grid_common_module_js__["a" /* default */]();
distLib.GoogleFit = new __WEBPACK_IMPORTED_MODULE_49__objects_googlefit_googlefit_module_js__["a" /* default */]();
distLib.DrawViewContainer = new __WEBPACK_IMPORTED_MODULE_50__objects_drawview_drawview_module_js__["a" /* default */]();

// setting the global variable
com = com || {};
com.fc = com.fc || {};
com.fc.JavaScriptDistLib = distLib;

/***/ })
/******/ ]);