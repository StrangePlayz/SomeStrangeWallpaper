import Extension from 'resource:///org/gnome/shell/extensions/extension.js';
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import Meta from 'gi://Meta';

export default class SomeStrangeWallpaper extends Extension {
    enable() {
        this._processes = [];
        this._settings = this.getSettings('org.gnome.shell.extensions.somestrangewallpaper');

        this._startVideos();

        this._settingsId = this._settings.connect('changed::video-paths', () => {
            this._startVideos();
        });
    }

    disable() {
        if (this._settingsId) {
            this._settings.disconnect(this._settingsId);
            this._settingsId = null;
        }
        this._stopAllVideos();
        this._settings = null;
    }

    _stopAllVideos() {
        for (let process of this._processes) {
            if (process) process.force_exit();
        }
        this._processes = [];
    }

    _startVideos() {
        this._stopAllVideos();
        const videoPaths = this._settings.get_strv('video-paths');
        if (!videoPaths || videoPaths.length === 0) return;

        const monitorManager = global.display.get_monitor_manager();
        const monitorCount = monitorManager.get_num_monitors();

        for (let i = 0; i < monitorCount; i++) {
            const videoPath = videoPaths[i] || videoPaths[0];
            if (!videoPath || !GLib.file_test(videoPath, GLib.FileTest.EXISTS)) continue;

            const monitorName = monitorManager.get_monitor_product_string(i) || monitorManager.get_display_name(i);
            const monitorIdentifier = monitorName ? monitorName : String(i);
            const command = ['mpvpaper', monitorIdentifier, videoPath, '-o', 'loop=inf --no-audio'];

            try {
                let launcher = new Gio.SubprocessLauncher({ flags: Gio.SubprocessFlags.NONE });
                this._processes.push(launcher.spawnv(command));
            } catch (e) {
                console.error(`Fehler auf Monitor ${i}: ${e.message}`);
            }
        }
    }
}
