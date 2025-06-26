# 贡献指南

感谢您对 tyche用户备注插件 的关注！我们欢迎所有形式的贡献。

## 🤝 如何贡献

### 报告 Bug

如果您发现了一个 bug，请通过以下步骤报告：

1. 在 [Issues](https://github.com/BOT0618/tyche-/issues) 页面搜索是否已有相关报告
2. 如果没有找到，请创建一个新的 Issue
3. 使用 "Bug report" 模板
4. 详细描述问题，包括：
   - 浏览器版本
   - 扩展版本
   - 重现步骤
   - 预期行为
   - 实际行为

### 功能建议

如果您有功能建议，请：

1. 在 [Discussions](https://github.com/BOT0618/tyche-/discussions) 中发起讨论
2. 或者创建带有 "Feature request" 标签的 Issue
3. 详细描述功能需求和使用场景

### 代码贡献

#### 环境准备

1. Fork 本仓库
2. 克隆到本地：
   ```bash
   git clone https://github.com/你的用户名/tyche-.git
   cd tyche-
   ```
3. 安装依赖：
   ```bash
   pnpm install
   ```
4. 创建功能分支：
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### 开发流程

1. **编写代码**
   - 遵循现有的代码风格
   - 使用 TypeScript
   - 添加必要的注释
   - 确保代码通过 ESLint 检查

2. **测试**
   ```bash
   # 构建扩展
   pnpm run build

   # 在浏览器中测试功能
   # 1. 打开 chrome://extensions/
   # 2. 启用开发者模式
   # 3. 加载已解压的扩展程序
   # 4. 选择 extension 目录
   ```

3. **提交代码**
   ```bash
   git add .
   git commit -m "feat: 添加新功能描述"
   git push origin feature/your-feature-name
   ```

4. **创建 Pull Request**
   - 在 GitHub 上创建 Pull Request
   - 使用提供的模板
   - 详细描述更改内容
   - 添加相关的 Issue 链接

#### 提交信息规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

#### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 Vue 3 Composition API 最佳实践
- 使用 ESLint 和 Prettier 保持代码风格一致
- 组件名使用 PascalCase
- 文件名使用 kebab-case
- 变量和函数名使用 camelCase

## 📋 Pull Request 检查清单

在提交 Pull Request 之前，请确保：

- [ ] 代码通过所有测试
- [ ] 遵循代码规范
- [ ] 添加了必要的文档
- [ ] 更新了 README（如果需要）
- [ ] 提交信息符合规范
- [ ] 没有引入新的 bug

## 🏷️ Issue 标签说明

- `bug` - Bug 报告
- `enhancement` - 功能增强
- `documentation` - 文档相关
- `good first issue` - 适合新手的 Issue
- `help wanted` - 需要帮助的 Issue
- `question` - 问题咨询

## 📞 联系我们

如果您在贡献过程中遇到任何问题，请：

1. 查看 [Issues](https://github.com/BOT0618/tyche-/issues) 是否有类似问题
2. 在 [Discussions](https://github.com/BOT0618/tyche-/discussions) 中发起讨论
3. 创建新的 Issue 描述问题

感谢您的贡献！🎉
