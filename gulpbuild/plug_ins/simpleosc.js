!function(t){"use strict";function e(e){t.PlugIn.defineType(this,"Generator"),this._lfo=t.OSC(),this._lfoGain=t.Gain(),this._osc=t.OSC(),this._amp=t.Gain(),this._osc.to(this._amp).to(this._output),this._lfo.to(this._lfoGain).to(this._osc.detune),this._lfo.start(0),this._osc.start(0),this._amp.gain.value=0,t.defineParams(this,{oscType:{type:"Itemized",name:"Waveform","default":"sine",model:t.WAVEFORMS},oscFreq:{type:"Generic",name:"Freq","default":t.mtof(60),min:20,max:5e3,unit:"Hertz"},lfoType:{type:"Itemized",name:"LFO Type","default":"sine",model:t.WAVEFORMS},lfoRate:{type:"Generic",name:"Rate","default":1,min:0,max:20,unit:"Hertz"},lfoDepth:{type:"Generic",name:"Depth","default":1,min:0,max:500,unit:"LinearGain"}}),t.PlugIn.initPreset(this,e)}e.prototype={info:{name:"SimpleOsc",version:"0.0.2",api_version:"1.0.0-alpha",author:"Hongchan Choi",type:"Generator",description:"1 OSC with LFO"},defaultPreset:{oscType:"Sine",oscFreq:t.mtof(60),lfoType:"Sine",lfoRate:1,lfoDepth:1},$oscType:function(t){this._osc.type=t},$oscFreq:function(t,e,i){this._osc.frequency.set(t,e,i)},$lfoType:function(t){this._lfo.type=t},$lfoRate:function(t,e,i){this._lfo.frequency.set(t,e,i)},$lfoDepth:function(t,e,i){this._lfoGain.gain.set(t,e,i)},noteOn:function(e,i,n){n=n||t.now,this._amp.gain.set(i/127,[n,.02],3),this.params.oscFreq.set(t.mtof(e),n+.02,0)},glide:function(e,i){i=i||t.now,this.params.oscFreq.set(t.mtof(e),i+.02,0)},noteOff:function(e){e=e||t.now,this._amp.gain.set(0,[e,.2],3)},onData:function(t,e){switch(t){case"noteon":this.noteOn(e.pitch,e.velocity);break;case"glide":this.glide(e.pitch);break;case"noteoff":this.noteOff()}}},t.PlugIn.extendPrototype(e,"Generator"),t.PlugIn.register(e)}(WX);