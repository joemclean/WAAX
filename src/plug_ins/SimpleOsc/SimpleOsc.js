/**
 * @fileOverview a single oscillator test plug-in
 * @author Hongchan choi (hoch)
 * @version 0.0.2
 */

(function (WX) {

  'use strict';

  // waveform collection (model)
  var WAVEFORMS = [
    { key: 'Sine', value: 'sine' },
    { key: 'Square', value: 'square' },
    { key: 'Sawtooth', value: 'sawtooth' },
    { key: 'Triangle', value: 'triangle' }
  ];

  // REQUIRED: plug-in constructor
  function SimpleOsc(preset) {

    // REQUIRED: adding necessary modules
    WX.Plugin.defineType(this, 'Generator');

    // patching, lfo frequency modulation
    this._lfo = WX.OSC();
    this._lfoGain = WX.Gain();
    this._osc = WX.OSC();
    this._amp = WX.Gain();
    this._osc.to(this._amp).to(this._output);
    this._lfo.to(this._lfoGain).to(this._osc.detune);
    this._lfo.start(0);
    this._osc.start(0);

    this._amp.gain.value = 0.0;

    // parameter definition
    WX.defineParams(this, {

      oscType: {
        type: 'Itemized',
        name: 'Waveform',
        default: 'sine', // all code-side representation should be 'value'
        model: WAVEFORMS
      },

      oscFreq: {
        type: 'Generic',
        name: 'Freq',
        default: WX.mtof(60),
        min: 20.0,
        max: 5000.0,
        unit: 'Hertz'
      },

      lfoType: {
        type: 'Itemized',
        name: 'LFO Type',
        default: 'sine',
        model: WAVEFORMS
      },

      lfoRate: {
        type: 'Generic',
        name: 'Rate',
        default: 1.0,
        min: 0.0,
        max: 20.0,
        unit: 'Hertz'
      },

      lfoDepth: {
        type: 'Generic',
        name: 'Depth',
        default: 1.0,
        min: 0.0,
        max: 500.0,
        unit: 'LinearGain'
      }

    });

    // REQUIRED: initializing instance with preset
    WX.Plugin.initPreset(this, preset);
  }

  /** REQUIRED: plug-in prototype **/
  SimpleOsc.prototype = {

    // REQUIRED: plug-in info
    info: {
      name: 'SimpleOsc',
      api_version: '1.0.0-alpha',
      plugin_version: '0.0.1',
      author: 'hoch',
      type: 'instrument',
      description: '1 oscillator synth'
    },

    // REQUIRED: plug-in default preset
    defaultPreset: {
      oscType: 'Sine',
      oscFreq: WX.mtof(60),
      lfoType: 'Sine',
      lfoRate: 1.0,
      lfoDepth: 1.0
    },

    // REQUIRED: handlers for each parameter
    $oscType: function (value, time, rampType) {
      this._osc.type = value;
    },

    $oscFreq: function (value, time, rampType) {
      this._osc.frequency.set(value, time, rampType);
    },

    $lfoType: function (value, time, rampType) {
      this._lfo.type = value;
    },

    $lfoRate: function (value, time, rampType) {
      this._lfo.frequency.set(value, time, rampType);
    },

    $lfoDepth: function (value, time, rampType) {
      this._lfoGain.gain.set(value, time, rampType);
    },

    // examples of realtime event processors
    noteOn: function (pitch, velocity, time) {
      time = (time || WX.now);
      this._amp.gain.set(velocity / 127, [time, 0.02], 3);
      this.$oscFreq(WX.mtof(pitch), time + 0.02, 1);
    },

    glide: function (pitch, time) {
      time = (time || WX.now);
      this.$oscFreq(WX.mtof(pitch), time + 0.02, 1);
    },

    noteOff: function (time) {
      time = (time || WX.now);
      this._amp.gain.set(0.0, [time, 0.2], 3);
    },

    onData: function (action, data) {
      switch (action) {
        case 'noteon':
          this.noteOn(data.pitch, data.velocity);
          break;
        case 'glide':
          this.glide(data.pitch);
          break;
        case 'noteoff':
          this.noteOff();
          break;
      }
    }

  };

  // REQUIRED: extending plug-in prototype with modules
  WX.Plugin.extendPrototype(SimpleOsc, 'Generator');

  // REQUIRED: registering plug-in into WX ecosystem
  WX.Plugin.register(SimpleOsc);

})(WX);