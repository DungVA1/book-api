ES_HOST=localhost
if [[ $IS_DOCKER == 'true' ]];
then
  ES_HOST=elasticsearch
  echo 'Detected is docker enviroment'
  echo 'Wait me 3 seconds'
  for i in {1..3}
    do
      sleep 1
      echo 'Sleeping' $i's'
    done
fi

echo Lets go http://$ES_HOST:9200

# Init schema
curl -X PUT -H "Content-Type: application/json" $ES_HOST:9200/user -d @"./resource/user.mapping.json"
curl -X PUT -H "Content-Type: application/json" $ES_HOST:9200/post -d @"./resource/post.mapping.json"
curl -X PUT -H "Content-Type: application/json" $ES_HOST:9200/category -d @"./resource/category.mapping.json"
curl -X PUT -H "Content-Type: application/json" $ES_HOST:9200/tag -d @"./resource/tag.mapping.json"
curl -X PUT -H "Content-Type: application/json" $ES_HOST:9200/role -d @"./resource/role.mapping.json"

# Init data
curl -X POST -H "Content-Type: application/json" $ES_HOST:9200/user/user -d @"./resource/user.data.json"