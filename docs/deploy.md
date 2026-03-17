# Deployment Guide

Fill in these placeholders for your own environment before running the commands below:

```bash
DEPLOY_USER=<ssh-user>
DEPLOY_HOST=<server-hostname>
DEPLOY_APP_DIR=<absolute-path-to-repo>
PUBLIC_URL=<https://your-domain.example>
```

Example:

```bash
DEPLOY_USER=deploy
DEPLOY_HOST=app.example.com
DEPLOY_APP_DIR=/srv/trade-lens
PUBLIC_URL=https://trade-lens.example.com
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
   ssh "${DEPLOY_USER}@${DEPLOY_HOST}" "cd ${DEPLOY_APP_DIR} && git pull --ff-only"
   ```

4. Reinstall dependencies only when `package.json` or `package-lock.json` changed.

   ```bash
   ssh "${DEPLOY_USER}@${DEPLOY_HOST}" "cd ${DEPLOY_APP_DIR} && npm ci"
   ```

5. Build the production bundle on the server.

   ```bash
   ssh "${DEPLOY_USER}@${DEPLOY_HOST}" "cd ${DEPLOY_APP_DIR} && npm run build"
   ```

6. Reload and verify `nginx`.

   ```bash
   ssh "${DEPLOY_USER}@${DEPLOY_HOST}" 'sudo systemctl reload nginx && systemctl status nginx --no-pager --lines=20'
   ```

7. Run a smoke check against the live site.

   ```bash
   curl -I -sS "${PUBLIC_URL}" | head -n 5
   ```

## Zero-Regression Reminders

- Re-check the manual record form's bidirectional `Quantity` / `Unit Price` / `Amount` calculations.
- Confirm market-to-currency mapping still resolves `US -> USD`, `TW -> TWD`, `HK -> HKD`, `SZ/SS -> CNY`, and `T -> JPY`.
- Verify regret analysis and trend charts against known sample data before announcing the release.
