# SomeStrangeWallpaper
A simple GNOME extension that lets you choose a video as your desktop-background.


## Installation

The easiest way to install this extension manually from source is by using the provided `Makefile`.

### Prerequisites

Make sure you have `make` and the GLib development tools installed on your system. 

* **Ubuntu/Debian:** `sudo apt install make libglib2.0-bin`
* **Fedora:** `sudo dnf install make glib2-devel`
* **Arch Linux:** `sudo pacman -S make`

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/StrangePlayz/SomeStrangeWallpaper
   cd SomeStrangeWallpaper
   ```

2. **Install the extension:**
   This command automatically copies the files to your local extension directory and compiles the GSettings schemas.
   ```bash
   make install
   ```

3. **Restart GNOME Shell:**
   * **Wayland:** Log out of your desktop session and log back in.

4. **Enable the extension:**
   Open the **Extensions** or **Extension Manager** app and turn on "SomeStrangeWallpaper".

## Uninstallation

To completely remove the extension and its compiled schemas from your system, run:

```bash
make uninstall
```
