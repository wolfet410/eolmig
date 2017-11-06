/**
 * Directive for minimalistic Piecharts.
 *
 * @link https://github.com/pasqLisena/angular-minimal-piechart
 *
 * @license angular-minimal-piechart v0.1.3
 * (c) Copyright Pasquale Lisena (pasq.lisena@gmail.com)
 * License MIT
 */

(function(angular) {

"use strict";angular.module("minimalPiechart",[]),angular.module("minimalPiechart").directive("piechart",function(){return{restrict:"E",templateUrl:"min-piechart.html",scope:{value:"="}}}),angular.module("minimalPiechart").directive("donutchart",function(){return{restrict:"E",templateUrl:"min-piechart.html",scope:{value:"="}}}),angular.module("minimalPiechart").run(["$templateCache",function(e){e.put("min-piechart.html",'<div class="min-piechart-container"><svg viewbox="0 0 40 40" preserveaspectratio="xMinYMin meet" class="piechart-svg"><circle r="16" cx="20" cy="20" class="piechart-wheel"></circle><circle r="16" cx="20" cy="20" class="piechart-value" ng-attr-style="stroke-dasharray: {{value}}, 100"></circle></svg></div>')}]);

})(window.angular);