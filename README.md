## 프로그라피 5기 사전과제 : 할 일 관리 프로그램 

---

### # 기술 스택 : node.js / express / lowdb

---

### # 구현기능 : 회원가입 / 로그인 / 로그아웃 / 할 일 추가, 조회, 생성, 삭제

---

### # API

* GET / : 메인페이지
* GET /login : 로그인 페이지
* GET /regisger : 회원가입 페이지
* POST /auth/register : 회원가입 요청 처리
* POST /auth/login : 로그인 요청 처리
* GET /auth/logout : 로그아웃 요청 처리
* POST /task : 할 일 추가
* PATCH /task/:id/:content : 할 일 수정
* DELETE /task/:id : 할 일 삭제

---

### # 데이터베이스 

* users : {id,  email, password, nickname}
* tasks : {id, uid, content}




