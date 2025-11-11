# GitHub Actions Workflow for Jekyll Deployment

## Overview

This repository uses a custom GitHub Actions workflow to deploy the Jekyll site to GitHub Pages. This provides better control over the build process and clearer deployment logs compared to the default GitHub Pages Jekyll build.

## Workflow File

**Location**: `.github/workflows/jekyll.yml`

## How It Works

### Trigger
The workflow automatically runs when:
- Code is pushed to the `main` branch
- Manually triggered from the Actions tab

### Build Process
1. **Checkout**: Fetches the repository code
2. **Setup Ruby**: Installs Ruby 3.1 and Bundler
3. **Setup Pages**: Configures GitHub Pages settings
4. **Build with Jekyll**: Runs `bundle exec jekyll build` with production environment
5. **Upload Artifact**: Packages the built site for deployment

### Deployment
- Separate deployment job runs after successful build
- Deploys to GitHub Pages environment
- Site becomes live at: https://veerpatta.github.io/veerpatta-website/

## Monitoring

### Check Deployment Status
1. Go to [Actions tab](https://github.com/veerpatta/veerpatta-website/actions)
2. Click on the latest workflow run
3. View build and deployment logs
4. Green checkmark ✓ = success, Red X ✗ = failure

### Build Logs
- **Normal logging level**: Concise output, easier to spot issues
- **Separate jobs**: Build and deploy steps are isolated for better debugging
- **Clear error messages**: Errors are highlighted and easy to identify

## Differences from Default GitHub Pages

### Before (Default GitHub Pages)
- Debug-level logging (extremely verbose)
- No control over build process
- Logs often truncated
- Harder to debug issues

### After (Custom Workflow)
- Standard logging level (concise, clear)
- Full control over Ruby/Jekyll versions
- Complete logs preserved
- Easier to debug and monitor

## Dependencies

### Gemfile
The workflow uses the `Gemfile` to install dependencies:
- Jekyll ~> 3.10.0 (compatible with GitHub Pages)
- github-pages gem with standard plugins
- jekyll-remote-theme (for theme support)
- jekyll-seo-tag (for SEO optimization)

### Ruby Version
- Ruby 3.1 (specified in workflow)
- Compatible with all Jekyll 3.10.x features

## Troubleshooting

### Build Fails
1. Check the Actions tab for error messages
2. Look for common issues:
   - YAML syntax errors in frontmatter
   - Liquid template errors
   - Missing dependencies
   - Invalid Markdown

### Deployment Fails
1. Verify Pages settings in repository settings
2. Check permissions (workflow has required permissions)
3. Ensure no conflicting deployments

### Need to Manually Trigger
1. Go to Actions tab
2. Click "Deploy Jekyll site to Pages" workflow
3. Click "Run workflow" button
4. Select `main` branch and run

## Benefits

✅ **Cleaner logs**: Normal logging instead of debug mode  
✅ **Better debugging**: Separate build/deploy steps  
✅ **Version control**: Pinned Jekyll and dependency versions  
✅ **Faster iteration**: Easier to spot and fix issues  
✅ **Modern tooling**: Uses latest GitHub Actions features  
✅ **Reliability**: Consistent, reproducible builds  

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Workflow File](./.github/workflows/jekyll.yml)

---

*Last Updated: November 2025*
