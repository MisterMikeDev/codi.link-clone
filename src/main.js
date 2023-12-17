import { encode, decode } from "js-base64";
import { $, createHTML } from "./lib/dom";
import { createEditor } from "./editor";
import "./split";
import "./style.css";

const $doc = globalThis.document;
const $htmlEditor = $("#html");
const $cssEditor = $("#css");
const $jsEditor = $("#js");
const $preview = $("#preview");

const htmlMonacoEditor = createEditor($htmlEditor, "", "html");
const cssMonacoEditor = createEditor($cssEditor, "", "css");
const jsMonacoEditor = createEditor($jsEditor, "", "javascript");

function onChange() {
    const htmlValue = htmlMonacoEditor.getValue() ?? "";
    const cssValue = cssMonacoEditor.getValue() ?? "";
    const jsValue = jsMonacoEditor.getValue() ?? "";

    const htmlDoc = createHTML(htmlValue, cssValue, jsValue);

    const hashedURL = `${encode(htmlValue)}|${encode(cssValue)}|${encode(
        jsValue
    )}`;

    globalThis.window.history.replaceState(null, null, `/${hashedURL}`);

    $preview.setAttribute("srcdoc", htmlDoc);
}

function init() {
    const { pathname } = globalThis.window.location;
    const path = pathname.slice(1).split("%7C");
    const [html = "", css = "", js = ""] = path;

    htmlMonacoEditor.setValue(decode(html) ?? "");
    cssMonacoEditor.setValue(decode(css) ?? "");
    jsMonacoEditor.setValue(decode(js) ?? "");

    onChange();
}

$doc.addEventListener("DomContentLoaded", init);
htmlMonacoEditor.onDidChangeModelContent(onChange);
cssMonacoEditor.onDidChangeModelContent(onChange);
jsMonacoEditor.onDidChangeModelContent(onChange);

init();
