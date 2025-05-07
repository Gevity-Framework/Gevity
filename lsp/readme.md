### language server protocol

The Dockerfile in this directory builds LSP binaries for a variety of lanuages. Use this docker image (`sphinxlightning/gevity-lsp`) as a base for other images.

### run

docker run --rm -it --entrypoint "/bin/bash" debian:bookworm

docker run --rm -it --entrypoint "/bin/bash" sphinxlightning/gevity-lsp

### run ast tests

docker buildx build --platform linux/amd64,linux/arm64 -t gevity-lsp -f lsp/Dockerfile .

in top level dir of this repo:

docker run --rm -it --entrypoint "/bin/bash" -v .:/root/gevity gevity-lsp

cd /root/gevity

cargo test test_ruby
