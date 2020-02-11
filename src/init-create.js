export const createLicense = (author) => {
  return `MIT License

Copyright (c) ${new Date().getFullYear()} ${author}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;
};

export const createIndex = (pkg) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>${pkg.name} example</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="${pkg.module}" type="module"></script>
  </body>
</html>`;
};

export const createTsConfig = () => `{
  "include": ["src"],
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "declaration": true,
    "declarationDir": "dist/types",
    "emitDeclarationOnly": true,
    "jsx": "react",
    "lib": ["dom", "esnext"],
    "removeComments": true
  }
}`;

export const getDefaults = (pkg, template) =>
  [
    pkg.author && {
      file: 'LICENSE',
      content: createLicense(pkg.author),
      extensions: ['', '.md', '.txt'],
    },
    {
      file: '.gitignore',
      content: ['node_modules', 'dist', 'coverage', '.idea', '*.log'].join('\n'),
    },
    {
      file: 'public/index.html',
      content: createIndex(pkg),
    },
    {
      file: `public/index.${template}`,
      content: `import { sum } from '../src/${pkg.name}';\n\nconsole.log('this works => ', sum(2, 3));`,
    },
  ].filter(Boolean);

export const getTemplates = (pkg, template) => {
  const templates = {
    js: [
      {
        file: pkg.source,
        content: `export const sum = (a, b) => a + b;`,
      },
    ],
    ts: [
      {
        file: pkg.source,
        content: `export const sum = (a: number, b: number): number => a + b;`,
      },
      {
        file: 'tsconfig.json',
        content: createTsConfig(),
      },
    ],
  };

  return templates[template.slice(0, 2)];
};
