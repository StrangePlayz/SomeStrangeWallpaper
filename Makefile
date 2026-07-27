UUID = somestrangewallpaper@strange.com
EXT_DIR = $(HOME)/.local/share/gnome-shell/extensions/$(UUID)

.PHONY: install uninstall

install:
	@echo "Installing extension..."
	@mkdir -p "$(EXT_DIR)"
	@cp -r . "$(EXT_DIR)/"
	@rm -f "$(EXT_DIR)/Makefile"
	@rm -rf "$(EXT_DIR)/.git" "$(EXT_DIR)/.gitignore"
	@if [ -d "$(EXT_DIR)/schemas" ]; then \
		glib-compile-schemas "$(EXT_DIR)/schemas/"; \
	fi
	@echo "Done! Restart your GNOME Shell to add your strange wallpapers!"

uninstall:
	@echo "Uninstalling extension..."
	@rm -rf "$(EXT_DIR)"
	@echo "Uninstalled."
