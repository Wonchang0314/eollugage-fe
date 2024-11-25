# 📖 얼루가게 README
![image](https://github.com/user-attachments/assets/b52d7bca-7bce-4633-9a37-49bb15e8e258)

- [배포 URL](https://gage.eolluga.com)
- [App Store(iOS)](https://apps.apple.com/kr/app/%EC%96%BC%EB%A3%A8%EA%B0%80%EA%B2%8C/id6477911531)
- [Play Store(AOS)](https://play.google.com/store/apps/details?id=com.eolluga.eollugage)

<br>

## 목차
  - [서비스 소개](#서비스-소개)
  - [팀원 소개 및 역할 분담](#팀원-소개-및-역할-분담)
  - [프로젝트 소개](#프로젝트-소개)
  - [기술 스택 소개](#기술-스택-소개)
  - [시작 가이드](#시작-가이드)
  - [프로젝트 구조](#프로젝트-구조)
  - [페이지별 기능](#페이지별-기능)
  - [트러블 슈팅](#트러블-슈팅)
  - [개선된 점](#개선된-점)

<br>

## 서비스 소개
- 얼루가게는 요식업 점주들의 직원 & 발주 관리를 위한 웹앱입니다.
- 사장님은 가게 계정을 개설하고, 직원들은 가게에 합류하여 가게 공지사항과 발주노트를 함께 공유할 수 있습니다.
- 가게마다 비치된 QR을 통해 직원들은 출퇴근 현황을 기록할 수 있습니다.
- 사장님은 직원들의 출퇴근 현황을 한 눈에 파악하고 수정/추가할 수 있습니다.
- 사장님은 직원들의 직책을 설정하고 변경할 수 있습니다.

<br>

## 팀원 소개 및 역할 분담

<div align="center">

| **정선아** | **김유경** | **방기연** | **장원석** |
| :------: |  :------: | :------: | :------: |
| [<img src="https://avatars.githubusercontent.com/iodio89?v=4" height=150 width=150> <br/> @iodio89](https://github.com/iodio89) | [<img src="https://avatars.githubusercontent.com/tptkds?v=4" height=150 width=150> <br/> @tptkds](https://github.com/tptkds) | [<img src="https://avatars.githubusercontent.com/PangKiYeon?v=4" height=150 width=150> <br/> @PangKiYeon](https://github.com/PangKiYeon) | [<img src="https://avatars.githubusercontent.com/Wonchang0314?v=4" height=150 width=150> <br/> @Wonchang0314](https://github.com/Wonchang0314) |

</div>

<br>

## 프로젝트 소개

### 개발 기간

- 전체 개발 기간 : 2024.09.25 ~ 현재
- UI 구현 : 2024.09.25 ~ 2024.10.14
- 기능 구현 : 2024.10.15 ~ 2024.11.10
- QA 진행 및 오류 수정 : 2024.11.11 ~ 현재
- 리팩토링 : 

<br>

### 진행 방식

- 주에 2번 온라인 회의를 진행하며 작업 순서와 방향성에 대한 고민을 나누고 코드 리뷰를 진행했습니다.
- **GitHub Projects**와 **Issues**를 사용하여 작업을 할당하고 진행 상황을 공유했습니다.
- **Github**는 Git-flow 전략을 기반으로 Upstream의 main, develop 브랜치와 개개인의 Origin Repository를 운용했습니다.
  - 개인 Origin Repository에서 기능 단위로 독립적인 개발을 진행했습니다.
  - Upstream은 main, develop 브랜치로 나누어 사용하였습니다.
    - main 브랜치: 배포 브랜치
    - develop 브랜치: 개발 단계에서 git-flow의 master 역할

<br>

## 기술 스택 소개

- 코어 : Next.js, Typescript, React Native
- 상태관리: React Query, Jotai
- 스타일링: Tailwind CSS, [자체 개발 UI 컴포넌트](https://www.npmjs.com/package/@eolluga/eolluga-ui), shadcn/ui
- 패키지 매니저: Yarn
- CI/CD : Github Action, AWS Amplify
- 버전 및 이슈관리 : Github, Github Issues, Github Project
- 협업 툴 : Slack, ZEP

<br/>

### 사용 이유

#### Next.js, Tailwind CSS

- Next.js
    - SSR을 통해 초기 페이지 진입 시 화면을 빠르게 로딩하고, 필요한 데이터를 미리 불러와 사용자 경험을 향상시켰습니다.
    - App Router의 직관적이고 편리한 라우팅 체계를 활용하여 개발 효율성을 높이고 페이지 간 전환을 용이하게 했습니다.
- Tailwind CSS
    - 자체 제작한 컴포넌트 패키지에서 미리 정의해 둔 컬러 시스템과 타이포그래피를 사용하여 일관된 스타일을 유지할 수 있었습니다.
    - 편리한 CSS 유틸리티를 사용하여 복잡한 스타일링을 간단하게 구현할 수 있었습니다.
    - CSS와 JavaScript를 한 파일에서 관리할 수 있어 코드 가독성을 높이고, 컴포넌트 개발의 생산성을 향상시켰습니다.

#### React Query

- 중복 호출을 제거하고 오래된 데이터를 자동으로 갱신해주어, 비동기 데이터 처리의 복잡성을 크게 줄이고 효율적으로 데이터를 관리할 수 있었습니다.
- 데이터 호출 상태(로딩, 성공, 실패 등)를 다양한 상태값으로 관리하여, 사용자에게 요청 상태에 따라 적절한 피드백을 제공할 수 있었습니다.
- Prefetch한 데이터를 Hydration을 통해 클라이언트 사이드의 상태로 손쉽게 이어받아, 초기 로딩 성능을 높이고 클라이언트 측에서의 데이터 관리를 원활히 할 수 있었습니다.

#### eslint, prettier

- 정해진 규칙에 따라 자동적으로 코드 스타일을 정리해 코드의 일관성을 유지하고자 했습니다.
- 코드 품질 관리는 eslint에, 코드 포맷팅은 prettier에 일임해 사용했습니다.
- 협업 시 매번 컨벤션을 신경 쓸 필요 없이 빠르게 개발하는 데에 목적을 두었습니다.


<br>

## 시작 가이드


<br/>

## 프로젝트 구조

```
.
├── README.md
├── components.json
├── declaration.d.ts
├── next-env.d.ts
├── next.config.mjs
├── node_modules
├── package.json
├── postcss.config.mjs
├── public
├── scripts
├── src
│   ├── app
│   ├── entities
│   ├── features
│   ├── shared
│   └── widgets
├── tailwind.config.ts
├── tsconfig.json
└── yarn.lock
```

<br>




## 페이지별 기능

### [로그인 및 회원가입]

### [홈]

### [근무 관리]

### [마이페이지]

<br>

## 트러블 슈팅

- [제목]

<br>

## 개선된 점


    
<br>
