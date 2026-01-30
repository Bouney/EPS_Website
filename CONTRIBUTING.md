# Contributing
## Previewing the site locally
The website uses Cloudflare Pages and the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) should be used.

1. Install a [current, active or maintenance version](https://nodejs.org/about/previous-releases) of Node.js.
2. Install Wrangler by running `npm i -D wrangler@latest` in the root directory of the repository.
3. Run `npx wrangler pages dev` in the root directory of the repository.
   * If you use VS Code, this command can be run in Run and Debug.
   * `wrangler.toml` automatically sets the correct settings.
4. Type `b` in the terminal to open the site in your default browser.
5. Make changes to the code and refresh the browser to see them.

Wrangler handles Cloudflare Workers (Orca News) and provides a more accurate preview of the site compared to simple HTTP servers.

## Previewing the site after pushing to a branch
A commit or pull request pushed to GitHub will show a checks/deployment status. Open the "Cloudflare Pages" check to see the deployment URL. This URL can be shared with others for review.

A URL with the branch name is automatically updated with each push to the branch, while a URL with an eight-character ID (not the commit hash) is static and can be used for reference.
