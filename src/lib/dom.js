const $ = (selector, context = document) => context.querySelector(selector);

const $$ = (selector, context = document) => context.querySelectorAll(selector);

const createHTML = (htmlValue = "", cssValue = "", jsValue = "") => {
    const html = htmlValue;
    const css = cssValue;
    const js = jsValue;

    return `
    <html>
    <head>
        <style>${css}</style>
    </head>
    <body>
        ${html}
        <script>${js}</script>
    </body>
    </html>
    `;
};

export { $, $$, createHTML };
