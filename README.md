doseoftech

```
rsync -ravze "ssh -i ~/.ssh/UbuntuLaptop.pem" --exclude '.git/' --exclude 'frontend/node_modules/' --exclude 'backend/node_modules/' ./* ubuntu@ec2-3-26-35-50.ap-southeast-2.compute.amazonaws.com:/var/www/doseoftech
```

Upload code to backend bucket

```
aws s3 cp ./ s3://doseoftech-backend/ --recursive --exclude "node_modules/*" --exclude ".cache/*" --exclude "build/*" --exclude "exports/*"
```

Upload code to frontend bucket

```
aws s3 cp ./ s3://doseoftech-frontend/ --recursive --exclude "node_modules/*" --exclude ".next/*" --exclude "yarn-error.log"
```

Connect to database

```
psql --host=doseoftech-database.cphwj7kuj2sw.ap-southeast-2.rds.amazonaws.com --port=5432 --username=postgres --password 
```

# SSL Certificate

```
certbot renew
```