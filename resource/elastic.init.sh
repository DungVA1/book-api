curl -X PUT -H "Content-Type: application/json" elasticsearch:9200/user -d @"./resource/user.mapping.json"
curl -X PUT -H "Content-Type: application/json" elasticsearch:9200/post -d @"./resource/post.mapping.json"
curl -X PUT -H "Content-Type: application/json" elasticsearch:9200/category -d @"./resource/category.mapping.json"
curl -X PUT -H "Content-Type: application/json" elasticsearch:9200/tag -d @"./resource/tag.mapping.json"
curl -X PUT -H "Content-Type: application/json" elasticsearch:9200/role -d @"./resource/role.mapping.json"