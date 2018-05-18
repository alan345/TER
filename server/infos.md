# open mysql

docker ps
docker exec -it 82ca7f50094b mysql -u root --host 127.0.0.1 --port 3306 --password=prisma
show databases;
use my-app@dev
show tables;
SELECT * FROM Chat;
DELETE FROM Chat;
