const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const cache=new Map();
function load(file){
 if(cache.has(file)) return cache.get(file);
 const exports={};cache.set(file,exports);
 const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 vm.runInNewContext(code,{exports,require:id=>id.startsWith('@/')?load('src/'+id.slice(2)+'.ts'):require(id)});
 return exports;
}
const {getRelatedToolsForPost}=load('src/lib/related-tools.ts');
for(const [title,expected] of [
 ['YouTube media kit for sponsorships','youtube-sponsorship-calculator'],
 ['YouTube channel valuation and selling price','youtube-channel-valuation-calculator'],
 ['Creator tax deductions and write-offs','youtube-tax-deduction-calculator'],
 ['YouTube title ideas','youtube-title-generator'],
]){
 const related=getRelatedToolsForPost({title,category:'Monetization'},4);
 assert.equal(related[0].slug,expected,title);
 assert.equal(new Set(related.map(t=>t.slug)).size,related.length);
}
const {tools}=load('src/config/tools.ts');
const {citableFacts,speakableAnswers}=load('src/lib/seo-data.ts');
assert.equal(citableFacts.toolCount,String(tools.length));
assert.ok(speakableAnswers.freeToolsHub.includes(String(tools.length)));
console.log('Discovery regressions passed: topical link priority, unique links, catalog-derived tool count.');
