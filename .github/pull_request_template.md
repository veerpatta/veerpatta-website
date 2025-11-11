## Description
<!-- Provide a clear and concise description of your changes -->

## Type of Change
<!-- Mark the relevant option with an [x] -->
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Content update (text, images, or media changes)
- [ ] Design change (CSS/styling updates)
- [ ] Performance improvement
- [ ] Documentation update
- [ ] Refactoring (code improvement without changing functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)

## Related Issue
<!-- Link to the issue this PR addresses -->
Fixes #(issue number)

## Changes Made
<!-- List the specific changes you made -->
- 
- 
- 

## Screenshots
<!-- If applicable, add screenshots showing before/after -->

### Before
<!-- Screenshot or description of the original state -->

### After
<!-- Screenshot or description after your changes -->

## Testing Checklist
<!-- Mark completed items with [x] -->

### Device Testing
- [ ] Desktop (Chrome)
- [ ] Desktop (Safari)
- [ ] Desktop (Firefox)
- [ ] Desktop (Edge)
- [ ] Mobile (iOS Safari)
- [ ] Mobile (Android Chrome)
- [ ] Tablet

### Functionality Testing
- [ ] All pages load correctly
- [ ] Navigation works on all pages
- [ ] Language switcher toggles correctly (EN ↔ HI)
- [ ] WhatsApp button works
- [ ] Gallery loads and filters work
- [ ] All links work (no 404s)
- [ ] Forms submit correctly (if applicable)
- [ ] Mobile menu opens/closes smoothly

### Responsive Testing
- [ ] Works at 320px width (smallest mobile)
- [ ] Works at 375px width (iPhone SE)
- [ ] Works at 768px width (tablet)
- [ ] Works at 1024px+ width (desktop)
- [ ] No horizontal scrolling on any screen size

### Accessibility Testing
- [ ] All images have alt text
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus visible on all interactive elements
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Screen reader tested (specify tool used):
- [ ] Touch targets are minimum 48x48px

### Performance Testing
- [ ] Lighthouse Performance score > 90
- [ ] Lighthouse Accessibility score > 95
- [ ] No console errors
- [ ] Images optimized (WebP, compressed)
- [ ] Page loads fast on 3G network

### Bilingual Testing
<!-- Only if content changes -->
- [ ] Both English (/en/) and Hindi (/hi/) versions updated
- [ ] Hindi font displays correctly (Noto Sans Devanagari)
- [ ] Translations are accurate
- [ ] Content parity maintained across languages

### Code Quality
- [ ] Code follows project style guidelines
- [ ] No linting errors
- [ ] Comments added for complex logic
- [ ] No unnecessary console.log() statements
- [ ] No hardcoded values (use variables/constants)

## Documentation Updates
<!-- Mark if documentation was updated -->
- [ ] README.md updated (if needed)
- [ ] CONTRIBUTING.md updated (if needed)
- [ ] CHANGELOG.md updated
- [ ] Code comments added/updated
- [ ] No documentation changes needed

## Security Considerations
- [ ] No sensitive data (API keys, passwords) committed
- [ ] No personal information exposed
- [ ] External resources use HTTPS
- [ ] Input validation implemented (if applicable)
- [ ] No security vulnerabilities introduced

## Deployment Notes
<!-- Any special considerations for deployment? -->
- [ ] No special deployment steps needed
- [ ] Requires configuration changes (specify):
- [ ] Requires new environment variables (specify):
- [ ] Backward compatible with existing content
- [ ] May cause temporary visual changes during cache refresh

## Rollback Plan
<!-- How can this change be reverted if needed? -->

## Additional Notes
<!-- Any other information reviewers should know -->

## Reviewer Checklist
<!-- For maintainers reviewing this PR -->
- [ ] Code review completed
- [ ] Changes tested locally
- [ ] Documentation is clear and complete
- [ ] No merge conflicts
- [ ] CI/CD checks pass
- [ ] Approved for merge

---

## For Coding Agents
<!-- If this PR was created by a coding agent, answer these: -->

**Agent Name/Type:**
<!-- e.g., GitHub Copilot, Claude Code, etc. -->

**Automated Testing Results:**
<!-- Paste any automated test results -->

**Manual Validation:**
<!-- Describe what manual testing was performed -->

**Edge Cases Considered:**
<!-- List any edge cases you tested for -->

---

By submitting this pull request, I confirm that:
- [ ] I have read and followed the [CONTRIBUTING.md](../CONTRIBUTING.md) guidelines
- [ ] My code follows the project's coding standards
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated documentation accordingly
- [ ] My changes generate no new warnings or errors
- [ ] I have tested my changes thoroughly
- [ ] This PR is ready for review
