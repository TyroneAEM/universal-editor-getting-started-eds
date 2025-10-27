# Configuration Service Migration Guide

## Overview

This guide documents the process of migrating an **AEM Universal Editor** project from **Document Mode** (file-based configs) to **API Mode** (Configuration Service).

---

## 🔍 Key Discovery

Universal Editor projects use a **different API endpoint structure** than traditional Franklin projects:

| Project Type | API Endpoint Structure |
|--------------|------------------------|
| **Traditional Franklin** | `/config/{org}/{repo}/content/.../query.yaml` |
| **Universal Editor** | `/index/{org}/{repo}/main/query` ✅ |

**This is the critical difference that caused 401/403 errors when following traditional Franklin documentation.**

---

## 📊 Document Mode vs API Mode

### Document Mode (File-based)

**Configuration stored in:**
- `helix-query.yaml` in GitHub repo
- `helix-sitemap.yaml` in GitHub repo
- Other config files committed to repo

**Pros:**
- ✅ Version controlled in Git
- ✅ Code review via pull requests
- ✅ Easy to edit locally
- ✅ Works with `aem up` local development
- ✅ Transparent - everyone can see config

**Cons:**
- ❌ Requires Git commit for config changes
- ❌ Config tied to code deployment
- ❌ Less flexible for multi-site management

### API Mode (Configuration Service)

**Configuration stored in:**
- Adobe Configuration Service API
- Accessed via Admin API endpoints
- Centralized management

**Pros:**
- ✅ No Git commits needed for config changes
- ✅ Instant updates without code deployment
- ✅ Better for multi-site/repoless setups
- ✅ Centralized configuration management

**Cons:**
- ❌ Not version controlled
- ❌ Less transparent (not visible in repo)
- ❌ Requires API authentication
- ❌ Can't test locally with `aem up` as easily

---

## 🚀 Migration Process

### Prerequisites

1. **Authentication**
   - Login to Admin API: https://admin.hlx.page/login
   - Authenticate with Adobe: https://admin.hlx.page/auth/adobe
   - Verify auth: https://admin.hlx.page/profile

2. **Verify Current Setup**
   - Confirm `helix-query.yaml` exists and works
   - Test query index: `https://{site}.aem.live/query-index.json`
   - Note current configuration

### Step 1: Find the Correct API Endpoint

For Universal Editor projects, the endpoint is:
```
https://admin.hlx.page/index/{org}/{repo}/main/query
```

**Example:**
```
https://admin.hlx.page/index/tyroneaem/universal-editor-getting-started-eds/main/query
```

**Note:** Replace `{org}`, `{repo}`, and `main` (branch) with your values.

### Step 2: Test Endpoint Access (GET)

```bash
curl -X GET \
  "https://admin.hlx.page/index/{org}/{repo}/main/query" \
  --cookie-jar cookies.txt \
  --cookie cookies.txt
```

**Expected responses:**
- `200 OK`: Config already exists in API (shows current config)
- `404 Not Found`: No config in API yet (expected for first migration)
- `401 Unauthorized`: Need to authenticate
- `403 Forbidden`: Check permissions

### Step 3: Upload Configuration (POST)

```bash
curl -X POST \
  "https://admin.hlx.page/index/{org}/{repo}/main/query" \
  -H "Content-Type: application/x-yaml" \
  --data-binary @helix-query.yaml \
  --cookie-jar cookies.txt \
  --cookie cookies.txt
```

**Note:** You need to be authenticated in your browser first, then export cookies.

### Step 4: Verify Migration

1. **Check API Config:**
   ```
   https://admin.hlx.page/index/{org}/{repo}/main/query
   ```
   Should return your configuration in JSON format.

2. **Test Query Index:**
   ```
   https://{site}.aem.live/query-index.json
   ```
   Should still work with same output.

3. **Verify Precedence:**
   - API config takes precedence over `helix-query.yaml`
   - File-based config is now ignored

### Step 5: Clean Up (Optional)

Once verified working:

```bash
# Remove file-based config
git rm helix-query.yaml

# Commit the change
git commit -m "Migrate query index from Document Mode to API Mode (Configuration Service)"

# Push to repository
git push origin main
```

---

## 🛠️ Troubleshooting

### Issue: 401 Unauthorized

**Cause:** Not authenticated with Admin API

**Solution:**
1. Visit https://admin.hlx.page/auth/adobe
2. Complete Adobe authentication
3. Verify at https://admin.hlx.page/profile
4. Try request again

### Issue: 403 Forbidden

