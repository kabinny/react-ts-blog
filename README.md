# React Blog

React와 TypeScript로 만든 블로그 앱.  
[https://react-ts-blog-a3958.web.app/](https://react-ts-blog-a3958.web.app/)

## 프로젝트 실행

`yarn start`로 개발 모드 실행되면
[http://localhost:3000](http://localhost:3000)에서 확인 가능

## 프로젝트 빌드 & 배포

### 프로젝트 빌드

`yarn build`

### firebase cli로 배포

firebase tools가 설치되지 않았다면 설치  
`npm install -g firebase-tools`

배포하기  
`firebase deploy --only hosting`

## firebase, API 키 보안 작업

- Firebase > Cloud Firestore > 규칙 에서 보안 규칙을 변경한다.
- Google Cloud > 해당 앱 > API 및 서비스 > 사용자 인증 정보 > APi 키 를 클릭해서 키 제한 사항을 설정한다. 웹사이트에 체크하고, 사용할 url 추가

## 참고할 기능

- firebase > Authentication: 이메일/비밀번호로 회원가입 및 로그인
- firebase > Firestore Database: 기본적인 데이터 CRUD (포스트), 배열 요소 update (댓글 기능 부분)
- React Context API: user 정보가 있는 AuthContext.tsx, 다크모드 설정을 위한 ThemeContext.tsx
- tsconfig: 파일 절대경로 설정 (baseUrl, paths)
