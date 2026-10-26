# Research Project Dashboard Template

**연구 프로젝트마다 복제해서 사용하는 GitHub Pages 기반 공개 대시보드 템플릿**입니다.  
GitHub Issues로 업무를 관리하고, 웹 대시보드에서 일정과 진행 현황을 읽기 전용으로 확인합니다.

이 저장소에는 기존 SkyWater 프로젝트의 실제 업무, 실험 결과, 작성 완료 보고서가 포함되지 않습니다.

## 포함된 기능

- 6단계 연구 일정표: 전체 기간, 6개월, 3개월 보기
- GitHub Issues 기반 업무·마일스톤·담당자·진행 상태·체크리스트
- 타임라인, 업무 목록, 칸반 보드, 검색 및 필터
- 업무 현황 3개 통계, 최근 업무 8개, 최근 Weekly Report 8개
- A4 HTML Weekly Report 작성 및 저장, 읽기 전용 브라우저 열람
- 월별 보고서 폴더 `reports/weekly/YYYY-MM/`
- PC/모바일 반응형 디자인, 산출물 아이콘 6개
- GitHub Actions 테스트·안전한 공개 데이터 추출·GitHub Pages 배포

## 새 프로젝트 만들기

1. 이 저장소의 **Settings → General → Template repository** 항목을 켭니다.
2. **Use this template → Create a new repository**를 눌러 새 **Public** 저장소를 생성합니다.
3. 새 저장소의 [`site/config.js`](site/config.js)를 편집합니다.
   프로젝트명, 두 줄 제목, 부제, 연구실명, 저작권 연도, 시작/종료일, 6개 연구 단계 및 산출물을 설정합니다.
4. 연구 단계 이름을 바꾼 경우 [Issue 양식](.github/ISSUE_TEMPLATE/task.yml)의 해당 드롭다운도 같은 이름으로 바꿉니다. **단계 ID 01~06은 유지**하세요.
5. 새 저장소에서 **Issues**를 활성화하고 `dashboard` 라벨을 만든 다음, **프로젝트 업무** 양식으로 Issue를 등록합니다. `dashboard` 라벨이 붙은 업무만 현황판에 표시됩니다.
6. **Settings → Pages → Build and deployment → Source: GitHub Actions**를 선택합니다.
   **Actions → Publish public dashboard → Run workflow**로 첫 배포를 실행합니다.

기본 공개 주소는 `https://OWNER.github.io/REPOSITORY/`입니다. 표준 GitHub Pages 주소에서는 `site/config.js`가 새 저장소 경로를 자동 인식합니다. 사용자 지정 도메인은 설정 파일의 fallback 저장소 주소와 Actions 변수 `DASHBOARD_SITE_URL`을 지정하세요.

## Weekly Report

대시보드의 **리포트 생성**에서 A4 보고서를 작성하여 HTML로 다운로드하고,
새 저장소의 `reports/weekly/YYYY-MM/`에 업로드합니다.
배포 후 **최근 리포트 업데이트**에 최신 8건이 표시되며, 원본에서 스크립트와 편집 기능을 제거한 읽기 전용 HTML이 열립니다.
보고서를 삭제하면 다음 Pages 배포 후 목록에서도 제거됩니다.

## 개발 및 검증

Python 3.11+와 Node.js 20+가 필요합니다.

```bash
python3 -m unittest discover -s tests -v
node --check site/app.js
node tests/test_report_refresh.js
node tests/test_summary_layout.js
GITHUB_REPOSITORY=OWNER/REPOSITORY python3 scripts/build.py
python3 -m http.server --directory _site 8000
```

## 공개 정보 주의

**이 방식은 공개 저장소 및 공개 GitHub Pages를 전제로 합니다.**
비공개 연구 결과, NDA 문서, 기업 PDK, 라이선스, 인증 정보, 미공개 회로도, 개인정보는 업로드하지 마세요.
`dashboard` 라벨은 **대시보드 표시 여부만** 제어하며 Issue 원문을 비공개로 만들지 않습니다.
업로드한 HTML 원본도 공개 저장소에서 누구나 볼 수 있습니다.

자세한 보고서 안내는 [`reports/weekly/README.md`](reports/weekly/README.md)를 참조하세요.
