import ChordSheetJS from "@ftes/chordsheetjs";
import "./style/index.css";

const parsers = {
  chordpro: new ChordSheetJS.ChordProParser(),
  chordsheet: new ChordSheetJS.ChordSheetParser({preserveWhitespace: false}),
  ultimate: new ChordSheetJS.UltimateGuitarParser({preserveWhitespace: false}),
}

const formatters = {
  html: new ChordSheetJS.HtmlTableFormatter(),
  chordpro: new ChordSheetJS.ChordProFormatter(),
  latex: new ChordSheetJS.LatexFormatter()
};

function convert() {
  const input = document.getElementById("input").value;
  const inputFormatEl = document.getElementById("input-format");
  const inputFormat = inputFormatEl.options[inputFormatEl.selectedIndex].value;

  console.log({inputFormat})
  const parsed = parsers[inputFormat].parse(input);

  const outputFormatEl = document.getElementById("output-format");
  const outputFormat = outputFormatEl.options[outputFormatEl.selectedIndex].value;
  const output = formatters[outputFormat].format(parsed);
  var rendered = document.getElementById("output-rendered");
  var source = document.getElementById("output-source");
  rendered.hidden = source.hidden = true
  if(outputFormat == "html") {
    rendered.hidden = false
    rendered.innerHTML = output;
  } else {
    source.hidden = false
    source.value = output;
  }
}

let toggleState = document.getElementById("toggle").checked;
function setToggle(e) {
  toggleState = e.target.checked;
}
function convertIfToggled() {
  if (toggleState) {
    convert();
  }
}

document.getElementById("convert").addEventListener("click", convert);
document.getElementById("toggle").addEventListener("change", setToggle);
document.getElementById("input").addEventListener("keyup", convertIfToggled);
document.getElementById("input-format").addEventListener("change", convert);
document.getElementById("output-format").addEventListener("change", convert);
convert();
