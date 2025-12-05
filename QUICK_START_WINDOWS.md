# How to Run This Website on Windows

This project is built with **Jekyll**, a static site generator. To run it locally and see your changes, you need to install Ruby and Jekyll.

## Step 1: Install Ruby

1. Download **Ruby+Devkit** (version 3.1.x or newer) from [rubyinstaller.org](https://rubyinstaller.org/downloads/).
   - *Recommended:* `Ruby+Devkit 3.3.x (x64)`
2. Run the installer.
   - **Important:** Check the box that says **"Add Ruby executables to your PATH"**.
3. When the installation finishes, a terminal window will open asking to install components. Press `Enter` to install the default components (MSYS2).

## Step 2: Install Jekyll and Bundler

Open a **new** PowerShell or Command Prompt window (to load the new PATH) and run:

```powershell
gem install jekyll bundler
```

## Step 3: Install Project Dependencies

Navigate to this project folder in your terminal:

```powershell
cd "d:\OneDrive - Veer Patta Public School\Desktop\Exam Papers\veerpatta-website"
bundle install
```

## Step 4: Run the Website

Start the local server:

```powershell
bundle exec jekyll serve
```

- The site will be available at: `http://localhost:4000/veerpatta-website/`
- As you edit files, the site will automatically rebuild and refresh.

## Troubleshooting

- If you see "command not found", try restarting your computer to ensure Ruby is in your system PATH.
- If you see encoding errors, run `chcp 65001` in your terminal before running Jekyll.
