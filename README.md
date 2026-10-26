# AI 기반 PCB 설계·검증·제작 자동화 연구

GitHub Issues를 연구 업무의 관리 원본으로 사용하고, GitHub Pages에서 일정·업무·Weekly Report를 공개하는 **연구용 대시보드**입니다. [Research Project Dashboard Template](https://github.com/sdsl-public/research-project-dashboard-template)를 기반으로 구성했습니다.

## 연구 목표

AI 기반의 전자회로 및 PCB 설계 초안 생성에서 자동 검증, 제조 파일 생성·발주 연계, 실물 시제품 평가까지 연결하는 워크플로를 구축하고 성능과 재현성을 비교·평가합니다.

**아래 항목은 연구 계획이며 구현 완료나 서비스 제공을 의미하지 않습니다.**

## 연구 단계와 산출물

| 단계 | 주요 연구 내용 | 산출물 |
|---|---|---|
| 01 연구 기획·사양 정의 | 활용 사례, 입력 요구사항, 성능지표·평가 기준 | 요구사항 정의서·평가 지표 |
| 02 AI 회로·부품 설계 | 자연어 사양→회로 후보, 부품 매칭, 회로도·BOM 생성 | 회로도·넷리스트·BOM 초안 |
| 03 PCB 배치·배선 자동화 | PCB 외형, 레이어, 자동 배치·배선, 설계 제약 적용 | 배치·배선 설계 파일 |
| 04 회로·레이아웃 검증 | ERC/DRC, 연결성, 간섭 및 필요 시 SI/PI 평가 | 자동 검증 결과·리뷰 기록 |
| 05 제작 데이터·발주 연계 | Gerber/Drill, BOM, CPL, DFM, 견적·주문 연동 조사 | 제조 산출물 패키지 |
| 06 시제품 평가·최적화 | 제작·실장, 전기적 시험, 결함 피드백, 결과 학습 | 테스트 데이터·개선 보고서 |

연구 도구의 후보에는 KiCad, EasyEDA/OpenEDA 및 JLCPCB 호환 제조 데이터가 포함됩니다. 각 API·연동 가능성은 별도 검증 대상입니다.

## 초기 프로젝트 기간

**2026-11-01 ~ 2027-10-31** (임시 12개월)

연구 일정이 확정되면 `site/config.js`의 `projectStart`, `projectEnd`를 변경하세요. 실제 Github Issues의 날짜를 임의로 변경하지 않습니다.

## 대시보드 운영

1. 연구 업무를 **Issues → AI PCB 자동화 연구 업무**로 등록합니다.
2. 관리자가 GitHub Issue에 `dashboard` 라벨을 지정하면 공개 대시보드에 표시됩니다.
3. 자동 생성한 회로와 PCB 파일은 사람이 검토하고 별도 ERC/DRC 등의 검증 절차를 거칩니다.
4. 제조 주문과 비용 발생 등의 외부 실행은 **담당자의 승인** 후 진행합니다.
5. 연구 결과는 **리포트 생성** 기능으로 작성하고 `reports/weekly/YYYY-MM/`에 업로드합니다.

## 대시보드 및 운영 설정

- **연구 저장소:** https://github.com/sdsl-public/ai-pcb-design-automation
- **GitHub Pages:** https://sdsl-public.github.io/ai-pcb-design-automation/
- **프로젝트 설정:** `site/config.js`
- **연구 업무 등록:** `Issues → AI PCB 자동화 연구 업무`
- **Weekly Report:** 대시보드의 `리포트 생성`에서 작성 후 `reports/weekly/YYYY-MM/`에 HTML 업로드

저장소 **Issues**를 활성화하고 `dashboard` 라벨을 만들어 공개해도 되는 Issue에 적용하세요.
**Settings → Pages → Source: GitHub Actions**를 선택하면 `Publish public dashboard` 워크플로로 배포합니다.
현재 기간은 **2026-11-01 ~ 2027-10-31**의 임시 계획이며 실제 연구 일정 확정 시 변경할 수 있습니다.

## 안전 및 공개 범위

이 저장소의 GitHub Pages·Issues·보고서 원본은 **공개**됩니다. 비공개 고객 도면, NDA 자료, 유료 설계 라이브러리, API 키·자격 증명, 미공개 연구 결과는 업로드하지 마세요. `dashboard` 라벨은 대시보드 노출만 제어하고 GitHub Issue의 공개 여부를 바꾸지 않습니다.

## 로컬 테스트

```bash
python3 -m unittest discover -s tests -v
node --check site/app.js
node tests/test_report_refresh.js
node tests/test_summary_layout.js
node tests/test_ai_pcb_setup.js
GITHUB_REPOSITORY=sdsl-public/ai-pcb-design-automation python3 scripts/build.py
```
