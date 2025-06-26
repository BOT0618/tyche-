# tyche用户备注插件

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-待发布-blue.svg)](https://chrome.google.com/webstore)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Vue](https://img.shields.io/badge/Vue-3.4+-4FC08D.svg?logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)

一个专为 [tyche.run](https://tyche.run) 平台设计的浏览器扩展，帮助用户为区块链地址添加和管理自定义备注。

## ✨ 功能特性

- 🔍 **智能地址识别** - 自动识别tyche.run页面上的区块链地址
- 📝 **自定义备注** - 为用户页面和Token页面的地址添加个人备注
- 🎨 **视觉增强** - 备注地址以金色高亮显示，便于快速识别
- 💾 **本地存储** - 所有数据仅存储在本地，保护用户隐私
- 🔄 **实时同步** - 备注在页面切换时自动同步显示
- 🎯 **精确匹配** - 支持完整地址和缩略地址的智能匹配

## 🚀 安装

### 从Chrome Web Store安装（推荐）
1. 访问 [Chrome Web Store](https://chrome.google.com/webstore) 搜索 "tyche用户备注插件"
2. 点击"添加至Chrome"安装

### 开发者安装
```bash
# 克隆仓库
git clone https://github.com/BOT0618/tyche-.git
cd tyche-

# 安装依赖
pnpm install

# 构建扩展
pnpm run build

# 在Chrome中加载扩展
# 1. 打开 chrome://extensions/
# 2. 启用"开发者模式"
# 3. 点击"加载已解压的扩展程序"
# 4. 选择 extension 目录
```

## 📖 使用说明

### 添加备注
1. 访问任意tyche.run用户页面
2. 在用户名旁边找到"添加备注"按钮
3. 点击按钮输入备注内容
4. 点击"确定"保存备注

### 查看备注
- 在tyche.run的Token页面中，已添加备注的地址会以金色高亮显示
- 点击地址可跳转到对应的用户页面
- 在扩展的侧边栏中可以管理所有备注

## 🛠️ 技术栈

- **前端框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **样式**: UnoCSS
- **浏览器API**: Chrome Extension Manifest V3
- **状态管理**: Vue Composition API
- **存储**: Chrome Storage API

## 📁 项目结构

```
├── src/
│   ├── contentScripts/     # 内容脚本
│   │   ├── views/         # Vue组件
│   │   └── index.ts       # 入口文件
│   ├── background/        # 后台脚本
│   ├── popup/            # 弹出窗口
│   ├── options/          # 选项页面
│   ├── assets/           # 静态资源
│   └── manifest.ts       # 扩展配置
├── extension/            # 构建输出
├── scripts/             # 构建脚本
└── docs/               # 文档
```

## 🔧 开发

### 开发环境设置
```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 构建生产版本
pnpm run build

# 运行测试
pnpm run test
```

### 代码规范
- 使用 TypeScript 进行类型检查
- 遵循 Vue 3 Composition API 最佳实践
- 使用 ESLint 和 Prettier 保持代码风格一致

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献指南
1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔒 隐私政策

本扩展不会收集任何个人身份信息。所有数据仅存储在用户本地浏览器中。

详细隐私政策请查看：[隐私政策](privacy-policy.html)

## 📞 联系我们

- 项目主页: [https://github.com/BOT0618/tyche-](https://github.com/BOT0618/tyche-)
- 问题反馈: [Issues](https://github.com/BOT0618/tyche-/issues)
- 功能建议: [Discussions](https://github.com/BOT0618/tyche-/discussions)

## 🙏 致谢

- [tyche.run](https://tyche.run) - 提供优秀的区块链数据分析平台
- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Chrome Extensions](https://developer.chrome.com/docs/extensions/) - 浏览器扩展开发平台

---

⭐ 如果这个项目对你有帮助，请给我们一个星标！
