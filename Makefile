UUID = somestrangewallpaper@strange.com
EXT_DIR = $(HOME)/.local/share/gnome-shell/extensions/$(UUID)

.PHONY: install uninstall

install:
	@echo "Installing extension..."
	@mkdir -p $(EXT_DIR)
	@cp -r * $(EXT_DIR)/
	@rm -f $(EXT_DIR)/Makefile
	@glib-compile-schemas $(EXT_DIR)/schemas/
	@echo "Done! Restart your GNOME Shell to add your strange wallpapers!"

uninstall:
	@rm -rf $(EXT_DIR)
	@echo "Uninstalled."
