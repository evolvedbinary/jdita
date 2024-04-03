# lwdita-xdita

`lwdita-xdita` is a parser made for [LwDITA](https://github.com/oasis-tcs/dita-lwdita).
It is responsible for converting LwDITA files to a JSON tree structure.

This project depends on the [`@evolvedbinary/lwdita-ast`](https://www.npmjs.com/package/@evolvedbinary/lwdita-xdita) package to provide the mapping from the [XDita schema](https://github.com/oasis-tcs/dita-lwdita/blob/spec/org.oasis.xdita/dtd/lw-topic.mod).

## Usage

You can add `lwdita-xdita` to your project using `npm` or `yarn`.

```bash
npm install --save @evolvedbinary/lwdita-xdita
```

or

```bash
yarn add @evolvedbinary/lwdita-xdita
```

```javascript
const { xditaToJson } = require("@evolvedbinary/lwdita-xdita");

const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">
<topic>...</topic>
`
xditaToJson(xml)
  .then(JDitaDocument => console.log(JSON.stringify(result, null, 2)))
  .catch(error => console.log('Failed to convert:', error));
```

By default, `xditaToJson` will fail when it encounters any error (XML syntax errors, validation errors,...).
If you want to ignore any errors and work with whatever data the function could collect, set the second argument `abortOnError` to `false`:

```javascript
xditaToJson(xml, false)
```

For more information, see [https://github.com/evolvedbinary/jdita](https://github.com/evolvedbinary/jdita).
