import * as monaco from "monaco-editor";
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import JsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

window.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === "html") {
            return new HtmlWorker();
        }
        if (label === "css") {
            return new CssWorker();
        }
        return new JsWorker();
    }
};

const COMMON_EDITOR_OPTIONS = {
    fontSize: 18,
    wordWrap: "off",
    scrollBeyondLastLine: false,
    theme: "vs-dark",
    minimap: {
        enabled: false
    },
    automaticLayout: true
};

const createEditor = (element, value = "", language) =>
    monaco.editor.create(element, {
        value,
        language,
        ...COMMON_EDITOR_OPTIONS
    });

export { createEditor };
