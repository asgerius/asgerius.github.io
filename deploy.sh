cd "$(dirname "$0")/src/gh-jumppage"

npm run build
cd build
rm -f precache*
cd ../../..
cp -R src/gh-jumppage/build/* .

git add -A
git commit -m"New build"
git push
