npm install
mkdir -p tests/reports
rm -rf tests/reports/*
./node_modules/.bin/istanbul cover --report html --report json node_modules/.bin/_mocha -- -R spec tests/**/*.js --reporter mocha-junit-reporter --reporter-options mochaFile=./tests/reports/apt_test_result.xml
node_modules/gulp/bin/gulp.js report-coverage
sleep 5
echo UNIT_STATEMENTS=`grep "Statements" COVERAGE.md ` > env.properties
echo UNIT_BRANCHES=`grep "Branches" COVERAGE.md ` >> env.properties
echo UNIT_FUNCTIONS=`grep "Functions" COVERAGE.md ` >> env.properties
echo UNIT_LINES=`grep "Lines" COVERAGE.md ` >> env.properties
