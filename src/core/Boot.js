/*
  Copyright 2013, Google Inc.
  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are
  met:

      * Redistributions of source code must retain the above copyright
  notice, this list of conditions and the following disclaimer.
      * Redistributions in binary form must reproduce the above
  copyright notice, this list of conditions and the following disclaimer
  in the documentation and/or other materials provided with the
  distribution.
      * Neither the name of Google Inc. nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
  A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
  OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
  SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
  THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


/**
 * Boot.js: the last step - initializing, building units...
 */
(function () {
  // TODO: does it have to check "document.ready"?
  // - some GUI stuffs require target DIVs to be present

  // splash message
  WX._log.post("waax (" + WX.version + ")");
  WX._log.verbose(true);

  // inject units into the namespace
  WX._unit.factory([
    // generators
    { name: "Oscil", ref: WX._unit.oscil },
    { name: "Fmop", ref: WX._unit.fmop },
    { name: "Noise", ref: WX._unit.noise },
    { name: "ITrain", ref: WX._unit.itrain },
    { name: "ITrain2", ref: WX._unit.itrain2 },
    { name: "Sampler", ref: WX._unit.sampler },
    { name: "Step", ref: WX._unit.step },
    // processors
    { name: "Fader", ref: WX._unit.fader },
    { name: "ADSR", ref: WX._unit.adsr },
    { name: "Filter", ref: WX._unit.filter },
    { name: "Formant", ref: WX._unit.formant },
    { name: "FormantV", ref: WX._unit.formantv },
    { name: "Pingpong", ref: WX._unit.pingpong },
    { name: "Chorus", ref: WX._unit.chorus },
    { name: "Comp", ref: WX._unit.comp },
    { name: "Converb", ref: WX._unit.converb }
    // analyzers
  ]);

  // create master fader
  // TODO: multichannel support??
  WX.DAC = WX.Fader();
  WX.DAC.connect(WX.context.destination);
  WX._log.info("master fader created. (WX.DAC)");
})();