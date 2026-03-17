#!/bin/bash
# LS.bag Backup Script
# Runs daily via cron

DATE=$(date +%Y-%m-%d)
BACKUP_DIR="/root/lsbag-backups"
PROJECT_DIR="/root/lsbag-backend"

# Create backup directory
mkdir -p $BACKUP_DIR/$DATE

# Backup code
cp -r $PROJECT_DIR $BACKUP_DIR/$DATE/code

# Backup environment
cp $PROJECT_DIR/.env $BACKUP_DIR/$DATE/.env 2>/dev/null

# Backup Docker data
docker cp n8n-n8n-1:/home/node/.n8n $BACKUP_DIR/$DATE/n8n 2>/dev/null

# Create tarball
cd $BACKUP_DIR
tar -czf LS.bag-$DATE.tar.gz $DATE
rm -rf $DATE

# Keep only last 7 backups
ls -t | tail -n +8 | xargs -r rm

echo "Backup completed: LS.bag-$DATE.tar.gz"
