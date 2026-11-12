# Arco Design Pro Vue v2.0

## v2.7.5

`2026-11-12`

### 🆕 Feature

- Added a standalone CLI entry for one-command project creation with `pnpx @ekworp/arco-design-pro-vue init`.
- Added interactive and non-interactive project generation options, including template, package manager, dependency installation, Git initialization, overwrite, and force modes.

### 💎 Optimization

- Updated the template to `@ekworp/arco-design-vue` `2.59.4`.
- Improved generated project package names and removed lockfiles that do not match the selected package manager.
- Updated the template generator for `.cjs` configuration files and asynchronous Prettier 3 formatting.
- Added Vite and Vite Simple usage documentation for the published CLI package.

## v2.7.4

`2026-11-11`

### 🆕 Feature

- Added browser-language detection and user-selectable locale persistence.
- Added dynamic loading for business messages and Arco component locales.
- Added build-time route icon discovery while keeping route metadata as string values such as `icon: 'icon-dashboard'`.
- Added a shared `icons` chunk containing only the icons used by the navigation routes.
- Added GitHub Actions checks and npm Trusted Publishing support for the fork package.

### 💎 Optimization

- Updated the Vue template toolchain and dependency versions, including Vite 8, Vue 3.5, and pnpm 11 support.
- Switched the production component library to the `@ekworp/arco-design-vue` fork.
- Optimized automatic Arco component imports and removed unnecessary global component registration.
- Lazy-loaded chart resources and kept ECharts out of the initial page preload.
- Modernized Vite and CommonJS configuration files for the current ESM toolchain.
- Removed unused `esbuild` from the template’s direct development dependencies.

### 🐛 Bugfix

- Removed deprecated router guard callbacks and resolved runtime navigation warnings.
- Replaced runtime template compilation with VNode rendering for dynamic menu and table content.
- Fixed unresolved component warnings for dynamic menu icons and tags.
- Fixed workplace popular-content table initialization and API response unwrapping.
- Updated request, notification, and loading behavior to use the forked Arco component modules.

## v2.7.3

`2023-04-26`

### 🐛 Bugfix

- Use 'admin' instead.

## v2.7.2

`2023-04-11`

### 🐛 Bugfix

- Use @arco-plugins/vite-vue to replace vite-plugin-style-import.

`2023-04-04`

### 🐛 Bugfix

