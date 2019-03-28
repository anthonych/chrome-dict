
// Lookup URLs
var searchUrlMw = "https://www.merriam-webster.com/dictionary/"; // Merriam-Webster
var searchUrlYh = "https://tw.dictionary.search.yahoo.com/search?p="; // Yahoo Dictionary

function lookupDict(searchText, dict) {
  // Default lookup Yahoo Dictionary
  var targetSearchUrl = searchUrlYh + searchText;

  if (dict === 'mw') {
    // Lookup Merriam-Webster Dictionary
    targetSearchUrl = searchUrlMw + searchText;
  }

  chrome.tabs.create({ url: targetSearchUrl });
};

// Add listener for omnibox input event
chrome.omnibox.onInputEntered.addListener(function (text) {
  var searchText = encodeURIComponent(text);

  if (searchText.search('^mw%20') == 0) {
    lookupDict(searchText.slice(5), 'mw');
  } else if (searchText.search('^yh%20') == 0) {
    lookupDict(searchText.slice(5), 'yh');
  } else {
    lookupDict(searchText, 'yh');
  }
});

// Generic menu item click event
function genericOnClick(info, tab) {
  var selectedText = encodeURIComponent(info.selectionText);

  if (info.menuItemId == "item2") {
    lookupDict(selectedText, 'mw');
  } else {
    lookupDict(selectedText, 'yh');
  }
}

// Create context menu items
var parent = chrome.contextMenus.create({
  "title": "Lookup Dictionary",
  "contexts": ["selection"]
});

var child1 = chrome.contextMenus.create({
  "title": "Yahoo Dictionary",
  "id": "item1",
  "parentId": parent,
  "contexts": ["selection"],
  "onclick": genericOnClick
});

var child2 = chrome.contextMenus.create({
  "title": "Merriam-Wester",
  "id": "item2",
  "parentId": parent,
  "contexts": ["selection"],
  "onclick": genericOnClick
});

