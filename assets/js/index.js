import ChordSheetJS from "@ftes/chordsheetjs";

const parsers = {
  chordpro: new ChordSheetJS.ChordProParser(),
  chordsheet: new ChordSheetJS.ChordSheetParser({preserveWhitespace: false}),
  ultimate: new ChordSheetJS.UltimateGuitarParser({preserveWhitespace: false}),
}

const formatters = {
  html: new ChordSheetJS.HtmlDivFormatter(),
  chordpro: new ChordSheetJS.ChordProFormatter(),
  chordsheet: new ChordSheetJS.TextFormatter(),
  latex: new ChordSheetJS.LatexFormatter()
};

function convert() {
  const input = document.getElementById("input").value;
  const inputFormatEl = document.getElementById("input-format");
  let inputFormat = inputFormatEl.options[inputFormatEl.selectedIndex].value;
  if(!inputFormat) {
    inputFormat = autodetect(input);
  }

  const parsed = parsers[inputFormat].parse(input);

  const outputFormatEl = document.getElementById("output-format");
  const outputFormat = outputFormatEl.options[outputFormatEl.selectedIndex].value;
  const output = formatters[outputFormat].format(parsed);
  var rendered = document.getElementById("output-rendered");
  var source = document.getElementById("output-source");
  rendered.hidden = source.hidden = true
  if(outputFormat == "html") {
    rendered.hidden = false
    rendered.contentWindow.document.body.innerHTML = output;
  } else {
    source.hidden = false
    source.value = output;
  }
}

const HEURISTICS = {
  ultimate: /\[(Verse.*|Chorus)\]/i,
  chordpro: /\[[A-G].*\]/i,
  chordsheet: /.*/
}

function autodetect(input) {
  for(const name in HEURISTICS) {
    if(input.match(HEURISTICS[name])) return name;
  }
}

function convertIfToggled() {
  if (document.getElementById("toggle").checked) {
    convert();
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("convert").addEventListener("click", convert);
  document.getElementById("toggle").addEventListener("change", convertIfToggled);
  document.getElementById("input").addEventListener("keyup", convertIfToggled);
  document.getElementById("input-format").addEventListener("change", convert);
  document.getElementById("output-format").addEventListener("change", convert);
  document.getElementById("output-rendered").addEventListener("load", convert);
});