- Environmental parameter adjustment.[#253](https://github.com/arco-design/arco-design-pro-vue/pull/253)
- Update the unplugin-vue-components plugin and component library.[#275](https://github.com/arco-design/arco-design-pro-vue/issues/275)

## v2.7.0

`2023-03-21`

### 🆕 Feature

- Replace yarn with pnpm. [#247](https://github.com/arco-design/arco-design-pro-vue/pull/247)

### 🐛 Bugfix

- Added legacy configuration to i18n.[#253](https://github.com/arco-design/arco-design-pro-vue/pull/253)

## v2.6.1

`2023-02-07`

### 💎 Optimization

- Added the status of the language switch button in the top navigation bar.[#243](https://github.com/arco-design/arco-design-pro-vue/pull/243)

### 🐛 Bugfix

- Using Npm to install dependencies fails.
- Plug-in build error problem. [#224](https://github.com/arco-design/arco-design-pro-vue/pull/244)
- MenuCollapse configuration does not take effect. [#232](https://github.com/arco-design/arco-design-pro-vue/issues/232)

## v2.6.0

`2023-01-10`

### 🆕 Feature

- Add a top menu bar.[#236](https://github.com/arco-design/arco-design-pro-vue/pull/236)

### 🐛 Bugfix

- Commit failure caused by dependency upgrade.[#235](https://github.com/arco-design/arco-design-pro-vue/issues/235)
- Build resources not injected into Html caused by upgrading Vite.[#225](https://github.com/arco-design/arco-design-pro-vue/issues/225)

## v2.5.15

`2022-12-20`

### 🐛 Bugfix

- Multilevel menu expansion problem. [#177](https://github.com/arco-design/arco-design-pro-vue/pull/177)
- Related dependencies and packaging configuration updates. [#224](https://github.com/arco-design/arco-design-pro-vue/pull/224)

## v2.5.14

`2022-11-15`

### 🐛 Bugfix

- Menu data copy function property in route object is lost. [#200](https://github.com/arco-design/arco-design-pro-vue/pull/200)
- Chart data content does not match.[#189](https://github.com/arco-design/arco-design-pro-vue/pull/189)

## v2.5.13

`2022-10-17`

### 🐛 Bugfix

- yarn.lock source modification. [#188](https://github.com/arco-design/arco-design-pro-vue/issues/188)
- import.meta.glob migrations. [#187](https://github.com/arco-design/arco-design-pro-vue/pull/187)

## v2.5.12

`2022-10-11`

### 💎 Optimization

- The query form page function is added. [#181](https://github.com/arco-design/arco-design-pro-vue/pull/181)

### 🐛 Bugfix

- Update the dependency package version. [#179](https://github.com/arco-design/arco-design-pro-vue/issues/179)

## v2.5.11

`2022-09-14`

### 🐛 Bugfix

- Vue-echarts auto resize problem. [#174](https://github.com/arco-design/arco-design-pro-vue/pull/174)
- Multi times route change listen. [#162](https://github.com/arco-design/arco-design-pro-vue/pull/162)

## v2.5.10

`2022-08-16`

### 🐛 Bugfix

- Supplementary cache cleaning for page reloads.[#159](https://github.com/arco-design/arco-design-pro-vue/issues/159)
- Login logic can execute while loading.[#160](https://github.com/arco-design/arco-design-pro-vue/pull/160)

## v2.5.9

`2022-08-10`

### 💎 Optimization

- Multi-tab page reloading feature. [#150](https://github.com/arco-design/arco-design-pro-vue/issues/150)
- Preprocessing of user information error capture redirection. [#153](https://github.com/arco-design/arco-design-pro-vue/pull/153)

## v2.5.8

`2022-08-02`

### 💎 Optimization

- Component library dependency upgrades.
- Added useVisible hook.

## v2.5.7

`2022-07-05`

### 💎 Optimization

- Multi-tab optimization, add left-click operation.

## v2.5.6

`2022-06-28`

### 💎 Optimization

- Improve the routing configuration item Typescript type definition.

## v2.5.5

`2022-06-21`

### 🐛 Bugfix

- Multi-tab Tag style adjustment.
- Remove redundant mock data.

## v2.5.4

`2022-06-14`

### 🐛 Bugfix

- The server menu function does not work. [#121](https://github.com/arco-design/arco-design-pro-vue/pull/121)
- Variable naming correction. [#122](https://github.com/arco-design/arco-design-pro-vue/pull/122)

## v2.5.3

`2022-06-07`

### 💎 Optimization

- Adjust the import method of the ts interface.[#110](https://github.com/arco-design/arco-design-pro-vue/pull/110)

### 🐛 Bugfix

- The problem that the menu item cannot be clicked after clicking the external link.[#111](https://github.com/arco-design/arco-design-pro-vue/pull/111)
- Menu expansion and configuration issues fixed.[#114](https://github.com/arco-design/arco-design-pro-vue/pull/114)

## v2.5.2

`2022-05-31`

### 💎 Optimization

- First-level menu chain adjustment and DEMO. [#102](https://github.com/arco-design/arco-design-pro-vue/pull/102)
- Page jump, automatically open the corresponding parent menu.[#97](https://github.com/arco-design/arco-design-pro-vue/pull/97)

### 🐛 Bugfix

- Build errors caused by component library upgrades.[#101](https://github.com/arco-design/arco-design-pro-vue/pull/101)

## v2.5.1

`2022-05-24`

### 💎 Optimization

- The menu supports external links. [#83](https://github.com/arco-design/arco-design-pro-vue/pull/91)

### 🐛 Bugfix

- fix the problem that color weak switch's default value is always false. [#87](https://github.com/arco-design/arco-design-pro-vue/pull/87)
- Switch role error. [#84](https://github.com/arco-design/arco-design-pro-vue/issues/84)

## v2.5.0

`2022-05-17`

### 🆕 Feature

- Added full screen function.[#83](https://github.com/arco-design/arco-design-pro-vue/pull/83)
- Added preview script.

### 💎 Optimization

- Added activeMenu configuration.[#76](https://github.com/arco-design/arco-design-pro-vue/issues/76)[#80](https://github.com/arco-design/arco-design-pro-vue/issues/80)

### 🐛 Bugfix

- Hide child menu items problem.[#76](https://github.com/arco-design/arco-design-pro-vue/issues/76)
- Update vue-tsc version. [#61](https://github.com/arco-design/arco-design-pro-vue/issues/61)

## v2.4.1

`2022-05-10`

### 🐛 Bugfix

- Simple mode menu text display problem.

## v2.4.0

`2022-05-10`

### 🆕 Feature

- Added server-side menu configuration feature.[#75](https://github.com/arco-design/arco-design-pro-vue/pull/75)

### 💎 Optimization

- The routing level is flattened and page caching is supported.[#74](https://github.com/arco-design/arco-design-pro-vue/pull/74)

### 🐛 Bugfix

- The problem of building TS errors caused by the upgrade of the arco component library.[#74](https://github.com/arco-design/arco-design-pro-vue/pull/74)
- The file cannot be found problem caused by the upgrade of the arco component library.[#71](https://github.com/arco-design/arco-design-pro-vue/issues/71)

## v2.3.6

`2022-04-26`

### 🆕 Feature

- Login page remember password function.

### 💎 Optimization

- Menu components added support for top-level items.[#59](https://github.com/arco-design/arco-design-pro-vue/pull/59)

### 🐛 Bugfix

- Fixed tab bar first click invalid.[#64](https://github.com/arco-design/arco-design-pro-vue/issues/64)
- Fix not found page redirects.

## v2.3.4

`2022-04-12`

### 💎 Optimization

- Login route configuration adjustment。[#50](https://github.com/arco-design/arco-design-pro-vue/pull/50)

## v2.3.3

`2022-03-29`

### 🆕 Feature

- Add custom upload case.

### 🐛 Bugfix

- Fix the problem that page cache does not take effect.
- Fix tab bar scrolling style issue. [#44](https://github.com/arco-design/arco-design-pro-vue/pull/44)

## v2.3.2

`2022-03-22`

### 🆕 Feature

- Add multi-tab and page cache。

### 🐛 Bugfix

- Fix the problem that the global settings switch is not displayed.
- Avoid double submit on @keyup.enter. [#42](https://github.com/arco-design/arco-design-pro-vue/pull/42)

## v2.3.1

`2022-03-15`

### 🐛 Bugfix

- Fix the problem of unsuccessful initialization caused by vite-plugin-imagemin.

## v2.3.0

`2022-03-15`

### 🆕 Feature

- Code refactoring using setup script.
- Routes are automatically imported.

### 💎 Optimization

- Packaging optimization.
- Responsive processing and small screen display optimization.

## v2.2.5

`2022-03-08`

### 🆕 Feature

- Added the function of setting the corresponding api base URL according to different operating environments. [#29](https://github.com/arco-design/arco-design-pro-vue/pull/29)

### 💎 Optimization

- Responsive processing and small screen display optimization.
- Route monitoring performance optimization.

### 🐛 Bugfix

- Optional chain causes item initialization to fail. [#31](https://github.com/arco-design/arco-design-pro-vue/issues/31)
- Fixed the bug that i18n did not set allowComposition and could not start under windows.[#32](https://github.com/arco-design/arco-design-pro-vue/pull/32)

## v2.2.4

`2022-03-01`

### 🐛 Bugfix

- Fix the problem that the component does not take effect after switching the language. [#27](https://github.com/arco-design/arco-design-pro-vue/issues/27)
- Delete easy mode missing files.

### 💎 Optimization

- The basic configuration of vite is extracted.

## v2.2.3

`2022-02-22`

### 💎 Optimization

- HideInMenu field was added to route configuration.

### 🆕 Feature

- Initializing projects supports simple mode. (**Need to upgrade `@arco-design/arco-cli` to `1.26.0`**)

## v2.2.0

`2022-01-25`

### 💎 Optimization

- Icon to replace.

### 🆕 Feature

- Add permission management.
- Support jsx syntax.

## v2.1.0

`2022-01-18`

### 💎 Optimization

- ECharts configuration hook usage optimization.
- ESLint reported an error when initializing the project.

### 🆕 Feature

- Migrate Vuex to Pinia. ([#7](https://github.com/arco-design/arco-design-pro-vue/pull/7))
