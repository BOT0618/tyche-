# 开发指南

本文档为开发者提供详细的开发环境设置和开发流程指导。

## 🛠️ 环境要求

- **Node.js**: 18.0.0 或更高版本
- **pnpm**: 8.0.0 或更高版本
- **Git**: 最新版本
- **Chrome**: 88.0 或更高版本（用于测试扩展）

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/BOT0618/tyche-.git
cd tyche-
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发服务器

```bash
pnpm run dev
```

### 4. 在浏览器中加载扩展

1. 打开 Chrome 浏览器
2. 访问 `chrome://extensions/`
3. 启用"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择项目中的 `extension` 目录

## 📁 项目结构详解

```
tyche-/
├── src/                          # 源代码目录
│   ├── contentScripts/           # 内容脚本
│   │   ├── views/               # Vue 组件
│   │   │   ├── App.vue          # 主应用组件
│   │   │   └── RemarkButton.vue # 备注按钮组件
│   │   └── index.ts             # 内容脚本入口
│   ├── background/              # 后台脚本
│   │   └── main.ts              # 后台脚本入口
│   ├── popup/                   # 弹出窗口
│   │   ├── index.html           # 弹出窗口 HTML
│   │   └── main.ts              # 弹出窗口脚本
│   ├── options/                 # 选项页面
│   │   ├── index.html           # 选项页面 HTML
│   │   └── main.ts              # 选项页面脚本
│   ├── assets/                  # 静态资源
│   │   └── logo.png             # 扩展图标
│   ├── composables/             # 组合式函数
│   │   └── useWebExtensionStorage.ts
│   ├── types/                   # TypeScript 类型定义
│   │   └── remark.ts
│   ├── i18n/                    # 国际化
│   │   ├── index.ts
│   │   └── translations.json
│   └── manifest.ts              # 扩展配置
├── extension/                   # 构建输出目录
├── scripts/                     # 构建脚本
├── docs/                        # 文档
└── .github/                     # GitHub 配置
```

## 🔧 开发命令

### 基础命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 构建生产版本
pnpm run build

# 清理构建文件
pnpm run clear

# 运行测试
pnpm run test

# 代码检查
pnpm run lint
```

### 构建命令

```bash
# 构建所有内容
pnpm run build

# 仅构建 web 页面
pnpm run build:web

# 仅构建后台脚本
pnpm run build:background

# 仅构建内容脚本
pnpm run build:js

# 准备构建文件
pnpm run build:prepare
```

## 🧪 测试

### 手动测试

1. **功能测试**
   - 访问 tyche.run 用户页面
   - 测试添加备注功能
   - 测试备注显示功能
   - 测试页面切换功能

2. **兼容性测试**
   - 测试不同 Chrome 版本
   - 测试不同操作系统
   - 测试不同屏幕尺寸

### 自动化测试

```bash
# 运行单元测试
pnpm run test

# 运行 E2E 测试
pnpm run test:e2e

# 生成测试覆盖率报告
pnpm run test:coverage
```

## 📝 代码规范

### TypeScript

- 使用严格的 TypeScript 配置
- 为所有函数和变量添加类型注解
- 使用接口定义数据结构

### Vue 3

- 使用 Composition API
- 使用 `<script setup>` 语法
- 遵循 Vue 3 最佳实践

### 样式

- 使用 UnoCSS 工具类
- 遵循 BEM 命名规范
- 保持样式的一致性

### Git 提交

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
feat: 添加新功能
fix: 修复 bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具的变动
```

## 🔍 调试

### Chrome DevTools

1. 打开扩展的弹出窗口
2. 右键点击 → 检查
3. 在 DevTools 中调试

### 内容脚本调试

1. 在 tyche.run 页面打开 DevTools
2. 在 Console 中查看日志
3. 使用 `console.log` 调试

### 后台脚本调试

1. 访问 `chrome://extensions/`
2. 找到扩展 → 点击"检查视图"
3. 在 DevTools 中调试

## 🚀 发布流程

### 1. 版本更新

```bash
# 更新版本号
pnpm version patch  # 或 minor, major

# 更新 CHANGELOG.md
# 提交更改
git add .
git commit -m "chore: release v1.0.0"
git tag v1.0.0
git push origin main --tags
```

### 2. 构建发布版本

```bash
pnpm run build
```

### 3. 创建发布包

```bash
# 压缩 extension 目录
zip -r tyche-remark-v1.0.0.zip extension/
```

### 4. 上传到 Chrome Web Store

1. 访问 [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. 上传新的 ZIP 文件
3. 更新版本说明
4. 提交审核

## 🤝 贡献流程

1. Fork 项目
2. 创建功能分支
3. 编写代码和测试
4. 提交 Pull Request
5. 等待代码审查
6. 合并到主分支

## 📞 获取帮助

- 查看 [Issues](https://github.com/BOT0618/tyche-/issues)
- 参与 [Discussions](https://github.com/BOT0618/tyche-/discussions)
- 阅读 [文档](https://github.com/BOT0618/tyche-/tree/main/docs)

## 📚 相关资源

- [Chrome Extension 开发文档](https://developer.chrome.com/docs/extensions/)
- [Vue 3 官方文档](https://vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)
