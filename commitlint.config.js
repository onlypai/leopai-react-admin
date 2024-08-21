export default {
  //集成
  extends: ['@commitlint/config-conventional'],
  //规则
  rules: {
    // 提交类型必须在以下类型中选择
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复问题
        'docs', // 文档变更
        'style', // 代码格式化（不影响功能，如空格、分号等）
        'refactor', // 代码重构（不涉及新增功能或修复 Bug）
        'test', // 添加测试
        'chore', // 其他不修改 src 或测试文件的更改
        'perf', // 提升性能的代码更改
        'ci', // 持续集成相关配置或脚本
        'build', // 构建系统或外部依赖的修改
        'revert', // 恢复之前的提交
      ],
    ], // 提交标题的最大长度限制为 72 字符

    'header-max-length': [2, 'always', 72], // 提交类型不能为空

    'type-empty': [2, 'never'], // 提交的作用域可以为空

    'scope-empty': [0], // 提交描述不能为空

    'subject-empty': [2, 'never'], // 提交描述必须以小写字母开头
    // 'subject-case': [2, 'always', 'sentence-case'],
    // 提交描述大小写不敏感

    'subject-case': [0],
  },
};
