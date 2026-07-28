UUID = somestrangewallpaper@strange.com
TARGET_DIR = $(HOME)/.local/share/gnome-shell/extensions

.PHONY: install uninstall

install:
	@echo "Installing extension..."
	@mkdir -p "$(TARGET_DIR)"
	
	@rm -rf "$(TARGET_DIR)/$(UUID)"
	
	@echo "Copying extension files..."
	@cp -r "$(UUID)" "$(TARGET_DIR)/"
	
	@if [ -d "$(TARGET_DIR)/$(UUID)/schemas" ]; then \
		if command -v glib-compile-schemas >/dev/null 2>&1; then \
			echo "Compiling GSettings schemas..."; \
			glib-compile-schemas "$(TARGET_DIR)/$(UUID)/schemas/"; \
		else \
			echo "Warning: glib-compile-schemas not found. Please install glib2-devel / libglib2.0-bin."; \
		fi \
	fi
	@echo "Done! Restart your GNOME Shell to add your strange wallpapers!"

uninstall:
	@echo "Uninstalling extension..."
	@rm -rf "$(TARGET_DIR)/$(UUID)"
	@echo "Uninstalled."
