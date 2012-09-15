/*
 * Concierge.js
 * Client-side recommendation engine
 *
 * Written by Ryhan Hassan
 */

var a = new Markov("Drop kick send twitter", 6),
	result = '';
	
a.each(function (v) {	result += v;});