// conf.js
var HtmlReporter = require('protractor-jasmine2-screenshot-reporter');
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  multiCapabilities: [{ browserName: 'chrome'}, { 'browserName': 'internet explorer', 'platform': 'ANY', 'version': '11', ignoreZoomSetting: true }, { browserName: 'firefox' }],
  onPrepare: function () {
        var date = new Date();

        //setup browser size
        browser.driver.manage().window().setSize(1600, 1000);

        // Add a screenshot reporter and store screenshots: 
        jasmine.getEnv().addReporter(new HtmlReporter({
            dest: 'Reports',
            filename: 'my-report.html',
            ignoreSkippedSpecs: true,
            cleanDestination: true,
            captureOnlyFailedSpecs: true,
            reportOnlyFailedSpecs: false,
            pathBuilder: function(currentSpec, suites, browserCapabilities) {
                return browserCapabilities.get('browserName') + '/' + currentSpec.fullName;
            }
        }));
    }
}