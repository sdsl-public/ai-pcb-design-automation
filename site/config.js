/* AI-assisted PCB design, verification and fabrication automation research.
   Project schedule: December 2026 through August 2027 (9 months). No secrets here. */
(() => {
  'use strict';
  const host=window.location?.hostname || '';
  const slug=window.location?.pathname?.split('/').filter(Boolean)[0] || '';
  const owner=host.endsWith('.github.io') ? host.slice(0,-'.github.io'.length) : '';
  window.DASHBOARD_CONFIG=Object.freeze({
    repository: owner && slug ? `${owner}/${slug}` : 'sdsl-public/ai-pcb-design-automation',
    title: 'AI 기반 PCB 설계·검증·제작 자동화 연구',
    reportTitle: 'AI PCB Design Automation',
    titlePrimary: 'AI 기반 PCB',
    titleAccent: '설계·검증·제작 자동화',
    subtitle: 'AI 기반 회로·PCB 설계부터 자동 검증, 제작 연계, 실물 평가까지',
    kicker: 'AI-ASSISTED PCB DESIGN & AUTOMATION',
    organization: 'Semiconductor Device and System Laboratory',
    organizationShort: 'SDSL',
    copyrightYear: '2026',
    timezone: 'Asia/Seoul',
    projectStart: '2026-12-01',
    projectEnd: '2027-08-31',
    targetDate: null,
    projectUrl: null,
    phases: [
      {id:'01',title:'연구 기획·사양 정의',en:'Goals & specifications',deliverable:'목표·요구사항 및 평가 기준',color:'#c8e9a3',color2:'#86c3a1'},
      {id:'02',title:'AI 회로·부품 설계',en:'AI circuit & component design',deliverable:'회로도·넷리스트·부품/BOM 초안',color:'#a9ddae',color2:'#70bfb5'},
      {id:'03',title:'PCB 배치·배선 자동화',en:'PCB placement & routing',deliverable:'레이아웃·배치·배선 설계 파일',color:'#84d2ba',color2:'#669cac'},
      {id:'04',title:'회로·레이아웃 검증',en:'ERC, DRC & design validation',deliverable:'ERC·DRC·설계 검증 보고서',color:'#89c7bb',color2:'#7e9bb0'},
      {id:'05',title:'제작 데이터·발주 연계',en:'Manufacturing data & handoff',deliverable:'Gerber/Drill·BOM·실장좌표·DFM 검토',color:'#a4c0b6',color2:'#8399ae'},
      {id:'06',title:'시제품 평가·최적화',en:'Prototype test & iteration',deliverable:'시제품 측정 데이터·개선 보고서',color:'#b8ccb1',color2:'#91abb4'},
      {id:'00',title:'미분류',en:'Uncategorized',color:'#a8b1b8',color2:'#697986'}
    ]
  });
})();
