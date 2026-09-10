// Regression checks exercise the actual components with controlled hook state.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file, mocks = {}) {
 const exports = {};
 const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX}}).outputText;
 vm.runInNewContext(code, {exports, require: id => mocks[id] ?? require(id), navigator: global.navigator, setTimeout: () => 0});
 return exports;
}
const {parseCalculatorInput: parse} = load('src/lib/calculator-input.ts');
assert.equal(parse('1,234.50'), 1234.5);
assert.equal(parse(''), 0);
for (const value of ['-1','12abc','Infinity','1e309','1,2','1000000000001']) assert.ok(Number.isNaN(parse(value)), value);
function component(name, overrides = [], clipboard) {
 let i = 0;
 const updates = [];
 Object.defineProperty(global, 'navigator', {value: {clipboard}, configurable: true});
 const stub = () => null;
 const result = load(`src/components/tools/${name}.tsx`, {
  react: {useState: initial => {const index = i++; return [overrides[index] ?? initial, value => updates.push([index, value])];}, useMemo: fn => fn()},
  '@/lib/calculator-input': {parseCalculatorInput: parse},
  '@/components/tools/ToolPageLayout': {default: stub},
  '@/components/ui/Input': {Input: stub},
  '@/components/ui/Button': {default: stub},
  '@/components/ads/GoogleAd': {default: stub},
  '@/lib/history': {saveHistory: async () => {}},
 });
 return {tree: result.default(), updates};
}
function nodes(tree) {
 if (!tree || typeof tree !== 'object') return [];
 if (Array.isArray(tree)) return tree.flatMap(nodes);
 return [tree, ...nodes(tree.props?.children)];
}
function text(tree) {
 if (tree == null || typeof tree === 'boolean') return '';
 if (Array.isArray(tree)) return tree.map(text).join('');
 return typeof tree === 'object' ? text(tree.props?.children) : String(tree);
}
(async () => {
 const usd = text(component('ChannelValuationCalculator').tree);
 const eur = text(component('ChannelValuationCalculator', ['2500','1800','700','moderate','faceless','EUR']).tree);
 assert.ok(usd.includes('$225,000'));
 assert.ok(eur.includes('€225,000'), 'Selected-currency inputs must not be converted twice');
 assert.ok(text(component('ChannelValuationCalculator', ['-1']).tree).includes('Enter valid'));
 assert.ok(text(component('SponsorshipCalculator', ['Infinity']).tree).includes('Enter valid'));
 assert.ok(text(component('TaxDeductionCalculator', ['US','30','45000','-1']).tree).includes('Enter valid'));
 assert.ok(text(component('TaxDeductionCalculator', ['US','101']).tree).includes('Enter valid'));
 const tax = text(component('TaxDeductionCalculator').tree);
 assert.ok(tax.includes('18,400') && tax.includes('5,520') && tax.includes('26,600'));
 const loss = text(component('TaxDeductionCalculator', ['US','30','100']).tree);
 assert.ok(loss.includes('$30'), 'Illustrative reduction is capped at revenue times assumed rate');
 let copied;
 const sponsor = component('SponsorshipCalculator', ['25000','tech','integration_60s','USD',false,false,true,true], {writeText: async value => {copied = value;}});
 const button = nodes(sponsor.tree).find(n => text(n).includes('Copy Pitch Template') && n.props?.onClick);
 await button.props.onClick();
 const preview = nodes(sponsor.tree).find(n => n.type === 'pre');
 assert.equal(copied, text(preview));
 assert.ok(copied.includes('community tab post'));
 const failed = component('SponsorshipCalculator', [], {writeText: async () => {throw Error('denied');}});
 await nodes(failed.tree).find(n => text(n).includes('Copy Pitch Template') && n.props?.onClick).props.onClick();
 assert.ok(failed.updates.some(([,value]) => typeof value === 'string' && value.includes('Could not copy')));
 assert.ok(!failed.updates.some(([,value]) => value === true));
 console.log('Commercial calculator regressions passed: validation, currency, tax limits, pitch parity, clipboard rejection.');
})().catch(error => {console.error(error); process.exitCode = 1;});
