# Deployment Guide

This project is deployed on `${DEPLOY_USER}@${DEPLOY_HOST}` and served by `nginx` from:

```bash
${DEPLOY_APP_DIR}/dist
```

Public URL:

```bash
${PUBLIC_URL}
```

## Recommended Release Flow

1. Verify the local build before pushing.

   ```bash
   npm run build
   ```

2. Push the latest branch to origin.

   ```bash
   git push origin master
   ```

3. Sync the remote repo with a fast-forward pull.

   ```bash
   ssh ${DEPLOY_USER}@${DEPLOY_HOST} 'cd ${DEPLOY_APP_DIR} && git pull --ff-only'
   ```

4. Reinstall dependencies only when `package.json` or `package-lock.json` changed.

   ```bash
   ssh ${DEPLOY_USER}@${DEPLOY_HOST} 'cd ${DEPLOY_APP_DIR} && npm ci'
   ```

5. Build the production bundle on the server.

   ```bash
   ssh ${DEPLOY_USER}@${DEPLOY_HOST} 'cd ${DEPLOY_APP_DIR} && npm run build'
   ```

6. Reload and verify `nginx`.

   ```bash
   ssh ${DEPLOY_USER}@${DEPLOY_HOST} 'sudo systemctl reload nginx && systemctl status nginx --no-pager --lines=20'
   ```

7. Run a smoke check against the live site.

   ```bash
   ssh ${DEPLOY_USER}@${DEPLOY_HOST} 'curl -I -sS ${PUBLIC_URL} | head -n 5'
   ```

## Zero-Regression Reminders

- Re-check the manual record form's bidirectional `Quantity` / `Unit Price` / `Amount` calculations.
- Confirm market-to-currency mapping still resolves `US -> USD`, `TW -> TWD`, `HK -> HKD`, `SZ/SS -> CNY`, and `T -> JPY`.
- Verify regret analysis and trend charts against known sample data before announcing the release.
