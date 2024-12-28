import chroma from 'chroma-js';

import $ from 'jquery';
import { adjustLuminanceToContrast } from '../js/adjustLuminanceToContrast.js'
import { decreaseOpacityToContrast } from '../js/decreaseOpacityToContrast.js'
import { decreaseLuminanceToContrast } from '../js/decreaseLuminanceToContrast.js'
import { setSaturation } from '../js/setSaturation.js'

const wcagNonContentContrast = 3;
const wcagContentContrast = 4.5;
const root = document.documentElement;
const white = "#FFF";
const black = "#000";

// Insert the random color value into the text field
$('#accentColor').val(chroma.random().hex());

generatePalette();

$('#generateBtn').on('click', function(e) {
  generatePalette();
  e.preventDefault();
});

function setColor(color, $swatch, cssVariable) {
  // Sets colors for both a swatch and a CSS variable
  $swatch.css("background-color", color);
  root.style.setProperty(cssVariable, color);
}

function generatePalette() {

  const accentColor = document.getElementById('accentColor').value.trim();
  const canvasContrast = 1.1;
  const cardContrast = 1.033;
  const faintContrast = 1.1;
  const strongContrast = 1.7;
  const neutralToAccentContrast = 1.3;
  const neutralSaturation = 0.333;

  // Display seed color
  var $seed = $("#seed span");
  $seed.css("background-color", accentColor);

  // Establish background colors
  var $canvas = $("#canvas span");
  var canvasColor = adjustLuminanceToContrast(accentColor, white, canvasContrast);
  setColor(canvasColor, $canvas, '--canvas-color');
  var $card = $("#card span");
  var cardColor = adjustLuminanceToContrast(accentColor, white, cardContrast);
  setColor(cardColor, $card, '--card-color');

  // Establish accent baseline colors
  var $accentNonContentBaseline = $("#accentNonContentBaseline span");
  var accentNonContentBaselineColor = adjustLuminanceToContrast(accentColor, cardColor, wcagNonContentContrast);
  $accentNonContentBaseline.css("background-color", accentNonContentBaselineColor);
  var $accentContentBaseline = $("#accentContentBaseline span");
  var accentContentBaselineColor = adjustLuminanceToContrast(accentColor, cardColor, wcagContentContrast);
  $accentContentBaseline.css("background-color", accentContentBaselineColor);

  // Establish accent non-content colors
  var $accentNonContentStrong = $("#accentNonContentStrong span");
  var accentNonContentStrongColor = adjustLuminanceToContrast(accentNonContentBaselineColor, accentNonContentBaselineColor, strongContrast);
  $accentNonContentStrong.css("background-color", accentNonContentStrongColor);
  var $accentNonContentSubdued = $("#accentNonContentSubdued span");
  var accentNonContentSubduedColor = decreaseOpacityToContrast(accentNonContentStrongColor, cardColor, wcagNonContentContrast);
  $accentNonContentSubdued.css("background-color", accentNonContentSubduedColor);
  var $accentNonContentFaint = $("#accentNonContentFaint span");
  var accentNonContentFaintColor = decreaseOpacityToContrast(accentNonContentStrongColor, cardColor, faintContrast);
  $accentNonContentFaint.css("background-color", accentNonContentFaintColor);

  // Establish accent content colors
  var $accentContentStrong = $("#accentContentStrong span");
  var accentContentStrongColor = adjustLuminanceToContrast(accentContentBaselineColor, accentContentBaselineColor, strongContrast);
  $accentContentStrong.css("background-color", accentContentStrongColor);
  var $accentContentSubdued = $("#accentContentSubdued span");
  var accentContentSubduedColor = decreaseOpacityToContrast(accentContentStrongColor, cardColor, wcagContentContrast);
  $accentContentSubdued.css("background-color", accentContentSubduedColor);

  // Establish neutral non-content colors
  // var $neutraltNonContentStrong = $("#neutralNonContentStrong span");
  // var neutralNonContentStrongColor = decreaseLuminanceToContrast(accentNonContentStrongColor, black, neutralToAccentContrast);
  // $neutraltNonContentStrong.css("background-color", neutralNonContentStrongColor);

  // Establish neutral content colors
  var $neutraltContentStrong = $("#neutralContentStrong span");
  var neutralContentStrongColor = decreaseLuminanceToContrast(setSaturation(accentContentStrongColor, neutralSaturation), black, neutralToAccentContrast);
  $neutraltContentStrong.css("background-color", neutralContentStrongColor);

}