**Cause:** Using wrong API endpoint (likely `/config/` instead of `/index/`)

**Solution:**
1. Verify you're using `/index/` endpoint for Universal Editor
2. Check organization permissions
3. Confirm project type (Universal Editor vs Traditional Franklin)

### Issue: 404 Not Found

**Cause:** Endpoint path incorrect

**Solution:**
1. Verify endpoint structure: `/index/{org}/{repo}/main/query`
2. Check org name, repo name, and branch name
3. Try without branch: `/index/{org}/{repo}/query`

### Issue: Query Index Still Uses File Config

**Cause:** API config not properly uploaded or syntax error

**Solution:**
1. Verify API config exists (GET request should return 200)
2. Check YAML syntax in uploaded config
3. Wait a few minutes for cache to clear
4. Republish pages in Universal Editor

---

## 🔬 API Endpoint Discovery Process

### Testing Multiple Paths

We discovered the correct endpoint by testing these variations:

```javascript
const paths = [
  // ❌ Traditional Franklin patterns (didn't work)
  '/config/tyroneaem/universal-editor-getting-started-eds/main/content/aem-eds/query.yaml',
  '/config/tyroneaem/universal-editor-getting-started-eds/main/query.yaml',
  '/config/tyroneaem/universal-editor-getting-started-eds/content/aem-eds/query.yaml',
  '/config/tyroneaem/universal-editor-getting-started-eds/query.yaml',
  
  // ✅ Universal Editor patterns (worked!)
  '/index/tyroneaem/universal-editor-getting-started-eds/main/query',
  '/index/tyroneaem/universal-editor-getting-started-eds/query',
];
```

**Result:** `/index/` endpoint returned `200 OK`

---

## 📚 Project Architecture Comparison

### Traditional Franklin Project

```yaml
# fstab.yaml
mountpoints:
  /:
    url: "https://drive.google.com/..."  # or GitHub
    type: "google"  # or "github", "sharepoint"
```

**Uses:** `/config/` API endpoints

### Universal Editor Project

```yaml
# fstab.yaml
mountpoints:
  /:
    url: "https://author-p117652-e1146973.adobeaemcloud.com/..."
    type: "markup"
```

**Uses:** `/index/` API endpoints

---

## ✅ Verification Checklist

After migration, verify:

- [ ] API GET request returns 200 with your config
- [ ] Query index JSON still works (same output)
- [ ] All properties appear in query index
- [ ] Pages are being indexed correctly
- [ ] Can update config via API (POST/PUT)
- [ ] Changes reflect in query index output
- [ ] Optional: Removed `helix-query.yaml` from repo

---

## 📖 References

- **Admin API Docs:** https://www.aem.live/docs/admin
- **Admin API Login:** https://admin.hlx.page/login
- **Configuration Service:** Part of Adobe's Admin API
- **Universal Editor:** AEM's WYSIWYG authoring interface

---

## 🎓 Key Learnings

1. **Universal Editor uses different API structure** than traditional Franklin
2. **`/index/` endpoint, not `/config/`** for Universal Editor projects
3. **API Mode doesn't require `helix-query.yaml` file** (API takes precedence)
4. **Authentication required** via Adobe Admin API
5. **Both modes work** - Document Mode is fine for single-site projects

---

## 💡 When to Use Each Mode

### Use Document Mode (File-based) When:
- Single site project
- Want version control for configs
- Prefer Git workflow
- Learning/development environment
- Want transparency and code review

### Use API Mode (Configuration Service) When:
- Managing multiple sites
- Need instant config updates
- Using "repoless" functionality
- Enterprise/production scenarios
- Want centralized configuration

---

## 📝 Example Configuration

### helix-query.yaml (Document Mode)

```yaml
version: 1

indices:
  pages:
    include:
      - '/**'
    exclude:
      - '/**.json'
    target: /query-index.json
    properties:
      title:
        select: head > meta[property="og:title"]
        value: attribute(el, "content")
      author:
        select: head > meta[name="author"]
        value: attribute(el, "content")
      # ... more properties
```

### Same Config in API Mode

Stored at: `https://admin.hlx.page/index/{org}/{repo}/main/query`

Returns same YAML structure via API.

---

## 🤝 Contributing

If you discover additional endpoints or migration steps, please document them here or share with the EDS Bootcamp community.

---

**Last Updated:** October 24, 2025  
**Project:** universal-editor-getting-started-eds  
**Session:** EDS Bootcamp Session 5/6 - Configuration Service

