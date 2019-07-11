# Yanolja 프로젝트 Angular

## 초기설정
1. fork 한다.
2. fork한 repo(자기 repo)에서 `git clone [git주소]` 명령어로 clone 받는다.
3. 자신의 폴더로 들어가서 `npm i` 명령어로 패키지 다운
4. `git flow init` 명령어로 flow 초기 설정(설정은 아래와 같이)
5. `git remote add rmorigin https://github.com/final-project-yanolja/yanolja-frontend.git` 명령어로 리모트를 fork했던 주소로 하나 만들어 준다.

#### gitflow는 아래와 같이 설정
```BASH
[gitflow "branch"]
  master = master
  develop = develop
[gitflow "prefix"]
  feature = feature/
  release = release/
  hotfix = hotfix/
  support = support/
  versiontag = 
```

## 작업시작
1. [develop] 최신 상태로 만들기 위해 fork했던 주소에 데이터를 가져온다.
   1. `git fetch rmorigin`
   2. `git merge rmorigin/develop`
2. [develop] `git flow feature start [원하는 브런치 이름]` __(작업전에 무조건!!)__
3. [feature로 만든 브런치] 작업하고 `git add`, `git commit`, `git push -u origin [feature로 만든 브런치]`
4. [feature로 만든 브런치] `git flow feature finish [원하는 브런치 이름]`
   * 만든 feature 브런치가 없어지고 develop에 자동으로 merge 된다.
5. [develop] `git push` 명령어로 merge된 최종 파일들을 develop에 올린다.
6. fork한 repo(자기 repo)에서 **Pull Requests**를 보낸다.(develop -> develop)


# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
