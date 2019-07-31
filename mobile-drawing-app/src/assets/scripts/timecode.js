/** 
Timecode: HTML5 Video - SMTPE Timecode
@version 3.0.0
@author Bill SerGio, The Infomercial King
@copyright (c) 2010 Ouslan, Inc. All Rights Reserved Worldwide.
@license Released under the Open Source MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, and/or distribute copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

- The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
- Attribution must be credited to the original authors in derivative works.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * @class
 * @classdesc Main Timecode Implementation.
 * @param {Object} options - Configuration object for initialization.
 */
var Timecode = function (videoObj, options) {
	if (this === window) { return new Timecode(options); }
	this.obj = options || {};
	this.frameRate = this.obj.frameRate || 24;
	this.video = videoObj;
};

/**
 * FrameRates - Standard Frame Rates
 */
var FrameRates = {
	FILM: 24,
	NTSC : 29.97,
	NTSC_FILM: 23.98,
	NTSC_HD : 59.94,
	PAL: 25,
	PAL_HD: 50,
	WEB: 30,
	FAST: 60
};

Timecode.prototype = {
	/**
	 * Returns the current frame number
	 * 
	 * @return {Number} - Frame number in video
	 */
	get : function() {
		return Math.floor(this.video.currentTime.toFixed(5) * this.frameRate);
	},
	/**
	 * Event listener for handling callback execution at double the current frame rate interval
	 * 
	 * @param  {String} format - Accepted formats are: SMPTE, time, frame
	 * @param  {Number} tick - Number to set the interval by.
	 * @return {Number} Returns a value at a set interval
	 */
	listen : function(format, tick) {
		var _video = this;
		if (!format) { console.log('Timecode: Error - The listen method requires the format parameter.'); return; }
		this.interval = setInterval(function() {
			if (_video.video.paused || _video.video.ended) { return; }
			var frame = ((format === 'SMPTE') ? _video.toSMPTE() : ((format === 'time') ? _video.toTime() : _video.get()));
			if (_video.obj.callback) { _video.obj.callback(frame, format); }
			return frame;
		}, (tick ? tick : 1000 / _video.frameRate / 2));
	},
	/** Clears the current interval */
	stopListen : function() {
		var _video = this;
		clearInterval(_video.interval);
	},
	fps : FrameRates
};

/**
 * Returns the current time code in the video in HH:MM:SS format
 * - used internally for conversion to SMPTE format.
 * 
 * @param  {Number} frames - The current time in the video
 * @return {String} Returns the time code in the video
 */
Timecode.prototype.toTime = function(frames) {
	var time = (typeof frames !== 'number' ? this.video.currentTime : frames), frameRate = this.frameRate;
	var dt = (new Date()), format = 'hh:mm:ss' + (typeof frames === 'number' ? ':ff' : '');
	dt.setHours(0); dt.setMinutes(0); dt.setSeconds(0); dt.setMilliseconds(time * 1000);
	function pad(n) { return ((n < 10) ? '0' + n : n); }
	return format.replace(/hh|mm|ss|ff/g, function(format) {
		switch (format) {
		    case "hh": return pad(dt.getHours() < 13 ? dt.getHours() : (dt.getHours() - 12));
		    case "mm": return pad(dt.getMinutes());
		    case "ss": return pad(dt.getSeconds());
		    case "ff": return pad(Math.floor(((time % 1) * frameRate)));
		}
	});
};

/**
 * Returns the current SMPTE Time code in the video.
 * - Can be used as a conversion utility.
 * 
 * @param  {Number} frame - OPTIONAL: Frame number for conversion to it's equivalent SMPTE Time code.
 * @return {String} Returns a SMPTE Time code in HH:MM:SS:FF format
 */
Timecode.prototype.toSMPTE = function(frame) {
	if (!frame) { return this.toTime(this.video.currentTime); }
	var frameNumber = Number(frame);
	var fps = this.frameRate;
	function pad(n) { return ((n < 10) ? '0' + n : n); }
	var _hour = ((fps * 60) * 60), _minute = (fps * 60);
	var _hours = (frameNumber / _hour).toFixed(0);
	var _minutes = (Number((frameNumber / _minute).toString().split('.')[0]) % 60);
	var _seconds = (Number((frameNumber / fps).toString().split('.')[0]) % 60);

	var SMPTE = (pad(_hours) + ':' + pad(_minutes) + ':' + pad(_seconds) + ':' + pad(Math.floor(frameNumber % fps)));

	return SMPTE;
};

/**
 * Converts a SMPTE Time code to Seconds
 * 
 * @param  {String} SMPTE - a SMPTE time code in HH:MM:SS:FF format
 * @return {Number} Returns the Second count of a SMPTE Time code
 */
