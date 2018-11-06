# curl -w %{http_code} localhost:9200 -s -o /dev/null

curl -X PUT -H "Content-Type: application/json" localhost:9200/role/_mapping/roles -d @user.mapping.json

# curl -X DELETE localhost:9200/role