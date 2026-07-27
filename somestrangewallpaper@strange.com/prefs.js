import Gio from 'gi://Gio';
import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import ExtensionPreferences from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class VideoWallpaperPrefs extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings('org.gnome.shell.extensions.somestrangewallpaper');
        const page = new Adw.PreferencesPage();
        window.add(page);

        const monitorManager = global.display.get_monitor_manager();
        const monitorCount = monitorManager.get_num_monitors();
        let currentPaths = settings.get_strv('video-paths') || [];

        for (let i = 0; i < monitorCount; i++) {
            const monitorName = monitorManager.get_monitor_product_string(i) || `Monitor ${i + 1}`;
            const group = new Adw.PreferencesGroup({ title: monitorName });
            page.add(group);

            const row = new Adw.ActionRow({ title: 'Choose Wallpaper' });
            group.add(row);

            const fileButton = new Gtk.Button({
                label: currentPaths[i] ? 'Change Wallpaper...' : 'Choose Wallpaper...',
                valign: Gtk.Align.CENTER
            });
            row.add_suffix(fileButton);

            fileButton.connect('clicked', () => {
                const dialog = new Gtk.FileDialog({ title: `Wallpaper for ${monitorName}` });
                const filter = new Gtk.FileFilter();
                filter.set_name("Video-Files");
                filter.add_mime_type("video/mp4");
                filter.add_mime_type("video/webm");

                const filters = new Gio.ListStore({ item_type: Gtk.FileFilter });
                filters.append(filter);
                dialog.set_filters(filters);

                dialog.open(window, null, (res) => {
                    try {
                        const file = dialog.open_finish(res);
                        currentPaths[i] = file.get_path();
                        settings.set_strv('video-paths', currentPaths);
                        fileButton.set_label('Change Wallpaper...');
                    } catch (e) { }
                });
            });
        }
    }
}
