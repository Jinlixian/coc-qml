"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  activate: () => activate
});
module.exports = __toCommonJS(src_exports);
var import_coc = require("coc.nvim");
async function activate(context) {
  const config = import_coc.workspace.getConfiguration("coc-qml");
  const isEnable = config.get("enabled", true);
  if (!isEnable) {
    return;
  }
  var qmlformat = config.get("qmlformatPath", "qmlformat");
  var qmlformatArgs = config.get("qmlformatArgs", []);
  import_coc.commands.registerCommand("coc-qml.formatDocument", async () => {
    await format(qmlformat, qmlformatArgs);
  });
  import_coc.commands.registerCommand("coc-qml.qmlformat", async () => {
    await format(qmlformat, qmlformatArgs);
  });
  var qmlls = config.get("qmllsPath", "qmlls");
  var qmllsArgs = config.get("qmllsArgs", []);
  const serverOptions = {
    command: qmlls,
    args: qmllsArgs,
    languages: ["qml"]
  };
  const clientOptions = {
    documentSelector: ["qml"]
  };
  const client = new import_coc.LanguageClient(
    "coc-qml",
    serverOptions,
    clientOptions,
    true
  );
  context.subscriptions.push(import_coc.services.registLanguageClient(client));
}
async function format(qmlformat, qmlformatArgs) {
  const doc = await import_coc.workspace.document;
  if (doc && doc.filetype == "qml") {
    await import_coc.workspace.nvim.command("w");
    const cmd = `${qmlformat} -i ${doc.uri.toString().replace("file://", "")} ${qmlformatArgs.join(" ")}`;
    const res = await import_coc.workspace.runCommand(cmd);
    await import_coc.workspace.nvim.command("e");
    if (res.length > 0) {
      import_coc.window.showMessage(res);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate
});