Timecode.prototype.toSeconds = function(SMPTE) {
	if (!SMPTE) { return Math.floor(this.video.currentTime); }
	var time = SMPTE.split(':');
	return (((Number(time[0]) * 60) * 60) + (Number(time[1]) * 60) + Number(time[2]));
};

/**
 * Converts a SMPTE Time code, or standard time code to Milliseconds
 * 
 * @param  {String} SMPTE OPTIONAL: a SMPTE time code in HH:MM:SS:FF format,
 * or standard time code in HH:MM:SS format.
 * @return {Number} Returns the Millisecond count of a SMPTE Time code
 */
Timecode.prototype.toMilliseconds = function(SMPTE) {
	var frames = (!SMPTE) ? Number(this.toSMPTE().split(':')[3]) : Number(SMPTE.split(':')[3]);
	var milliseconds = (1000 / this.frameRate) * (isNaN(frames) ? 0 : frames);
	return Math.floor(((this.toSeconds(SMPTE) * 1000) + milliseconds));
};

/**
 * Converts a SMPTE Time code to it's equivalent frame number
 * 
 * @param  {String} SMPTE - OPTIONAL: a SMPTE time code in HH:MM:SS:FF format
 * @return {Number} Returns the long running video frame number
 */
Timecode.prototype.toFrames = function(SMPTE) {
	var time = (!SMPTE) ? this.toSMPTE().split(':') : SMPTE.split(':');
	var frameRate = this.frameRate;
	var hh = (((Number(time[0]) * 60) * 60) * frameRate);
	var mm = ((Number(time[1]) * 60) * frameRate);
	var ss = (Number(time[2]) * frameRate);
	var ff = Number(time[3]);
	return Math.floor((hh + mm + ss + ff));
};

/**
 * Private - seek method used internally for the seeking functionality.
 * 
 * @param  {String} direction - Accepted Values are: forward, backward
 * @param  {Number} frames - Number of frames to seek by.
 */
Timecode.prototype.__seek = function(direction, frames) {
	if (!this.video.paused) { this.video.pause(); }
	var frame = Number(this.get());
	/** To seek forward in the video, we must add 0.00001 to the video runtime for proper interactivity */
	this.video.currentTime = ((((direction === 'backward' ? (frame - frames) : (frame + frames))) / this.frameRate) + 0.00001);
};

/**
 * Seeks forward [X] amount of frames in the video.
 * 
 * @param  {Number} frames - Number of frames to seek by.
 * @param  {Function} callback - Callback function to execute once seeking is complete.
 */
Timecode.prototype.seekForward = function(frames, callback) {
	if (!frames) { frames = 1; }
	this.__seek('forward', Number(frames));
	return (callback ? callback() : true);
};

/**
 * Seeks backward [X] amount of frames in the video.
 * 
 * @param  {Number} frames - Number of frames to seek by.
 * @param  {Function} callback - Callback function to execute once seeking is complete.
 */
Timecode.prototype.seekBackward = function(frames, callback) {
	if (!frames) { frames = 1; }
	this.__seek('backward', Number(frames));
	return (callback ? callback() : true);
};

/**
 * For seeking to a certain SMPTE time code, standard time code, frame, second, or millisecond in the video.
 * - Was previously deemed not feasible. Veni, vidi, vici.
 *  
 * @param  {Object} option - Configuration Object for seeking allowed keys are SMPTE, time, frame, seconds, and milliseconds
 * example: { SMPTE: '00:01:12:22' }, { time: '00:01:12' },  { frame: 1750 }, { seconds: 72 }, { milliseconds: 72916 }
 */
Timecode.prototype.seekTo = function(config) {
	var obj = config || {}, seekTime, SMPTE;
	/** Only allow one option to be passed */
	var option = Object.keys(obj)[0];

	if (option == 'SMPTE' || option == 'time') {
		SMPTE = obj[option];
		seekTime = ((this.toMilliseconds(SMPTE) / 1000) + 0.001);
		this.video.currentTime = seekTime;
		return;
	}

	switch(option) {
		case 'frame':
			SMPTE = this.toSMPTE(obj[option]);
			seekTime = ((this.toMilliseconds(SMPTE) / 1000) + 0.001);
			break;
		case 'seconds':
			seekTime = Number(obj[option]);
			break;
		case 'milliseconds':
			seekTime = ((Number(obj[option]) / 1000) + 0.001);
			break;
	}
	
	if (!isNaN(seekTime)) {
		this.video.currentTime = seekTime;
	}
};