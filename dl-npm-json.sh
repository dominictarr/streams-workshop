#! /usr/bin/env bash

curl http://isaacs.iriscouch.com/registry/_all_docs?include_docs=true&update_seq=true >npm.json
