docker pull ghcr.io/stakwork/gevity-mcp:latest
docker pull ghcr.io/stakwork/gevity-standalone:latest

docker stop mcp.sphinx &> /dev/null
docker rm mcp.sphinx &> /dev/null

docker stop gevity.sphinx &> /dev/null
docker rm gevity.sphinx &> /dev/null

docker-compose up -d

docker logs -f mcp.sphinx