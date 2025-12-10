#!/bin/bash

echo "========================================"
echo "  圣诞树项目 - 本地服务器启动器"
echo "========================================"
echo ""
echo "正在启动本地服务器..."
echo ""
echo "服务器地址：http://localhost:8000"
echo "访问页面：http://localhost:8000/christmas_tree_touch&gesture.html"
echo ""
echo "按 Ctrl+C 停止服务器"
echo "========================================"
echo ""

# 检查 Python3
if command -v python3 &> /dev/null; then
    echo "使用 Python3 启动服务器..."
    python3 -m http.server 8000
# 检查 Python
elif command -v python &> /dev/null; then
    echo "使用 Python 启动服务器..."
    python -m http.server 8000
# 检查 Node.js
elif command -v node &> /dev/null; then
    echo "使用 Node.js 启动服务器..."
    npx http-server . -p 8000 -o
else
    echo ""
    echo "[错误] 未检测到 Python 或 Node.js！"
    echo ""
    echo "请安装以下任一工具："
    echo "1. Python: https://www.python.org/downloads/"
    echo "2. Node.js: https://nodejs.org/"
    echo ""
    echo "或者使用 VS Code 的 Live Server 插件"
    echo ""
    read -p "按回车键退出..."
fi



