/* Project-specific configuration and issue form regression. */
'use strict';
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const config=fs.readFileSync('site/config.js','utf8');
const issue=fs.readFileSync('.github/ISSUE_TEMPLATE/task.yml','utf8');
const index=fs.readFileSync('site/index.html','utf8');
const css=fs.readFileSync('site/styles.css','utf8');
const sandbox={window:{location:{hostname:'sdsl-public.github.io',pathname:'/ai-pcb-design-automation/'}}};
vm.runInNewContext(config,sandbox);
const c=sandbox.window.DASHBOARD_CONFIG;
assert.equal(c.repository,'sdsl-public/ai-pcb-design-automation');
assert.equal(c.title,'AI 기반 PCB 설계·검증·제작 자동화 연구');
assert.equal(c.reportTitle,'AI PCB Design Automation');
assert.equal(c.projectStart,'2026-12-01');
assert.equal(c.projectEnd,'2027-08-31');
assert.equal(c.organizationShort,'SDSL');
assert.equal(c.organization,'Semiconductor Device and System Laboratory');
assert.ok(index.includes('<span id="footer-organization">SDSL</span>'));
assert.ok(index.includes('<span id="footer-copyright-organization">SDSL</span>'));
const app=fs.readFileSync('site/app.js','utf8');
assert.ok(app.includes("['#footer-organization',config.organizationShort]"));
assert.ok(app.includes("['#footer-copyright-organization',config.organizationShort]"));
assert.ok(!app.includes("['#footer-organization',config.organization]"));

assert.equal(c.timezone,'Asia/Seoul');
const phases=c.phases.filter(p=>p.id!=='00');
assert.equal(phases.length,6);
phases.forEach((phase,i)=>{
  assert.equal(phase.id,String(i+1).padStart(2,'0'));
  assert.ok(phase.en && phase.title && phase.deliverable);
  assert.ok(issue.includes(phase.id+' · '+phase.title),'Issue form phase mismatch: '+phase.id);
});
assert.ok(index.includes('styles.css?v=ai-pcb-project-1'));
assert.ok(index.includes('id="hero-primary">AI 기반 PCB'));
assert.ok(css.includes('#project-title{font-size:clamp(36px,5.2vw,80px)'));
assert.ok(!fs.existsSync('reports/weekly/2026-10/2026.10.21_14-57_(KST)_Min-Hwi_Kim_Weekly_Report.html'));
// The report retains the approved SkyWater layout, with PCB-specific branding.
const report=fs.readFileSync('site/weekly_report_template.html','utf8');
const lab='Semiconductor Device and System Laboratory';
assert.ok(report.includes('<p class="kicker">AI PCB Design Automation<br>Weekly Report</p>'));
assert.ok(report.includes('<div class="laboratory-footer">'+lab+'</div>'));
assert.ok(report.includes('<title>Weekly Report · AI PCB Design Automation</title>'));
assert.ok(report.includes("const reportTitle=c.reportTitle||'AI PCB Design Automation'"));
assert.ok(report.includes("const reportName = \`${window.DASHBOARD_CONFIG?.reportTitle || 'AI PCB Design Automation'} Weekly Report · ${authorName} · ${writtenAt}\`;"));
assert.ok(report.includes('const filenameBase = \`${writtenAt}_${authorName}_Weekly_Report\`'));
assert.ok(report.includes("{id:'author', label:'작성자'}"));
// Simulate browser branding to verify the exact two-line heading and footer.
const metaTag='<script data-project-metadata>';
const segments=report.split(metaTag);
assert.equal(segments.length,2,'project metadata script exists exactly once');
const script=segments[1].split('</script>',1)[0];
assert.ok(script.includes('const reportTitle=c.reportTitle'));
const elements={
  '.kicker':{nodes:[],replaceChildren(...nodes){this.nodes=nodes;}},
  '.laboratory-footer':{textContent:''}
};
const simulatedDocument={
  title:'',
  querySelector:selector=>elements[selector]||null,
  createTextNode:text=>({type:'text',value:text}),
  createElement:tag=>({type:'element',tag})
};
vm.runInNewContext(script,{window:sandbox.window,document:simulatedDocument});
assert.deepEqual(Array.from(elements['.kicker'].nodes,x=>x.type==='text'?x.value:x.tag),
  ['AI PCB Design Automation','br','Weekly Report']);
assert.equal(elements['.laboratory-footer'].textContent,lab);
assert.equal(simulatedDocument.title,'Weekly Report · AI PCB Design Automation');
process.stdout.write('AI_PCB_PROJECT_CONFIGURATION_PASS\n');
