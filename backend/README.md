# Strapi application

A quick description of your strapi application

## Deployment

### Redeploy

After any changes, SSH into the server and run the following commands:

```
git fetch origin master && git rest --hard origin/master
cd ~/doseoftech/backend
yarn && yarn build
sudo chmod 755 ~/doseoftech/backend
pm2 restart strapi
```