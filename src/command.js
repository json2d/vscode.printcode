const vscode = require("vscode");
const child_process = require("child_process");
const funcs = require("./funcs");
const webServer = require("./webServer");
const config = require("./config").get();

exports.print = function() {
  webServer.run().then(() => {
    printIt();
  });
};

function printIt() {
  let editor = vscode.window.activeTextEditor;
  let language = editor.document.languageId;
  var mode = funcs.resolveAliases(language);
  let url = "http://localhost:" + config.webServerPort + "/?mode=" + mode;

  if (config.browserPath != "") {
    child_process.exec('"' + config.browserPath + '" ' + url);
  } else {
    let platform = process.platform;
    switch (platform) {
      case "darwin":
        child_process.exec("open " + url);
        break;
      case "linux":
        child_process.exec("xdg-open " + url);
        break;
      case "win32":
        child_process.exec("start " + url);
        break;
    }
  }
}
