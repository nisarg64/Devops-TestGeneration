var subject = require('./subject.js')
var mock = require('mock-fs');
subject.inc(0,undefined);
subject.inc(0,10);
subject.inc(10,undefined);
subject.inc(10,10);
subject.inc(-10,undefined);
subject.inc(-10,10);
subject.weird(7,0,42,"strict");
subject.weird(7,0,42,"astrict");
subject.weird(7,0,42,"strictz");
subject.weird(7,0,42,"werw");
subject.weird(7,0,42,",,,,,,,,,,werw");
subject.weird(7,0,52,"strict");
subject.weird(7,0,52,"astrict");
subject.weird(7,0,52,"strictz");
subject.weird(7,0,52,"werw");
subject.weird(7,0,52,",,,,,,,,,,werw");
subject.weird(7,0,32,"strict");
subject.weird(7,0,32,"astrict");
subject.weird(7,0,32,"strictz");
subject.weird(7,0,32,"werw");
subject.weird(7,0,32,",,,,,,,,,,werw");
subject.weird(7,10,42,"strict");
subject.weird(7,10,42,"astrict");
subject.weird(7,10,42,"strictz");
subject.weird(7,10,42,"werw");
subject.weird(7,10,42,",,,,,,,,,,werw");
subject.weird(7,10,52,"strict");
subject.weird(7,10,52,"astrict");
subject.weird(7,10,52,"strictz");
subject.weird(7,10,52,"werw");
subject.weird(7,10,52,",,,,,,,,,,werw");
subject.weird(7,10,32,"strict");
subject.weird(7,10,32,"astrict");
subject.weird(7,10,32,"strictz");
subject.weird(7,10,32,"werw");
subject.weird(7,10,32,",,,,,,,,,,werw");
subject.weird(7,-10,42,"strict");
subject.weird(7,-10,42,"astrict");
subject.weird(7,-10,42,"strictz");
subject.weird(7,-10,42,"werw");
subject.weird(7,-10,42,",,,,,,,,,,werw");
subject.weird(7,-10,52,"strict");
subject.weird(7,-10,52,"astrict");
subject.weird(7,-10,52,"strictz");
subject.weird(7,-10,52,"werw");
subject.weird(7,-10,52,",,,,,,,,,,werw");
subject.weird(7,-10,32,"strict");
subject.weird(7,-10,32,"astrict");
subject.weird(7,-10,32,"strictz");
subject.weird(7,-10,32,"werw");
subject.weird(7,-10,32,",,,,,,,,,,werw");
subject.weird(17,0,42,"strict");
subject.weird(17,0,42,"astrict");
subject.weird(17,0,42,"strictz");
subject.weird(17,0,42,"werw");
subject.weird(17,0,42,",,,,,,,,,,werw");
subject.weird(17,0,52,"strict");
subject.weird(17,0,52,"astrict");
subject.weird(17,0,52,"strictz");
subject.weird(17,0,52,"werw");
subject.weird(17,0,52,",,,,,,,,,,werw");
subject.weird(17,0,32,"strict");
subject.weird(17,0,32,"astrict");
subject.weird(17,0,32,"strictz");
subject.weird(17,0,32,"werw");
subject.weird(17,0,32,",,,,,,,,,,werw");
subject.weird(17,10,42,"strict");
subject.weird(17,10,42,"astrict");
subject.weird(17,10,42,"strictz");
subject.weird(17,10,42,"werw");
subject.weird(17,10,42,",,,,,,,,,,werw");
subject.weird(17,10,52,"strict");
subject.weird(17,10,52,"astrict");
subject.weird(17,10,52,"strictz");
subject.weird(17,10,52,"werw");
subject.weird(17,10,52,",,,,,,,,,,werw");
subject.weird(17,10,32,"strict");
subject.weird(17,10,32,"astrict");
subject.weird(17,10,32,"strictz");
subject.weird(17,10,32,"werw");
subject.weird(17,10,32,",,,,,,,,,,werw");
subject.weird(17,-10,42,"strict");
subject.weird(17,-10,42,"astrict");
subject.weird(17,-10,42,"strictz");
subject.weird(17,-10,42,"werw");
subject.weird(17,-10,42,",,,,,,,,,,werw");
subject.weird(17,-10,52,"strict");
subject.weird(17,-10,52,"astrict");
subject.weird(17,-10,52,"strictz");
subject.weird(17,-10,52,"werw");
subject.weird(17,-10,52,",,,,,,,,,,werw");
subject.weird(17,-10,32,"strict");
subject.weird(17,-10,32,"astrict");
subject.weird(17,-10,32,"strictz");
subject.weird(17,-10,32,"werw");
subject.weird(17,-10,32,",,,,,,,,,,werw");
subject.weird(-3,0,42,"strict");
subject.weird(-3,0,42,"astrict");
subject.weird(-3,0,42,"strictz");
subject.weird(-3,0,42,"werw");
subject.weird(-3,0,42,",,,,,,,,,,werw");
subject.weird(-3,0,52,"strict");
subject.weird(-3,0,52,"astrict");
subject.weird(-3,0,52,"strictz");
subject.weird(-3,0,52,"werw");
subject.weird(-3,0,52,",,,,,,,,,,werw");
subject.weird(-3,0,32,"strict");
subject.weird(-3,0,32,"astrict");
subject.weird(-3,0,32,"strictz");
subject.weird(-3,0,32,"werw");
subject.weird(-3,0,32,",,,,,,,,,,werw");
subject.weird(-3,10,42,"strict");
subject.weird(-3,10,42,"astrict");
subject.weird(-3,10,42,"strictz");
subject.weird(-3,10,42,"werw");
subject.weird(-3,10,42,",,,,,,,,,,werw");
subject.weird(-3,10,52,"strict");
subject.weird(-3,10,52,"astrict");
subject.weird(-3,10,52,"strictz");
subject.weird(-3,10,52,"werw");
subject.weird(-3,10,52,",,,,,,,,,,werw");
subject.weird(-3,10,32,"strict");
subject.weird(-3,10,32,"astrict");
subject.weird(-3,10,32,"strictz");
subject.weird(-3,10,32,"werw");
subject.weird(-3,10,32,",,,,,,,,,,werw");
subject.weird(-3,-10,42,"strict");
subject.weird(-3,-10,42,"astrict");
subject.weird(-3,-10,42,"strictz");
subject.weird(-3,-10,42,"werw");
subject.weird(-3,-10,42,",,,,,,,,,,werw");
subject.weird(-3,-10,52,"strict");
subject.weird(-3,-10,52,"astrict");
subject.weird(-3,-10,52,"strictz");
subject.weird(-3,-10,52,"werw");
subject.weird(-3,-10,52,",,,,,,,,,,werw");
subject.weird(-3,-10,32,"strict");
subject.weird(-3,-10,32,"astrict");
subject.weird(-3,-10,32,"strictz");
subject.weird(-3,-10,32,"werw");
subject.weird(-3,-10,32,",,,,,,,,,,werw");
mock({"path/fileExists":{},"pathContent":{"file1":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"pathContent":{"file1":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{},"pathContent":{"file1":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{"file":"sample text"},"pathContent":{"file1":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{},"pathContent":{"file1":"text content"}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"pathContent":{"file1":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{"file":"sample text"},"pathContent":{"file1":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{"file":"sample text"},"pathContent":{"file1":"text content"}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{"file":"sample text"},"pathContent":{"file1":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"pathContent":{"file1":"text content"}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{"file":"sample text"},"pathContent":{"file1":""}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{"file":"sample text"}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{"file":"sample text"},"pathContent":{"file1":"text content"}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
mock({"path/fileExists":{"file":"sample text"}});
	subject.fileTest('path/fileExists','pathContent/file1');
mock.restore();
subject.format("","",{"normalize":true});
subject.format("","","");
subject.blackListNumber("2121234567");
subject.blackListNumber("1234212567");
