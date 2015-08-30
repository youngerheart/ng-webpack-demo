default:
	@echo "   \033[35mmake\033[0m \033[1m命令使用说明\033[0m"
	@echo "   \033[35mmake install\033[0m\t---  安装依赖"
	@echo "   \033[35mmake clean\033[0m\t---  清除已经安装的依赖及缓存"
	@echo "   \033[35mmake dev\033[0m\t---  开发模式（在 build 的基础上 watch 文件变化并自动 build）"

install:
	rm -rf ./dist && npm install && bower install

dev:
	rm -rf ./dist && npm run dev


clean:
	@echo "正在清除 ... \c"
	@rm -rf {bower_components,node_modules,/tmp/cache-desktop-*}
	@echo "\033[32m完成\033[0m"