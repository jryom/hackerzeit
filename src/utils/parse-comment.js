const HtmlToReact = require('html-to-react');
const HtmlToReactParser = require('html-to-react').Parser;

const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
const processingInstructions = [
  {
    shouldProcessNode: (node) => node?.data?.startsWith('>'),
    processNode: (node, children, index) => {
      return React.createElement(
        'span',
        { key: index, className: 'quote' },
        node.data
      );
    },
  },
  {
    shouldProcessNode: () => true,
    processNode: processNodeDefinitions.processDefaultNode,
  },
];

const htmlToReactParser = new HtmlToReactParser();

export default (html) =>
  htmlToReactParser.parseWithInstructions(
    html,
    () => true,
    processingInstructions
  );
